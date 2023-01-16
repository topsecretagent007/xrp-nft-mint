import React from 'react'
import { useState } from 'react';
import axios from 'axios'

import './BurnModal.css';


function BurnModal({ closeModal, idValue }) {

    const [burnData, setBurnData] = useState({qr_img: "", uuid: ""})
  
  


    function xummBurn() {


      

         let body = {
            metadata: {
              NFTokenID: idValue,
            }
          }
  
      
  
      axios.post('/api/xummBurn', body).then( (res) => { 
        
    
        setBurnData({qr_img: res.data.refs.qr_png, uuid: res.data.uuid})  
      })
    }

    function checkStatus(){

        let timer = 60;

       let refresh = setInterval( () => {
    
            
            
        
            if(timer < 0){
                clearInterval(refresh)
                closeModal(false)   
            }else{

                
                let body = {
                    uuid: burnData.uuid,
                  }
              
                  const headers = {'body': JSON.stringify(body)}

               axios.get('/api/getPayloadInfo', {headers}).then( (res) => { 
      
                  console.log(timer)

                    if(res.data.meta.signed){
                      
                        clearInterval(refresh)
                        closeModal(false)
                    }
              
                  })

                  timer = timer - 1
                  
            }

            
            
 }, 1000)



    }


  return (

    
    <div className="modalBackground">

        {burnData.qr_img=="" ? xummBurn() : ""}
        {burnData.uuid == "" ? "" : checkStatus()}


        <div className="modalContainer">
            <div className="titleCloseBtn">
                <button onClick={() => closeModal(false) }> X </button>
            </div>
            
            <div className="title">
                
                <img src={burnData.qr_img} />
            </div>
            <div className="body">
                <p>Scan QR Code with XUMM App to continue burning this NFT</p>
                <br />
                
            </div>
            <div className="footer">
                <button onClick={() => closeModal(false)}>Cancel</button>
            </div>
        </div>
    </div>


    )




}

export default BurnModal