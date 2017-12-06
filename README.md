# Bamazon

Created during Week 7 of GW Coding Bootcamp. The goal was to create an Amazon-like store front using Node.js and MySQL.

## Getting Started

- Clone repo.
- Run command in Terminal or Gitbash 'npm install'
- Run command depending which mode you would like to be on:
    * Customer - 'npm run bamazonCustomer.js'
    * Manager - 'npm run bamazonManager.js'
    * Supervisor - 'npm run bamazonSupervisor.js'
- Run 'ctrl + c' to exit each mode

### What Each JavaScript Does

1. `bamazonCustomer.js`

    * Prints the products in the store.

    * Prompts customer which product they would like to purchase by ID number.

    * Asks for the quantity.

      * If there is a sufficient amount of the product in stock, it will return the total for that purchase.
      * However, if there is not enough of the product in stock, it will display this message "Insufficient Quantity, This order has been cancelled".
      * If the purchase goes through, it updates the stock quantity to reflect the purchase.
      * It will also update the product sales in the department table.

-----------------------

2. `bamazonManager.js`

    * Starts with a menu:
        * View Products for Sale
        * View Low Inventory
        * Add to Inventory
        * Add New Product

    * If the manager selects `View Products for Sale`, it lists all of the products in the store including all of their details.

    * If the manager selects `View Low Inventory`, it'll list all the products with less than five items in its stock_quantity column.

    * If the manager selects `Add to Inventory`, it allows the manager to select a product and add inventory.

    * If the manager selects `Add New Product`, it allows the manager to add a new product to the store.

    * If the manager selects `No`, it ends the session and doesn't go back to the menu.

-----------------------

3. `bamazonSupervisor.js`

    * Starts with a menu:
        * View Product Sales by Department
        * Create New Department

    * If the manager selects `View Product Sales by Department`, it lists the Department Sales and calculates the total sales from the overhead cost and product sales.

    * If the manager selects `Create New Department`, it allows the manager to create a new department and input current overhead costs and product sales.

    * If the manager selects `No`, it ends the session and doesn't go back to the menu.

## Demo Video and Screen shots

* video (https://youtu.be/plFLRHPdhrM)
* screen shots (https://photos.app.goo.gl/NsSNVMpHC8QaYhpu1)

## Technologies used
- Node.js
- Inquire NPM Package
- MYSQL NPM Package 


## Built With

* Sublime Text - Text Editor
* MySQLWorkbench
* Gitbash

## Authors

* **Sophia Sheref**
