const apiUrl = import.meta.env.VITE_POST_API

export const postData = async preperedObject => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(preperedObject),
	}
	await fetch(apiUrl, requestOptions)
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
