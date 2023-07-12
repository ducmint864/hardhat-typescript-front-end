// Dependencies
import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.4.0/ethers.min.js"


// before all
let metamaskInstalled = (typeof window.ethereum !== "undefined") ? true : false;;
let signerAddress;

// Get button objects in from DOM
let showAccount = document.getElementById("showAccount");
let connectButton = document.getElementById("connectButton");
let fundButton = document.getElementById("fundButton");
let withdrawButton = document.getElementById("withdrawButton");
let getFunderButton = document.getElementById("getFunderButton");
let getPriceFeedButton = document.getElementById("getPriceFeedButton");
let getFunderToAmountButton = document.getElementById("getFunderToAmountButton");


// Handle connect button
async function connect() { // Connect D-app to Ethereum account via metamask
    if (!metamaskInstalled) {
        window.alert("Please install metamask 🦊");
        showAccount.innerHTML = "Please install metamask 🦊";
    } else {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            .catch((err) => {
                if (err.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    // If this happens, the user rejected the connection request.
                    console.log("LOL💀☠️");
                } else {
                    console.error(err);
                }
            });
        signerAddress = accounts[0];
        showAccount.innerHTML = signerAddress;
        document.getElementById("connectButton").innerHTML = "Connected";
    }
}


// Handle fund button
async function fund(amount) {

}


// Handle withdraw button
async function withdraw() {

} 


// Handle get funder button
async function getFunder() {

}


// Handle get price feed button
async function getPriceFeed() {

}


// Handle get funder to amount button
async function getFunderToAmount() {

}


// Attach buttons to their corresponding function
connectButton.onclick = connect;
fundButton.onclick = fund;
withdrawButton.onclick = withdraw;
getFunderButton.onclick = getFunder;
getPriceFeedButton.onclick = getPriceFeed;
getFunderToAmountButton.onclick = getFunderToAmount;
