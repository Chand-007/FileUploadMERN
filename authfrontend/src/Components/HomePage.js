import FileUpload from "./FileUpload"
import '../Styles/HomePage.css'
export default function HomePage(){
    return(
        <div className="homepageContainer">
            <h1>Welcome to Home Page</h1>
            <FileUpload/>
        </div>
        
    )
}