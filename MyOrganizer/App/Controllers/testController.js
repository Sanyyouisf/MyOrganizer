app.controller("testController", ["$scope", "$http", "$rootScope", function ($scope, $http, $rootScope) {
    $http.get("/api/Tests")
        .then((result) => {
            $scope.testItems = result.data;
            console.log(" result.data :", result.data );
        })
        .catch((error) => {
            Console.log("error in test controller :", error);
        });
    }
]);