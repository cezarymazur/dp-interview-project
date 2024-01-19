<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import CalendarSingleDay from './CalendarSingleDay.vue'
import VisitChangeConfirm from './VisitChangeConfirm.vue'
import VisitChangeDate from './VisitChangeDate.vue'
import Loading from './icons/Loading.vue'
import Chevron from './icons/Chevron.vue'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const swiperModules = [Navigation]

function scrollTo(selector: string) {
	document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
}

class Calendar {
	headerProps
	confirmProps
	mobileBreakpoint
	isCollapsed
	isCollapsedText
	getEndpoint
	todaysDate
	nextWeekDate
	nextTwoWeeksDate
	daysToPopulate
	currentMonday
	nextMonday
	nextTwoMondays
	currentWeek
	nextWeek
	nextTwoWeeks
	appointments
	calendarDays
	allCalendarWeeks
	rescheduleSection
	calendarLoading
	constructor() {
		this.headerProps = ref({
			title: ref('Confirm your appointment with'),
			doctorName: ref('Dr. Simeon Molas'),
			appLoading: ref(false),
			currentApp: ref('Monday, 17 May 2021 at 11:00'),
			questionText: ref('Did you have an unexpected situation?'),
			questioCtaText: ref('You can change the appointment for when it suits you better'),
		})

		this.confirmProps = ref({
			title: ref('Reschedule'),
			cta: ref('Click the button to confirm'),
			appLoading: ref(false),
			appointmentNewDate: ref(),
		})
		this.mobileBreakpoint = ref(768)

		this.isCollapsed = ref(true)
		this.isCollapsedText = ref('See more hours')

		this.getEndpoint = ref(import.meta.env.VITE_GET_API)

		this.todaysDate = new Date()
		this.nextWeekDate = new Date(new Date().setDate(new Date().getDate() + 7))
		this.nextTwoWeeksDate = new Date(new Date().setDate(new Date().getDate() + 14))

		this.daysToPopulate = ref(14)

		this.currentMonday = ref()
		this.nextMonday = ref()
		this.nextTwoMondays = ref()

		this.currentWeek = ref()
		this.nextWeek = ref()
		this.nextTwoWeeks = ref()

		this.appointments = ref()
		this.calendarDays = ref([])
		this.allCalendarWeeks = ref([])

		this.rescheduleSection = ref()

		this.calendarLoading = ref(false)

		this.getData()
	}

	collapseCalendar() {
		this.isCollapsed.value = !this.isCollapsed.value
		this.isCollapsed.value === true
			? (this.isCollapsedText.value = 'See more hours')
			: (this.isCollapsedText.value = 'Less')
	}

	private getMonday(d: Date) {
		d = new Date(d)
		const day = d.getDay(),
			diff = d.getDate() - day + (day == 0 ? -6 : 1)
		return new Date(d.setDate(diff)).toISOString().slice(0, 10).split('-').join('')
	}

	private async fetchData(url: string) {
		const response = await fetch(url)
		return response.json()
	}

	private async fetchWeeklyData(week: string) {
		const url = `${this.getEndpoint.value}${week}`
		return await this.fetchData(url)
	}

	async getData() {
		this.calendarLoading.value = true
		this.currentMonday.value = this.getMonday(this.todaysDate)
		this.nextMonday.value = this.getMonday(this.nextWeekDate)
		this.nextTwoMondays.value = this.getMonday(this.nextTwoWeeksDate)

		this.currentWeek.value = await this.fetchWeeklyData(this.currentMonday.value)
		this.nextWeek.value = await this.fetchWeeklyData(this.nextMonday.value)
		this.nextTwoWeeks.value = await this.fetchWeeklyData(this.nextTwoMondays.value)

		this.appointments.value = [...this.currentWeek.value, ...this.nextWeek.value, ...this.nextTwoWeeks.value]

		this.createDays(this.todaysDate)
		this.calendarLoading.value = false
	}

	createDays(firstDay: Date) {
		this.calendarDays.value = []
		for (let i = 0; i < this.daysToPopulate.value; i++) {
			const singleDay = {
				name: String,
				dayNumber: String,
				id: String,
				hours: [
					{
						End: String,
						Start: String,
						Taken: String,
						exactStartHour: String,
					},
				],
			}
			const newDay = new Date()
			newDay.setDate(firstDay.getDate() + i)

			const dayIndicator = newDay.toISOString().slice(0, 10)

			if (i === 0) {
				singleDay.name = ref('Today')
			} else if (i === 1) {
				singleDay.name = 'Tomorrow'
			} else {
				singleDay.name = newDay.toLocaleDateString('en-EN', { weekday: 'short' })
			}

			singleDay.dayNumber = `${newDay.getDate()} ${newDay.toLocaleDateString('en-EN', { month: 'short' })}`
			singleDay.hours = this.appointments.value.filter(hour => hour.Start.includes(dayIndicator))
			singleDay.hours.forEach(hour => (hour.exactStartHour = hour.Start.slice(11, 16)))

			this.calendarDays.value.push(singleDay)
		}

		if (window.innerWidth > this.mobileBreakpoint.value) {
			this.allCalendarWeeks.value = [this.calendarDays.value.slice(0, 7), this.calendarDays.value.slice(7, 14)]
		} else {
			this.allCalendarWeeks.value = [
				this.calendarDays.value.slice(0, 3),
				this.calendarDays.value.slice(3, 6),
				this.calendarDays.value.slice(6, 9),
				this.calendarDays.value.slice(9, 12),
				this.calendarDays.value.slice(12, 14),
			]
		}
	}

	createAppointmentNewDate(start, end) {
		scrollTo('#reschedule')
		appCalendar.confirmProps.value.appointmentNewDate = {
			Start: start,
			End: end,
			exactMeetingDate: '',
		}

		const startingDate = new Date(appCalendar.confirmProps.value.appointmentNewDate.Start)
		const dayName = startingDate.toLocaleDateString('en-EN', { weekday: 'long' })
		const dayNumber = startingDate.getDate()
		const monthName = startingDate.toLocaleDateString('en-EN', { month: 'short' })
		const year = startingDate.getUTCFullYear()
		const time = startingDate.toLocaleTimeString().slice(0, 5)
		const dateFormatted = `${dayName}, ${dayNumber} ${monthName} ${year} at ${time}`

		appCalendar.confirmProps.value.appointmentNewDate.exactMeetingDate = dateFormatted
	}

	async reloadCalendar() {
		this.isCollapsed.value = true
		this.isCollapsedText.value = 'See more hours'
		await this.getData()
	}
}

class Rechedule {
	postEndpoint
	constructor() {
		this.postEndpoint = ref(import.meta.env.VITE_POST_API)
	}

	async bookSlot() {
		const obj = newRechedule.prepareObject(appCalendar.confirmProps.value.appointmentNewDate)
		await newRechedule.sendObject(obj)
		scrollTo('#main')
		appCalendar.calendarLoading.value = true
		appCalendar.headerProps.value.appLoading = true
		appCalendar.confirmProps.value.appLoading = true
		setTimeout(() => {
			appCalendar.headerProps.value.currentApp = appCalendar.confirmProps.value.appointmentNewDate.exactMeetingDate
			appCalendar.confirmProps.value.appointmentNewDate = null
			appCalendar.headerProps.value.appLoading = false
			appCalendar.confirmProps.value.appLoading = false
			appCalendar.reloadCalendar()
		}, 1500)
	}

	prepareObject(objectData: Object) {
		const createdObject = {
			Start: objectData.Start.replace('T', ' '),
			End: objectData.End.replace('T', ' '),
			Comments: 'Additional instructions for the doctor',
			Patient: {
				Name: 'Patient Name',
				SecondName: 'Patient SecondName',
				Email: 'Patient Email',
				Phone: 'Patient Phone',
			},
		}

		return createdObject
	}

	async sendObject(preperedObject: Object) {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(preperedObject),
		}
		await fetch(this.postEndpoint.value, requestOptions)
			.then(response => {
				return response.text()
			})
			.then(data => {
				data ? JSON.parse(data) : {}
			})
			.catch(error => {
				console.log(error)
			})
	}
}
const appCalendar = new Calendar()
const newRechedule = new Rechedule()
</script>

<template>
	<section id="main" class="w-full h-auto px-5 py-20">
		<div class="max-w-7xl mx-auto">
			<VisitChangeDate :data="appCalendar.headerProps.value" />
			<form class="relative bg-white rounded-xl p-3 lg:p-5 my-12 flex flex-col gap-3 lg:gap-5 shadow-md">
				<div class="relative flex w-full mx-auto text-center min-h-[450px]">
					<Loading class="text-blue-700" v-if="appCalendar.calendarLoading.value" />
					<swiper
						v-else
						:slides-per-view="1"
						:modules="swiperModules"
						navigation
						:class="{ 'max-h-[450px]': appCalendar.isCollapsed.value }"
					>
						<swiper-slide v-for="(week, index) in appCalendar.allCalendarWeeks.value" :key="index">
							<div class="flex justify-around items-start lg:py-10 px-10 overflow-hidden">
								<CalendarSingleDay
									v-for="(day, index) in week"
									:key="index"
									:data="day"
									@setNewDate="appCalendar.createAppointmentNewDate"
								/>
							</div>
						</swiper-slide>
					</swiper>
				</div>
				<div
					@click="appCalendar.collapseCalendar()"
					class="absolute flex justify-center bottom-0 left-0 right-0 border-t py-4 bg-white text-blue-600 font-regular rounded-b-xl z-10 cursor-pointer hover:underline"
				>
					{{ appCalendar.isCollapsedText.value }}
					<Chevron
						class="w-4 h-4 mt-1 ml-2 stroke-blue-600 transform"
						:class="{ 'rotate-180': !appCalendar.isCollapsed.value }"
					/>
				</div>
			</form>
			<div id="reschedule" class="h-[200px]">
				<VisitChangeConfirm
					@bookSlot="newRechedule.bookSlot"
					:data="appCalendar.confirmProps.value"
					v-if="appCalendar.confirmProps.value.appointmentNewDate"
				/>
			</div>
		</div>
	</section>
</template>
