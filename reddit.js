const formats = ['jpg', 'png', 'gif']

function handleRedditJSON(a, data) {
	if (data.statusCode != 200) {
		response.inner.HTML='<h1 id=failed>Failed to get images from Reddit</h1>'
	}

	let children = data.body.data.children
	children = children.sort(function (a, b) {
		return b.data.ups - a.data.ups
	}).filter(function (child) {
		let url = child.data.url
		if (!url) {
			return false
		}

		url = url.split('?')[0]
		for (let format of formats) {
			if (url.endsWith('.' + format)) {
				return true
			}
		}
		return false
	})
	let html = ''
	for (let child of children) {
		const data = child.data
		html += `<a href='https://reddit.com${data.permalink}' target='_blank' style='background-image: url("${data.url}");'><div><h1>${data.title}</h1><h2>${data.ups}</h2></div></a>`
		console.log(child)
	}
	response.innerHTML = html
}

function getImages(subreddit) {
const request = window.superagent

const url = `https://www.reddit.com/r/${subreddit}.json`
request.get(url, handleRedditJSON)
}

const aww = document.querySelector('nav a#aww')
const earth = document.querySelector('nav a#earth')
const space = document.querySelector('nav a#space')
const trump = document.querySelector('nav a#trump')
const timing = document.querySelector('nav a#timing')
const food = document.querySelector('nav a#food')
const cars = document.querySelector('nav a#cars')
const custom = document.querySelector('nav input')
const response = document.querySelector('div#response')



getImages('aww')

aww.addEventListener('click', function () {
	const active = document.querySelector('nav a.active')
	if (active) {
		active.classList.remove('active')
	}
	aww.classList.add('active')
	response.innerHTML = ''
	getImages('aww')

})

earth.addEventListener('click', function () {
	const active = document.querySelector('nav a.active')
	if (active) {
		active.classList.remove('active')
	}
	earth.classList.add('active')
	response.innerHTML = ''
	getImages('EarthPorn')

})

space.addEventListener('click', function () {
	const active = document.querySelector('nav a.active')
	if (active) {
		active.classList.remove('active')
	}
	space.classList.add('active')
	response.innerHTML = ''
	getImages('SpacePorn')

})

trump.addEventListener('click', function () {
	const active = document.querySelector('nav a.active')
	if (active) {
		active.classList.remove('active')
	}
	trump.classList.add('active')
	response.innerHTML = ''
	getImages('The_Donald')

})

timing.addEventListener('click', function () {
	const active = document.querySelector('nav a.active')
	if (active) {
		active.classList.remove('active')
	}
	timing.classList.add('active')
	response.innerHTML = ''
	getImages('PerfectTiming')

})

food.addEventListener('click', function () {
	const active = document.querySelector('nav a.active')
	if (active) {
		active.classList.remove('active')
	}
	food.classList.add('active')
	response.innerHTML = ''
	getImages('Food')

})

cars.addEventListener('click', function () {
	const active = document.querySelector('nav a.active')
	if (active) {
		active.classList.remove('active')
	}
	food.classList.add('active')
	response.innerHTML = ''
	getImages('Cars')
})
	
custom.addEventListener('keydown', function (event) {
	if (event.keyCode != 13 || custom.value == '') {
		return
	}

	const active = document.querySelector('nav a.active')
	if (active) {
		active.classList.remove('active')
	}
	response.innerHTML = ''
	getImages(custom.value)
})
