<script setup lang="ts">
import { useCalendarStore } from '@/stores/CalendarStore'

const calendarStore = useCalendarStore()
const props = defineProps({
	slotData: Object,
})

function createNewDate(start) {
	const startingDate = new Date(start)
	const dayName = startingDate.toLocaleDateString('en-EN', { weekday: 'long' })
	const dayNumber = startingDate.getDate()
	const monthName = startingDate.toLocaleDateString('en-EN', { month: 'short' })
	const year = startingDate.getUTCFullYear()
	const time = startingDate.toLocaleTimeString().slice(0, 5)
	return `${dayName}, ${dayNumber} ${monthName} ${year} at ${time}`
}
</script>

<template>
	<div class="mb-4 relative">
		<input
			:id="slotData!.Start"
			class="peer/radio opacity-0 absolute z-0"
			type="radio"
			name="date"
			:disabled="slotData!.Taken"
		/>
		<label
			:for="slotData!.Start"
			@click="
				calendarStore.beforeUpdate(props.slotData!.Start, props.slotData!.End, createNewDate(props.slotData!.Start))
			"
			class="relative z-10 font-semibold bg-blue-50 text-blue-600 px-2 py-1 lg:px-4 lg:py-2 rounded-md text-sm lg:text-lg border border-transparent hover:border-blue-600 cursor-pointer transition-all duration-300 peer-checked/radio:bg-blue-600 peer-checked/radio:text-white peer-disabled/radio:bg-transparent peer-disabled/radio:text-gray-300 peer-disabled/radio:font-light peer-disabled/radio:line-through peer-disabled/radio:hover:border-transparent peer-disabled/radio:pointer-events-none"
			>{{ slotData!.exactStartHour }}</label
		>
	</div>
</template>
