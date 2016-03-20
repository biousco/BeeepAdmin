define(['./module'], function(services) {
    'use strict';
    services.factory('AdminService', ['$http', '$httpParamSerializerJQLike', function($http, $httpParamSerializerJQLike) {

        return {
            userLogin: function(name, pwd) {
                var param = { name: name, pwd: pwd };
                return $http({
                    url: '/Admin/User/Login',
                    method: 'POST',
                    data: $httpParamSerializerJQLike(param),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
            },
            userLogout: function() {
                return $http({
                    url: '/Admin/User/Logout',
                    method: 'POST'
                });
            }
        };

    }]);

    services.factory('ProductService', ['$http', '$httpParamSerializerJQLike',
        function($http, $httpParamSerializerJQLike) {

            return {
                addProduct: function(param) {
                    return $http({
                        url: '/Admin/Product/Add',
                        method: 'POST',
                        data: $httpParamSerializerJQLike(param),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });
                },

                deleteProduct: function(param) {
                    return $http({
                        url: '/Admin/Product/Delete',
                        method: 'POST',
                        data: $httpParamSerializerJQLike(param),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });
                },

                getProductList: function() {
                    return $http({
                        url: '/Admin/Product/List',
                        method: 'POST'
                    });
                },

                getProductDetail: function(param) {
                    return $http({
                        url: '/Admin/Product/GetDetail',
                        method: 'POST',
                        data: $httpParamSerializerJQLike(param),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });
                },

                updateProduct: function(param) {
                    return $http({
                        url: '/Admin/Product/Update',
                        method: 'POST',
                        data: $httpParamSerializerJQLike(param),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });
                },
            };


        }
    ]);

    services.factory('ReviewService', ['$http', '$httpParamSerializerJQLike', function($http, $httpParamSerializerJQLike) {

        return {
            addReview: function(param) {
                return $http({
                    url: '/Admin/Review/Add',
                    method: 'POST',
                    data: $httpParamSerializerJQLike(param),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
            },

            deleteReview: function(param) {
                return $http({
                    url: '/Admin/Review/Delete',
                    method: 'POST',
                    data: $httpParamSerializerJQLike(param),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
            },

            getReviewList: function() {
                return $http({
                    url: '/Admin/Review/All',
                    method: 'POST'
                });
            },

            getReviewDetail: function(param) {
                return $http({
                    url: '/Admin/Review/GetDetail',
                    method: 'POST',
                    data: $httpParamSerializerJQLike(param),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
            },

            updateReview: function(param) {
                return $http({
                    url: '/Admin/Review/Update',
                    method: 'POST',
                    data: $httpParamSerializerJQLike(param),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
            },

        };

    }]);

    services.factory('TrialService', ['$http', '$httpParamSerializerJQLike', function($http, $httpParamSerializerJQLike) {

        return {
            getTrialList: function() {
                return $http({
                    url: '/Admin/Trial/All',
                    method: 'POST'
                });
            },

            updateTrial: function(param) {
                return $http({
                    url: '/Admin/Trial/Update',
                    method: 'POST',
                    data: $httpParamSerializerJQLike(param),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
            },

        };

    }]);


    services.factory('UserService', ['$http', '$httpParamSerializerJQLike', function($http, $httpParamSerializerJQLike) {

        return {

            getUserList: function() {
                return $http({
                    url: '/Admin/User/All',
                    method: 'POST'
                });
            },

            getUserDetail: function(param) {
                return $http({
                    url: '/Admin/User/GetDetail',
                    method: 'POST',
                    data: $httpParamSerializerJQLike(param),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
            },

            updateUser: function(param) {
                return $http({
                    url: '/Admin/User/Update',
                    method: 'POST',
                    data: $httpParamSerializerJQLike(param),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
            },

        };

    }]);
});
