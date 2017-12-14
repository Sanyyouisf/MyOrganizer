app.controller("addressBookController", ["$scope", "$http", "$rootScope", function ($scope, $http, $rootScope) {
    console.log("inside addressBookController");

    //to get all the address Book for the user
    //$http.get("/api/AddressBooks")
    //    .then((result) => {
    //        $scope.addressBookList = result.data;
    //        console.log(" result.data :", result.data);
    //    })
    //    .catch((error) => {
    //        Console.log("error in address book controller :", error);
    //    });

    $scope.newAddress = {};

    //adding new Address
    $scope.addNewAddress = () => {
        $http.post("/api/AddressBooks", JSON.stringify(
            {
                FirstName: $scope.newAddress.FirstName,
                LastName: $scope.newAddress.LastName,
                Tel: $scope.newAddress.Tel,
                Email: $scope.newAddress.Email,
                Street: $scope.newAddress.Street,
                City: $scope.newAddress.City,
                State: $scope.newAddress.State,
                Zipcode: $scope.newAddress.Zipcode,
                Relationship: $scope.newAddress.Relationship
            }))
            .then((result) => {
                console.log("result in addNewAddress :", result.data);
            })
            .catch((error) => {
                console.log("error in addNewAddress:", error);
            });
    };
    
}


]);