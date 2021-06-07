//전체회원 조회
allmemberList(0);
getallmemberList();


// bbslist을 취득
function allmemberList( pNumber ) {
	
	$.ajax({
		url:"http://localhost:3000/allmemberList",
		type:"get",
		data:{ page:pNumber, choice:$("#_choice").val(), search:$("#_searchWord").val() },
		success:function( allmemberList ){
			//alert('success');
		//	alert(list);
		
	    $(".list_col").remove();
		if(allmemberList == ""){
			let app = "<tr class='list_col'>";
			app += "<td colspan='8'>회원이 없습니다.</td>";
			app += "</tr>";
			
			$("#_list_table").append(app);	
			
		}else{
			$.each(allmemberList, function (i, val) {
				
				/* 
				<th>회원번호</th><th>회원이름</th><th>회원아이디</th>
				<th>닉네임</th><th>주소</th><th>전화번호</th><th>생년월일</th>
				<th>회원구분</th> */
				
				
				
				let app = "<tr class='list_col'>"
							+ "<td>" + (i + 1) + "</td>";

					app += "<td>" +val.name + "</td>";
					app += "<td>" + val.id + "</td>";
					app += "<td>" + val.nickname + "</td>";
					app += "<td>" + val.address + "</td>";
					app += "<td>" + val.phone + "</td>";
					app += "<td>" + val.bdate + "</td>";
					if (val.memberType == 1) {
						app += "<td style='color: blue'>배달기사</td>"
					}else{
						app += "<td>일반회원</td>";	
					}
					
					app += "</tr>";
						
				$("#_list_table").append(app);	
			});	
		}//else end
		
		},
		error:function(){
			alert('error');
		}
	});
}


// 글의 총수를 취득
function getallmemberList() {
	
	$.ajax({
		url:"http://localhost:3000/getallmemberList",
		type:"get",
		data:{ page:0, choice:$("#_choice").val(), search:$("#_searchWord").val() },
		success:function( count ){
		//	alert('success');
		//	alert(count);
			loadPage(count);
		},
		error:function(){
			alert('error');
		}		
	});
}





deliverymanList(0);
deliveryman();

//검색
$("#btnSearch").click(function(){
	deliverymanList(0);
	deliveryman();
});

// bbslist을 취득
function deliverymanList( pNumber ) {
	
	$.ajax({
		url:"http://localhost:3000/deliverymanList",
		type:"get",
		data:{ page:pNumber, choice:$("#_choice").val(), search:$("#_searchWord").val() },
		success:function( deliverymanList ){
			//alert('success');
		//	alert(list);
		
	    $(".list_col").remove();
		if(deliverymanList == ""){
			let app = "<tr class='list_col'>";
			app += "<td colspan='8'>회원이 없습니다.</td>";
			app += "</tr>";
			
			$("#_list_table2").append(app);	
			
		}else{
			$.each(deliverymanList, function (i, val) {
				
				/* 
					<th>신청번호</th><th>신청자</th><th>주소</th><th>전화번호</th><th>생년월일</th>
					<th>승인여부</th>

				*/
				//배달기사만 명단에 정리
			
				if(val.memberType == 1){
				let app = "<tr class='list_col'>"
							+ "<td>" + (i + 1) + "</td>";

					app += "<td>" + val.name + "</td>";
					app += "<td>" + val.address + "</td>";
					app += "<td>" + val.phone + "</td>";
					app += "<td>" + val.bdate + "</td>";
					if (val.deliveryAdmi == 0) {
						app += "<td style='color: red'>미승인</td>"
					}else{
						app += "<td style='color: blue'>승인</td>";	
					}
					app += "<td><a href='DeliveryAdmiDataCheck.html?memNum=" + val.memNum + "'>" +  "신청서" + "</a></td>";
					app += "</tr>";
				
						
				$("#_list_table2").append(app);	
				}
			});	
		}//else end
		
		},
		error:function(){
			alert('error');
		}
	});
}


// 글의 총수를 취득
function deliveryman() {
	
	$.ajax({
		url:"http://localhost:3000/deliveryman",
		type:"get",
		data:{ page:0, choice:$("#_choice").val(), search:$("#_searchWord").val() },
		success:function( count ){
		//	alert('success');
		//	alert(count);
			//loadPage(count);
		},
		error:function(){
			alert('error');
		}		
	});
}





    

