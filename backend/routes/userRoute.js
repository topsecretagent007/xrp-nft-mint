import { getUsers, getUserById } from "../controllers/userController.js";
import express from 'express'

import XrplNFTHelper from './XrplNFTHelper.js';
import xrpl from "xrpl";

import fs from "fs";




const router = express.Router()



                  

// express router method to create route minting an Event NFT
//RETURNS: array of new NFTokenID's OR single NFTokenID
router.route('/mintNFT').get((req, res) => {

    //todo: check on headers.
    //parse an string object.
    let body = JSON.parse(req.headers.body)
    
let memo = {
            NFTokenID: "",
            date: body.date,
            location: body.location,
            description: body.description,
            image: body.image,
            numberOfTokens: parseInt(body.numberOfTokens),
            offer: body.offer,
            title: body.title,
            time: body.time,
            qrCode: true,
            uniqueTaxon: true 

}


    
    const nftManager = new XrplNFTHelper({TransactionType: "NFTokenMint", 
                            Account: body.account, 
                            Secret:  body.secret,
                            URI: xrpl.convertStringToHex("ww.constant.com"), 
                            Flags: parseInt(11), 
                            NFTokenTaxon: 0x2600,
                            Memos: memo });



    
    if(parseInt(memo.numberOfTokens) > 1){

      //RETURNS: array of new NFTokenID's
      nftManager.mintX().then( (result) => {
       
        //for each item adjust the memo NFTokenID value.
        //for each item in result store a json file.
        console.log(result)

        for(let index = 0; index <= result.length; index++){
          memo.NFTokenID = result[index];
         
          let data = JSON.stringify(memo);
          
          //write to local storage
          //TODO: write to cloud
          fs.writeFileSync(`${memo.NFTokenID}.json`, data);
        
        }

        res.send(result)
      })
    }else{
      //RETURNS:  new NFTokenID
      nftManager.mintToken().then( (result) => {
        
        memo.NFTokenID = result;
        console.log("storing to file")
        //store memo in file with NFTokenID as reference
        //TODO: STORE MEMO IN CLOUD.
        let data = JSON.stringify(memo);
        fs.writeFileSync(`${memo.NFTokenID}.json`, data);
        
        /*
        fs.readFile(`${memo.NFTokenID}`, (err,data) => {
          if(err) throw err;
          let jsonData = JSON.parse(data);
          console.log(jsonData)
        })*/
      

        res.send(result)
    })
   
    

  }
})

// express router method to burn specified Event token
router.route('/burnNFT').get((req, res) => {

    //todo: check on headers.
    //parse an string object.
    let body = JSON.parse(req.headers.body)
    console.log(body)

    const nftManager = new XrplNFTHelper({TransactionType: "NFTokenBurn", 
    Account: body.account, 
    Secret:  body.secret,
    NFTokenID: body.nftTokenID});
    
  nftManager.burnNFT().then( (result) => { 

    //remove corresponding metadata from storage
    var filePath = `${body.nftTokenID}.json`; 
    fs.unlinkSync(filePath);
   
    res.send(result)

  })
})


router.route('/burnAllNFT').get((req, res) => {

  //todo: check on headers.
    //parse an string object.
    let body = JSON.parse(req.headers.body)
    console.log(body)

  const nftManager = new XrplNFTHelper({TransactionType: "NFTokenBurn", 
  Account: body.account, 
  Secret:  body.secret,});

  nftManager.burnAllNFT().then( (result) => {
    

    //REMOVE metadata from storage.
    for(let index = 0; index < result.length; index++){
    
      fs.unlinkSync(`${result[index].NFTokenID}.json`)
    
    }
  
   
    res.send(result)
       
  });
  


})




//Get all tokens for specified account.
router.route('/getTokens').get((req, res) => {

    const nftManager = new XrplNFTHelper({TransactionType: "account_nfts", 
                                          Account: "rLu7G9VDPpvFoqQJRpZZQc2QNDbUhxafJd",
                                          Secret:  "ssTkdDoL3i6SGoDjFwjtkmFpM3SAi",});                        
    
    
    
    
  nftManager.getTokens().then( (result) => {

    res.send(result)
    
  });

  


})

/*TODO: requires storage implementation for metadata. All metadata could be stored in JSON
files with data requiring authentication and authorization being encrypted.


router.route('/getTokenDetails').get((req, res) => { 

  const nftManager = new XrplNFTHelper({TransactionType: "nft_info", 
                                        Account: "rLu7G9VDPpvFoqQJRpZZQc2QNDbUhxafJd",
                                        Secret:  "ssTkdDoL3i6SGoDjFwjtkmFpM3SAi",
                                        nft_id:  "000B0000DA56C6BF9DBAFF864C3715E1B13BCCA3CFB7385562685047000000AC"
                                      });                        
  
  
  
  
nftManager.getTokenDetails().then( (result) => {

  res.send(result)
  
});




})*/


router.route('/syncDevMode').get((req, res) => { 

  const nftManager = new XrplNFTHelper({TransactionType: "nft_info", 
                                        Account: "rLu7G9VDPpvFoqQJRpZZQc2QNDbUhxafJd",
                                        Secret:  "ssTkdDoL3i6SGoDjFwjtkmFpM3SAi",
                                       });                        
  
  
  
  
nftManager.syncDevMode().then( (result) => {

  res.send(result)
  
});




})

export default router
