/**
 * 회원가입 메일인증 포함 이게 진짜!!!
 */
$(document).ready(function(){
	
	//이메일 정규식
	$("#memEmail").on({
		blur : function(){
			if(mailCheck($(this).val())){
				$("#emailSpan").html("&nbsp; GOOD!")
							   .css("color","green");
			}else{
				$("#emailSpan").html("&nbsp; FAIL!")
				  	           .css("color","red");
			}
		}
	});
	//아이디 정규식
	$("#memId").on({
		blur : function() {
			if(idCheck($(this).val())){
				$("#memIdSpan").html("&nbsp;GOOD!")
							   .css("color", "green");
			}else {
				$("#memIdSpan").html("&nbsp;FAIL!")
							   .css("color", "red");
			}
		}
	});	
	//패스워드 정규식
	$("#pass").on({
		blur : function() {
			if(passCheck($(this).val())){
				$("#passSpan").html("&nbsp;GOOD!")
							   .css("color", "green");
			}else {
				$("#passSpan").html("&nbsp;FAIL!")
							   .css("color", "red");
			}
		}
	});
	//패스워드 일치 여부
	$("#memPass").on({
		blur : function() {
			if($(this).val() == $("#pass").val()){
				$("#mempassSpan").html("&nbsp;GOOD!")
								 .css("color", "green");
			}else {
				$("#mempassSpan").html("&nbsp;FAIL!")
								 .css("color", "red");
				
			}
		}
	});	
	//닉네임 정규식
	$("#memNickname").on({
		blur : function() {
			if(nickNameReg($(this).val())){
				//정규식 패스하면
				$("#memNicknameSpan").html("&nbsp;중복체크 필수✔")
							   		 .css("color", "green");
			}else {
				$("#memNicknameSpan").html("&nbsp;FAIL!")
							   		 .css("color", "red");
			}
		}
	});	
});
/**
 * 정규식 아이디
 */
function idCheck(memId){
	console.log(memId);
	//영문대,소문자 , 숫자 4 ~12 자리로 입력해 주세요.'
	var idReg = /^[A-Za-z0-9]{4,12}$/;
	return idReg.test(memId);
}
/**
 * 정규식 패스워드
 */
function passCheck(pass){
	console.log(pass);
	var passReg = /^[A-Za-z\d]{8,12}$/;
	return passReg.test(pass);
	
}
/**
 * 정규식 닉네임
 */
function nickNameReg(nickname){
	console.log(nickname);
	var nicknameReg = /^[가-힣]{2,15}$/;
	return nicknameReg.test(nickname);
}

/**
 * 이메일 정규식 체크
 */
function mailCheck(email){
	var mailReg = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
	return mailReg.test(email);
}
///////////////////////////인증키 이메일 + 이메일 중복체크////////////////////////////////////
/**
 * 사용자가 입력한 이메일에 인증번호 전송 기능 
 */
function mailAuth(){

//	//이메일 중복체크
//	memEmailDbCheck();

	//사용자가 입력한 메일주소
	console.log("사용자가 입력한 메일주소 : "+ $('#memEmail').val());
	
	$.ajax({
		url : "/member/mailAuth.do" //핸들러 서블릿주소로 바꾸고
		,type : "post"
		,data : {"userMail" : $("#memEmail").val()} // { "memEmail" : $("#memEmail").val()}
		//사용자가 입력한 메일주소를 키값 "userMail"로 set해서 보냄					
		,dataType : "json"
		,success  : function(data){
			console.log("석세스데이터"+data);
			alert("인증번호가 전송되었습니다😊");
		}
		, error : function(xhr){
			console.log(xhr);
			alert("📌인증번호 전송 실패 ");
		}
	});
}
/**
 *  받은 인증번호를 맞게 썼는지 체크
 *  authChk2.jsp
 */
function authCheck(){
	//인증번호 빈값
	var userAuth = $("#userAuth").val();
	if(isEmpty(userAuth)){
		alert("📌인증번호를 입력해주세요");
		$("#userAuth").focus();
		return false;
	}
	
	$.ajax({
		url : "/member/mailAuthChk.do"
		,type : "post"
		,data : {
			
			"userAuth" : $("#userAuth").val()
		
			} // 사용자가 입력한 인증번호
		,dataType : "json"
		,success : function(data){
			if(data.cnt==1){
				//1이 돌아오면 보낸인증키와 사용자가 입력한 인증키가 같다는것..
				alert("인증번호가 맞습니다😊");
				$("#emailChkSpan").html("&nbsp; GOOD!")
				  			   	  .css("color","green");
				$("#checkedUserAuth").val($("#userAuth").val()); // 회원가입 버튼 클릭시 인증했는지 비교하기 위해
			}else{
				alert("인증번호가 맞지 않습니다😥");
				$("#emailChkSpan").html("&nbsp; FAIL!")
			   	  			      .css("color","red");
				return;
			}
		}	
		,error : function(xhr){
			console.log(xhr);
			alert("인증번호 체크에 실패했습니다."+xhr.status);
		}
	});
}

/**
 * 이메일중복체크
 */
function memEmailDbCheck(){
	var memEmail = $("#memEmail").val();
	
	if(isEmpty(memEmail)){
		alert("📌이메일을 입력해주세요");
		$("#memEmail").focus();
		return false;
	}	
	
	$.ajax({
		//중복체크 핸들러
		url: "/member/memEmailChk.do"
		,type: "post"
		,data: { "memEmail" : memEmail}
		,dataType: "json"
		,success: function(data) {
			console.log(data);
			memEmailDbCheckResult(data);
		}
		,error: function(xhr) {
			alert("이메일 중복검사에 실패했습니다.\n관리자에게 문의해주세요.\n오류코드 : " + xhr.status)
		}
	});
}

/**
 * 이메일 중복체크 후처리
 */
function memEmailDbCheckResult(data) {
	var result = data.cnt;
	if (result == 0) { // 중복아님
		alert("중복되지 않는 이메일입니다. 사용가능👍");
		$("#emailSpan").html("&nbsp;GOOD!")
		   			   .css("color", "green");
		$("#checkedEmail").val($("#memEmail").val()); // 회원가입 버튼 클릭시 중복체크 했는지 비교하기 위해
		mailAuth();
		
	} else { // 중복임
		alert("중복되는 이메일입니다. 다른 이메일을 입력해 주세요😥");
		$("#emailSpan").focus();
		$("#emailSpan").html("&nbsp;FAIL!")
		   			   .css("color", "red");
	}
}
///////////////////////////닉네임 + 아이디 중복체크///////////////////////////////////////
/**
 * 아이디 중복체크 
 */
function idDupCheck(){
	var memId = $("#memId").val();
	if(isEmpty(memId)){
		alert("아이디를 입력하세요");
		$("#memId").focus();
		return;
	}else if(!idCheck(memId)){
		alert("양식에 맞지 않는 ID입니다.")
		$("#memId").focus();
		return;
	}
	
	$.ajax({
		//중복체크 핸들러
		url: "/member/memIdChk.do"
		,type: "post"
		,data: $("#signupForm").serialize()
		,dataType: "json"
		,success: function(data) {
			console.log(data);
			idDupCheckResult(data);
		}
		,error: function(xhr) {
			alert("ID 중복검사에 실패했습니다.\n관리자에게 문의해주세요.\n오류코드 : " + xhr.status)
		}
	});
}

/**
 * 아이디 중복체크 후 처리하는 메서드
 */
function idDupCheckResult(data) {
	var result = data.cnt;
	if (result == 0) { // 중복아님
		alert("중복되지 않는 ID입니다. 사용가능한 ID입니다👍");
		$("#checkedId").val($("#memId").val()); // 회원가입 버튼 클릭시 중복체크 했는지 비교하기 위해
	} else { // 중복임
		alert("중복되는 ID입니다. 다른 ID를 입력해 주세요😥");
		$("#memIdSpan").html("&nbsp;FAIL!")
					   .css("color", "red");
		$("#memId").focus();
	}
}


/**
 * 닉네임 중복체크
 */
function nickNameCheck(){
	var memNickname = $("#memNickname").val();
	if(isEmpty(memNickname)){
		alert("📌별명을 입력해주세요.");
		$("#memNickname").focus();
		return false;
	}else if(!nickNameReg(memNickname)){
		alert("📌한글 2~15글자로 입력해주세요")
		$("#memId").focus();
		return;
	}
	
	$.ajax({
		//중복체크 핸들러
		url: "/member/nickNameChk.do"
		,type: "post"
		,data: $("#signupForm").serialize()
		,dataType: "json"
		,success: function(data) {
			console.log(data);
			nickNameCheckResult(data);
		}
		,error: function(xhr) {
			alert("별명 중복검사에 실패했습니다.\n관리자에게 문의해주세요.\n오류코드 : " + xhr.status)
		}
	});
}

/**
 * 닉네임 중복체크 후처리
 */
function nickNameCheckResult(data) {
	var result = data.cnt;
	if (result == 0) { // 중복아님
		alert("중복되지 않는 별명입니다. 사용가능👍");
		$("#memNicknameSpan").html("&nbsp;GOOD!")
		                     .css("color", "green");
		
		$("#checkedNcikName").val($("#memNickname").val()); // 회원가입 버튼 클릭시 중복체크 했는지 비교하기 위해
	} else { // 중복임
		alert("중복되는 별명입니다. 다른 별명를 입력해 주세요😥");
		$("#memNickname").focus();
		$("#memNicknameSpan").html("&nbsp;FAIL!")
		   				     .css("color", "red");
	}
}
/////////////////////////////////중복체크, 인증검사/////////////////////////////////////////
/**
 * 회원가입 버튼 클릭시 입력 id가 중복체크 되었는지 확인하는 함수
 */
function validateDupCheck(memId) {
	var checkedId = $("#checkedId").val();
	if(memId == checkedId) return true;
	return false;
}

/**
 * 회원가입 버튼 클릭시 입력별명이 중복체크 되었는지 확인하는 함수
 */
function validateNickNameCheck(memNickname){
	var checkedNcikName = $("#checkedNcikName").val();
	if(memNickname == checkedNcikName) return true;
	return false;
}

/**
 * 회원가입 버튼 클릭시 입력이메일이 중복체크 되었는지 확인하는 함수
 */
function validateEmailCheck(memEmail){
	var checkedEmail = $("#checkedEmail").val();
	if(memEmail == checkedEmail) return true;
	return false;
}

/**
 * 회원가입 버튼 클릭시 입력인증번호가 인증되었는지 확인하는 함수
 */
function validateUserAuthCheck(userAuth){
	var checkedUserAuth = $("#checkedUserAuth").val();
	if(userAuth == checkedUserAuth) return true;
	return false;
}

/**
 * 회원가입 빈칸체크
 */
function validateCheck(){
	//이메일 빈값, 중복체크
	var memEmail = $("#memEmail").val();
	
	if(isEmpty(memEmail))	{
		alert("이메일은 필수 입력입니다😊");
		$("#memEmail").focus();
		return false;
	} else if(!mailCheck(memEmail)){
		alert("📌양식에 맞지 않는 이메일입니다");
		$("#memEmail").focus();
		return false;
	} else if(!validateEmailCheck(memEmail)){// 중복체크 했는지도 hidden으로 검사해야함
		alert("📌이메일 인증받기를 눌러주세요");
		$("#memEmail").focus();
		return false;
	}	
	//인증번호 빈값, 인증번호 확인 유무
	var userAuth = $("#userAuth").val();
	
	if(isEmpty(userAuth)){
		alert("이메일 인증은 필수입니다😊");
		$("#userAuth").focus();
		return false;
	}else if(!validateUserAuthCheck(userAuth)){
		alert("인증번호 확인해주세요😥");
		$("#userAuth").focus();
		return false;
	}
	
	//아이디빈값, 중복체크, 정규식
	var memId = $("#memId").val();
	if(isEmpty(memId)){
		alert("ID는 필수 입력입니다😊");
		$("#memId").focus();
		return false;
	} else if(!idCheck(memId)){
		alert("양식에 맞지 않는 ID입니다😥");
		$("#memId").focus();
		return false;
	} else if(!validateDupCheck(memId)){// 중복체크 했는지도 hidden으로 검사해야함
		alert("ID 중복체크를 해주세요😊");
		$("#memId").focus();
		return false;
	}
	
	//패스워드 빈값, 정규식
	var memPass = $("#pass").val();
	if(isEmpty(memPass)){
		alert("패스워드는 필수 입력입니다😊");
		return false;
	}else if(!passCheck(memPass)){
		alert("양식에 맞지 않는 패스워드입니다😥");
		$("#pass").focus();
		return false;
	}
	//패스워드 체크
	var memPassChk = $("#memPass").val();
	if(isEmpty(memPassChk)) {
		alert("패스워드를 확인해 주세요😊");
		$("#memPass").focus();
		return false;
	}else if( !(memPass == memPassChk)){
		alert("패스워드가 일치하지 않습니다😥");
		$("#memPass").focus();
		return false;
	}
	
	//별명 빈값,중복체크 유무 
	var memNickname = $("#memNickname").val();
	if(isEmpty(memNickname)){
		alert("별명을 입력해주세요😊");
		$("#memNickname").focus();
		return false;
	}else if(!nickNameReg(memNickname)){
		alert("📌양식에 맞지 않는 별명입니다"+
			  "\n한글2~15글자 이내로 입력해주세요");
		$("#memNickname").focus();
		return false;
	}else if(!validateNickNameCheck(memNickname)){// 중복체크 했는지도 hidden으로 검사해야함
		alert("별명 중복체크를 해주세요😊");
		$("#nickNameChk").focus();
		return false;
	}	
	return true;
}

/**
 * 회원가입 
 */
//function signup(){
//	if(!validateCheck()) return;
//	if(!confirm("🏡우리의 집🏡 회원가입을 하시겠습니까?")) return;
//	
//	$.ajax({
//		url: "/member/signup.do"
//		,type: "post"
//		,data: $("#signupForm").serialize()
//		,dataType: "json"
//		,success: function(data) {
//			console.log(data);
//			alert(data[0]);
//			//회원가입 완료되면 로그인 페이지로 이동
//			$(location).attr('href','');
//		}
//		,error: function(xhr) {
//			alert("회원가입에 실패했습니다. 관리자에게 문의해주세요.\n오류코드 : " + xhr.status)
//		}
//	});
//}



