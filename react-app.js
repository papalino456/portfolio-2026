import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [timestamp, setTimestamp] = useState('--:--:--');
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [renderMs, setRenderMs] = useState('0.0');
  const [bodyHover, setBodyHover] = useState(false);

  const canvasRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  const cursorLinkRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef(null);
  const renderFrameRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      * { cursor: none !important; }
      #cursor-dot, #cursor-outline {
        position: fixed;
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        z-index: 9999;
        pointer-events: none;
        mix-blend-mode: difference;
      }
      #cursor-dot {
        width: 6px;
        height: 6px;
        background-color: white;
      }
      #cursor-outline {
        width: 40px;
        height: 40px;
        border: 1px solid white;
        transition: width 0.2s, height 0.2s;
      }
      .link-list a::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: currentColor;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
      }
      .link-list a:hover::after {
        transform: scaleX(1);
        transform-origin: left;
      }
      .nav-item {
        font-size: 3rem;
        font-weight: 300;
        color: #ccc;
        cursor: none;
        transition: color 0.3s;
      }
      .nav-item:hover {
        color: #111;
      }
      .corner-index {
        transition: color 0.3s ease;
      }
      .corner-index:hover {
        color: #888888;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimestamp(now.toLocaleTimeString('en-US', { hour12: false }) + ' UTC+4');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      setMouseX(e.clientX);
      setMouseY(e.clientY);
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const loopCursor = () => {
      const dx = mousePosRef.current.x - cursorLinkRef.current.x;
      const dy = mousePosRef.current.y - cursorLinkRef.current.y;
      cursorLinkRef.current.x += dx * 0.15;
      cursorLinkRef.current.y += dy * 0.15;
      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.style.left = `${cursorLinkRef.current.x}px`;
        cursorOutlineRef.current.style.top = `${cursorLinkRef.current.y}px`;
      }
      animFrameRef.current = requestAnimationFrame(loopCursor);
    };
    animFrameRef.current = requestAnimationFrame(loopCursor);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const charSize = 12;
    const densityChars = " .'`^,:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

    function simpleNoise(x, y, t) {
      return Math.sin(x * 0.05 + t) * Math.cos(y * 0.05 + t)
        + Math.sin(x * 0.01 - t) * Math.cos(y * 0.12) * 0.5;
    }

    let width, height;

    function resize() {
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
    }

    resize();
    window.addEventListener('resize', resize);

    function render() {
      const start = performance.now();
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${charSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const colsCount = Math.ceil(width / charSize);
      const rowsCount = Math.ceil(height / charSize);

      for (let y = 0; y < rowsCount; y++) {
        if (y < rowsCount * 0.4) continue;
        for (let x = 0; x < colsCount; x++) {
          const posX = x * charSize;
          const posY = y * charSize;

          const dx = posX - mousePosRef.current.x;
          const rect = canvas.getBoundingClientRect();
          const dy = posY - (mousePosRef.current.y - rect.top);
          const dist = Math.sqrt(dx * dx + dy * dy);

          const normalizedY = (rowsCount - y) / rowsCount;
          const noiseVal = simpleNoise(x, y, timeRef.current * 0.5);
          const mountainHeight = 0.3 + (Math.sin(x * 0.05 + timeRef.current * 0.1) * 0.1) + (Math.cos(x * 0.2) * 0.05);

          let char = '';
          let alpha = 0;

          if (normalizedY < mountainHeight + (noiseVal * 0.1)) {
            const index = Math.floor(Math.abs(noiseVal) * densityChars.length);
            char = densityChars[index % densityChars.length];
            alpha = 1 - (normalizedY * 2);
          }

          if (dist < 150) {
            const lensStrength = 1 - (dist / 150);
            if (Math.random() > 0.5) {
              char = Math.random() > 0.5 ? '0' : '1';
              ctx.fillStyle = `rgba(0, 0, 0, ${lensStrength})`;
            } else {
              ctx.fillStyle = `rgba(100, 100, 100, ${alpha})`;
            }
            const shiftX = dist > 0 ? (dx / dist) * 10 * lensStrength : 0;
            const shiftY = dist > 0 ? (dy / dist) * 10 * lensStrength : 0;
            ctx.fillText(char, posX + (charSize / 2) - shiftX, posY + (charSize / 2) - shiftY);
          } else if (char) {
            ctx.fillStyle = `rgba(100, 100, 100, ${alpha})`;
            ctx.fillText(char, posX + (charSize / 2), posY + (charSize / 2));
          }
        }
      }

      timeRef.current += 0.01;
      const duration = performance.now() - start;
      setRenderMs(duration.toFixed(1));
      renderFrameRef.current = requestAnimationFrame(render);
    }

    renderFrameRef.current = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(renderFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const fontMain = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  const fontMono = "'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace";

  return (
    <div style={{
      backgroundColor: '#ffffff',
      color: '#111111',
      fontFamily: fontMain,
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      position: 'relative'
    }}>
      {/* Custom Cursor */}
      <div id="cursor-dot" ref={cursorDotRef} />
      <div id="cursor-outline" ref={cursorOutlineRef} />

      {/* Corner Indices */}
      <div
        className="corner-index"
        onClick={() => setNavOpen(true)}
        style={{
          position: 'fixed', top: '24px', left: '24px',
          fontFamily: fontMain, fontWeight: 500, fontSize: '2.5rem',
          lineHeight: 1, zIndex: 1000, color: '#111111',
          cursor: 'none'
        }}
      >S</div>
      <div
        className="corner-index"
        onClick={() => setNavOpen(true)}
        style={{
          position: 'fixed', top: '24px', right: '24px',
          fontFamily: fontMain, fontWeight: 500, fontSize: '2.5rem',
          lineHeight: 1, zIndex: 1000, color: '#111111',
          cursor: 'none'
        }}
      >K</div>
      <div
        className="corner-index"
        onClick={() => setNavOpen(true)}
        style={{
          position: 'fixed', bottom: '24px', left: '24px',
          fontFamily: fontMain, fontWeight: 500, fontSize: '2.5rem',
          lineHeight: 1, zIndex: 1000, color: '#111111',
          cursor: 'none'
        }}
      >0</div>
      <div
        className="corner-index"
        onClick={() => setNavOpen(true)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px',
          fontFamily: fontMain, fontWeight: 500, fontSize: '2.5rem',
          lineHeight: 1, zIndex: 1000, color: '#111111',
          cursor: 'none'
        }}
      >1</div>

      {/* Nav Overlay */}
      <div
        onClick={(e) => { if (e.target === e.currentTarget) setNavOpen(false); }}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '100vw', height: '100vh',
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(10px)',
          zIndex: 2000,
          opacity: navOpen ? 1 : 0,
          pointerEvents: navOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'center' }}>
          {['Experiments', 'Writing', 'Capabilities', 'About'].map((item) => (
            <div key={item} className="nav-item">{item}</div>
          ))}
          <div className="nav-item" onClick={() => setNavOpen(false)}>Close</div>
        </div>
      </div>

      {/* Main Content */}
      <main style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* Canvas Zone */}
        <div style={{
          position: 'relative',
          height: '70vh',
          width: '100%',
          overflow: 'hidden',
          borderBottom: '1px solid #e5e5e5'
        }}>
          <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
          <div style={{ position: 'absolute', bottom: '24px', left: '24px', pointerEvents: 'auto' }}>
            <div style={{
              fontSize: '3rem',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              marginBottom: '8px',
              color: '#111111'
            }}>
              System Architecture &amp; <br />Visual Displacement
            </div>
            <div style={{
              fontFamily: fontMono,
              fontSize: '0.8rem',
              color: '#888888'
            }}>
              Exploring the delta between signal and noise.
            </div>
          </div>
        </div>

        {/* Panel Zone */}
        <div style={{
          height: '30vh',
          width: '100%',
          padding: '24px',
          display: 'grid',
          gridTemplateColumns: '2fr 1.5fr 1fr',
          gap: '40px',
          alignContent: 'start',
          fontSize: '0.85rem',
          lineHeight: 1.5
        }}>
          {/* Col 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{
                display: 'flex', gap: '12px',
                color: '#888888', fontSize: '0.75rem',
                textTransform: 'uppercase', letterSpacing: '0.05em',
                marginBottom: '4px'
              }}>
                <span>Sandro Kozmanishvili</span>
                <span>{timestamp}</span>
              </div>
              <p
                onMouseEnter={() => setBodyHover(true)}
                onMouseLeave={() => setBodyHover(false)}
                style={{
                  maxWidth: '400px',
                  color: '#111111',
                  fontFamily: bodyHover ? fontMono : fontMain,
                  letterSpacing: bodyHover ? '-0.5px' : 'normal',
                  opacity: bodyHover ? 0.7 : 1,
                  transition: 'all 0.2s ease'
                }}
              >
                Multidisciplinary designer based in Tbilisi. Focusing on the intersection of generative visuals and functional interfaces.
              </p>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#666', marginTop: 'auto' }}>
              Currently building visual video sound and digital products.
            </div>
          </div>

          {/* Col 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <ul className="link-list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Email', 'Are.na', 'GitHub', 'Instagram'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    style={{
                      textDecoration: 'none',
                      color: '#111111',
                      position: 'relative',
                      display: 'inline-block',
                      width: 'fit-content'
                    }}
                  >{link}</a>
                </li>
              ))}
            </ul>
            <div style={{ color: '#888888', fontSize: '0.75rem', marginTop: '24px' }}>
              Built with Nuxt, Prismic, Vercel, Supabase.<br />
              Typeface: Inter &amp; SF Mono.
            </div>
          </div>

          {/* Col 3 */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            textAlign: 'right', justifyContent: 'space-between'
          }}>
            <div style={{ fontSize: '0.75rem' }}>© 2025</div>
            <div style={{
              fontFamily: fontMono,
              fontSize: '0.7rem',
              color: '#888888',
              textAlign: 'right',
              marginTop: 'auto'
            }}>
              RENDER: {renderMs}ms<br />
              X: {mouseX} Y: {mouseY}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;