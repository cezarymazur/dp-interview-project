<script setup lang="ts">
import CalendarIcon from '@/components/Common/Icons/CalendarIcon.vue'
import Loading from '@/components/Common/Icons/LoadingIcon.vue'
import { useCalendarStore } from '@/stores/CalendarStore'

const calendarStore = useCalendarStore()

const texts = {
	title: 'Confirm your appointment with',
	doctorName: 'Dr. Simeon Molas',
}
</script>

<template>
	<div>
		<p class="text-2xl">
			{{ texts.title }} <span class="font-semibold">{{ texts.doctorName }}</span>
		</p>
		<div class="w-full bg-white rounded-xl p-5 my-14 flex items-center gap-5 shadow-md">
			<div class="relative h-10 w-10">
				<Loading class="w-10 h-10 top-7 left-7 text-green-500" v-if="calendarStore.updateLoading" />
				<CalendarIcon class="w-10 h-10" v-else />
			</div>
			<div class="font-semibold text-lg" :class="{ 'line-through': calendarStore.updateLoading }">
				On {{ calendarStore.currentExactDate }}
			</div>
		</div>
	</div>
</template>
