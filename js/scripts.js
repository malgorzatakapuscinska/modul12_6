var countriesList = $('#countries');

$('#search').click(searchCountries);
$('#country-name').keypress(function(){
	if(event.which == 13) searchCountries();
});

function searchCountries(){
	
	var countryName = $('#country-name').val();
	if(!countryName.length) countryName = 'Poland';
	var url = 'https://restcountries.eu/rest/v2/name/'; 
	var searchUrl = url + countryName;
	
	$.ajax({
	    dataType: "json",
	    method: 'GET',
	    url: searchUrl,
	    data: null,
	    beforeSend: function(){
	    	countriesList.empty();
	    	$('#countries').text('Loading....').css('text-align', 'center');
	    	
	    },
	    success: schowCountriesList
	})
	.fail(function(){
    	countriesList.empty();
    	$('#countries').text('Serwer\'s\ error or country doesn\'t\ exist. Please try again.').css('text-align', 'center');   
	});
}

function schowCountriesList(resp) {
	  countriesList.empty();
	  $('#countries').css('text-align', 'left');
	 
	 resp.forEach(function(item){
		 var countryTable = $('<table>');
		 var headerRow = $('<tr>');
		 var tableDescriptionRow =$('<tr>').append($('<td colspan="2">').text('Background information:'));
		 var capitalRow = $('<tr>').append($('<td>').text('Capital:'));
		 var areaRow = $('<tr>').append($('<td>').text('Area:'));
		 var populationRow = $('<tr>').append($('<td>').text('Population:'));
		 var currenciesRow = $('<tr>').append($('<td>').text('Currencies:'));
		 
		 var name = $('<th>').text(item.name);
		 var flagImg = $('<th>').append($('<img>').attr('src', item.flag||'unknown'));
		 var capital = $('<td>').text(item.capital||"Unknown");
		 var area = $('<td>').text(item.area||'Unknown' + " km2");
		 var population = $('<td>').text(item.population||'unknown');
		 var currenciesArray = item.currencies;
		 var currenciesObject = currenciesArray[0];
		 var currencies = $('<td>').text("code: " + currenciesObject.code||'unknown' + ", name: " +  currenciesObject.name||'unknown' + ", symbol: " + currenciesObject.symbol||'unknown');
		 
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