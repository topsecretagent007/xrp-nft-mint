# XRPL-Proof-of-Attendance-Infrastructure
XRPL-Proof-of-Attendance-Infrastructure/backend/routes/XrplNFTHelper.js

**XrplNFTHelper.js** is designed to work within any NodeJS project. As an example, I have provided a working MERN (mongo has been disconnected) application that implemenents **XrplNFTHelper.js**.

**XrplNFTHelper.js** is a Javascript class that contains functionality that allows event organizers to mint and distribute Attendance NFTs on the XRP Ledger.

**XrplNFTHelper.js** is meant to be imported into the routes file of your project. A working route for each one of the classes functions has been provided in this example. The necessary transaction data has been hard coded into the routes for sake of ease. In a production version the frontend will make post/get calls with details of the transaction and this will be handled in the req.body inside the routes file on the backend.

```
import XrplNFTHelper from './XrplNFTHelper.js';
import xrpl from "xrpl";

router.route('/mintNFT').get((req, res) => {
    
    
    //**TYPICALLY WE WANT TO GET FOLLOWING TRANSACTION DATA FROM req.body
    
    const nftManager = new XrplNFTHelper({TransactionType: "NFTokenMint", 
                            Account: "rLu7G9VDPpvFoqQJRpZZQc2QNDbUhxafJd", 
                            Secret:  "ssTkdDoL3i6SGoDjFwjtkmFpM3SAi",
                            // Fee: parseInt(314),
                            URI: xrpl.convertStringToHex("www.test.com"), 
                            Flags: parseInt(11), 
                            NFTokenTaxon: 0});

    nftManager.mintToken().then( (result) => { 
        res.send(result)
    })


})
```

# Current Functionality

- Mint Single NFT.

- Mint X number of identical NFT's and assign to same account.

- Assign NFT to a different account.

- get All NFT's for specified account.

- Burn specified NFT.

- Burn all NFTs in the account.
