import { useLikeStore } from "../stores/useLikeStore"

export function useLike() {
  const store = useLikeStore()
  return {
    likesSent: store.sent,
    likesReceived: store.received,
    matches: store.matches,
    like: store.sendLike,
    unlike: store.removeLike,
    refreshLikes: store.fetchLikes,
    loadingLikes: store.loading,
  }
}