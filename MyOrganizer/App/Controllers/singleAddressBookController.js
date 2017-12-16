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

//------------------------------------------------------
    //to edit address
    $scope.editSingleAddress = (Id) => {
        $location.path(`addressbook/${Id}`);
        console.log("the Id", Id);
    };

//-------------------------------------------------------------------
    //to delete the address
    $scope.deleteSingleAddress = (Id) => {
        $http.delete(`api/AddressBooks/${Id}`)
            .then((deletedSingleAddress) => {
                console.log("result of delete :", deletedSingleAddress);
                console.log("you have deleted the user :", deletedSingleAddress.data.FirstName);
                $location.path("/addressBook");
            })
            .catch((error) => {
                console.log("error in deleteSingleAddress:", error);
            })
        $location.path("addressBook");
    };

    
}
    ]);