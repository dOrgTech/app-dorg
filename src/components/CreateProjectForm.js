/* eslint-disable */
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { ActiveButton } from "./button/ActiveButton";
import Web3 from "web3";

let web3 = new Web3("ws://localhost:8545");
let abi = [{"inputs":[], "stateMutability":"nonpayable", "type":"constructor"}, {"anonymous":false, "inputs":[{"indexed":false, "internalType":"address", "name":"cloneAddress", "type":"address"}], "name":"CloneAddress", "type":"event"}, {"anonymous":false, "inputs":[{"indexed":false, "internalType":"address", "name":"logicAddress", "type":"address"}], "name":"LogicAddress", "type":"event"}, {"inputs":[{"internalType":"string", "name":"_projectName", "type":"string"}, {"internalType":"address", "name":"_treasuryWallet", "type":"address"}, {"internalType":"address", "name":"_finderWallet", "type":"address"}, {"internalType":"address", "name":"_projectWallet", "type":"address"}], "name":"createProject", "outputs":[{"internalType":"address", "name":"", "type":"address"}], "stateMutability":"nonpayable", "type":"function"}];
let contractAddress = "0x97583cC9FC64839424ac7b089CBC678446f606Ef";
let contract = new web3.eth.Contract(abi,  contractAddress);

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
    console.log(name)
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    web3.eth.getAccounts().then(a => {
      contract.methods.createProject('test',a[1],a[2],a[3])
        .send({from:a[4],gas:1000000})
        .then(console.log)
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
