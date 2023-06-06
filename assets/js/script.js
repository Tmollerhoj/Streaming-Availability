var searchBarEl = document.querySelector('#search-bar');
var selectSearch = document.querySelector('#movie-select')
//var itemCard = document.querySelector('.item-card')
var historyList = document.querySelector("#movie-select")
var moviesEl=document.querySelector(".movies")
var searchField=document.querySelector('#search-input')
var top100El = document.querySelector('#top100');

function SearchFormSubmit(event) {
	event.preventDefault();

	moviesEl.innerHTML = ''

	var search = searchField.value;


	//fetch data from streaming availability api
	fetch('https://streaming-availability.p.rapidapi.com/v2/search/title?title=' + search + '&country=us&output_language=en', {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'd5755c2d63mshc1446e0e8597a11p15ced3jsn470832db8273',
			'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
		}
	})

		
		.then(response => response.json())
		.then(data => {
			console.log("data",data)
			const list = data.result;
			var searchOption = `<option value=${search}">${search}</option>`

			document.querySelector('#movie-select').innerHTML += searchOption;
			
			addToLocalStorage(search)

			for(let item of list){
				const name = item.title;
				const poster = item.posterURLs[185];
				const rating = item.imdbRating;
				const id = item.imdbId
				const stream = item.streamingInfo.us;
				var icons = "";
				for (var key in stream) {
					//for each streaming service, make a button that links to that service's movie page
					if (key == "apple") {
						let appleLink = item.streamingInfo.us.apple[0].link
						let appleText = `<a href = "${appleLink}"> <button class="cyan darken-3">Apple</button></a>`
						icons += appleText;

					}
					else if (key == "hbo") {
						let hboLink = item.streamingInfo.us.hbo[0].link
						let hboText = `<a href = "${hboLink}"> <button class="cyan darken-3">MAX</button></a>`
						icons += hboText;

					}
					else if (key == "hulu") {
						let huluLink = item.streamingInfo.us.hulu[0].link
						let huluText = `<a href = "${huluLink}"> <button class="cyan darken-3">Hulu</button></a>`
						icons += huluText;

					}
					else if (key == "prime") {
						let primeLink = item.streamingInfo.us.prime[0].link
						let primeText = `<a href = "${primeLink}"> <button class="cyan darken-3">Prime</button></a>`
						icons += primeText;

					}
					else if (key == "netflix") {
						let netflixLink = item.streamingInfo.us.netflix[0].link
						let netflixText = `<a href = "${netflixLink}"> <button class="cyan darken-3">Netflix</button></a>`
						icons += netflixText;

					}
					else {
					}

				}
				//creates a card containing the poster, name, rating, and links for IMDB and various sites to watch.
				var movie = `<div class = "item-card"><img src="${poster}"> <h4>${name}</h4> <h6>${rating}</h6><a href = "https://www.imdb.com/title/${id}" target = "_blank">See on IMDB</a> <div>${icons}</div> </div>`

				document.querySelector('.movies').innerHTML += movie;

			}

		})
}

function top100 (event) {
	event.preventDefault();

	moviesEl.innerHTML = ''

	var search = searchField.value;

fetch('https://imdb-top-100-movies.p.rapidapi.com/', {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9d90a6c0a4mshd6e2219c374ff2cp1212a2jsnf0f6d6f9d738',
		'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
	}
	})

.then(response => response.json())
.then(data => {
	console.log("data",data)
	const list = data;
	var searchOption = `<option value=${search}">${search}</option>`

	document.querySelector('#movie-select').innerHTML += searchOption;
	
	addToLocalStorage(search)

	for(let item of list){
		const name = item.title;
		const poster = item.image;
		const rating = item.rating;
		const id = item.imdbid;

		//creates a card containing the poster, name, rating, and links for IMDB and various sites to watch.
		var movie = `<div class = "item-card"><img src="${poster}"> <h4>${name}</h4> <h6>${rating}</h6><a href = "https://www.imdb.com/title/${id}" target = "_blank">See on IMDB</a></div>`

		document.querySelector('.movies').innerHTML += movie;
	}
	})
};

const renderLocalStorageHistory = () => {
	const historyListEl = document.getElementById("movie-select")
	let local = localStorage.getItem("history")
	console.log(local)
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
	let array = Object.keys(history)
	console.log(array)
	for (let element of array) {
		if (element == "") {
			continue
		}
		const optionEl = document.createElement("option")
		optionEl.innerText = element
		optionEl.value = element
		historyListEl.appendChild(optionEl)

	}
}
const addToLocalStorage = (movieName) => {
	let local = localStorage.getItem("history") //get the old history 
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

function handleHistoryChange(event) {
	let value = event.target.value
	document.getElementById("search-input").value = value
}


searchBarEl.addEventListener('submit', SearchFormSubmit);
historyList.addEventListener('change', handleHistoryChange);
renderLocalStorageHistory();
top100El.addEventListener('click', top100);