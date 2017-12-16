app.controller("singleAddressBookController", ["$scope", "$http", "$routeParams", "$rootScope", "$location", function ($scope,$http,$routeParams, $rootScope, $location) {
   // console.log("$routeParams.Id", $routeParams.singleAddressId);
    var Id = $routeParams.Id;
    //console.log("singleAddress.Id :", $scope.address.Id);
    $http.get(`/api/AddressBooks/${Id}`)
        .then((resultSingleAddress) => {
            $scope.singleAddress = resultSingleAddress.data;
            //result.data.Id = Id;
            //resolve($scope.singleaddress);
            console.log("you request this address:", $scope.singleAddress);

        })
        .catch((error) => {
            console.log("error in getSingleAddress:", error);
        });
}
    ]);