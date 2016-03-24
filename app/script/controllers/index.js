/** attach controllers to this module
 * if you get 'unknown {x}Provider' errors from angular, be sure they are
 * properly referenced in one of the module dependencies in the array.
 * below, you can see we bring in our services and constants modules
 * which avails each controller of, for example, the `config` constants object.
 **/
define([
  './Auth/LoginCtrl',
  './Auth/LogoutCtrl',
  './goods/GoodsCtrl',
  './goods/GoodsReleaseCtrl',
  './goods/GoodsRackingCtrl',
  './goods/GoodsOutdateCtrl',
  './goods/GoodsTrialCtrl',
  './goods/GoodsNewTrialCtrl',
  './goods/GoodsUpdateCtrl',
  './operation/BannerManageCtrl',
  './article/ArticleManageCtrl',
  './article/ArticlePostCtrl',
  './article/ArticleUpdateCtrl',
  './account/AccountMediaCtrl',
  './account/AccountNormalCtrl',
  './order/OrderALlListCtrl',
  './common/DialogCtrl'
], function () {});
