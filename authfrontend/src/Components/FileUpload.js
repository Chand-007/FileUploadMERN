import {useState} from 'react'
import axios from "axios"
import {Link} from 'react-router-dom'
import '../Styles/FileUpload.css'


export default function FileUpload(){

    const [file,setFile] = useState()
    const [fileMetadata,setFileMetaData]=useState()



    async function handleSubmit(e){
        e.preventDefault()

        if(!file){
            console.log("File is not present")
                return 
        }

        if(!localStorage.getItem("token")){
            console.log("Toke Not FOund Please Login and Try Uploading")
        }

        const formData = new FormData()
        console.log("Uploading file",file)
        formData.append("file",file)
        try{
            const response = await axios.post("http://localhost:5000/api/auth/fileupload",formData,{
                headers:{
                    "Content-Type":"multipart/form-data",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            alert("File Uploaded Successfully:",response.data)
            setFileMetaData(response.data.fileMetadata)
            setFile()
        }
        catch(error){
            alert("File Upload Failed")
            alert("Error File Upload",error)
        }
        

    }

    return(
        <div className='file-upload-container'>
            <form className="uploadForm" onSubmit={handleSubmit}>
            <label htmlFor='upload'>Upload A File</label>
            <input type='file' name='upload' id='upload' onChange={(e)=>setFile(e.target.files[0])}/>
            <button type='submit'>submit</button>
            </form>

            {fileMetadata && (
          <div className="file-metadata-container">
          <h3>File Metadata:</h3>
          <table className="file-metadata-table">
            <tbody>
        <tr>
          <td><strong>Original Name:</strong></td>
          <td>{fileMetadata.originalName}</td>
        </tr>
        <tr>
          <td><strong>Size:</strong></td>
          <td>{fileMetadata.fileSize} bytes</td>
        </tr>
        <tr>
          <td><strong>Type:</strong></td>
          <td>{fileMetadata.fileType}</td>
        </tr>
        <tr>
          <td><strong>Uploaded At:</strong></td>
          <td>{new Date(fileMetadata.uploadDate).toLocaleString()}</td>
        </tr>
        <tr>
          <td><strong>File Path:</strong></td>
          <td>{fileMetadata.filePath}</td>
        </tr>
      </tbody>
    </table>
         </div>
          )}

      <p>Wanted to see all files uploaded by You. !OKAY I understand see over here</p>

      <Link className="navlink" to="/listfiles">List Files Now</Link>
      <Link className="navlink" to = "/logout">Logout</Link>
        </div>
        
    )
}