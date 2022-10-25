import xrpl from 'xrpl';



export class XrplNFTHelper { 

   constructor(details){


    
    this.transactionDetails = details;
    this.clientDetails = "wss://xls20-sandbox.rippletest.net:51233" //nft-devnet *Change as needed
    
  }



  /* Mint Single token
  * 
  * @returns "tesSUCCESS" if successful
  */
  async mintToken(){
    try {
     
      
    const wallet = xrpl.Wallet.fromSeed(this.transactionDetails.Secret) //secret
    const client = new xrpl.Client(this.clientDetails) 
    await client.connect()

    console.log("Connected to server..minting single token.")

  
    const transactionData = {
    TransactionType: this.transactionDetails.TransactionType,
		Account: this.transactionDetails.Account,
    //Fee: this.transactionDetails.Fee,
		URI: this.transactionDetails.URI,
		Flags: this.transactionDetails.Flags,
		NFTokenTaxon: this.transactionDetails.NFTokenTaxon,
    //memos: this.transactionDetails.memos
    }
    
    //submit minting transaction
    const tx = await client.submitAndWait(transactionData,{wallet})

    client.disconnect()
  
    console.log("disconnected from server")
    return tx.result.meta.TransactionResult
  

  /* Check transaction results -------------------------------------------------
    console.log("Transaction result:", tx.result.meta.TransactionResult)
	  console.log("Balance changes:",
	  JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))
  */
	

}
catch(err) {
  console.log("Error occured during minToken() call" + err)
  return;
}
  
  }

/* Mint X number of identical tokens
* Assign all to same wallet
*
* Transaction detail requirements: 
  this.transactionDetails.numberOfTokens - #number of tokens to mint.
  this.transactionDetails.TransactionType,
	this.transactionDetails.Account,
  this.transactionDetails.Fee,
	this.transactionDetails.URI,
	this.transactionDetails.Flags,
	this.transactionDetails.NFTokenTaxon
*
*/
  async mintX(){
    try {
     
      const wallet = xrpl.Wallet.fromSeed(this.transactionDetails.Secret) //secret
      const client = new xrpl.Client(this.clientDetails) 
      await client.connect()
  
      console.log("Connected to server..minting " + this.transactionDetails.Memos.numberOfTokens + " tokens")




      const transactionData = {
        TransactionType: this.transactionDetails.TransactionType,
        Account: this.transactionDetails.Account,
        URI: this.transactionDetails.URI,
        Flags: this.transactionDetails.Flags,
        NFTokenTaxon: this.transactionDetails.NFTokenTaxon,
        }

        for (let index = 0; index < this.transactionDetails.Memos.numberOfTokens; index++) {
          //submit minting transaction
          console.log("Minting token " + index)
          let tx = await client.submitAndWait(transactionData,{wallet})

        }
        
        //submit minting transaction

      client.disconnect()
  
      console.log("disconnected from server")

      return "Finished"
}
catch(err) {
  console.log("Error occured during mintX() call" + err)
  return;
}
  
  }


  /*Assign token to wallet
  *@param tokenID token id to assign
  *@returns new wallet with token assigned.
  */
  async assignToWallet(){
    try {
     
  
  
  
  }
  catch(err) {
  console.log("Error occured during assignToWallet() call" + err)
  return;
  }
  
  }


  /*getTokens
  *
  *@returns array of tokens
  */
async getTokens(){
  try {

    console.log("Connected to Sandbox..getting all NFT's.")

    const wallet = xrpl.Wallet.fromSeed(this.transactionDetails.Secret)
      const client = new xrpl.Client(this.clientDetails)
      await client.connect()


      let nfts = await client.request({
        method: "account_nfts",
        account: this.transactionDetails.Account
        })


        await client.disconnect()
        console.log("disconnecting")

        return nfts.result.account_nfts


}
catch(err) {
console.log("Error occured during assignToWallet() call" + err)
return;
}

}

//getTokenDetails
async getTokenDetails(){
  try {
    

      //const wallet = xrpl.Wallet.fromSeed(this.transactionDetails.Secret)
      const client = new xrpl.Client(this.clientDetails)
      await client.connect()


      let nfts = await client.request({
        method: "account_nfts",
        account: this.transactionDetails.Account
        })

        console.log(nfts.result.account_nfts.length)


        await client.disconnect()

        return nfts.result



}
catch(err) {
console.log("Error occured during assignToWallet() call" + err)
return;
}

}


/* Burn specified NFT
*
*
*/
  async burnNFT(){
    try {
     

      const wallet = xrpl.Wallet.fromSeed(this.transactionDetails.Secret)
      const client = new xrpl.Client(this.clientDetails)
      await client.connect()

      console.log("Connected to Sandbox..burning single NFT.")

   
    // Prepare transactdion -------------------------------------------------------
    const transactionData = {
          TransactionType: this.transactionDetails.TransactionType,
          Account: this.transactionDetails.Account,
          NFTokenID: this.transactionDetails.NFTokenID
      }
      
    
      // Submit signed blob --------------------------------------------------------
      const tx = await client.submitAndWait(transactionData,{wallet})
  
      // Check transaction results -------------------------------------------------
     console.log("Transaction result:", tx.result.meta.TransactionResult)
      console.log("Balance changes:",
        JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))
      client.disconnect()
      console.log("Disconnected..Done burning single NFT.")
       /*  */

      return tx.result.meta.TransactionResult

}
catch(err) {
  console.log("Error occured during minToken() call" + err)
  return;
}
  
  }


  /*Burn all NFTs in the account
  */


  async burnAllNFT(){
    try {
     
      const wallet = xrpl.Wallet.fromSeed(this.transactionDetails.Secret)
      const client = new xrpl.Client(this.clientDetails)
      await client.connect()

      console.log("Connected to Sandbox..burning ALL NFT's for specified account.")

      let nfts = await client.request({
        method: "account_nfts",
        account: this.transactionDetails.Account
        })

        console.log("Attempting to burn " + nfts.result.account_nfts.length + " NFT's..")
              
        for (let index = 0; index < nfts.result.account_nfts.length; index++) {


          const transactionData = {
            TransactionType: this.transactionDetails.TransactionType,
            Account: this.transactionDetails.Account,
            NFTokenID: nfts.result.account_nfts[index].NFTokenID
        }


          const tx = await client.submitAndWait(transactionData,{wallet})
          console.log("Burnt " + nfts.result.account_nfts[index].NFTokenID + " ")
      
        }
        
        console.log("END.. All NFT's burned")
        return "Done";

}
catch(err) {
  console.log("Error occured during burnAllNFT() call" + err)
  return;
}
  
  }


}



export default XrplNFTHelper
