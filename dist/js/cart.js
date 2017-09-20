'use strict';

/**
 * Created by t on 2017/09/13.
 */
var vm = new Vue({
    el: '#app',
    data: {
        message: 'hello Vue',
        productList: [],
        checkAllFlag: ''
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

            console.log(product.productQuantity);
        },
        selectProduct: function selectProduct(v) {
            if (typeof v.isChecked == 'undefined') {
                // Vue.set(v , 'isChecked' ,true );  // 全局注册
                this.$set(v, 'isChecked', true);
            } else {
                v.isChecked = !v.isChecked;
            }

            console.log(v.isChecked);
        },
        selectAll: function selectAll() {
            this.checkAllFlag = !this.checkAllFlag;
            var _this = this;
            if (this.checkAllFlag) {
                this.productList.forEach(function (v, i) {
                    if (v.isChecked == 'undefined') {
                        _this.$set(v, 'isChecked', _this.checkAllFlag);
                    } else {
                        v.isChecked = _this.checkAllFlag;
                    }
                });
            }
        }
    }

});

// 全局过滤器生命
Vue.filter('money', function (v, type) {
    return '￥' + v.toFixed(2) + type;
});
//# sourceMappingURL=cart.js.map