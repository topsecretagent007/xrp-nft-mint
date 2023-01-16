import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';


function QrModal2({qr_png, uuid, closeModal}) {



    useEffect(() => { 

   

    let timer = 45;

    let interval = setInterval(async () => {
    
   
            console.log(timer)
  


        if(timer < 1 ){
            clearInterval(interval);
            closeModal(); 
             
        }else{

            
            let body = {
                uuid: uuid
              }
          
              const headers = {'body': JSON.stringify(body)}

            await axios.get('/api/getPayloadInfo', {headers}).then( (data) => { 
  
                
                if(data.data.meta.signed){
                   
                    clearInterval(interval);
                    closeModal(); 
                }
          
              })

            timer = timer -1;
        
        }

       
        
}, 1000)


})



  return (
    
    <div>
        

        <h4>Please scan with Xumm app to verify transaction.</h4>
        
        <div>
        
        <img src={qr_png} />

        </div>
    
    
    </div>
  )
}

export default QrModal2