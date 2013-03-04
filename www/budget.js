$(document).bind("mobileinit", function(){
	$.mobile.page.prototype.options.addBackBtn = true;
	$.mobile.defaultPageTransition = 'none';
	// Initilize Web SQL Database
	db = window.openDatabase("ExpenseTrackerDemo", "1.0", "Expense Tracker Demo Database", 200000);
	db.transaction(function(tx) {

		tx.executeSql("CREATE TABLE IF NOT EXISTS budget (budgetID INTEGER PRIMARY KEY, budgetAmount INTEGER, budgetDATE text)");

	});
});

// Global declarations
var budgetAmountVar = null;
var budgetDate = null;

var contentMainVar = null;
var contentDialogVar = null;
var contentMessageVar = null;
var contentOKVar = null;
var confirmationOKVar = null;
var d = new Date();
var curr_date = d.getDate();
var curr_month = d.getMonth() + 1;
var curr_year = d.getFullYear();
var date_string = curr_month + "/" + curr_date + "/" + curr_year;

// Constants
var EMPTY = "";

function resetDB() {
	db.transaction(function(tx) {
		tx.executeSql('DROP TABLE IF EXISTS budget', [], function(){
			document.location = 'index.html';
		});
	});
}

function formatCurrency(num) {
	num = isNaN(num) || num === '' || num === null ? 0.00 : num;
	return parseFloat(num).toFixed(2);
}