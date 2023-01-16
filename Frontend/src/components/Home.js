import React, { Component } from 'react'
import axios from 'axios'
import QrModal from './QrModal';


export default class Home extends Component {
  
  constructor(props) {
    super(props);
    this.xummMint = this.xummMint.bind(this);
    this.payloadTest = this.payloadTest.bind(this);
    this.checkPayloadStatus = this.checkPayloadStatus.bind(this);
    this.setShowFalse = this.setShowFalse.bind(this);
    this.handleAccountChange = this.handleAccountChange.bind(this);
    this.handleTokenIdChange = this.handleTokenIdChange.bind(this);
    this.retrieveNFTs = this.retrieveNFTs.bind(this);
    this.testIpfs = this.testIpfs.bind(this);
    this.xummBurn = this.xummBurn.bind(this);
    this.hideBurnOptions = this.hideBurnOptions.bind(this);
    this.xummCreateSellOffer = this.xummCreateSellOffer.bind(this);
    this.xummCancelOffer = this.xummCancelOffer.bind(this);
    this.xummAcceptOffer = this.xummAcceptOffer.bind(this);
    this.createTickets = this.createTickets.bind(this);
    this.acctInfo = this.acctInfo.bind(this);
    this.ticketInfo = this.ticketInfo.bind(this);
    this.mintTickets = this.mintTickets.bind(this);

    this.state = {messages: ['Hello, Welcome to xNFT'], xummData: {},showBurnOptions: true, show: true, account: '', tokenID: '' };


  }

  hideBurnOptions = () => {

    this.setState({showBurnOptions: false})

  }

  setShowFalse = () => { 

    this.setState({show: false})

  }

  createTickets = async(e) => {

    

    let body = { 
      metadata: {
        TicketCount: parseInt(this.state.tokenID), 
      }
    }

    const headers = {'body': JSON.stringify(body)}

  
    let response = await axios.get('/api/createTickets', {headers}).then( (data) => { 

      console.log(data)
      this.setState({xummData: data});

    })

  }

  mintTickets = async(e) => {

    

    let body = { 
      metadata: {
        account: this.state.account //
      }
    }

    const headers = {'body': JSON.stringify(body)}

  
    let response = await axios.get('/api/mintTickets', {headers}).then( (data) => { 

      console.log(data)
      this.setState({xummData: data});

    })

  }

  acctInfo = async(e) => {

    

    let body = { 
      metadata: {
        account: this.state.account //
      }
    }

    const headers = {'body': JSON.stringify(body)}

  
    let response = await axios.get('/api/account_info', {headers}).then( (data) => { 

      console.log(data)
      this.setState({xummData: data});

    })

  }

  ticketInfo = async(e) => {

    

    let body = { 
      metadata: {
        account: this.state.account 
      }
    }

    const headers = {'body': JSON.stringify(body)}

  
    let response = await axios.get('/api/ticket_info', {headers}).then( (data) => { 

      console.log(data)
      this.setState({xummData: data});

    })

  }

  xummAcceptOffer = async(e) => {

    

    let body = { 
      metadata: {
        NFTokenSellOffer: this.state.tokenID, //9922E4EB904D71251FC40D475668A475879C0FDE0A1D3BCA366BF1053C7A7826        
      }
    }

    const headers = {'body': JSON.stringify(body)}

  
    let response = await axios.get('/api/xummAcceptOffer', {headers}).then( (data) => { 

      console.log(data)
      this.setState({xummData: data});

    })

  }


  xummBuyOffer = async(e) => {

    

    let body = { 
      metadata: {
        owner: this.state.account, //rfRZeyG8YfSmKPqdX6PVLFJ5bdPCraDAsA
        NFTokenID: this.state.tokenID, //000B00004675FF1C1138F5BFDAC09C53A90EF33E50F390CD12C5DF8F0000000C
        Amount: "5000000"
      }
    }

    const headers = {'body': JSON.stringify(body)}

  
    let response = await axios.get('/api/xummCreateBuyOffer', {headers}).then( (data) => { 

      console.log(data)
      this.setState({xummData: data});

    })

  }

  xummCancelOffer = async(e) => {

    

    let body = { 
      metadata: {
        offerID: this.state.tokenID,
      }
    }

    const headers = {'body': JSON.stringify(body)}

  
    let response = await axios.get('/api/xummCancelOffer', {headers}).then( (data) => { 

      console.log(data)
      this.setState({xummData: data});

    })

  }


  xummCreateSellOffer = async(e) => {


    let body = { 
      metadata: {
        NFTokenID:this.state.tokenID,
        Amount: "5000000"
      }
    }

    const headers = {'body': JSON.stringify(body)}

  
    let response = await axios.get('/api/xummCreateSellOffer', {headers}).then( (data) => { 

      console.log(data)
      this.setState({xummData: data});

    })

  }


  xummMint = async(e) => {


    let body = { 
      metadata: {
        field1: "fieldv2", 
        image: "imagefilev2", 
        hello: "helloworldv2"
      }
    }

    const headers = {'body': JSON.stringify(body)}

  
    let response = await axios.get('/api/xummMint', {headers}).then( (data) => { 
      
      this.setState({xummData: data});

    })
  }


  xummBurn = async(e) => {


    let body = {
      NFTokenID: this.state.tokenID,
    }

    const headers = {'body': JSON.stringify(body)}


    let response = await axios.get('/api/xummBurn', {headers}).then( (data) => { 
     
      this.setState({xummData: data})
      
      
    })
  }

 

    payloadTest()  {

    return <h4>test</h4>

  }

 async checkPayloadStatus(){
  if(this.state.xummData.data){

    let body = {
      uuid: this.state.xummData.data.uuid,
    }

    const headers = {'body': JSON.stringify(body)}
    

    let response = await axios.get('/api/getPayloadInfo', {headers}).then( (data) => { 
      
      console.log(data)
      

    })
   }
  }

  handleTokenIdChange(e) {
    this.setState({tokenID: e.target.value})
  }


  handleAccountChange(e){

    this.setState({account: e.target.value})

  }

  async retrieveNFTs(){
    let body = {
      account: this.state.account,
    }

    const headers = {'body': JSON.stringify(body)}
    

    let response = await axios.get('/api/getTokensFromLedger', {headers}).then( (data) => { 
      
      console.log(data)
      

    })
  }

  async testIpfs(){
    let body = {
      account: this.state.account,
    }

    const headers = {'body': JSON.stringify(body)}
    

    let response = await axios.get('/api/test', {headers}).then( (data) => { 
      
      console.log(data)
      

    })
  }




  render() {
  
    return (
      <div style={{display: "flex", justifyContent: "space-between"}}>
      
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
      <button onClick={this.xummMint} style={{height: "100px", width: "100px"}}>Test Mint xNFT</button>
      <button onClick={this.xummBurn} style={{height: "100px", width: "100px"}}>Test Burn xNFT</button>
       
          <div style={{flexDirection: "row"}}>
          ID Values / Offer ID / Batch Count  <input type="text" onChange={this.handleTokenIdChange} />
          {this.state.tokenID}
          </div>
      
      
      <button onClick={this.xummCreateSellOffer} style={{height: "100px", width: "100px"}}>Test Sell Offer</button>
      <button onClick={this.xummCancelOffer} style={{height: "100px", width: "100px"}}>Test Cancel Offer</button>
      <button onClick={this.xummBuyOffer} style={{height: "100px", width: "100px"}}>Test Buy Offer</button>
      <button onClick={this.xummAcceptOffer} style={{height: "100px", width: "100px"}}>Test Accept Offer</button>
      <button onClick={this.createTickets} style={{height: "100px", width: "100px"}}>Test Create Tickets</button>
      <button onClick={this.acctInfo} style={{height: "100px", width: "100px"}}>Get account Info</button>
      <button onClick={this.ticketInfo} style={{height: "100px", width: "100px"}}>Get ticket Info</button>
      <button onClick={this.mintTickets} style={{height: "100px", width: "100px"}}>Mint Tickets</button>

      
      <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
      <button onClick={this.retrieveNFTs} style={{height: "25px", width: "200px"}}>Retrieve NFT's</button>
      
          <div style={{marginLeft: "50px"}}><h6 style={{margin: "0px", color: "red"}}>r-address account (example: rfRZeyG8YfSmKPqdX6PVLFJ5bdPC)</h6>
          <input  onChange={this.handleAccountChange} type="text" />
          {this.state.account}
          </div>
      </div>
      
      
      </div>


      <div style={{justifyItems: "right", height: "500px", width: "500px"}}>
       
       {this.state.messages.map( (message) => { 

        return <h4>{message}</h4>

       })}

       {this.state.xummData.data ? <QrModal uuid={this.state.xummData.data.uuid} setShowFalse={this.setShowFalse} show={this.state.show} qr_png={this.state.xummData.data.refs.qr_png}/>: <p>No xNFT's to display. <br></br> Please complete a transaction or Lock in your r-address </p>}
       
       
    
      
      </div>
    </div>
    )
  }
}
//<button onClick={this.testIpfs} style={{height: "100px", width: "100px"}}>test button</button>
