app.controller("addressBookController", ["$scope", "$http","$rootScope", function ($scope, $http,$rootScope) {
    $http.get("/api/AddressBooks")
        .then((result) => {
            $scope.addressBookItems = result.data;
            console.log(" result.data :", result.data);
        })
        .catch((error) => {
            Console.log("error in address book controller :", error);
        });
    }
]);