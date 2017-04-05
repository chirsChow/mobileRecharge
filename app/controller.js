/**
 * Created by 837781 on 2017/4/5.
 */
define(function (require) {
    var app = require('./app');
    require('./comFilter');
    require('./directive');
    require('./utils');

    //�ֻ���ֵר��
    app.controller('homeCtrl', ['$scope', '$rootScope', '$state', 'utils', function ($scope, $rootScope, $state, utils) {
        $scope.goBack = function () {
            //app.get('closeWindow')();
        };
        window.onBack = function () {
            $scope.goBack();
        };
        $scope.obj = {
            mobile: '',
            dataP: [],//ʡ��������ֵ����
            dataG: [],//ȫ����������ֵ����
        };

        //ʡ��������ֵ����
        function loadP(carrieroperator) {
            if (!carrieroperator || carrieroperator == '') {
                carrieroperator = 'ChinaMobile';
            }
            $scope.obj.dataP = app.get("rechargeTypeService").get(carrieroperator, 'P');
        }

        //ȫ��������ֵ����
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
        //�ύ��ֵ
        $scope.recharge = function () {
            var _mobile = $scope.obj.mobile;
            if (!_mobile || _mobile == '') {
                utils.toast('�������ֻ�����');
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

        //���һ���ֻ���˳�ָ���H5ʱ��һ�β��ܼ�����ɵ�����
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
    //��������
    .controller('questionCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.goBack = function () {
            window.history.back();
        };
        window.onBack = function () {
            $scope.goBack();
        };

        $rootScope.loading = false;

    }])
    //��ܰ��ʾ
    .controller('tipsCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.goBack = function () {
            window.history.back();
        };
        window.onBack = function () {
            $scope.goBack();
        };

        $rootScope.loading = false;

    }])
    //��������-����
    .controller('detailGCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.goBack = function () {
            window.history.back();
        };
        window.onBack = function () {
            $scope.goBack();
        };

        $rootScope.loading = false;

    }])
    //ʡ������-����
    .controller('detailPCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.goBack = function () {
            window.history.back();
        };
        window.onBack = function () {
            $scope.goBack();
        };

        $rootScope.loading = false;

    }])
    //����ҳ��
    .controller('errorCtrl', ['$scope', '$rootScope', 'utils', function ($scope, $rootScope, utils) {
        $scope.goBack = function () {
            //app.get('closeWindow')();
        };
        window.onBack = function () {
            $scope.goBack();
        };

        $rootScope.loading = false;

    }])
    //��ֵ��¼�б�
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

