package kr.or.ddit.member.service;

import java.sql.SQLException;
import java.util.List;
/*
  	dao 객체를 얻어온다 - 생성자
  
  	자신의 객체를 생성하여 리턴한다. = getService(), getInstance()
 */




import kr.or.ddit.member.dao.IMemberDao;
import kr.or.ddit.member.dao.MemberDaoImpl;
import kr.or.ddit.member.vo.MemberVO;
import kr.or.ddit.member.vo.ZipVO;

public class MemberServiceImpl implements IMemberService {
	
	private IMemberDao dao;
	private static IMemberService service;
	
	// 생성자
	private MemberServiceImpl(){
		dao = MemberDaoImpl.getDao();
	}
	
	// 자신의 객체 생성, 리턴
	public static IMemberService getService(){
		if(service == null) service = new MemberServiceImpl();
		return service;
	}

	@Override
	public String selectById(String id) {
		String resId = null;
		
		// dao에서 수행된 결과를 받음
		try {	// dao 에서 throws해줫기 때문에 여기에선 try-catch를 해줘야한다.
			resId = dao.selectById(id);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return resId;	// controller로 리턴
	}

	@Override
	public String insertMember(MemberVO vo) {
		String inputId = null;
		
		try {
			inputId = dao.insertMember(vo);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return inputId;
	}

	@Override
	public List<ZipVO> selectByDong(String dong) {
		List<ZipVO> list = null;
		
		try {
			// dao 수행 후 결과 값 받음
			list = dao.selectByDong(dong);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return list;	// controller로 리턴한다.
	}

}
