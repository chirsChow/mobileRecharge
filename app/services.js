/**
 * Created by 837781 on 2017/4/5.
 */
define(function (require) {
    var app = require('./app');
    /**
     * carrieroperator:['ChinaMobile', 'ChinaUnion', 'ChinaTelcom']
     */
    app
    //充值历史记录列表
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
    //根据手机号获取流量类型数据，没有手机号则返回默认数据
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
    //创建订单【返回内容】跳转到支付页面，支付后返回到结果页面
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
    //获取订单信息
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
