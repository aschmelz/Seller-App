const mongoose = require("mongoose");

// Create and define schema
const itemSchema = new mongoose.Schema ({
  itemName: { type: String, required: true },
  sellerName: { type: String, required: true },
  address: { type: String, required: false },
  phone: {
    location: { type: String, required: false },//, enum: ["home", "cell", "work"] },
    number: { type: String, required: false, match: /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/ } // phone requirements from regexlib
    // (111) 222-3333 | 1112223333 | 111-222-3333 -- OK
    // 11122223333 | 11112223333 | 11122233333 -- NOT OK
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true, // cannot have duplicate emails
      collation: { locale: "en", strength: 2 } // lvl 2 for non-case sensitive
    },
    match: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    // password's requirements from regexlib
    // asmith@mactec.com | foo12@foo.edu | bob.smith@foo.tv -- OK
    // joe | @foo.com | a@a -- NOT OK
  },
  itemDescription: {
    type: String,
    required: true
  },
  sellerCity: {
      type: String,
      required: true
  },
  price: {
    type: Number,
    required: true
  }
})

// Create the model
module.exports = mongoose.model("Sell Item", itemSchema); // (collection name, schema)