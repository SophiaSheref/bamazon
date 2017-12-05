DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(40) NOT NULL,
department_name VARCHAR(40) NOT NULL,
price INT default 0,
stock_quantity INT default 0,
PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cool watch", "watches", 50, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lovely", "perfume", 80, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("the girl on the train", "books", 20, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("comfy mattress", "bedding", 200, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("eye shadow palette", "beauty", 60, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("acer laptop", "tech", 500, 23);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("the sunset painting", "decor", 1000, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("christmas tree", "decor", 50, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mixer", "kitchen appliance", 150, 7);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dryer", "appliance", 400, 33);

SELECT * FROM products;


CREATE TABLE departments(
	department_id INT NOT NULL AUTO_INCREMENT,
	department_name VARCHAR(40) NOT NULL,
	over_head_costs DECIMAL(10,2) NOT NULL,
	total_sales DECIMAL(10,2) NOT NULL,
	PRIMARY KEY(department_id)
);

INSERT INTO departments (department_name, over_head_costs, total_sales)
VALUES ("watches", "4000", "8000");
INSERT INTO departments (department_name, over_head_costs, total_sales)
VALUES ("perfume", "3000", "5000");
INSERT INTO departments (department_name, over_head_costs, total_sales)
VALUES ("books", "800", "1000");
INSERT INTO departments (department_name, over_head_costs, total_sales)
VALUES ("bedding", "10000", "8000");
INSERT INTO departments (department_name, over_head_costs, total_sales)
VALUES ("beauty", "4000", "1000");
INSERT INTO departments (department_name, over_head_costs, total_sales)
VALUES ("tech", "15000", "10000");
INSERT INTO departments (department_name, over_head_costs, total_sales)
VALUES ("decor", "20000", "5000");
INSERT INTO departments (department_name, over_head_costs, total_sales)
VALUES ("kitchen appliance", "7000", "15000");
INSERT INTO departments (department_name, over_head_costs, total_sales)
VALUES ("appliance", "23000", "30000");