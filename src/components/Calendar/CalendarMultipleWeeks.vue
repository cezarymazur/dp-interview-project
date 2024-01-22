<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import { useCalendarStore } from '@/stores/CalendarStore'
import CalendarSingleWeek from './CalendarSingleWeek.vue'
import Loading from '../Common/Icons/LoadingIcon.vue'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const swiperModules = [Navigation]
const calendarStore = useCalendarStore()

calendarStore.getAndProcessData().then(function () {
	calendarStore.loading.slots = false
})
</script>

<template>
	<Loading v-if="calendarStore.loading.slots" class="text-blue-600" />
	<swiper
		v-else
		:slides-per-view="1"
		:modules="swiperModules"
		navigation
		:class="{ 'max-h-[450px]': calendarStore.collapse.calendar }"
	>
		<swiper-slide v-for="(week, index) in calendarStore.weeksData" :key="index">
			<CalendarSingleWeek :data="week" />
		</swiper-slide>
	</swiper>
</template>
