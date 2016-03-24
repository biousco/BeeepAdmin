/**
 * Created by Biousco on 3/24.
 */
define(['./app'], function (app) {
  'use strict';
  app.constant('cgiList', {
    AdminLogin: '/Admin/User/Login',
    AdminLogout: '/Admin/User/Logout',
    addProduct: '/Admin/Product/Add',
    deleteProduct: '/Admin/Product/Delete',
    getProductList:'/Admin/Product/List',
    getProductDetail:'/Admin/Product/GetDetail',
    updateProduct:'/Admin/Product/Update',
    addReview: '/Admin/Review/Add',
    deleteReview: '/Admin/Review/Delete',
    getReviewList: '/Admin/Review/All',
    getReviewDetail: '/Admin/Review/GetDetail',
    updateReview: '/Admin/Review/Update',
    getTrialList:'/Admin/Trial/All',
    updateTrial:'/Admin/Trial/Update',
    getUserList:'/Admin/User/Update',
    getUserDetail:'/Admin/User/Update',
    updateUser:'/Admin/User/Update'
  })
});
