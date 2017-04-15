/**
 * Created by hanifa on 4/9/17.
 */
var Datalayer = require("./account.js");
var inquirer = require("inquirer");
var dbData = new Datalayer();

function  addingAccount() {

    inquirer.prompt([

        {
        name:'userName',
        type: 'input',
        message: "Enter Your Name",
        },

        {
            name: 'address',
            type: 'input',
            message: 'Enter your address'
        },

        {
            name: 'balance',
            type: 'input',
            message: 'Enter your phone number'

        }]).then(function (answer) {
        console.log(answer.userName);
        console.log(answer.address);
        console.log(answer.balance);
        dbData.addNewAccount( answer.userName,answer.address,answer.balance );
    });


};

function  getAccountInfo() {
    console.log("get Account function called");
    dbData.getAccountDetails();
}

getAccountInfo();
addingAccount();
