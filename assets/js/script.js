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

	list.map((item) => {
	const name = item.title;
		const poster = item.posterURLs[185];
		const rating = item.imdbRating;
		const id = item.imdbId
		const stream = item.streamingInfo.us;
		var services = "";
		var icons = "";
		for (var key in stream) {
			console.log(key)
			if (key == "apple") {
				let appleText = "<input type='button'>Apple</input>"
				icons = services.concat(appleText);
			} 
			else if (key == "hbo") {
				let hboText = "<input type='button'>HBO</input>"
				icons = services.concat(hboText);
			}
			else if (key == "hulu"){
				let huluText = "<input type='button'>Hulu</input>"
				icons = services.concat(huluText);
			}
			else if (key == "prime"){
				let primeText = "<input type='button'>Prime</input>"
				icons = services.concat(primeText);
			}
			else if (key == "netflix"){
				let netflixText = "<input type='button'>Netflix</input>"
				icons = services.concat(netflixText);
			}
			else {
				console.log(icons)
			}
			console.log(icons)
		}
		var movie = `<div class = "item-card"><img src="${poster}"> <h4>${name}</h4> <h4>${rating}</h4><a href = "https://www.imdb.com/title/${id}" target = "_blank">See on IMDB</a> <div>${icons}</div> </div>`

	 	document.querySelector('.movies').innerHTML += movie;
		
	})
})
};
searchBarEl.addEventListener('submit', SearchFormSubmit);