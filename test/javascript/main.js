

var app = angular.module('app', []);
app.controller('MainCtrl',function($scope,$http,$timeout) {
    $scope.tesarry=['1','2','3','4','5'];//初始化数据
    $scope.choseArr=[];//定义数组用于存放前端显示
    var str="";//
    var len= $scope.tesarry.length;//初始化数据長度
    var flag='';//是否点击了全选，是为a
    $scope.x=false;//默认未选中
            
    $scope.all= function (c,v) {//全选
        if(c==true){
            $scope.x=true;
            $scope.choseArr=angular.copy(v);
            flag='a';
        }else{
            $scope.x=false;
            $scope.choseArr=[];
            flag='b';
        }
    };

    $scope.chk= function (z,x) {//单选或者多选
        if(flag=='a') {//在全选的基础上操作
            str = $scope.choseArr.join(',') + ',';
        }
        if (x == true) {//选中
            str = str + z + ',';
            flag='c'
                if($scope.choseArr.length==len-1){
                    $scope.master=true
                }
        } else {
            str = str.replace(z + ',', '');//取消选中
        }

        $scope.choseArr=(str.substr(0,str.length-1)).split(',');
        var dex=$scope.choseArr.indexOf("");//判断数组中有没有"",有的话返回值大于等于0，没有返回-1
        if(dex>=0){
            $scope.choseArr.splice(dex,1);//删除数组中的"";
        };
        if($scope.choseArr.length==0){
            $scope.master=false
        };
    };

    $scope.delete= function () {// 操作CURD
        if($scope.choseArr[0]==""||$scope.choseArr.length==0){//没有选择一个的时候提示
            alert("请至少选中一条数据在操作！")
            return;
        };
        for(var i=0;i<$scope.choseArr.length;i++){
            alert($scope.choseArr[i]);
            console.log($scope.choseArr[i]);//遍历选中的id
        }
    };//delete end
});
