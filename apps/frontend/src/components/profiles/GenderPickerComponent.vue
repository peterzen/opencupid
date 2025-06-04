<script setup lang="ts">
import { getGenderOptions, getPronounsOptions } from '@/lib/i18n';
import { MultiselectOption } from '@/lib/languages';
import { GenderType, PronounsType } from '@zod/generated';
import { computed, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { partition } from 'remeda'
import { OwnerProfile } from '@zod/profile.schema';
import { ref } from 'process';

const { t } = useI18n()

type MyModel ={
	gender: GenderType | null
	pronouns: PronounsType | null
}

const props = defineProps<{
	modelValue: OwnerProfile
}>()

const emit = defineEmits<{
	(e: 'changed', value: MyModel): void
}>()

const formData = reactive<OwnerProfile>({ ...props.modelValue })

// Sync prop changes into formData
watch(
	() => props.modelValue,
	(newVal) => Object.assign(formData, newVal),
	{ deep: true }
)


const gender = computed({
	get: () => formData.gender,
	set: (val) => {
		const changed = {
			pronouns: formData.pronouns,
			gender: val,
		}
		emit('changed', changed)
	}
})

const pronouns = computed({
	get: () => formData.pronouns,
	set: (val) => {
		const changed = {
			pronouns: val,
			gender: formData.gender,
		}
		emit('changed', changed)
	}
})

function splitGenders(
	options: MultiselectOption[]
): [binary: MultiselectOption[], other: MultiselectOption[]] {
	const partitions = gender.value  ? [gender.value] : ['male', 'female']
	return partition(options, o => partitions.includes(o.value as GenderType))
}
const genderOptions = getGenderOptions(t) as MultiselectOption[]


const [binaryGenders, otherGenders] = splitGenders(genderOptions)

const pronounsOptions = getPronounsOptions(t) as MultiselectOption[]
</script>

<template>
	<div>
		<div class="row">
			<div class="col-6">
				<FormKit v-model="gender!"
								 type="radio"
								 label=""
								 :options="binaryGenders"
								 help="I identify as..." />

				<BButton v-b-toggle.collapse-1
								 variant="link-secondary"
								 class="m-0 p-0">Other...
				</BButton>

				<BCollapse id="collapse-1">
					<FormKit v-model="gender!"
									 type="radio"
									 label=""
									 :options="otherGenders"
									 help="" />
				</BCollapse>
			</div>
			<div class="col-6">
				<FormKit v-model="pronouns!"
								 type="radio"
								 label=""
								 :options="pronounsOptions"
								 help="Pronouns" />

			</div>
		</div>
	</div>
</template>


<style scoped>
:deep(.formkit-options) {
	margin-bottom: 0;
}
</style>