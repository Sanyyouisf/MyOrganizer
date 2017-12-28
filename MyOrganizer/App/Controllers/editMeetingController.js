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
        //$scope.editedAddress.User_Id = $rootScope.UserName.Id,
        $http.put(`/api/Meetings/${Id}`, JSON.stringify
            ({
                MeetingName: $scope.singleMeeting.MeetingName,
                MeetingDate: $scope.singleMeeting.MeetingDate,
                Notes: $scope.singleMeeting.Notes,
                //Done: $scope.singleTask.Done,
                //Interval: $scope.singleTask.Interval,
                //Period: $scope.singleTask.Period,
                Id: Id
            }))
            .then((editedMeeting) => {
                console.log("editedMeeting :", editedMeeting);
                editedMeeting.data.Id = Id;
                //resolve(resultz.data);
                //editedTask.data.Id = Id;
                console.log("editedMeeting after :", editedMeeting);
                //console.log("the Id you selected to edit is:", editedTask.data.Id);
                //console.log("the data after addingthe id  ", editedTask.data),
                $location.path("/meeting");
            })
            .catch((error) => {
                console.log("error in editSingleTask :", error);
            })

    };





}]);