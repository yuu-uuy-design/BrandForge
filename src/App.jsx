import { useState, useEffect, useRef } from "react";
import { INDUSTRIES, VIBES, MARKETS, LOAD_MESSAGES } from "./constants";
import { css } from "./styles";

export default function BrandForge() {
  const [step, setStep] = useState("intro");
  const [form, setForm] = useState({ name:"", industry:"", vibe:"", market:"global", description:"" });
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadMsg, setLoadMsg] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("strategy");
  const loadRef = useRef(null);

  useEffect(() => {
    if (loading) {
      let i = 0;
      setLoadMsg(LOAD_MESSAGES[0]);
      loadRef.current = setInterval(() => {
        i = (i + 1) % LOAD_MESSAGES.length;
        setLoadMsg(LOAD_MESSAGES[i]);
      }, 2200);
    } else clearInterval(loadRef.current);
    return () => clearInterval(loadRef.current);
  }, [loading]);

  async function generateBrand() {
    if (!form.name || !form.industry || !form.vibe) { setError("Please fill in brand name, industry, and vibe."); return; }
    setError(""); setStep("generating"); setLoading(true);
    const prompt = `You are a world-class brand strategist. Generate a complete brand identity for:
- Brand Name: ${form.name}
- Industry: ${form.industry}
- Vibe: ${form.vibe}
- Market: ${form.market}
- Context: ${form.description || "None"}
Respond ONLY with valid JSON, no markdown, no backticks:
{"brandName":"${form.name}","tagline":"catchy tagline max 8 words","positioning":"one sentence market position","targetAudience":{"primary":"audience","psychographics":"values and motivations","painPoints":"main problem solved"},"personality":{"archetype":"brand archetype","traits":["t1","t2","t3","t4"],"notTraits":["nt1","nt2"]},"voiceGuide":{"tone":"tone description","principles":["p1","p2","p3"],"doExamples":["d1","d2"],"dontExamples":["dont1","dont2"]},"colorSystem":{"primary":{"hex":"#xxxxxx","name":"name","meaning":"why"},"secondary":{"hex":"#xxxxxx","name":"name","meaning":"why"},"accent":{"hex":"#xxxxxx","name":"name","meaning":"why"},"background":{"hex":"#xxxxxx","name":"name","meaning":"usage"},"text":{"hex":"#xxxxxx","name":"name","meaning":"usage"}},"typography":{"display":{"font":"Google Font","weight":"300","usage":"where"},"body":{"font":"Google Font","weight":"400","usage":"where"},"mono":{"font":"JetBrains Mono","usage":"where"}},"logoDirection":{"concept":"visual concept","style":"wordmark/lettermark/abstract","symbolIdea":"what it represents","avoidances":"what to avoid"},"manifesto":"3-4 sentence brand manifesto","competitors":["c1","c2","c3"],"differentiator":"one sentence differentiator","socialBio":"social bio max 150 chars","elevatorPitch":"2 sentence pitch"}`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] })
      });
      const data = await res.json();
      const raw = data.content?.map(b => b.text || "").join("") || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      setBrand(JSON.parse(clean));
      setStep("result");
    } catch(e) {
      setError("Generation failed. Please try again.");
      setStep("form");
    } finally { setLoading(false); }
  }

  function copyText(text) { navigator.clipboard.writeText(text).catch(()=>{}); }

  if (step === "intro") return (
    <div className="bf-wrap"><style>{css}</style>
    <div className="intro">
      <div className="intro-bg"/><div className="intro-grid"/>
      <div className="intro-content">
        <div className="intro-eyebrow">AI Brand Identity — Powered by Claude</div>
        <h1 className="intro-title">Build your<br/><em>brand.</em><br/>Not a logo.</h1>
        <p className="intro-sub">Complete brand identity in 60 seconds. Strategy, visuals, voice, manifesto — everything a $10,000 agency would charge weeks to deliver.</p>
        <div className="intro-features">
          {["Brand Strategy","Color System","Voice Guide","Logo Direction","Manifesto","Social Kit"].map(f=>(
            <div className="feat" key={f}><div className="feat-dot"/>{f}</div>
          ))}
        </div>
        <button className="btn-gold" style={{width:"auto",padding:"18px 56px"}} onClick={()=>setStep("form")}>Start Building — Free</button>
      </div>
    </div></div>
  );

  if (step === "form") return (
    <div className="bf-wrap"><style>{css}</style>
    <div className="form-wrap">
      <div className="form-header">
        <div className="form-logo">Brand<span>Forge</span></div>
        <h2 className="form-title">Tell us about your brand</h2>
        <p className="form-subtitle">3 minutes of input. A lifetime of identity.</p>
      </div>
      <div className="form-card">
        <div className="field">
          <label className="field-label">Brand Name *</label>
          <input className="field-input" placeholder="e.g. Noura, Vexa, Bloom Co." value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        </div>
        <div className="field">
          <label className="field-label">Industry *</label>
          <select className="field-input" value={form.industry} onChange={e=>setForm({...form,industry:e.target.value})}>
            <option value="">Select your industry</option>
            {INDUSTRIES.map(i=><option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <div className="field">
          <label className="field-label">Brand Vibe *</label>
          <div className="vibe-grid">
            {VIBES.map(v=>(
              <button key={v.id} className={`vibe-btn ${form.vibe===v.id?"active":""}`} onClick={()=>setForm({...form,vibe:v.id})}>
                <span className="vibe-icon">{v.icon}</span><span>{v.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="field">
          <label className="field-label">Target Market</label>
          <div className="market-grid">
            {MARKETS.map(m=>(
              <button key={m.id} className={`market-btn ${form.market===m.id?"active":""}`} onClick={()=>setForm({...form,market:m.id})}>{m.label}</button>
            ))}
          </div>
        </div>
        <div className="field">
          <label className="field-label">Anything else? (Optional)</label>
          <textarea className="field-input" placeholder="Describe your product, your customers, or any specific direction…" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
        </div>
        {error && <div className="err">{error}</div>}
        <button className="btn-gold" onClick={generateBrand}>Generate My Brand Identity →</button>
        <div style={{marginTop:16,textAlign:"center"}}>
          <button className="btn-outline" onClick={()=>setStep("intro")}>← Back</button>
        </div>
      </div>
    </div></div>
  );

  if (step === "generating") return (
    <div className="bf-wrap"><style>{css}</style>
    <div className="generating">
      <div className="gen-ring"/>
      <h2 className="gen-title">Forging your brand…</h2>
      <div className="gen-msg">{loadMsg}</div>
    </div></div>
  );

  if (step === "result" && brand) {
    const colors = brand.colorSystem || {};
    const colorKeys = ["primary","secondary","accent","background","text"];
    const tabs = ["strategy","colors","typography","voice","manifesto","assets"];
    return (
      <div className="bf-wrap"><style>{css}</style>
      <div className="result-wrap">
        <div className="result-header">
          <div className="result-brandname" style={{color:colors.primary?.hex||"var(--gold-light)"}}>{brand.brandName}</div>
          <div className="result-tagline">"{brand.tagline}"</div>
          <p className="result-positioning">{brand.positioning}</p>
          <div className="result-meta">
            <span className="meta-pill">{form.industry}</span>
            <span className="meta-pill">{VIBES.find(v=>v.id===form.vibe)?.label}</span>
            <span className="meta-pill">{MARKETS.find(m=>m.id===form.market)?.label}</span>
            <span className="meta-pill">{brand.personality?.archetype}</span>
          </div>
        </div>
        <div className="tabs">
          {tabs.map(t=>(
            <button key={t} className={`tab-btn ${activeTab===t?"active":""}`} onClick={()=>setActiveTab(t)}>
              {t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          ))}
        </div>
        {activeTab==="strategy" && <div>
          <div className="card">
            <div className="card-label">Target Audience</div>
            <div className="card-title">{brand.targetAudience?.primary}</div>
            <div className="card-text">{brand.targetAudience?.psychographics}</div>
            <div className="card-text" style={{marginTop:12,color:"var(--gold-light)"}}>Pain point: {brand.targetAudience?.painPoints}</div>
          </div>
          <div className="card">
            <div className="card-label">Brand Personality</div>
            <div className="card-title">{brand.personality?.archetype}</div>
            <div style={{marginBottom:12}}><div style={{fontSize:12,color:"var(--muted)",marginBottom:8}}>Traits:</div>
            <div className="tag-row">{brand.personality?.traits?.map(t=><span key={t} className="tag gold">{t}</span>)}</div></div>
            <div><div style={{fontSize:12,color:"var(--muted)",marginBottom:8}}>Never:</div>
            <div className="tag-row">{brand.personality?.notTraits?.map(t=><span key={t} className="tag red">{t}</span>)}</div></div>
          </div>
          <div className="card">
            <div className="card-label">Differentiator</div>
            <div className="card-text" style={{fontSize:16,color:"var(--white)"}}>{brand.differentiator}</div>
          </div>
          <div className="card">
            <div className="card-label">Elevator Pitch</div>
            <div className="card-text" style={{fontSize:15,color:"var(--white)"}}>{brand.elevatorPitch}</div>
            <div className="copy-row"><button className="copy-btn" onClick={()=>copyText(brand.elevatorPitch)}>Copy</button></div>
          </div>
        </div>}
        {activeTab==="colors" && <div>
          <div className="card">
            <div className="card-label">Color System</div>
            <div className="color-grid">
              {colorKeys.map(key=>{const c=colors[key];if(!c)return null;return(
                <div className="color-swatch" key={key}>
                  <div className="swatch-block" style={{background:c.hex}}/>
                  <div className="swatch-hex">{c.hex}</div>
                  <div className="swatch-name">{c.name}</div>
                  <div className="swatch-meaning">{c.meaning}</div>
                </div>
              );})}
            </div>
          </div>
          <div className="card" style={{background:colors.background?.hex||"#141414",border:"none"}}>
            <div className="card-label" style={{color:"rgba(255,255,255,0.4)"}}>Preview</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:36,color:colors.primary?.hex,marginBottom:8}}>{brand.brandName}</div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:"0.2em",textTransform:"uppercase",color:colors.accent?.hex}}>{brand.tagline}</div>
          </div>
        </div>}
        {activeTab==="typography" && brand.typography && <div>
          {["display","body","mono"].map(type=>{const t=brand.typography[type];if(!t)return null;return(
            <div className="font-preview" key={type}>
              <div className="font-name">{type} — {t.font}</div>
              <div className="font-sample" style={{fontFamily:`'${t.font}',serif`,fontWeight:t.weight}}>{brand.brandName} — {brand.tagline}</div>
              <div className="font-detail">{t.usage}</div>
            </div>
          );})}
        </div>}
        {activeTab==="voice" && brand.voiceGuide && <div>
          <div className="card">
            <div className="card-label">Tone of Voice</div>
            <div className="card-text" style={{fontSize:16,color:"var(--white)"}}>{brand.voiceGuide.tone}</div>
          </div>
          <div className="card">
            <div className="card-label">Writing Principles</div>
            <ul className="list-items">{brand.voiceGuide.principles?.map(p=><li className="list-item" key={p}>{p}</li>)}</ul>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <div className="card">
              <div className="card-label" style={{color:"#6ec97a"}}>✓ Do Write</div>
              <ul className="list-items">{brand.voiceGuide.doExamples?.map(e=><li className="list-item" key={e}>{e}</li>)}</ul>
            </div>
            <div className="card">
              <div className="card-label" style={{color:"#e07070"}}>✗ Don't Write</div>
              <ul className="list-items">{brand.voiceGuide.dontExamples?.map(e=><li className="list-item" key={e}>{e}</li>)}</ul>
            </div>
          </div>
          <div className="card">
            <div className="card-label">Social Media Bio</div>
            <div className="card-text" style={{fontSize:16,color:"var(--white)"}}>{brand.socialBio}</div>
            <div className="copy-row"><button className="copy-btn" onClick={()=>copyText(brand.socialBio)}>Copy Bio</button></div>
          </div>
        </div>}
        {activeTab==="manifesto" && <div>
          <div className="card" style={{padding:"56px 48px",textAlign:"center"}}>
            <div className="card-label" style={{justifyContent:"center",display:"flex"}}>Brand Manifesto</div>
            <div className="manifesto-text">{brand.manifesto}</div>
            <div className="copy-row" style={{justifyContent:"center",marginTop:32}}>
              <button className="copy-btn" onClick={()=>copyText(brand.manifesto)}>Copy Manifesto</button>
            </div>
          </div>
        </div>}
        {activeTab==="assets" && <div>
          <div className="logo-concept-box">
            <div className="logo-placeholder" style={{color:colors.primary?.hex}}>{brand.brandName}</div>
            <div className="logo-tagline-preview">{brand.tagline}</div>
          </div>
          <div className="card">
            <div className="card-label">Logo Direction</div>
            <div className="card-title">{brand.logoDirection?.concept}</div>
            <div className="card-text">{brand.logoDirection?.style}</div>
            <div className="card-text" style={{marginTop:12}}><strong style={{color:"var(--gold-light)"}}>Symbol:</strong> {brand.logoDirection?.symbolIdea}</div>
            <div className="card-text" style={{marginTop:8}}><strong style={{color:"#e07070"}}>Avoid:</strong> {brand.logoDirection?.avoidances}</div>
          </div>
          <div className="card">
            <div className="card-label">Competitors</div>
            <div className="tag-row">{brand.competitors?.map(c=><span key={c} className="tag">{c}</span>)}</div>
          </div>
        </div>}
        <div className="result-actions">
          <button className="btn-gold" style={{width:"auto",padding:"16px 40px"}} onClick={()=>{setStep("form");setBrand(null);setActiveTab("strategy");}}>← Build Another</button>
          <button className="btn-outline" onClick={()=>copyText(JSON.stringify(brand,null,2))}>Export JSON</button>
        </div>
      </div></div>
    );
  }
  return null;
}