import React, {useEffect, useState} from 'react'
import axios from 'axios'



const App = () => {

const [account, setAccount] = useState("")
const [secret, setSecret] = useState("")
const [numberOfTokens, setNumberOfTokens] = useState(0)
const [response, setResponse] = useState("")
const [radioButton, setRadioButton] = useState("mint")

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

}

const handleRadioButtonChange = (event) => {
  console.log(event.target.id)
  if(event.target.id === 'burn' && event.target.checked){
    setRadioButton("burn")
  }
  if(event.target.id === 'burnAll' && event.target.checked){
    setRadioButton("burnAll")
  }
  if(event.target.id === 'mint' && event.target.checked){
    setRadioButton("mint")
  }
  
  


}

const handleSubmit = async() => {
 
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

  
  //const res = await axios.get('/api/mintNFT', {params: {data: JSON.stringify(formData) } } )
  const headers = {'body': JSON.stringify(formData)}
  let response = await fetch('/api/mintNFT', {headers})
  setResponse(response)
  

}





const getData = async() => {
  const res = await axios.get('/api/burnAllNFT')
 // setAccount(res.data)
  console.log(res)
}



useEffect(() => {
  getData()
}, [])


const formGenerator = () => {
  

  
if(radioButton == "mint"){
  return(
    <form>

    <div class="user-box">
      <input type="text" name="" required="" onChange={handleAccountChange} />
      <label>Account Number</label>
    </div>


    <div class="user-box">
      <input type="text" name="" required="" onChange={handleSecretChange}/>
      <label>Secret </label>
    </div>

    <div class="user-box">
      <input type="number" name="" required="" onChange={handleNumberOfTokensChange} />
      <label># of Event tickets / tokens to generate</label>
    </div>
    <h2>Metadata (optional)</h2>
    <div class="user-box">    
      <input type="float" name="offer" required="" onChange={handleMetaChange}/>
      <label>Initial Sell Offer</label>
    </div>

    <div class="user-box">    
      <input type="text" name="title" required="" onChange={handleMetaChange}/>
      <label>Event Title</label>
    </div>

    <div class="user-box">    
      <input type="file" name="image" required="" onChange={handleMetaChange}/>
      <label>*Image File*</label>
    </div>


    
    <div class="user-box">
      <input type="date" name="date" required="" onChange={handleMetaChange} />
      <label>Date of Event </label>
    </div>

    <div class="user-box">
      <input type="text" name="location" required="" onChange={handleMetaChange} />
      <label>Location</label>
    </div>

    <div class="user-box">    
      <input type="text" name="time" required="" />
      <label>Time</label>
    </div>

  

  <div class="user-box">
      <input type="checkbox" name="" required="" />
      <label>Unique QR code</label>
    </div>
    
    <div class="user-box">
      <input type="checkbox" name="" required="" value="0" />
      <label>Unique Taxon value</label>
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
      
  <div class="user-box">
    <input type="text" name="" required="" onChange={handleAccountChange} />
    <label>Account Number</label>
  </div>


  <div class="user-box">
    <input type="text" name="" required="" onChange={handleSecretChange}/>
    <label>Secret </label>
  </div>

  <div class="user-box">
    <input type="number" name="" required="" onChange={handleNumberOfTokensChange} />
    <label># of Event tickets / tokens to generate</label>
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
      
  <div class="user-box">
    <input type="text" name="" required="" onChange={handleAccountChange} />
    <label>Account Number</label>
  </div>


  <div class="user-box">
    <input type="text" name="" required="" onChange={handleSecretChange}/>
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
<div>

<div style={{color: "white"}}>
| Find An Event | <br></br>
| Collect Event NFT | <br></br>
| How to mint an Event NFT | <br></br> 

<br></br>
<br></br>
<br></br>
<br></br>
<br></br>


<input
                type="radio"
                name="formOption"
                id="burn"
           //     value={result.ADDRESS}
            //    checked={this.state.address === result.ADDRESS}
                 onChange={handleRadioButtonChange}
></input>Burn NFT
<br></br>

  <input
                type="radio"
                name="formOption"
                id="burnAll"
           //     value={result.ADDRESS}
            //    checked={this.state.address === result.ADDRESS}
            onChange={handleRadioButtonChange}
></input>Burn All NFT's
<br></br>

  <input
                type="radio"
                name="formOption"
                id="mint"
           //     value={result.ADDRESS}
            //    checked={this.state.address === result.ADDRESS}
            onChange={handleRadioButtonChange}
></input>Mint Event NFT's

<br></br>


</div>
<div class="login-box">
  <h2>Event Token Generator</h2>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  
  

  {formGenerator()}

</div>


<div class="info-box">
  
  <form>
    <div class="user-box">
      <input type="text" name="" required="" />
      <label>Account Number</label>
    </div>

  </form>
</div>
 
</div>
 
 )
}
// {users.map(u => <h4 key={u._id}>userName : {u.userName}</h4>)}

/*

<html>
    
    <label for="fname">Account Number:</label>
    <input type="text" name="account" onChange={handleChange} />
    {account}
  
    </html>


const [inputs, setInputs] = useState([])

const handleRegistration = (data) => console.log(data);
const { register, handleSubmit } = useForm();


const handleChange = (event) => {
  const account = event.target.account;
  const flag = event.target.flag;
  const value = event.target.value;
  setInputs(values => ({account,flag,value}))
}

const handleSubmit = (event) => {
  event.preventDefault();
  console.log(inputs);
}


const getData = async() => {
  const res = await axios.get('/api/mintNFT')
  setInputs(res.data)
  console.log(res)
}



useEffect(() => {
  getData()
}, [])
 */
export default App

