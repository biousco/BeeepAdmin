/**
 * Created by Biousco on 3/22.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('ArticleManageCtrl', ['$scope', 'ReviewService', '$uibModal', '$state', '$filter', 'modAlert', 'upload',
    function ($scope, ReviewService, $uibModal, $state, $filter, modAlert, upload) {

      $scope.hc = 33;

      $scope.getAllReview = function () {
        ReviewService.getReviewList({is_delete: 0}).success(function (data) {
          if (data.ret_code == 0) {
            $scope.review_list = data.data;
          }
        })
      };

      /** 预览 **/
      $scope.previewArticle = function (link) {
        window.open(link);
      };

      /** 删除 **/
      $scope.deleteArticle = function (review_id) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/common/modal-simple.html',
          controller: 'SimpleDialogInstanceCtrl',
          resolve: {
            modal: {
              title: "确认删除该文章吗？"
            }
          }
        });

        modalInstance.result.then(function (isBan) {
          if (!isBan) return false;
          var data = {id: review_id, is_delete: 1};
          ReviewService.deleteReview(data).success(function (data) {
            if (data.ret_code == 0) {
              modAlert.success('文章删除成功！');
              $state.reload();
            }
          })
        }, function () {
        });
      };

      /** 编辑 **/
      $scope.editArticle = function (article_id) {
        $state.go('article.update', {
          article_id: article_id
        })
      };

      /** 更新排序因子 **/
      $scope.updateRank = function (id, rank) {
        var data = {id: id, rank: parseInt(rank, 10)};
        ReviewService.updateReview(data).success(function (data) {
          if (data.ret_code == 0) {
            modAlert.success('排序更新成功!');
          } else {
            modAlert.success('排序更新失败!');
          }
        })
      };

      $scope.tipsRank = function () {
        modAlert.success('更新中..');
      }

      /** 搜索 **/
      $scope.searchType = {search_id: 'id', search_title: 'title'};
      $scope.search_select = 'id';
      $scope.searchList = function (key) {
        var param;
        if($scope.search_select == 'id') {
          param = {search_id: key};
        } else {
          param = {search_keyword: key};
        }
        ReviewService.getReviewList(param).success(function (data) {
          if(data.ret_code == 0) {
            $scope.review_list = data.data;
            if(data.data.length == 0) {
              modAlert.fail('没有该文章');
            }
          }
        })
      }


    }]);
});
