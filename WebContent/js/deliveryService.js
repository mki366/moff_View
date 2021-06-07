   
   
   



function modalhide(){
	//location.href='DeliveryServicePage.html'
	$('#myModal').modal('hide'); 
}


//모달이 뜰시에 추가
//주문번호에 해당하는 모든상품
function modalshow(ordernum) {
	//alert(ordernum);
	/* 
	<th>상품명</th><th>상품수량</th><th>상품가격</th><th>배달비용</th><th>무게</th> */
	
	$.ajax({
		url:"http://localhost:3000/orderdetail",
		type:"get",
		data:{ obNum:ordernum },
		success: function (orderdetail) {
			//alert("success");
			
			$(".list_add").remove();
			//주문번호에 대한 상품들 모두 출력
			$.each(orderdetail, function (i, val) {
				var add = "<tr class = 'list_add'>";
				add += "<td>" + val.prodName +"</td>";
				add += "<td>" + val.quantity +"</td>";
				
				// 금액 문자열 3번째 자리마다 콤마추가
				var exprice = String(val.price);
				var laprice = exprice.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');	
				
				// 배송비
				var excost = String(val.deliveryCost);
				var lacost = excost.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
				
				//전체 배송비
				var allcost = parseInt(val.deliveryCost);
					
				
				
				//alert(allcost);
				var exallcost  = String(allcost).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
				//뽀이가 받을 배송비 80%
				var boycost = allcost * 0.8;
				var exboycost = String(boycost).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
				
				
				
				add += "<td>" + laprice +"</td>";
				add += "<td>" + val.weight +"kg</td>";
				add += "</tr>";
				
				$(".orderdetail").append(add);
				
				$(".alldelicost").html(exallcost);
				$(".boycost").html(exboycost);
				
			
				
			});
		}
		
	});
	
	
}


$(".order2").click(function () {
	
	var ordernum  =  $(this).attr('value');
	//alert(ordernum);
	

	//$("#ordernum").html(ordernum);	
});


function appendnumber(number){
	//alert("주문번호:"+ number);
	$("#appendnumber1").html("<input type='hidden' class='obnum' type='text' value="+number+">");
}

//나의 배송목록 배송 상태 변경
function appendnumberMy(number,phone){
	//alert("주문번호:"+ number);
	
	
	$("#appendnumber2").html("<input type='hidden' class='obnum2' type='text' value="+number+">");
	$("#appendPhone").html("<input type='hidden' class='phonenum' type='text' value="+phone+">");


}


function appendnumberBuy(number,phone){
	//alert("주문번호:"+ number);
	
	
	$("#appendnumber3").html("<input type='hidden' class='obnum3' type='text' value="+number+">");
	$("#appendPhone3").html("<input type='hidden' class='phonenum2' type='text' value="+phone+">");


}

//뽀이가 배송중

function godeliveryTotal(){
	godelivery();
	godelisms();
}
//뽀이가 배송완료
function deliveryendTotal(){
	deliveryend();
	enddelisms();
}


function godelivery(){
	let login = JSON.parse(sessionStorage.getItem("login"));
	let deliid =  login.id;
	let deliphone = login.phone;
	let deliname = login.name;
	let ordernum  =  $(".obnum2").val();
	
	
	$.ajax({
		
		url:"http://localhost:3000/godelivery",
		type: "post",
		data: { obNum:ordernum, 
				id:deliid,
				name:deliname ,
				phone: deliphone },
		success:function(result){
			//alert("success");
			
			if(result == "success"){
				alert("배송중으로 변경하였습니다. 고객에게 배송중 알림이 전달되었습니다.");
				//새로고침
				location.reload(true);
			}else{
				alert("배송중 변경을 실패하였습니다.");
			}
			
		},
		error:function(){
			alert("error");
			
			
			
			
		}
	});
}

//배송중입니다
function godelisms(){
	
	let formnumber = $(".phonenum").val();
	
	  
	
	$.ajax({
		
		url:"http://localhost:3000/deliverysms",
		type:'post',
		data:{'from': formnumber, 'text':'안녕하세요. MOFF입니다. 배송이 시작되었습니다.' },
		success: function(dto) {
			//alert("success");
			
			
		},
		error:function(){
			alert('error');
		}
	}); 
	
	
	
}

//배송완료
function deliveryend(){
	let login = JSON.parse(sessionStorage.getItem("login"));
	let deliid =  login.id;
	let deliphone = login.phone;
	let deliname = login.name;
	let ordernum  =  $(".obnum2").val();
	
	
	$.ajax({
		
		url:"http://localhost:3000/deliveryend",
		type: "post",
		data: { obNum:ordernum, 
				id:deliid,
				name:deliname ,
				phone: deliphone },
		success:function(result){
			//alert("success");
			
			if(result == "success"){
				alert("배송완료로 변경하였습니다. 고객에게  알림이 전달되었습니다.");
				//새로고침
				location.reload(true);
			}else{
				alert("배송완료 변경을 실패하였습니다.");
			}
			
		},
		error:function(){
			alert("error");
			
			
			
			
		}
	});
}

//배송완료입니다
function enddelisms(){
	
	let formnumber = $(".phonenum").val();
	
	  
	
	$.ajax({
		
		url:"http://localhost:3000/deliverysms",
		type:'post',
		data:{'from': formnumber, 'text':'안녕하세요. MOFF입니다. 주문하신 상품이 배송 완료되었습니다.' },
		success: function(dto) {
			//alert("success");
			
			
		},
		error:function(){
			alert('error');
		}
	}); 
	
	
	
}







//뽀이가 상품 배달 수락
function addDelivery(){
	let login = JSON.parse(sessionStorage.getItem("login"));
	let deliid =  login.id;
	let deliphone = login.phone;
	let deliname = login.name;
	
	
	
	//alert(login.id);
	//alert("확인합니다");
	let ordernum  =  $(".obnum").val();
	//alert(ordernum);
	
	//상품 배달시 넘겨야되는 데이터
	/*
	 
	  1. 아이디
	  2. 이름
	  3. 전화번호
	  4. 주문번호
	  
	 */
	//체크박스 데이터 가져오기
	var check1 = document.getElementById('check1').checked;
	var check2 = document.getElementById('check2').checked;
	var check3 = document.getElementById('check3').checked;

	
    if(!check1){
        alert('약관1에 동의해 주세요');
        return false;
    } 
    else if(!check2) {
        alert('약관2에 동의해 주세요');
        return false;
    }
    else if(!check3) {
        alert('약관3에 동의해 주세요');
        return false;
    }else{
	
	
	
	$.ajax({
		
		url:"http://localhost:3000/deliAccept",
		type: "post",
		data: { obNum:ordernum, 
				id:deliid,
				name:deliname ,
				phone: deliphone },
		success:function(result){
			//alert("success");
			
			if(result == "success"){
				alert("배송을 수락하였습니다. 나의 배송목록을 확인하세요.");
				//새로고침
				location.reload(true);
			}else{
				alert("배송 수락을 실패하였습니다.");
			}
			
		},
		error:function(){
			alert("error");
			
			
			
			
		}
		
		
	});
    
    }//else end
    
    
}



//배송완료입니다
function BuyBacksms (){
	
	let formnumber = $(".phonenum2").val();
	
	  
	
	$.ajax({
		
		url:"http://localhost:3000/deliverysms",
		type:'post',
		data:{'from': formnumber, 'text':'MOFF입니다. 바이백 서비스가 수락되었습니다. 곧 방문시간 관련 연락이 갈 예정입니다.' },
		success: function(dto) {
			//alert("success");
			
			
		},
		error:function(){
			alert('error');
		}
	}); 
	
	
	
}

//뽀이가 바이백 서비스 수락
function addBuyBack(){
	let login = JSON.parse(sessionStorage.getItem("login"));
	let deliid =  login.id;
	let deliphone = login.phone;
	let deliname = login.name;
	
	
	
	//alert(login.id);
	//alert("확인합니다");
	let ordernum  =  $(".obnum3").val();
	//alert(ordernum);
	
	//상품 배달시 넘겨야되는 데이터
	/*
	 
	  1. 아이디
	  2. 이름
	  3. 전화번호
	  4. 주문번호
	  
	 */
	//체크박스 데이터 가져오기
	var check1 = document.getElementById('check4').checked;
	var check2 = document.getElementById('check5').checked;
	var check3 = document.getElementById('check6').checked;

	
    if(!check1){
        alert('약관1에 동의해 주세요');
        return false;
    } 
    else if(!check2) {
        alert('약관2에 동의해 주세요');
        return false;
    }
    else if(!check3) {
        alert('약관3에 동의해 주세요');
        return false;
    }else{
	
	
	
	$.ajax({
		
		url:"http://localhost:3000/acceptBuyBack",
		type: "post",
		data: { bNum:ordernum, 
				bId:deliid,
				bName:deliname ,
				bPhone: deliphone },
		success:function(result){
			//alert("success");
			
			if(result == "success"){
				alert("서비스를 수락하였습니다. 고객에게 연락하여 방문시간을 잡으세요.");
				BuyBacksms();
				//새로고침
				//location.reload(true);
			}else{
				alert("서비스 수락을 실패하였습니다.");
			}
			
		},
		error:function(){
			alert("error");
			
			
			
			
		}
		
		
	});
    
    }//else end
    
    
}

//바이백 서비스 리스트
function buyback(pNumber){
	
	//alert($("._choice3").val());
	
	$.ajax({
		
		url:"http://localhost:3000/TotalBuyBack",
		type: "post",
		data: {  choice:$("._choice3").val(),
			    search:$("._searchWord3").val(),
				visitdate:"visitboy" ,
				searchDate: $("#searchdate").val(),
				page: pNumber
			 },
		success:function(TotalBuyBack){
			//alert("success");
			
			
			$(".appendajaxdata").remove();
			$.each(TotalBuyBack, function (i, val) {
				
				// 1,000 정규식사용
				
				var price = String(val.price);
				var exprice = price.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');	
				
				// return 가격 
				// 바이백 환불 가격 정리
				var per = (val.condition) / 100;
				var returnprice = String((val.price)*per);
				var ex_returnprice = returnprice.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');	
				
				//날짜 변환
				var exDate = val.bDate.substring(0,10);
				
			app = "<div class='appendajaxdata'>"
			app += "<div class='row'>";
			
		app +=	"<div class='col-md-6 col-sm-6 col-sm-12'>"
				+ "<div class='our-order payment-details pr-20'>"
				+	"<h4 class='title-1 title-border text-uppercase mb-30'>바이백 신청 견적서</h4>"
				+	"<table>"
				+		"<thead>"
				+			"<tr>"
				+				"<th><strong>신청번호</strong></th>"
				+				"<th class='text-right'><strong>" + val.bNum + "</strong></th>"
				+			"</tr>"
				+		"</thead>"
				+		"<tbody>"
				+		"<tr>"
				+				"<td>상품고유번호/대분류/소분류</td>"
				+				"<td  class='text-right'>" + val.prodNum + "/" + val.category + "/" + val.subCategory + "</td>"
				+			"</tr>"
				+			"<tr>"
				+				"<td>상품 원가</td>"
				+				"<td class='text-right'>"+ exprice +"</td>"
				+			"</tr>"
				+			"<tr>"
				+				"<td>상품 컨디션</td>"
				+				"<td class='text-right'>" + val.condition +"%</td>"
				+			"</tr>"
				+			"<tr>"
				+				"<td>바이백 리턴 가격</td>"
				+				"<td class='text-right'>" + ex_returnprice +" 원</td>"
				+			"</tr>"
				+		"</tbody>"
			+		"</table>"
		+		"</div>"
		+	"</div>"
		+	"<!-- payment-method -->"
		+	"<div class='col-md-6 col-sm-6 col-sm-12 mt-xs-30'>"
		+		"<div class='payment-method  pl-20'>"
		+			"<h4 class='title-1 title-border text-uppercase mb-30'>신청자 정보</h4>"
		+			"<div class='payment-accordion'>"
		+				"<!-- Accordion start  -->"
		+				"<!-- <h3 class='payment-accordion-toggle active'>바이백 서비스 신청정보 </h3>"
		+				"<div class='payment-content default'>"
		+				"</div>  -->"
		+				"<!-- Accordion end -->"
		+				"<!-- Accordion start -->"
		+				" <a class='collapsed' data-toggle='collapse' href='.accor-content-" + i + "'  aria-expanded='false' ><h3 class='payment-accordion-toggle'>바이백 신청자 정보</h3>"
		+				 "<div class='accor-content-"+ i +" panel-collapse collapse'  aria-expanded='false'>"
		+							"<table>"
		+							"<thead>"
		+								"<tr>"
		+									"<th>주소</th>"
		+								"</tr>"
		+								"<tr>"
		+									"<td style='padding-bottom: 10px;'>"+ val.bAddress +"</td>"
		+								"</tr>"
		+							"</thead>"
		+							"<tbody>"
		+								"<tr>"
		+									"<th><strong>전화번호</strong></th>"
		+								"</tr>"
		+								"<tr>"
		+									"<td style='padding-bottom: 10px;'>"+ val.memPhone +"</td>"
		+								"</tr>"
		+								"<tr>"
		+									"<th>요청 방문 날짜</th>"
		+							"	</tr>"
		+								"<tr>"
		+									"<td>"+ exDate +"</td>"
		+								"</tr>"
		+							"</tbody>"
		+						"</table>"
		+				"</div>"
		+				"<!-- Accordion end -->" 
		+				"<button class='btn btn-danger'  onclick=''>정보보기</button>&nbsp;&nbsp;"	;
						if(val.bResult == " "){
							app += "<button class='btn btn-warning' data-toggle='modal' data-target='#buybackModal'  onclick=appendnumberBuy("+ val.bNum + ",'" + val.memPhone +"')>수락하기</button>";
						}else if(val.bResult == "서비스수락"){
							app += "<button class='btn btn-default' disabled='disabled'  data-toggle='modal' data-target='#buybackModal' >수락완료</button>";
						}
						
	app	+=			"</div>"														
		+		"</div>	"
	+		"</div>"
	+	"</div>"
	+	"<hr>"
	+   "</div>";
			
		
		$(".appendbuyback").append(app);
		
		
			});//foreach
			
		},
		error:function(){
			alert("error");
			
			
			
			
		}
		
		
	});
	
}


function pagination3(){
	
	var searchdate = $("#searchdate").val();
	//alert(searchdate);
	
	$.ajax({
		url:"http://localhost:3000/TotalBuyBackCount",
		type:"post",
		data:{ page:0,
			  choice:$("._choice3").val(),
			  search:$("._searchWord3").val(),
			  visitdate:"visitboy" ,
			  searchDate:$("#searchdate").val()
			  },
			  
		success:function( pagenum ){
			//alert("페이지 확인:" + pagenum);
			
			//페이지가 아예 없지 않을시에
			if(pagenum != 0 ){
				var page = "<div class='pagination' style='margin-top: 50px;'>";
				page += "<ul>"
				page += "<li ><a href='#' ><i class='zmdi zmdi-long-arrow-left'></i></a></li>";
				
				//페이징 생성
				for( pageN = 0; pageN < pagenum; pageN++ ){
					if(pagenum == pageN){
						page += "<li><a>" + (pageN + 1) +"</a> </li>";
					}else if(pagenum != pageN){
						page += "<li><a href='#'  onclick=buyback("+ pageN +")> "+ (pageN + 1) + "</a></li>";
					}
				}//for end
				
				page += "<li><a href='#'><i class='zmdi zmdi-long-arrow-right'  onclick=buyback("+ pageN +")></i></a></li>";
				page += "</ul>";
				page += "</div>";
				
				$("#makepagination3").html(page);
			}//if end
			
			
		},
		error:function(){
			alert('error');
		}		
	});
}

//나의 마이백 서비스 리스트
function mybuyback(pNumber){
	

	let login = JSON.parse(sessionStorage.getItem("login"));
	let deliid =  login.id;
	
	$.ajax({
		
		url:"http://localhost:3000/MyBuyBack",
		type: "post",
		data: { 
				id:deliid,
			    choice:$("._choice4").val(),
			    search:$("._searchWord4").val(),
				visitdate:"visitboy" ,
				searchDate: $("#searchdate2").val(),
				page: pNumber
			 },
		success:function(TotalBuyBack){
			//alert("success");
			
			
			$(".appendajaxdata1").remove();
			$.each(TotalBuyBack, function (i, val) {
				
				// 1,000 정규식사용
				
				var price = String(val.price);
				var exprice = price.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');	
				
				// return 가격 
				// 바이백 환불 가격 정리
				var per = (val.condition) / 100;
				var returnprice = String((val.price)*per);
				var ex_returnprice = returnprice.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');	
				
				//날짜 변환
				var exDate = val.bDate.substring(0,10);
				
			app = "<div class='appendajaxdata1'>"
			app += "<div class='row'>";
			
		app +=	"<div class='col-md-6 col-sm-6 col-sm-12'>"
				+ "<div class='our-order payment-details pr-20'>"
				+	"<h4 class='title-1 title-border text-uppercase mb-30'>바이백 신청 견적서</h4>"
				+	"<table>"
				+		"<thead>"
				+			"<tr>"
				+				"<th><strong>신청번호</strong></th>"
				+				"<th class='text-right'><strong>" + val.bNum + "</strong></th>"
				+			"</tr>"
				+		"</thead>"
				+		"<tbody>"
				+		"<tr>"
				+				"<td>상품고유번호/대분류/소분류</td>"
				+				"<td  class='text-right'>" + val.prodNum + "/" + val.category + "/" + val.subCategory + "</td>"
				+			"</tr>"
				+			"<tr>"
				+				"<td>상품 원가</td>"
				+				"<td class='text-right'>"+ exprice +"</td>"
				+			"</tr>"
				+			"<tr>"
				+				"<td>상품 컨디션</td>"
				+				"<td class='text-right'>" + val.condition +"%</td>"
				+			"</tr>"
				+			"<tr>"
				+				"<td>바이백 리턴 가격</td>"
				+				"<td class='text-right'>" + ex_returnprice +" 원</td>"
				+			"</tr>"
				+		"</tbody>"
			+		"</table>"
		+		"</div>"
		+	"</div>"
		+	"<!-- payment-method -->"
		+	"<div class='col-md-6 col-sm-6 col-sm-12 mt-xs-30'>"
		+		"<div class='payment-method  pl-20'>"
		+			"<h4 class='title-1 title-border text-uppercase mb-30'>신청자 정보</h4>"
		+			"<div class='payment-accordion'>"
		+				"<!-- Accordion start  -->"
		+				"<!-- <h3 class='payment-accordion-toggle active'>바이백 서비스 신청정보 </h3>"
		+				"<div class='payment-content default'>"
		+				"</div>  -->"
		+				"<!-- Accordion end -->"
		+				"<!-- Accordion start -->"
		+				" <a class='collapsed' data-toggle='collapse' href='.accor-content-" + i + "'  aria-expanded='false' ><h3 class='payment-accordion-toggle'>바이백 신청자 정보</h3>"
		+				 "<div class='accor-content-"+ i +" panel-collapse collapse'  aria-expanded='false'>"
		+							"<table>"
		+							"<thead>"
		+								"<tr>"
		+									"<th>주소</th>"
		+								"</tr>"
		+								"<tr>"
		+									"<td style='padding-bottom: 10px;'>"+ val.bAddress +"</td>"
		+								"</tr>"
		+							"</thead>"
		+							"<tbody>"
		+								"<tr>"
		+									"<th><strong>전화번호</strong></th>"
		+								"</tr>"
		+								"<tr>"
		+									"<td style='padding-bottom: 10px;'>"+ val.memPhone +"</td>"
		+								"</tr>"
		+								"<tr>"
		+									"<th>요청 방문 날짜</th>"
		+							"	</tr>"
		+								"<tr>"
		+									"<td>"+ exDate +"</td>"
		+								"</tr>"
		+							"</tbody>"
		+						"</table>"
		+				"</div>"
		+				"<!-- Accordion end -->" 
		+				"<button class='btn btn-danger'  onclick=''>정보보기</button>&nbsp;&nbsp;"	;
						if(val.bResult == " "){
							app += "<button class='btn btn-warning' data-toggle='modal' data-target='#buybackModal'  onclick=appendnumberBuy("+ val.bNum + ",'" + val.memPhone +"')>수락하기</button>";
						}else if(val.bResult == "서비스수락"){
							app += "<button class='btn btn-default' disabled='disabled'  data-toggle='modal' data-target='#buybackModal' >수락완료</button>";
						}
						
	app	+=			"</div>"														
		+		"</div>	"
	+		"</div>"
	+	"</div>"
	+	"<hr>"
	+   "</div>";
			
		
		$(".appendmybuyback").append(app);
		
		
			});//foreach
			
		},
		error:function(){
			alert("error");
			
			
			
			
		}
		
		
	});
	
}


function pagination4(){
	
	var searchdate = $("#searchdate").val();
	
	let login = JSON.parse(sessionStorage.getItem("login"));
	let deliid =  login.id;
	//alert(searchdate);
	
	$.ajax({
		url:"http://localhost:3000/MyBuyBackCount",
		type:"post",
		data:{ 
			id:deliid,
			page:0,
			  choice:$("._choice4").val(),
			  search:$("._searchWord4").val(),
			  visitdate:"visitboy" ,
			  searchDate:$("#searchdate2").val()
			  },
			  
		success:function( pagenum ){
			//alert("페이지 확인:" + pagenum);
			
			//페이지가 아예 없지 않을시에
			if(pagenum != 0 ){
				var page = "<div class='pagination' style='margin-top: 50px;'>";
				page += "<ul>"
				page += "<li ><a href='#' ><i class='zmdi zmdi-long-arrow-left'></i></a></li>";
				
				//페이징 생성
				for( pageN = 0; pageN < pagenum; pageN++ ){
					if(pagenum == pageN){
						page += "<li><a>" + (pageN + 1) +"</a> </li>";
					}else if(pagenum != pageN){
						page += "<li><a href='#'  onclick=mybuyback("+ pageN +")> "+ (pageN + 1) + "</a></li>";
					}
				}//for end
				
				page += "<li><a href='#'><i class='zmdi zmdi-long-arrow-right'  onclick=mybuyback("+ pageN +")></i></a></li>";
				page += "</ul>";
				page += "</div>";
				
				$("#makepagination4").html(page);
			}//if end
			
			
		},
		error:function(){
			alert('error');
		}		
	});
}
