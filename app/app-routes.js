define(function (require) {
    var app = require('./app');

    require('./directive');

    require('./utils');

    app.run(['$rootScope', function ($rootScope) {
        $rootScope.$on('$stateChangeStart', function () {

        });
    }]);

    app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        $httpProvider.defaults.transformRequest = function (obj) {
            var str = [];
            for (var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        };

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            //充值首页
            .state('home', {
                url: '/home',
                templateUrl: 'view/home.html',
                controllerUrl: 'controller',
                controller: 'homeCtrl',
                dependencies: ['services']
            })
            //省内流量-详情
            .state('detailP', {
                url: '/detail_p',
                templateUrl: 'view/detail_p.html',
                controllerUrl: 'controller',
                controller: 'detailPCtrl'
            })
            //国内流量-详情
            .state('detailG', {
                url: '/detail_g',
                templateUrl: 'view/detail_g.html',
                controllerUrl: 'controller',
                controller: 'detailGCtrl'
            })
            //充值记录列表
            .state('rechargeList', {
                url: '/list',
                templateUrl: 'view/list.html',
                controllerUrl: 'controller',
                controller: 'listCtrl',
                dependencies: ['services']
            })
            //常见问题
            .state('question', {
                url: '/question',
                templateUrl: 'view/question.html',
                controllerUrl: 'controller',
                controller: 'questionCtrl'
            })
            //温馨提示
            .state('tips', {
                url: '/tips',
                templateUrl: 'view/kindly_tips.html',
                controllerUrl: 'controller',
                controller: 'tipsCtrl'
            })
            //错误界面
            .state('error', {
                url: '/error',
                templateUrl: 'view/error.html',
                controllerUrl: 'controller',
                controller: 'errorCtrl'
            })
    }]);
});
