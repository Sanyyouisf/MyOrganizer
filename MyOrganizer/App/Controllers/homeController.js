app.controller("homeController", ["$scope", "$http","$rootScope", function ($scope, $http, $rootScope) {
    console.log("in homeController");

//------to get the list that not done -----------------------------------------------------
        $http.get("api/Tasks/toDoList")
            .then((GetTasksListToDoResult) => {
                $scope.TasksListToDo = GetTasksListToDoResult.data;
                $http.get("api/Meetings/toDoList")
                    .then((GetMeetingListToDoResult) => {
                        $scope.MeetingListToDo = GetMeetingListToDoResult.data;
                    })
                    .catch((error) => {
                        console.log("error in MeetingGetListToDo", error);
                    })
            })
        
            .catch((error) => {
                console.log("error in TasksGetListToDo", error);
        })

}]);