import { defineStore } from 'pinia';
import axios from 'axios';
import type { Tag } from '@zod/tags.schema';
import type { CreateTagInput, UpdateTagInput } from '@zod/tags.schema';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

interface ServiceError {
  success: false;
  message: string;
  fieldErrors?: Record<string, string[]>;
}

type ServiceResponse<T> = { success: true; data: T } | ServiceError;

export const useTagsStore = defineStore('tags', {
  state: () => ({
    tags: [] as Tag[],
    searchResults: [] as Tag[],
    currentTag: null as Tag | null,
  }),

  actions: {
    /**
     * Fetch all tags
     */
    async fetchAll(): Promise<Tag[]> {
      try {
        const res = await axios.get<{ success: true; tags: Tag[] }>('/tags');
        this.tags = res.data.tags;
        return this.tags;
      } catch (error: any) {
        console.error('Failed to fetch tags:', error);
        throw error.response?.data?.message || 'Failed to fetch tags';
      }
    },

    /**
     * Search tags for autocomplete
     */
    async searchTags(q: string): Promise<Tag[]> {
      try {
        const res = await axios.get<{ success: true; tags: Tag[] }>('/tags/search', {
          params: { q },
        });
        this.searchResults = res.data.tags;
        return this.searchResults;
      } catch (error: any) {
        console.error('Failed to search tags:', error);
        throw error.response?.data?.message || 'Failed to search tags';
      }
    },

    /**
     * Get a single tag by ID
     */
    async getTag(id: string): Promise<Tag> {
      try {
        const res = await axios.get<{ success: true; tag: Tag }>(`/tags/${id}`);
        this.currentTag = res.data.tag;
        return this.currentTag;
      } catch (error: any) {
        console.error(`Failed to fetch tag ${id}:`, error);
        throw error.response?.data?.message || 'Failed to fetch tag';
      }
    },

    /**
     * Create a new tag
     */
    async createTag(input: CreateTagInput): Promise<Tag> {
      try {
        const res = await axios.post<{ success: true; tag: Tag }>('/tags', input);
        this.tags.push(res.data.tag);
        return res.data.tag;
      } catch (error: any) {
        console.error('Failed to create tag:', error);
        if (axios.isAxiosError(error) && error.response) {
          const errData = error.response.data as ServiceError;
          throw errData.message;
        }
        throw 'Failed to create tag';
      }
    },

    /**
     * Update an existing tag
     */
    async updateTag(id: string, input: UpdateTagInput): Promise<Tag> {
      try {
        const res = await axios.patch<{ success: true; tag: Tag }>(`/tags/${id}`, input);
        const idx = this.tags.findIndex(t => t.id === id);
        if (idx !== -1) this.tags.splice(idx, 1, res.data.tag);
        return res.data.tag;
      } catch (error: any) {
        console.error(`Failed to update tag ${id}:`, error);
        throw error.response?.data?.message || 'Failed to update tag';
      }
    },

    /**
     * Soft delete a tag
     */
    async deleteTag(id: string): Promise<void> {
      try {
        await axios.delete(`/tags/${id}`);
        this.tags = this.tags.filter(t => t.id !== id);
      } catch (error: any) {
        console.error(`Failed to delete tag ${id}:`, error);
        throw error.response?.data?.message || 'Failed to delete tag';
      }
    },
  },
});
