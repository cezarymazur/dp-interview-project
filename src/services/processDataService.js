export const processData = (rawData, appearances) => {
	const processedData = []
	const divadedData = []
	for (let i = 0; i < (appearances - 1) * 7; i++) {
		const singlePoint = {}
		const newPoint = new Date()
		newPoint.setDate(new Date().getDate() + i)

		const dayIndicator = newPoint.toISOString().slice(0, 10)

		if (i === 0) {
			singlePoint.name = 'Today'
		} else if (i === 1) {
			singlePoint.name = 'Tomorrow'
		} else {
			singlePoint.name = newPoint.toLocaleDateString('en-EN', { weekday: 'short' })
		}

		singlePoint.dayNumber = `${newPoint.getDate()} ${newPoint.toLocaleDateString('en-EN', { month: 'short' })}`
		singlePoint.hours = rawData.filter(hour => hour.Start.includes(dayIndicator))
		singlePoint.hours.forEach(hour => (hour.exactStartHour = hour.Start.slice(11, 16)))

		processedData.push(singlePoint)
	}

	if (window.innerWidth > 768) {
		for (let i = 0; i < processedData.length / 7; i++) {
			divadedData.push(processedData.slice(i * 7, i * 7 + 7))
		}
		return divadedData
	} else {
		for (let i = 0; i < processedData.length / 3; i++) {
			divadedData.push(processedData.slice(i * 3, i * 3 + 3))
		}
		return divadedData
	}
}
