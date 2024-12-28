import { logout } from "../Services/authService"
export default function Logout(){
    localStorage.removeItem("token")
    const logvar = logout()
    return(
        <h1>Logged Out of service</h1>
    )
}