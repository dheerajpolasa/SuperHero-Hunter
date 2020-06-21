const Common = (function() {
    const apiToken = '2673729466208522';
    const apiUrl = `https://www.superheroapi.com/api.php/${apiToken}/`;
    async function apiRequest(url) {
        $('#super-hero-list').empty();
          var name = document.getElementById('search').value;
          if(name.length <= 2) return;
          try {
            const response = await fetch(url);
            const data = await response.json();
      
            return {
              data,
              success: true,
            };
          } catch (error) {
            console.log('error', error);
            return {
              error: error.message,
              success: false,
            };
          }
    }
    function getFavSuperHeroes() {
        return localStorage.getItem("favorites")
          ? JSON.parse(localStorage.getItem("favorites"))
          : [];
        // return existing;
    }
    function addToLocalStorage(favorites, obj) {
        console.log(obj);
        var existing = localStorage.getItem(favorites);
        existing = existing ? JSON.parse(existing) : [];
        if(!existing.includes(obj.id)) {
            existing.push(obj);
        }
        localStorage.setItem(favorites, JSON.stringify(existing));
    }
      
    function removeFavHeroes(targetId) {
        if (!targetId) return;
      
          let favouritesFromLocalStorage = getFavSuperHeroes();
      
          // Remove hero from localstorage
          favouritesFromLocalStorage = favouritesFromLocalStorage.filter(
            (item) => item.id !== targetId
          );
      
          // Save in localstorage
          localStorage.setItem(
            "favorites",
            JSON.stringify(favouritesFromLocalStorage)
          );
    }
      

    return {
          getFavSuperHeroes,
          addToLocalStorage,
          removeFavHeroes,
          apiRequest,
          apiUrl
    }
})();