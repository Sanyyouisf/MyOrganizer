app.controller("homeController", ["$scope", "$http","$rootScope", function ($scope, $http, $rootScope) {
    console.log("in homeController");
    $http.get("/Api/values")
        .then((result) => {
            console.log("result in homeController:", result);
            $scope.values = result.data;
            console.log("$scope.values in homeController ", $scope.values);
        })
        .catch((error) => {
           // reject(error);
            $scope.error = error.data.error_description;
            console.log("erro error in home controller :", $scope.error);
        });

    $scope.message = "hi this is homeController "
}]);