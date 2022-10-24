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
		NFTokenTaxon: this.transactionDetails.NFTokenTaxon
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
*@param int #number of tokens to mint. 
*
*/
  async mintX(numberOfTokens){
    try {
     



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
   
    const wallet = xrpl.Wallet.fromSeed(this.transactionDetails.Secret)
      const client = new xrpl.Client(this.clientDetails)
      await client.connect()


      let nfts = await client.request({
        method: "account_nfts",
        account: this.transactionDetails.Account
        })
        console.log(nfts.result.account_nfts.length)


        await client.disconnect()

        return nfts.result.account_nfts 



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
     

      const wallet = xrpl.Wallet.fromSeed("ssTkdDoL3i6SGoDjFwjtkmFpM3SAi")
      const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233")
      await client.connect()
      console.log("Connected to Sandbox..burning single NFT.")
      let nfts = await client.request({
        method: "account_nfts",
        account: this.transactionDetails.Account
        })
        console.log(nfts.result.account_nfts.length)
      // Prepare transactdion -------------------------------------------------------
    
    const transactionData = {
          TransactionType: this.transactionDetails.TransactionType,
          Account: this.transactionDetails.Account,
          NFTokenID: this.transactionDetails.NFTokenID
      }
      
      
    /* 

      const transactionData = {
        TransactionType: this.transactionDetails.TransactionType,
        Account: this.transactionDetails.Account,
        Fee: this.transactionDetails.Fee,
        URI: this.transactionDetails.URI,
        Flags: this.transactionDetails.Flags,
        NFTokenTaxon: this.transactionDetails.NFTokenTaxon,
       // NFTokenID: this.transactionDetails.tokenID
        } 
      */
    
      // Submit signed blob --------------------------------------------------------
      const tx = await client.submitAndWait(transactionData,{wallet})
  
      nfts = await client.request({
        method: "account_nfts",
        account: this.transactionDetails.Account
        })
        console.log(nfts.result.account_nfts.length)
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
     



}
catch(err) {
  console.log("Error occured during burnAllNFT() call" + err)
  return;
}
  
  }


}



export default XrplNFTHelper
