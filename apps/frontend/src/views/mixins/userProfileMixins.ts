import { useProfileStore } from '@/store/profileStore'
import { toast } from 'vue3-toastify'

export const userProfileMixin = {
  data() {
    return {
      profile: {
        id: null,
        publicName: '',
        intro: '',
        city: '',
        country: '',
        birthDate: null,
        gender: '',
        relationship: '',
        hasKids: null,
      },
      isLoading: false,
      error: '',
    }
  },

  computed: {
    profileStore() {
      return useProfileStore()
    }
  },

  methods: {
    async loadProfile() {
      try {
        this.isLoading = true
        const data = await this.profileStore.getUserProfile()
        console.log('Profile data:', data)
        this.profile = data || {}
      } catch (error) {
        console.error('Failed to load profile:', error)
        this.error = 'Failed to load profile. Please try again.'
        toast.error(this.error)
      } finally {
        this.isLoading = false
      }
    },

  },
  async created() {
    if (!this.profile.id) {
      await this.loadProfile()
    }
  },
}