app.controller("editMeetingController", ["$http", "$scope", "$location", "$routeParams", function ($http, $scope, $location, $routeParams) {
    $scope.singleMeeting = {};

    var Id = $routeParams.Id;
    //--------to display the data in the text boxes-----------------------------------------------------------------------
    $http.get(`/api/Meetings/${Id}`)
        .then((displayedMeeting) => {
            $scope.singleMeeting = displayedMeeting.data;
            $scope.singleMeeting.Id = Id;
            console.log("$singleTask.Id inside displayedTask: ", $scope.singleMeeting.Id),
                console.log("the data you will edit is :", displayedMeeting.data);
        })
        .catch((error) => {
            console.log("error in displaying the meeting:", error);
        });
    //--------------------to edit the task-----------------------------------------------------------------
    $scope.editSingleMeeting = () => {
        console.log("inside editSingleMeeting");
        console.log("the Id you selected to edit is:", Id);
        console.log(" $scope.singleMeeting.Id :", $scope.singleMeeting.Id)
        $http.put(`/api/Meetings/${Id}`, JSON.stringify
            ({
                MeetingName: $scope.singleMeeting.MeetingName,
                MeetingDate: $scope.singleMeeting.MeetingDate,
                Notes: $scope.singleMeeting.Notes,
                Id: Id
            }))
            .then((editedMeeting) => {
                console.log("editedMeeting :", editedMeeting);
                editedMeeting.data.Id = Id;
                console.log("editedMeeting after :", editedMeeting);
                $location.path("/meeting");
            })
            .catch((error) => {
                console.log("error in editSingleTask :", error);
            })

    };





}]);