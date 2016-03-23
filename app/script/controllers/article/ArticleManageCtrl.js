/**
 * Created by Biousco on 3/22.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('ArticleManageCtrl', ['$scope','AdminService','$uibModal','$state' ,function ($scope, AdminService, $uibModal, $state) {

    /** 预览 **/
    $scope.previewArticle = function () {

    };

    /** 删除 **/
    $scope.deleteArticle = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'views/common/modal-simple.html',
        controller: 'SimpleDialogInstanceCtrl',
        resolve: {
          modal : {
            title: "确认删除该文章吗？"
          }
        }
      });

      modalInstance.result.then(function (isBan) {
        if(!isBan) return false;
        console.log('yes');
      }, function () {});
    };

    /** 编辑 **/
    $scope.editArticle = function (article_id) {
      $state.go('article.update', {
        article_id: article_id
      })
    };


  }]);
});
