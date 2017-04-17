'use strict';
define(['app'],function (app) {
		app
		.filter('subStrForStar_phone', function () {//用*替换一些字符
			return function (input) {
				if (input == null || typeof(input) == "undefined"){
					return "";
				}
				if (input.length > 3) {
					var s = input.substring(0, 3);
					var e = input.substring(input.length - 4, input.length);
					return s + "****" + e;
				}
				return input;
			};
		})
		.filter('AvaBalance', function () {//可用余额格式化(单位是分)
			return function (input) {
				if (input == null || typeof(input) == "undefined") {
					return "";
				}
				return parseFloat(input / 100).toFixed(2);
			};
		})

		//金额前的人民币符号
		.filter('RMBPrefix', function () {
			return function (input) {
				if (input == null || typeof(input) == "undefined") {
					return "";
				}
				return input + "元";
			};
		});
});
