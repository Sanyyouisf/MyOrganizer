app.controller("editAddressBookController", ["$scope", "$http", "$routeParams", "$rootScope", "$location", function ($scope, $http, $routeParams, $rootScope, $location) {
    //$scope.editedAddress = {};
    $scope.singleAddress = {};
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

    //to edit address
    $scope.editSingleAddress = () => {
        console.log("inside editSingleAddress");
        //$location.path(`/addressBook/edit/${Id}`);
        console.log("the Id you selected to edit is:", Id);
        //$scope.editedAddress.User_Id = $rootScope.UserName.Id,
        $http.put(`/api/AddressBooks/${Id}`, JSON.stringify({
            //User_Id: $rootScope.UserName.Id,
            FirstName: $scope.singleAddress.FirstName,
            LastName: $scope.singleAddress.LastName,
            Tel: $scope.singleAddress.Tel,
            Email: $scope.singleAddress.Email,
            Street: $scope.singleAddress.Street,
            City: $scope.singleAddress.City,
            State: $scope.singleAddress.State,
            Zipcode: $scope.singleAddress.Zipcode,
            RelationShip: $scope.singleAddress.RelationShip,
            Id: Id
        }))
            .then((result) => {
                console.log("result in editSingleAddress:", result);
                //$scope.getsingleAddress();
                $location.path("/addressBook");
                $scope.alerts = [];
            })
            .catch((error) => {
                console.log("error in editSingleAddress:", error);
                //$scope.alerts.push({ msg: error.data.Message });
            })
    };






}]);