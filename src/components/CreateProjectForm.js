/* eslint-disable */
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { ActiveButton } from "./button/ActiveButton";
import Web3 from "web3";
import { ContactlessOutlined } from "@material-ui/icons";

let web3 = new Web3("ws://localhost:8545");
let cloneABI = [ { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "account", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "shares", "type": "uint256" } ], "name": "PayeeAdded", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "PaymentReceived", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "PaymentReleased", "type": "event" }, { "inputs": [ { "internalType": "uint256", "name": "index", "type": "uint256" } ], "name": "payee", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "account", "type": "address" } ], "name": "release", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "released", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "shares", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalReleased", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalShares", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "stateMutability": "payable", "type": "receive" }, { "inputs": [], "name": "getName", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_projectName", "type": "string" }, { "internalType": "address[]", "name": "_payees", "type": "address[]" }, { "internalType": "uint256[]", "name": "_shares", "type": "uint256[]" } ], "name": "initialize", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "address[]", "name": "payees", "type": "address[]" }, { "internalType": "uint256[]", "name": "shares_", "type": "uint256[]" } ], "name": "initialize", "outputs": [], "stateMutability": "payable", "type": "function" } ];
let factoryABI = [ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "cloneAddress", "type": "address" } ], "name": "CloneAddress", "type": "event" }, { "inputs": [], "name": "logicImplementation", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_projectName", "type": "string" }, { "internalType": "address", "name": "_treasuryWallet", "type": "address" }, { "internalType": "address", "name": "_finderWallet", "type": "address" }, { "internalType": "address", "name": "_projectWallet", "type": "address" } ], "name": "createProject", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ];
let contractAddress = "0x97583cC9FC64839424ac7b089CBC678446f606Ef";
let factoryContract = new web3.eth.Contract(factoryABI,  contractAddress);
const expectedBlockTime = 1; 
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


const defaultValues = {
      projectName: "",
      treasuryWallet: "",
      finderWallet: "",
      projectWallet: "",
};

var cloneAddress;

export const CreateProjectForm = () => {

  const [formValues,  setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name)
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    web3.eth.getAccounts().then(a => {
      factoryContract.methods.createProject('test',a[1],a[2],a[3])
        .send({from:a[4],gas:1000000})
        .then(async (res) => {
          console.log("Submitted transaction with hash: ", res.transactionHash)
          let transactionReceipt = null
          while (transactionReceipt == null) { // Waiting expectedBlockTime until the transaction is mined
              transactionReceipt = await web3.eth.getTransactionReceipt(res.transactionHash);
              await sleep(expectedBlockTime)
          }
          console.log("Got the transaction receipt: ", transactionReceipt)
          cloneAddress = transactionReceipt.logs[0].address
          let clone = new web3.eth.Contract(cloneABI,cloneAddress)
          console.log(clone)
          let name = await clone.methods.projectName().call();
          console.log(name)
        })

    })
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justify="center" direction="column">
        <Grid item>
          <TextField
            id="name-input"
            name="projectName"
            label="Project Name"
            type="text"
            value={formValues.projectName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="age-input"
            name="treasuryWallet"
            label="Treasury Wallet"
            type="text"
            value={formValues.treasuryWallet}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="finder-input"
            name="finderWallet"
            label="Finder Wallet"
            type="text"
            value={formValues.finderWallet}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="project-input"
            name="projectWallet"
            label="Project Wallet"
            type="text"
            value={formValues.projectWallet}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid>
          <ActiveButton variant="contained" color="primary" type="submit">
            Submit
          </ActiveButton>
        </Grid>
      </Grid>
    </form>
  );
};
