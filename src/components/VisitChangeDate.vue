<script setup lang="ts">
import CalendarIcon from './icons/CalendarIcon.vue'
import Loading from './icons/Loading.vue'

defineProps({
	data: Object,
})
</script>

<template>
	<div>
		<p class="text-2xl">
			{{ data!.title }} <span class="font-semibold">{{ data!.doctorName }}</span>
		</p>
		<div class="w-full bg-white rounded-xl p-5 my-14 flex items-center gap-5 shadow-md">
			<div class="relative h-10 w-10">
				<Loading class="w-10 h-10 top-7 left-7 text-green-500" v-if="data!.appLoading" />
				<CalendarIcon class="w-10 h-10" v-else />
			</div>
			<div class="font-semibold text-lg" :class="{ 'line-through': data!.appLoading }">On {{ data!.currentApp }}</div>
		</div>
		<p class="text-2xl leading-8">
			<span class="font-semibold">{{ data!.questionText }}</span
			><br />{{ data!.questioCtaText }}
		</p>
	</div>
</template>
