import {Link} from 'react-router-dom'
import '../Styles/EntryPoint.css'
export default function EntryPoint(){
    return(
        <div className='entrypointContainer'>
            <h2>File Upload and Sharing Application</h2>
            <div className='indeximage'>
                <img src='https://static.cognitoforms.com/website/file-uploads.0aa25a3cda54328af211f84fe6e5bf59.png' alt="Display Entry Pic"/>
            </div>

            <div className='buttonContainer'>

            <Link to='/register'className='Link'>Register</Link>
            <Link to='/login' className='Link'>Login</Link>

            </div>

        </div>
    )
}