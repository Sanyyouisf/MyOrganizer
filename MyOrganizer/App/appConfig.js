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
        });
}]);

app.run(["$rootScope", "$http", "$location", function ($rootScope, $http, $location) {
    //if a user logged in return the token
    $rootScope.isLoggedIn = function () {
        return !!sessionStorage.getItem("token")
    }

    $rootScope.$on("$rootChangeStart", function (event, currentRoute) {
        var anonymousPage = false;
        var originalPath = currentRoute.originalPath;

        //in case
        if (originalPath) {
            anonymousPage = originalPath.indexOf("/login") !== -1
        }

        //in case the user is not logged in or it is nor anonymous page 
        if (!anonymousPage && !$rootScope.isLoggedIn()) {
            event.preventDefault();
            $location.path("/login");
        }

        //
        var token = sessionStorage.getItem("token");
        if (token)
            $http.defaults.headers.common["Authorization"] = `bearer ${token}`;

    })

}


]

);