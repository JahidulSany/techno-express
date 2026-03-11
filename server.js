// Import required packages
const express = require('express');
const path = require('path');

const sequelize = require('./config/connection');
const routes = require('./routes');

// Initialize Express application
const app = express();

// Middlewares to parse incoming JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3001;

// has the --rebuild parameter been passed as a command line param?
const rebuild = process.argv[2] === '--rebuild';

// Middleware to serve static files from the "Public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle GET request at the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Add routes
app.use(routes);

// Sync database
sequelize
  .sync({ force: rebuild })
  .then(() => {
    app.listen(PORT, () => console.log(`Now listening at port: ${PORT}`));
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });
