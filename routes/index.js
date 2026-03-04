const router = require("express").Router();

// create a default route for /api
router.get("/api", (req, res) => {
  res.json({ message: "Welcome to the API" });
});




module.exports = router;