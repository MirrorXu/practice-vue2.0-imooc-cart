/**
 * Created by t on 2017/09/13.
 */
var vm = new Vue({
    el:'#app',
    data:{
        message:'hello Vue',
        productList:[]
    },
    updated:function(){
        var dom = document.getElementById('dom');
        dom.style.color='red';

        alert('updated');
    },
    created:function(){
      //alert('created');
    },
    mounted:function(){
        //this.message = 'Vue hello !!!(数据改变)';
        this.cartView();
    },
    methods:{
        cartView:function(){
            var _this = this;
            this.$http.get('data/cartData.json',{'id':123}).then(function(res){
                console.log('cartdata.json:', res );
                _this.productList = res.data.result.list;
                console.log( _this.productList );
            })
        }
    }
})