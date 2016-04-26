$ = function(ele){
    return document.querySelector(ele);
};

var checkResult = {
    right: false,
    tip: ''
};

var inputEles = [$('#name'),$('#psd'),$('#confirmPsd'),$('#email'),$('#phone')];
var originTip = ['必填，长度为4-16个字符', '6到16位数字和字母', '请再次确认密码', '请输入正确的邮箱地址', '请输入11位手机号码'];

function checkValue(element){
    //输入框为空时
    var str = element.value.trim();
    if(str.length === 0){
        checkResult.right = false;
        checkResult.tip = '输入不能为空';
        return;
    }

    //名称
    if(element === inputEles[0]){
        var reg0 = /^[\u4e00-\u9fa5]?[a-zA-Z0-9]{4,16}$/;
        if(reg0.test(str)){
            checkResult.right = true;
            checkResult.tip = '名称可用';
        }else{
            checkResult.right = false;
            checkResult.tip = '请输入4到16位的不能包含除中文、英文及数字以外的字符';
        }
    }

    //密码
    if(element === inputEles[1]){
        var reg1 = /^[a-zA-Z0-9]{6,16}$/;
        if(reg1.test(str)){
            checkResult.right = true;
            checkResult.tip = '密码可用';
        }else{
            checkResult.right = false;
            checkResult.tip = '请输入6到16位的数字和字母';
        }
    }

    //确认密码
    if(element === inputEles[2]){
        if(str === inputEles[1].value.trim()){
            checkResult.right = true;
            checkResult.tip = '密码正确';
        }else{
            checkResult.right = false;
            checkResult.tip = '两次输入的密码要相同';
        }
    }

    //邮箱
    if(element === inputEles[3]){
        var reg3 = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if(reg3.test(str)){
            checkResult.right = true;
            checkResult.tip = '邮箱格式正确';
        }else{
            checkResult.right = false;
            checkResult.tip = '请输入正确的邮箱地址';
        }
    }

    //手机
    if(element === inputEles[4]){
        var reg4 = /^1\d{10}$/;
        if(reg4.test(str)){
            checkResult.right = true;
            checkResult.tip = '手机号码格式正确';
        }else{
            checkResult.right = false;
            checkResult.tip = '请输入正确的手机号码';
        }
    }
}

for(var i=0;i<inputEles.length;i++){
    inputEles[i].addEventListener('blur',function(e){
        checkValue(e.target);
        var span = e.target.parentElement.getElementsByTagName('span')[0];
        span.innerHTML = checkResult.tip;
        if (checkResult.right) {
            e.target.style.border = '2px solid green';
            span.style.color = 'green';
        } else {
            e.target.style.border = '2px solid red';
            span.style.color = 'red';
        }
    });

    inputEles[i].addEventListener('focus',function(e){
        var index = inputEles.indexOf(e.target);
        var span = e.target.parentElement.getElementsByTagName('span')[0];
        span.innerHTML = originTip[index];
    })
}

$('#submit').addEventListener('click',function(){
    var right = true;
    for (var i = 0; i < inputEles.length; i++) {
        var input = inputEles[i];
        checkValue(input);
        var span = input.parentElement.getElementsByTagName('span')[0];
        span.innerHTML = checkResult.tip;
        if (checkResult.right) {
            input.style.border = '2px solid green';
            span.style.color = 'green';
        } else {
            input.style.border = '2px solid red';
            span.style.color = 'red';
            right = false;
        }
    }
    if (right) {
        alert('提交成功');
    } else {
        alert('提交失败，请检查输入');
    }
});
