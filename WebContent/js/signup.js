/**
 * 회원가입 자바스크립트
 */


$(document).ready(function(){
	
//	//메일인증 받으면 여기에다가 메일인증받은 이메일주소 처리
//	$.ajax({
//		//회원가입아이디 서블릿? 도 만들어서 json처리해주는 jsp또 만들어서 
//		url: "/member/memIdChk.do"
//		,type: "post"
//		,data: $("#signupForm").serialize() //{"action" : "signIdInput"}
//		,dataType: "json"
//		,success: function(data) {
//			console.log(data);
//			idDupCheckResult(data);
//		}
//		,error: function(xhr) {
//			alert("ID 중복검사에 실패했습니다.\n관리자에게 문의해주세요.\n오류코드 : " + xhr.status)
//		}
//	});
//	
	
	//아이디 정규식
	$("#memId").on({
		blur : function() {
			if(idCheck($(this).val())){
				$("#memIdSpan").html("&nbsp;GOOD!")
							   .css("color", "green");
			}else {
//				$("#memIdSpan").html("&nbsp;FAIL!")
//				.css("color", "red");
				alert("영문 대소문자 숫자포함 4~12자리로 입력해주세요😊");
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
//				alert("영문 대소문자 숫자포함 8-12자리 입력해주세요😊");
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
//				alert("입력하신 비밀번호와 일치하지 않습니다😊 다시 입력해주세요");
				$("#memPass").focus();
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
//				alert("중복체크해주세요✅");
				$("#memNicknameSpan").html("&nbsp;중복체크해주세요!!!✅")
							   		 .css("color", "green");
			}else {
//				alert("한글 2~15글자 입력해주세요😊");
				$("#memNicknameSpan").html("&nbsp;한글 2~15글자 입력해주세요❗")
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
	//5~20자의 영문 소문자, 숫자만 사용 가능합니다.
	var idReg = /^[a-z]+[a-z0-9]{5,19}$/g;
	return idReg.test(memId);
}

/**
 * 정규식 패스워드
 */
function passCheck(pass){
	//5~20자의 영문 소문자, 숫자만 사용 가능합니다.
	
	
	console.log(pass);
	var passReg = /^[A-Za-z\d]{8,12}$/;
	return passReg.test(pass);
	
	//!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/.test(password))
	
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
 * 이메일 합치기 
 */
function mergeEmail(){
	var memEmail = $("#email1").val() + "@" + $("#email2").val();
	console.log(memEmail);
	$("#memEmail").val(memEmail);
}

/**
 * 이메일 정규식
 */
function CheckEmail(str){                                                 

     var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

     if(!reg_email.test(str)) {                            
          return false;         
     }                            

     else {                       
          return true;         
     }                            
}   

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
 * 회원가입 빈칸체크
 */
function validateCheck(){
	//이메일 정규식 체크
	var memEmail = $("#email1").val() + "@" + $("#email2").val();
	
	if(!CheckEmail(memEmail))	{
		alert("이메일 형식이 잘못되었습니다");
		$("#email1").focus();
		return;
	} else if(!validateEmailCheck(memEmail)){// 중복체크 했는지도 hidden으로 검사해야함
		alert("이메일 중복체크를 해주세요.");
		$("#email1").focus();
		return false;
	}  
	
	//아이디빈값
	var memId = $("#memId").val();
	if(isEmpty(memId)){
		alert("ID는 필수 입력입니다.");
		$("#memId").focus();
		return false;
	} else if(!idCheck(memId)){
		alert("양식에 맞지 않는 ID입니다.");
		$("#memId").focus();
		return false;
	} else if(!validateDupCheck(memId)){// 중복체크 했는지도 hidden으로 검사해야함
		alert("ID 중복체크를 해주세요.");
		$("#memId").focus();
		return false;
	}
	
	//패스워드 빈값, 양식
	var memPass = $("#pass").val();
	if(isEmpty(memPass)){
		alert("패스워드는 필수 입력입니다.");
		return false;
	}else if(!passCheck(memPass)){
		alert("양식에 맞지 않는 패스워드입니다.");
		$("#pass").focus();
		return false;
	}
	//패스워드 체크
	var memPassChk = $("#memPass").val();
	if(isEmpty(memPassChk)) {
		alert("패스워드를 확인해 주세요.");
		$("#memPass").focus();
		return false;
	}
	
	//별명 빈값,중복체크 유무 
	var memNickname = $("#memNickname").val();
	if(isEmpty(memNickname)){
		alert("별명을 입력해주세요.");
		$("#memNickname").focus();
		return false;
	} else if(!validateNickNameCheck(memNickname)){// 중복체크 했는지도 hidden으로 검사해야함
		alert("별명 중복체크를 해주세요.");
		$("#checkedNcikName").focus();
		return false;
	}
	return true;
}


function signup(){
	if(!validateCheck()) return;
	if(!confirm("회원가입을 하시겠습니까?")) return;
	
	mergeEmail();
	
	$.ajax({
		url: "/member/signup.do"
		,type: "post"
		,data: $("#signupForm").serialize()
		,dataType: "json"
		,success: function(data) {
			console.log(data);
			alert(data[0]);
			//회원가입 완료되면 로그인 페이지로 이동
			$(location).attr('href','http://localhost:9090/member/signin.do');
		}
		,error: function(xhr) {
			alert("회원가입에 실패했습니다. 관리자에게 문의해주세요.\n오류코드 : " + xhr.status)
		}
	});
}

/**
 * 아이디 중복체크 
 */
function idDupCheck(){
	var memId = $("#memId").val();
	if(isEmpty(memId)){
		alert("아이디를 입력하세요");
		$("#memId").focus();
		return;
	}
	
	if(!idCheck(memId)){
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
		alert("별명을 입력해주세요.");
		$("#memNickname").focus();
		return false;
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


/**
 * 이메일 중복체크 
 */
function memEmailDbCheck(){
	
	var email1 = $("#email1").val();
	var email2 = $("#email2").val();
	if(isEmpty(email1)){
		alert("이메일을 입력해주세요.");
		$("#email1").focus();
		return false;
	}else if(isEmpty(email2)){
		alert("주소를 입력해주세요.");
		$("#email2").focus();
		return false;
	}
	
//	var memEmail = $("#email1").val();
//	var memEmail2 = $("#email2").val();
//	if(isEmpty(memEmail)){
//		alert("이메일을 입력해주세요.");
//		$("#email1").focus();
//		return false;
//	}else if(isEmpty(memEmail2)){
//		alert("주소를 입력해주세요.");
//		$("#email2").focus();
//		return false;
//	}
	var memEmail = $("#email1").val() + "@" + $("#email2").val();
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
	} else { // 중복임
		alert("중복되는 이메일입니다. 다른 이메일을 입력해 주세요😥");
		$("#emailSpan").focus();
		$("#emailSpan").html("&nbsp;FAIL!")
		   			   .css("color", "red");
	}
}

