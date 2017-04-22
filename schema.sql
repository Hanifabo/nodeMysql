CREATE database Bamazon;
use Bamazon;

create table products(
itemid integer not null auto_increment,
productname varchar(55) not null,
departmentname varchar(55) not null,
price decimal(10,4) not null,
stockquantity integer(11),
primary key(itemid)
);

use Bamazon;
insert into products(productname,departmentname,price,stockquantity) values
("laptops","electronis",23,21),
("apple","fruit",1,11),
("intor to Javascript","stationary",3,11),
("phone case","accessories",32,10),
("milk","provisions",45,2),
("mad race","movie",66,22),
("2 Bed rooms","real estate",23,6),
("chip flight ","airline",34,34);


use Bamazon;
select * from products