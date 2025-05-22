<template>
  <div class="col-md-8 offset-md-2">

    <FormKit type="form"
             :actions="false"
             @submit="submitForm">

      <div class="mb-3">
        <FormKit type="text"
                 name="name"
                 label="My name is..."
                 v-model="modelValue.publicName"
                 validation="required"
                 :validation-messages="{
                  required: 'Please enter your name',
                  min: 'Name must be at least 2 characters long',
                  max: 'Name must be less than 50 characters long'
                }" />
      </div>

      <div class="mb-3">
        <Multiselect v-model="birthYear"
                     :options="birthYearSelectOptions"
                     :close-on-select="true"
                     :clear-on-select="false"
                     id="birthyear"
                     :show-labels="false"
                     open-direction="bottom"
                     placeholder="I was born in...">
          <template v-slot:tag></template>
        </Multiselect>
      </div>

      <div class="mb-3">
        <Multiselect v-model="modelValue.gender"
                     :options="genderOptions"
                     :close-on-select="true"
                     :clear-on-select="false"
                     :show-labels="false"
                     :searchable="false"
                     open-direction="bottom"
                     id="gender"
                     label="label"
                     track-by="label"
                     placeholder="I identify as...">
          <template v-slot:noResult></template>
          <template #singleLabel="props">
            {{ debug(props.option) }}
            {{ (props.option.label) }}
          </template>

          <template #option="props">
            {{ t(props.option.label) }}
          </template>

        </Multiselect>
      </div>

      <div class="mb-3">
        <Multiselect v-model="modelValue.relationship"
                     :options="relationshipStatusOptions"
                     :close-on-select="true"
                     :clear-on-select="false"
                     open-direction="bottom"
                     id="relationship"
                     label="label"
                     track-by="label"
                     placeholder="I am currently...">
          <template #option="props">
            {{ t(props.option.label) }}
          </template>
        </Multiselect>
      </div>

      <div class="mb-3">
        <FormKit type="textarea"
                 name="intro"
                 label="A few words about me..."
                 auto-height
                 v-model="modelValue.intro"
                 :validation-messages="{
                  required: 'Please enter your name',
                  min: 'Name must be at least 2 characters long',
                  max: 'Name must be less than 50 characters long'
                }"
                 validation="required" />
      </div>

      <div v-if="error"
           class="alert alert-danger mb-3">
        {{ error }}
      </div>

      <div class="d-grid gap-2 mb-3">
        <button type="submit"
                class="btn btn-primary"
                :disabled="isLoading">
          <span v-if="isLoading">Working...</span>
          <span v-else>Save</span></button>
      </div>

    </FormKit>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n"
const { t } = useI18n() // this causes the error
const props = defineProps<{ modelValue: DatingProfile }>();

function debug(opt: any) {
  console.log("i18n", opt);
  return "";
}
</script>

<script lang="ts">
import { DatingProfile } from "@zod/generated";
import { defineComponent } from "vue";
import Multiselect from "vue-multiselect";

import { getGenderOptions, getRelationshipStatusOptions } from "@/lib/i18n";

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