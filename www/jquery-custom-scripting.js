$(document).bind("mobileinit", function(){
	$.mobile.page.prototype.options.addBackBtn = true;
	$.mobile.defaultPageTransition = 'none';
	// Initilize Web SQL Database
	db = window.openDatabase("ExpenseTrackerDemo", "1.0", "Expense Tracker Demo Database", 200000);
	db.transaction(function(tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS expenses (expenseID INTEGER PRIMARY KEY, budgetID INTEGER, expenseType TEXT, expenseAmount INTEGER, expenseDate TEXT)");
	
		tx.executeSql("CREATE TABLE IF NOT EXISTS budget (id INTEGER PRIMARY KEY, budgetAmount INTEGER, budgetDate TEXT)");

		tx.executeSql("CREATE TABLE IF NOT EXISTS listing (id INTEGER PRIMARY KEY, selectedBudget INTEGER, totalExpenses INTEGER, remaining INTEGER, entryDate TEXT)");
		
		tx.executeSql("CREATE TABLE IF NOT EXISTS expenseTransfer (id INTEGER PRIMARY KEY, budgetID INTEGER, expenseType TEXT, expenseAmount INTEGER, expenseDate TEXT)");
		
		console.log('All table created');
		
	});
});

// Global declarations
var hdnSelectBudget = null;
var hdnmenuValue = null;
var hiddenExpense = null;
var result = null;
var menuHidden = null;
var total = null;
var remain = null;
var menuValue = null;
var compute = null;
var amount = null;
var budgetAmount= null;
var budgetDate = null;
var contentMainVar = null;
var expenseTypeVar = null;
var expenseAmountVar = null;
var expenseDateVar = null;
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
		tx.executeSql('DROP TABLE IF EXISTS expenses', [], function() {
			document.location = 'index.html';
		});
	});
}



function resetBudget()
{
	db.transaction(function(tx) {
		tx.executeSql('DROP TABLE IF EXISTS budget', [], function() {
			document.location = 'budget.html';
		});
	});
}

function resetListing()
{
	db.transaction(function(tx){
		tx.executeSql('DROP TABLE IF EXISTS listing', [], function() {
				document.location = 'budget.html';
			}, function(err){ alert('Error occur ' + err); });
	});	
}


function emptyBudgetTable()
{
	db.transaction(function(tx) {
		tx.executeSql('DELETE FROM budget', [], function() {
				alert('table budget is now empty');
			});
	});
}

function emptyExpenseEntriesTable()
{
	db.transaction(function(tx) {
		tx.executeSql('DELETE FROM expenses', [], function() {
				alert('table expenses is now empty');
			});
	});
}


function formatCurrency(num) {
	num = isNaN(num) || num === '' || num === null ? 0.00 : num;
	return parseFloat(num).toFixed(2);
}