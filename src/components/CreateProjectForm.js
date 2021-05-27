/* eslint-disable */
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { ActiveButton } from "./button/ActiveButton";
import Web3 from "web3";

let web3 = new Web3(window.ethereum);
let cloneABI = JSON.parse(process.env.REACT_APP_CLONE_ABI);
let factoryABI = JSON.parse(process.env.REACT_APP_CLONE_FACTORY_ABI);
// let contractAddress = process.env.REACT_APP_RINKEBY_CONTRACT;
let contractAddress = "0xa1A5C90E1c85CB1a3c4Fec63E539a6Ee9f06873f"

const defaultValues = {
    projectName: "",
    projectAddress: "",
    treasuryWallet: "",
    finderWallet: "",
    projectWallet: ""
};

const defaultProjectDetails = {
    projectName: "",
    totalShares: "",
    cloneAddress: null
}

export const CreateProjectForm = () => {
  const [formValues,  setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const checkValue = async () => {
    let address = await projectDetails.cloneAddress
    console.log(address)
    if(address){
      let clone = new web3.eth.Contract(cloneABI,address);
      let cloneValue = await web3.eth.getBalance(address, (err,res) => res)
      var updatedDetails = {};
      updatedDetails["cloneValue"]=cloneValue
      console.log(cloneValue)
      setProjectDetails({...projectDetails,...updatedDetails})
    }
  }

  const releaseFunds = async () => {
    let address = await projectDetails.cloneAddress
    console.log(address)
    if(address){
      web3.eth.getAccounts().then(async (a)=> {
        let clone = new web3.eth.Contract(cloneABI,address);
        let payees = await Promise.all([0,1,2].map(i=>clone.methods.payee(i).call((err,res)=>res)))
        let release = await Promise.all(payees.map(p=>clone.methods.release(p).send({from:a[0]})))
        console.log(release)
      })
    }
  }


  const [projectDetails, setProjectDetails] = useState(defaultProjectDetails)
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
          
          var updatedDetails = {}
          updatedDetails["cloneAddress"]=cloneAddress
          updatedDetails["projectName"]=name
          updatedDetails["payees"]=payees
          updatedDetails["shares"]=shares
          updatedDetails["totalShares"]=totalShares
          updatedDetails["cloneValue"]=cloneValue
          setProjectDetails({...projectDetails,...updatedDetails})
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
      <Grid>
        <div>Clone Address: {projectDetails.cloneAddress ? projectDetails.cloneAddress : null}</div>
        <div>Shares/Payees: {projectDetails.shares ? projectDetails.shares.map((x,i)=><div key={i}>{x},{projectDetails.payees[i]}</div>) : null}</div>
        <div>Total Shares: {projectDetails.totalShares ? projectDetails.totalShares : null}</div>
        <div>Clone Value: {projectDetails.cloneValue ? projectDetails.cloneValue : null}</div>
        <ActiveButton onClick={checkValue}>Check Value</ActiveButton>
        <ActiveButton onClick={releaseFunds}>Release Funds</ActiveButton>
      </Grid>
    </form>
  );
};
