const $searchSection = document.querySelector('section#search')
const $search = $searchSection.querySelector('input')
const $moviesSection = document.querySelector('section#movies')

const request = window.superagent
const api = 'https://www.omdbapi.com/?'


$search.addEventListener('keydown', function (event) {
    if (event.keyCode == 13) {
        const search = $search.value
        if (search.length > 1) {
            const endpoint = `${api}type=movie&s=${search}`
            request.get(endpoint, function (_, response) {
                const status = response.body.Response
                if (status == 'True') {
                    let html = ''
                    for (let movie of response.body.Search) {
                        let noPoster = ''
                        if (movie.Poster == 'N/A') {
                            noPoster = 'no-poster'
                        }
                        html += `<a href='http://www.imdb.com/title/${movie.imdbID}'target='_blank' style='background-image: url("${movie.Poster}");'><div class='${noPoster}'><span>${movie.Title}</span></div></a>`
                    }
                    $moviesSection.innerHTML = html
                    $searchSection.classList.add('hidden')
                    $moviesSection.classList.remove('hidden')
                }
                else {
                    console.log('Invalid')
                }
            })
        }
    }
})