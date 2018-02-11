var url = 'https://restcountries.eu/rest/v1/name/';
var countriesList = $('#countries');

$('#search').click(searchCountries); 

function searchCountries(){
	var countryName = $('#country-name').val(); //pobiera nazwę państwa podaną przez uzytkownika za pomocą formularza
	/*console.log(countryName);
	console.log(countryName.length);*/
	if(!countryName.length) countryName = 'Poland';
	/*console.log(countryName);*/
	
	var url = 'https://restcountries.eu/rest/v2/name/';
	var searchUrl = url + countryName;
	console.log(searchUrl);
	
	$.ajax({
	    dataType: "json",
	    method: 'GET',
	    url: searchUrl,
	    data: null,
	    success: schowCountriesList
	});
	
	function schowCountriesList(resp) {
		  countriesList.empty();
		 
		  /*var flag = $('<td>').text(item.capital);*/
		 resp.forEach(function(item){
			 var countryTable = $('<table>');
			 var headerRow = $('<tr>');
			 var tableDescriptionRow =$('<tr>').append($('<td>').text('Background information: '));
			 var capitalRow = $('<tr>').append($('<td>').text('Capital: '));
			 var areaRow = $('<tr>').append($('<td>').text('Area: '));
			 var populationRow = $('<tr>').append($('<td>').text('Population: '));
			 var currenciesRow = $('<tr>').append($('<td>').text('Currencies: '));
			 
			 var name = $('<td>').text(item.name);
			 var flagImg = $('<td>').append($('<img>').attr('src', item.flag));
			 var capital = $('<td>').text(item.capital);
			 var area = $('<td>').text(item.area + " km2");
			 var population = $('<td>').text(item.population);
			 var currenciesArray = item.currencies;
			 var currenciesObject = currenciesArray[0];
			 var currencies = "code: " + currenciesObject.code + ", name: " +  currenciesObject.name + ", symbol: " + currenciesObject.symbol;
			 
			 //CREATING RABLE'S ROW
			 
			 headerRow.append(flagImg);
			 headerRow = headerRow.append(name);
			 capitalRow = capitalRow.append(capital);
			 areaRow = areaRow.append(area);
			 populationRow = populationRow.append(population);
			 currenciesRow = currenciesRow.append(currencies);
			 
			 //ADDING ROWS TO CAUNTRY'S TABLE
			 
			 headerRow.appendTo(countryTable);
			 tableDescriptionRow.appendTo(countryTable);
			 capitalRow.appendTo(countryTable);
			 areaRow.appendTo(countryTable);
			 populationRow.appendTo(countryTable);
			 currenciesRow.appendTo(countryTable);
			 
			 countryTable.appendTo(countriesList);
			});
		}
} 

