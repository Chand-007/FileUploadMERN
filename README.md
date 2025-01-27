# File Sharing Application

This is a file sharing application that allows users to sign up, log in, upload files, and share those files with other users. It provides a simple and secure way to manage and share your files online.

## Features

- **Account Signup**: Create a new user account.
- **Sign In**: Log into the application with your credentials.
- **Sign Out**: Securely sign out of your account.
- **File Upload**: Upload files to your account.
- **File Sharing**: Share uploaded files with other registered users.

## Technologies Used

- **Backend**: Nodejs, ExpressJS
- **Frontend**: ReactJS
- **Database**: MongoDB
- **File Storage**: Multer
- **Authentication**: JWT

## Getting Started

To get a local copy of the project, follow these simple steps:

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (if using Node.js)
- [npm](https://www.npmjs.com/) (or [yarn](https://yarnpkg.com/) if preferred)
- A code editor (e.g., [VS Code](https://code.visualstudio.com/))
- React Installed in system
- MongoDB database listening on port 27017

### Installation

1. Clone the repository:
   git clone https://github.com/Chand-007/FileUploadMERN.git
2. Add From mail in MailConfig.js file in authbackend folder
3. Add your JWT secret key in authController.js and create a .env file in authbackend folder with JWT_SECRET_KEY
4. RUN npm start in authfrontend folder
5. Spinup mongoDB Database
6. RUN node server.js in authbackend folder
