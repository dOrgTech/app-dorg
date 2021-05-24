/* eslint-disable */
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { ActiveButton } from "./button/ActiveButton";
import Web3 from "web3";

let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const defaultValues = {
  projectName: "Test",
  treasuryWallet: "0x7167A082d8969DCC90063BAa9A2cb1a23161D464",
  finderWallet: "0x4BC2e10eAD9Bf0d0d5ff269eA6E9035024B63eDB",
  projectWallet: "0xc901613926cA4cf170B41908Be6dE63dbd24C387",
};

export const CreateProjectForm = () => {

  const [formValues,  setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    
    web3.eth.getAccounts().then(accounts => {
      let abi = [{"inputs":[], "stateMutability":"nonpayable", "type":"constructor"}, {"anonymous":false, "inputs":[{"indexed":false, "internalType":"address", "name":"cloneAddress", "type":"address"}], "name":"CloneAddress", "type":"event"}, {"anonymous":false, "inputs":[{"indexed":false, "internalType":"address", "name":"logicAddress", "type":"address"}], "name":"LogicAddress", "type":"event"}, {"inputs":[{"internalType":"string", "name":"_projectName", "type":"string"}, {"internalType":"address", "name":"_treasuryWallet", "type":"address"}, {"internalType":"address", "name":"_finderWallet", "type":"address"}, {"internalType":"address", "name":"_projectWallet", "type":"address"}], "name":"createProject", "outputs":[{"internalType":"address", "name":"", "type":"address"}], "stateMutability":"nonpayable", "type":"function"}];
      let contractAddress = "0xAe8a7341cd697B119f04e851E543C15b824C668E";
      let contract = new web3.eth.Contract(abi,  contractAddress);
      console.log(accounts)
      contract.methods.createProject(formValues["projectName"],formValues["treasuryWallet"],formValues["finderWallet"],formValues["projectWallet"]).send({from:accounts[12]})
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
