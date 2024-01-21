<script setup lang="ts">
import CalendarMultipleWeeks from './CalendarMultipleWeeks.vue'
import CalendarCollapseButton from './CalendarCollapseButton.vue'

const texts = {
	question: 'Did you have an unexpected situation?',
	cta: 'You can change the appointment for when it suits you better',
}
</script>

<template>
	<p class="text-2xl leading-8">
		<span class="font-semibold">{{ texts.question }}</span
		><br />{{ texts.cta }}
	</p>
	<form class="relative bg-white rounded-xl p-3 lg:p-5 my-12 flex flex-col gap-3 lg:gap-5 shadow-md">
		<div class="relative flex w-full mx-auto text-center min-h-[450px]">
			<CalendarMultipleWeeks />
		</div>
		<CalendarCollapseButton />
	</form>
</template>
