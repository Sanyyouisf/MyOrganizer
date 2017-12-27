app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider 
        .when("/login",
        {
            templateUrl: "App/Views/login.html",
            controller: "loginController"
        })
        .when("/addressBook",
        {
            templateUrl: "App/Views/addressBook.html",
            controller: "addressBookController"
        })
        .when("/addressBook/new",
        {
            templateUrl: "App/Views/newAddress.html",
            controller:"addressBookController"
        })
        .when("/addressBook/:Id",
        {
            templateUrl: "App/Views/singleAddress.html",
            controller: "singleAddressBookController"
        })
        .when("/addressBook/edit/:Id",
        {
            templateUrl: "App/Views/editAddress.html",
            controller:"editAddressBookController"
        })
        .when("/task",
        {
            templateUrl: "App/Views/task.html",
            controller: "taskController"
        })
        .when("/task/new",
        {
            templateUrl:"App/Views/newTask.html",
            controller:"addNewTaskController"
        })
        .when("/task/:Id",
        {
            templateUrl: "App/Views/singleTask.html",
            controller:"singleTaskController"
        })
        .when("/task/edit/:Id",
        {
            templateUrl: "App/Views/editTask.html",
            controller:"editTaskController"
        })
        .when("/test",
        {
            templateUrl: "App/Views/test.html",
            controller: "testController"
        })
        .when("/meeting",
        {
            templateUrl: "App/Views/meeting.html",
            controller: "meetingController"
        })
        .when("/meeting/new",
        {
            templateUrl: "App/Views/newMeeting.html",
            controller: "addNewMeetingController"
        })
        .when("/meeting/:Id",
        {
            templateUrl: "App/Views/singleMeeting.html",
            controller: "singleMeetingController"
        })
        .when("/meeting/edit/:Id",
        {
            templateUrl: "App/Views/editMeeting.html",
            controller: "editMeetingController"
        })
        .when("/",
        {
            templateUrl: "App/Views/home.html",
            controller: "homeController"
        })
        .otherwise("/login");
}]);

app.run(["$rootScope", "$http", "$location", function ($rootScope, $http, $location) {
    //if a user logged in return the token
    $rootScope.isLoggedIn = () => {
        return !!sessionStorage.getItem("token");
        console.log("inside isLoggedIn ");
        event.preventDefault();
        //console.log("token :", token );
    };

    //logout function
    $rootScope.Logout = () => {
        sessionStorage.removeItem("token");
        console.log("inside Logout");
        $location.path("/login");
    };

    $rootScope.$on("$routeChangeStart", function (event, currentRoute) {
        var pageIsAccesibleWithoutBeingLoggedIn = false;
        //if your not loged in 
        var pageUserIsNavigatingTo = currentRoute.originalPath;

        //don't check this if the page is loading for the first time
        //if the user is not authenticated 
        if (pageUserIsNavigatingTo) {
            pageIsAccesibleWithoutBeingLoggedIn = pageUserIsNavigatingTo === "/login";
            //console.log("inside pageUserIsNavigatingTo");
        }

        //in case the user is not logged in or it is nor anonymous page 
        if (pageIsAccesibleWithoutBeingLoggedIn || $rootScope.isLoggedIn()) {
            //let the user through
           // console.log("the address is not /login ");
        }
        else {
            event.preventDefault();
            $location.path("/login");
            console.log("the user have to loge in ");
        }

        var token = sessionStorage.getItem("token");
        if (token) {
            $http.defaults.headers.common["Authorization"] = `bearer ${token}`;
            $rootScope.UserName = sessionStorage.getItem("UserName");
        }
    })

}


]

);