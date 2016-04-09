/**
 * Created by Biousco on 3/22.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('ArticleUpdateCtrl', ['$scope', 'ReviewService', '$stateParams', '$state', 'modAlert', '$q',
    function ($scope, ReviewService, $stateParams, $state, modAlert, $q) {

      $scope.review_id = $stateParams.article_id;
      $scope.isEditorReady = false;
      var g_editor,count = 0;

      var defer1 = $q.defer();
      var promise1 = defer1.promise;
      var defer2 = $q.defer();
      var promise2 = defer2.promise;
      var promise3 = $q.all([promise1, promise2]);

      promise3.then(function (result) {
        var g_editor = result[1];
        var textContent = result[0];
        //感觉会有bug
        setTimeout(function () {
          g_editor.execCommand('clearDoc');
          g_editor.execCommand('inserthtml', textContent);
        },1500);
      });

      $scope.getReviewDetail = function () {
        var datas = {id: $scope.review_id};
        ReviewService.getReviewDetail(datas).success(function (data) {
          if (data.ret_code == 0) {
            $scope.review_detail = data.data;
            var textContent = html_decode(data.data.content);
            promise1.then(function (textContent) {
              return textContent;
            });
            defer1.resolve(textContent);
          }
        })
      };

      $scope.editorReady = function (editor) {
        $scope.isEditorReady = true;
        var g_editor = editor;
        promise2.then(function (g_editor) {
          return g_editor;
        });
        defer2.resolve(g_editor);
      };

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
          if (data.ret_code == 0) {
            modAlert.success('更新成功！');
            $state.go('article.manage');
          }
        });
      };

      $scope.onUpload = function () {
        modAlert.success('图片上传中...请稍后');
      };

      $scope.fileCallback = function (response) {
        var data = JSON.parse(response.data);
        if (data.ret_code == 0) {
          $scope.review_detail.banner = data.photo_url;
          modAlert.success('图片上传成功！');
        } else {
          modAlert.fail('图片上传失败...请重试：' + data.ret_msg);
        }
      };

      function html_decode(str) {
        var arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"'};
        return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
          return arrEntities[t];
        });
      }

    }]);
});
