/**
 * Created by Biousco on 3/21.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('BannerManageCtrl', ['$scope','BannerService','$uibModal', 'modAlert', '$state',
    function ($scope, BannerService, $uibModal, modAlert, $state) {

    $scope.init = function () {
      BannerService.getBannerList().success(function (data) {
        if(data.ret_code == 0) {
          $scope.bannerList = data.data;
        } else {
          modAlert.fail('获取列表失败..请刷新重试');
        }
      })
    };

    /** 下线banner **/
    $scope.setoffBanner = function (id) {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/common/modal-simple.html',
        controller: 'SimpleDialogInstanceCtrl',
        resolve: {
          modal : {
            title: "您确认要将该banner下线吗"
          }
        }
      });

      modalInstance.result.then(function (isBan) {
        if(!isBan) return false;
        var param = {id: id};
        BannerService.deleteBanner(param).success(function (data) {
          if(data.ret_code == 0) {
            modAlert.success('banner下线成功！');
            $state.reload();
          } else {
            modAlert.fail('banner下线失败' + data.ret_msg);
          }
        })
      }, function () {});


    };

    /** 编辑banner **/
    $scope.editBanner = function (id) {
      $state.go('operation.editbanner', {
        id: id
      });
    };



    /** 更新排序因子 **/
    $scope.updateRank = function (id, rank) {
      var data = {id: id, rank: parseInt(rank, 10)};
      BannerService.updateBanner(data).success(function (data) {
        if(data.ret_code == 0) {
          modAlert.success('排序更新成功!');
        } else {
          modAlert.success('排序更新失败!');
        }
      })
    };

    $scope.tipsRank = function () {
      modAlert.success('更新中..');
    }

  }]);


});
