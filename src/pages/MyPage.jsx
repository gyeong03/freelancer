import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadPortfolio, getCurrentUser, logoutUser } from '../api';

function MyPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title) return alert('제목을 입력해주세요.');
    try {
      await uploadPortfolio(title, null);
      alert('구글 시트에 포트폴리오가 정상적으로 저장되었습니다! 피드 탭에서 확인해보세요.');
      setTitle('');
    } catch (error) {
      alert('업로드 실패: ' + error.message);
    }
  };

  const handleLogout = () => {
    logoutUser();
    alert('로그아웃 되었습니다.');
    navigate('/login');
  };

  if (!user) return <div style={{ padding: '2rem', textAlign: 'center' }}>로딩 중...</div>;

  return (
    <div style={{ padding: '2rem 5%', maxWidth: '800px', margin: '0 auto', flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>마이페이지</h2>
        <button onClick={handleLogout} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>로그아웃</button>
      </div>
      
      <div className="feature-card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>내 프로필</h3>
        <p style={{ marginBottom: '0.5rem' }}><strong>이름(닉네임):</strong> {user.nickname}</p>
        <p><strong>이메일:</strong> {user.email}</p>
      </div>

      <div className="feature-card">
        <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>포트폴리오 업로드</h3>
        <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>제목</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="포트폴리오 제목" 
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--background-color)', color: 'var(--text-main)' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>이미지 파일</label>
            <input 
              type="file" 
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--background-color)', color: 'var(--text-main)' }}
            />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>* 실제 Vercel 배포 시 Cloudinary를 거쳐 URL만 시트에 저장됩니다. (현재는 데모용 더미 이미지 자동 저장)</p>
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>업로드 및 구글 시트 저장</button>
        </form>
      </div>
    </div>
  );
}

export default MyPage;
