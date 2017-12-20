app.controller("addNewTaskController", ["$scope", "$http", "$rootScope", function ($scope, $http, $rootScope) {

    $scope.newTask = {};
    /*Scope*/

    $scope.addNewTask = () => {
        $http.post("/api/Tasks/new", JSON.stringify(
            {
                TaskName: $scope.newTask.TaskName,
                TaskDate: $scope.newTask.TaskDate,
                Description: $scope.newTask.Description,
                Done: $scope.newTask.Done,
                Interval: $scope.newTask.Interval,
                Period: $scope.newTask.Period,
                Id: $scope.newTask.Id
            }))
            .then((result) => {
                console.log("result in addNewTask :", result.data);
                $scope.alerts = [];
                //$location.path("/addressBook");

            })
            .catch((error) => {
                console.log("error in addNewTask:", error.data.Message);
                $scope.alerts.push({ msg: error.data.Message });
            });
    };

}
]);