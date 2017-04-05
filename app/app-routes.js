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
            //��ֵ��ҳ
            .state('home', {
                url: '/home',
                templateUrl: 'view/home.html',
                controllerUrl: 'controller',
                controller: 'homeCtrl',
                dependencies: ['services']
            })
            //ʡ������-����
            .state('detailP', {
                url: '/detail_p',
                templateUrl: 'view/detail_p.html',
                controllerUrl: 'controller',
                controller: 'detailPCtrl'
            })
            //��������-����
            .state('detailG', {
                url: '/detail_g',
                templateUrl: 'view/detail_g.html',
                controllerUrl: 'controller',
                controller: 'detailGCtrl'
            })
            //��ֵ��¼�б�
            .state('rechargeList', {
                url: '/list',
                templateUrl: 'view/list.html',
                controllerUrl: 'controller',
                controller: 'listCtrl',
                dependencies: ['services']
            })
            //��������
            .state('question', {
                url: '/question',
                templateUrl: 'view/question.html',
                controllerUrl: 'controller',
                controller: 'questionCtrl'
            })
            //��ܰ��ʾ
            .state('tips', {
                url: '/tips',
                templateUrl: 'view/kindly_tips.html',
                controllerUrl: 'controller',
                controller: 'tipsCtrl'
            })
            //�������
            .state('error', {
                url: '/error',
                templateUrl: 'view/error.html',
                controllerUrl: 'controller',
                controller: 'errorCtrl'
            })
    }]);
});
