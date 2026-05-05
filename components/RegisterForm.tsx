// "use client";

// import { motion } from "framer-motion";
// import { Eye, EyeOff, ArrowRight } from "lucide-react";
// import { useState, FormEvent } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function RegisterForm() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [name, setName] = useState("");
//   const [college, setCollege] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   async function handleSubmit(e: FormEvent) {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password, college }),
//       });
//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Registration failed");
//         return;
//       }

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       router.push("/");
//     } catch {
//       setError("Network error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <section className="relative min-h-screen pt-28 pb-12 flex items-center justify-center bg-[#150505] overflow-hidden px-4 sm:px-6">

//       {/* Decorative outer dark pad with subtle top-left red highlight */}
//       <div
//         className="absolute w-[500px] h-[800px] rounded-[2rem] bg-[#0f0404]/80 border border-white/5 shadow-2xl hidden md:block"
//         style={{ boxShadow: "-10px -10px 40px rgba(255, 51, 51, 0.05)" }}
//         aria-hidden="true"
//       >
//          <div className="absolute top-0 left-0 w-1/2 h-[1px] bg-gradient-to-r from-red-500/50 to-transparent"></div>
//          <div className="absolute top-0 left-0 w-[1px] h-1/2 bg-gradient-to-b from-red-500/50 to-transparent"></div>
//       </div>

//       {/* Register Card */}
//       <motion.div
//         className="relative z-10 w-full max-w-[420px]"
//         initial={{ opacity: 0, y: 30, scale: 0.97 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
//       >
//         <div className="relative rounded-3xl overflow-hidden shadow-2xl">
//           {/* Solid vibrant red bg as seen in screenshot */}
//           <div className="absolute inset-0 bg-gradient-to-br from-[#ff3333] via-[#e61919] to-[#990000]" />

//           <div className="relative p-8 sm:p-10">
//             {/* Header */}
//             <div className="text-center mb-10">
//               <h1 className="text-4xl font-bold text-white mb-4">
//                 Riviera 2026
//               </h1>
//               <p className="text-white text-lg font-semibold tracking-wide">Create your account</p>
//             </div>

//             {error && (
//               <div className="bg-red-900/30 border border-red-500/30 text-red-200 text-sm p-3 rounded-xl mb-4">
//                 {error}
//               </div>
//             )}

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="space-y-5">
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//                 className="w-full px-6 py-3.5 rounded-full bg-white text-black text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-shadow font-medium"
//               />

//               <input
//                 type="text"
//                 placeholder="College/University Name"
//                 value={college}
//                 onChange={(e) => setCollege(e.target.value)}
//                 className="w-full px-6 py-3.5 rounded-full bg-white text-black text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-shadow font-medium"
//               />

//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full px-6 py-3.5 rounded-full bg-white text-black text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-shadow font-medium"
//               />

//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   minLength={6}
//                   className="w-full px-6 py-3.5 rounded-full bg-white text-black text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-shadow pr-12 font-medium tracking-widest"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
//                 </button>
//               </div>

//               <div className="pt-4">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full py-2.5 pl-6 pr-2 rounded-full bg-[#110505] border border-[#ff3333]/40 hover:bg-[#1a0505] text-white font-medium flex items-center justify-between transition-all duration-300 group shadow-lg disabled:opacity-50"
//                 >
//                   <span className="mx-auto pl-8 text-base">{loading ? "Creating Account..." : "Sign Up"}</span>
//                   <div className="w-9 h-9 rounded-full bg-[#ff3333] flex items-center justify-center group-hover:scale-105 transition-transform">
//                     <ArrowRight size={16} className="text-white" />
//                   </div>
//                 </button>
//               </div>
//             </form>

//             {/* Divider */}
//             <div className="mt-8 mb-4 flex items-center justify-center">
//               <span className="text-[10px] text-[#800000] uppercase tracking-widest font-bold">Continue with</span>
//             </div>

//             {/* Google */}
//             <a href="/api/auth/google" className="w-full py-3.5 rounded-full border border-[#ff3333]/40 bg-[#110505] hover:bg-[#1a0505] text-white text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-3">
//               <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
//                 <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
//                 <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
//                 <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
//               </svg>
//               Register with Google
//             </a>

//             {/* Login link */}
//             <p className="text-center text-sm text-white/70 mt-8">
//               Already have an account?{" "}
//               <Link href="/login" className="text-white font-bold hover:underline">
//                 Log in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     </section>
//   );
// }
"use client";

import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, college }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=El+Messiri:wght@400;600&display=swap');

        .riv-page {
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

        .riv-card { position: relative; width: 100%; max-width: 420px; z-index: 10; }
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
          display: block; font-family: 'Cinzel', serif; font-size: 10px;
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
        .riv-wrap input {
          flex: 1; background: transparent; border: none; outline: none;
          padding: 13px 14px 13px 18px; color: #F5EDE0; font-family: sans-serif; font-size: 14px;
        }
        .riv-wrap input::placeholder { color: rgba(154,139,120,.45); }
        .riv-eye { background: none; border: none; cursor: pointer; color: rgba(212,160,23,.55); padding: 0 14px; display: flex; align-items: center; }
        .riv-eye:hover { color: #D4A017; }

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

        .riv-sep { display: flex; align-items: center; gap: 12px; margin: 20px 0; }
        .riv-sep-line { flex: 1; height: 1px; background: rgba(212,160,23,.2); }
        .riv-sep span { font-size: 10px; letter-spacing: .15em; text-transform: uppercase; color: rgba(154,139,120,.6); }

        .riv-google {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px;
          background: rgba(10,7,3,.6); border: 1px solid rgba(212,160,23,.25);
          border-radius: 10px; padding: 12px 20px; cursor: pointer; color: #F5EDE0;
          font-family: 'Cinzel', serif; font-size: 12px; font-weight: 600;
          letter-spacing: .08em; transition: all .3s; text-decoration: none; display: flex;
        }
        .riv-google:hover { border-color: rgba(212,160,23,.5); transform: scale(1.02); }

        .riv-signin { text-align: center; margin-top: 18px; font-family: sans-serif; font-size: 12px; color: rgba(154,139,120,.7); }
        .riv-signin a { color: #D4A017; text-decoration: none; font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: .05em; }
        .riv-signin a:hover { text-decoration: underline; }

        @keyframes rivFloat { 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-14px) rotate(3deg)} }
        @keyframes rivPulse { 0%,100%{opacity:.7;transform:scale(.97)} 50%{opacity:1;transform:scale(1.03)} }
        @keyframes rivShimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @keyframes rivStar { 0%,100%{opacity:.7;transform:scale(.97)} 50%{opacity:1;transform:scale(1.03)} }
      `}</style>

      <div className="riv-page">
        <div className="riv-glow" />

        {/* Stars */}
        {Array.from({ length: 28 }).map((_, i) => (
          <div key={i} className="riv-star" style={{
            left: `${(i * 37.3) % 100}%`,
            top: `${(i * 53.7) % 100}%`,
            width: `${1 + (i % 3)}px`,
            height: `${1 + (i % 3)}px`,
            background: 'radial-gradient(circle,#F0D078,#D4A017 60%,transparent)',
            animation: `rivStar ${3 + (i % 3)}s ${(i % 4) * 1.1}s ease-in-out infinite`,
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
              <line x1="14" y1="0" x2="14" y2="8" stroke="#D4A017" strokeWidth="1.5" />
              <ellipse cx="14" cy="11" rx="7" ry="3" fill="#8B5E00" />
              <rect x="6" y="11" width="16" height="28" rx="4" fill="#1a0f00" stroke="#D4A017" strokeWidth="1" />
              <rect x="8" y="13" width="12" height="24" rx="3" fill="rgba(212,160,23,.18)" />
              <line x1="14" y1="14" x2="14" y2="36" stroke="#D4A017" strokeWidth="0.5" opacity="0.4" />
              <ellipse cx="14" cy="39" rx="7" ry="3" fill="#8B5E00" />
              <ellipse cx="14" cy="25" rx="3" ry="5" fill="rgba(255,180,30,.35)" />
            </svg>
          </div>
        ))}

        {/* Moon */}
        <div className="riv-moon">
          <svg width="60" height="60" viewBox="0 0 70 70" fill="none">
            <path d="M45 15 C28 15 15 28 15 45 C15 55 20 63 28 67 C18 62 12 52 12 40 C12 22 27 8 45 8 C50 8 55 10 59 13 C54 13 49 15 45 15Z" fill="#F0D078" opacity="0.9" />
          </svg>
        </div>

        {/* Desert */}
        <div className="riv-desert">
          <svg viewBox="0 0 1440 140" fill="none" preserveAspectRatio="none" width="100%" height="100">
            <path d="M0 140 L0 90 Q60 80 120 85 Q200 55 280 65 Q360 38 420 48 Q480 18 540 32 Q580 8 620 22 Q660 0 700 14 Q740 0 780 16 Q820 0 860 14 Q940 18 1020 22 Q1100 8 1220 28 L1440 35 L1440 140 Z" fill="rgba(212,160,23,.2)" />
            <path d="M0 140 L0 108 Q200 92 400 100 Q600 82 800 95 Q1000 105 1200 98 L1440 102 L1440 140 Z" fill="rgba(139,94,0,.25)" />
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
                  <path d="M0 0 L40 0 L0 40 Z" fill="rgba(212,160,23,.08)" />
                  <path d="M0 0 L30 0 L0 30 Z" fill="rgba(212,160,23,.12)" />
                  <path d="M2 0 L2 20 M0 2 L20 2" stroke="#D4A017" strokeWidth="0.8" opacity="0.5" />
                  <circle cx="2" cy="2" r="1.5" fill="#D4A017" opacity="0.6" />
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
              <h1 className="riv-h1">Riviera 2026</h1>
              <p className="riv-sub1">Enter the Realm</p>
              <p className="riv-sub2">Create your account</p>

              {error && <div className="riv-error">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="riv-field">
                  <label>Full Name</label>
                  <div className="riv-wrap">
                    <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
                  </div>
                </div>
                <div className="riv-field">
                  <label>College / University</label>
                  <div className="riv-wrap">
                    <input type="text" placeholder="College / University Name" value={college} onChange={(e) => setCollege(e.target.value)} />
                  </div>
                </div>
                <div className="riv-field">
                  <label>Email Address</label>
                  <div className="riv-wrap">
                    <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
                  </div>
                </div>
                <div className="riv-field">
                  <label>Password</label>
                  <div className="riv-wrap">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      autoComplete="new-password"
                    />
                    <button type="button" className="riv-eye" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password">
                      {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="riv-submit" disabled={loading}>
                  <div className="riv-shimmer" />
                  <span>{loading ? "Creating Account…" : "Enter the Realm"}</span>
                  <div className="riv-arrow">›</div>
                </button>
              </form>

              <div className="riv-sep">
                <div className="riv-sep-line" />
                <span>or continue with</span>
                <div className="riv-sep-line" />
              </div>

              <a href="/api/auth/google" className="riv-google">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4" />
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
                  <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
                </svg>
                Register with Google
              </a>

              <p className="riv-signin">
                Already a traveller?{" "}
                <Link href="/login">Sign In</Link>
              </p>
            </div>
            <div className="riv-botbar" />
          </div>
        </motion.div>
      </div>
    </>
  );
}