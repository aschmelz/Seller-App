myApp.controller("createItemController", function($scope, $http) {
  $scope.phoneType = [{
    "selection": 1,
    "name": "Cell"
  }, {
    "selection": 2,
    "name": "Home"
  }, {
    "selection": 3,
    "name": "Work"
  }]

  $scope.validPrice = function(num) {
    while (num <= 0) {
      if (num == 0) {
        alert("Please enter a positive price!");
      } else {
        num *= -1;
      }
    }
  }

  // Function to add a new item
  $scope.addItem = function() {
    let newItem = { // from the model
      itemName: $scope.itemName,
      sellerName: $scope.name,
      address: $scope.address, // not added
      phone: { number: $scope.phoneNumber, location: $scope.dropdownMenuButton },// not added
      //phone: $scope.phoneNumber,
      email: $scope.email,
      itemDescription: $scope.itemDescription,
      sellerCity: $scope.city,
      price: $scope.price
    }

    // "AJAX" call for POST request
    $http.post("/api/items", newItem).then(function(result) {
      alert("Successfully created!");
      //$scope.items.push(result.data); // items is things already in mongo
      window.location = "#!/displayItems";
    }).catch(function(error) {
      alert(error.data.message);
    })
  };

});