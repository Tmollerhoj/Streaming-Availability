var searchBarEl = document.querySelector('#search-bar');
var itemCard = document.querySelector('.item-card')
function SearchFormSubmit(event) {
	event.preventDefault();



	var search = document.querySelector('#search-input').value;

	fetch('https://streaming-availability.p.rapidapi.com/v2/search/title?title=' + search + '&country=us&output_language=en', {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'd5755c2d63mshc1446e0e8597a11p15ced3jsn470832db8273',
			'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
		}
	})


		.then(response => response.json())
		.then(data => {
			console.log(data)
			const list = data.result;

			document.querySelector('.movies').innerHTML = ''

			var searchOption = `<option value=${search}">${search}</option>`

			document.querySelector('#movie-select').innerHTML += searchOption;
			addToLocalStorage(search)

			list.map((item) => {
				const name = item.title;
				const poster = item.posterURLs[92];
				const rating = item.imdbRating;
				const id = item.imdbId
				const movie = `<div class = "item-card"><img src="${poster}"> <h4>${name}</h4> <h4>${rating}</h4><a href = "https://www.imdb.com/title/${id}" target = "_blank">See on IMDB</a></div>`

				document.querySelector('.movies').innerHTML += movie;

			})
		})
}
const renderLocalStorageHistory = () => {
	const historyListEl = document.getElementById("history-list")
	let local = localStorage.getItem("history")
	let history
	if (local) {
		history = JSON.parse(local)
	} else {
		history = {}
	}
	historyListEl.innerHTML = "";
	const optionEl = document.createElement("option")
	optionEl.innerText = "---";
	optionEl.value = "";
	historyListEl.appendChild(optionEl)

}
const addToLocalStorage = (movieName) => {
	let local = localStorage.getItem("history")
	let history
	if (local) {
		history = JSON.parse(local)
	} else {
		history = {}
	}
	history[movieName] = true;
	localStorage.setItem("history", JSON.stringify(history))
	renderLocalStorageHistory()

}

function searchHistory(event) {
	event.preventDefault()
	let movieName = document.getElementById("history-list").value.trim()
	fetchMovie(movieName)
}

fetchMovie();
searchBarEl.addEventListener('submit', SearchFormSubmit);