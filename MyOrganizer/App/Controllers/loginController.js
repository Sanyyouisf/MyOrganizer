app.controller("loginController", ["$scope","$rootScope", "$http", "$location", function ($scope,$rootScope, $http, $location) {
    console.log("inside loginController")
    $scope.username = "";
    $scope.password = "";
   // $rootScope.currentToken = "";
    $scope.auth = {};
    $scope.userLogin = {};
    $scope.alerts = [];
    $scope.message = "hi Sany , Login page";
    //$rootScope.user = user;

    $scope.addAlert = function () {
        $scope.alerts.push({ msg: 'Another alert!' });
        console.log("inside addAlert");
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
        console.log("inside closeAlert");
    };


    //login function
    $scope.loginUser = () => {
        console.log("inside loginUser function");
        $scope.error = "";
        $scope.alerts = [];
        $scope.inProgress = true;
        $http
            ({
                method: 'POST',
                url: "/Token",
                    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: {
                        grant_type: "password",
                        username: $scope.userLogin.username,
                        password: $scope.userLogin.password
                    }
            })
            .then((result) => {
                console.log("result in login function :", result);
                sessionStorage.setItem('token', result.data.access_token);
                currentToken = sessionStorage.getItem('token');               
                $http.defaults.headers.common['Authorization'] = `bearer ${result.data.access_token}`;
                $scope.inProgress = false;
                console.log("you loged in as  :", result.data.userName);//the user name which is actually the email.
                //$scope.alerts.push({ msg: "you loged in as  :" + result.data.userName });// may i need it later to stay for half min 
                $location.path("/");
            })
            .catch((error) => {
                //the true message is $scope.error which is error.data.error_description;
                $scope.error = error.data.error_description;
                $scope.alerts.push({ msg: error.data.error_description });
                console.log(" error in login function :", $scope.error);
                $scope.inProgress = false; 
            });
    }

    //register function
    $scope.registerUser = () => {
        var auth = $scope.auth;
        $http({
            method: 'POST',
            url: "/api/Account/Register",
            data:
            {
                UserName: auth.username,
                Email: auth.email,
                Password: auth.password,
                confirmPassword: auth.confirm
            }
        })
            .then((resultz) => {
                console.log("resultz in register :", resultz);
                console.log("regestration Done welcome :", resultz.config.data.UserName);
                $location.path("/");
            })
            .catch((error) => {
                $scope.error = error.data.error_description;
                $scope.alerts.push({ msg: error.data.Message});
                console.log("error in register :", error.data.Message);
            });
    };
}]);