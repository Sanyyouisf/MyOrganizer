app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/",
        {
            templateUrl: "App/Views/home.html",
            controller: "homeController"
        })
        .when("/login",
        {
            templateUrl: "App/Views/login.html",
            controller: "loginController"
        })
        .otherwise("/login");
}]);

app.run(["$rootScope", "$http", "$location", function ($rootScope, $http, $location) {


    //if a user logged in return the token
    $rootScope.isLoggedIn = () => {
        return !!sessionStorage.getItem("token");
        console.log("inside isLoggedIn ");
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
        if (token)
            $http.defaults.headers.common["Authorization"] = `bearer ${token}`;

    })

}


]

);