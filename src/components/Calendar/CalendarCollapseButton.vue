<script setup lang="ts">
import { ref } from 'vue'
import { useCalendarStore } from '@/stores/CalendarStore'
import Chevron from '../Common/Icons/ChevronIcon.vue'

const calendarStore = useCalendarStore()

const seeMoreText = ref('See more hours')
const seeLessText = ref('Less')

function collapseCalendar() {
	calendarStore.isCollapsed = !calendarStore.isCollapsed
}
</script>

<template>
	<div
		@click="collapseCalendar()"
		class="absolute flex justify-center bottom-0 left-0 right-0 border-t py-4 bg-white text-blue-600 font-regular rounded-b-xl z-10 cursor-pointer hover:underline"
	>
		<span v-if="calendarStore.isCollapsed">{{ seeMoreText }}</span>
		<span v-else>{{ seeLessText }}</span>
		<Chevron
			class="w-4 h-4 mt-1 ml-2 stroke-blue-600 transform"
			:class="{ 'rotate-180': !calendarStore.isCollapsed }"
		/>
	</div>
</template>
