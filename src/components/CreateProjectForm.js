/* eslint-disable */
import React, { useState, setState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { ActiveButton } from "./button/ActiveButton";
import Web3 from "web3";
import { ContactlessOutlined } from "@material-ui/icons";

let web3 = new Web3("ws://localhost:8545");
let cloneABI = [ { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "account", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "shares", "type": "uint256" } ], "name": "PayeeAdded", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "PaymentReceived", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "PaymentReleased", "type": "event" }, { "inputs": [ { "internalType": "uint256", "name": "index", "type": "uint256" } ], "name": "payee", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "projectName", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "account", "type": "address" } ], "name": "release", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "released", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "shares", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalReleased", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalShares", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "stateMutability": "payable", "type": "receive" }, { "inputs": [ { "internalType": "string", "name": "_projectName", "type": "string" }, { "internalType": "address[]", "name": "_payees", "type": "address[]" }, { "internalType": "uint256[]", "name": "_shares", "type": "uint256[]" } ], "name": "initialize", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "address[]", "name": "payees", "type": "address[]" }, { "internalType": "uint256[]", "name": "shares_", "type": "uint256[]" } ], "name": "initialize", "outputs": [], "stateMutability": "payable", "type": "function" } ];
let factoryABI = [ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "cloneAddress", "type": "address" } ], "name": "CloneAddress", "type": "event" }, { "inputs": [], "name": "logicImplementation", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_projectName", "type": "string" }, { "internalType": "address", "name": "_treasuryWallet", "type": "address" }, { "internalType": "address", "name": "_finderWallet", "type": "address" }, { "internalType": "address", "name": "_projectWallet", "type": "address" } ], "name": "createProject", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ];
let contractAddress = "0x4B661FC3a11378E091830B35561A305123254772";
let factoryContract = new web3.eth.Contract(factoryABI,  contractAddress);

const defaultValues = {
      projectName: "",
      treasuryWallet: "",
      finderWallet: "",
      projectWallet: "",
};

export const CreateProjectForm = () => {

  const [formValues,  setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target)
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
          console.log("Submitted transaction with hash: ", res.transactionHash);
          let transactionReceipt = await web3.eth.getTransactionReceipt(res.transactionHash);
          console.log("Got the transaction receipt: ", transactionReceipt);
          var cloneAddress = transactionReceipt.logs[0].address;
          let clone = new web3.eth.Contract(cloneABI,cloneAddress);
          let name = await clone.methods.projectName().call((err,res) => res);
          let payees = await Promise.all([0,1,2].map(i=>clone.methods.payee(i).call((err,res)=>res)))
          let shares = await Promise.all(payees.map(p=>clone.methods.shares(p).call((err,res)=>res)))
          let totalShares = await clone.methods.totalShares().call((err,res) => res);
          let cloneValue = await web3.eth.getBalance(cloneAddress, (err,res) => res)
          console.log(name);
          console.log(payees);
          console.log(shares);
          console.log(totalShares);
          console.log(cloneValue);
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
