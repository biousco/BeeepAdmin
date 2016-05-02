/**
 * Created by Biousco on 3/21.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('GoodsReleaseCtrl', ['$scope', 'ProductService', '$state', 'CON_goodsRelate',
    'modAlert', 'UploadService', 'upload', 'cgiList', 'Upload',
    function ($scope, ProductService, $state, CON_goodsRelate, modAlert, UploadService, upload, cgiList, Upload) {

      $scope.buy_channel_list = CON_goodsRelate.buy_channel;
      $scope.buy_channel = CON_goodsRelate.buy_channel[0];

      $scope.currency_type = CON_goodsRelate.currency_type;
      $scope.price_unit = CON_goodsRelate.currency_type[0];

      $scope.file_text = "上传图片";


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
        if(file == null) return true;
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

      $scope.releaseGoods = function () {
        var dataSet = {
          name: $scope.name,
          brief: $scope.brief,
          content: $scope.htmlContent,
          banner: $scope.banner,
          is_trial_avaliable: 0,
          coupon: $scope.coupon,
          buy_channel: $scope.buy_channel,
          buy_link: $scope.buy_link,
          buy_store: $scope.buy_store,
          price: $scope.price,
          price_unit_text: $scope.price_unit,
          price_unit: CON_goodsRelate.price_map[$scope.price_unit]
        };
        if ($scope.releaseForm.$valid) {
          modAlert.success('正在发布中...');
          ProductService.addProduct(dataSet).success(function (data) {
            if (data.ret_code == 0) {
              modAlert.success('发布成功！');
              $state.go('goods.racking');
            } else {
              modAlert.fail('发布失败！失败原因：' + data.ret_msg);
            }
          })
        } else {
          console.log($scope.releaseForm, '表单不合法');
        }

      }

    }]);
});
