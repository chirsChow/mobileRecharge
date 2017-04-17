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
            carrier:'',//显示手机号运营商（中国移动）
            dataP: {}//选中的流量充值
        };

        var parse = utils.urlparse();
        var clientSource = parse['clientSource'];//渠道来源
        var subSource = parse['subSource'];//渠道子编号
        
        //提交充值
        $scope.recharge = function () {
            var _mobile = $scope.obj.mobile;
            if (!_mobile || _mobile == '') {
                utils.toast('请输入手机号码');
                return;
            }
            //省内流量
            var radiosP = document.getElementsByName('recharge-radio-p');
            for (var i = 0; i < radiosP.length; i++) {
                if (radiosP[i].checked) {
                    createOrder($scope.obj.dataP[radiosP[i].value]);
                }
            }
            //国内流量
            var radiosG = document.getElementsByName('recharge-radio-g');
            for (var j = 0; j < radiosG.length; j++) {
                if (radiosG[j].checked) {
                    createOrder($scope.obj.dataG[radiosG[j].value]);
                }
            }
        };
        //前端向流量平台发起请求
        function createOrder(item) {
            $rootScope.loading = true;
            //请求参数
            var params = {
                clientSource: clientSource,
                subSource: subSource,
                phone: $scope.obj.mobile,
                itemId: item.itemId,	//产品编号	String	M	基础价格ID
                itemPrice: item.itemPrice,	//产品价格	Float	M	如3.75，表示3.75元
                face: item.face,	//产品名称	String	M	如30M,1G
                resultUrl: location.href	//充值完成后跳转URL	String	O	跳转时会带上orderId参数
            };
            app.get("CreateOrder").create(params).success(function (response) {
                $rootScope.loading = false;
                if (response.isSuccess) {
                    console.log(response);
                    window.location.href = "http://www.baidu.com";
                } else {
                    utils.toast(response.retMsg);
                }
            }).error(function () {
                $state.go('error');
            });
        }

        window.checkMobile = function (obj, length) {
            if (/[^\d]/.test(obj.value)) {
                obj.value = obj.value.replace(/[^\d]/g, '');
            }
            if (obj.value.length > length) {
                obj.value = obj.value.substr(0, length);
            }
            if (obj.value.length < 3) {
                $scope.obj.carrier = '';
            }
            if (obj.value.length == 11) {
                getInitInfo();
            }
        };

        function getInitInfo() {
            $rootScope.loading = true;
            //请求参数
            var params = {
                //clientSource: clientSource,
                //subSource: subSource,
                //phone: $scope.obj.mobile
                clientSource: 3,
                subSource: 'H5test',
                phone: '13926585624'
            };
            app.get("InitInfo").get(params).success(function (response) {
                $rootScope.loading = false;
                if (response.isSuccess) {
                    console.log(response);
                    $scope.obj.carrier = $scope.obj.mobile == ''?'':response.carrier;
                    $scope.obj.itemList = response.itemList;
                    $scope.obj.dataP = response.itemList[0][0];
                    $scope.obj.dataG = response.itemList[0][1];
                } else {
                    utils.toast(response.retMsg);
                }
            }).error(function () {
                $state.go('error');
            });
        }
        getInitInfo();
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
        //loadP();
        //loadG();
        //解决一加手机在顺手付打开H5时第一次不能加载完成的问题
        if (utils.browser().onePlus && !sessionStorage.getItem('onceReload')) {
            window.location.reload();
            sessionStorage.setItem('onceReload', true);
        }
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

