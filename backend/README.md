# Recipe API - Backend

This is the backend service for Recipe aapplication, built with **Node.js**, **Express.js** and **Typescript**.

## Features

- RESTful API for managing recipes
- Supports filtering recipes by country and incredients
- CORS enabled for frontend communication

## Installation

### 1. Clone the repository
```sh
git clone https://github.com/avlian-90/recipe-api.git
cd backend
```

### 2. Install dependencies
```sh
npm install
```

### 3. Create and configure .env file
PORT=5000
BASE_URL=https://www.themealdb.com/api/json/v1/1

### 4. Run the server

Development mode
```sh
npm run dev
```

Production mode
```sh
npm start
```

## API Endpoints

- Get all recipes 
GET /api/recipes

- Get a recipe by ID
GET /api/recipes/;id

- Filter recipes by ingredient, country and category
GET /api/recipes?filtername=filter

