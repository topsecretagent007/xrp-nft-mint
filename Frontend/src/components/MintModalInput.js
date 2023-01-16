import React from 'react'

function MintModalInput({ setDate,setDescription, setLocation, setFile, file, message }) {
  

    return (

    

    <>
     <p>Mint an NFT</p>
            <br />
            <div>
            <label>Date</label>
            <input type='Date' onChange={(e) => setDate(e.target.value)}/>
            </div>
            
            <div>
            <label>Location</label>
            <input type='text' onChange={(e) => setLocation(e.target.value)}/>
            </div>

            <div>
            <label>Description</label>
            <input type='text' onChange={(e) => setDescription(e.target.value)}/>
            </div>

            <div>
            <label>Image</label>
            <input type='File' accept="image/*" onChange={(e) => setFile(e.target.files[0])}/>
            </div>

            {file != null && <img style={{ height: '100px', width: "100px" }} src={URL.createObjectURL(file)} />}

            <h5>{message}</h5>
           
    </>
//
  )
}

export default MintModalInput