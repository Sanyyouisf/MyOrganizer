app.controller("addressBookController", ["$scope", "$http", "$rootScope", "$location", function ($scope, $http, $rootScope, $location) {
    console.log("inside addressBookController");
    $scope.addressBookList = [];
    $scope.singleAddress = {};
    $scope.alerts = [];
    $scope.newAddress = {};

//-----------------------------------------------------------------------
    //alerts
    $scope.addAlert = function () {
        $scope.alerts.push({ msg: 'Another alert!' });
        console.log("inside addAlert");
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
        console.log("inside closeAlert");
    };

//-----------------------------------------------------------------------
    //to get all the address Book for the user
    $http.get("/api/AddressBooks")
        .then((result) => {
            $scope.addressBookList = result.data;
            console.log(" result.data :", $scope.addressBookList);
        })
        .catch((error) => {
            console.log("error in get AddressList:", error);
        });

//-----------------------------------------------------------------------
    //get one address
    $scope.getSingleAddress = (Id) => {
        $scope.singleAddress.Id = Id;
        console.log("singleAddress.Id :", $scope.singleAddress.Id);
        $http.get(`/api/AddressBooks/${Id}`)
            .then((result) => {
                $scope.singleaddress = result.data;
                console.log("you request this address :", $scope.singleaddress);
                $location.path(`addressbook/${Id}`);
            })
            .catch((error) => {
                console.log("error in getSingleAddress:", error);
            });
    };
//-----------------------------------------------------------------------
    //adding new Address
    $scope.addNewAddress = () => {
        $http.post("/api/AddressBooks/new", JSON.stringify(
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
                $scope.alerts = [];
                $location.path("/addressBook");
            })
            .catch((error) => {
                console.log("error in addNewAddress:", error.data.Message);
                $scope.alerts.push({ msg: error.data.Message });
            });
    };
    
}


]);