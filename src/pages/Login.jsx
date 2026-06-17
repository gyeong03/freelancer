import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // 로그인 모의 처리 후 피드 페이지로 이동
    navigate('/feed');
  };

  return (
    <div className="hero-section" style={{ padding: '2rem' }}>
      <div className="feature-card" style={{ maxWidth: '400px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
        <h2>로그인 / 회원가입</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>간편하게 시작해보세요</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button onClick={handleLogin} className="btn-secondary" style={{ backgroundColor: '#FEE500', color: '#000', borderColor: '#FEE500' }}>
            카카오로 시작하기
          </button>
          <button onClick={handleLogin} className="btn-secondary" style={{ backgroundColor: '#03C75A', color: '#fff', borderColor: '#03C75A' }}>
            네이버로 시작하기
          </button>
          <button onClick={handleLogin} className="btn-secondary" style={{ backgroundColor: '#fff', color: '#000', borderColor: '#ddd' }}>
            Google로 시작하기
          </button>
        </div>
        
        <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>기업 회원이신가요?</p>
          <button onClick={handleLogin} className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
            사업자 인증 후 가입하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
