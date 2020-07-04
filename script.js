var xhr = new XMLHttpRequest();
var xmlFiles = ['products_1.xml', 'products_2.xml', 'products_3.xml'];
var data = [];
var tableElem = document.getElementById('tableContent');
var btnElem = document.getElementById('loadMoreBtn');
var currentIndex = 3;

data = loadInitialPageContent();
orderByPriceASC();

var table = createTable();
showTable(table);