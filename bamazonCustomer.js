/**
 * Created by hanifa on 4/9/17.
 */
var mysql = require("mysql");
var connection =null;

function Datalayer(){
    connection = mysql.createConnection({
        user:'hanifabo',
        password: 'ananga1980',
        host: 'localhost',
        port: 3306,
        database: 'accountDB'
    });

    connection.connect();
}


Datalayer.prototype.addNewAccount = function (newName, newAddress, newBalance) {
    var creatQuery = "INSERT INTO userAccount SET ?";
    console.log("MYSQL connection established");
    connection.query(creatQuery,{
        name: newName ,
        address:newAddress,
        balance: newBalance
    },function (err) {
        if(err) throw  err.stack;
        console.log("the account has been succefully added")
    });
};

Datalayer.prototype.upDateAccount = function () {

};

Datalayer.prototype.deletAccount = function () {

};


Datalayer.prototype.getAccountDetails = function () {
var quering = " SELECT * FROM userAccount";
connection.query(quering, function (err,results) {
    if(err) throw err;
    for(var i = 0; i < results.length; i++){
        console.log(results[i]);
    }
})
};


module.exports = Datalayer;