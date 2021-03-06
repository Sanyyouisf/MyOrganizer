﻿app.controller("singleAddressBookController", ["$scope", "$http", "$routeParams", "$rootScope", "$location", function ($scope,$http,$routeParams, $rootScope, $location) {
   // console.log("$routeParams.Id", $routeParams.singleAddressId);
    $scope.singleAddress = {};
    $scope.editedAddress = {};
    $scope.alerts = [];


    $scope.addAlert = function () {
        $scope.alerts.push({ msg: 'Another alert!' });
        console.log("inside addAlert");
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
        console.log("inside closeAlert");
    };

    var Id = $routeParams.Id;
    //console.log("singleAddress.Id :", $scope.address.Id);
//---------------------------------------------------------------------------------
    //to get the address list 
    //getsingleAddress = (Id) => {
        $http.get(`/api/AddressBooks/${Id}`)
            .then((resultSingleAddress) => {
                $scope.singleAddress = resultSingleAddress.data;
                console.log("inside get single address function");
                //result.data.Id = Id;
                //resolve($scope.singleaddress);
                console.log("you request this address:", $scope.singleAddress);

            })
            .catch((error) => {
                console.log("error in getSingleAddress:", error);
            });
    //};

    //$scope.getsingleAddress(Id);


//------------------------------------------------------------------
        $scope.editSingleAddress = (Id) => {
            console.log("insude editSingleAddress");
            $location.path(`/addressBook/edit/${Id}`);
            console.log("the id to edit :", Id);
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
        $location.path("/addressBook");
    };

    
}
    ]);