// Dependencies
import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.4.0/ethers.min.js"
import { ABI, CONTRACT_ADDRESS } from "./assets/Fund__contract.js";


/* before all */
let METAMASK_INSTALLED = (typeof window.ethereum !== "undefined") ? true : false;;
let PROVIDER;
let SIGNER;
let FUND;


// Get button objects from DOM
let showAccount = document.getElementById("showAccount");
let connectButton = document.getElementById("connectButton");
let fundButton = document.getElementById("fundButton");
let withdrawButton = document.getElementById("withdrawButton");
let getFunderButton = document.getElementById("getFunderButton");
let getPriceFeedButton = document.getElementById("getPriceFeedButton");
let getFunderToAmountButton = document.getElementById("getFunderToAmountButton");


// Get input objects from DOM
let ethAmountInput = document.getElementById("ethAmountInput");
let funderIndexInput = document.getElementById("funderIndexInput");
let funderAddressInput = document.getElementById("funderAddressInput");


// Get response objects from DOM 
// (connect button don't have a dedicated response object because the response is meant to overwrite the butotn's content)
let fundButtonResponse = document.getElementById("fundButtonResponse");
let withdrawButtonResponse = document.getElementById("withdrawButtonResponse");
let getFunderButtonResponse = document.getElementById("getFunderButtonResponse");
let getPriceFeedButtonResponse = document.getElementById("getPriceFeedButtonResponse");
let getFunderToAmountButtonResponse = document.getElementById("getFunderToAmountButtonResponse");


// Handle connect button
async function connect() { // Connect D-app to Ethereum account via metamask
    if (!METAMASK_INSTALLED) {
        window.alert("Please install a wallet first 🦊");
        showAccount.innerHTML = "Please install a wallet first 🦊";
    } else {
        try {
            PROVIDER = new ethers.BrowserProvider(window.ethereum);
            SIGNER = await PROVIDER.getSigner();
            showAccount.innerHTML = await SIGNER.getAddress();
            FUND = new ethers.Contract(CONTRACT_ADDRESS, ABI, SIGNER); // create a contract instance asigned to the SIGNER

            // Response
            connectButton.innerHTML = "Connected";
        } catch (err) {
            window.alert("--> connect() failed^ Reason: view in console");
            console.log("--> connect() failed^ Reason:\n", err);
            console.log("-----------------------------------------------------------------------------------------------");
        }
    }
}


// Handle fund button
async function fund(ethAmount) { // amount unit: ETH
    try {
        await FUND.fund({
            value : ethers.parseEther(ethAmount)
        });

        // Response
        fundButtonResponse.innerHTML = ("You have funded");
    } catch(err) {
        window.alert("--> fund() failed^ Reason: view in console")
        console.log("--> fund() failed^ Reason:\n", err);
        console.log("-----------------------------------------------------------------------------------------------");
    }
}


// Handle withdraw button
async function withdraw() {
    try {
        await FUND.withdraw();

        // Response
        withdrawButtonResponse.innerHTML = ("You have withdrawn");
    } catch(err) {
        window.alert("--> withdraw() failed^ Reason: view in console")
        console.log("--> withdraw() failed^ Reason:\n", err);
        console.log("-----------------------------------------------------------------------------------------------");
    }
} 


// Handle get funder button
async function getFunder(funderIndex) {
    let funderAddress = null;
    try {
        funderAddress = await FUND.getFunder(funderIndex);

        // Response
        getFunderButtonResponse.innerHTML = ("Address of funder: " +  funderAddress);
    } catch(err) {
        window.alert("--> getFunder() failed^ Reason: view in console")
        console.log("--> getFunder() failed^ Reason:\n", err);
        console.log("-----------------------------------------------------------------------------------------------");
    }
    return funderAddress;
}


// Handle get price feed button
async function getPriceFeed() {
    let priceFeedAddress = null;
    try {
        priceFeedAddress = await FUND.getPriceFeed();

        // Response
        getPriceFeedButtonResponse.innerHTML = ("Price feed address: " + priceFeedAddress);
    } catch(err) {
        window.alert("--> getPriceFeed() failed^ Reason: view in console")
        console.log("--> getPriceFeed() failed^ Reason:\n", err);
        console.log("-----------------------------------------------------------------------------------------------");
    }
    return priceFeedAddress;
}


// Handle get funder to amount button
async function getFunderToAmount(funderAddress) {
    let amount = null;
    try {
        amount = await FUND.getFunderToAmount(funderAddress);

        // Response
        getFunderToAmountButtonResponse.innerHTML = ("Amount: " + amount);
    } catch(err) {
        window.alert("--> getFunderToAmount() failed^ Reason: view in console")
        console.log("--> getFunderToAmount() failed^ Reason:\n", err);
        console.log("-----------------------------------------------------------------------------------------------");
    }
    return amount;
}


// Make DOM objects listen for event 'click'
connectButton.addEventListener("click", () => {
    connect();
});

fundButton.addEventListener("click", () => {    
    const ethAmount = ethAmountInput.value;
    fund(ethAmount);
});

withdrawButton.addEventListener("click", () => {
    withdraw();
});

getFunderButton.addEventListener("click", () => {
    const funderIndex = funderIndexInput.value; 
    getFunder(funderIndex);
});

getPriceFeedButton.addEventListener("click", () => {
    getPriceFeed();
});

getFunderToAmountButton.addEventListener("click", () => {
    const funderAddress = funderAddressInput.value;
    getFunderToAmount(funderAddress);
});
