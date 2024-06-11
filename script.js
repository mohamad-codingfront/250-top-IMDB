let movies
const moviesListEl = document.getElementById("moviesList")

function fetchMovies(page = 1) {
    fetch('https://moviesapi.codingfront.dev/api/v1/movies?page=' + page).then(function (response) {
        toggleLoading()
        return response.json()
    }).then(function (json) {
        renderList(json.data)
        renderPagination(json.metadata)
    }).catch(function (e) {
        console.log(e)
    })
}

function renderCard(movie) {
    const colEl = document.createElement('div')
    colEl.className = 'col'

    const cardEl = document.createElement('div')
    cardEl.className = 'card shadow-sm h-100'

    const imgEl = document.createElement("img")
    imgEl.className = "card-img-top"
    imgEl.src = movie.poster

    const cardBodyEl = document.createElement('div')
    cardBodyEl.className = "card-body"

    const cardTitle = document.createElement('h5')
    cardTitle.className = "card-title"
    cardTitle.innerHTML = movie.title
    cardBodyEl.appendChild(cardTitle)

    const cardText = document.createElement('div')
    cardText.className = "card-text"
    cardText.innerHTML = movie.year + " | " + movie.country;
    cardBodyEl.appendChild(cardText)

    cardEl.appendChild(imgEl)
    cardEl.appendChild(cardBodyEl)

    colEl.appendChild(cardEl)
    moviesListEl.appendChild(colEl)
}

function renderList(movies) {
    movies.forEach(function (movie) {
        renderCard(movie)
    })
}

function toggleLoading() {
    document.getElementsByClassName("spinner-border")[0].classList.toggle("d-none")
}

function renderPagination(metadata) {
    const paginationEl = document.getElementsByClassName("pagination")[0]

    for (let idx = 1; idx <= metadata.page_count; idx++) {
        const itemButtonEl = document.createElement("button")
        itemButtonEl.className = "page-link"
        if (Number(metadata.current_page) === idx) {
            itemButtonEl.classList.add("active")
        }
        itemButtonEl.innerHTML = idx
        itemButtonEl.onclick = function () {
            moviesListEl.innerHTML = ""
            paginationEl.innerHTML = ""
            toggleLoading()
            fetchMovies(idx)
        }

        const itemLiEl = document.createElement("li")
        itemLiEl.className = "page-item"

        itemLiEl.appendChild(itemButtonEl);
        paginationEl.appendChild(itemLiEl)
    }
}

fetchMovies()