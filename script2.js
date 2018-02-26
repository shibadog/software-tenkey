
$(document).ready(function(){

    var div_id;
    /*
     * フォームをクリックしたとき
     */
        $(document).on('click','.numerickeybord',function(){
          var offset = $( this ).offset();
          var top  = Math.ceil(offset.top)+35;
          var left = Math.ceil(offset.left);
          $(".numkey").remove(); //全部削除
          $(this).blur(); //フォーカスを外す
    
        //数値とアルファベットの配列
           arr_numeric = ['7','8','9','4','5','6','1','2','3','0'];
           arr_alpha   = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    
            var html = '';
            html +='  <div class="numkey">';
            html +='    <table>';
            html +='    <tbody>';
              for(var i=0; i<arr_numeric.length; i++){
                  if(i % 3 == 0) {
                      html +='      <tr>';
                  }
                html +='      <td id="numerickey'+arr_numeric[i]+'" class="numerickey" unselectable="on">'+arr_numeric[i]+'</td>';
                  if(i % 3 == 2) {
                      html +='      </tr>';
                  }
              }
            html +='    <td><a href="#" id="numkeybackspace" class="numerickey_button">BS</a></td>';
            html +='    <td><a href="#" id="numkeyclose" class="numerickey_button">TAB</a></td>';
            html +='    </tr>';
            html +='    </tbody>';
            html +='    </table>';
            html +='  </div>';
    
            $("body").append(html);
            $(".numkey").css({"top":top,"left":left});
             div_id= "#"+$(this).attr("id");
        });
    
    
      //マウスで押したときの処理
        $(document).on('click','.numerickey',function(){
          var id= $(this).attr("id");
          id = id.match(/numerickey(\d+)/)[1];
          var val = $(div_id).val();
          var maxlength = $(div_id).attr("maxLength");
          if(val.length < maxlength){
              $(div_id).val(val+id);
          }
        });
    
      //キーボードを押したとき
        $(document).keydown(function (e) {
          if( $(".numkey").html() !== undefined){
            var keyname = String.fromCharCode(e.which); //押したキーが何か A,B,C....
            var inArr   = $.inArray(keyname, arr_alpha);    //押したキーが何番目の要素か
            var num     = arr_numeric[inArr];
            var val = $(div_id).val();
            var maxlength = $(div_id).attr("maxLength");
            if( num < 10 ){
              if(val.length < maxlength){
                  $(div_id).val(val+num);
              }
            }
          }
        });
    
      //閉じる・クリアボタンを押したとき
        $(document).on('click','.numerickey_button',function(e){
          var id= $(this).attr("id");
          if(id === 'numkeybackspace'){
            var val = $(div_id).val();
            $(div_id).val(val.substr(0,val.length - 1));
          }else if(id === 'numkeyclose'){
            $(".numkey").remove(); //全部削除
            var num = div_id.match(/number(\d+)/)[1];
            if( $("#number" + ++num).html() !== undefined){
                $("#number" + num).focus().click();
            }
          }
          e.preventDefault();
        });
    
    });
    