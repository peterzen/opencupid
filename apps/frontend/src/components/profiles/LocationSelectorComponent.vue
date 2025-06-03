<script setup lang="ts">

import { getCountryOptions } from '@/lib/countries';
import { type OwnerProfile } from '@zod/profile.schema';
import { reactive, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import Multiselect from 'vue-multiselect'


// i18n
const { t } = useI18n()


// Props & Emits
const props = defineProps<{
	modelValue: OwnerProfile
}>()

const emit = defineEmits<{
	(e: 'update:modelValue', value: OwnerProfile): void
}>()

// Local form state
const formData = reactive<OwnerProfile>({ ...props.modelValue })

// Sync prop changes into formData
watch(
	() => props.modelValue,
	(newVal) => Object.assign(formData, newVal),
	{ deep: true, immediate: true }
)


const countrySelectOptions = getCountryOptions()
const country = computed({
	get: () => countrySelectOptions.find((o) => o.value === formData.country),
	set: (opt: any) => { 
		formData.country = opt.value 
		emit('update:modelValue', formData) // Emit the updated profile
	},
})

const cityName = computed({
	get: () => formData.cityName,
	set: (val: any) => { 
		formData.cityName = val
		emit('update:modelValue', formData) // Emit the updated profile
	},
})


</script>


<template>

	<div class="row ">
		<div class="col-6">
			<Multiselect v-model="country"
									 :options="countrySelectOptions"
									 :close-on-select="true"
									 :clear-on-select="false"
									 open-direction="bottom"
									 :required="true"
									 placeholder="I'm from..."
									 label="label"
									 track-by="label" />
		</div>
		<div class="col-6">

			<FormKit type="text"
							 v-model="cityName"
							 label="My city..."
							 id="city"
							 input-class="form-control-lg"
							 :validation="[['required'], ['matches', /^[\p{L}]+(?:['-][\p{L}]+)*(?:\s+[\p{L}]+(?:['-][\p{L}]+)*)*$/u]]"
							 validation-visibility="blur"
							 :validation-messages="{
								matches: 'Hmm, that does not look like a city name?',
								required: 'Please enter your name',
								min: 'Name must be at least 2 characters long',
								max: 'Name must be less than 50 characters long'
							}" />
		</div>
	</div>
</template>
