const Product = require('./model/DressStore.model');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product' });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,  // The ID of the product to be updated
      req.body,       // The updated product data from the request body
      { new: true, runValidators: true }  // Options to return the updated document and run validation
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
};


// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.deleteOne({ _id: req.params.id });

    if (deletedProduct.deletedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
};


//Delete all products
exports.deleteAllProducts = async (req, res) => {
  try {
    const deleteResult = await Product.deleteMany({});

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ error: 'No products found to delete' });
    }

    res.status(200).json({ message: 'All products deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting all products' });
  }
};



// exports.searchProductsByName = async (req, res) => {
//   try {
//     const searchLetters = req.query.name; // Get the search letters from the query parameter

//     // Create a regular expression pattern to search for products with names containing the specified letters
//     const searchPattern = new RegExp(searchLetters, 'i'); // 'i' for case-insensitive search

//     const matchingProducts = await Product.find({ name: { $regex: searchPattern } });

//     if (matchingProducts.length === 0) {
//       return res.status(404).json({ error: 'No products found with the specified letters' });
//     }

//     res.status(200).json(matchingProducts);
//   } catch (error) {
//     res.status(500).json({ error: 'Error searching for products by name' });
//   }
// };


exports.findProductsBySubstring = async (req, res) => {
  try {
    const searchSubstring = req.query.name; // Get the search substring from the query parameter

    if (!searchSubstring) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    // Create a regular expression pattern to search for products with names containing the specified substring
    const searchPattern = new RegExp(searchSubstring, 'i'); // 'i' for case-insensitive search

    const matchingProducts = await Product.find({ name: { $regex: searchPattern } });

    if (matchingProducts.length === 0) {
      return res.status(404).json({ error: 'No products found with the specified substring' });
    }

    res.status(200).json(matchingProducts);
  } catch (error) {
    res.status(500).json({ error: 'Error searching for products by substring' });
  }
};
