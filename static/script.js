
$(document).ready(function() {

    loadPlanets();
    defineNavigationButtonsListeners();
});

// residents-modal

function defineNavigationButtonsListeners() {
    $('#controll-buttons .btn').click(function() {
        var link = $(this).data('link');
        loadPlanets(link);
    });
}

function defineResidentsButtonsListeners(residents) {
    $('#planet_data .resident').click(function(residents) {
        $('#residents-modal').modal('show');
        for (var j = 0; j < residents.length; j++) {
            $.ajax({
                dataType: "json",
                url: residents[j],
                success: function(response) {

                    var residentTable = $("#resident_data");
                    var residentRow = `
                    <tr>
                        <td>${response.name}</td>
                        <td class="diam">${response.height}</td>
                        <td>${response.mass}</td>
                        <td>${response.hair_color}</td>
                        <td class="water">${response.skin_color}</td>
                        <td class="ppl">${response.eye_color}</td>
                        <td>${response.birth_year}</td>
                        <td>${response.gender}</td>
                    </tr>`;
                    
                    residentTable.append(residentRow);
                }
            });
        }
    });
}

function loadPlanets(url = 'https://swapi.co/api/planets') {
    
    $.ajax({
        dataType: "json",
        url: url,
        success: function(response) {
            var planets = response.results;
            var planetTable = $("#planet_data");
            planetTable.find("tr:not(:first)").remove();

            for (var i = 0; i < planets.length; i++) {
                var planetData = planets[i];
                var diaInt = parseInt(planetData.diameter);
                var diameter = diaInt.toLocaleString();
                var residents = planetData.residents;
                

                population = 'unknown';
                if (planetData.population !== 'unknown') {
                    var populationInt = parseInt(planetData.population);
                    population = populationInt.toLocaleString() + ' people';
                }
                surfaceWater = 'unknown';
                if (planetData.surface_water !== 'unknown') {
                    var surfaceWater = parseInt(planetData.surface_water);
                    surfaceWater = surfaceWater.toLocaleString() + '%';
                }

                diameter = 'unknown';
                if (planetData.diameter !== 'unknown') {
                    var diameter = parseInt(planetData.diameter);
                    diameter = diameter.toLocaleString() + ' km';
                }
                var numberOfResidents = planetData.residents.length;
                
                var planetRow = `
                <tr>
                    <td>${planetData.name}</td>
                    <td class="diam">${diameter}</td>
                    <td>${planetData.climate}</td>
                    <td>${planetData.terrain}</td>
                    <td class="water">${surfaceWater}</td>
                    <td class="ppl">${population}</td>
                    <td><input class="btn btn-primary resident" type="button" value=${numberOfResidents} /></td>
                </tr>`;
                planetTable.append(planetRow);
                defineResidentsButtonsListeners(residents);
                
            }
            setNavigationButtonLinks(response.next, response.previous);
        }
    });
}

function setNavigationButtonLinks(nextLink, prevLink) {
    var nextButton = $('#next');
    var prevButton = $('#previous');

    if (nextLink !== null) {
        nextButton.data('link', nextLink);
        nextButton.show();
    } else {
        nextButton.hide();
    }
    if (prevLink !== null) {
        prevButton.data('link', prevLink);
        prevButton.show();
    } else {
        prevButton.hide();
    }
}