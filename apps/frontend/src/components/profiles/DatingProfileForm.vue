<template>
  <div class="col-md-8 offset-md-2">
    <FormKit type="form"
             :actions="false"
             v-model="formData"
             @submit="submitForm">

      <div class="mb-3">
        <FormKit type="text"
                 name="publicName"
                 label="My name is..."
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
        <Multiselect v-model="gender"
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
            {{ t(props.option.label) }}
          </template>

          <template #option="props">
            {{ t(props.option.label) }}
          </template>
        </Multiselect>
      </div>

      <div class="mb-3">
        <Multiselect v-model="relationship"
                     :options="relationshipStatusOptions"
                     :close-on-select="true"
                     :clear-on-select="false"
                     open-direction="bottom"
                     id="relationship"
                     label="label"
                     track-by="label"
                     placeholder="I am currently...">
          <template v-slot:noResult></template>
          <template #singleLabel="props">
            {{ t(props.option.label) }}
          </template>

          <template #option="props">
            {{ t(props.option.label) }}
          </template>
        </Multiselect>
      </div>

      <div class="mb-3">
        <FormKit name="hasKids"
                 type="radio"
                 label=""
                 :options="haveKidsRadioOptions"
                 help="Do you have kids?" />
      </div>

      <div class="mb-3">
        <FormKit type="textarea"
                 name="intro"
                 label="A few words about me..."
                 auto-height
                 :validation-messages="{
                  required: 'Please write a sentence or two about yourself',
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
// const props = defineProps<{
//   modelValue: DatingProfile,
//   isLoading: boolean
// }>();

// Optional destructure for template convenience:
// const { isLoading, modelValue } = props;
function debug(opt: any) {
  console.log("i18n", opt);
  return "";
}

const haveKidsRadioOptions = computed(() => [
  { value: 'yes', label: t("haskids.yes") },
  { value: 'no', label: t("haskids.no") },
  { value: 'unspecified', label: t("haskids.unspecified") },
])


</script>

<script lang="ts">
import { DatingProfile } from "@zod/generated";
import { computed, defineComponent } from "vue";
import Multiselect from "vue-multiselect";

import { getGenderOptions, getHasKidsOptionsOptions, getRelationshipStatusOptions } from "@/lib/i18n";

function getBirthYearSelectOptions() {
  const currentYear = new Date().getFullYear() - 18;
  return Array.from({ length: 100 }, (_, i) => currentYear - i);
}



export default defineComponent({
  name: "DatingProfileForm",

  emits: ["update:modelValue", "submit"],

  components: {
    Multiselect,
  },

  props: {
    modelValue: { type: Object, required: true },
    isLoading: { type: Boolean, default: false }
  },

  data() {
    return {
      error: "",
      formData: { ...this.modelValue } as DatingProfile,
      genderOptions: getGenderOptions(),
      birthYearSelectOptions: getBirthYearSelectOptions(),
      relationshipStatusOptions: getRelationshipStatusOptions(),
      haveKidsRadio: '',
    };
  },
  watch: {
    modelValue: {
      handler(newVal) {
        this.formData = { ...newVal }
      },
      deep: true,
    },
  },
  computed: {
    gender: {
      get() {
        return this.genderOptions.find((option) => {
          return option.value === this.formData.gender
        })
      },
      set(gender: any) {
        this.formData.gender = gender.value;
      },
    },
    // hasKids: {
    //   get() {
    //     return this.formData.hasKids
    //   },
    //   set(newVal: any) {
    //     this.formData.hasKids = newVal;
    //   },
    // },
    relationship: {
      get() {
        return this.relationshipStatusOptions.find((option) => {
          return option.value === this.formData.relationship
        })
      },
      set(relationship: any) {
        this.formData.relationship = relationship.value;
      },
    },
    birthYear: {
      get() {
        if (!this.formData?.birthday) return null;
        const date = new Date(this.formData.birthday);
        return date.getFullYear();
      },
      set(year: number) {
        if (!year) return;
        // Set birthday as ISO string for Jan 1st of selected year
        const newBirthday = new Date(year, 0, 1)
        this.formData.birthday = newBirthday;
      },
    },
  },
  methods: {
    submitForm(formData: DatingProfile) {
      console.log("Form submitted:", formData);
      this.$emit("submit", formData);
    },
  },
});
</script>
