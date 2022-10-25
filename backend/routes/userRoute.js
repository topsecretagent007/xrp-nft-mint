import { getUsers, getUserById } from "../controllers/userController.js";
import express from 'express'

import XrplNFTHelper from './XrplNFTHelper.js';
import xrpl from "xrpl";


const router = express.Router()



                  

// express router method to create route for getting all users
router.route('/mintNFT').get((req, res) => {

  let memos = 
    {
        
            date: "10/31/2022",
            location: "Chiang Mai, Thailand",
            description: "Jazz club north gate",
            image: "imgfile",
            numberOfTokens: 2

    }
    
    const nftManager = new XrplNFTHelper({TransactionType: "NFTokenMint", 
                            Account: "rLu7G9VDPpvFoqQJRpZZQc2QNDbUhxafJd", 
                            Secret:  "ssTkdDoL3i6SGoDjFwjtkmFpM3SAi",
                            // Fee: parseInt(314),
                            URI: xrpl.convertStringToHex("www.test.com"), 
                            Flags: parseInt(11), 
                            NFTokenTaxon: 0, 
                            Memos: memos });

    if(memos.numberOfTokens > 1){
      nftManager.mintX().then( (result) => {
        res.send(result)
      })
    }else{
      nftManager.mintToken().then( (result) => { 
        res.send(result)
    })
    }
  

})


router.route('/burnNFT').get((req, res) => {

    const nftManager = new XrplNFTHelper({TransactionType: "NFTokenBurn", 
    Account: "rLu7G9VDPpvFoqQJRpZZQc2QNDbUhxafJd", 
    Secret:  "ssTkdDoL3i6SGoDjFwjtkmFpM3SAi",
    Fee: "12",
    URI: xrpl.convertStringToHex("www.test.com"), 
    Flags: parseInt(11), 
    NFTokenTaxon: 0,
    NFTokenID: "000B0000DA56C6BF9DBAFF864C3715E1B13BCCA3CFB73855DCBA29BB00000020"}); //this value should be found via post method and inside req.body                     
    
    
    
    
  nftManager.burnNFT().then( (result) => { 

    res.send(result)

  })
})


router.route('/burnAllNFT').get((req, res) => {

  const nftManager = new XrplNFTHelper({TransactionType: "NFTokenBurn", 
  Account: "rLu7G9VDPpvFoqQJRpZZQc2QNDbUhxafJd", 
  Secret:  "ssTkdDoL3i6SGoDjFwjtkmFpM3SAi",
  Fee: "12",
  URI: xrpl.convertStringToHex("www.test.com"), 
  Flags: parseInt(11), 
  NFTokenTaxon: 0,
  NFTokenID: "000B0000DA56C6BF9DBAFF864C3715E1B13BCCA3CFB73855DCBA29BB00000020"}); //this value should be found via post method and inside req.body                     
  

  nftManager.burnAllNFT().then( (result) => {
    
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

router.route('/getTokenDetails').get((req, res) => { 

  const nftManager = new XrplNFTHelper({TransactionType: "nft_info", 
                                        Account: "rLu7G9VDPpvFoqQJRpZZQc2QNDbUhxafJd",
                                        Secret:  "ssTkdDoL3i6SGoDjFwjtkmFpM3SAi",
                                        nft_id:  "000B0000DA56C6BF9DBAFF864C3715E1B13BCCA3CFB73855F7BFFFB100000016" });                        
  
  
  
  
nftManager.getTokenDetails().then( (result) => {

  res.send(result)
  
});




})

export default router
