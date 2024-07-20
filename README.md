# Blog Website
A simple blog website built using Node.js, Express, and MongoDB. This project allows users to create, and read blog posts. Users can also register, log in, and manage their posts.

## Features

- User authentication (register, login, logout)
- Create and read blog posts
- View all posts
- View individual post details

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v12.x or later)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/tanvichn/Blog-website.git
    cd Blog-website
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables:
    Create a `.env` file in the root directory with the following contents:
    ```
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/<collection name>
    SESSION_SECRET=your_secret_key
    ```
4. Start the application:
    ```bash
    npm start
    ```
5. Open your browser and visit `http://localhost:3000`

## Usage

### Register a User
1. Navigate to the `/register` page.
2. Fill in the registration form and submit it.

### Login
1. Navigate to the `/login` page.
2. Enter your credentials and submit.

### Create a Post
1. After logging in, navigate to the `/posts/new` page.
2. Fill in the form and submit it to create a new post.

### View Posts
- Navigate to the `/posts` page to see all posts.
- Click on a post title to view the post details.
  
## Technologies

- Node.js
- Express
- MongoDB (Mongoose)
- EJS (Templating Engine)
- Passport.js (Authentication)
- Express-Session
- Body-Parser

