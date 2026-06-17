import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (formData.password !== formData.passwordConfirm) {
      return setErrorMsg('비밀번호가 일치하지 않습니다.');
    }
    if (formData.password.length < 6) {
      return setErrorMsg('비밀번호는 최소 6자 이상이어야 합니다.');
    }

    try {
      setLoading(true);
      await registerUser(formData.email, formData.password, formData.nickname);
      alert('회원가입이 완료되었습니다! 로그인해주세요.');
      navigate('/login');
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero-section" style={{ padding: '2rem' }}>
      <div className="feature-card" style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>회원가입</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>이메일로 간편하게 가입하세요</p>
        
        {errorMsg && (
          <div style={{ backgroundColor: 'rgba(255, 77, 79, 0.1)', color: '#ff4d4f', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>이메일 (아이디)</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required
              style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--background-color)', color: 'var(--text-main)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>닉네임</label>
            <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} required
              style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--background-color)', color: 'var(--text-main)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>비밀번호</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required minLength="6"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--background-color)', color: 'var(--text-main)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>비밀번호 확인</label>
            <input type="password" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} required minLength="6"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--background-color)', color: 'var(--text-main)' }} />
          </div>
          
          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '1rem' }}>
            {loading ? '가입 중...' : '가입하기'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
          이미 계정이 있으신가요? <Link to="/login" style={{ color: 'var(--primary-color)', textDecoration: 'none', marginLeft: '0.5rem' }}>로그인하기</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
