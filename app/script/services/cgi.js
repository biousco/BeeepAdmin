define(['./module'], function (services) {
  'use strict';

  services.factory('AdminService', ['$http', 'cgiList', function ($http, cgiList) {

    return {
      userLogin: function (name, pwd) {
        var param = {name: name, pwd: pwd};
        return $http({
          url: cgiList.AdminLogin,
          method: 'POST',
          data: param
        });
      },
      userLogout: function () {
        return $http({
          url: cgiList.AdminLogout,
          method: 'POST'
        });
      }
    };

  }]);

  services.factory('ProductService', ['$http', 'cgiList',
    function ($http, cgiList) {

      return {
        addProduct: function (param) {
          return $http({
            url: cgiList.addProduct,
            method: 'POST',
            data: param

          });
        },

        deleteProduct: function (param) {
          return $http({
            url: cgiList.deleteProduct,
            method: 'POST',
            data: param
          });
        },

        getProductList: function (param) {
          return $http({
            url: cgiList.getProductList,
            method: 'POST',
            data: param
          });
        },

        getProductDetail: function (param) {
          return $http({
            url: cgiList.getProductDetail,
            method: 'POST',
            data: param
          });
        },

        updateProduct: function (param) {
          return $http({
            url: cgiList.updateProduct,
            method: 'POST',
            data: param
          });
        },
      };


    }
  ]);

  services.factory('ReviewService', ['$http', 'cgiList', function ($http, cgiList) {

    return {
      addReview: function (param) {
        return $http({
          url: cgiList.addReview,
          method: 'POST',
          data: param

        });
      },

      deleteReview: function (param) {
        return $http({
          url: cgiList.deleteReview,
          method: 'POST',
          data: param
        });
      },

      getReviewList: function (param) {
        return $http({
          url: cgiList.getReviewList,
          method: 'POST',
          data: param
        });
      },

      getReviewDetail: function (param) {
        return $http({
          url: cgiList.getReviewDetail,
          method: 'POST',
          data: param

        });
      },

      updateReview: function (param) {
        return $http({
          url: cgiList.updateReview,
          method: 'POST',
          data: param

        });
      }

    };

  }]);

  services.factory('TrialService', ['$http', 'cgiList', function ($http, cgiList) {

    return {
      getTrialList: function () {
        return $http({
          url: cgiList.getTrialList,
          method: 'POST'
        });
      },

      updateTrial: function (param) {
        return $http({
          url: cgiList.updateTrial,
          method: 'POST',
          data: param

        });
      }

    };

  }]);


  services.factory('UserService', ['$http', 'cgiList', function ($http, cgiList) {

    return {

      getUserList: function (param) {
        return $http({
          url: cgiList.getUserList,
          method: 'POST',
          data: param
        });
      },

      getUserDetail: function (param) {
        return $http({
          url: cgiList.getUserDetail,
          method: 'POST',
          data: param

        });
      },

      updateUser: function (param) {
        return $http({
          url: cgiList.updateUser,
          method: 'POST',
          data: param

        });
      },

    };

  }]);
});
