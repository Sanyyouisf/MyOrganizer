app.controller("addNewTaskController", ["$scope", "$http", "$rootScope", "$location", function ($scope, $http, $rootScope, $location) {

    $scope.alerts = [];

    $scope.addAlert = function () {
        $scope.alerts.push({ msg: 'Another alert!' });
        console.log("inside addAlert");
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
        console.log("inside closeAlert");
    };

    $scope.newTask = {};

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
                $location.path("/task")
            })
            .catch((error) => {
                console.log("error in addNewTask:", error.data.Message);
                $scope.alerts.push({ msg: error.data.Message });
            });
    };

}
]);