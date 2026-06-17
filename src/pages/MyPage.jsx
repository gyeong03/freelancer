import React, { useState } from 'react';
import { uploadPortfolio } from '../api';

function MyPage() {
  const [title, setTitle] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title) return alert('제목을 입력해주세요.');
    await uploadPortfolio(title, null);
    alert('구글 시트에 포트폴리오가 정상적으로 저장되었습니다!');
    setTitle('');
  };

  return (
    <div style={{ padding: '2rem 5%', maxWidth: '800px', margin: '0 auto', flex: 1 }}>
      <h2 style={{ marginBottom: '2rem' }}>마이페이지</h2>
      
      <div className="feature-card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>내 프로필</h3>
        <p><strong>이름:</strong> 홍길동 (디자이너)</p>
        <p><strong>이메일:</strong> user@example.com</p>
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
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>* 실제 Vercel 배포 시 Cloudinary를 거쳐 URL만 시트에 저장됩니다.</p>
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>업로드 및 구글 시트 저장</button>
        </form>
      </div>
    </div>
  );
}

export default MyPage;
