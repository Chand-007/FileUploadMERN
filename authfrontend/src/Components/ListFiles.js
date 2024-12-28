import axios from "axios"
import {useState} from 'react'
import '../Styles/ListFiles.css'
export default function ListFiles(){
    const [filesData,setFilesData]=useState([])
    const [otherFiles,setOtherFiles] = useState([]) 

    async function handleClick(){
        const response = await axios.get("http://localhost:5000/api/auth/getfiles",{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        setFilesData(response.data)
    }

    async function handleDelete(obj){
        const response = await axios.delete(`http://localhost:5000/api/auth/deletefile/${obj._id}`,{
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        handleClick()
        console.log(response)
    }

    async function handleDownload(obj){
         await axios.get(`http://localhost:5000/api/auth/download/${obj._id}`,{
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            responseType:'blob'
        })
        .then((response)=>{
            console.log(response)
            const url = URL.createObjectURL(response.data)
            const a = document.createElement("a")
            a.href = url
            a.download = 'downloadedFile'
            document.body.appendChild(a)
            a.click();
        })
        .catch((error)=>{
            console.log("Error downloading the file",error)
        })
    }

    async function handleOthersFiles(){
        const response = await axios.get("http://localhost:5000/api/auth/getAllOtherFiles",{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        setOtherFiles(response.data)
    }
    return(
        <div className="listfilesContainer">
            <h1>List Files for user</h1>
            <button onClick={handleClick}>Fetch My Files</button>
            <h1>My Files List</h1>
            {filesData.map((obj)=>{
                return(
                    <div>
                        <h4>{obj.originalName} ---  {obj.fileType} --- <button onClick={()=>{handleDelete(obj)}}>Delete</button> ---
                        <button onClick={()=>{handleDownload(obj)}}>Download File</button>
                        </h4>
                        
                    </div>
                )
            })}
            <h1>Other Users File List</h1>
            <button onClick={handleOthersFiles}>Fetch Other Files</button>
            {otherFiles.map((obj)=>{
                return(
                    <div>
                        <h4>{obj.originalName} ---  {obj.fileType} ---
                        <button onClick={()=>{handleDownload(obj)}}>Download File</button>
                        </h4>
                        
                    </div>
                )
            })}

        </div>
    )
}