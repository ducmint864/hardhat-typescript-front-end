// Dependencies
import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.4.0/ethers.min.js"
import { ABI } from "./assets/Fund__contract.js";
import FUND_CONTRACT_ADDRESS from "./assets/addresses/Fund__contract__address.js";


/* before all */
let METAMASK_INSTALLED = (typeof window.ethereum !== "undefined") ? true : false;;
let FUND_CONTRACT;
let PROVIDER;
let SIGNER;


// Get button objects from DOM
let connectButton = document.getElementById("connectButton");
let fundButton = document.getElementById("fundButton");
let withdrawButton = document.getElementById("withdrawButton");
let getFunderButton = document.getElementById("getFunderButton");
let getPriceFeedButton = document.getElementById("getPriceFeedButton");
let getFunderToAmountButton = document.getElementById("getFunderToAmountButton");
let getFunderBalanceButton = document.getElementById("getFunderBalanceButton");
let getContractOwnerButton = document.getElementById("getContractOwnerButton");
let getContractBalanceButton = document.getElementById("getContractBalanceButton");


// Get input objects from DOM
let ethAmountInput = document.getElementById("ethAmountInput");
let funderIndexInput = document.getElementById("funderIndexInput");
let funderAddressInput = document.getElementById("funderAddressInput");


// Get response objects from DOM 
let connectButtonResponse = document.getElementById("connectButtonResponse");
let fundButtonResponse = document.getElementById("fundButtonResponse");
let withdrawButtonResponse = document.getElementById("withdrawButtonResponse");
let getFunderButtonResponse = document.getElementById("getFunderButtonResponse");
let getPriceFeedButtonResponse = document.getElementById("getPriceFeedButtonResponse");
let getFunderToAmountButtonResponse = document.getElementById("getFunderToAmountButtonResponse");
let getFunderBalanceButtonResponse = document.getElementById("getFunderBalanceButtonResponse");
let getContractOwnerButtonResponse = document.getElementById("getContractOwnerButtonResponse");
let getContractBalanceButtonResponse = document.getElementById("getContractBalanceButtonResponse");


// Action: connect
async function connect() { // Connect D-app to Ethereum account via metamask
    let funderAddress = null;
    if (!METAMASK_INSTALLED) {
        window.alert("Please install a wallet first 🦊");
        connectButtonResponse.innerHTML = "Please install a wallet first 🦊";
    } else {
        try {
            PROVIDER = new ethers.BrowserProvider(window.ethereum);
            SIGNER = await PROVIDER.getSigner();
            FUND_CONTRACT = new ethers.Contract(FUND_CONTRACT_ADDRESS, ABI, SIGNER); // create a contract instance asigned to the SIGNER
            funderAddress = await SIGNER.getAddress();
        } catch (err) {
            window.alert("--> connect() failed^ Reason: view in console");
            console.log("--> connect() failed^ Reason:\n", err);
            console.log("-----------------------------------------------------------------------------------------------");
        }
    }
    return funderAddress;
}


// Action: fund
async function fund(ethAmount) { // amount unit: ETH
    let fundSuccess = null;
    try {
        const txResponse = await FUND_CONTRACT.fund({
            value: ethers.parseEther(ethAmount)
        });
        await txResponse.wait();
        fundSuccess = true;

    } catch (err) {
        fundSuccess = false;
        window.alert("--> fund() failed^ Reason: view in console")
        console.log("--> fund() failed^ Reason:\n", err);
        console.log("-----------------------------------------------------------------------------------------------");
    }
    return fundSuccess;
}


// Action: withdraw
async function withdraw() {
    let withdrawSuccess = null;
    try {
        const txResponse = await FUND_CONTRACT.withdraw();
        await txResponse.wait()
        withdrawSuccess = true;
    } catch (err) {
        withdrawSuccess = false;
        window.alert("--> withdraw() failed^ Reason: view in console")
        console.log("--> withdraw() failed^ Reason:\n", err);
        console.log("-----------------------------------------------------------------------------------------------");
    }
    return withdrawSuccess;
}


// Action: get contract's owner
async function getContractOwner() {
    let ownerAddres = null;
    try {
        ownerAddres = await FUND_CONTRACT.getContractOwner();

    } catch (err) {
        window.alert("--> getContractOwner() failed^ Reason: view in console")
        console.log("--> getContractOwner() failed^ Reason:\n", err);
        console.log("-----------------------------------------------------------------------------------------------");
    }
    return ownerAddres;
}


// Action: get contract's balance
async function getContractBalance() {
    let contractBalance = null;
    try {
        contractBalance = await FUND_CONTRACT.getContractBalance();
        contractBalance = ethers.formatEther(contractBalance);

    } catch (err) {
        window.alert("--> getContractBalance() failed^ Reason: view in console")
        console.log("--> getContractBalance() failed^ Reason:\n", err);
        console.log("-----------------------------------------------------------------------------------------------");
    }
    return contractBalance;
}


// Action: get funder's balance
async function getFunderBalance() {
    let funderBalance = null;
    try {
        funderBalance = await PROVIDER.getBalance(SIGNER.address);
        funderBalance = ethers.formatEther(funderBalance);

    } catch (err) {
        window.alert("--> getFunderBalance() failed^ Reason: view in console")
        console.log("--> getFunderBalance() failed^ Reason:\n", err);
        console.log("-----------------------------------------------------------------------------------------------");
    }
    return funderBalance;
}


// Action: get funder based on index
async function getFunder(funderIndex) {
    let funderAddress = null;
    try {
        funderAddress = await FUND_CONTRACT.getFunder(funderIndex);

    } catch (err) {
        window.alert("--> getFunder() failed^ Reason: view in console")
        console.log("--> getFunder() failed^ Reason:\n", err);
        console.log("-----------------------------------------------------------------------------------------------");
    }
    return funderAddress;
}


// Action: get price feed (address)
async function getPriceFeed() {
    let priceFeedAddress = null;
    try {
        priceFeedAddress = await FUND_CONTRACT.getPriceFeed();

    } catch (err) {
        window.alert("--> getPriceFeed() failed^ Reason: view in console")
        console.log("--> getPriceFeed() failed^ Reason:\n", err);
        console.log("-----------------------------------------------------------------------------------------------");
    }
    return priceFeedAddress;
}


// Action: get funder->amount funded
async function getFunderToAmount(funderAddress) {
    let funderAmount = null;
    try {
        funderAmount = await FUND_CONTRACT.getFunderToAmount(funderAddress);
        funderAmount = ethers.formatEther(funderAmount);

    } catch (err) {
        window.alert("--> getFunderToAmount() failed^ Reason: view in console")
        console.log("--> getFunderToAmount() failed^ Reason:\n", err);
        console.log("-----------------------------------------------------------------------------------------------");
    }
    return funderAmount;
}


// Make buttons listen for event 'click' and respond accordingly
connectButton.addEventListener("click", async () => {
    let funderAddress = await connect();

    // Response
    if (funderAddress != null) {
        connectButton.innerHTML = "Connected";
        connectButtonResponse.innerHTML = (funderAddress);
    }
});

fundButton.addEventListener("click", async () => {
    fundButtonResponse.innerHTML = "Transaction's being processed";
    const ethAmount = ethAmountInput.value;
    const fundSuccess = await fund(ethAmount);

    // Response
    fundButtonResponse.innerHTML = (fundSuccess ? ("You have funded " + ethAmount + " ETH") : "Transaction failed");
});

withdrawButton.addEventListener("click", async () => {
    withdrawButtonResponse.innerHTML = "Transaction's being processed";
    const withdrawSuccess = await withdraw();

    // Response
    withdrawButtonResponse.innerHTML = (withdrawSuccess ? "You have withdrawn" : "Transaction failed");
});

getContractOwnerButton.addEventListener("click", async () => {
    const ownerAddres = await getContractOwner();

    // Response
    getContractOwnerButtonResponse.innerHTML = ("Contract's owner: " + ownerAddres);
})

getContractBalanceButton.addEventListener("click", async () => {
    const contractBalance = await getContractBalance();

    // Response
    getContractBalanceButtonResponse.innerHTML = ("Contract's balance: " + contractBalance + " ETH");
});

getFunderBalanceButton.addEventListener("click", async () => {
    const funderBalance = await getFunderBalance();

    // Response
    getFunderBalanceButtonResponse.innerHTML = ("Funder's balance: " + funderBalance + " ETH");
})

getFunderButton.addEventListener("click", async () => {
    const funderIndex = funderIndexInput.value;
    const funderAddress = await getFunder(funderIndex);

    // Response
    getFunderButtonResponse.innerHTML = ("Funder's address: " + funderAddress);

});

getPriceFeedButton.addEventListener("click", async () => {
    const priceFeedAddress = await getPriceFeed();

    // Response
    getPriceFeedButtonResponse.innerHTML = ("Price feed's address: " + priceFeedAddress);

});

getFunderToAmountButton.addEventListener("click", async () => {
    const funderAddress = funderAddressInput.value;
    const funderAmount = await getFunderToAmount(funderAddress);

    // Response
    getFunderToAmountButtonResponse.innerHTML = ("Funders' amount: " + funderAmount + " ETH");

});