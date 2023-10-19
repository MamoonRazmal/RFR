
import Layout from '../../components/layout/Layout'
import { useState } from 'react'
import{toast} from 'react-toastify'
const Register = () => {
  const[name,setName]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[phone,setPhone]=useState("")
  const[address,setAddress]=useState("")
  const handlesubmit=(e)=>{e.preventDefault()
    console.log(name,email,password,phone,address)
    toast.success('Register Successful')
  }
  return (
    <Layout title={"Register -RFR"}>
     <div className="register"> <h1>Register Page</h1> 
     <form onSubmit={handlesubmit}>
  <div className="mb-3">
    
    <input type="text" className="form-control" id="exampleInputName" placeholder='Name' value={name}  onChange={(e)=>setName(e.target.value)} required/>
   
  </div>
  <div className="mb-3">
  
    <input type="email" className="form-control" id="exampleInputName" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
   
  </div>
  <div className="mb-3">
    
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
  </div>
  <div className="mb-3">
   
    <input type="text" className="form-control" id="exampleInputName" placeholder='Phone'value={phone} onChange={(e)=>setPhone(e.target.value)} required />
   
  </div>
  <div className="mb-3">
   
    <input type="text" className="form-control" id="exampleInputName" placeholder='Address'value={address} onChange={(e)=>setAddress(e.target.value)} required />
   
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>


     
     </div>
    </Layout>
  )
}

export default Register
