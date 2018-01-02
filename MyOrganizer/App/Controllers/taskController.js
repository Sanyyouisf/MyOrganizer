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

    //var Id = $routeParams.Id;
   
    //$scope.taskDone = (task) => {
    //    console.log("$scope.task:",$scope.task);
    //    console.log("inside the Id to be done :", Id);
    //    $http.put(`/api/Tasks/Done/${Id}`, JSON.stringify
    //        ({
    //            TaskName: $scope.task.TaskName,
    //            TaskDate: $scope.task.TaskDate,
    //            Done: true,
    //            Id: Id
    //        }))
    //        .then((updatedTask) => {
    //            console.log("updatedTask data:", updatedTask.config.data);
    //            $location.path("/task");
    //        })
    //        .catch((error) => {
    //            console.log("error in task Done :", error);
    //        })
    //}


}
]);