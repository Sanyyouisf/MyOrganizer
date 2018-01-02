app.controller("addNewMeetingController", ["$scope", "$http", "$rootScope", "$location", function ($scope, $http, $rootScope, $location) {

    $scope.alerts = [];

    $scope.addAlert = function () {
        $scope.alerts.push({ msg: 'Another alert!' });
        console.log("inside addAlert");
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
        console.log("inside closeAlert");
    };

    $scope.newMeeting = {};

    $scope.addNewMeeting = () => {
        $scope.alerts = [];
        $http.post("/api/Meetings/new", JSON.stringify(
            {
                MeetingName: $scope.newMeeting.MeetingName,
                MeetingDate: $scope.newMeeting.MeetingDate,
                Notes: $scope.newMeeting.Notes,
                Done: $scope.newMeeting.Done,
                Interval: $scope.newMeeting.Interval,
                Period: $scope.newMeeting.Period,
                Id: $scope.newMeeting.Id
            }))
            .then((resultNewMeeting) => {
                console.log("result in addNewMeeting :", resultNewMeeting.data);
                $location.path("/meeting")
            })
            .catch((error) => {
                console.log("error in addNewMeeting:", error.data.Message);
                $scope.alerts.push({ msg: error.data.Message });
            });
    };

}
]);