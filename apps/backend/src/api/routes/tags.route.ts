import { validateBody } from '@/utils/zodValidate'
import {
  PublicTagSchema,
  SearchQuerySchema,
  TagParamsSchema,
  UpdateTagPayloadSchema,
} from '@zod/dto/tag.schema'
import { FastifyPluginAsync } from 'fastify'
import { sendError } from '../helpers'
import { TagService } from 'src/services/tag.service'
import type { TagResponse, TagsResponse } from '@shared/dto/apiResponse.dto'

// debounce duration in milliseconds
const SEARCH_DEBOUNCE_MS = 300

const tagsRoutes: FastifyPluginAsync = async fastify => {
  const tagService = TagService.getInstance()

  /**
   * Search tags by partial name -- for type-ahead multi-select with debounce headers
   */
  fastify.get('/search', { onRequest: [fastify.authenticate] }, async (req, reply) => {
    const { q } = SearchQuerySchema.parse(req.query)
    try {
      const tags = await tagService.search(q)
      // disable caching and inform client of debounce interval
      reply.header('Cache-Control', 'no-cache, no-store, must-revalidate')
      reply.header('X-Debounce', SEARCH_DEBOUNCE_MS.toString())
      if (!tags || tags.length === 0) {
        const response: TagsResponse = { success: true, tags: [] }
        return reply.code(200).send(response)
      }
      const publicTags = tags.map(tag => PublicTagSchema.parse(tag))
      const response: TagsResponse = { success: true, tags: publicTags }
      return reply.code(200).send(response)
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to search tags')
    }
  })

  /**
   * Create a new tag
   */
  fastify.post(
    '/user',
    {
      onRequest: [fastify.authenticate],
      config: { rateLimit: { max: 10, timeWindow: '1 minute' } },
    },
    async (req, reply) => {
      const userId = req.user.userId
      if (!userId) {
        return sendError(reply, 401, 'Unauthorized')
      }
      const data = await validateBody(UpdateTagPayloadSchema, req, reply)
      if (!data) return
      try {
        const created = await tagService.create({
          ...data,
          createdBy: userId, // Set the creator to the authenticated user
          isUserCreated: true, // Mark as user-created
        })
        const tag = PublicTagSchema.parse(created)
        const response: TagResponse = { success: true, tag }
        return reply.code(200).send(response)
      } catch (err: any) {
        fastify.log.error(err)
        if (err.code === 'P2025') {
          return sendError(reply, 404, 'Tag not found')
        }
        return sendError(reply, 500, 'Failed to create tag')
      }
    }
  )

  /**
   * Admin endpoints
   * TODO add admin role checks
   */

  /**
   * List all tags
   */
  // fastify.get('/', { onRequest: [fastify.authenticate] }, async (_req, reply) => {
  //   try {
  //     const tags = await tagService.findAll();
  //     return reply.code(200).send({ success: true, tags });
  //   } catch (err) {
  //     fastify.log.error(err);
  //     return sendError(reply, 500, 'Failed to list tags');
  //   }
  // });

  /**
   * Get a tag by ID
   */
  // fastify.get('/:id', { onRequest: [fastify.authenticate] }, async (req, reply) => {
  //   const { id } = TagParamsSchema.parse(req.params);
  //   try {
  //     const tag = await tagService.findById(id);
  //     if (!tag) return sendError(reply, 404, 'Tag not found');
  //     return reply.code(200).send({ success: true, tag });
  //   } catch (err) {
  //     fastify.log.error(err);
  //     return sendError(reply, 500, 'Failed to fetch tag');
  //   }
  // });

  /**
   * Create a new tag
   */
  // fastify.post('/', { onRequest: [fastify.authenticate] }, async (req, reply) => {
  //   const data = await validateBody(UpdateTagPayloadSchema, req, reply)
  //   if (!data) return;
  //   try {
  //     const created = await tagService.create(data);
  //     return reply.code(201).send({ success: true, tag: created });
  //   } catch (err) {
  //     fastify.log.error(err);
  //     return sendError(reply, 500, 'Failed to create tag');
  //   }
  // });

  /**
   * Update a tag
   */
  // fastify.patch('/:id', { onRequest: [fastify.authenticate] }, async (req, reply) => {
  //   const { id } = TagParamsSchema.parse(req.params);
  //   const data = await validateBody(UpdateTagPayloadSchema, req, reply)
  //   if (!data) return;
  //   try {
  //     const updated = await tagService.update(id, data);
  //     return reply.code(200).send({ success: true, tag: updated });
  //   } catch (err: any) {
  //     fastify.log.error(err);
  //     if (err.code === 'P2025') {
  //       return sendError(reply, 404, 'Tag not found');
  //     }
  //     return sendError(reply, 500, 'Failed to update tag');
  //   }
  // });

  /**
   * Soft delete a tag
   */
  // fastify.delete('/:id', { onRequest: [fastify.authenticate] }, async (req, reply) => {
  //   const { id } = TagParamsSchema.parse(req.params);
  //   try {
  //     await tagService.remove(id);
  //     return reply.code(204).send();
  //   } catch (err) {
  //     fastify.log.error(err);
  //     return sendError(reply, 500, 'Failed to delete tag');
  //   }
  // });
}

export default tagsRoutes
