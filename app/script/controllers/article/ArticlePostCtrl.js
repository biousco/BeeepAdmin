/**
 * Created by Biousco on 3/22.
 */
/**
 * Created by Biousco on 3/21.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('ArticlePostCtrl', ['$scope', 'ReviewService', '$state', 'modAlert', 'UserService',
    'ProductService', '$q', 'Upload',
    function ($scope, ReviewService, $state, modAlert, UserService, ProductService, $q, Upload) {


      $scope.file_text = "上传图片";
      $scope.RelateProductsList = [];


      $scope.getAuthor = function (id) {
        UserService.getUserDetail({id: id}).success(function (data) {
          if (data.ret_code == 0) {
            $scope.Author = data.data;
            $scope.Author.isValid = true;
            modAlert.success('获取用户信息成功！');
          } else {
            modAlert.fail('获取用户信息失败：' + data.ret_msg);
          }
        })
      };

      $scope.getProducts = function (str) {
        var arr;
        if (!str || str == "") {
          arr = [];
          $scope.isRelateProductValid = true;
        } else {
          arr = str.split(',');
        }
        $scope.RelateProductsList = [];
        var isAll = [];

        $q.all(arr.map(function (v) {
          var defer = $q.defer();
          ProductService.getProductDetail({id: v}).success(function (data) {
            if (data.data !== null && data.data) {
              $scope.RelateProductsList.push(data.data);
              defer.resolve(v);
            } else {
              modAlert.fail('商品id不存在：：' + v);
              defer.reject(v);
            }
          });
          return defer.promise;
        })).then(function () {
          $scope.isRelateProductValid = true;
        }, function () {
          $scope.isRelateProductValid = false;
        });
      };
      
      $scope.postReview = function () {
        if (!$scope.Author || !$scope.Author.isValid) {
          modAlert.fail('请检查文章作者');
          return true;
        }
        $scope.getProducts($scope.product_id);
        if (!$scope.isRelateProductValid) {
          modAlert.fail('请检查关联产品');
          return true;
        }
        var url_reg = /^http/;
          if ($scope.origin_url && !url_reg.test($scope.origin_url)) {
            $scope.origin_url = 'http://' + $scope.origin_url;
          }

        modAlert.success('发布文章中');
        var datas = {
          user_id: $scope.author,
          title: $scope.title,
          brief: $scope.brief,
          content: $scope.content,
          banner: $scope.banner,
          origin_url: $scope.origin_url,
          product_id: $scope.product_id
        };
        ReviewService.addReview(datas).success(function (data) {
          if (data.ret_code == 0) {
            modAlert.success('文章发布成功！');
            $state.go('article.manage');
          }
        });


      };


      $scope.fileCallback = function (response) {
        var data = response.data;
        if (data.ret_code == 0) {
          $scope.banner = data.photo_url;
          modAlert.success('图片上传成功！');
          $scope.file_text = "重新上传";
        } else {
          modAlert.fail('图片上传失败...请重试：' + data.ret_msg);
        }
      };

      $scope.upload = function (file) {
        if (file == null) return true;
        modAlert.success('图片上传中...请稍后');
        Upload.upload({
          url: '/Admin/File/Upload',
          data: {
            photo: file
          },
          headers: {
            isFile: true
          }
        }).then(function (resp) {
          $scope.fileCallback(resp);
        })
      };

    }]);

  controllers.directive('validAuthor', ['UserService', 'modAlert', function (UserService, modAlert) {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, ngModel) {
        // console.log(scope, element, attr, ngModel)
      }
    }
  }])
});
