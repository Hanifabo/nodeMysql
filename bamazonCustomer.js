/**
 * Created by hanifa on 4/9/17.
 */
var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    user: 'hanifabo',
    password: 'ananga1980',
    port: 3306,
    database:'Bamazon'
});
connection.connect();

var itemInfo = [];

function displayList(){

    var query = "SELECT * FROM products";
    connection.query(query,function(err, data){
        if(err) return console.log("select query failed: "+ err.stack);
        for(var i=0; i < data.length; i++){
            console.log(data[i].itemid+"  ||  "+data[i].productname+"  ||  "+ data[i].departmentname+"  || "+"$"+data[i].price+"  ||  "+ data[i].stockquantity+"  \n");

        }
    });
}

function updateItem(itemId, stockQuan){

    var query ="UPDATE useraccount SET stockQunatity=? WHERE ID = ?";
    connection.query(query, [stockQuan , itemID], function(err){
        if(err) return console.log("quantity update failled")
        console.log("quantity has been updated successfully");
    });
}

function placeOrder(){
    var customerchoice;
    var remaininquant =0;
    var itemId;
    var dataholder;
    var itemcost =0;
    var newName;
    var query ="SELECT * FROM products";
    connection.query(query,function(err, data){
        if(err) return console.log("Product retrival failed \n"+ err.stack);

        inquirer.prompt([{
            name: 'choice',
            type: "rawlist",
            choices: function(){

                var itemArray =[];
                dataholder = data;

                for(var i=0; i < data.length; i++){
                    itemArray.push(data[i].productname);
                    console.log(data[i].itemid+"  ||  "+data[i].productname+"  ||  "+ data[i].departmentname+"  || "+"$"+data[i].price+"  ||  "+ data[i].stockquantity+"  \n");

                }
                return itemArray;
            },
            message: "what item do you want to buy"
        },
            {
                name: 'itemquantity',
                type: "input",
                message: "how many do you want to buy"

            }]).then(function(answer){
            // console.log(data);

            for(var i=0; i < data.length; i++){
                newName = data[i].productname;
                var inputName =answer.choice;

                // console.log(newName +"  "+inputName);

                if( newName === inputName){
                    customerchoice = data[i];
                    itemId = data[i].itemid;
                    itemcost = data[i].price;
                }

            };

            //console.log(parseInt(customerchoice.stockquantity));
            if(parseInt(answer.itemquantity) > parseInt(customerchoice.stockquantity)){
                console.log("sory we cant meet your demands. Please contact customer service for bulk purchase");
            }
            else{

                remaininquant = parseInt(customerchoice.stockquantity) - parseInt(answer.itemquantity);

                //   console.log("THIS IS THE ID: "+itemId)
                //console.log("Reminder  "+remaininquant)
                var newitemId = parseInt(itemId);

                connection.query('UPDATE products SET stockquantity = ? Where itemid = ?',
                    [remaininquant, newitemId],function (err, result) {
                        if (err) throw err;
                        console.log('Changed ' + result.changedRows + ' rows');
                    });

                var purchaseQuantity = parseInt(answer.itemquantity);
                var total_cost = itemcost * purchaseQuantity;

                console.log("==================================================== \n");
                console.log("                      INVOICE")
                console.log("==================================================== \n");
                console.log("Item Name: "+inputName );
                console.log("Item Qty: "+purchaseQuantity);
                console.log("Unit Cost :"+itemcost);
                console.log("Total cost: "+"$"+total_cost+".00");
                console.log("==================================================== \n");


            };
        });

    });

};


function app(){
    console.log("Welcome to Han Online"+"\n");
    placeOrder();
};

app();