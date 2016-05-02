/**
 * Created by Biousco on 3/22.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('ArticleUpdateCtrl', ['$scope', 'ReviewService', '$stateParams', '$state',
    'modAlert', '$q', 'UserService', 'Upload', 'ProductService',
    function ($scope, ReviewService, $stateParams, $state, modAlert, $q, UserService, Upload, ProductService) {

      $scope.review_id = $stateParams.article_id;
      $scope.isEditorReady = false;


      $scope.file_text = "上传图片";


      $scope.fileCallback = function (response) {
        var data = response.data;
        if (data.ret_code == 0) {
          $scope.review_detail.banner = data.photo_url;
          modAlert.success('图片上传成功！');
          $scope.file_text = "重新上传";
        } else {
          modAlert.fail('图片上传失败...请重试：' + data.ret_msg);
        }
      };

      $scope.upload = function (file) {
        if (file == null) return true;
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


      var g_editor, count = 0;

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
        }, 1500);
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
            $scope.getAuthor(data.data.user_id);
          }
        })
      };

      $scope.getAuthor = function (id) {
        UserService.getUserDetail({id: id}).success(function (data) {
          if (data.ret_code == 0) {
            $scope.Author = data.data;
            $scope.Author.isValid = true;
          } else {
            modAlert.fail('获取用户信息失败：' + data.ret_msg);
          }
        })
      };

      $scope.getProducts = function (str) {
        var deferred = $q.defer();
        var arr;
        if (!str || str == "") {
          arr = [];
          $scope.isRelateProductValid = true;
          deferred.resolve();
        } else {
          arr = str.split(',');
        }
        $scope.RelateProductsList = [];
        var isAll = [];

        $q.all(arr.map(function (v) {
          var defer = $q.defer();
          ProductService.getProductDetail({id: v}).success(function (data) {
            if (data.data !== null && data.data) {
              $scope.RelateProductsList.push(data.data);
              defer.resolve(v);
            } else {
              modAlert.fail('商品id不存在：：' + v);
              defer.reject(v);
            }
          });
          return defer.promise;
        })).then(function () {
          $scope.isRelateProductValid = true;
          deferred.resolve();
        }, function () {
          $scope.isRelateProductValid = false;
          modAlert.fail('请检查关联产品');
          deferred.reject();
        });

        return deferred.promise;
      };


      $scope.editorReady = function (editor) {
        $scope.isEditorReady = true;
        var g_editor = editor;
        promise2.then(function (g_editor) {
          return g_editor;
        });
        defer2.resolve(g_editor);
      };

      /** 商品检测 **/
      function validateGoods(str) {
        var arr = str.split(',');
        var deferred = $q.defer();

        $q.all(arr.map(function (v) {
          var defer = $q.defer();
          ProductService.getProductDetail({id: v}).success(function (data) {
            if (data.data !== null && data.data) {
              defer.resolve(v);
            } else {
              defer.reject(v);
            }
          });
          return defer.promise;
        })).then(function (arrayObj) {
          deferred.resolve();
        }, function (v) {
          modAlert.fail('商品id不存在：' + v);
          deferred.reject();
        });

        return deferred.promise;

      }

      $scope.updateReview = function () {
        if (!$scope.Author || !$scope.Author.isValid) {
          modAlert.fail('请检查文章作者');
          return true;
        }
        var url_reg = /^http/;
        if ($scope.review_detail.origin_url && !url_reg.test($scope.review_detail.origin_url)) {
          $scope.review_detail.origin_url = 'http://' + $scope.review_detail.origin_url;
        }


        $scope.getProducts($scope.review_detail.product_id)
          .then(function () {
            var dataset = {
              id: $scope.review_id,
              user_id: $scope.review_detail.user_id,
              title: $scope.review_detail.title,
              brief: $scope.review_detail.brief,
              content: $scope.review_detail.content,
              banner: $scope.review_detail.banner,
              origin_url: $scope.review_detail.origin_url,
              product_id: $scope.review_detail.product_id
            };
            ReviewService.updateReview(dataset).success(function (data) {
              if (data.ret_code == 0) {
                modAlert.success('更新成功！');
                $state.go('article.manage');
              }
            });
          }, function () {
            return true;
          });
      };


      function html_decode(str) {
        var arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"'};
        return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
          return arrEntities[t];
        });
      }

    }]);
});
