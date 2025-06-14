# My Recipe App

A full-stack recipe application that allows users to add, browse, view, and delete their favorite recipes. Built with a modern React frontend using Vite for a blazing-fast development experience. A mock API using JSON Server is used for backend.

## Features

* **Browse Recipes:** Explore a collection of delicious recipes.
* **Add New Recipes:** Easily submit your own recipes with details like title, ingredients, and instructions.
* **View Recipe Details:** Click on any recipe to see its full information.
* **Delete Recipes:** Remove recipes you no longer need.
* **Responsive Design:** Enjoy the app on various screen sizes.

## Technologies Used

### Frontend (React with Vite)

* **React:** A JavaScript library for building user interfaces.
* **Vite:** A next-generation frontend tooling that provides an extremely fast development server and build process.


### Backend (Express.js)

* **Node.js:** JavaScript runtime environment.
* **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
* **CORS:** Middleware to enable Cross-Origin Resource Sharing, allowing your frontend and backend to communicate.
* **Nodemon:** A utility that monitors for any changes in your source and automatically restarts your server. Perfect for development!
* **Concurrently:** A utility to run multiple commands concurrently (e.g., your frontend and backend servers) in a single terminal window.

## Setup and Installation

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

* [Node.js](https://nodejs.org/en/) (which includes npm) - v14 or higher recommended
* [Git](https://git-scm.com/downloads)
* (Optional) Global Packages
For smoother development:
```
npm install -g nodemon      
npm install -g json-server  
```

1) Clone the Repository
First, clone the project repository to your local machine:

```
git clone https://github.com/areesharehmat/recipe-app.git
cd recipe-app

(npm install
npm run dev

cd server
npm install
npm run server)
```

2) Install dependencies:
```
   npm install               # Frontend dependencies
   cd server && npm install  # Backend dependencies 
```

3) Running
```
   npm run dev            #Frontend
   npm run server         #Backend
```

### Available Scripts
| Command | Action |
|---------|--------|
| `npm run dev` | Start frontend + backend (development) |
| `npm run server` | Start mock API server (port 8000) |
| `npm run build` | Create production build |










