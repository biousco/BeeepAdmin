/**
 * Created by Biousco on 3/22.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('ArticleManageCtrl', ['$scope','ReviewService','$uibModal','$state' ,'$filter',function ($scope, ReviewService, $uibModal, $state, $filter) {

    $scope.hc = 33;

    $scope.getAllReview = function () {
      ReviewService.getReviewList().success(function (data) {
        if(data.ret_code == 0) {
          $scope.review_list = $filter('filter')(data.data, function (value, index) {
            return value.is_delete == 0;
          })
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
        var data = {id: review_id, is_delete: 1};
        ReviewService.deleteReview(data).success(function (data) {
          if(data.ret_code == 0) {
            alert('删除成功！');
            $deleteReview(review_id);
            //window.location.reload();
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

    function $deleteReview(id) {
      $scope.review_list = $filter('filter')($scope.review_list, function (value, index) {
        return value.id != id;
      })
    }



  }]);
});
