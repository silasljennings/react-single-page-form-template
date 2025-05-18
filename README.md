# Single Page Form Template

This repository is designed to produce a variety of forms for web applications utilizing **ShadCN UI components**, **React**, and **Vite**. It integrates with a **Firestore backend** and supports multiple environments, including **production**, **test**, and **local emulation**.

## Project Structure

- **Server**: The backend server is built with **Express** and is responsible for handling form submissions and saving data to **Firestore**. It supports both production and local environments using **Firebase Emulator**.
- **Client**: The frontend is built with **React** and **Vite** and utilizes **ShadCN UI components** for dynamic form creation and validation.
- **Proxy**: **Vite** is used to proxy API requests to the backend server in development.

## Features

- **ShadCN UI Components** for form creation.
- **React Hook Form** for form handling and validation.
- **Zod** for schema validation.
- **Firebase Firestore** as a backend with support for multiple environments (local, test, production).
- **Vite** for fast development and production builds.
- **Cross-platform development** with support for local Firebase emulator and cloud Firebase.

## Environment Setup

### 1. Clone the Repository

```
git clone https://github.com/yourusername/single-page-form.git
cd single-page-form
```

2. Install Dependencies
Run the following commands in both the client and server directories to install dependencies:
```
# Install dependencies for the client (React/Vite)
npm install

# Install dependencies for the server (Express/Firebase Admin SDK)
cd server
npm install
```

3. Set Up Environment Variables
Create an .env.local for development and .env for production in the server directory.

Example .env.local for local development:
```
PORT=5175
COLLECTION_PATH=form_submissions
ALLOWED_ORIGIN=http://localhost:5174
```

Example .env for test:
```
PORT=5175
COLLECTION_PATH=your-collection-path-name
ALLOWED_ORIGIN=https://your-test-client-url.com
```

4. Firebase Configuration
Make sure to configure Firebase and download your service account key for test (and production environment if needed).


For local development, Firebase will use the Application Default Credentials. To get these run the following commands:
```
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
gcloud auth application-default login
```

5. Running the Firebase Emulator (For Development)
If you're running the Firebase Emulator locally, use the following command to start it:
```
firebase emulators:start
# note: install firebase-tools package if haven't already
```

This will setup your firebase emulator environment based off the active firebase project. You can find the configuration for the emulators in the firebase.json file.

6. Starting the Application
To start the client and server in development mode:

Client (React/Vite):

```
npm start
```

Server (Express):

```
cd server
npm start
```
This will start the server on http://localhost:8081 and the frontend on http://localhost:5174.


To start in test mode you just need to copy your test account service account key to the test-service-account-key.json file in ./server/service-account-key dir and then start the server with:
```
cd server
npm run start:test
```
It is important to note that the backend service is only available to the client if it is correctly set by the client .env and .env.local var VITE_API_URL. This is used by the vite.config.ts file to proxy any request from the client to the server. for the .env.local, it should match the local endpoint that the server is running. For the .env file, you can set it to a named server instance.

The commands to specify the local and test builds are the same as the local and test commands used for the server build 
```
npm start # local build
npm run start:test # test build
```


