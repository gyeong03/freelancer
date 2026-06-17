import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <main className="hero-section">
      <div className="hero-content">
        <h2 className="hero-title">
          실패 없는 <span className="highlight">B2B 디자인 외주</span>
        </h2>
        <p className="hero-subtitle">
          소통과 책임감이 검증된 디자이너를 매칭해 드립니다.
        </p>
        <div className="cta-group">
          <Link to="/login" className="btn-primary large">공고 등록하기 (기업)</Link>
          <Link to="/login" className="btn-secondary large">포트폴리오 업로드 (디자이너)</Link>
        </div>
      </div>

      <section className="features" style={{ position: 'absolute', bottom: 0, width: '100%', left: 0 }}>
        <div className="feature-card">
          <h3>검증된 인재</h3>
          <p>철저한 심사를 통과한 청년 디자이너</p>
        </div>
        <div className="feature-card">
          <h3>투명한 소통</h3>
          <p>명확한 기한과 품질 보장</p>
        </div>
        <div className="feature-card">
          <h3>수수료 제로</h3>
          <p>초기 매칭 수수료 완전 무료</p>
        </div>
      </section>
    </main>
  );
}

export default Home;
