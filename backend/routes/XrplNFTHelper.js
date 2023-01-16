import xrpl from 'xrpl';
import axios from 'axios';
import fs  from 'fs'; //used for storage of token metadata in devmode

import XummSdk from 'xumm-sdk';



const sdk = new XummSdk.XummSdk('d16951f8-6528-4c3f-88e9-37333e383421','e6d8a068-a55b-4e5a-b540-016847d7e376')



export class XrplNFTHelper { 

   constructor(details){


    
    this.transactionDetails = details;
    this.clientDetails = "wss://xrplcluster.com/:51233" //nft-devnet *Change as needed
   // this.clientDetails = "wss://s.altnet.rippletest.net:51233"
  }



  /* Mint Single token

  * @Params (required)
  -TransactionType: this.transactionDetails.TransactionType,
  -Account: this.transactionDetails.Account,
  -URI: this.transactionDetails.URI,
  -Flags: this.transactionDetails.Flags,
   -NFTokenTaxon: this.transactionDetails.NFTokenTaxon,
   
  @returns array of NFTokenID strings
  * @returns NFTokenID string
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
		URI: this.transactionDetails.URI,
		Flags: this.transactionDetails.Flags,
		NFTokenTaxon: this.transactionDetails.NFTokenTaxon,
    }
    
    //submit minting transaction
    const tx = await client.submitAndWait(transactionData,{wallet})

  const result = await client.request({
    method: "account_nfts",
    account: this.transactionDetails.Account
    })

   return result.result.account_nfts[result.result.account_nfts.length -1].NFTokenID

  	

}
catch(err) {
  console.log("Error occured during minToken() call" + err)
  return;
}
  
  }

  

async mintTickets(tickets,minterKey){


  const client = new xrpl.Client("wss://xrplcluster.com/:51233") 
  const wallet = xrpl.Wallet.fromSeed(minterKey)

  await client.connect();

  let ticketArr = []

    for (let i=0; i < tickets.length; i++) {
      ticketArr[i] = tickets[i].TicketSequence;
    }

    
    for (let i=0; i < ticketArr.length; i++) {
      const transactionBlob = {
          "TransactionType": "NFTokenMint",
          "Account": wallet.classicAddress,
          "URI":  xrpl.convertStringToHex("www.testing.com"),
          "Flags": parseInt(11),
          "Sequence": 0,
          "TicketSequence": ticketArr[i],
          "NFTokenTaxon": 6666
      }
      
      console.log("Minting " + ticketArr[i])
      const tx =  client.submit(transactionBlob, { wallet: wallet} )
    }

    let nfts = await client.request({
      method: "account_nfts",
      account: this.transactionDetails.Account
      })


    
    
  
    return nfts;
}


async batchX(){
  try {


    const client = new xrpl.Client(this.clientDetails) 
    const wallet = xrpl.Wallet.fromSeed(this.transactionDetails.Secret) //secret
    
    await client.connect()

    const nftokenCount = this.transactionDetails.Memos.numberOfTokens


    const account_info = await client.request({
      "command": "account_info",
      "account": wallet.classicAddress
    })

    let my_sequence = account_info.result.account_data.Sequence

    
    let response = await client.request({
      "command": "account_objects",
      "account": wallet.classicAddress,
      "type": "ticket"
    })


    let tickets = []

    for (let i=0; i < nftokenCount; i++) {
      tickets[i] = response.result.account_objects[i].TicketSequence
    }

    
    const ticketTransaction = await client.autofill({
      "TransactionType": "TicketCreate",
      "Account": wallet.classicAddress,
      "TicketCount": nftokenCount,
      "Sequence": my_sequence
    })


    

    const signedTransaction = wallet.sign(ticketTransaction)
    const tx = await client.submitAndWait(signedTransaction.tx_blob)

   

  for (let i=0; i < nftokenCount; i++) {
    const transactionBlob = {
        "TransactionType": "NFTokenMint",
        "Account": wallet.classicAddress,
        "URI":  this.transactionDetails.URI,
        "Flags": this.transactionDetails.Flags,
        "Sequence": 0,
        "TicketSequence": tickets[i],
        "NFTokenTaxon": 5555
    }
    
    const tx =  client.submit(transactionBlob, { wallet: wallet} )
    

    let nfts = await client.request({
      method: "account_nfts",
      account: wallet.classicAddress,
      limit: 400
    })
    
   
    for(let i = 0; i <= nftokenCount; i++)
    {
          nfts = await client.request({
              method: "account_nfts",
              account: wallet.classicAddress,
              limit: 400,
              marker: nfts.result.marker
          })
        
    }

  }
    return nfts.result.account_nfts



  }
catch(err) {
console.log("Error occured during batchX() call" + err)
console.log(err.data)
return;
}


}



  /*getTokens
  *
  *@returns array of NFTokenID's
  */
  async getTokensFromLedger(){
    try {
  
      
        const client = new xrpl.Client(this.clientDetails)
        await client.connect()

        console.log("Connected to Sandbox..getting all NFT's.****")
  
      
        let nfts = await client.request({
          method: "account_nfts",
          account: this.transactionDetails.Account
          })
  
  
          await client.disconnect()
          console.log("disconnecting")
  
          return nfts.result.account_nfts
  
  
  }
  catch(err) {
  console.log("Error occured during getTokens() call" + err)
  return;
  }
  
  }


/* Burn specified NFT
* Params (required): 
          - TransactionType: this.transactionDetails.TransactionType,
          - Account: this.transactionDetails.Account,
          - NFTokenID: this.transactionDetails.NFTokenID

  Returns: Transaction Result string.
*
*/
  async burnNFT(){
    try {
     

      const wallet = xrpl.Wallet.fromSeed(this.transactionDetails.Secret)
      const client = new xrpl.Client(this.clientDetails)
      await client.connect()

      console.log("Connected to Sandbox..burning single NFT.")

   
    
    const transactionData = {
          TransactionType: this.transactionDetails.TransactionType,
          Account: this.transactionDetails.Account,
          NFTokenID: this.transactionDetails.NFTokenID
      }
      
    
      
      const tx = await client.submitAndWait(transactionData,{wallet})
  
      client.disconnect()
      return tx.result.meta.TransactionResult

}
catch(err) {
  console.log("Error occured during minToken() call" + err)
  return;
}
  
  }


  /*Burn all NFTs in the account

  Params (required): 
  - transactionDetails.Secret
  - transactionDetails.Account

  Returns: 
  Array of NFTokenID's for removal of metadata storage


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
        return nfts.result.account_nfts;

}
catch(err) {
  console.log("Error occured during burnAllNFT() call" + err)
  return;
}
  
  }

  async acctInfo(){


    const client = new xrpl.Client(this.clientDetails) 

    await client.connect()

    const account_info = await client.request({
      "command": "account_info",
      "account": this.transactionDetails.Account
    })

    client.disconnect()

    return account_info
  }

  async getTicketInfo(){


    const client = new xrpl.Client(this.clientDetails) 

    await client.connect()

    let response = await client.request({
      "command": "account_objects",
      "account": this.transactionDetails.Account,
      "type": "ticket"
    })

    client.disconnect()

    return response.result.account_objects

  }

  async cancelTicket(){


    const client = new xrpl.Client(this.clientDetails) 

    await client.connect()

    let response = await client.request({
      "TransactionType": "AccountSet",
      "account": this.transactionDetails.Account,
      "Sequence": 76166221
    }).then( res => { 
      console.log(res)
    })

  }


  
  async lookupTx(txId){
    try{

      const wallet = xrpl.Wallet.fromSeed(this.transactionDetails.Secret)

      const client = new xrpl.Client(this.clientDetails)
      await client.connect()

      console.log("getting transaction details")

   
    }
    catch(err){
      console.log("error"+err)
      return;
    }
  }


  async xummCall(payload){
    try {


      console.log("pinging..")
    //  const newPayload = await sdk.payload.create(payload, true)
   const data =  await sdk.payload.create(payload)
     // console.log("payload: " + JSON.stringify(payload) )
    

    

    console.log("data: " + data)
        return data

 }
catch(err) {
  console.log("Error occured during xummCall call" + err)
  return;
}
  
  }







}



export default XrplNFTHelper



