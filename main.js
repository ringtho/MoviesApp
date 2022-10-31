const API_URL = `
https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6a0c94f9562fd93009018d839ea1df8d&page=1`
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=6a0c94f9562fd93009018d839ea1df8d&query="`
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

//GET initial movies
getMoviesData(API_URL)

async function getMoviesData(url){
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies){
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}"/>
        <div class="movie--info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>overview</h3>
            ${overview}
        
        `
        main.appendChild(movieEl)
    });
}

function getClassByRate(rate){
    if (rate >= 8 ){
        return 'green'
    }else if ( rate >= 5){
        return 'orange'
    }else {
        return 'red'
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault() 
    //so that the event listener does not submit to the page and thus create a page reload
    const searchTerm = search.value
    if (searchTerm && searchTerm !== ''){
        getMoviesData(SEARCH_API + searchTerm)
    }else{
        window.location.reload()
        //reloads the window
    }
})

