# TechnoExpress - Full stack blog platform

A full-stack Blog Post Management System built using Node.js, Express, Sequelize, and MySQL with a Bootstrap-based frontend.
The application allows users to register, login, create posts, edit posts, delete posts, and filter posts by category.

This project demonstrates authentication, REST APIs, CRUD operations, and category-based filtering.

Github Repo: https://github.com/JahidulSany/techno-express
Live Link: https://techno-express.onrender.com


# 💥 Features

⦿ Authentication
	•	User Registration
	•	User Login
	•	User Logout
	•	Token-based authentication using JWT

⦿ Blog Post Management
	•	Create new blog posts
	•	Edit existing posts
	•	Delete posts
	•	View all blog posts

⦿ Category Filtering
	•	Filter blog posts by category
	•	Dynamic frontend filtering
	•	Backend API filtering with query parameters

⦿ Categories Included
	•	Web Development
	•	Artificial Intelligence
	•	Mobile Development
	•	Gadgets
	•	Cybersecurity
	•	Programming Tips

# 💻 Tech Stack

⦿ Frontend
	•	HTML5
	•	CSS3
	•	Bootstrap 5
	•	Vanilla JavaScript

⦿ Backend
	•	Node.js
	•	Express.js
	•	Sequelize ORM
	•	MySQL

⦿ Authentication
	•	JSON Web Token (JWT)

# Installation

1. Clone the Repository

```sh
    git clone https://github.com/JahidulSany/techno-express.git

    cd techno-express  

```

2. Install Backend Dependencies

```sh
    npm install
```

3. Configure Database

Create a MySQL database and update your database configuration.

Example Configurations:

```sh
    DB_NAME=blogs_db
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_HOST=localhost
```

4. Run the Backend Server

```sh
npm start
```
5. Server will run on

```sh
    http://localhost:3001
```

5. Run the Frontend

Open the frontend folder and run the application using Live Server or open:
```sh
    index.html
```


# 🚩 API Endpoints

⦿ User Authentication

=> Register User

```sh
    POST /api/users
```

=> Login User

```sh
    POST /api/users/login
```

=> Logout User

```sh
    POST /api/users/logout

```

🛠️ Tech Blog Posts

=> Get All Posts
```sh
    GET /api/posts
```

=> Get a single Post
```sh
    POGETST /api/posts/:id
```

=> Get Posts by Category
```sh
    GET /api/posts?categoryId=2
```

=> Create Post
```sh
    POST /api/posts
```

=> Update Post
```sh
    PUT /api/posts/:id
```

=> Delete Post
```sh
    Delete /api/posts/:id
```

✍️ Author

Developed by Jahidul Sany, A full stack developer based in the UK, England.

⸻

📇 Contact:

Feel free to reach out if you’d like to connect or work together! 📧 Email: jahidulsanypro@gmail.com

👏 Thanks for checking out! I hope it gives you a strong sense of my skills and capabilities.