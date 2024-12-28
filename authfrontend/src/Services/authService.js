import axios from "axios"

const API_URL = "http://localhost:5000/api/auth/"

export const register = async (userData) =>{
    const response = await axios.post(API_URL+"register",userData)
    return response.data
}

export const login = async (userData)=>{
    const response = await axios.post(API_URL+"login",userData)
    return response.data
}

export const authenticate = async (token) =>{
    const response = await axios.get(API_URL+"authenticated",{
        headers:{Authorization: `Bearer ${token}`}
    })
    return response.data
}

export const logout = async ()=>{
    const response = await axios.get(API_URL+"logout");
    return response.data
}