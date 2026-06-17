import React, { useState, useEffect } from 'react';
import { fetchJobs, fetchPortfolios, applyForJob } from '../api';

function Feed() {
  const [activeTab, setActiveTab] = useState('portfolios');
  const [portfolios, setPortfolios] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (activeTab === 'portfolios') {
      fetchPortfolios().then(setPortfolios);
    } else {
      fetchJobs().then(setJobs);
    }
  }, [activeTab]);

  const handleApply = async (jobId) => {
    await applyForJob(jobId);
    alert('지원이 완료되었습니다!');
  };

  return (
    <div style={{ padding: '2rem 5%', maxWidth: '1200px', margin: '0 auto', flex: 1 }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          className={activeTab === 'portfolios' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setActiveTab('portfolios')}
        >
          포트폴리오
        </button>
        <button 
          className={activeTab === 'jobs' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setActiveTab('jobs')}
        >
          채용/외주 공고
        </button>
      </div>

      {activeTab === 'portfolios' && (
        <div className="features" style={{ padding: 0 }}>
          {portfolios.map(item => (
            <div key={item.portfolio_id} className="feature-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ height: '200px', backgroundColor: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.image_url ? <img src={item.image_url} alt="portfolio" style={{width: '100%', height: '100%', objectFit: 'cover'}} /> : <span style={{ color: 'var(--text-muted)' }}>Image</span>}
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>디자이너 {item.designer_id}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'jobs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {jobs.map(item => (
            <div key={item.job_id} className="feature-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                {item.is_urgent && <span style={{ backgroundColor: '#ff4d4f', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', marginRight: '0.5rem' }}>급구</span>}
                <h3 style={{ display: 'inline-block', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)' }}>예산: {item.budget} | {item.company_id}</p>
              </div>
              <button onClick={() => handleApply(item.job_id)} className="btn-primary">지원하기</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Feed;
