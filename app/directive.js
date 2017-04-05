define(function (require) {
    var app = require('app');
    app
        .directive('headTitle', ['$rootScope', '$timeout', '$window', 'utils', function ($rootScope, $timeout, $window, utils) {
            return {
                restrict: 'AE',
                scope: {
                    showBackbtn: '@',//返回按钮是否显示true false
                    backTitle: '@',//"返回"按钮名称
                    appTitle: '@',//当前页面标题
                    finishTitle: '@',//"完成"按钮名称
                    goBack: '&',//返回事件
                    finishGo: '&',//完成
                    theme: '@'
                },
                replace: true,
                template: '<header class="header tc" ng-style="syPayIOSHeaderStyle" ng-class="theme">' +
                '<span class="icon-font btn-prev" ng-click="goBack()">&#xe600;</span>' +
                '<h1 ng-bind="appTitle"></h1>' +
                '<span class="btn-next" ng-click="finishGo()" ng-bind="finishTitle"></span>' +
                '</header>',
                link: function ($scope) {
                    if (utils.browser().weChat) {
                        if (utils.browser().android) {
                            document.title = $scope.appTitle;
                        } else {
                            //js修改iOS微信浏览器的title标签
                            document.title = $scope.appTitle;
                            var titleFrame = document.createElement("iframe");
                            titleFrame.src = '/favicon.ico';
                            titleFrame.style.display = "none";
                            document.body.appendChild(titleFrame);
                            $window.onload = function () {
                                titleFrame.parentNode.removeChild(titleFrame);
                            };
                        }
                        document.getElementsByTagName("section")[0].style.paddingTop = "0";
                        document.getElementsByTagName("header")[0].remove();
                    }
                }
            }
        }])
        /* Loading 遮罩层 */
        .directive('loading', function () {
            return {
                restrict: 'AE',
                template:
                '<div class="cg-busy-default-wrapper" ng-show="loading">' +
                    '<div class="cg-busy-mask"></div>' +
                        //'<div class="cg-busy-default-spinner">' +
                            //'<img src="images/ring-alt.gif" style="width:30px;height:30px;" alt="loading" />' +
                           '<iframe class="cg-busy-default-spinner" src="images/loading.svg" frameborder="0"></iframe>' +
                            //'<div class="loadEffect">'+
                            //    '<span></span>'+
                            //    '<span></span>'+
                            //    '<span></span>'+
                            //    '<span></span>'+
                            //    '<span></span>'+
                            //    '<span></span>'+
                            //    '<span></span>'+
                            //    '<span></span>'+
                            //'</div>'+
                            //'<p ng-bind="loadingTips"></p>' +//loading中的提示语
                        //'</div>' +
                    '</div>' +
                '</div>'
            };
        });
});