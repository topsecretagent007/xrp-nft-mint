import React, { Component } from 'react'
import axios from 'axios'

class QrModal extends Component {

    constructor(props) {
        super(props)

        this.checkStatus = this.checkStatus.bind(this);
        this.state = {timer: 60}

        

    }

    checkStatus = () => {

        this.timer = this.timer - 1;

   
    }

    componentDidMount(){

     

 let interval = setInterval(async () => {
    
   
           
            if(this.state.timer < -1){
                clearInterval(interval);
                this.props.setShowFalse(); 
                 
            }else{

                
                let body = {
                    uuid: this.props.uuid,
                  }
              
                  const headers = {'body': JSON.stringify(body)}

                let response = await axios.get('/api/getPayloadInfo', {headers}).then( (data) => { 
      
                    
                    if(data.data.meta.signed){
                        console.log(data)
                        clearInterval(interval);
                        this.props.setShowFalse(); 
                    }
              
                  })

            
            }

            this.setState({timer: this.state.timer - 1})
            
 }, 1000)
        
        
    }

  render() {

    if (!this.props.show) {
        return null;
      }

    return (
    <div>
        <h4>Please scan with Xumm app to verify transaction.</h4>
        <img src={this.props.qr_png} />
        <h6>{this.state.timer}</h6>
    </div>
    )
  }
}


export default QrModal