/**
 * Created by 837781 on 2017/4/5.
 */
define(function (require) {
    var app = require('./app');
    require('./comFilter');
    require('./directive');
    require('./utils');

    //手机充值专区
    app.controller('homeCtrl', ['$scope', '$rootScope', '$state', '$http', '$window', 'utils', function ($scope, $rootScope, $state, $http, $window, utils) {
        $scope.goBack = function () {
            window.history.back();
        };
        window.onBack = function () {
            $scope.goBack();
        };
        $scope.obj = {
            mobile: '',
            carrier:'',//显示手机号运营商
            model:'0',//初始选择第一个
            selectedItem: null//选中的流量充值
        };

        var parse = utils.urlparse();
        var clientSource = parse['clientSource'];//渠道来源
        var subSource = parse['subSource'];//渠道子编号
        $scope.obj.mobile = parse['phone'];//带过来的手机号


        $scope.select = function (item) {
            $scope.obj.selectedItem = item;
            for (var i = 0; i < $scope.obj.selectedItem.length; i++) {
                var desc = $scope.obj.selectedItem[i].simpleDesc;
                $scope.obj.selectedItem[i].simpleDesc = eval("'" + desc + "'");
            }
        };
        
        //提交充值
        $scope.recharge = function (type) {
            var _mobile = $scope.obj.mobile;
            if (!_mobile || _mobile == '') {
                utils.toast('请输入手机号码');
                return;
            }
            for (var i = 0; i < $scope.obj.selectedItem.length; i++) {
                if (type === $scope.obj.selectedItem[i].type) {
                    createOrder($scope.obj.selectedItem[i]);
                    break;
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
                itemPrice: item.price,	//产品价格	Float	M	如3.75，表示3.75元
                face: item.face,	//产品名称	String	M	如30M,1G
                openid:'',
                resultUrl: location.origin + "?clientSource=" + clientSource + "&subSource" + subSource + "&phone=" + $scope.obj.mobile + "&",
                type: item.type,//流量使用范围限制
                areaLimit: item.areaLimit,//充值地限制
                timeLimit: item.timeLimit//充值时间限制
            };
            app.get("CreateOrder").create(params).success(function (response) {
                $rootScope.loading = false;
                if (response.status === '0000') {
                    console.log(response);
                    window.location.href = response.payUrl;
                    return;
                }
                switch (response.status) {
                    case "-1"://	异常
                        utils.toast(response.retMsg || "系统异常");
                        break;
                    case "0001"://	流量包不存在
                        utils.toast(response.retMsg || "流量包不存在");
                        break;
                    case "0002"://	此渠道不存在此流量包
                        utils.toast(response.retMsg || "此渠道不存在此流量包");
                        break;
                    case "0003"://	流量包价格不正确
                        utils.toast(response.retMsg || "流量包价格不正确");
                        break;
                    case "0004"://	提交支付失败
                        utils.toast(response.retMsg || "提交支付失败");
                        break;
                    case "0005"://	流量包不存在
                        utils.toast(response.retMsg || "流量包不存在");
                        break;
                    default :
                        utils.toast(response.retMsg || "系统异常");
                        break;
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
        };

        $scope.getInitInfo = function () {
            var _mobile = $scope.obj.mobile;
            if (_mobile == '' || _mobile && _mobile.length === 11) {
                $rootScope.loading = true;
                //请求参数
                var params = {
                    clientSource: clientSource,
                    subSource: subSource,
                    phone: _mobile
                };
                app.get("InitInfo").get(params).success(function (response) {
                    $rootScope.loading = false;
                    console.log(response);
                    $scope.obj.carrier = response.carrier;//运营商
                    if (response.isSuccess) {
                        $scope.obj.itemList = response.itemList;
                        //取第一次项为默认选中项
                        $scope.obj.model = '0';
                        for (var i in response.itemList) {
                            $scope.select(response.itemList[i]);
                            break;
                        }
                    } else {
                        utils.toast(response.retMsg);
                    }
                }).error(function () {
                    $state.go('error');
                });
            }
        };
        $scope.getInitInfo();
        //加载广告数据
        $scope.advData = {"top":[],"middle":[],"bottom":[],"left":[],"right":[]};
        $http({url: 'adv/config.json'}).then(function(data) {
            var _data = data.data;
            var curTime = new Date();//当前时间
            for (var position in $scope.advData) {
                for (var i = 0; i < _data[position].length; i++) {
                    if (_data[position][i].show && curTime > new Date(Date.parse(_data[position][i].startDate)) && curTime < new Date(Date.parse(_data[position][i].expiringDate))) {
                        $scope.advData[position].push(_data[position][i]);
                    }
                }
            }
        }, function() {
            alert("广告配置文件出错");
        });
        //关闭广告
        $scope.closeAdv = function(position, index){
            $scope.advData[position][index].show = false;
        };
        //点击广告跳转
        $scope.link = function(link) {
            if (link && link != '') {
                $window.location = link;
            }
        };
        //判断是否是网络图片地址
        $scope.hasScheme = function (imgUrl) {
            return imgUrl && (imgUrl.indexOf("http") !== -1 || imgUrl.indexOf("https") !== -1);
        };
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

