This is a MERN stack (MongoDB, Express.js, React.js, Node.js) application designed for secure file uploads and sharing. 
The app incorporates JWT authentication for user sessions and provides seamless user experiences for file handling and account management. 

Features

1. Authentication:

      1.1 Register: Allows new users to create an account.

      1.2 Sign In: Authenticate users with their email and password.

      1.3 JWT Authentication: Securely manage user sessions using JSON Web Tokens.

      1.4 Logout: Safely terminate user sessions.

2. File Management:

        2.1 File Upload: Users can upload files to the server securely.

        2.2 File Sharing: Share uploaded files with others through shareable IDs.


Tech Stack

Frontend:

React.js: For building an interactive user interface.

React Router: For client-side routing and navigation.

Axios: For making HTTP requests to the backend.

Backend:

Node.js: For handling server-side logic.

Express.js: For building RESTful APIs.

JWT (jsonwebtoken): For authentication and session management.

Multer: For handling file uploads.

Database:

MongoDB: For storing user data and metadata about uploaded files.

Other Tools and Libraries:

bcrypt.js: For hashing and securing user passwords.

cors: For enabling cross-origin resource sharing.

Local Storage: For storing uploaded files.
