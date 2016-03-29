/**
 * Created by Biousco on 3/22.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('ArticleUpdateCtrl', ['$scope','ReviewService','$stateParams','$state',function ($scope, ReviewService, $stateParams, $state) {

    $scope.review_id = $stateParams.article_id;

    $scope.getReviewDetail = function () {
      var datas = {id: $scope.review_id};
      ReviewService.getReviewDetail(datas).success(function (data) {
        if(data.ret_code == 0) {
          $scope.review_detail = data.data;

        }
      })
    }

    $scope.updateReview = function () {
      var dataset = {
        id: $scope.review_id,
        title: $scope.review_detail.title,
        brief: $scope.review_detail.brief,
        content: $scope.review_detail.content,
        banner: $scope.review_detail.banner,
        product_id: $scope.review_detail.product_id
      };
      ReviewService.updateReview(dataset).success(function (data) {
        if(data.ret_code == 0) {
          alert('更新成功！');
          $state.go('article.manage');
        }
      });
    }

  }]);
});
