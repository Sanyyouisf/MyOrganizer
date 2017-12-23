app.controller("taskController", ["$scope", "$http", "$rootScope", function ($scope, $http, $rootScope) {

 //-------to get the task list ------------------------------------------------------------------------------------
    $http.get("/api/Tasks")
        .then((result) => {
            $scope.tasksList = result.data;
            console.log(" result.data :", result.data);
        })
        .catch((error) => {
            Console.log("error in task controller :", error);
        });

    //$scope.getSingleTask
}
]);