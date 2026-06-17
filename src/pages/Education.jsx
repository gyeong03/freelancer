import React from 'react';

function Education() {
  return (
    <div style={{ padding: '2rem 5%', maxWidth: '1000px', margin: '0 auto', flex: 1 }}>
      <h2 style={{ marginBottom: '2rem' }}>청년 디자이너 교육 센터</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>실무 역량 강화를 위한 필수 교육 과정입니다. (Read-only)</p>

      <div className="features" style={{ padding: 0 }}>
        {[
          { id: 1, title: 'B2B 커뮤니케이션 가이드', desc: '기업 고객과 원활하게 소통하고 기한을 준수하는 방법' },
          { id: 2, title: '디자인 파일 전달 표준', desc: 'Figma, PSD 등 작업물 원본 파일 정리 및 전달 규격' },
          { id: 3, title: '계약 및 저작권 기초', desc: '외주 작업 시 반드시 알아야 할 저작권법과 계약서 작성법' }
        ].map(course => (
          <div key={course.id} className="feature-card">
            <h3 style={{ marginBottom: '0.5rem', color: '#c084fc' }}>{course.title}</h3>
            <p style={{ fontSize: '0.9rem' }}>{course.desc}</p>
            <button className="btn-secondary" style={{ marginTop: '1rem', width: '100%' }}>강의 보기</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Education;
