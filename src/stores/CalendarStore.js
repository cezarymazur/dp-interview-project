import { defineStore } from 'pinia'
import { fetchData } from '@/services/getDataService'
import { postData } from '@/services/postDataService'
import { processData } from '@/services/processDataService'

export const useCalendarStore = defineStore('CalendarStore', {
	state: () => {
		return {
			slots: [],
			//Put number of weeks you want to see in the calendar
			weeksAmout: 2,
			dateObject: {
				currentExactDate: 'Monday, 17 May 2021 at 11:00',
			},
			loading: {
				slots: true,
				update: false,
			},
			collapse: {
				confirm: false,
				calendar: true,
			},
		}
	},
	getters: {
		weeks() {
			return processData(this.slots, this.weeksAmout)
		},
	},
	actions: {
		async fetchSlots(weeksToFetch) {
			const dataArray = []
			function createApiLastPart(d) {
				d = new Date(d)
				const day = d.getDay(),
					diff = d.getDate() - day + (day == 0 ? -6 : 1)
				return new Date(d.setDate(diff)).toISOString().slice(0, 10).split('-').join('')
			}

			async function getWeekData(date) {
				const data = await fetchData(createApiLastPart(date))
				return data
			}

			for (let i = 0; i < weeksToFetch; i++) {
				const weekDate = new Date(new Date().setDate(new Date().getDate() + i * 7))
				const weekData = await getWeekData(weekDate)
				dataArray.push(...weekData)
			}
			this.slots = dataArray
		},
		beforeUpdate(start, end, exact) {
			this.collapse.confirm = true
			this.dateObject.Start = start
			this.dateObject.End = end
			this.dateObject.exactMeetingDate = exact
			this.scrollTo('#confirm')
		},
		async update(start, end, exact) {
			this.loading.update = true
			this.collapse.confirm = false
			this.scrollTo('#main')
			function prepareObject() {
				return {
					Start: start.replace('T', ' '),
					End: end.replace('T', ' '),
					Comments: 'Additional instructions for the doctor',
					Patient: {
						Name: 'Patient Name',
						SecondName: 'Patient SecondName',
						Email: 'Patient Email',
						Phone: 'Patient Phone',
					},
				}
			}

			await postData(prepareObject())
			this.loading.slots = true
			this.collapse.calendar = true
			setTimeout(async () => {
				await this.fetchSlots(this.weeksAmout)
				this.loading.slots = false
				this.dateObject.currentExactDate = exact
				this.loading.update = false
			}, 1500)
		},
		scrollTo(selector) {
			document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
		},
	},
})
