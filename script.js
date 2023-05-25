var searchBarEl = document.querySelector('#search-bar');
function SearchFormSubmit(event) {
    event.preventDefault();


var search = document.querySelector('#search-input').value;
fetch('https://streaming-availability.p.rapidapi.com/v2/search/title?title=' + search + '&country=us&output_language=en', {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9d90a6c0a4mshd6e2219c374ff2cp1212a2jsnf0f6d6f9d738',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
})


.then(response => response.json()) 
.then(data => {
	console.log(data)
	const list = data.result;

	list.map((item) => {
	const name = item.title;
		const poster = item.posterURLs[92];
		const rating = item.imdbRating;
		const id = item.imdbId
		const movie = `<div class = "item-card"><img src="${poster}"> <h4>${name}</h4> <h4>${rating}</h4><a href = "https://www.imdb.com/title/${id}" target = "_blank">See on IMDB</a></div>`

	 	document.querySelector('.movies').innerHTML += movie;
	
	})
})
};
searchBarEl.addEventListener('submit', SearchFormSubmit);