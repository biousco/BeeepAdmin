/**
 * Created by Biousco on 3/22.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('ArticleManageCtrl', ['$scope','ReviewService','$uibModal','$state' ,function ($scope, ReviewService, $uibModal, $state) {

    $scope.hc = 33;

    $scope.getAllReview = function () {
      ReviewService.getReviewList().success(function (data) {
        if(data.ret_code == 0) {
          $scope.review_list = data.data;
        }
      })
    };

    /** 预览 **/
    $scope.previewArticle = function () {

    };

    /** 删除 **/
    $scope.deleteArticle = function (review_id) {
      var modalInstance = $uibModal.open({
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
        var data = {review_id: review_id};
        ReviewService.deleteReview(data).success(function (data) {
          if(data.ret_code == 0) {
            alert('删除成功！');
          }
        })
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
