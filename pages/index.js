import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [estado, setEstado] = useState('idle'); // idle | loading | success | error

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
      if (res.ok) {
        setEstado('success');
        setNombre('');
        setCorreo('');
      } else {
        setEstado('error');
      }
    } catch {
      setEstado('error');
    }
  }

  return (
    <>
      <Head>
        <title>Lux Arcana — Algo está por comenzar</title>
        <meta name="description" content="El Reino no se explica. Se experimenta." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="root">
        {/* Hero */}
        <section className="hero">
          <div className="hero-overlay" />
          <div className="hero-content">
            <div className="logo-wrap">
              {/* Reemplaza el src con la URL pública de tu logo en Sanity o GitHub */}
              <img
                src="/logo.png"
                alt="Lux Arcana"
                className="logo"
              />
            </div>

            <p className="eyebrow">Julio 2026</p>
            <h1 className="headline">Algo está<br />por comenzar.</h1>
            <p className="tagline">El Reino no se explica.<br />Se experimenta.</p>
            <p className="sub">Un camino de transformación, propósito y legado.</p>

            {/* Formulario */}
            <div className="form-wrap">
              {estado === 'success' ? (
                <p className="success-msg">Bienvenido. Tu lugar está reservado.</p>
              ) : (
                <form onSubmit={handleSubmit} className="form">
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    required
                    className="input"
                  />
                  <input
                    type="email"
                    placeholder="Tu correo electrónico"
                    value={correo}
                    onChange={e => setCorreo(e.target.value)}
                    required
                    className="input"
                  />
                  <button type="submit" className="btn" disabled={estado === 'loading'}>
                    {estado === 'loading' ? 'Enviando...' : 'Quiero entrar al Reino'}
                  </button>
                  {estado === 'error' && (
                    <p className="error-msg">Algo salió mal. Intenta de nuevo.</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-links">
            <a href="https://instagram.com/luxarcanaoficial" target="_blank" rel="noopener">Instagram · @luxarcanaoficial</a>
            <span className="sep">·</span>
            <a href="https://tiktok.com/@luxarcanaoficial" target="_blank" rel="noopener">TikTok · @luxarcanaoficial</a>
            <span className="sep">·</span>
            <a href="https://facebook.com/luxarcana" target="_blank" rel="noopener">Facebook · Lux Arcana</a>
          </div>
          <p className="footer-domain">luxarcana.com.mx</p>
        </footer>
      </main>

      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { font-size: 16px; }
        body { background: #F5F0E8; font-family: 'Cormorant Garamond', Georgia, serif; }

        .root { min-height: 100vh; display: flex; flex-direction: column; }

        /* Hero */
        .hero {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-image: url('/hero.jpg');
          background-size: cover;
          background-position: center;
          padding: 60px 24px;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(245,240,232,0.55) 0%,
            rgba(245,240,232,0.40) 50%,
            rgba(245,240,232,0.75) 100%
          );
        }
        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 560px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        /* Logo */
        .logo-wrap { margin-bottom: 40px; }
        .logo { width: 120px; height: auto; }

        /* Typography */
        .eyebrow {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.78rem;
          font-weight: 400;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #8A7A5A;
          margin-bottom: 20px;
        }
        .headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 8vw, 5.5rem);
          font-weight: 300;
          line-height: 1.05;
          color: #1F1E1C;
          letter-spacing: -0.01em;
          margin-bottom: 28px;
        }
        .tagline {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(1.25rem, 3vw, 1.65rem);
          font-weight: 300;
          color: #3A3530;
          line-height: 1.4;
          margin-bottom: 18px;
        }
        .sub {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          font-weight: 400;
          letter-spacing: 0.06em;
          color: #6B5F4A;
          margin-bottom: 48px;
        }

        /* Form */
        .form-wrap { width: 100%; max-width: 400px; }
        .form { display: flex; flex-direction: column; gap: 14px; }
        .input {
          width: 100%;
          padding: 14px 18px;
          background: rgba(255,255,255,0.72);
          border: 1px solid rgba(200,164,107,0.45);
          border-radius: 2px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          color: #1F1E1C;
          outline: none;
          transition: border-color 0.2s;
          backdrop-filter: blur(4px);
        }
        .input::placeholder { color: #A89880; }
        .input:focus { border-color: #C8A46B; }
        .btn {
          width: 100%;
          padding: 15px 24px;
          background: #C8A46B;
          border: none;
          border-radius: 2px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #F5F0E8;
          cursor: pointer;
          transition: background 0.2s, opacity 0.2s;
          margin-top: 4px;
        }
        .btn:hover { background: #B8923A; }
        .btn:disabled { opacity: 0.6; cursor: default; }
        .success-msg {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.15rem;
          color: #59604B;
          text-align: center;
          padding: 20px 0;
        }
        .error-msg {
          font-size: 0.85rem;
          color: #B96B4A;
          text-align: center;
          letter-spacing: 0.04em;
        }

        /* Footer */
        .footer {
          padding: 28px 24px;
          text-align: center;
          border-top: 1px solid rgba(200,164,107,0.2);
          background: rgba(245,240,232,0.92);
        }
        .footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 16px;
          justify-content: center;
          margin-bottom: 8px;
        }
        .footer-links a {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.82rem;
          letter-spacing: 0.08em;
          color: #6B5F4A;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-links a:hover { color: #C8A46B; }
        .sep { color: #C8A46B; font-size: 0.7rem; }
        .footer-domain {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.75rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #A89880;
        }

        @media (max-width: 480px) {
          .sep { display: none; }
          .footer-links { flex-direction: column; gap: 6px; }
          .logo { width: 90px; }
        }
      `}</style>
    </>
  );
}
