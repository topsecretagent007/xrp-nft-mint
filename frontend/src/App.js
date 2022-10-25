import React, {useEffect, useState} from 'react'
import axios from 'axios'



const App = () => {

const [account, setAccount] = useState("")

const handleChange = (event) => {


  setAccount(event.target.name)

}



const getData = async() => {
  const res = await axios.get('/api/burnAllNFT')
  setAccount(res.data)
  console.log(res)
}



useEffect(() => {
  getData()
}, [])




  return (
<div>

<div style={{color: "white"}}>
| Find An Event | <br></br>
| Collect Event NFT | <br></br>
| How to mint an Event NFT | <br></br> 
</div>
<div class="login-box">
  <h2>Event Token Generator</h2>
  <form>
    <div class="user-box">
      <input type="text" name="" required="" />
      <label>Account Number</label>
    </div>
    <div class="user-box">
      <input type="text" name="" required="" />
      <label>Secret </label>
    </div>
    <div class="user-box">
      <input type="number" name="" required="" />
      <label>Flag Value </label>
    </div>
    <div class="user-box">
      <input type="number" name="" required="" value="0" />
      <label># of Attendees </label>
    </div>
    <div class="user-box">
      <input type="text" name="" required="" />
      <label>Image URI </label>
    </div>
    <a href="#">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Submit
    </a>
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

