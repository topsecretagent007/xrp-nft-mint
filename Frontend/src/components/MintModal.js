import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
//import * as fs from 'fs';

import MintModalInput from './MintModalInput';
import QrModal2 from './QrModal2';

import './MintModal.css';

function MintModal({ closeModal }) {

    const [showQR, setShowQR] = useState({show: false});

    const [date, setDate] = useState("")
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")
    const[file, setFile] = useState();
    const[message,setMessage] = useState("")
    const[data, setData] = useState(null)

    function activateMinting(){

    

        if(date=="" || location =="" || description == "" || file == null ){
            setMessage("Please fill out the entire form")
        }

    

  
          
          let fileReader = new FileReader( );
          fileReader.onload = function ( evt ) { 
            
            
          
          
           let body = {
              metadata: {
              date: date, 
              location: location, 
              description: description, 
              file: evt.target.result
              }
          }
/*
          fetch('/api/xummMint', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
            });


        */
            axios.post('/api/xummMint', body).then( (res) => { 
      
            console.log("xumm data coming");
            console.log(res)
      
            setData({xummData: res});
      
          })  
        
        

      
      }

          fileReader.readAsText( file );

        
    }
    

    
  function showQRcode(e){
    
    setShowQR({show: true})

  }



  return (
    <div className="modalBackground">

    <div className="modalContainer">
        <div className="titleCloseBtn">
            <button onClick={() => closeModal(false) }> X </button>
        </div>
        
        <div className="title">
            
            
        </div>

        <div className="body">
            
           
           {console.log(data)}

    {data ? <QrModal2 qr_png={data.xummData.data.refs.qr_png} uuid={data.xummData.data.uuid} closeModal={()=> closeModal(false)}/> : <MintModalInput setDate={setDate} setDescription={setDescription} setLocation={setLocation} setFile={setFile} file={file} message={message}/>}
       
        </div>

        <div className="footer">
            <button id="cancelBtn" onClick={() => closeModal(false)}>Cancel</button>
            <button  onClick={activateMinting}>Continue</button>

        </div>
    </div>
</div>
  )
}

export default MintModal