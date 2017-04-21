/**
 * Created by 837781 on 2017/4/5.
 */
define(function (require) {
    var app = require('./app');
    /**
     * carrieroperator:['ChinaMobile', 'ChinaUnion', 'ChinaTelcom']
     */
    app
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
                    url: "/charge/front/getHistory"
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
                    url: "/charge/front/orderInfo"
                });
            }
        };
    }]);
});
