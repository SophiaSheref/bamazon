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
  managerInput();
});

//Prompt the user for the action they would like to perform and then call the new transaction function
function managerInput(){
	inquirer.prompt([{
		type: 'list',
		name: 'input',
		message: 'What would you like to do today?',
		choices: ['1) View Products for sale', '2) View low inventory', '3) Add to inventory', '4) Add new product']
	}]).then(function(answer){
		if(answer.input === '1) View Products for sale'){
			connection.query('SELECT * FROM products', function(err, res){
			if (err) throw err;
			console.log('');
			console.log('              Items available in store');
			for(i=0;i<res.length;i++){
				console.log('ID:' + res[i].id);
				console.log('Product Name: ' + res[i].product_name);
				console.log('Price: ' + '$' + res[i].price);
				console.log('Quantity: ' + res[i].stock_quantity);
				console.log('---------------------');
			}
			console.log('')
			newTransaction();
			})
		}
		else if(answer.input === '2) View low inventory'){
			connection.query('SELECT * FROM products WHERE stock_quantity < 5', function(err, res){
				if (err) throw err;
				console.log('')
				console.log('                    Low inventory');
				for(i=0;i<res.length;i++){
					console.log('Name: ' + res[i].product_name);
					console.log('Product ID: ' + res[i].id);
					console.log('Quantity in Stock: ' + res[i].stock_quantity);
					console.log('---------------------');
				}
				newTransaction();
			})
		}
		else if(answer.input === '3) Add to inventory'){
			inquirer.prompt([{
				name: 'item',
				message: 'Enter the ID of the item you wish to update:',
				validate: function(value){
					var valid = value.match(/^[0-9]+$/)
					if(valid){
						return true
					}
						return 'Please enter a numerical value'
					}
			},{
				name: 'number',
				message: 'How many items would you like to add to the current supply?',
				validate: function(value){
					var valid = value.match(/^[0-9]+$/)
					if(valid){
						return true
					}
						return 'Please enter a numerical value'
					}
			}]).then(function(answer){
				connection.query('SELECT * FROM products WHERE id = ?', [answer.item], function(err, res){
						connection.query('UPDATE products SET ? Where ?', [{
							stock_quantity: res[0].stock_quantity + parseInt(answer.number)
						},{
							id: answer.item
						}], function(err, res){});
				})
				console.log('Inventory updated');
				newTransaction();
			})
		}
		else if(answer.input === '4) Add new product'){
			inquirer.prompt([{
				name: 'product',
				message: 'Enter name of product:'
			},{
				name: 'department',
				message: 'Enter a department for this product'
			},{
				name: 'price',
				message: 'Enter a price for this product',
				validate: function(value){
					var valid = value.match(/^[0-9]+$/)
					if(valid){
						return true
					}
						return 'Please enter a numerical value'
					}
			},{
				name: 'stock',
				message: 'Please enter a stock quantity for this product',
				validate: function(value){
					var valid = value.match(/^[0-9]+$/)
					if(valid){
						return true
					}
						return 'Please enter a numerical value'
					}
			}]).then(function(answer){
				connection.query('INSERT into products SET ?', {
					product_name: answer.product,
					department_name: answer.department,
					price: answer.price,
					stock_quantity: answer.stock
				}, function(err, res){});
				console.log('Product Added');
				newTransaction();
			})
		}
	})
};

//Prompt the user to see if they would like to perform another transaction or end the connection
function newTransaction(){
	inquirer.prompt([{
		type: 'confirm',
		name: 'choice',
		message: 'Would you like to perform another transaction?'
	}]).then(function(answer){
		if(answer.choice){
			managerInput();
		}
		else{
			console.log('Have a good day');
			connection.end();
		}
	})
}