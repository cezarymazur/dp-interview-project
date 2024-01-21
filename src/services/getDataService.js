const apiUrl = import.meta.env.VITE_GET_API

async function fetchPartialData(url) {
	const response = await fetch(url)
	return response.json()
}

export const fetchData = async week => {
	const url = `${apiUrl}${week}`
	return await fetchPartialData(url)
}
