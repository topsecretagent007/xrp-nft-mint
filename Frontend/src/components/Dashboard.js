import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'


import './Dashboard.css';
import BurnModal from './BurnModal';
import MintModal from './MintModal';


export const Dashboard = (props) => {


  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState({results: [], showButtons: false});

  const [openBurnModal, setOpenBurnModal] = useState({show: false, idValue: ""});
  const [openMintModal, setMintModal] = useState({show: false})


  useEffect(() => {
    activateSearch()
}, [openBurnModal])

    
  


  function activateSearch() {
    
    document.getElementById("searchBox").value="";


    let body = {
      account: search,
    }

    const headers = {'body': JSON.stringify(body)}
    

    axios.get('/api/getTokensFromLedger', {headers}).then( (res) => { 
      console.log(res)

      setSearchResults({results: res.data, showButtons: true});
      

    })

  }

  function showBurnModal(e){
    
    setOpenBurnModal({show: true, idValue: searchResults.results[e.target.id].NFTokenID})
  }

  function showMintModal(e){
    
    setMintModal({show: true})

  }

  function mapSearchResults() { 


return(
  <table className='center'>
  <tr>
    <th>TOKEN ID</th>
    <th>ISSUER</th>
    <th>TAXON</th>
  </tr>

  {searchResults.results.map( (nft,index) => { 

  return (
   <tr id={index}>
      <td>{nft.NFTokenID}</td>
      <td>{nft.Issuer}</td>
      <td>{nft.NFTokenTaxon}</td>
      <td><button id={index} type="submit" onClick={showBurnModal}>Burn NFT</button></td>
      <td><button type="submit">Create Sell Offer</button></td>
    </tr>
    )
  })}

  </table>

)

  }

  

  return (
   
    <div>

{openBurnModal.show && <BurnModal closeModal={() => {setOpenBurnModal({show: false, idValue: ""})}} idValue={openBurnModal.idValue}/>}
{openMintModal.show && <MintModal closeModal={() => {setMintModal({show: false, idValue: ""})}} />}

      <input id="searchBox" type="text" placeholder="r-address..." onChange={event => setSearch(event.target.value)}/>
    
      <button onClick={activateSearch} ><i class="fa fa-search"></i></button>
    

    <div className="primaryBox">
      
 
      
      <div>

      {search ? <h2>{search}</h2> : <h2>Enter valid r-address and click search button</h2>}
      </div>
      
   

    <div>

    <div className="buttonBox">
    <button onClick={showMintModal}>Mint NFT</button>
    
    <button>Create Tickets</button>
    
    <button>Batch Mint Tickets</button>
    </div> 
     
    </div> 


    <div style={{textAlign: "center"}}>
    
    {searchResults.results.length > 0 ? mapSearchResults() : <h4>No NFTs exist for this account.</h4>}

    </div>

   
      
   
    
    </div>
  
  </div>
  )
}
