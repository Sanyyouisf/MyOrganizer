app.controller("taskController", ["$scope", "$http", "$rootScope", "$location", "$routeParams", function ($scope, $http, $rootScope, $location,$routeParams) {

    $scope.taskList = [];
 //-------to get the task list -------------------------------------------------------------------------
    $http.get("/api/Tasks")
        .then((result) => {
            $scope.tasksList = result.data;
            console.log(" result.data :", result.data);
        })
        .catch((error) => {
            Console.log("error in task controller :", error);
        });


}
]);