import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSocialLogin = (provider) => {
    // 소셜 로그인은 추후 키 연동 후 활성화됩니다.
    alert(`${provider} 로그인은 현재 설정 중입니다. 이메일 로그인을 이용해주세요.`);
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      setLoading(true);
      await loginUser(email, password);
      // 로그인 성공 시 피드 페이지로 이동
      navigate('/feed');
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero-section" style={{ padding: '2rem' }}>
      <div className="feature-card" style={{ maxWidth: '400px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>로그인</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>다양한 방법으로 로그인해보세요</p>
        
        {errorMsg && (
          <div style={{ backgroundColor: 'rgba(255, 77, 79, 0.1)', color: '#ff4d4f', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'left' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleEmailLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <input 
            type="email" 
            placeholder="이메일 주소" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--background-color)', color: 'var(--text-main)' }} 
          />
          <input 
            type="password" 
            placeholder="비밀번호" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--background-color)', color: 'var(--text-main)' }} 
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? '로그인 중...' : '이메일로 로그인'}
          </button>
        </form>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button type="button" onClick={() => handleSocialLogin('카카오')} className="btn-secondary" style={{ backgroundColor: '#FEE500', color: '#000', borderColor: '#FEE500' }}>
            카카오로 시작하기 (준비중)
          </button>
          <button type="button" onClick={() => handleSocialLogin('네이버')} className="btn-secondary" style={{ backgroundColor: '#03C75A', color: '#fff', borderColor: '#03C75A' }}>
            네이버로 시작하기 (준비중)
          </button>
          <button type="button" onClick={() => handleSocialLogin('구글')} className="btn-secondary" style={{ backgroundColor: '#fff', color: '#000', borderColor: '#ddd' }}>
            Google로 시작하기 (준비중)
          </button>
        </div>
        
        <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', fontSize: '0.9rem' }}>
          아직 계정이 없으신가요? <Link to="/signup" style={{ color: 'var(--primary-color)', textDecoration: 'none', marginLeft: '0.5rem', fontWeight: 'bold' }}>자체 이메일 회원가입</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
