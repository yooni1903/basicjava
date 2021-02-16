<%@page import="kr.or.ddit.member.vo.MemberVO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% 
// controller에서 resquest에 저장된 값을 가져온다.

	String aa = (String)request.getAttribute("insert");
	if(aa != null){
%>
	{
		"sw" : "가입 완료! 환영합니다."
	}

<%		
	}else{
%>
	{
		
		"sw" : "가입에 실패했습니다. 누락된 항목이 있는지 확인하여 주십시오."
	}

<%
	}

%>