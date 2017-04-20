/**
 * Created by 837781 on 2017/4/5.
 */
define(function (require) {
    var app = require('./app');
    /**
     * carrieroperator:['ChinaMobile', 'ChinaUnion', 'ChinaTelcom']
     */
    app.service('rechargeTypeService', ['$http', function ($http) {
        return {
            get: function (carrieroperator, type) {
                //�ƶ�ʡ����������
                var dataMobileP = [
                    {
                        'title': '2M',
                        'price': '1.00'
                    },
                    {
                        'title': '10M',
                        'price': '3.00'
                    },
                    {
                        'title': '30M',
                        'price': '5.00'
                    },
                    {
                        'title': '70M',
                        'price': '10.00'
                    },
                    {
                        'title': '100M',
                        'price': '15.00'
                    },
                    {
                        'title': '150M',
                        'price': '20.00'
                    },
                    {
                        'title': '300M',
                        'price': '20.00'
                    },
                    {
                        'title': '500M',
                        'price': '30.00'
                    },
                    {
                        'title': '1G',
                        'price': '50.00'
                    },
                    {
                        'title': '2G',
                        'price': '70.00'
                    }
                ];
                //��ͨʡ����������
                var dataUnicomP = [
                    {
                        'title': '20M',
                        'price': '3.00'
                    },
                    {
                        'title': '30M',
                        'price': '4.00'
                    },
                    {
                        'title': '50M',
                        'price': '6.00'
                    },
                    {
                        'title': '100M',
                        'price': '10.00'
                    },
                    {
                        'title': '200M',
                        'price': '15.00'
                    },
                    {
                        'title': '300M',
                        'price': '20.00'
                    },
                    {
                        'title': '500M',
                        'price': '30.00'
                    },
                    {
                        'title': '1G',
                        'price': '50.00'
                    }
                ];
                //����ʡ����������
                var dataTelecomP = [
                    {
                        'title': '5M',
                        'price': '1.00'
                    },
                    {
                        'title': '10M',
                        'price': '2.00'
                    },
                    {
                        'title': '30M',
                        'price': '5.00'
                    },
                    {
                        'title': '50M',
                        'price': '7.00'
                    },
                    {
                        'title': '100M',
                        'price': '10.00'
                    },
                    {
                        'title': '200M',
                        'price': '15.00'
                    },
                    {
                        'title': '500M',
                        'price': '30.00'
                    },
                    {
                        'title': '1G',
                        'price': '50.00'
                    },
                    {
                        'title': '2G',
                        'price': '70.00'
                    },
                    {
                        'title': '3G',
                        'price': '100.00'
                    }
                ];
                //�ƶ�ȫ����������
                var dataMobileG = [
                    {
                        'title': '2M',
                        'price': '1.00'
                    },
                    {
                        'title': '10M',
                        'price': '3.00'
                    },
                    {
                        'title': '30M',
                        'price': '5.00'
                    },
                    {
                        'title': '70M',
                        'price': '10.00'
                    },
                    {
                        'title': '100M',
                        'price': '15.00'
                    },
                    {
                        'title': '150M',
                        'price': '20.00'
                    },
                    {
                        'title': '300M',
                        'price': '20.00'
                    },
                    {
                        'title': '500M',
                        'price': '30.00'
                    },
                    {
                        'title': '1G',
                        'price': '50.00'
                    },
                    {
                        'title': '2G',
                        'price': '70.00'
                    }
                ];
                //��ͨȫ����������
                var dataUnicomG = [
                    {
                        'title': '20M',
                        'price': '3.00'
                    },
                    {
                        'title': '30M',
                        'price': '4.00'
                    },
                    {
                        'title': '50M',
                        'price': '6.00'
                    },
                    {
                        'title': '100M',
                        'price': '10.00'
                    },
                    {
                        'title': '200M',
                        'price': '15.00'
                    },
                    {
                        'title': '300M',
                        'price': '20.00'
                    },
                    {
                        'title': '500M',
                        'price': '30.00'
                    },
                    {
                        'title': '1G',
                        'price': '50.00'
                    }
                ];
                //����ȫ����������
                var dataTelecomG = [
                    {
                        'title': '5M',
                        'price': '1.00'
                    },
                    {
                        'title': '10M',
                        'price': '2.00'
                    },
                    {
                        'title': '30M',
                        'price': '5.00'
                    },
                    {
                        'title': '50M',
                        'price': '7.00'
                    },
                    {
                        'title': '100M',
                        'price': '10.00'
                    },
                    {
                        'title': '200M',
                        'price': '15.00'
                    },
                    {
                        'title': '500M',
                        'price': '30.00'
                    },
                    {
                        'title': '1G',
                        'price': '50.00'
                    },
                    {
                        'title': '2G',
                        'price': '70.00'
                    },
                    {
                        'title': '3G',
                        'price': '100.00'
                    }
                ];

                var data = {
                    'P': {
                        'ChinaMobile': dataMobileP,
                        'ChinaUnion': dataUnicomP,
                        'ChinaTelcom': dataTelecomP
                    },
                    'G': {
                        'ChinaMobile': dataMobileG,
                        'ChinaUnion': dataUnicomG,
                        'ChinaTelcom': dataTelecomG
                    }
                };
                return data[type][carrieroperator];
            }
        };
    }])
    //��ֵ��ʷ��¼�б�
    .service('rechargeListService', ['$http', function ($http) {
        return {
            get: function (page, pageSize, phone) {
                return $http({
                    method: 'POST',
                    data: {
                        page: page,
                        pageSize: pageSize,
                        phone: phone
                    },
                    url: "/front/getHistory"
                });
            }
        };
    }])
    //�����ֻ��Ż�ȡ�����������ݣ�û���ֻ����򷵻�Ĭ������
    .service('InitInfo', ['$http', function ($http) {
        return {
            get: function (params) {
                return $http({
                    method: 'POST',
                    data: {
                        clientSource: params.clientSource,
                        subSource: params.subSource,
                        phone: params.phone
                    },
                    url: "/charge/getInitInfoForFlowNew"
                });
            }
        };
    }])
    //�����������������ݡ���ת��֧��ҳ�棬֧���󷵻ص����ҳ��
    .service('CreateOrder', ['$http', function ($http) {
        return {
            create: function (params) {
                return $http({
                    method: 'POST',
                    data: {
                        clientSource: params.clientSource,
                        subSource: params.subSource,
                        phone: params.phone,
                        itemId: params.itemId,
                        itemPrice: params.itemPrice,
                        face: params.face,
                        openid: params.openid,
                        resultUrl: encodeURIComponent(params.resultUrl),
                        type: params.type,
                        areaLimit: params.areaLimit,
                        timeLimit: params.timeLimit
                    },
                    url: "/charge/createOrderForFlow"
                });
            }
        };
    }])
    //��ȡ������Ϣ
    .service('OrderInfo', ['$http', function ($http) {
        return {
            get: function (orderId) {
                return $http({
                    method: 'POST',
                    data: {
                        orderId: orderId
                    },
                    url: "/front/orderInfo"
                });
            }
        };
    }]);
});
