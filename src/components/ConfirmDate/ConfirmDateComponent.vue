<script setup lang="ts">
import Button from '@/components/Common/Button.vue'
import { useCalendarStore } from '@/stores/CalendarStore'

const calendarStore = useCalendarStore()

const texts = {
	title: 'Reschedule',
	cta: 'Click the button to confirm',
}
</script>

<template>
	<section id="confirm" class="h-[200px]">
		<div v-if="calendarStore.collapse.confirm">
			<p class="text-2xl">
				<span class="font-semibold">{{ texts.title }}</span> <br />{{ texts.cta }}
			</p>
			<Button
				:label="calendarStore.dateObject.exactMeetingDate"
				:disabled="calendarStore.loading.update"
				@click="
					calendarStore.update(
						calendarStore.dateObject.Start,
						calendarStore.dateObject.End,
						calendarStore.dateObject.exactMeetingDate
					)
				"
			/>
		</div>
	</section>
</template>
