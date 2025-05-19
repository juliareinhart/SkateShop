const express = require("express");
const Item = require("../models/item.js");
const authUser = require("../middleware/authUser.js");

const router = express.Router();

// Array of items to seed into the database
const items = [
  // Roller Skates
  {
    brand: "Impala",
    price: 89.95,
    color: "White",
    rating: 4.7,
    picture:
      "https://impalarollerskates.com/cdn/shop/files/ECOMM_WHITE-ICE_PRODUCT-PAGE_1500x.jpg?v=1709684962",
    title: "Impala White Quad Skates",
    quantity: 12,
    typeOfItem: "skates",
    gender: ["feminine", "female", "women", "woman", "wife", "girlfriend"],
    skillLevel: ["beginner", "new", "first time"],
  },
  {
    brand: "Sure-Grip",
    price: 149.99,
    color: "Pink",
    rating: 4.9,
    picture: "https://m.media-amazon.com/images/I/81RxhLSxs1L._AC_SL1500_.jpg",
    title: "Sure-Grip Fame Pink Skates",
    quantity: 7,
    typeOfItem: "skates",
    gender: ["feminine", "female", "women", "woman", "wife", "girlfriend"],
    skillLevel: ["intermediate", "medium", "novice"],
  },
  {
    brand: "Chaya",
    price: 189.95,
    color: "Black",
    rating: 4.6,
    picture:
      "https://legacyskateskc.com/cdn/shop/products/chaya-classic-dance_2_1200x1200.jpg?v=1678394824",
    title: "Chaya Classic Black Skates",
    quantity: 5,
    typeOfItem: "skates",
    gender: ["masculine", "male", "man", "men", "boyfriend", "husband"],
    skillLevel: [
      "advanced",
      "years of experience",
      "competition",
      "compete",
      "years",
      "professional",
      "perform",
    ],
  },
  {
    brand: "Moxi",
    price: 299.99,
    color: "Leopard Print",
    rating: 4.8,
    picture: "https://m.media-amazon.com/images/I/71Z+GuCtsyL._AC_SL1000_.jpg",
    title: "Moxi Leopard Print Skates",
    quantity: 6,
    typeOfItem: "skates",
    gender: ["feminine", "female", "women", "woman", "wife", "girlfriend"],
    skillLevel: [
      "advanced",
      "years of experience",
      "competition",
      "compete",
      "years",
      "professional",
      "perform",
    ],
  },
  {
    brand: "BTFL",
    price: 89.95,
    color: "Mint",
    rating: 4.5,
    picture: "https://m.media-amazon.com/images/I/610h47P8QWL._AC_SL1482_.jpg",
    title: "BTFL Mint Quad Skates",
    quantity: 10,
    typeOfItem: "skates",
    skillLevel: ["beginner", "new", "first time"],
    gender: ["feminine", "female", "women", "woman", "wife", "girlfriend"],
  },
  {
    brand: "Rio Roller",
    price: 94.99,
    color: "Blue",
    rating: 4.4,
    picture:
      "https://static.skatepro.com/product/1800/rio-roller-signature-roller-skates-1n.webp",
    title: "Rio Roller Blue Quad Skates",
    quantity: 8,
    typeOfItem: "skates",
    skillLevel: ["beginner", "new", "first time"],
    gender: ["feminine", "female", "women", "woman", "wife", "girlfriend"],
  },
  {
    brand: "Candi Girl",
    price: 109.99,
    color: "Purple",
    rating: 4.6,
    picture: "https://m.media-amazon.com/images/I/711YtbW6yZL._AC_SL1200_.jpg",
    title: "Candi Girl Purple Skates",
    quantity: 9,
    typeOfItem: "skates",
    gender: ["feminine", "female", "women", "woman", "wife", "girlfriend"],
    skillLevel: ["beginner", "new", "first time"],
  },
  {
    brand: "Riedell",
    price: 199.99,
    color: "Teal",
    rating: 4.8,
    picture: "https://m.media-amazon.com/images/I/81PWm7B8erS._AC_SL1500_.jpg",
    title: "Riedell Teal Quad Skates",
    quantity: 4,
    typeOfItem: "skates",
    gender: ["feminine", "female", "women", "woman", "wife", "girlfriend"],
    skillLevel: [
      "advanced",
      "years of experience",
      "competition",
      "compete",
      "years",
      "professional",
      "perform",
    ],
  },
  {
    brand: "Roller Derby",
    price: 129.95,
    color: "Pink",
    rating: 4.3,
    picture: "https://m.media-amazon.com/images/I/81euuCI29FL._AC_SL1500_.jpg",
    title: "Roller Derby Firestar Skates",
    quantity: 12,
    typeOfItem: "skates",
    gender: ["feminine", "female", "women", "woman", "wife", "girlfriend"],
    skillLevel: [
      "advanced",
      "years of experience",
      "competition",
      "compete",
      "years",
      "professional",
      "perform",
    ],
  },
  {
    brand: "Sure-Grip",
    price: 179.99,
    color: "Black and Red",
    rating: 4.7,
    picture: "https://m.media-amazon.com/images/I/715QAtkKdxL._AC_SL1500_.jpg",
    title: "Sure-Grip Stardust Black and Red Skates",
    quantity: 5,
    typeOfItem: "skates",
    gender: ["masculine", "male", "man", "men", "boyfriend", "husband"],
    skillLevel: [
      "advanced",
      "years of experience",
      "competition",
      "compete",
      "years",
      "professional",
      "perform",
    ],
  },
  {
    brand: "Riedell",
    price: 249.99,
    color: "White",
    rating: 4.9,
    picture: "https://m.media-amazon.com/images/I/61f23-5b+7L._AC_SX679_.jpg",
    title: "Riedell Whiteout Quad Skates",
    quantity: 3,
    typeOfItem: "skates",
    gender: ["feminine", "female", "women", "woman", "wife", "girlfriend"],
    skillLevel: [
      "advanced",
      "years of experience",
      "competition",
      "compete",
      "years",
      "professional",
      "perform",
    ],
  },
  {
    brand: "Chaya",
    price: 199.95,
    color: "Purple",
    rating: 4.7,
    picture:
      "https://img.inlinewarehouse.com/watermark/rs.php?path=CHME18-PU2-1.jpg&nw=1080",
    title: "Chaya Melrose Purple Skates",
    quantity: 7,
    typeOfItem: "skates",
    skillLevel: ["intermediate"],
    gender: ["masculine", "male", "man", "men", "boyfriend", "husband"],
  },
  {
    brand: "Moxi",
    price: 289.95,
    color: "Purple",
    rating: 4.8,
    picture: "https://m.media-amazon.com/images/I/71OH3Rm7XVL._AC_SL1500_.jpg",
    title: "Moxi Lolly Purple Skates",
    quantity: 9,
    typeOfItem: "skates",
    gender: ["feminine", "female", "women", "woman", "wife", "girlfriend"],
    skillLevel: [
      "advanced",
      "years of experience",
      "competition",
      "compete",
      "years",
      "professional",
      "perform",
    ],
  },
  {
    brand: "Rio Roller",
    price: 104.99,
    color: "Black",
    rating: 4.6,
    picture: "https://m.media-amazon.com/images/I/614+ZiToV7L._AC_SL1038_.jpg",
    title: "Rio Roller Black Quad Skates",
    quantity: 6,
    typeOfItem: "skates",
    gender: ["masculine", "male", "man", "men", "boyfriend", "husband"],
    skillLevel: ["beginner", "new", "first time"],
  },
  {
    brand: "Impala",
    price: 94.95,
    color: "Holographic",
    rating: 4.9,
    picture: "https://m.media-amazon.com/images/I/61qU1bC7uJL._AC_SL1200_.jpg",
    title: "Impala Holographic Quad Skates",
    quantity: 10,
    typeOfItem: "skates",
    gender: ["feminine", "female", "women", "woman", "wife", "girlfriend"],
    skillLevel: ["beginner", "new", "first time"],
  },

  // Wheels
  {
    brand: "Radar",
    price: 54.99,
    color: "Purple",
    rating: 4.5,
    picture: "https://m.media-amazon.com/images/I/51a8FP6EUAL._AC_SL1000_.jpg",
    title: "Radar Energy 65mm Wheels",
    quantity: 15,
    typeOfItem: "wheels",
    gender: ["feminine", "female", "women", "woman", "wife", "girlfriend"],
    wheelType: ["indoor"],
  },
  {
    brand: "Sure-Grip",
    price: 44.99,
    color: "Green",
    rating: 4.6,
    picture:
      "https://img.inlinewarehouse.com/watermark/rs.php?path=SGZOM-GN1-1.jpg&nw=1080",
    title: "Sure-Grip Zoom Green Wheels",
    quantity: 20,
    typeOfItem: "wheels",
    gender: ["masculine", "male", "man", "men", "boyfriend", "husband"],
    wheelType: ["indoor"],
  },
  {
    brand: "Moxi",
    price: 69.99,
    color: "Red",
    rating: 4.7,
    picture: "https://m.media-amazon.com/images/I/71ir15dnPoL._AC_SL1500_.jpg",
    title: "Moxi Red Outdoor Wheels",
    quantity: 18,
    typeOfItem: "wheels",
    gender: ["masculine", "male", "man", "men", "boyfriend", "husband"],
    wheelType: ["outdoor"],
  },
  {
    brand: "Atom",
    price: 49.99,
    color: "Blue",
    rating: 4.4,
    picture: "https://m.media-amazon.com/images/I/41WwachoARL._AC_.jpg",
    title: "Atom Pulse Blue Wheels",
    quantity: 12,
    typeOfItem: "wheels",
    gender: ["masculine", "male", "man", "men", "boyfriend", "husband"],
    wheelType: ["outdoor"],
  },
  {
    brand: "Rollerbones",
    price: 59.99,
    color: "Pink",
    rating: 4.8,
    picture: "https://m.media-amazon.com/images/I/81qTRgdvm3L._AC_SL1500_.jpg",
    title: "Rollerbones Pink Wheels",
    quantity: 14,
    typeOfItem: "wheels",
    gender: ["feminine", "female", "women", "woman", "wife", "girlfriend"],
    wheelType: ["outdoor"],
  },
];

// Function to check and insert/update items
const seedDB = () => {
  let promises = [];

  items.forEach((item) => {
    const promise = Item.findOne({ title: item.title })
      .then((existingItem) => {
        // Insert new item if it doesn't exist
        if (!existingItem) {
          return Item.create(item).then(() => {
            console.log(`Inserted: ${item.title}`);
          });
        } else {
          console.log(`Skipped (already exists): ${item.title}`);
        }
      })

      .catch((err) => {
        console.error(`Error processing item ${item.title}:`, err);
      });

    promises.push(promise);
  });

  // Wait for all promises to complete
  Promise.all(promises)
    .then(() => {
      console.log("Seeding process complete.");
      // Do not close the MongoDB connection, it stays open for further use.
    })
    .catch((err) => {
      console.error("Error seeding the database:", err);
    });
};

// Run the seed function
seedDB();

// create the endpoint url's that the client/front-end can call/access to retrieve data on the UI

router.get("/api/items", (req, res) => {
  // Parse `filter` parameter if present
  let filter = {};
  if (req.query.filter) {
    try {
      filter = JSON.parse(req.query.filter);
    } catch (err) {
      return res.status(400).send({ error: "Invalid filter format" });
    }
  }

  if (req.query.minPrice && req.query.maxPrice) {
    filter.price = {
      $lte: parseFloat(req.query.maxPrice),
      $gte: parseFloat(req.query.minPrice),
    };
  }

  // Handle brand filtering (Corrected)
  if (req.query.brand) {
    // Check for 'brand' (singular)
    let brands = req.query.brand;

    if (typeof brands === "string") {
      brands = [brands]; // Convert single brand to array
    } else if (Array.isArray(brands)) {
      // It's already an array, no changes needed.
    } else {
      return res.status(400).send({ error: "Invalid brand format" });
    }
    filter.brand = { $in: brands };
  }

  // Handle brand filtering (Corrected)
  if (req.query.typeOfItem) {
    // Check for 'brand' (singular)
    let typeOfItems = req.query.typeOfItem;

    if (typeof typeOfItems === "string") {
      typeOfItems = [typeOfItems]; // Convert single brand to array
    } else if (Array.isArray(typeOfItems)) {
      // It's already an array, no changes needed.
    } else {
      return res.status(400).send({ error: "Invalid typeOfItems format" });
    }
    filter.typeOfItem = { $in: typeOfItems };
  }

  // Handle brand filtering (Corrected)
  if (req.query.color) {
    // Check for 'brand' (singular)
    let colors = req.query.color;

    if (typeof colors === "string") {
      colors = [colors]; // Convert single brand to array
    } else if (Array.isArray(colors)) {
      // It's already an array, no changes needed.
    } else {
      return res.status(400).send({ error: "Invalid colors format" });
    }
    filter.color = { $in: colors };
  }

  // Handle brand filtering (Corrected)
  if (req.query.rating) {
    // Check for 'brand' (singular)
    let ratings = req.query.rating;

    if (typeof ratings === "string") {
      ratings = [ratings]; // Convert single brand to array
    } else if (Array.isArray(ratings)) {
      // It's already an array, no changes needed.
    } else {
      return res.status(400).send({ error: "Invalid brand format" });
    }
    filter.rating = { $in: ratings };
  }

  // Handle generic JSON filter (for more complex filtering)
  if (req.query.filter) {
    try {
      const parsedFilter = JSON.parse(req.query.filter);
      filter = { ...filter, ...parsedFilter }; // Merge parsed filter with existing filters
    } catch (err) {
      return res.status(400).send({ error: "Invalid filter format" });
    }
  }

  // Run query with filters, sort, limit, and skip options
  Item.find(filter)
    .exec()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

Item.aggregate([
  {
    $group: {
      _id: null,
      minPrice: { $min: "$price" },
      maxPrice: { $max: "$price" },
    },
  },
])
  .then((result) => {
    console.log(result); // Logs the min and max price
  })
  .catch((err) => {
    console.error("Error:", err);
  });

// Fetch distinct brands
Item.aggregate([{ $group: { _id: "$brand" } }])
  .then((result) => {
    console.log(
      "Distinct Brands:",
      result.map((r) => r._id)
    );
  })
  .catch((err) => {
    console.error("Error fetching brands:", err);
  });

// Fetch distinct types
Item.aggregate([{ $group: { _id: "$typeOfItem" } }])
  .then((result) => {
    console.log(
      "Distinct Types:",
      result.map((r) => r._id)
    );
  })
  .catch((err) => {
    console.error("Error fetching types:", err);
  });

// Fetch distinct colors
Item.aggregate([{ $group: { _id: "$color" } }])
  .then((result) => {
    console.log(
      "Distinct Colors:",
      result.map((r) => r._id)
    );
  })
  .catch((err) => {
    console.error("Error fetching colors:", err);
  });

// Example endpoint to get unique brands and colors using Promises
router.get("/api/items/options", (req, res) => {
  // Extract minPrice and maxPrice from query parameters
  const { minPrice, maxPrice } = req.query;

  // Create a filter object based on query parameters
  const filter = {};
  if (minPrice && maxPrice) {
    filter.price = {
      $gte: parseFloat(minPrice), // Greater than or equal to minPrice
      $lte: parseFloat(maxPrice), // Less than or equal to maxPrice
    };
  }
  // Use Promise.all to fetch multiple distinct values concurrently
  Promise.all([
    Item.distinct("brand", filter).exec(), // Fetch unique brands
    Item.distinct("color", filter).exec(), // Fetch unique colors
    Item.distinct("typeOfItem", filter).exec(),
    Item.distinct("rating", filter).exec(),
    // Add more fields as needed
  ])
    .then(([brands, colors, typeOfItems, ratings]) => {
      // Send the results back as JSON
      res.status(200).json({ brands, colors, typeOfItems, ratings });
    })
    .catch((err) => {
      console.error("Error fetching distinct options:", err);
      res.status(500).send(err); // Handle any errors
    });
});

router.get("/api/unique-ratings", (req, res) => {
  Item.aggregate([
    { $project: { rating: { $round: ["$rating", 0] } } }, // Round ratings
    { $group: { _id: "$rating" } }, // Group by rounded rating
    { $sort: { _id: 1 } }, // Sort by rating
  ])
    .then((uniqueRatings) =>
      res.status(200).send(uniqueRatings.map((r) => r._id))
    )
    .catch((err) => res.status(500).send(err));
});

router.get("/api/items/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => {
      if (item) {
        res.status(200).send(item);
      } else {
        res.status(404).send("Item not found!");
      }
    })
    .catch((err) => res.status(400).send(err));
});

// PATCH (Update User)
router.patch("/api/items/:id", (req, res) => {
  Item.findByIdAndUpdate(
    req.params.id, // the id of the item
    req.body, // the object tha tcontains the changes
    {
      new: true, // return the updated object
      runValidators: true, // make sure the updates are validated against the schema
    }
  )
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send("Item not found!");
      }
    })
    .catch((err) => res.status(400).send(err));
});

//leaving for now but don't want to do it this way because we need to validate on the front end to make sure we have no negative quantities and that the purchase is NOT made unlesss quantity in the database is greater than 0
router.patch("/api/items/decrease/:id", (req, res) => {
  const { quantityPurchased } = req.body; // Quantity to decrease

  Item.findById(req.params.id)
    .then((item) => {
      if (item) {
        const newQuantity = item.quantity - quantityPurchased;

        if (newQuantity < 0) {
          return res.status(400).send("Not enough stock available.");
        }

        item.quantity = newQuantity;
        return item.save();
      } else {
        res.status(404).send("Item not found!");
      }
    })
    .then((updatedItem) => res.status(200).send(updatedItem))
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
