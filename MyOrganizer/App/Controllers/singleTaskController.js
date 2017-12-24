app.controller("singleTaskController", ["$scope", "$http", "$routeParams", "$rootScope", "$location", function ($scope, $http, $routeParams, $rootScope, $location) {
    console.log("singleTaskController");
    $scope.singleTask = {};
    var Id = $routeParams.Id;
    console.log("the Id to display is ",Id);
//----------to get the single task------------------------------------------------------------------
    //$scope.getSingleTask = () => {
        $http.get(`/api/Tasks/${Id}`)
            .then((result) => {
                $scope.singleTask.Id = Id;
                $scope.singleTask = result.data;
                console.log("result in get single task :", result.data);
            })
            .catch((error) => {
                console.log("error in singleTaskController", error)
            })
    //};
//-------------to delete a task--------------------------------------------------------------------------------------
        $scope.deleteSingleTask = () => {
            console.log("the ID you will delete it is: ", Id );
            $http.delete(`/api/Tasks/${Id}`)
                .then((DeletesTask) => {
                    console.log("resulet in deleteSingleTask :", DeletesTask.data);
                    console.log("you successfuly deleted the task :", DeletesTask.data.TaskName);
                    $location.path("/task");
                })
                .catch((error) => {
                    console.log("error in deleteSingleTask", error)
                })

        };

//----------go to the edit page---------------------------------------------------
        $scope.editSingleTask = (Id) => {
            console.log("the Id you like to edit :", Id)
            $location.path(`/task/edit/${Id}`);
        };
//-------------------------------------------------
        var Id = $routeParams.Id;
        $scope.taskDone = (Id) => {
            console.log("inside the Id to be done :", Id);
            console.log("inside single task");
            $http.put(`/api/Tasks/Done/${Id}` ,JSON.stringify
                ({
                    TaskName: $scope.singleTask.TaskName,
                    TaskDate: $scope.singleTask.TaskDate,
                    Done: true,
                    Id :Id
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