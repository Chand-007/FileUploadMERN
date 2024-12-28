import {register} from '../Services/authService'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import '../Styles/Register.css'

export default function Register(){
    const [formData,setFormData] = useState({
        username:"",
        email:"",
        password:"",
        role:""
    })

    const handleChange = (e)=>{
        const {name,value} = e.target
        setFormData((prev)=>({...prev,[name]:value}))
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            await register(formData)
            alert("User registered Successfully")
        }
        catch(error){
            console.error(error)
            alert("Error registering the user")
        }
    }

    return(
        <div className='registerContainer'>
            <h2>Register Page</h2>
              <form onSubmit={handleSubmit}>
               <input type='text' name='username' value={formData.username} onChange={handleChange} placeholder='Username'/>
               <input type='email' name="email" value={formData.email} onChange={handleChange} placeholder='Email'/>
                <input type='password' name='password' value={formData.password} onChange={handleChange} placeholder='Password'/>
                <input type='text' name='role' value={formData.role} onChange={handleChange} placeholder="Admin,User,Guest"/>
               <button type='submit'>Register</button>
            </form>
          <Link className="Link" to='/login'>Login</Link>
        </div>
        
    )
}