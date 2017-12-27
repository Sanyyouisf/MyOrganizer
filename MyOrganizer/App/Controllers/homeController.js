app.controller("homeController", ["$scope", "$http","$rootScope", function ($scope, $http, $rootScope) {
    console.log("in homeController");

    $scope.ListToDo = [];
    $scope.ToDoList = false;

//------to get the list that not done -----------------------------------------------------
    $scope.GetListToDo = () => {
        $http.get("api/Tasks/toDoList")
            .then((GetListToDoResult) => {
                $scope.ListToDo = GetListToDoResult.data;
                console.log("GetListToDoResult data :", $scope.ListToDo);
                $scope.ToDoList = !$scope.ToDoList;
            })
            .catch((error) => {
                console.log("error in GetListToDo", error);
            })
    };

}]);