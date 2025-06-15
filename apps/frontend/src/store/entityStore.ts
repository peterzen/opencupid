// // stores/entityStore.ts
// import { defineStore } from 'pinia'
// import { api, axios } from '@/lib/api'

// interface ServiceError {
//   success: false
//   message: string
//   fieldErrors?: Record<string, string[]>
// }

// type ServiceResponse<T> = { success: true; data: T } | ServiceError

// interface CreateEntityStoreOptions<T, InputType> {
//   name: string
//   basePath: string
//   extractMany: (data: any) => T[]
//   extractOne: (data: any) => T
//   createPath?: string
//   updatePath?: (id: string) => string
//   deletePath?: (id: string) => string
//   searchPath?: string
// }

// export function createEntityStore<T extends { id: string }, InputType = Partial<T>>(
//   options: CreateEntityStoreOptions<T, InputType>
// ) {
//   const {
//     name,
//     basePath,
//     extractMany,
//     extractOne,
//     createPath = basePath,
//     updatePath = (id: string) => `${basePath}/${id}`,
//     deletePath = (id: string) => `${basePath}/${id}`,
//     searchPath = `${basePath}/search`,
//   } = options

//   return defineStore(name, {
//     state: () => ({
//       items: [] as T[],
//       searchResults: [] as T[],
//       current: null as T | null,
//     }),

//     actions: {
//       async fetchAll(): Promise<T[]> {
//         try {
//           const res = await api.get(basePath)
//           this.items = extractMany(res.data) as T[]
//           return this.items
//         } catch (error: any) {
//           console.error(`Failed to fetch ${name}:`, error)
//           throw error.response?.data?.message || `Failed to fetch ${name}`
//         }
//       },

//       async search(q: string): Promise<T[]> {
//         try {
//           const res = await api.get(searchPath, { params: { q } })
//           this.searchResults = extractMany(res.data) as T[]
//           return this.searchResults
//         } catch (error: any) {
//           console.error(`Failed to search ${name}:`, error)
//           throw error.response?.data?.message || `Failed to search ${name}`
//         }
//       },

//       async getOne(id: string): Promise<T> {
//         try {
//           const res = await api.get(`${basePath}/${id}`)
//           this.current = extractOne(res.data)
//           return this.current
//         } catch (error: any) {
//           console.error(`Failed to fetch ${name} ${id}:`, error)
//           throw error.response?.data?.message || `Failed to fetch ${name}`
//         }
//       },

//       async create(input: InputType): Promise<T> {
//         try {
//           const res = await api.post(createPath, input)
//           const created = extractOne(res.data)
//           this.items.push(created)
//           return created
//         } catch (error: any) {
//           console.error(`Failed to create ${name}:`, error)
//           if (axios.isAxiosError(error) && error.response) {
//             const errData = error.response.data as ServiceError
//             throw errData.message
//           }
//           throw `Failed to create ${name}`
//         }
//       },

//       async update(id: string, input: Partial<T>): Promise<T> {
//         try {
//           const res = await api.patch(updatePath(id), input)
//           const updated = extractOne(res.data)
//           const idx = this.items.findIndex(t => t.id === id)
//           if (idx !== -1) this.items.splice(idx, 1, updated)
//           return updated
//         } catch (error: any) {
//           console.error(`Failed to update ${name} ${id}:`, error)
//           throw error.response?.data?.message || `Failed to update ${name}`
//         }
//       },

//       async delete(id: string): Promise<void> {
//         try {
//           await api.delete(deletePath(id))
//           this.items = this.items.filter(t => t.id !== id)
//         } catch (error: any) {
//           console.error(`Failed to delete ${name} ${id}:`, error)
//           throw error.response?.data?.message || `Failed to delete ${name}`
//         }
//       },
//     },
//   })
// }
