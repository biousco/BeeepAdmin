/**
 * Created by Biousco on 3/24.
 */
define(['./app'], function (app) {
  'use strict';
  app.constant('cgiList', {
    AdminLogin: '/Admin/Admin/Login',
    AdminLogout: '/Admin/Admin/Logout',
    addProduct: '/Admin/Product/Add',
    deleteProduct: '/Admin/Product/deleteProduct',
    getProductList:'/Admin/Product/All',
    getProductDetail:'/Admin/Product/GetDetail',
    updateProduct:'/Admin/Product/Update',
    addBatch: '/Admin/Batch/Add',
    updateBatch: '/Admin/Batch/Update',
    deleteBatch: '/Admin/Batch/Delete',
    getBatch: '/Admin/Batch/GetBatches',
    addReview: '/Admin/Review/Add',
    deleteReview: '/Admin/Review/Update',
    getReviewList: '/Admin/Review/All',
    getReviewDetail: '/Admin/Review/GetDetail',
    updateReview: '/Admin/Review/Update',
    getTrialList:'/Admin/Trial/All',
    updateTrial:'/Admin/Trial/Update',
    getUserList:'/Admin/User/All',
    getUserDetail:'/Admin/User/GetDetail',
    updateUser:'/Admin/User/Update',
    getBannerList: '/Admin/Banner/All',
    addBaner: '/Admin/Banner/Add',
    updateBanner: '/Admin/Banner/Update',
    getBannerDetail: '/Admin/Banner/GetDetail',
    deleteBanner: '/Admin/Banner/Delete',
    uploadFile: '/Admin/File/Upload'
  });
  app.constant('CON_goodsRelate', {
    'buy_channel': ['Amazon','indiegogo','kickstarter','ebay','自定义'],
    'currency_type': ['USD'],
    'price_map': {
      'USD': '$'
    }
  });
});
