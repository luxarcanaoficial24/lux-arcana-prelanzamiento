import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [estado, setEstado] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nombre || !correo) return;
    setEstado('loading');
    try {
      const res = await fetch('/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo }),
      });
      if (res.ok) { setEstado('success'); setNombre(''); setCorreo(''); }
      else setEstado('error');
    } catch { setEstado('error'); }
  }

  return (
    <>
      <Head>
        <title>Lux Arcana — Algo está por comenzar</title>
        <meta name="description" content="El Reino no se explica. Se experimenta." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap" rel="stylesheet" />
      </Head>

      <main className="root">
        <section className="hero">
          <div className="hero-overlay" />
          <div className="hero-content">

            <div className="logo-wrap">
              <img src="/logo.png" alt="Lux Arcana" className="logo" />
            </div>

            <h1 className="headline">Algo está por comenzar.</h1>

            <div className="divider-wrap">
              <span className="divider-line" />
              <span className="star">✦</span>
              <span className="divider-line" />
            </div>

            <p className="tagline">El Reino no se explica.<br />Se experimenta.</p>
            <p className="sub">Un camino de transformación,<br />propósito y legado.</p>

            <div className="form-wrap">
              {estado === 'success' ? (
                <p className="success-msg">Bienvenido. Tu lugar está reservado.</p>
              ) : (
                <form onSubmit={handleSubmit} className="form">
                  <div className="input-wrap">
                    <span className="input-icon">&#9711;</span>
                    <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required className="input" />
                  </div>
                  <div className="input-wrap">
                    <span className="input-icon">✉</span>
                    <input type="email" placeholder="Correo electrónico" value={correo} onChange={e => setCorreo(e.target.value)} required className="input" />
                  </div>
                  <button type="submit" className="btn" disabled={estado === 'loading'}>
                    <span className="btn-star">✦</span>
                    {estado === 'loading' ? 'ENVIANDO...' : 'QUIERO ENTRAR AL REINO'}
                  </button>
                  {estado === 'error' && <p className="error-msg">Algo salió mal. Intenta de nuevo.</p>}
                </form>
              )}
            </div>

            <div className="julio-wrap">
              <span className="julio-line" />
              <span className="julio">JULIO 2026</span>
              <span className="julio-line" />
            </div>
            <div className="julio-star">✦</div>

          </div>
        </section>

        <footer className="footer">
          <div className="footer-links">
            <a href="https://instagram.com/luxarcanaoficial" target="_blank" rel="noopener">Instagram · @luxarcanaoficial</a>
            <span className="sep">·</span>
            <a href="https://tiktok.com/@luxarcanaoficial" target="_blank" rel="noopener">TikTok · @luxarcanaoficial</a>
            <span className="sep">·</span>
            <a href="https://www.facebook.com/profile.php?id=61589999397410" target="_blank" rel="noopener">Facebook · Lux Arcana</a>
          </div>
          <p className="footer-domain">luxarcana.com.mx</p>
        </footer>
      </main>

      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Cormorant Garamond', Georgia, serif; background: #1a1612; }

        .root { min-height: 100vh; display: flex; flex-direction: column; }

        .hero {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          min-height: 100vh;
          background-image: url('/hero.jpg');
          background-size: cover;
          background-position: center right;
          padding: 60px 48px 60px 7vw;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(18,14,10,0.72) 0%,
            rgba(18,14,10,0.55) 45%,
            rgba(18,14,10,0.10) 75%,
            rgba(18,14,10,0.0) 100%
          );
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 560px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
        }

        .logo-wrap { margin-bottom: 32px; }
        .logo { width: 110px; height: auto; }

        .headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.6rem, 5.5vw, 4.2rem);
          font-weight: 300;
          line-height: 1.08;
          color: #F5F0E8;
          letter-spacing: -0.01em;
          margin-bottom: 18px;
        }

        .divider-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          width: 220px;
        }
        .divider-line {
          flex: 1;
          height: 1px;
          background: #C8A46B;
          opacity: 0.6;
        }
        .star {
          color: #C8A46B;
          font-size: 0.7rem;
        }

        .tagline {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(1.3rem, 2.5vw, 1.7rem);
          font-weight: 300;
          color: #F5F0E8;
          line-height: 1.4;
          margin-bottom: 14px;
        }
        .sub {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          font-weight: 400;
          color: rgba(245,240,232,0.72);
          line-height: 1.6;
          margin-bottom: 36px;
          letter-spacing: 0.03em;
        }

        .form-wrap { width: 100%; max-width: 420px; }
        .form { display: flex; flex-direction: column; gap: 12px; }

        .input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-icon {
          position: absolute;
          left: 16px;
          color: #C8A46B;
          font-size: 0.85rem;
          opacity: 0.8;
          pointer-events: none;
        }
        .input {
          width: 100%;
          padding: 14px 18px 14px 40px;
          background: rgba(245,240,232,0.92);
          border: 1px solid rgba(200,164,107,0.3);
          border-radius: 2px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          color: #1F1E1C;
          outline: none;
          transition: border-color 0.2s;
        }
        .input::placeholder { color: #8A7A6A; }
        .input:focus { border-color: #C8A46B; }

        .btn {
          width: 100%;
          padding: 15px 24px;
          background: #1F2937;
          border: none;
          border-radius: 2px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.88rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          color: #C8A46B;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 4px;
        }
        .btn:hover { background: #111827; }
        .btn:disabled { opacity: 0.6; cursor: default; }
        .btn-star { font-size: 0.65rem; }

        .success-msg {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.15rem;
          color: #C8A46B;
          padding: 20px 0;
        }
        .error-msg {
          font-size: 0.85rem;
          color: #B96B4A;
          letter-spacing: 0.04em;
        }

        .julio-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 32px;
          width: 260px;
        }
        .julio-line {
          flex: 1;
          height: 1px;
          background: #C8A46B;
          opacity: 0.5;
        }
        .julio {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          letter-spacing: 0.22em;
          color: #C8A46B;
        }
        .julio-star {
          color: #C8A46B;
          font-size: 0.6rem;
          margin-top: 8px;
          opacity: 0.7;
        }

        .footer {
          padding: 24px;
          text-align: center;
          background: #0f0d0a;
        }
        .footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 6px 14px;
          justify-content: center;
          margin-bottom: 6px;
        }
        .footer-links a {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          color: rgba(200,164,107,0.7);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-links a:hover { color: #C8A46B; }
        .sep { color: #C8A46B; opacity: 0.4; font-size: 0.7rem; }
        .footer-domain {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(200,164,107,0.5);
        }

        @media (max-width: 640px) {
          .hero { padding: 48px 24px; justify-content: center; }
          .hero-overlay {
            background: linear-gradient(
              to bottom,
              rgba(18,14,10,0.65) 0%,
              rgba(18,14,10,0.55) 60%,
              rgba(18,14,10,0.75) 100%
            );
          }
          .hero-content { align-items: center; text-align: center; }
          .julio-wrap { margin-left: auto; margin-right: auto; }
          .sep { display: none; }
          .footer-links { flex-direction: column; gap: 5px; }
        }
      `}</style>
    </>
  );
}
