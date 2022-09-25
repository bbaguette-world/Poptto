$(function(){
    $('input.num_only').on('keyup',function(){
        var sum5 = parseFloat($("#fn_flag_price").val() || 0);
        var sum = (sum5 * 100).toFixed(5);
        $("#fn_total").val(sum);
    });
});

$(function(){
    $('input.sell_only').on('keyup',function(){
        var sum5 = parseFloat($("#fn_sell_price").val() || 0);
        var sum = (((sum5 * 9) / 10) / 100).toFixed(5);
        $("#sell_total").val(sum);
    });
});

$(function(){
    $('input.reward_only').on('keyup',function(){
        var sum5 = parseFloat($("#fn_reward_price").val() || 0);
        if(sum5 >= 0 && sum5 <= 2) {
        var sum = ((getReward / 300) * sum5).toFixed(5);}
        if(sum5 >= 3 && sum5 <= 5) {
        var sum = ((getReward / 100) * sum5).toFixed(5);}
        if(sum5 == 6) {
        var sum = ((getReward / 7) * sum5).toFixed(5);}
        $("#reward_total").val(sum);
    });
});

function editedUpdateDiv(){
    $( "#edit" ).load(location.reload() + " #edit" );
}



function loadingProcess(){
  openLoading();


}


function openLoading() {

    let maskHeight = $(document).height();
    
    let maskWidth = window.document.body.clientWidth;

    let mask ="<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>";

    let loadingImg ='';
    loadingImg += "<div id='loadingImg' style='position:absolute; top: calc(2000px); width:100%; z-index:99999999;'>";
    loadingImg += " <img src='./loading.gif' style='position: relative; display: block; margin: 0px auto;'/>";
    loadingImg += "<div style='text-align:center; font-size: 30px; color: red'>Please Wait...</div>"
    loadingImg += "</div>"; 

    $('body')
        .append(mask)
        .append(loadingImg)

    $('#mask').css({
            'width' : maskWidth,
            'height': maskHeight,
            'opacity' :'0.3'
    });

    $('#mask').show();  

    $('#loadingImg').show();
}


function closeLoading() {
    $('#mask, #loadingImg').hide();
    $('#mask, #loadingImg').empty(); 
}