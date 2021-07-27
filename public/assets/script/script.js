
async function fetchMovies(url) {
    let response = await fetch(url);
    movies = await response.json();
    return movies;
}

(async function getPage(page = 1) {
    let limit = 20;
    let offset = limit * page;

    let movies = await fetchMovies(`http://localhost:8000/api/movies/${limit}/${offset}`);
    let moviesTotal = await fetchMovies(`http://localhost:8000/api/movies`);

    let count = moviesTotal.length;
    let nbpage = Math.ceil(count / limit);

    let moviesDiv = document.querySelector('.displayMovies');
    let divs = '';
    // let movies = movies2.skip(10).limit(10);
    movies.forEach(movie => {
        let div = `
            <div class="movie">
                <h3>${movie.title}</h3>
                <p class="durationGenre">${movie.min_duration} / ${movie.genre_name}</p>
                <p class="releaseDate">Release date : <span>${movie.release_date}</span></p>
                <p class="producer">Producer : <span>${movie.producer_name}</span> </p>
                <p class="descriptionLimited">${movie.summary}</p>
            </div> `
        divs += div;
    });
    moviesDiv.innerHTML = divs;

    let activePage = 1;
    let divPages = ''
    for (let i = 1; i <= nbpage; i++ ) {
        if (i == activePage) {
            let divPage = `<button class="page" id="activePage" onclick="getPage(${i})">${i}</button>`;
            divPages += divPage;
        } else {
            let divPage = `<button class="page" onclick="getPage(${i})">${i}</button>`
            divPages += divPage;
        }
    }

    document.querySelector('.pages').innerHTML = divPages;

})()