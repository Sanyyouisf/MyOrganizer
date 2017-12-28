app.controller("singleMeetingController", ["$scope", "$http", "$routeParams", "$rootScope", "$location", function ($scope, $http, $routeParams, $rootScope, $location) {
    console.log("singleMeetingController");
    $scope.singleMeeting = {};
    var Id = $routeParams.Id;
    console.log("the Id to display is ", Id);
    //----------to get the single meeting------------------------------------------------------------------
    //$scope.getSingleTask = () => {
    $http.get(`/api/Meetings/${Id}`)
        .then((resultSingleMeeting) => {
            $scope.singleMeeting.Id = Id;
            $scope.singleMeeting = resultSingleMeeting.data;
            console.log("result in get single task :", $scope.singleMeeting);
        })
        .catch((error) => {
            console.log("error in singleMeetingController", error)
        })
    //};
    //-------------to delete a task--------------------------------------------------------------------------------------
    $scope.deleteSingleMeeting = () => {
        console.log("the ID you will delete it is: ", Id);
        $http.delete(`/api/Meeting/${Id}`)
            .then((ResultDeletedMeeting) => {
                console.log("resulet in deleteSingleTask :", ResultDeletedMeeting.data);
                console.log("you successfuly deleted the task :", ResultDeletedMeeting.data.MeetingName);
                $location.path("/Meeting");
            })
            .catch((error) => {
                console.log("error in deleteSingleMeeting", error)
            })
    };

    //----------go to the edit page---------------------------------------------------
    $scope.editSingleMeeting= (Id) => {
        console.log("the Id you like to edit :", Id)
        $location.path(`/meeting/edit/${Id}`);
    };
    //---------to mark the neeting as done ----------------------------------------------------------------------
    var Id = $routeParams.Id;
    $scope.meetingDone = (Id) => {
        console.log("inside the Id to be done :", Id);
        $http.put(`/api/Meetings/Done/${Id}`, JSON.stringify
            ({
                MeetingName: $scope.singleMeeting.MeetingName,
                MeetingDate: $scope.singleMeeting.MeetingDate,
                Done: true,
                Id: Id
            }))
            .then((resultupdatedMeting) => {
                console.log("updatedMeeting data:", resultupdatedMeting.config.data);
                $location.path("/meeting");
            })
            .catch((error) => {
                console.log("error in meeting Done :", error);
            })
    }

}
]);