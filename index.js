let searchButton = document.getElementById('search-hero');
let input = document.getElementById('search');
document.addEventListener('click', handleEvent)
console.log(searchButton);
let favorites = [];
let searchResults = [];
input.addEventListener('input', handleSearch)


async function handleSearch(e) {
  const url = Common.apiUrl;
  const name = e.target.value;
  try {
    const data = await Common.apiRequest(`${url}/search/${name}`);
    searchResults = data.data.results;
    renderSearchResults()
  } catch(err) {
    console.log('error', err);
    return;
  }
}

function renderSearchResults() {
    console.log("In event listener")
    $('#super-hero-list').empty();
    var name = document.getElementById('search').value;
    var ul = document.getElementById('super-hero-list');
    if(name.length <= 2 || !searchResults || searchResults.length == 0) {
      ul.innerHTML = '<li class="no-results"> No results found <li>';
      return;
    }
    const favSuperHeroes = Common.getFavSuperHeroes();
            
                console.log(searchResults)
                searchResults.forEach((element) => {
                    var li = document.createElement('li');
                    const indexOfSuperHeroInFavourites = favSuperHeroes.findIndex(
                        (hero) => hero.id === element.id
                      );
                    console.log(indexOfSuperHeroInFavourites)
                    li.classList.add('search-result')
                    li.innerHTML = `
                        <div class="search-left card-img-left">
                          <img src=${element.image.url} alt="" />
                        </div>
                        <div class="search-right">
                          <a href="heroes.html?id=${element.id}">
                            <div class="name">${element.name}</div>
                          </a>
                          <div class="full-name">${
                            element.biography['full-name']
                          }</div>

                          <div class="address">${
                            element.biography['place-of-birth']
                          }</div>
                          <button class="btn add-to-fav" data-id=${
                            element.id
                          } style="display: ${
            indexOfSuperHeroInFavourites === -1 ? 'block' : 'none'
          }">Add to favourites</button>
                          <button class="btn remove-from-fav" data-id=${
                            element.id
                          }  style="display: ${
            indexOfSuperHeroInFavourites === -1 ? 'none' : 'block'
          }">Remove from favourites</button>
                        </div>
                      `;
                      ul.appendChild(li);
                });

}

function handleEvent(e) {
    const target = e.target;
    console.log(target)
    if(target.classList.contains('add-to-fav')) {
        const targetId = target.dataset.id;
        console.log(searchResults)
        const hero = searchResults.filter(
            (hero) => hero.id === targetId
        );
        Common.addToLocalStorage('favorites', hero[0]);
        renderSearchResults();
    } else if (target.classList.contains('remove-from-fav')) {
      // Find the hero data and remove from local storage
      const targetId = target.dataset.id;

      // Show add to fav button and hide the remove from fav button
      const addToFavBtn = document.querySelector(
        `button[data-id="${targetId}"].add-to-fav`
      );
      if (addToFavBtn) addToFavBtn.style.display = 'block';

      const removeFromFavBtn = document.querySelector(
        `button[data-id="${targetId}"].remove-from-fav`
      );
      if (removeFromFavBtn) removeFromFavBtn.style.display = 'none';

      Common.removeFavHeroes(targetId);
      renderSearchResults();
    }
}


function getHeroDetails(url) {
    console.log('hi')
    var id = getId(url);
    console.log(id);

}


function getId(url) {
    var params = {};
	var parser = document.createElement('a');
    parser.href = url;
    // console.log(parser)
    var query = parser.search.substring(1);
    // console.log(query)
    var vars = query.split('&');
    // console.log(vars);
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
}