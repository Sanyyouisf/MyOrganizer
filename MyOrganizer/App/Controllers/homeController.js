app.controller("homeController", ["$scope", "$http","$rootScope", function ($scope, $http, $rootScope) {
    console.log("in homeController");

    $scope.ListToDo = [];
   // $scope.MeetingListToDo = [];
    $scope.ToDoList = false;

//------to get the list that not done -----------------------------------------------------
    $scope.GetListToDo = () => {
        $http.get("api/Tasks/toDoList")
            .then((GetTasksListToDoResult) => {
                $scope.TasksListToDo = GetTasksListToDoResult.data;
                console.log("GetTasksListToDoResult data :", $scope.TasksListToDo);
                $http.get("api/Meetings/toDoList")
                    .then((GetMeetingListToDoResult) => {
                        $scope.MeetingListToDo = GetMeetingListToDoResult.data;
                        console.log("MeetingListToDo data :", $scope.MeetingListToDo);
                        $scope.ToDoList = !$scope.ToDoList;
                    })
                    .catch((error) => {
                        console.log("error in MeetingGetListToDo", error);
                    })
            })
        
            .catch((error) => {
                console.log("error in TasksGetListToDo", error);
            })
    };

}]);