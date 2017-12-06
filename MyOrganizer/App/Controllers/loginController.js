app.controller("loginController", ["$scope", "$http", "$location", function ($scope, $http, $location) {
    $scope.username = "";
    $scope.password = "";
    $rootScope.currentToken = "";
    $scope.auth = {};
    $scope.userLogin = {};
    $scope.alerts = [];
    $scope.message = "hi Sany , Login page";


    //login function
    $scope.login = () => {
        $scope.error = "";
        $scope.inProgress = true;
        $http
            ({
                method: 'POST',
                Url: "/Token",
                    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: { grant_type: "password", username: $scope.userLogin.username, password: $scope.userLogin.password }
            })
            .then((result) => {
                console.log("result in login function :", result);
                sessionStorage.setItem('token', result.data.access_token);
                currentToken = sessionStorage.getItem('token');
                $http.defaults.headers.common['Authorization'] = `bearer ${result.data.access_token}`;
                $location.path("/");
                $scope.inProgress = false;
            })
            .catch((error) => {
                //reject(error);
                $scope.error = error.data.error_description;
                console.log("erro error in login function :", $scope.error);
                $scope.inProgress = false;
            });
    }

    //register function
    $scope.register = () => {
        var auth = $scope.auth;
        $http({
            method: 'POST',
            url: "/api/Account/Register",
            data:
            {
                UserName: auth.username,
                Password: auth.password,
                confirmPassword: auth.confirm,
                Email: auth.email,
                FirstName: auth.firstName,
                LastName: auth.lastName
            }
        })
            .then((resultz) => {
                resolve(resultz);
                console.log("resultz in register :", resultz);
            })
            .catch((error) => {
                reject(error);
                console.log("error in register :", error)
            });
    };
}]);