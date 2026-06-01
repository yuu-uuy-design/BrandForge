export const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  :root{--black:#080808;--deep:#0d0d0d;--surface:#141414;--border:rgba(255,255,255,0.07);--gold:#c9a84c;--gold-light:#e8c97a;--gold-dim:rgba(201,168,76,0.12);--white:#f5f0e8;--muted:rgba(245,240,232,0.5);--faint:rgba(245,240,232,0.1);}
  body{background:var(--black);}
  .bf-wrap{min-height:100vh;background:var(--black);color:var(--white);font-family:'Syne',sans-serif;}
  .intro{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:60px 24px;position:relative;overflow:hidden;}
  .intro-bg{position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 50% 50%,rgba(201,168,76,0.06) 0%,transparent 70%);}
  .intro-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent);}
  .intro-content{position:relative;z-index:2;max-width:700px;}
  .intro-eyebrow{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:var(--gold);margin-bottom:32px;}
  .intro-title{font-family:'Cormorant Garamond',serif;font-size:clamp(52px,9vw,96px);font-weight:300;line-height:0.9;margin-bottom:32px;}
  .intro-title em{font-style:italic;color:var(--gold-light);}
  .intro-sub{font-size:16px;color:var(--muted);line-height:1.8;max-width:480px;margin:0 auto 48px;}
  .intro-features{display:flex;gap:32px;justify-content:center;flex-wrap:wrap;margin-bottom:52px;}
  .feat{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);display:flex;align-items:center;gap:8px;}
  .feat-dot{width:4px;height:4px;background:var(--gold);border-radius:50%;}
  .form-wrap{min-height:100vh;padding:48px 24px;display:flex;flex-direction:column;align-items:center;}
  .form-header{text-align:center;margin-bottom:52px;}
  .form-logo{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;letter-spacing:0.1em;color:var(--white);margin-bottom:24px;}
  .form-logo span{color:var(--gold);}
  .form-title{font-family:'Cormorant Garamond',serif;font-size:clamp(28px,5vw,44px);font-weight:300;margin-bottom:12px;}
  .form-subtitle{font-size:14px;color:var(--muted);}
  .form-card{width:100%;max-width:640px;background:var(--deep);border:1px solid var(--border);padding:48px 40px;}
  .field{margin-bottom:32px;}
  .field-label{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);margin-bottom:12px;display:block;}
  .field-input{width:100%;background:var(--surface);border:1px solid var(--border);color:var(--white);font-family:'Syne',sans-serif;font-size:15px;padding:14px 18px;outline:none;transition:border-color 0.3s;}
  .field-input:focus{border-color:rgba(201,168,76,0.5);}
  .field-input::placeholder{color:var(--muted);font-size:14px;}
  select.field-input{cursor:pointer;}
  select.field-input option{background:#1a1a1a;}
  textarea.field-input{resize:vertical;min-height:90px;}
  .vibe-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
  .vibe-btn{background:var(--surface);border:1px solid var(--border);color:var(--muted);font-family:'Syne',sans-serif;font-size:12px;padding:14px 10px;cursor:pointer;transition:all 0.25s;display:flex;flex-direction:column;align-items:center;gap:6px;}
  .vibe-btn:hover{border-color:rgba(201,168,76,0.4);color:var(--white);}
  .vibe-btn.active{border-color:var(--gold);background:var(--gold-dim);color:var(--gold-light);}
  .vibe-icon{font-size:18px;}
  .market-grid{display:flex;gap:8px;flex-wrap:wrap;}
  .market-btn{background:var(--surface);border:1px solid var(--border);color:var(--muted);font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;padding:10px 20px;cursor:pointer;transition:all 0.25s;}
  .market-btn:hover{border-color:rgba(201,168,76,0.4);color:var(--white);}
  .market-btn.active{border-color:var(--gold);background:var(--gold-dim);color:var(--gold-light);}
  .err{color:#e07070;font-size:13px;margin-bottom:20px;font-family:'JetBrains Mono',monospace;}
  .btn-gold{background:var(--gold);color:var(--black);font-family:'Syne',sans-serif;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:18px 48px;border:none;cursor:pointer;transition:all 0.3s;width:100%;}
  .btn-gold:hover{background:var(--gold-light);transform:translateY(-1px);box-shadow:0 8px 30px rgba(201,168,76,0.25);}
  .btn-outline{background:transparent;color:var(--muted);font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;padding:14px 32px;border:1px solid var(--border);cursor:pointer;transition:all 0.3s;}
  .btn-outline:hover{border-color:var(--gold);color:var(--gold);}
  .generating{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 24px;text-align:center;}
  .gen-ring{width:80px;height:80px;border-radius:50%;border:1px solid var(--border);border-top-color:var(--gold);animation:spin 1.2s linear infinite;margin-bottom:40px;}
  @keyframes spin{to{transform:rotate(360deg);}}
  .gen-title{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:300;margin-bottom:16px;}
  .gen-msg{font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.15em;color:var(--gold);text-transform:uppercase;min-height:20px;}
  .result-wrap{max-width:900px;margin:0 auto;padding:48px 24px;}
  .result-header{text-align:center;margin-bottom:52px;padding-bottom:40px;border-bottom:1px solid var(--border);}
  .result-brandname{font-family:'Cormorant Garamond',serif;font-size:clamp(44px,8vw,80px);font-weight:300;line-height:1;margin-bottom:16px;}
  .result-tagline{font-style:italic;font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--gold-light);margin-bottom:24px;}
  .result-positioning{font-size:14px;color:var(--muted);max-width:560px;margin:0 auto 28px;line-height:1.7;}
  .result-meta{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;}
  .meta-pill{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;padding:7px 16px;border:1px solid var(--border);color:var(--muted);}
  .tabs{display:flex;gap:2px;margin-bottom:40px;overflow-x:auto;}
  .tab-btn{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;padding:12px 22px;background:var(--surface);border:none;color:var(--muted);cursor:pointer;transition:all 0.25s;white-space:nowrap;}
  .tab-btn:hover{color:var(--white);}
  .tab-btn.active{background:var(--gold);color:var(--black);font-weight:700;}
  .card{background:var(--deep);border:1px solid var(--border);padding:32px;margin-bottom:16px;}
  .card-label{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:var(--gold);margin-bottom:20px;}
  .card-title{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:300;margin-bottom:12px;}
  .card-text{font-size:14px;color:var(--muted);line-height:1.8;}
  .tag-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px;}
  .tag{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.1em;padding:6px 14px;border:1px solid var(--border);color:var(--muted);}
  .tag.gold{border-color:rgba(201,168,76,0.3);color:var(--gold-light);}
  .tag.red{border-color:rgba(220,80,80,0.3);color:#e07070;}
  .list-items{list-style:none;display:flex;flex-direction:column;gap:10px;margin-top:8px;}
  .list-item{font-size:14px;color:var(--muted);display:flex;align-items:flex-start;gap:12px;line-height:1.6;}
  .list-item::before{content:'—';color:var(--gold);flex-shrink:0;}
  .color-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;}
  .color-swatch{display:flex;flex-direction:column;gap:10px;}
  .swatch-block{height:80px;border-radius:2px;border:1px solid rgba(255,255,255,0.06);}
  .swatch-hex{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--white);letter-spacing:0.05em;}
  .swatch-name{font-size:11px;color:var(--muted);}
  .swatch-meaning{font-size:11px;color:var(--faint);line-height:1.4;margin-top:2px;}
  .font-preview{background:var(--surface);padding:24px 28px;margin-bottom:12px;border:1px solid var(--border);}
  .font-name{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);margin-bottom:12px;}
  .font-sample{font-size:28px;line-height:1.2;}
  .font-detail{font-size:12px;color:var(--muted);margin-top:8px;}
  .manifesto-text{font-family:'Cormorant Garamond',serif;font-size:clamp(20px,3vw,28px);font-weight:300;font-style:italic;line-height:1.6;color:var(--white);}
  .copy-row{display:flex;justify-content:flex-end;margin-top:16px;}
  .copy-btn{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);background:none;border:1px solid var(--border);padding:7px 16px;cursor:pointer;transition:all 0.25s;}
  .copy-btn:hover{border-color:var(--gold);color:var(--gold);}
  .logo-concept-box{background:var(--surface);border:1px solid var(--border);padding:40px;text-align:center;margin-bottom:16px;}
  .logo-placeholder{font-family:'Cormorant Garamond',serif;font-size:48px;font-weight:300;color:var(--gold-light);letter-spacing:0.08em;margin-bottom:16px;}
  .logo-tagline-preview{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:var(--muted);}
  .result-actions{display:flex;gap:12px;margin-top:48px;flex-wrap:wrap;}
  @media(max-width:600px){.form-card{padding:32px 24px;}.vibe-grid{grid-template-columns:repeat(2,1fr);}.color-grid{grid-template-columns:repeat(3,1fr);}.result-actions{flex-direction:column;}.result-actions .btn-gold{width:auto;}}
`;
