<script setup lang="ts">
import CalendarSingleSlot from './CalendarSingleSlot.vue'

defineProps({
	data: Object,
})
</script>

<template>
	<div class="flex flex-col justify-center flex-shrink w-[100px]">
		<div class="flex flex-col mb-3 w-auto">
			<div class="font-medium">{{ data!.name }}</div>
			<div class="text-sm font-medium opacity-50">{{ data!.dayNumber }}</div>
		</div>
		<CalendarSingleSlot v-for="hour in data!.hours" :key="hour.Start" :slotData="hour" />
	</div>
</template>
