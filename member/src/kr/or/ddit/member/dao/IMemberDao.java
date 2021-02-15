package kr.or.ddit.member.dao;

import java.sql.SQLException;
import java.util.List;

import kr.or.ddit.member.vo.MemberVO;
import kr.or.ddit.member.vo.ZipVO;

public interface IMemberDao {

	// 메소드 선언
	// id 중복 체크
	public String selectById(String mem_id) throws SQLException;
	
	// 회원가입 정보 저장
	public String insertMember(MemberVO vo) throws SQLException;
	
	// 우편번호 찾기
	public List<ZipVO> selectByDong(String dong) throws SQLException;
}
