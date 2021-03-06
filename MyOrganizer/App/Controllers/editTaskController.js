﻿app.controller("editTaskController", ["$http", "$scope", "$location", "$routeParams", function ($http, $scope, $location, $routeParams) {
    $scope.singleTask = {};

    var Id = $routeParams.Id;
//--------to display the data in the text boxes-----------------------------------------------------------------------
    $http.get(`/api/Tasks/${Id}`)
        .then((displayedTask) => {
            $scope.singleTask = displayedTask.data;
            $scope.singleTask.Id = Id;
            console.log("$singleTask.Id inside displayedTask: ", $scope.singleTask.Id),
            console.log("the data you will edit is :", displayedTask.data );
        })
        .catch((error) => {
            console.log("error", error);
        });
//--------------------to edit the task-----------------------------------------------------------------
    $scope.editSingleTask = () => {
        console.log("inside editSingleTask");
        console.log("the Id you selected to edit is:", Id);
        console.log(" $scope.singleTask.Id :", $scope.singleTask.Id)
        $http.put(`/api/Tasks/${Id}`, JSON.stringify
        ({
            TaskName :$scope.singleTask.TaskName,
            TaskDate :$scope.singleTask.TaskDate,
            Description : $scope.singleTask.Description,
            Id: Id
        }))
            .then((editedTask) => {
                console.log("editedTask :", editedTask);
                editedTask.data.Id = Id;
                console.log("editedTask after :", editedTask);
                $location.path("/task");
            })
            .catch((error) => {
                console.log("error in editSingleTask :", error );
            })

    };





}]);