app.controller("loginController", ["$scope","$rootScope", "$http", "$location", function ($scope,$rootScope, $http, $location) {
    console.log("inside loginController")
    $scope.username = "";
    $scope.password = "";
    $rootScope.currentToken = "";
    $scope.auth = {};
    $scope.userLogin = {
        username: "sanyyousif",
        password:"123456"
    };
  
    $scope.alerts = [];
    $scope.message = "hi Sany , Login page";
    $rootScope.UserName = {};

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
        //$scope.inProgress = true;
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
                //console.log("currentToken :", currentToken);
                $http.defaults.headers.common['Authorization'] = `bearer ${result.data.access_token}`;
                //$scope.inProgress = false;
                //to keep the user name all the time 
                $rootScope.UserName = result.data.userName;
                sessionStorage.setItem("UserName", result.data.userName);
                console.log("you loged in as  :", result.data.userName);//the user name which is actually the email.
                //$scope.alerts.push({ msg: "you loged in as  :" + result.data.userName });// may i need it later to stay for half min 
                console.log("you loged in as  another :", $rootScope.UserName);
                $location.path("/");
            })
            .catch((error) => {
                console.log("error ", error);
                //the true message is $scope.error which is error.data.error_description;
                $scope.error = error.data.error_description;
                $scope.alerts.push({ msg: error.data.error_description });
                console.log(" error in login function :", $scope.error);
                //$scope.inProgress = false; 
            });
    }

    //register function
    $scope.registerUser = () => {
        $scope.alerts = [];
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
            .then((result) => {
                console.log("resultz in register :", result);
                //sessionStorage.setItem('token', result.data.access_token);
                //currentToken = sessionStorage.getItem('token');
                //$rootScope.UserName = result.config.data.UserName;
                //console.log("currentToken :", currentToken);
                console.log("regestration Done welcome :", result.config.data.UserName);
                $scope.authenticate = false;
            })
            .catch((error) => {
                console.log("error ", error );
                $scope.error = error.data.error_description;
                $scope.alerts.push({ msg: error.data.Message});
                console.log("error in register :", error.data.Message);
            });
    };
}]);