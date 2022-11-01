# XRPL-NFT-Proof-of-Attendance-Infrastructure

XRPL-NFT-Proof-of-Attendance-Infrastructure is a MERN stack application that contains functionality to allow event organizers to mint and distribute Attendance NFTs on the XRP Ledger. The core parts of this application consist of a React frontend, Express backend, **Rest API (nftRoutes.js)**, and **XrplNFTHelper.js**. Please note, mongo has been disconnected. Any db solution can replace it but isn't needed at this point. All metadata storage for the NFT's is currently stored locally is JSON object files. In a live version these files will need to be stored in a location with a public URI. 


# Install and use the developer example

1) Install all packages. Do three npm installs in all three directories. 
```
XRPL-NFT-Proof-of-Attendance-Infrastructure-main/XRPL-NFT-Proof-of-Attendance-Infrastructure-main/ npm install
XRPL-NFT-Proof-of-Attendance-Infrastructure-main/XRPL-NFT-Proof-of-Attendance-Infrastructure-main/backend/ npm install
XRPL-NFT-Proof-of-Attendance-Infrastructure-main/XRPL-NFT-Proof-of-Attendance-Infrastructure-main/frontend npm install

```

2) Run backend then frontend. 

```
../backend/npm start
../frontend/npm start

```
**XrplNFTHelper.js** is Javascript class that is meant to be used within any NodeJS project. It contains functionality that allows event organizers to mint and distribute Attendance NFTs on the XRP Ledger. It is meant to be imported and instantiated inside the routes file of your project.

**Instantiating XrpNFTHelper.js**
Please note, the XrpNFTHelper class has a constructor that takes a javascript object. Before performing a transaction on the ledger certain details are required, depending on the type of transaction (All required paramaters are listed in the comments). These details are passed during the instantiation of XrpNFTHelper class.

```
import XrplNFTHelper from './XrplNFTHelper.js';

router.route('/burnAllNFT').get((req, res) => {

  const nftManager = new XrplNFTHelper({TransactionType: "NFTokenBurn", 
  Account: body.account, 
  Secret:  body.secret,});

  nftManager.burnAllNFT().then( (result) => { return result }) 
  
  })
```


# XrpNFTHelper.js Functions

- mintToken() Mint Single token.
 

   @Params (required class object variables) - created during instantiation of XrpNFTHelper.js
   ```
  TransactionType: this.transactionDetails.TransactionType,
  Account: this.transactionDetails.Account,
  URI: this.transactionDetails.URI,
  Flags: this.transactionDetails.Flags,
  NFTokenTaxon: this.transactionDetails.NFTokenTaxon,
  
  @returns NFTokenID string
   ```
    
   
 

- mintX() Mint any number of tokens with identical info.

  ```

  @Params (required class object variables)
  TransactionType: this.transactionDetails.TransactionType,
  Account: this.transactionDetails.Account,
  URI: this.transactionDetails.URI,
  Flags: this.transactionDetails.Flags,
  NFTokenTaxon: this.transactionDetails.NFTokenTaxon,

  @returns array of NFTokenID strings
  
  ```

- getTokensFromLedger() Get all tokens from the ledger.

```
@Params (required class object variables)

Account: this.transactionDetails.Account

@returns array of NFTokenID's strings
```

- burnNFT() Burn specified NFT.

```

Params (required class object variables): 
          TransactionType: this.transactionDetails.TransactionType,
          Account: this.transactionDetails.Account,
          NFTokenID: this.transactionDetails.NFTokenID

  @Returns: String Transaction Result.
```

- burnAllNFT() Burn all NFTs in the account.
```
  Params (required class object variables): 
  transactionDetails.Secret
  transactionDetails.Account

  @Returns: 
  Array of NFTokenID's for removal of metadata storage

```


# Rest API - nftRoutes.js

The rest API is located at XRPL-NFT-Proof-of-Attendance-Infrastructure/backend/routes/nftRoutes.js. 

There are currently 6 GET routes (listed below) that create a class object of XrpNFTHelper.js based on paramaters passed via the body header of a GET request. Each route expects a stringified JSON object. 

For example, in a react front end the /mintNFT route is properly accessed as such:

```
const headers = {'body': JSON.stringify(formData)}

let response = await fetch('/api/mintNFT', {headers})
  setResponse(response)

```


# Rest API Specifications: 

- /api/mintNFT Mints the specified amount of tokens.

```
Expects Stringified JSON object with the following key, value pairs.
*Please note: these are required. Additional metadata can be attached to memo object.

{
  account: String, 
  secret:  String,
  numberOfTokens: String //body header should contain a string that represents an int.
}

@Returns

```



- /burnNFT Burn specified Event token.

```
Expects Stringified JSON object with the following key, value pairs.

{
    account: String, 
    secret:  String,
    nftTokenID: String
}

@Returns
-String (Transaction Result)
```



- /burnAllNFT Burn all NFTs in the account.

```
Expects Stringified JSON object with the following key, value pairs.

{
    account: String, 
    secret:  String,
}

@Returns
Stringified JSON object array with list of removed tokens.


```


- /getTokens Get all NFT's from storage.

```

@Returns Stringified JSON object Array of NFTokenID strings that currently exist in metadata storage


```



- /getTokensFromLedger Get all NFT's from ledger.

```

Expects Stringified JSON object with the following key, value pairs.

{
    account: String
}

@Returns Stringified JSON object Array of NFTokenID strings that currently exist per the ledger


```


- /getData Get all metadata.
```

Expects Stringified JSON object with the following key, value pairs.


  {
    nftTokenID: String
  }


@Returns Stringified JSON object with a memo object containing all details.


```











