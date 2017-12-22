app.controller("singleTaskController", ["$scope", "$http", "$routeParams", "$rootScope", "$location", function ($scope, $http, $routeParams, $rootScope, $location) {
    console.log("singleTaskController");
    $scope.singleTask = {};
    var Id = $routeParams.Id;
    console.log("the Id to display is ",Id);

    //$scope.getSingleTask = () => {
        $http.get(`/api/Tasks/${Id}`)
            .then((result) => {
                $scope.singleTask = result.data;
                console.log("result in get single task :", result.data);
            })
            .catch((error) => {
                console.log("error in singleTaskController", error)
            })
    //};

}
]);