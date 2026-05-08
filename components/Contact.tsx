"use client";

import { useState, FormEvent, useMemo } from "react";
import { ArrowRight, Mail, Phone, User, MessageSquare, Check } from "lucide-react";
import { motion } from "framer-motion";
export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      // Simulate network request
      await new Promise(r => setTimeout(r, 1000));
      setSuccess(true);
      setName(""); setEmail(""); setPhone(""); setMessage("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const stars = useMemo(
    () => Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: `${(i * 37.3) % 100}%`,
      top: `${(i * 53.7) % 100}%`,
      size: `${1 + (i % 3)}px`,
      dur: `${3 + (i % 3)}s`,
      delay: `${(i % 4) * 1.1}s`,
    })),
    []
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=El+Messiri:wght@400;600&display=swap');

        .riv-contact-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
          padding: 100px 16px 32px;
          font-family: sans-serif;
        }
        .riv-glow {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 50% at 20% 80%, rgba(139,94,0,.18) 0, transparent 70%),
            radial-gradient(ellipse 50% 40% at 80% 20%, rgba(212,160,23,.12) 0, transparent 65%),
            radial-gradient(ellipse 80% 60% at 50% 100%, rgba(74,30,0,.3) 0, transparent 60%);
        }
        .riv-star { position: absolute; border-radius: 50%; pointer-events: none; }
        .riv-moon { position: absolute; top: 20px; right: 60px; animation: rivPulse 6s ease-in-out infinite; }
        .riv-lantern { position: absolute; animation: rivFloat 5s ease-in-out infinite; }
        .riv-desert { position: absolute; bottom: 0; left: 0; right: 0; pointer-events: none; opacity: 0.2; }

        .riv-card { position: relative; width: 100%; max-width: 480px; z-index: 10; }
        .riv-halo {
          position: absolute; inset: 0; border-radius: 20px; pointer-events: none;
          box-shadow: 0 0 80px rgba(212,160,23,.15), 0 0 160px rgba(139,94,0,.1);
        }
        .riv-inner {
          position: relative;
          background: rgba(14,11,9,.88);
          border: 1px solid rgba(212,160,23,.3);
          border-radius: 20px;
          overflow: hidden;
        }
        .riv-topbar { height: 2px; background: linear-gradient(to right, transparent, #D4A017 30%, #F0D078 50%, #D4A017 70%, transparent); }
        .riv-botbar { height: 2px; background: linear-gradient(to right, transparent, #8B5E00 30%, #D4A017 50%, #8B5E00 70%, transparent); opacity: 0.5; }
        .riv-arabesk {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle at 1px 1px, rgba(212,160,23,.04) 1px, transparent 0);
          background-size: 24px 24px;
        }
        .riv-corner { position: absolute; width: 60px; height: 60px; pointer-events: none; }
        .riv-body { position: relative; padding: 28px 32px 32px; }

        .riv-divider { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .riv-dl { flex: 1; height: 1px; background: linear-gradient(to right, transparent, rgba(212,160,23,.5)); }
        .riv-dl-rev { flex: 1; height: 1px; background: linear-gradient(to left, transparent, rgba(212,160,23,.5)); }
        .riv-star-icon { color: #D4A017; font-size: 18px; letter-spacing: .15em; }

        .riv-h1 {
          font-family: 'Cinzel', serif; font-size: 26px; font-weight: 700;
          letter-spacing: .05em; text-align: center; line-height: 1.2; margin-bottom: 2px;
          background: linear-gradient(135deg, #F0D078 0, #D4A017 40%, #F0D078 80%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .riv-sub1 {
          font-family: 'El Messiri', 'Georgia', serif; font-size: 14px;
          color: rgba(240,208,120,.7); letter-spacing: .08em; text-align: center; margin-bottom: 2px;
        }
        .riv-sub2 {
          font-family: sans-serif; font-size: 11px; color: rgba(154,139,120,.7);
          letter-spacing: .12em; text-transform: uppercase; text-align: center; margin-bottom: 24px;
        }

        .riv-field { margin-bottom: 16px; }
        .riv-field label {
          display: flex; align-items: center; gap: 6px;
          font-family: 'Cinzel', serif; font-size: 10px;
          letter-spacing: .12em; text-transform: uppercase;
          color: rgba(212,160,23,.55); margin-bottom: 6px; transition: color .3s;
        }
        .riv-field:focus-within label { color: #D4A017; }
        .riv-wrap {
          position: relative; display: flex; align-items: center;
          background: rgba(10,7,3,.6); border: 1px solid rgba(212,160,23,.2);
          border-radius: 8px; transition: all .3s; overflow: hidden;
        }
        .riv-wrap::before {
          content: ''; position: absolute; left: 0; top: 20%;
          height: 60%; width: 2px; background: transparent;
          border-radius: 2px; transition: all .3s;
        }
        .riv-wrap:focus-within { border-color: rgba(212,160,23,.7); box-shadow: 0 0 20px rgba(212,160,23,.15), inset 0 0 10px rgba(212,160,23,.05); }
        .riv-wrap:focus-within::before { background: linear-gradient(to bottom, transparent, #D4A017, transparent); }
        .riv-wrap input, .riv-wrap textarea {
          flex: 1; background: transparent; border: none; outline: none;
          padding: 13px 14px 13px 18px; color: #F5EDE0; font-family: sans-serif; font-size: 14px;
        }
        .riv-wrap textarea { resize: vertical; padding: 13px 14px; }
        .riv-wrap input::placeholder, .riv-wrap textarea::placeholder { color: rgba(154,139,120,.45); }

        .riv-error {
          background: rgba(139,0,0,.2); border: 1px solid rgba(212,60,60,.35);
          color: #ffaaaa; font-size: 12px; padding: 10px 14px; border-radius: 8px;
          margin-bottom: 14px; font-family: sans-serif; text-align: center;
        }

        .riv-submit {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          background: linear-gradient(135deg, #8B5E00 0, #D4A017 45%, #F0D078 70%, #D4A017 100%);
          border: none; border-radius: 10px; padding: 14px 18px; cursor: pointer;
          color: #050505; font-family: 'Cinzel', serif; font-size: 13px; font-weight: 700;
          letter-spacing: .15em; text-transform: uppercase;
          position: relative; overflow: hidden; transition: transform .15s; margin-top: 6px;
        }
        .riv-submit:hover:not(:disabled) { transform: scale(1.02); }
        .riv-submit:active:not(:disabled) { transform: scale(.98); }
        .riv-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .riv-shimmer {
          position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.3) 50%, transparent 60%);
          animation: rivShimmer 2.5s ease-in-out infinite;
        }
        .riv-arrow {
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(5,5,5,.25); display: flex; align-items: center;
          justify-content: center; font-size: 16px; color: #050505; flex-shrink: 0;
        }

        .riv-success {
          text-align: center; padding: 32px 0;
        }
        .riv-success-icon {
          width: 60px; height: 60px; margin: 0 auto 16px;
          border-radius: 50%; background: rgba(100,200,100,.2); 
          display: flex; align-items: center; justify-content: center;
        }
        .riv-success h3 {
          font-family: 'Cinzel', serif; font-size: 18px; font-weight: 700;
          color: #D4A017; margin-bottom: 8px; letter-spacing: .05em;
        }
        .riv-success p {
          font-size: 12px; color: rgba(240,208,120,.6); margin-bottom: 20px;
        }
        .riv-success button {
          background: rgba(212,160,23,.2); border: 1px solid rgba(212,160,23,.4);
          color: #D4A017; padding: 10px 20px; border-radius: 8px; cursor: pointer;
          font-family: 'Cinzel', serif; font-size: 11px; font-weight: 600;
          letter-spacing: .08em; text-transform: uppercase; transition: all .3s;
        }
        .riv-success button:hover { background: rgba(212,160,23,.3); border-color: rgba(212,160,23,.6); }

        @keyframes rivFloat { 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-14px) rotate(3deg)} }
        @keyframes rivPulse { 0%,100%{opacity:.7;transform:scale(.97)} 50%{opacity:1;transform:scale(1.03)} }
        @keyframes rivShimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @keyframes rivStar { 0%,100%{opacity:.7;transform:scale(.97)} 50%{opacity:1;transform:scale(1.03)} }
      `}</style>

      <div className="riv-contact-page">
        <div className="riv-glow" />

        {/* Stars */}
        {stars.map((s) => (
          <div key={s.id} className="riv-star" style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            background: 'radial-gradient(circle,#F0D078,#D4A017 60%,transparent)',
            animation: `rivStar ${s.dur} ${s.delay} ease-in-out infinite`,
          }} />
        ))}

        {/* Lanterns */}
        {([
          { left: '5%', top: '12%', animationDelay: '0s' },
          { left: '11%', top: '52%', animationDelay: '1.5s' },
          { right: '7%', top: '18%', animationDelay: '.8s' },
          { right: '13%', top: '60%', animationDelay: '2.2s' },
        ] as React.CSSProperties[]).map((pos, i) => (
          <div key={i} className="riv-lantern" style={pos}>
            <svg width="22" height="44" viewBox="0 0 28 52" fill="none">
              <line x1="14" y1="0" x2="14" y2="8" stroke="#D4A017" strokeWidth="1.5"/>
              <ellipse cx="14" cy="11" rx="7" ry="3" fill="#8B5E00"/>
              <rect x="6" y="11" width="16" height="28" rx="4" fill="#1a0f00" stroke="#D4A017" strokeWidth="1"/>
              <rect x="8" y="13" width="12" height="24" rx="3" fill="rgba(212,160,23,.18)"/>
              <line x1="14" y1="14" x2="14" y2="36" stroke="#D4A017" strokeWidth="0.5" opacity="0.4"/>
              <ellipse cx="14" cy="39" rx="7" ry="3" fill="#8B5E00"/>
              <ellipse cx="14" cy="25" rx="3" ry="5" fill="rgba(255,180,30,.35)"/>
            </svg>
          </div>
        ))}

        {/* Moon */}
        <div className="riv-moon">
          <svg width="60" height="60" viewBox="0 0 70 70" fill="none">
            <path d="M45 15 C28 15 15 28 15 45 C15 55 20 63 28 67 C18 62 12 52 12 40 C12 22 27 8 45 8 C50 8 55 10 59 13 C54 13 49 15 45 15Z" fill="#F0D078" opacity="0.9"/>
          </svg>
        </div>

        {/* Desert */}
        <div className="riv-desert">
          <svg viewBox="0 0 1440 140" fill="none" preserveAspectRatio="none" width="100%" height="100">
            <path d="M0 140 L0 90 Q60 80 120 85 Q200 55 280 65 Q360 38 420 48 Q480 18 540 32 Q580 8 620 22 Q660 0 700 14 Q740 0 780 16 Q820 0 860 14 Q940 18 1020 22 Q1100 8 1220 28 L1440 35 L1440 140 Z" fill="rgba(212,160,23,.2)"/>
            <path d="M0 140 L0 108 Q200 92 400 100 Q600 82 800 95 Q1000 105 1200 98 L1440 102 L1440 140 Z" fill="rgba(139,94,0,.25)"/>
          </svg>
        </div>

        {/* Card */}
        <motion.div
          className="riv-card"
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="riv-halo" />
          <div className="riv-inner">

            {/* Corner ornaments */}
            {([
              { top: 0, left: 0, rotate: 0 },
              { top: 0, right: 0, rotate: 90 },
              { bottom: 0, left: 0, rotate: 270 },
              { bottom: 0, right: 0, rotate: 180 },
            ] as Array<{ rotate: number } & React.CSSProperties>).map(({ rotate, ...pos }, i) => (
              <div key={i} className="riv-corner" style={{ ...pos, transform: `rotate(${rotate}deg)` }}>
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <path d="M0 0 L40 0 L0 40 Z" fill="rgba(212,160,23,.08)"/>
                  <path d="M0 0 L30 0 L0 30 Z" fill="rgba(212,160,23,.12)"/>
                  <path d="M2 0 L2 20 M0 2 L20 2" stroke="#D4A017" strokeWidth="0.8" opacity="0.5"/>
                  <circle cx="2" cy="2" r="1.5" fill="#D4A017" opacity="0.6"/>
                </svg>
              </div>
            ))}

            <div className="riv-topbar" />
            <div className="riv-arabesk" />

            <div className="riv-body">
              <div className="riv-divider">
                <div className="riv-dl" />
                <span className="riv-star-icon">✦</span>
                <div className="riv-dl-rev" />
              </div>
              <h1 className="riv-h1">Get in Touch</h1>
              <p className="riv-sub1">Send us a Message</p>
              <p className="riv-sub2">We&apos;d Love to Hear From You</p>

              {success ? (
                <div className="riv-success">
                  <div className="riv-success-icon">
                    <Check size={32} style={{ color: "#D4A017" }} />
                  </div>
                  <h3>Message Sent!</h3>
                  <p>Thank you! We&apos;ll get back to you soon.</p>
                  <button onClick={() => setSuccess(false)}>Send Another Message</button>
                </div>
              ) : (
                <>
                  {error && <div className="riv-error">{error}</div>}

                  <form onSubmit={handleSubmit}>
                    <div className="riv-field">
                      <label>
                        <User size={12} style={{ color: "rgba(212,160,23,.55)" }} />
                        Your Name
                      </label>
                      <div className="riv-wrap">
                        <input
                          type="text"
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="riv-field">
                      <label>
                        <Mail size={12} style={{ color: "rgba(212,160,23,.55)" }} />
                        Email Address
                      </label>
                      <div className="riv-wrap">
                        <input
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="riv-field">
                      <label>
                        <Phone size={12} style={{ color: "rgba(212,160,23,.55)" }} />
                        Phone Number
                      </label>
                      <div className="riv-wrap">
                        <input
                          type="tel"
                          placeholder="+91 **********"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="riv-field">
                      <label>
                        <MessageSquare size={12} style={{ color: "rgba(212,160,23,.55)" }} />
                        Message
                      </label>
                      <div className="riv-wrap">
                        <textarea
                          rows={4}
                          placeholder="Write your message..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <button type="submit" className="riv-submit" disabled={submitting}>
                      <div className="riv-shimmer" />
                      <span>{submitting ? "Sending…" : "Send Message"}</span>
                      <div className="riv-arrow">
                        <ArrowRight size={14} />
                      </div>
                    </button>
                  </form>
                </>
              )}
            </div>
            <div className="riv-botbar" />
          </div>
        </motion.div>
      </div>
    </>
  );
}
