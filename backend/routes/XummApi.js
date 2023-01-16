import express from 'express'
import xrpl from "xrpl";
import fetch from 'node-fetch'
import axios from 'axios'
import XrplNFTHelper from './XrplNFTHelper.js';
import XummSdk from 'xumm-sdk';


const xummApi = ''
const xummSecret = ''

const pinataApiKey = ''
const pinataSecretApiKey = ''

const tempAddr = "rfRZeyG8YfSmKPqdX6PVLFJ5bdPCraDAsA"

const minterAddress = "rhk5dvLzcQ9HywR4cTsms3TqunAb94bXmv"
const minterKey = ""

const sdk = new XummSdk.XummSdk(xummApi,xummSecret)

const router = express.Router()






const xummCall = async (payload) => {

    const data =  await sdk.payload.create(payload)
    return data
}



router.route('/mintTickets').post( (req,res) => { 


  
  const nftManager = new XrplNFTHelper({Account: req.body.metadata.account})

  nftManager.getTicketInfo().then( tickets => {
  nftManager.mintTickets(tickets,minterKey).then(nfts => { 

         res.send(nfts)
      })
    })
})




router.route('/createTickets').post((req,res) => {
 
  

  let payload = {
    TransactionType: "TicketCreate",
    TicketCount: req.body.metadata.TicketCount
 }



  try {

    xummCall(payload).then( (xummInfo) => {
        

        let response = JSON.stringify(xummInfo); 
       
        res.send(response);
    
    })


    
  } catch (error) {
    console.log(error)
  }



})

router.route('/xummCancelOffer').post((req,res) => {
  

  let offers = []

  offers.push(req.body.metadata.offerID)

 
 let payload = {
                  TransactionType: "NFTokenCancelOffer",
                  NFTokenOffers: offers
               }



                try {

                  let result = xummCall(payload).then( (xummInfo) => {
                      

                      let response = JSON.stringify(xummInfo); 
                      
                      res.send(response);
                  
                  })
              
              
                  
                } catch (error) {
                  console.log(error)
                }



})

router.route('/xummAcceptOffer').post((req,res) => {

  

  let payload = {
                  TransactionType: "NFTokenAcceptOffer",
                  NFTokenSellOffer: req.body.metadata.NFTokenSellOffer,
                }


                try {
                 

                  xummCall(payload).then( (xummInfo) => {
                      
                      let response = JSON.stringify(xummInfo); 
                     
                      res.send(response);
                  
                  })
              
              
                  
                } catch (error) {
                  console.log(error)
                }





})

router.route('/xummCreateBuyOffer').post((req,res) => {
 

  
  let payload = {
                  TransactionType: "NFTokenCreateOffer",
                  Owner: req.body.metadata.owner,
                  NFTokenID: req.body.metadata.NFTokenID,
                  Amount: req.body.metadata.Amount       
                }

            
              try {

                  xummCall(payload).then( (xummInfo) => {
                      
                      let response = JSON.stringify(xummInfo); 
                      res.send(response);
                  
                  })
              
                  
                } catch (error) {
                  console.log(error)
                }
})

router.route('/xummCreateSellOffer').post((req,res) => {

    
   
    let payload = {
                    TransactionType: "NFTokenCreateOffer",
                    NFTokenID: req.body.metadata.NFTokenID,
                    Amount: req.body.metadata.Amount,
                    Flags: 1
                }


                try {

                  xummCall(payload).then( (xummInfo) => {
                        
                    
                        let response = JSON.stringify(xummInfo); 
                      
                        res.send(response);
                    
                    })
                
                
                    
                  } catch (error) {
                    console.log(error)
                  }

})

router.route('/xummMint').post((req,res) => {


   
  
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    axios.post(url, req.body,
        {
            headers: {
                'Content-Type': `application/json; boundary= ${req.body.metadata._boundary}`,
                'pinata_api_key': pinataApiKey,
                'pinata_secret_api_key': pinataSecretApiKey
            }
        }
    ).then(function (ipfsData) {    

      
      

    let payload = {
                              TransactionType: "NFTokenMint", 
                              URI: xrpl.convertStringToHex(`https://gateway.pinata.cloud/ipfs/${ipfsData.data.IpfsHash}`), 
                              Flags: parseInt(11), 
                              NFTokenTaxon: 1111,
                              Memos:  [{
                                    MemoType:
                                      xrpl.convertStringToHex("https://bit.lo/5555"),
                                    MemoData: xrpl.convertStringToHex("t-shirt-1")
                                }
                            ]
                   }


                   try {

                    xummCall(payload).then( (xummInfo) => {
                        
                      

                        let response = JSON.stringify(xummInfo); 

                        
                        res.end(response);
                    
                    })
                
                
                    
                  } catch (error) {
                    console.log(error)
                  }


    
    }).catch(function (error) {
        console.log(error)
    });  
    
    
  })




  router.route('/xummBurn').post((req, res) => {

  
    


    let payload = { 
        TransactionType: "NFTokenBurn",
        NFTokenID: req.body.metadata.NFTokenID,
    }

    try {

        xummCall(payload).then( (xummInfo) => {
            
            let response = JSON.stringify(xummInfo); 
            
            res.send(response);
        
        })
    
        
      } catch (error) {
       console.log(error)
      }

  })




  /* Get all NFT's from ledger.

  Returns:
  Array of NFTokenID strings that currently exist on the ledger

*/
router.route('/getTokensFromLedger').post((req, res) => {

    const nftManager = new XrplNFTHelper({Account: req.body.metadata.account});
  
    nftManager.getTokensFromLedger().then( (result) => {
    
      res.send(result)
  
    })
  })


  router.route('/getPayloadInfo').get( (req,res) => { 
    
    let body = JSON.parse(req.headers.body)
    

const url = `https://xumm.app/api/v1/platform/payload/${body.uuid}`;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-Key': xummApi,
    'X-API-Secret': xummSecret
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => res.send(json))
  .catch(err => console.error('error:' + err));

})



router.route('/account_info').post( (req,res) => { 

 

  const nftManager = new XrplNFTHelper({Account: req.body.metadata.account})
  nftManager.acctInfo().then(info => {

    
    let response = JSON.stringify(info); 
    res.send(response);

  })

})

router.route('/ticket_info').post( (req,res) => { 


  const nftManager = new XrplNFTHelper({Account: req.body.metadata.account})
  nftManager.getTicketInfo().then( info => {
   
    let response = JSON.stringify(info); 
       
    res.send(response);

  })

})

  
  export default router

