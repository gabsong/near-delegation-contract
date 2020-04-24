import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import getConfig from './config.js';
import * as nearlib from 'near-api-js';

// Initializing contract
async function initContract() {
    window.nearConfig = getConfig(process.env.NODE_ENV || 'development')
    console.log("nearConfig", window.nearConfig);
    window.nearlib = nearlib; // Remove
    console.log('nearlib:', nearlib); // Remove

    // Initializing connection to the NEAR DevNet.
    window.near = await nearlib.connect(Object.assign({ deps: { keyStore: new nearlib.keyStores.BrowserLocalStorageKeyStore() } }, window.nearConfig));
    
    // Needed to access wallet login
    window.walletAccount = new nearlib.WalletAccount(window.near);
    
    // Getting the Account ID. If unauthorized yet, it's just empty string.
    window.accountId = window.walletAccount.getAccountId();

    // Initializing our contract APIs by contract name and configuration.
    let acct = await new nearlib.Account(window.near.connection, window.accountId);
    window.contract = await new nearlib.Contract(acct, window.nearConfig.contractName, {
        // View methods are read only. They don't modify the state, but usually return some value.
        viewMethods: ['welcome'],
        // Change methods can modify the state. But you don't receive the returned value when called.
        changeMethods: ['setGreeting'],
        // Sender is the account ID to initialize transactions.
        sender: window.accountId
    });
}

window.nearInitPromise = initContract().then(() => {
  ReactDOM.render(<App contract={window.contract} wallet={window.walletAccount} />,
    document.getElementById('root')
  );
}).catch(console.error)


// Notes
// do not attach references to nearAPI, contract, or wallet to the window global object
// when deploying to production

// is there a reason initContract has to execute first and render on success?
// should I just render the login page first?

// this snippet on DevTools gives me the user's wallet balance
// contract.account.state().then(state => {
//   let balance = nearlib.utils.format.formatNearAmount(state.amount, 2)
//   console.log(balance) // logs 500.00 NEAR
// })