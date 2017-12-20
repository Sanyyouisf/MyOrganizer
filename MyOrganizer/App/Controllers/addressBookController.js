app.controller("addressBookController", ["$scope", "$http", "$rootScope", "$location", function ($scope, $http, $rootScope, $location) {
    console.log("inside addressBookController");
    $scope.addressBookList = [];
    $scope.singleaddress = {};
    $scope.alerts = [];
    $scope.newAddress = { RelationShip:2};

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
    $scope.getAddressBookList = () => {
        $http.get("/api/AddressBooks")
            .then((result) => {
                $scope.addressBookList = result.data;
                console.log(" result.data getAddressBookList :", $scope.addressBookList);
            })
            .catch((error) => {
                console.log("error in get AddressList:", error);
            });
    };

    $scope.getAddressBookList();

//-----------------------------------------------------------------------
    //get one address
    $scope.getsingleAddress = (Id) => {
        $location.path(`/addressBook/${Id}`);
        //getSingleAddress(Id);
        console.log("the Id", Id);    
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
                RelationShip: $scope.newAddress.RelationShip,
                Id: Id
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