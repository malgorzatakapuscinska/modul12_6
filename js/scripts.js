var countriesList = $('#countries');

$('#search').click(searchCountries);
$('#country-name').keypress(function(){
	if(event.which == 13) searchCountries();
});

function searchCountries(){
	
	var countryName = $('#country-name').val(); //pobiera nazwę państwa podaną przez uzytkownika za pomocą formularza
	/*console.log(countryName);
	console.log(countryName.length);*/
	if(!countryName.length) countryName = 'Poland';
	/*console.log(countryName);*/
	var url = 'https://restcountries.eu/rest/v2/name/'; 
	var searchUrl = url + countryName;
	/*console.log(searchUrl);*/
	
	//Sending a requesr
	
	$.ajax({
	    dataType: "json",
	    method: 'GET',
	    url: searchUrl,
	    data: null,
	    success: schowCountriesList,
	}).fail(function(){
    	countriesList.empty();
    	$('#countries').text('Błąd serera lub brak państwa o podanej nazwie').css('text-align', 'center');   
	});
	
	function schowCountriesList(resp) {
		  countriesList.empty();
		  $('#countries').css('text-align', 'left');
		 
		  /*var flag = $('<td>').text(item.capital);*/
		 resp.forEach(function(item){
			 var countryTable = $('<table>');
			 var headerRow = $('<tr>');
			 var tableDescriptionRow =$('<tr>').append($('<td colspan="2">').text('Background information:'));
			 var capitalRow = $('<tr>').append($('<td>').text('Capital:'));
			 var areaRow = $('<tr>').append($('<td>').text('Area:'));
			 var populationRow = $('<tr>').append($('<td>').text('Population:'));
			 var currenciesRow = $('<tr>').append($('<td>').text('Currencies:'));
			 
			 var name = $('<th>').text(item.name);
			 var flagImg = $('<th>').append($('<img>').attr('src', item.flag));
			 console.log(flagImg);
			 var capital = $('<td>').text(item.capital);
			 var area = $('<td>').text(item.area + " km2");
			 var population = $('<td>').text(item.population);
			 var currenciesArray = item.currencies;
			 var currenciesObject = currenciesArray[0];
			 var currencies = $('<td>').text("code: " + currenciesObject.code + ", name: " +  currenciesObject.name + ", symbol: " + currenciesObject.symbol);
			 
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
			 
			 //adding table to coutriesList
			 
			 countryTable.appendTo(countriesList);
			});
	} 
}
