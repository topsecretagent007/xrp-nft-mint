import { getUsers, getUserById } from "../controllers/userController.js";
import express from 'express'

import XrplNFTHelper from './XrplNFTHelper.js';
import xrpl from "xrpl";


const router = express.Router()



                  

// express router method to create route for getting all users
router.route('/mintNFT').get((req, res) => {
    
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


router.route('/burnNFT').get((req, res) => {

    const nftManager = new XrplNFTHelper({TransactionType: "NFTokenBurn", 
    Account: "rLu7G9VDPpvFoqQJRpZZQc2QNDbUhxafJd", 
    Secret:  "ssTkdDoL3i6SGoDjFwjtkmFpM3SAi",
    Fee: "12",
    URI: xrpl.convertStringToHex("www.test.com"), 
    Flags: parseInt(11), 
    NFTokenTaxon: 0,
    NFTokenID: "00080000DA56C6BF9DBAFF864C3715E1B13BCCA3CFB73855FBE004A60000000B"}); //this value should be found via post method and inside req.body                     
    
    
    
    
  nftManager.burnNFT().then( (result) => { 

    res.send(result)

  })
                           



                        })

// express router method to create route for getting users by id
router.route('/getTokens').get((req, res) => {

    const nftManager = new XrplNFTHelper({Account: "rLu7G9VDPpvFoqQJRpZZQc2QNDbUhxafJd"});                        
    
    
    
    
  nftManager.getTokens().then( (result) => {

    res.send(result)
    
  });

  


})

export default router
