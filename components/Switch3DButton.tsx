'use client'

export default function Switch3DButton() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        @keyframes pinkGlow {
          0%, 100% { box-shadow: 0 0 8px rgba(255,30,80,0.5), inset 0 0 8px rgba(255,30,80,0.05); }
          50% { box-shadow: 0 0 22px rgba(255,30,80,0.9), 0 0 40px rgba(255,30,80,0.3), inset 0 0 12px rgba(255,30,80,0.08); }
        }
        @keyframes textPulse {
          0%, 100% { text-shadow: 0 0 8px rgba(255,30,80,0.7), 0 0 20px rgba(255,30,80,0.4); }
          50% { text-shadow: 0 0 16px rgba(255,30,80,1), 0 0 35px rgba(255,30,80,0.6); }
        }
        .s3d-btn {
          position: fixed;
          top: 70px;
          right: 20px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 24px;
          background: rgba(10,0,5,0.92);
          border: 1.5px solid #ff1e50;
          border-radius: 3px;
          cursor: pointer;
          backdrop-filter: blur(14px);
          animation: pinkGlow 2.5s ease-in-out infinite;
          transition: transform 0.15s ease, background 0.2s ease;
          text-decoration: none;
        }
        .s3d-btn:hover {
          transform: scale(1.05);
          background: rgba(255,30,80,0.1);
        }
        .s3d-text {
          font-family: var(--font-jjk), 'Bebas Neue', sans-serif;
          font-size: 1rem;
          font-weight: 400;
          letter-spacing: 0.08em;
          color: #ff1e50;
          text-transform: uppercase;
          white-space: nowrap;
          animation: textPulse 2.5s ease-in-out infinite;
        }
        .s3d-icon { filter: drop-shadow(0 0 4px rgba(255,30,80,0.8)); }
      `}</style>

      <div
        className="s3d-btn"
        onClick={() => { window.top!.location.href = 'https://rivera-ten.vercel.app/' }}
      >
        <svg className="s3d-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1L13 4.5V9.5L7 13L1 9.5V4.5L7 1Z" stroke="#ff1e50" strokeWidth="1.4" fill="rgba(255,30,80,0.1)"/>
          <path d="M7 1V13M1 4.5L7 8L13 4.5" stroke="#ff1e50" strokeWidth="1.1"/>
        </svg>
        <span className="s3d-text">SWITCH TO 3D</span>
        <svg className="s3d-icon" width="9" height="9" viewBox="0 0 9 9" fill="none">
          <path d="M1.5 7.5L7.5 1.5M7.5 1.5H3M7.5 1.5V6" stroke="#ff1e50" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      </div>
    </>
  )
}