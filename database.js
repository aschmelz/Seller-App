const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.exports = mongoose.connect(
  "mongodb+srv://CS157:cs157@cs157.f4aug.mongodb.net/SellItem?retryWrites=true&w=majority",
  // connection string (Mongodb --> atlas --> connect --> connect your app)
  {
    // Connection operations
    useNewUrlParser: true,
    useUnifiedTopology:true
  },
  function(err) {
    if(!err) {
      console.log("Connected to MongoDB! <^_^>");
    } else {
      console.log("Not connected to MongoDB!");
    }
  }
)