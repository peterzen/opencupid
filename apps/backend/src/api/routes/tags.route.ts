import { validateBody } from "@utils/zodValidate";
import { TagParamsSchema, CreateTagBodySchema, CreateTagInput, UpdateTagInput, SearchQuerySchema, publicTagSchema, publicTagSearchSchema } from "@zod/tags.schema";
import { FastifyPluginAsync } from "fastify";
import { sendError } from "../helpers";
import { TagService } from "src/services/tag.service";

// debounce duration in milliseconds
const SEARCH_DEBOUNCE_MS = 300;

const tagsRoutes: FastifyPluginAsync = async (fastify) => {
  // Instantiate service
  const tagService = TagService.getInstance();

  /**
   * List all tags
   */
  fastify.get('/', { onRequest: [fastify.authenticate] }, async (_req, reply) => {
    try {
      const tags = await tagService.findAll();
      return reply.code(200).send({ success: true, tags });
    } catch (err) {
      fastify.log.error(err);
      return sendError(reply, 500, 'Failed to list tags');
    }
  });


  /**
   * Get a tag by ID
   */
  fastify.get('/:id', { onRequest: [fastify.authenticate] }, async (req, reply) => {
    const { id } = TagParamsSchema.parse(req.params);
    try {
      const tag = await tagService.findById(id);
      if (!tag) return sendError(reply, 404, 'Tag not found');
      return reply.code(200).send({ success: true, tag });
    } catch (err) {
      fastify.log.error(err);
      return sendError(reply, 500, 'Failed to fetch tag');
    }
  });

  /**
 * Search tags by partial name -- for type-ahead multi-select with debounce headers
 */
  fastify.get(
    '/search',
    { onRequest: [fastify.authenticate] },
    async (req, reply) => {
      const { q } = SearchQuerySchema.parse(req.query);
      try {
        const tags = await tagService.search(q);
        // disable caching and inform client of debounce interval
        reply.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        reply.header('X-Debounce', SEARCH_DEBOUNCE_MS.toString());
        if (!tags || tags.length === 0) {
          return reply.code(200).send({ success: true, tags: [] });
        }
        const publicTags = tags.map(tag => publicTagSearchSchema.parse(tag));
        return reply.code(200).send({ success: true, tags: publicTags });
      } catch (err) {
        fastify.log.error(err);
        return sendError(reply, 500, 'Failed to search tags');
      }
    }
  );

  /**
   * Create a new tag
   */
  fastify.post('/', { onRequest: [fastify.authenticate] }, async (req, reply) => {
    const data = await validateBody(CreateTagBodySchema, req, reply) as CreateTagInput;
    if (!data) return;
    try {
      const tag = await tagService.create(data);
      return reply.code(201).send({ success: true, tag });
    } catch (err) {
      fastify.log.error(err);
      return sendError(reply, 500, 'Failed to create tag');
    }
  });

  /**
   * Update a tag
   */
  fastify.patch('/:id', { onRequest: [fastify.authenticate] }, async (req, reply) => {
    const { id } = TagParamsSchema.parse(req.params);
    const data = await validateBody(CreateTagBodySchema, req, reply) as UpdateTagInput;
    if (!data) return;
    try {
      const updated = await tagService.update(id, data);
      return reply.code(200).send({ success: true, tag: updated });
    } catch (err: any) {
      fastify.log.error(err);
      if (err.code === 'P2025') {
        return sendError(reply, 404, 'Tag not found');
      }
      return sendError(reply, 500, 'Failed to update tag');
    }
  });

  /**
   * Soft delete a tag
   */
  fastify.delete('/:id', { onRequest: [fastify.authenticate] }, async (req, reply) => {
    const { id } = TagParamsSchema.parse(req.params);
    try {
      await tagService.remove(id);
      return reply.code(204).send();
    } catch (err) {
      fastify.log.error(err);
      return sendError(reply, 500, 'Failed to delete tag');
    }
  });
};

export default tagsRoutes;
