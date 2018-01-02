app.controller("meetingController", ["$scope", "$http", "$rootScope", function ($scope, $http, $rootScope) {

    $scope.meetingList = [];
    $scope.meeting = {};
    //-------to get the task list -------------------------------------------------------------------------
    $http.get("/api/Meetings")
        .then((resultMeetingList) => {
            $scope.meetingList = resultMeetingList.data;
            console.log(" $scope.meetingList :", $scope.meetingList);
        })
        .catch((error) => {
            Console.log("error in meeting controller :", error);
        });
}
]);