/* eslint-disable */
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { ActiveButton } from "./button/ActiveButton";
import Web3 from "web3";

let web3 = new Web3(window.ethereum || "http://localhost:8545");
let cloneABI = JSON.parse(process.env.REACT_APP_CLONE_ABI);
let factoryABI = JSON.parse(process.env.REACT_APP_CLONE_FACTORY_ABI);
let contractAddress = process.env.REACT_APP_RINKEBY_CONTRACT;

const defaultValues = {
    projectName: "",
    treasuryWallet: "",
    finderWallet: "",
    projectWallet: "",
};

export const CreateProjectForm = () => {
  const [formValues,  setFormValues] = useState(defaultValues);
  const [createdProject, setProjectValues] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    web3.eth.getAccounts().then(a => {
      let factoryContract = new web3.eth.Contract(factoryABI,  contractAddress);
      factoryContract.methods.createProject(formValues.projectName,formValues.treasuryWallet,formValues.finderWallet,formValues.projectWallet)
        .send({from:a[0],gas:1000000})
        .then(async (res) => {
          console.log("Submitted transaction with hash: ", res.transactionHash);
          let transactionReceipt = await web3.eth.getTransactionReceipt(res.transactionHash);
          console.log("Got the transaction receipt: ", transactionReceipt);
          let cloneAddress = transactionReceipt.logs[0].address;
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
          setProjectValues({"cloneAddress":cloneAddress})
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
