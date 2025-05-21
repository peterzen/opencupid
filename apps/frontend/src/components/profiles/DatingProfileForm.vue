<template>

    <FormKit type="form"
             @submit="submitForm">

      <div class="row mb-3">
        <label for="publicName"
               class="col-sm-2 col-form-label">My name is</label>
        <div class="col-sm-10">
          <FormKit type="text"
                   name="name"
                   label=""
                   validation="required" />
        </div>
      </div>

      <div class="row mb-3">
        <label class="col-sm-2 col-form-label">I was born in...</label>
        <div class="col-sm-10">
          <Multiselect v-model="birthYear"
                       :options="birthYearSelectOptions"
                       :close-on-select="true"
                       :clear-on-select="false"
                       :show-labels="false"
                       placeholder="Select one" />
        </div>
      </div>

      <div class="mb-3">
        <FormKit type="select"
                 name="gender"
                 label="Gender"
                 :options="genderOptions"
                 validation="required" />
      </div>

      <div class="mb-3">
        <FormKit type="textarea"
                 name="bio"
                 label="Bio"
                 validation="required|max:500" />
      </div>

      <div class="mb-3">
        <FormKit type="checkbox"
                 name="relationship"
                 label="Relationship status"
                 :options="relationshipStatusOptions"
                 validation="required" />
      </div>

      <div v-if="error"
           class="alert alert-danger mt-3">
        {{ error }}
      </div>

    </FormKit>
</template>


<script lang="ts">
import { DatingProfile } from "@zod/generated";
import { defineComponent } from "vue";
import Multiselect from "vue-multiselect";

import { getGenderOptions, getRelationshipStatusOptions } from "@/lib/i18n";
import { isFileLoadingAllowed } from "vite";

export default defineComponent({
  name: "DatingProfileForm",

  components: {
    Multiselect,
  },

  props: {
    modelValue: {
      type: Object,
      required: false,
    },
  },

  setup(props: { modelValue: DatingProfile }) {
    // Type-safe access
  },

  data() {
    return {
      error: "",
      isLoading: false,
      genderOptions: getGenderOptions(),
      relationshipStatusOptions: getRelationshipStatusOptions(),
    };
  },

  computed: {
    birthYearSelectOptions() {
      const currentYear = new Date().getFullYear() - 18;
      return Array.from({ length: 100 }, (_, i) => currentYear - i);
    },
    birthYear: {
      get() {
        if (!this.modelValue?.birthday) return null;
        const date = new Date(this.modelValue.birthday);
        return date.getFullYear();
      },
      set(year: number) {
        if (!year) return;
        // Set birthday as ISO string for Jan 1st of selected year
        const newBirthday = new Date(year, 0, 1).toISOString();
        this.$emit("update:modelValue", {
          ...this.modelValue,
          birthday: newBirthday,
        });
      },
    },
  },
  methods: {
    submitForm(formData: any) {
      console.log("Form submitted:", formData);
      // Add your form submission logic here
    },
  },
});
</script>

<style scoped>
/* Add your styles here */
</style>