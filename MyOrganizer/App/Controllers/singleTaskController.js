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

}
]);