'use strict';

/**
 * Created by t on 2017/09/13.
 */
var vm = new Vue({
    el: '#app',
    data: {
        message: 'hello Vue',
        productList: [],
        checkAllFlag: '',
        totalMoney: 0,
        showMd: false,
        productIndex: undefined,
        canGo: false
    },
    updated: function updated() {
        var dom = document.getElementById('dom');
        dom.style.color = 'red';

        // alert('updated');
    },
    created: function created() {
        //alert('created');
    },
    mounted: function mounted() {
        this.$nextTick(function () {
            this.cartView();
        });
    },
    filters: {
        formatMoney: function formatMoney(v) {
            return "￥" + v.toFixed(2);
        }
    },
    methods: {
        cartView: function cartView() {
            var _this = this;
            this.$http.get('data/cartData.json', { 'id': 123 }).then(function (res) {
                console.log('cartdata.json:', res);
                _this.productList = res.data.result.list;
                console.log(_this.productList);
            });
        },
        changeMoney: function changeMoney(product, way) {
            if (way > 0) {
                product.productQuantity++;
            } else {
                product.productQuantity--;
                if (product.productQuantity < 1) {
                    product.productQuantity = 1;
                }
            }
            this.calcTotalMoney();
            // console.log(product.productQuantity);
        },
        selectProduct: function selectProduct(v) {

            if (typeof v.isChecked == 'undefined') {
                // Vue.set(v , 'isChecked' ,true );  // 全局注册
                this.$set(v, 'isChecked', true);
            } else {
                v.isChecked = !v.isChecked;
            }
            if (this.checkAllFlag == true && v.isChecked == false) {
                this.checkAllFlag = v.isChecked;
            }

            console.log(v.isChecked);
            this.calcTotalMoney();
        },
        selectAll: function selectAll() {
            this.checkAllFlag = !this.checkAllFlag;
            var _this = this;
            _this.productList.forEach(function (v, i) {
                if (v.isChecked == 'undefined') {
                    _this.$set(v, 'isChecked', _this.checkAllFlag);
                } else {
                    v.isChecked = _this.checkAllFlag;
                }
            });
            this.calcTotalMoney();
        },
        calcTotalMoney: function calcTotalMoney() {
            var _this = this;
            _this.totalMoney = 0;
            _this.productList.forEach(function (v, i) {
                if (v.isChecked) {
                    _this.totalMoney += v.productQuantity * v.productPrice;
                }
            });
        },
        changeMd: function changeMd() {
            this.showMd = !this.showMd;
        },
        confirmProduct: function confirmProduct(i) {
            this.changeMd();
            this.productIndex = i;
        },
        delProduct: function delProduct() {
            alert('删除当前页第' + (this.productIndex + 1) + '个商品');
            if (this.productIndex != undefined) {
                this.productList.splice(this.productIndex, 1);
                this.changeMd();
                this.productIndex = undefined;
            } else {
                alert('eorr:productIndex', '无法获取到商品参数');
            }
        }
    }

});

// 全局过滤器生命
Vue.filter('money', function (v, type) {
    return '￥' + v.toFixed(2) + type;
});
//# sourceMappingURL=cart.js.map