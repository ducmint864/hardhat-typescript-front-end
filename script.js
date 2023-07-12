// Handle connect button
const metamaskInstalled = (typeof window.ethereum !== "undefined") ? true : false;
let account;

if (!metamaskInstalled) {
    window.alert("Please instasll metamask 🦊");
}

document.addEventListener("DOMContentLoaded", () => {
    const showAccount = document.getElementById("showAccount");
})

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
        account = accounts[0];
        showAccount.innerHTML = account;
        document.getElementById("connectButton").innerHTML = "Connected";
    }
}