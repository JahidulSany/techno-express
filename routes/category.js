// create a new router
const router = require("express").Router();

// import the models
const { Category } = require("../models/index");

// Route to add a new post
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding category", error: error });
  }
});

// Route to get all posts
router.get("/", async (req, res) => {
  try {
    console.log("Getting all categories");
    const categories = await Category.findAll();
    console.log(categories);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error adding categories", error: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving category" });
  }
});

// Route to update a category
router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const post = await Category.update(
      { name },
      { where: { id: req.params.id } }
    );
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Error updating category" });
  }
});

// Route to delete a category

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.destroy({
      where: { id: req.params.id },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category" });
  }
});

// export the router
module.exports = router;

