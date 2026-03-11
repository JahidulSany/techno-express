🚀 TechnoExpress – Full Stack Blog Platform

TechnoExpress is a full-stack blog management platform built using Node.js, Express, Sequelize, and PostgreSQL/MySQL, with a Bootstrap-powered frontend.

The platform allows users to register, authenticate, create blog posts, edit posts, delete posts, and filter posts by category.

This project demonstrates authentication, RESTful APIs, CRUD operations, and category-based filtering in a modern full-stack application.

✨ Features

✨ Features

🔐 Authentication
• User Registration
• User Login
• User Logout
• Token-based authentication using JWT

📝 Blog Post Management
• Create new blog posts
• Edit existing posts
• Delete posts
• View all blog posts

🏷 Category Filtering
• Filter blog posts by category
• Dynamic frontend filtering
• Backend API filtering with query parameters

📚 Available Categories
• Web Development
• Artificial Intelligence
• Mobile Development
• Gadgets
• Cybersecurity
• Programming Tips

💻 Tech Stack

Frontend
• HTML5
• CSS3
• Bootstrap 5
• Vanilla JavaScript

Backend
• Node.js
• Express.js
• Sequelize ORM
• PostgreSQL / MySQL

Authentication
• JSON Web Token (JWT)

# Installation

```sh
    git clone https://github.com/JahidulSany/techno-express.git
	cd techno-express
```

2. Install Backend Dependencies
```sh
	npm install
```

3. Configure Database

Create a PostgreSQL or MySQL database and configure your environment variables.
Example .env configuration:

```sh
	JWT_SECRET=yoursecretkey

	DB_DATABASE=blogs_db
	DB_USERNAME=root
	DB_PASSWORD=yourpassword
	DB_HOST=localhost
	DB_DIALECT=mysql
	DB_PORT=3306
```

4. Run the Backend Server
Open the frontend folder and run the application using Live Server or open:

```sh
    public/index.html
```

📡 API Endpoints

👤 User Authentication

Register User

```sh
    POST /api/users
```

Login User

```sh
    POST /api/users/login
```

Logout User

```sh
    POST /api/users/logout
```

📝 Blog Posts

Get All Posts

```sh
    GET /api/posts
```

Get single Post

```sh
    POST /api/posts/:id
```

Get Posts by Category

```sh
    GET /api/posts?categoryId=2
```

Create Post

```sh
    POST /api/posts
```

Update Post

```sh
    PUT /api/posts/:id
```

Delete Post

```sh
    Delete /api/posts/:id
```

👨‍💻 Author

Jahidul Sany
Full Stack Developer based in England, UK

📧 Email: jahidulsanypro@gmail.com

Feel free to connect if you’d like to collaborate or discuss opportunities.

⸻

⭐ If you like this project, consider giving it a star on GitHub!
