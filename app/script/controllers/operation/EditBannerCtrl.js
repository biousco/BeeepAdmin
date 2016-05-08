/**
 * Created by Biousco on 3/31.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('EditBannerCtrl', ['$scope','BannerService','$uibModal','modAlert','$state','$stateParams',
    function ($scope, BannerService, $uibModal, modAlert, $state, $stateParams) {


     $scope.banner_id = $stateParams.id;

     $scope.init = function () {
       var param = {id: $scope.banner_id};
       BannerService.getBannerDetail(param).success(function (data) {
         if(data.ret_code == 0) {
           $scope.banner_detail = data.data;
         } else {
           modAlert.fail('获取信息失败...' + data.ret_msg );
         }
       })
     };

    $scope.updateBanner = function () {
      var data = {
        id: $scope.banner_id,
        image: $scope.banner_detail.image,
        link: $scope.banner_detail.link
      };
      BannerService.updateBanner(data).success(function (data) {
        if(data.ret_code == 0) {
          modAlert.success('更新banner成功！');
          $state.go('operation.banner');
        } else {
          modAlert.fail('创建banner失败...' + data.ret_msg);
        }
      })
    };

      $scope.onUpload = function () {
        modAlert.success('图片上传中...请稍后');
      };

      $scope.fileCallback = function (response) {
        var data = JSON.parse(response.data);
        if(data.ret_code == 0) {
          $scope.banner_detail.image = data.photo_url;
          modAlert.success('图片上传成功！');
        } else {
          modAlert.fail('图片上传失败...请重试：' + data.ret_msg);
        }
      };
  }]);

});
