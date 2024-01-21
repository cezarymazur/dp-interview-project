<script setup lang="ts">
import CalendarSingleDay from './CalendarSingleDay.vue'
defineProps({
	data: Object,
})
</script>

<template>
	<div class="flex justify-around items-start lg:py-10 px-10 overflow-hidden">
		<CalendarSingleDay v-for="(day, index) in data" :key="index" :data="day" />
	</div>
</template>
