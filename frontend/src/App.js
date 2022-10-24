import React, {useEffect, useState} from 'react'
import axios from 'axios'

const App = () => {
  const [users, setUsers] = useState([])
  const getData = async() => {
    const res = await axios.get('/api/mintNFT')
    setUsers(res.data)
    console.log(res)
  }

  useEffect(() => {
    getData()
  }, [])
 
  return (
    <div>
      <h1>Hello</h1>
    </div>
  )
}
// {users.map(u => <h4 key={u._id}>userName : {u.userName}</h4>)}
export default App

