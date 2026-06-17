// Google Apps Script 연동을 위한 통신 모듈 (서버리스/백그라운드 없음)

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxFSndpDtRHiH9D6LEpopkdfG-nZQiqh94omQcA06tVirGqdVyOW0IESVJbtx4X0uy02g/exec';

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
  // 포트폴리오 목록 읽기는 현재 Apps Script에 getPortfolios 액션이 미구현 상태이므로 임시 빈 배열
  // 필요시 Apps Script의 doGet에 getPortfolios 로직 추가 후 아래 코드 사용
  /*
  const res = await fetch(`${SCRIPT_URL}?action=getPortfolios`);
  return await res.json();
  */
  return [];
};

export const applyForJob = async (jobId) => {
  // 원래라면 Applications 시트에 써야하지만, MVP 데모를 위해 지원 알림만 처리
  console.log(`Job applied: ${jobId}`);
  return { status: 'applied', job_id: jobId };
};

export const uploadPortfolio = async (title, file) => {
  const imageUrl = 'https://via.placeholder.com/300?text=' + encodeURIComponent(title);
  
  try {
    const res = await fetch(SCRIPT_URL + '?action=createPortfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ 
        designer_id: '익명 디자이너',
        title: title, 
        image_url: imageUrl, 
        description: '새 포트폴리오' 
      })
    });
    
    const text = await res.text();
    try {
      const data = JSON.parse(text);
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    } catch (parseError) {
      // JSON 파싱 실패 시 HTML 에러 페이지 반환된 것임 (권한 문제 등)
      throw new Error('Google Apps Script 응답 오류 (HTML 반환됨). Apps Script 권한 승인이 필요할 수 있습니다.');
    }
  } catch (error) {
    console.error('Upload failed:', error);
    alert('업로드 실패: ' + error.message);
    throw error;
  }
};

export const createJob = async (jobData) => {
  try {
    const res = await fetch(SCRIPT_URL + '?action=createJob', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(jobData)
    });
    return await res.json();
  } catch (error) {
    console.error('Job creation failed:', error);
    throw error;
  }
};
