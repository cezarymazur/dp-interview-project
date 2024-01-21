import { defineStore } from 'pinia'
import { fetchData } from '@/services/getDataService'
import { postData } from '@/services/postDataService'
import { processData } from '@/services/processDataService'

export const useCalendarStore = defineStore('CalendarStore', {
	state: () => {
		return {
			slots: [],
			weeksAmout: 6,
			weeksData: [],
			dateObject: {},
			currentExactDate: 'Monday, 17 May 2021 at 11:00',
			loadingSlots: true,
			updateLoading: false,
			confirmVisible: false,
			isCollapsed: true,
		}
	},
	actions: {
		async getAndProcessData() {
			await this.fetchSlots(this.weeksAmout)
			const rawCalendarData = this.slots
			this.weeksData = processData(rawCalendarData, this.weeksAmout)
		},
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
			this.confirmVisible = true
			this.dateObject.Start = start
			this.dateObject.End = end
			this.dateObject.exactMeetingDate = exact
			document.querySelector('#confirm')?.scrollIntoView({ behavior: 'smooth' })
		},
		async update(start, end, exact) {
			this.updateLoading = true
			this.confirmVisible = false
			document.querySelector('#main')?.scrollIntoView({ behavior: 'smooth' })
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
			this.loadingSlots = true
			this.isCollapsed = true
			setTimeout(async () => {
				await this.getAndProcessData()
				this.loadingSlots = false
				this.currentExactDate = exact
				this.updateLoading = false
			}, 1500)
		},
	},
})
