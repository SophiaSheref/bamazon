//require mysql and inquirer
var mysql = require("mysql");
var inquirer = require ("inquirer");

//create connection to DB
var connection = mysql.createConnection ({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err){
  if (err) throw err;
  console.log("Connected as id: "+connection.threadId);
  start();
});

//print the product and their details
function start(){
	connection.query("SELECT * FROM products", function(err, res){
		if (err) throw err;
		// console.log(res)
		console.log("");
		console.log("           Welcome to Bamazon!");
		console.log("-----------------------------------------");
	    for(var i=0; i < res.length; i++){
		console.log("  ID:  " + res[i].id+   " | " + "Product Name: " + res[i].product_name + "  | " +  "Price: " + res[i].price);
		console.log("-----------------------------------------");
		}
	})
	inquirer
	.prompt([
	{
		name: "id",
		type: "input",
		message: "Please enter the item ID which you would like to purchase!",
	    validate: function(value){
	    	if((value) <= 11){
	    	  return true;
	    	}else{
	    	  return "please enter a valid ID number";
	    	}
	    }
	},
	{
		name: "quantity",
		type: "input",
		message: "how many do you wish to buy?",
	    validate: function (value){
	    	if(isNaN(value)){
	    		return false;
	    	}else{
	    		return true;
	    	}
	    }
	}
	])
	.then(function(answer){
	connection.query('SELECT * FROM products WHERE id = ?', [answer.id], function(err, res){
		if(answer.quantity > res[0].stock_quantity){
			console.log('Insufficient Quantity');
			console.log('This order has been cancelled');
			console.log('');
			newOrder();
		}
		else{
			amountOwed = res[0].price * answer.quantity;
			currentDepartment = res[0].department_name;
			console.log('Thank you for your order');
			console.log('You total is $' + amountOwed);
			console.log('');
			//update products table
			connection.query('UPDATE products SET ? Where ?', [{
				stock_quantity: res[0].stock_quantity - answer.quantity
			},{
				id: answer.id
			}], function(err, res){});
			newOrder();
			//update departments table
		    // logSaleToDepartment();
		}
	})

}, function(err, res){})
};

//Allows the user to place a new order whenever ordered is cancelled or end the connection
function newOrder(){
	inquirer.prompt([{
		type: 'confirm',
		name: 'choice',
		message: 'Would you like to place another order?'
	}]).then(function(answer){
		if(answer.choice){
			start();
		}
		else{
			console.log('Thank you for shopping at Bamazon!');
			connection.end();
		}
	})
};

//functions to push the sales to the executive table
function logSaleToDepartment(){
	connection.query('SELECT * FROM departments WHERE departments = ?', [currentDepartment], function(err, res){
		updateSales = res[0].total_sales + amountOwed;
		updateDepartmentsTable();
	})
};

function updateDepartmentTable(){
		connection.query('UPDATE departments SET ? WHERE ?', [{
		total_sales: updateSales
	},{
		department_name: currentDepartment
	}], function(err, res){});
};