const express = require("express");
const NewItem = require("../models/newItem.js"); // import from models folder so we can use the NewItem object [../ is to move out of the current folder])
const router = express.Router(); // to use the app. functions (now instead of app.post it's Router.post)

// CRUD Operations
// Post --> Create
router.post("/", (req, res) => {
  let newItem = new NewItem(req.body);
  newItem.save(function(err, result) {
    if(!err) {
      res.status(200).send(result);
    } else {
      res.status(400).send(err);
    }
  })
});

// Get --> Read Items (All)
router.get("/", (req, res) => {
  NewItem.find().exec(function(err, result) {
    if(!err) {
      res.status(200).send(result);
    } else {
      res.staus(400).send(err);
    }
  })
});

// Filtering capabilities
router.get("/search", (req, res) => {
  if (req.query.filter) {
    req.query.filter = JSON.parse(req.query.filter);
  }

  if (req.query.select) {
    req.query.select = JSON.parse(req.query.select);
  }

  if (req.query.sort) {
    req.query.sort = JSON.parse(req.query.sort);
  }
  var skip;
  if (req.query.skip) {
    skip = parseInt(req.query.skip);
  }

  var limit;
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }
  
  NewItem.find(req.query.filter)
    .select(req.query.select)
    .sort(req.query.sort)
    .skip(skip)
    .limit(limit)

    .exec(function(err, result) {
      if (!err) {
        res.status(200).send(result);
      } else {
        res.status(400).send(err);
      }
    });
})

// Get --> Read Items (Individual)
router.get("/:id", (req, res) => {
  NewItem.findById(req.params.id, function(err, result) {
    if(!err) {
      res.status(200).send(result);
    } else {
      res.status(400).send(err);
    }
  })
}); // the id is the one in mongodb not the index

// Put --> Update
router.put("/:id", (req, res) => {
  NewItem.findByIdAndUpdate(
    req.params.id, // id of the document
    req.body, // object that contains the changes
    {
      new: true, // return updated object
      runValidators: true // make sure the updates are valid
    },
    function(err, result) {
      if(!err) {
        res.status(200).send(result);
      } else {
        res.status(400).send(err);
      }
    }
  )
});

// Delete --> Delete
router.delete("/:id", (req, res) => {
  NewItem.findByIdAndDelete(req.params.id, function(err, result) {
    if(!err) {
      res.status(200).send(result);
    } else {
      res.status(400).send(err);
    }
  })
});

module.exports = router;