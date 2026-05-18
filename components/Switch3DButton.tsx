'use client'

export default function Switch3DButton() {
  return (
    <>
      <style>{`
        @keyframes glow3d {
          0%, 100% { box-shadow: 0 0 8px rgba(0,245,255,0.5); }
          50% { box-shadow: 0 0 20px rgba(0,245,255,0.9), 0 0 40px rgba(0,245,255,0.3); }
        }
        .s3d {
          position: fixed; top: 70px; right: 20px; z-index: 9999;
          display: flex; align-items: center; gap: 8px;
          padding: 9px 22px;
          background: rgba(0,4,15,0.9);
          border: 1px solid #00f5ff;
          border-radius: 4px; cursor: pointer;
          backdrop-filter: blur(12px);
          animation: glow3d 2.5s ease-in-out infinite;
          transition: transform 0.15s ease, background 0.2s ease;
        }
        .s3d:hover { transform: scale(1.05); background: rgba(0,245,255,0.1); }
        .s3d span {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.12em; color: #00f5ff;
          text-transform: uppercase;
          text-shadow: 0 0 10px rgba(0,245,255,0.7);
        }
      `}</style>
      <div
        className="s3d"
        onClick={() => { window.top!.location.href = 'https://rivera-ten.vercel.app/' }}
      >
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <path d="M7 1L13 4.5V9.5L7 13L1 9.5V4.5L7 1Z" stroke="#00f5ff" strokeWidth="1.4" fill="rgba(0,245,255,0.1)"/>
          <path d="M7 1V13M1 4.5L7 8L13 4.5" stroke="#00f5ff" strokeWidth="1.1"/>
        </svg>
        <span>SWITCH TO 3D</span>
        <svg width="8" height="8" viewBox="0 0 9 9" fill="none">
          <path d="M1.5 7.5L7.5 1.5M7.5 1.5H3M7.5 1.5V6" stroke="#00f5ff" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      </div>
    </>
  )
}