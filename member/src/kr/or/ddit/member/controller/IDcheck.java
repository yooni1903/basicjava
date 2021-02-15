package kr.or.ddit.member.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.or.ddit.member.service.IMemberService;
import kr.or.ddit.member.service.MemberServiceImpl;

/**
 * Servlet implementation class IDcheck
 */
@WebServlet("/ID.do") 	// ajax에서 쓸 때, $.ajax({url : 'ID.do')}로 써야한다.
public class IDcheck extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public IDcheck() {
        super();
        // TODO Auto-generated constructor stub
    }

	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		// 1. 클라이언트 요청시 전송되는 값을 리턴
		//    1-1. 입력한 id값을 받는다.
		String userId = request.getParameter("id");  // id는 ajax에서 $.ajax({ url : , data : { "id" : } }) data 부분에서 사용하는 이름과 같다.
		
		// 2. service 객체를 얻는다.
		IMemberService service = MemberServiceImpl.getService();
		
		// 3. service 메소드 호출 - 결과값 받기
		String result = service.selectById(userId);
		
		// 4. 결과값을 request에 저장(setter로 저장하고)
		request.setAttribute("dkanrjsk", result);
		
		// 5. view 페이지로 forward한다. (getter로 가져온다.)
		RequestDispatcher disp = request.getRequestDispatcher("member/idcheck.jsp");
		disp.forward(request, response);
	}

}
