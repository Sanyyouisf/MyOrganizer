app.controller("meetingController", ["$scope", "$http", "$rootScope", function ($scope, $http, $rootScope) {
    $http.get("/api/Meetings")
        .then((result) => {
            $scope.meetingItems = result.data;
            console.log(" result.data :", result.data);
        })
        .catch((error) => {
            Console.log("error in meeting controller :", error);
        });
}
]);