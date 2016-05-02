/**
 * Created by Biousco on 3/21.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('GoodsUpdateCtrl', ['$scope', 'ProductService', '$stateParams', '$state',
    'CON_goodsRelate', 'modAlert', 'Upload',
    function ($scope, ProductService, $stateParams, $state, CON_goodsRelate, modAlert, Upload) {

      $scope.buy_channel_list = CON_goodsRelate.buy_channel;
      $scope.product_id = $stateParams.product_id;
      $scope.currency_type = CON_goodsRelate.currency_type;
      $scope.price_type = CON_goodsRelate.currency_type[0];

      $scope.file_text = "上传图片";


      $scope.fileCallback = function (response) {
        var data = response.data;
        if (data.ret_code == 0) {
          $scope.product_detail.banner = data.photo_url;
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

      $scope.isEditorReady = false;
      var g_editor;

      $scope.getProductDetail = function () {
        var data = {id: $scope.product_id};
        ProductService.getProductDetail(data).success(function (data) {
          if (data.ret_code == 0) {
            data.data.price = parseInt(data.data.price, 10);
            $scope.product_detail = data.data;
            var textContent = html_decode(data.data.content);

            var retry = function () {

              if($scope.isEditorReady) {
                g_editor.execCommand('clearDoc');
                g_editor.execCommand('inserthtml', textContent);
              } else {
                setTimeout(function () {
                  retry();
                }, 500);
              }
            };
            retry();
          }
        })
      };

      $scope.editorReady = function (editor) {
        $scope.isEditorReady = true;
        g_editor = editor;
      };

      $scope.updateGoods = function () {
        var dataSet = {
          id: $scope.product_id,
          name: $scope.product_detail.name,
          brief: $scope.product_detail.brief,
          content: $scope.product_detail.content,
          banner: $scope.product_detail.banner,
          is_trial_avaliable: 1,
          coupon: $scope.product_detail.coupon,
          buy_channel: $scope.product_detail.buy_channel,
          buy_link: $scope.product_detail.buy_link,
          buy_store: $scope.product_detail.buy_store,
          price: $scope.product_detail.price
        };
        if ($scope.updateForm.$valid) {
          ProductService.updateProduct(dataSet).success(function (data) {
            if (data.ret_code == 0) {
              modAlert.success('更新成功');
              $state.go('goods.racking');
            }
          })
        } else {
          console.log($scope.releaseForm, '表单不合法');
        }
      };


      function html_decode(str)
      {
        var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
        return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
      }

    }]);
});
