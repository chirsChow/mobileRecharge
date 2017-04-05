/**
 * Created by 837781 on 2017/4/5.
 */
define(function (require) {
    var app = require('./app');
    require('./comFilter');
    require('./directive');
    require('./utils');

    //手机充值专区
    app.controller('homeCtrl', ['$scope', '$rootScope', '$state', 'utils', function ($scope, $rootScope, $state, utils) {
        $scope.goBack = function () {
            //app.get('closeWindow')();
        };
        window.onBack = function () {
            $scope.goBack();
        };
        $scope.obj = {
            mobile: '',
            dataP: [],//省内流量充值类型
            dataG: [],//全国内流量充值类型
        };

        //省内流量充值类型
        function loadP(carrieroperator) {
            if (!carrieroperator || carrieroperator == '') {
                carrieroperator = 'ChinaMobile';
            }
            $scope.obj.dataP = app.get("rechargeTypeService").get(carrieroperator, 'P');
        }

        //全国流量充值类型
        function loadG(carrieroperator) {
            if (!carrieroperator || carrieroperator == '') {
                carrieroperator = 'ChinaMobile';
            }
            $scope.obj.dataG = app.get("rechargeTypeService").get(carrieroperator, 'G');
        }

        loadP();
        loadG();

        $scope.clearInput = function () {
            $scope.obj.mobile = '';
        };
        //提交充值
        $scope.recharge = function () {
            var _mobile = $scope.obj.mobile;
            if (!_mobile || _mobile == '') {
                utils.toast('请输入手机号码');
                return;
            }
            var radiosP = document.getElementsByName('recharge-radio-p');
            for (var i = 0; i < radiosP.length; i++) {
                if (radiosP[i].checked) {
                    console.log(radiosP[i].value);
                }
            }
            var radiosG = document.getElementsByName('recharge-radio-g');
            for (var i = 0; i < radiosG.length; i++) {
                if (radiosG[i].checked) {
                    console.log(radiosG[i].value);
                }
            }
        };

        window.checkMobile = function (obj, length) {
            if (/[^\d]/.test(obj.value)) {
                obj.value = obj.value.replace(/[^\d]/g, '');
            }
            if (obj.value.length > length) {
                obj.value = obj.value.substr(0, length);
            }
            var t = utils.checkMobile(obj.value);
            loadP(t.name);
            loadG(t.name);
        };

        //解决一加手机在顺手付打开H5时第一次不能加载完成的问题
        if (utils.browser().onePlus && !sessionStorage.getItem('onceReload')) {
            window.location.reload();
            sessionStorage.setItem('onceReload', true);
        }

        function getInitInfo() {
            $rootScope.loading = true;
            app.get("InitInfo").get({}).success(function (response) {
                $rootScope.loading = false;
                if (response.isSuccess == 'true') {
                    console.log(response);
                } else {
                    utils.toast(response.retMsg);
                }
            }).error(function () {
                $state.go('error');
            });
        }
        getInitInfo();
    }])
    //常见问题
    .controller('questionCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.goBack = function () {
            window.history.back();
        };
        window.onBack = function () {
            $scope.goBack();
        };

        $rootScope.loading = false;

    }])
    //温馨提示
    .controller('tipsCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.goBack = function () {
            window.history.back();
        };
        window.onBack = function () {
            $scope.goBack();
        };

        $rootScope.loading = false;

    }])
    //国内流量-详情
    .controller('detailGCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.goBack = function () {
            window.history.back();
        };
        window.onBack = function () {
            $scope.goBack();
        };

        $rootScope.loading = false;

    }])
    //省内流量-详情
    .controller('detailPCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.goBack = function () {
            window.history.back();
        };
        window.onBack = function () {
            $scope.goBack();
        };

        $rootScope.loading = false;

    }])
    //错误页面
    .controller('errorCtrl', ['$scope', '$rootScope', 'utils', function ($scope, $rootScope, utils) {
        $scope.goBack = function () {
            //app.get('closeWindow')();
        };
        window.onBack = function () {
            $scope.goBack();
        };

        $rootScope.loading = false;

    }])
    //充值记录列表
    .controller('listCtrl', ['$scope', '$rootScope', '$state', 'utils', function ($scope, $rootScope, $state, utils) {
        $scope.goBack = function () {
            window.history.back();
        };
        window.onBack = function () {
            $scope.goBack();
        };

        $scope.list = [];

        $scope.finish = false;
        var page = 1;
        var pageSize = 10;
        getList(page, pageSize);
        document.querySelector('.showList').addEventListener('scroll', function () {
            if (this.scrollHeight - this.clientHeight - this.scrollTop < 70 && $scope.finish) {
                page++;
                getList(page, pageSize);
            }
        });

        function getList(page, pageSize) {
            $scope.finish = false;
            $rootScope.loading = true;
            app.get("rechargeListService").get(page, pageSize).success(function (response) {
                $rootScope.loading = false;
                utils.toast(response.returnMsg);
                if (response.resultCode == '00') {
                    if (response.data.length > 0) {
                        $scope.list = $scope.list.concat(response.data);
                    }
                    $scope.finish = true;
                } else {
                    $state.go('error');
                }
            }).error(function () {
                $state.go('error');
            });
        }

    }]);
});

