/**
 * Created by Biousco on 3/31.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('CreateBannerCtrl', ['$scope','BannerService','$uibModal','modAlert','$state',
    function ($scope, BannerService, $uibModal, modAlert, $state) {

    $scope.createBanner = function () {
      var data = {
        image: $scope.image,
        link: $scope.link
      };
      BannerService.addBanner(data).success(function (data) {
        if(data.ret_code == 0) {
          modAlert.success('创建banner成功！');
          $state.go('operation.bannermanage');
        } else {
          modAlert.fail('创建banner失败...' + data.ret_msg);
        }
      })
    }

      $scope.onUpload = function () {
        modAlert.success('图片上传中...请稍后');
      };

      $scope.fileCallback = function (response) {
        var data = JSON.parse(response.data);
        if(data.ret_code == 0) {
          $scope.image = data.photo_url;
          modAlert.success('图片上传成功！');
        } else {
          modAlert.fail('图片上传失败...请重试：' + data.ret_msg);
        }
      };
  }]);

});
