function loadInitialPageContent(){
	xmlFiles.forEach((file) => {
		getXMLFileContent(file);
	});
	return data;
}

function getXMLFileContent(file) {
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			parseXMLtoObjects(this.responseXML);
		}
	};
	xhr.open('GET', file, false);
	xhr.setRequestHeader('Content-Type', 'text/xml');
	xhr.send();
}

function parseXMLtoObjects(xml) {
	var i;
	var shopItems = xml.getElementsByTagName('SHOPITEM');
	var obj = {};
	
	for (i = 0; i < shopItems.length; i++) {
		obj.productName = {name: 'Product name', value: shopItems[i].getElementsByTagName('PRODUCTNAME')[0].childNodes[0].nodeValue};
		obj.description = {name: 'Description', value: shopItems[i].getElementsByTagName('DESCRIPTION')[0].childNodes[0].nodeValue};
		obj.url = {name: 'URL', value: '<a href="' + shopItems[i].getElementsByTagName('URL')[0].childNodes[0].nodeValue + '" target="_blank">Product details</a>'};
		obj.image = {name: 'Image', value: '<img src="' + shopItems[i].getElementsByTagName('IMGURL')[0].childNodes[0].nodeValue + '" alt="Picture" width="100" />'};
		obj.price = {name: 'Price', value: shopItems[i].getElementsByTagName('PRICE')[0].childNodes[0].nodeValue};
		data.push(obj);
		obj = {};
	}
}

function orderByPriceASC() {
	data.sort((obj1, obj2) => parseFloat(obj1.price.value) - parseFloat(obj2.price.value));
}

function createTable(rows = 3) {
	var table = '<tr><th>' + data[0].productName.name + '</th><th>' + data[0].description.name + '</th><th>' + 
	data[0].url.name + '</th><th>' + data[0].image.name + '</th><th>' + data[0].price.name + '</th></tr>';
	
	for (var i = 0; i < rows; i++) {
		table += '<tr><td>' + data[i].productName.value + '</td><td>' + data[i].description.value + '</td><td>' + 
		data[i].url.value + '</td><td>' + data[i].image.value + '</td><td>' + data[i].price.value + '</td></tr>';
	}
	return table;
}

function showTable(table) {
	tableElem.innerHTML = table;
}

function loadMoreProducts(amount = 3) {
	if ((currentIndex + amount) >= data.length) {
		amount = data.length - currentIndex;
		$('#loadMoreBtn').hide();
	}
	
	for (var i = 0; i < amount; i++) {
		$('#tableContent').append('<tr><td>' + data[i + currentIndex].productName.value + '</td><td>' + data[i +  currentIndex].description.value + '</td><td>' + data[i + currentIndex].url.value + '</td><td>' + 
		data[i + currentIndex].image.value + '</td><td>' + data[i + currentIndex].price.value + '</td></tr>');
	}
	currentIndex += amount;
}
