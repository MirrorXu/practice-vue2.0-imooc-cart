'use strict';

/**
 * Created by t on 2017/09/13.
 */

var vm = new Vue({
    el: '#app',
    data: {
        message: 'hello Vue',
        productList: []
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
        }
    }

});

Vue.filter('money', function (v, type) {
    return '￥' + v.toFixed(2) + type;
});
//# sourceMappingURL=cart.js.map
//# sourceMappingURL=cart.js.map