fetch('https://imdb8.p.rapidapi.com/auto-complete?q=action', { 
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6c55c341bfmsh892a84a742728d7p17f13bjsn381b5064ed50',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
})
.then(response => response.json()) 
.then(data => {
	const list = data.d;

	list.map((item) => {
		const name = item.l;
		const poster = item.i.imageUrl;
		const movie = `<li><img src="${poster}"> <h2>${name}</h2><li>`
		document.querySelector('.movies').innerHTML += movie;
	})
})
