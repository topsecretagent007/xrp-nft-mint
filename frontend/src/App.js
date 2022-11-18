import React, {useEffect, useState} from 'react'
import axios from 'axios'



const App = () => {

const [account, setAccount] = useState("")
const [secret, setSecret] = useState("")
const [numberOfTokens, setNumberOfTokens] = useState(0)
const [response, setResponse] = useState("")
const [radioButton, setRadioButton] = useState("mint")
const [tokenList, setTokenList] = useState([])
const [messages, setMessages] = useState(["Welcome<br>", "Please do system checkes before continuing.."])

//metadata:
const [date, setDate] = useState("")
const [location, setlocation] = useState("")
const [description, setdescription] = useState("")
const [image, setimage] = useState("")
const [offer, setoffer] = useState("")
const [title, settitle] = useState("")
const [time, settime] = useState("")
const [qrCode, setqrCode] = useState("")
const [uniqueTaxon, setuniqueTaxon] = useState("")

const [nftTokenID, setnftTokenID] = useState("")


const handleAccountChange = (event) => {

  console.log(event.target.value)
  setAccount(event.target.value)

}

const handleSecretChange = (event) => {


  setSecret(event.target.value)

}

const handleNumberOfTokensChange = (event) => {


  setNumberOfTokens(event.target.value)

}

const handleMetaChange = (event) => {

  if(event.target.name == 'date'){
    setDate(event.target.value)
  }
  if(event.target.name == 'location'){
    setlocation(event.target.value)
  }
  if(event.target.name == 'description'){
    setdescription(event.target.value)
  }
  if(event.target.name == 'image'){
    setimage(event.target.value)
  }
  if(event.target.name == 'offer'){
    setoffer(event.target.value)
  }
  if(event.target.name == 'title'){
    settitle(event.target.value)
  }
  if(event.target.name == 'time'){
    settime(event.target.value)
  }
  if(event.target.name == 'qrCode'){
    setqrCode(event.target.value)
  }
  if(event.target.name == 'uniqueTaxon'){
    setuniqueTaxon(event.target.value)
  }
  if(event.target.name == 'nftTokenID'){
    setnftTokenID(event.target.value)
  }

}

const handleRadioButtonChange = (event) => {
  console.log(event.target.id)
  if(event.target.id === 'burn' && event.target.checked){
    console.log("setting to burn")
    setRadioButton("burn")
  }
  if(event.target.id === 'burnAll' && event.target.checked){
    console.log("setting to burn all")

    setRadioButton("burnAll")
  }
  if(event.target.id === 'mint' && event.target.checked){
    setRadioButton("mint")
  }
  
  


}

const handleSubmit = async() => {
 
  if(radioButton == 'mint'){
  let formData = {
 
  account: account, 
  secret: secret, 
  numberOfTokens: numberOfTokens,
  date: date,
  location: location,
  description: description,
  image: image,
  numberOfTokens: numberOfTokens,
  offer: offer,
  title: title,
  time: time,
  qrCode: true,
  uniqueTaxon: true 

  }

  
  const headers = {'body': JSON.stringify(formData)}
  let response = await fetch('/api/mintNFT', {headers})
  console.log(response)
  setResponse(response)
  
}

if(radioButton == 'burn'){
  let formData = {
 
    account: account, 
    secret: secret, 
    nftTokenID: nftTokenID
  
    }
  
    
    const headers = {'body': JSON.stringify(formData)}
    let response = await fetch('/api/burnNFT', {headers})
    setResponse(response)
}

if(radioButton == 'burnAll'){
  let formData = {
 
    account: account, 
    secret: secret
  
    }
  
    
    const headers = {'body': JSON.stringify(formData)}
    let response = await fetch('/api/burnAllNFT', {headers})
    setResponse(response)
    
}

}





const getData = async() => {



  const xummRes = await axios.get('/api/xummPayload') 
  
  let newArr = messages.map(e => {
    return e;
  })

  newArr.push(<h2>Retrieving token id's from ledger..</h2>)
  

  const res = await axios.get('/api/getTokensFromLedger') 
  

const resData =  res.data.map( (e) => {
 
  return <li>{e.NFTokenID}</li>

});

setTokenList(resData)
  /*
  
     for (let index = 0; index < res.data.length; index++) {
      console.log(res.data[index].NFTokenID)

      setTokenList(res.data, [...res.data, res.data[index].NFTokenID])
    }
*/
 // const res2 = await axios.get('/api/getTokens')
 // setAccount(res.data)
  
}


useEffect(() => {

  

  getData()
}, [response,messages])




const formGenerator = () => {
  

    
if(radioButton == "mint"){
  return(
    <form class="command-container">
<h2>Event NFT Generator</h2>

    <label>Account Number</label>
    <div class="user-box">
      <input type="text" name="" required=""  onChange={handleAccountChange} /> 
    </div>

    <label>Secret </label>
    <div class="user-box">
      <input type="text" name="" required="" onChange={handleSecretChange} />
    </div>

    <label># of Event tickets / tokens to generate</label>
    <div class="user-box">
      <input type="number" name="" required="" onChange={handleNumberOfTokensChange} />
    </div>
    <h2>Metadata (optional)</h2>
    
    <label>Initial Sell Offer</label>
    <div class="user-box">    
      <input type="float" name="offer" required="" onChange={handleMetaChange}/>
    </div>

    <label>Event Title</label>
    <div class="user-box">    
      <input type="text" name="title" required="" onChange={handleMetaChange}/>
      
    </div>

    <label>*Image File*</label>
    <div class="user-box">    
      <input type="file" name="image" required="" onChange={handleMetaChange}/>
      
    </div>


    <label>Date of Event </label>
    <div class="user-box">
      <input type="date" name="date" required="" onChange={handleMetaChange} />
      
    </div>

    <label>Location</label>
    <div class="user-box">
      <input type="text" name="location" required="" onChange={handleMetaChange} />
      
    </div>

    <label>Time</label>
    <div class="user-box">    
      <input type="text" name="time" required="" onChange={handleMetaChange} />
      
    </div>

  
  <label>Unique QR code</label>
  <div class="user-box">
      <input type="checkbox" name="" required="" />
     
    </div>
    
    <label>Unique Taxon value</label>
    <div class="user-box">
      <input type="checkbox" name="" required="" value="0" />
      
    </div>
    
    <a onClick={handleSubmit} href="#">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Submit
    </a>
  </form>
  )
  }


  if(radioButton == "burn"){
    return(
    <form>   
      <h2>Burn Specified NFT</h2>
  <div class="user-box">
    <input type="text" name="account" required="" onChange={handleAccountChange} />
    <label>Account Number</label>
  </div>


  <div class="user-box">
    <input type="text" name="secret" required=""  onChange={handleSecretChange}/>
    <label>Secret </label>
  </div>

  <div class="user-box">
    <input type="text" name="nftTokenID" required="" onChange={handleMetaChange} />
    <label>NFT ID value:</label>
  </div>


  <a onClick={handleSubmit} href="#">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Submit
    </a>

  </form>
  )
 
  }

  if(radioButton == "burnAll"){
return(
    <form>   
      <h2>Burn ALL NFT's in the account</h2>
  <div class="user-box">
    <input type="text" name="account" required=""  onChange={handleAccountChange} />
    <label>Account Number</label>
  </div>


  <div class="user-box">
    <input type="text" name="secret" required=""  onChange={handleSecretChange}/>
    <label>Secret </label>
  </div>
  <a onClick={handleSubmit} href="#">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Submit
    </a>
  
  </form>
)

}  

}


  return (

<div class="primaryDiv">

    <div class="navbarbox">
    <div class="navbaritem">
    | Find An Event |
     </div>  
    <div class="navbaritem">
    | Collect Event NFT |
    </div>
    <div class="navbaritem"> 
    | How to mint an Event NFT |
     </div> 

    </div>

<div class="displaycontainer">

<div class="cardBox">

<h1 style={{color: 'lightskyblue', textDecoration: 'underline'}}>God Mode</h1>

<h6>
    Account: "rLu7G9VDPpvFoqQJRpZZQc2QNDbUhxafJd", <br></br>
    Secret:  "ssTkdDoL3i6SGoDjFwjtkmFpM3SAi",
    </h6>

<br></br>
<br></br>
<br></br>
<br></br>
<br></br>

<h2>Active NFT ID's:</h2>
<ul>{tokenList}</ul>

<h2>Server Response Box</h2>
<div class="testtextarea">{messages}</div>

</div>

<div class="flex-item commandBox">

<div class="flex-container radio-items">
<input style={{height: "20px", width: "50px"}} type="radio" name="formOption" id="burn" onChange={handleRadioButtonChange}></input><label>Burn NFT</label>

<input style={{height: "20px", width: "50px"}} type="radio" name="formOption" id="burnAll" onChange={handleRadioButtonChange}></input>Burn All NFT's

<input style={{height: "20px", width: "50px"}} type="radio" name="formOption"  id="mint" onChange={handleRadioButtonChange}></input>Mint Event NFT's

</div>

    <span></span>
    <span></span>
    <span></span>
    <span></span>
  
    {formGenerator()}

</div>



 </div>
</div>
 )
}

export default App

