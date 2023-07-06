
# DocuShare

**DocuShare** is a web application that provides user signup and authentication, file upload and storage, a dashboard to view uploaded files, file sharing functionality, and commenting features.
## Demo

A live demo of the application can be accessed at https://pdf-manager-eight.vercel.app/.

<img width="1429" alt="Screenshot 2023-07-06 at 10 20 15 AM" src="https://github.com/Nicky-09/pdf_manager/assets/52557829/8d213dbb-38a4-4396-a10c-bcd39400efb4">


## Setting Up the Client

The client side of the application is built using React. To set up the client, follow these steps:

1. Clone the repository.
2. Navigate to the client directory: `cd client`.
3. Install the necessary dependencies using `npm install`.
4. Start the development server using `npm start`.
5. Access the application in your web browser at `http://localhost:3000`.

## Setting Up the Server

The server side of the application is built using Node.js and Express. To set up the server, follow these steps:

1. Clone the repository.
2. Navigate to the server directory: `cd server`.
3. Install the necessary dependencies using `npm install`.
4. Set up the MongoDB database and provide the connection details in the server's configuration.
5. Configure Firebase for file storage and update the necessary configuration details in the server's code.
6. Start the server using `npm start`.
7. The server will run on `http://localhost:5000`.


## Features

### User Signup and Authentication

- Users can create an account by providing their name, email address, and password.
- Authentication mechanisms are implemented to ensure secure access to the application.

### File Upload

- Authenticated users can upload PDF files to the system.
- The application validates the uploaded files to ensure they are in PDF format.

### Dashboard

- Users can view a list of uploaded files that they have access to.
- Clicking on a file in the list will open the specific PDF file for viewing.

### File Sharing

- Users can share PDF files with other authenticated users.

### Commenting

- Authenticated users can add comments to files.
- Authenticated users can view comments added by others.

## Technologies Used

- React: JavaScript library for building the user interface.
- Node.js: JavaScript runtime for server-side application logic.
- Express: Web application framework for Node.js.
- MongoDB: NoSQL database for storing user and file metadata.
- Multer: Node.js middleware for handling file uploads.
- Firebase: Cloud storage service for securely storing uploaded PDF files.

## Usage

1. Create a new account by providing your name, email address, and password.
2. Log in using your credentials.
3. Upload PDF files by selecting the file and clicking the upload button.
4. View the list of uploaded files in the dashboard and click on a file to view it.
5. Share files by generating unique links and sharing them with other authenticated users.
6. Add comments to files and view comments added by others.
