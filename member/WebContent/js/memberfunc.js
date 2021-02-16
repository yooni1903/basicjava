/**
 * 
 */
function okpro(vinput){
    vsp = $(vinput).parents('.form-group').find('.sp');

    $(vsp).empty();     // 체크 이미지가 쌓이는 것을 방지하기 위해 비우고 시작한다.
    $('<img>', {
        'src' : '../images/check.png',
        'width' : '20px',
        'height' : '20px'
    }).appendTo(vsp);

    // '올바른 형식이 아닙니다' 메세지 지우기
    $(vinput).parents('.form-group').find('.msg').html("");
}

function nopro(vinput, text){
    $(vinput).parents('.form-group').find('.msg').html(text).css('color', 'red');

    $(vinput).parents('.form-group').find('.sp').empty();

}



function idcheck(){
    idvalue = $('#id').val().trim();

    if(idvalue.length < 1){
        alert("id를 입력하세요.");
        return false; // return false를 줘야 종료함.
    }

    
    $.post( // 단축메뉴에는 type, error는 쓰지 않는다.
        '/member/ID.do',
        { "id" : idvalue},
        function(res){
            $('#idspan').html(res.sw).css('color', 'red');
        },
        'json'
    )
    
    
    /*$.ajax({
        url : '/member/ID.do',   // class이름과 servlet이름을 잘 구분할 줄 알아야한다!
        type : 'post',
        data : { "id" : idvalue},
        success : function(res){
            $('#idspan').html(res.sw).css('color', 'red');
        },
        error : function(xhr){
            alert("상태 : " + xhr.status);
        },
        dataType : 'json'
    })*/
}

// 우편 번호 검색 - modal - 별도의 이벤트 핸들러 없음.
//  <button class="btn btn-success btn-sm" data-toggle="modal" data-target="#myModal" id="mzipbtn" type="button">번호검색(modal)</button>

// 우편 번호 modal에서 동 입력 후 확인버튼 클릭 이벤트
function dongsearch(){
    // 입력한 값 가져오기
    dongvalue = $('#dong').val().trim();

    // 서버로 전송(요청)
    // servlet으로 가야한다. /context Root/servlet
    $.ajax({
        url : '/member/DongSearch.do',
        data : {"dong" : dongvalue},
        type : 'post',
        success : function(res){

            code = "<table border='1' class='table table-bordered'>";
            code += "<tr><td>우편번호</td>";
            code += "<td>주소</td>";
            code += "<td>번지</td></tr>";

            $.each(res, function(i, v){
                code += "<tr class='ziptr'><td>" + v.code + "</td>";
                code += "<td>" + v.addr + "</td>";
                code += "<td>" + v.bunji + "</td></tr>";
            })

            code += "</table>";

            $('#result1').html(code);

        },
        error : function(xhr){
            alert("상태 : " + xhr.status);    
        },
        dataType : 'json'
    })
    // 200(응답은 성공했으나, 응답 형식이 잘못된 경우(json parsing이 잘못된 경우)), 404, 403
}


// modal 결과에서 원하는 행(주소)를 선택했을 때 이벤트
// 동적으로 새롭게 생성된 요소 - delegate 방식
function zipselect(tt){

    // 선택
    zipcode = $('td:eq(0)', tt).text();			// 외부 스크립트에서는 this가 없으므로 파라미터로 넘겨준다.
    addr = $('td:eq(1)', tt).text();

    // form에 출력
    $('#zip').val(zipcode);
    $('#add1').val(addr);

    // modal 창 닫기
    $('#myModal').modal('hide');

    // modal 창 내용 지우기
    $('#dong').val("");				// html(""); remove(); - 요소도 지우기 empty(); - 안에 있는 내용만 지우기
    $('#result1').empty();
}

// 제출버튼 클릭 이벤트
//         $('button[type=submit]').on('click', function(){})
// 		  $('button:submit').on('click', function(){

// 		  })
//		  $('form').on('submit',function(){})
  function fsubmit(){
      // submit의 고유기능을 방지(전송 막음)
      event.preventDefault();
     /*  
      // 입력한 모든 값(9개)을 가져온다 - val()
      idvalue = $('#id').val().trim();
      namevalue = $('#name').val().trim();
      hpvalue = $('#hp').val().trim();
      birvalue = $('#bir').val().trim();
      emailvalue = $('#email').val().trim();
      passvalue = $('#pwd').val().trim();
      zipvalue = $('#zip').val().trim();
      add1value = $('#add1').val().trim();
      add2value = $('#add2').val().trim();

      datas = {
              "mem_id" : idvalue, 
              "mem_name" : namevalue,
              "mem_hp" : hpvalue,
              "mem_bir" : birvalue,
              "mem_email" : emailvalue,
              "mem_pass" : passvalue,
              "mem_zip" : zipvalue,
              "mem_add1" : add1value,
              "mem_add2" : add2value
              }

      console.log(datas);

      datas = "mem_id=" + idvalue + "&mem_name=" + namevalue + "&mem_pass=" 
                + "&mem_pass=" + passvalue + "&mem_mail=" + emailvalue + "&mem_bir=" + birvalue
                + "&mem_zip=" + zipvalue + "&mem_add1" + add1value + "$mem_add2" + add2value;
      console.log(datas);
       */
       console.log($('#ff').serialize());	// 자동으로 문자열로 함쳐주는 메서드
       console.log($('#ff').serializeArray());
       console.log($('#ff').serializeJSON());	// serializeJSON을 쓰려면 외부 스크립트가 필요하다.

      $.ajax({
          url : '/member/Insert.do',
          method : 'post',
          data : $('#ff').serializeJSON(),
          success : function(res){
              $('#subspan').html(res.sw).css('color', 'red');
          },
          error : function(xhr){
              alert("상태 : " + xhr.status);
          },
          dataType : 'json'
      })



  }