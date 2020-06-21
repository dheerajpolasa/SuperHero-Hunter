window.onload = function() {
    var id = getId(window.location.href);
    console.log(id);
    var baseUrl = 'https://superheroapi.com/api.php/2673729466208522/';
    var url = baseUrl + id['id'];
    console.log(url);
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = function(xml) {
        var data = JSON.parse(xhrRequest.response);
        // var responseJSON = null;
        console.log(data);
        var detailsContainer = document.getElementById('details');
        detailsContainer.innerHTML = `
                                          <img src=${data.image.url} alt="" />
                                          <h1>${data.name}</h1>
                                          <h3>${data.biography['full-name']}</h3>

                                          <div class="power-stats">
                                            <div><span> Intelligence </span> <span> ${data.powerstats.intelligence}</span></div>
                                            <div><span> Strength </span> <span> ${data.powerstats.strength}</span></div>
                                            <div><span> Speed </span> <span> ${data.powerstats.speed}</span></div>
                                            <div><span> Durability </span> <span> ${data.powerstats.durability}</span></div>
                                            <div><span> Power </span> <span>${data.powerstats.power}</span></div>
                                            <div><span> Combat </span> <span>${data.powerstats.combat}</span></div>
                                          </div>
                                        `;
    }
    xhrRequest.open('GET', url, true);
    xhrRequest.send();

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