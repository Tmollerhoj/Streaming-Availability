var searchBarEl = document.querySelector('#search-bar');
var itemCard = $('.item-card');
var movie = $('.movies');
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
		const poster = item.posterURLs[185];
		const rating = item.imdbRating;
		const id = item.imdbId
		const stream = item.streamingInfo.us;
		movie.addClass("item-card")
        movie.innerHTML = '<img src=' + poster + '></img><h4>'+name+'</h4> <h6>'+rating+'</h6><a href = "https://www.imdb.com/title/'+id + '" target = "_blank">See on IMDB</a>'

	// 	for (var key in stream) {
	// 	console.log(key)
	// 	if (key == "apple") {
	// 		let apple = '<input type="button">Apple</button>'
	// 		movie.append(apple)
	// 	} 
	// 	else if (key == "hbo") {
	// 		console.log("working fine")
	// 	}
	// 	else if (key == "hulu"){
	// 		console.log("working as well")
	// 	}
	// 	else if (key == "prime"){
	// 		console.log("working, but complaining about it")
	// 	}
	// 	else if (key == "netflix"){
	// 		console.log("working almost too well")
	// 	}
	// 	else {
	// 		console.log("Blank")
	// 	}
	// }
	})
})
};
searchBarEl.addEventListener('submit', SearchFormSubmit);