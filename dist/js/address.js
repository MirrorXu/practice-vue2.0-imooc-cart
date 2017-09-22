'use strict';

var vm = new Vue({
    el: '.container',
    data: {
        addrList: '',
        limitedNum: 2,
        curIndex: ''

    },
    mounted: function mounted() {
        this.$nextTick(function () {
            this.view();
        });
    },
    filters: {
        // addrFilter:function ( v , n ) {
        //     return v.filter(function (v , i) {
        //         if( i < n){
        //             return true;
        //         }else{
        //             return false ;
        //         }
        //     })
        // }

    },
    computed: {
        addrListFilter: function addrListFilter() {
            return this.addrList.slice(0, this.limitedNum);
        }

    },
    methods: {
        view: function view() {
            var _this = this;
            this.$http.get('data/address.json').then(function (res) {
                if (res.data.status === 0) {
                    // console.log( res.data );
                    _this.addrList = res.data.result;
                    console.log(_this.addrList);
                }
            });
        },
        changelimitedNum: function changelimitedNum(i) {
            if (this.limitedNum < this.addrList.length) {

                this.limitedNum += i;
            } else {
                this.limitedNum += 0;
                alert('没有更多了...');
            }

            // alert(this.limitedNum)
        },
        setDef: function setDef(i) {
            this.addrList.forEach(function (v, index) {
                if (i === index) {
                    v.isDefault = true;
                } else {
                    v.isDefault = false;
                }
            });
        },
        delAddr: function delAddr(i) {
            this.addrList.splice(i, 1);
        }

    }

});
//# sourceMappingURL=address.js.map