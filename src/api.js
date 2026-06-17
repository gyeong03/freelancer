// Google Apps Script 연동을 위한 통신 모듈 (서버리스/백그라운드 없음)
import SHA256 from 'crypto-js/sha256';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxFSndpDtRHiH9D6LEpopkdfG-nZQiqh94omQcA06tVirGqdVyOW0IESVJbtx4X0uy02g/exec';

// 공통 Fetch 래퍼 함수 (텍스트 우회 방식)
const fetchGoogleScript = async (action, payload = {}) => {
  const res = await fetch(SCRIPT_URL + '?action=' + action, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload)
  });
  
  const text = await res.text();
  try {
    const data = JSON.parse(text);
    if (data.error) throw new Error(data.error);
    return data;
  } catch (parseError) {
    if (text.includes('<!DOCTYPE html>')) {
      throw new Error('Google Apps Script 권한 오류: 스크립트 실행 권한 승인이 필요합니다.');
    }
    throw new Error(parseError.message || '서버 오류가 발생했습니다.');
  }
};

// ================= 회원가입 / 로그인 =================
export const registerUser = async (email, password, nickname) => {
  const hashedPassword = SHA256(password).toString();
  return await fetchGoogleScript('signup', { email, password_hash: hashedPassword, nickname, provider: 'email' });
};

export const loginUser = async (email, password) => {
  const hashedPassword = SHA256(password).toString();
  const data = await fetchGoogleScript('login', { email, password_hash: hashedPassword });
  // 로그인 성공 시 로컬스토리지에 유저 정보 저장 (MVP용 간이 세션)
  localStorage.setItem('user', JSON.stringify({ email: data.email, nickname: data.nickname, token: data.session_token }));
  return data;
};

export const logoutUser = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// ================= 공고 / 포트폴리오 =================
export const fetchJobs = async () => {
  try {
    const res = await fetch(`${SCRIPT_URL}?action=getJobs`);
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return [];
  }
};

export const fetchPortfolios = async () => {
  try {
    const res = await fetch(`${SCRIPT_URL}?action=getPortfolios`);
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch portfolios:', error);
    return [];
  }
};

export const applyForJob = async (jobId) => {
  console.log(`Job applied: ${jobId}`);
  return { status: 'applied', job_id: jobId };
};

export const uploadPortfolio = async (title, file) => {
  const imageUrl = 'https://via.placeholder.com/300?text=' + encodeURIComponent(title);
  const user = getCurrentUser();
  const designerId = user ? user.nickname : '익명 디자이너';
  
  return await fetchGoogleScript('createPortfolio', {
    designer_id: designerId,
    title: title, 
    image_url: imageUrl, 
    description: '새 포트폴리오' 
  });
};

export const createJob = async (jobData) => {
  return await fetchGoogleScript('createJob', jobData);
};
