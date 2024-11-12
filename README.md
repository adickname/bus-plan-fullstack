# bus-plan

This template should help get you started developing with Vue 3 in Vite and tell you somethink about technologies used in the project.

## Technologies
Vue.js for creating user interface
Pinia for state management
MongoDB Atlas Database for storing data
Express.js for building API interface
Auth0 for authentication users

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
cd frontend
npm install
cd ..
cd backend
npm install
```

# Setting Up Environment Variables

## Frontend

Inside frontend folder create .env file

### Example

```sh
VITE_SERVER = http://localhost:5173
```

## Backend

### Example

```sh
CLIENT_APP_URL=http://localhost/5173
CLIENT_APP_URL_RENDER= linkToYourApp.onrender.com
MONGO_CONNECT=connectionStringToYourMongoDB
SERVER_PORT=5170
```

### Compile and Hot-Reload for Development Frontend

```sh
cd frontend
npm run dev
```

### Hot-Reload for Development Backend

```sh
npm run dev
```

### Compile and Minify for Production Frontend

```sh
npm run build
```
Unfortunately waiting for response of the first request is very long
