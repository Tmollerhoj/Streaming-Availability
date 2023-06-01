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
		var icons = "";
		for (var key in stream) {

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
			else if (key == "hulu"){
				let huluLink = item.streamingInfo.us.hulu[0].link
				let huluText = `<a href = "${huluLink}"> <button class="cyan darken-3">Hulu</button></a>`
				icons += huluText;
				
			}
			else if (key == "prime"){
				let primeLink = item.streamingInfo.us.prime[0].link
				let primeText = `<a href = "${primeLink}"> <button class="cyan darken-3">Prime</button></a>`
				icons += primeText;
				
			}
			else if (key == "netflix"){
				let netflixLink = item.streamingInfo.us.netflix[0].link
				let netflixText = `<a href = "${netflixLink}"> <button class="cyan darken-3">Netflix</button></a>`
				icons += netflixText;
				
			}
			else {
			}

		}
		
		var movie = `<div class = "item-card"><img src="${poster}"> <h4>${name}</h4> <h4>${rating}</h4><a href = "https://www.imdb.com/title/${id}" target = "_blank">See on IMDB</a> <div>${icons}</div> </div>`

	 	document.querySelector('.movies').innerHTML += movie;

	})
})
};
searchBarEl.addEventListener('submit', SearchFormSubmit);