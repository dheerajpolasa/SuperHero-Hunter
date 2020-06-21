window.onload = function() {
    let favHeroes = Common.getFavSuperHeroes();
    document.addEventListener('click', handleEvent);
    let list = document.getElementById('search-result');
    // for(var i=0; i<favHeroes.length; i+=2) {
    //     var li = document.createElement('li');
    //     var aTag = document.createElement('a');
    //     aTag.innerText = existing[i+1];
    //     aTag.setAttribute('href', './heroes.html?id=' + existing[i]);
    //     li.append(aTag);
    //     list.appendChild(li);
    // }
    favHeroes.forEach((element) => console.log(element.image))
    favHeroes.forEach((element) => {
        let li = document.createElement('li');
        li.classList.add('search-result')
        li.innerHTML = `
                    <div class="search-left">
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
                      <button class="btn remove-from-fav" data-id=${
                        element.id
                      }  style="display:'block'">Remove from favourites</button>
                    </div>
                  `;
                  list.appendChild(li);
    });
}

function handleEvent(e) {
    console.log(e.target);
    const target = e.target;
    if (target.classList.contains('remove-from-fav')) {
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
        location.reload();
      }
}