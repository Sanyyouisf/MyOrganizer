app.controller("taskController", ["$scope", "$http", "$rootScope", "$location", "$routeParams", function ($scope, $http, $rootScope, $location,$routeParams) {

    $scope.taskList = [];
    $scope.task = {};
 //-------to get the task list -------------------------------------------------------------------------
    $http.get("/api/Tasks")
        .then((result) => {
            $scope.tasksList = result.data;
            console.log(" result.data :", result.data);
        })
        .catch((error) => {
            Console.log("error in task controller :", error);
        });

//---------to mark the task as done ----------------------------------------------------------------------
    var Id = $routeParams.Id;
    $scope.taskDone = (Id) => {       
        console.log("inside the Id to be done :", Id);
        //$scope.task.Id = Id;
        //if ($scope.taskList !== null) {
            Object.keys($scope.taskList).forEach((key) => {
                $scope.taskList[key].Id = key;
                $scope.task.push($scope.taskList[key]);
            });
        //}
        //return ($scope.task);
        console.log("$scope.task :", $scope.task);
        $http.put(`/api/Tasks/Done/${Id}`, JSON.stringify
            ({
                TaskName: $scope.task.TaskName,
                taskDate: $scope.task.taskDate,
                Done: true,
                Id: Id
            }))
            .then((updatedTask) => {
                console.log("updatedTask data:", updatedTask);
                $location.path("/task");
            })
            .catch((error) => {
                console.log("error in task Done :", error);
            })
    }

}
]);