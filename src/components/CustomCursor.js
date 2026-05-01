import { useEffect, useRef, useState } from 'react';

const CHARS = 'ｦｱｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789@#$%<>{}=+*'.split('');
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const FONT_SIZE = 13;

// ─────────────────────────────────────────────
//  MOBILE LAYER  — falling matrix rain, no cursor
// ─────────────────────────────────────────────
function MobileEffect() {
  const canvasRef = useRef(null);
  const columns   = useRef([]);
  const raf       = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      initColumns();
    };

    function initColumns() {
      const count = Math.floor(window.innerWidth / 28);
      columns.current = Array.from({ length: count }, (_, i) => ({
        x:       i * 28 + Math.random() * 14,
        y:       Math.random() * -window.innerHeight,
        speed:   0.4 + Math.random() * 0.5,
        chars:   Array.from({ length: 20 }, () => rand(CHARS)),
        mutate:  Array.from({ length: 20 }, () => Math.random() * 30 | 0),
        length:  8 + Math.floor(Math.random() * 12),
        opacity: 0.04 + Math.random() * 0.06,
      }));
    }

    resize();
    window.addEventListener('resize', resize);

    const tick = () => {
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'top';

      columns.current.forEach(col => {
        col.y += col.speed;
        if (col.y > H + col.length * FONT_SIZE) {
          col.y     = -col.length * FONT_SIZE;
          col.speed = 0.4 + Math.random() * 0.5;
          col.chars = Array.from({ length: 20 }, () => rand(CHARS));
        }

        col.mutate = col.mutate.map((m, ci) => {
          if (m <= 0) {
            col.chars[ci] = rand(CHARS);
            return Math.random() * 40 | 0;
          }
          return m - 1;
        });

        for (let ci = 0; ci < col.length; ci++) {
          const cy = col.y + ci * FONT_SIZE;
          if (cy < -FONT_SIZE || cy > H) continue;

          const isHead = ci === col.length - 1;
          const fade   = ci / col.length;

          let alpha;
          if (isHead) {
            alpha = col.opacity * 5;
            ctx.fillStyle = `rgba(200,240,255,${Math.min(alpha, 0.35)})`;
          } else {
            alpha = fade * col.opacity * 3.5;
            ctx.fillStyle = `rgba(6,182,212,${Math.min(alpha, 0.22)})`;
          }

          ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;
          ctx.fillText(col.chars[ci] || rand(CHARS), col.x, cy);
        }
      });

      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'fixed',
        inset:         0,
        pointerEvents: 'none',
        zIndex:        1,
      }}
    />
  );
}

// ─────────────────────────────────────────────
//  DESKTOP CURSOR  (mouse)
// ─────────────────────────────────────────────
function DesktopCursor() {
  const ambientRef   = useRef(null);
  const trailRef     = useRef(null);
  const reticleRef   = useRef(null);

  const particles    = useRef([]);
  const columns      = useRef([]);

  const mouse        = useRef({ x: -300, y: -300 });
  const prevMouse    = useRef({ x: -300, y: -300 });
  const lastSpawnPos = useRef({ x: -999, y: -999 });
  const raf          = useRef(null);
  const idleTimer    = useRef(null);
  const idleAlpha    = useRef(0);
  const targetIdle   = useRef(0);

  const [visible,  setVisible]  = useState(false);
  const [clicking, setClicking] = useState(false);
  const [isHover,  setIsHover]  = useState(false);

  useEffect(() => {
    const ambCanvas   = ambientRef.current;
    const trailCanvas = trailRef.current;
    const ambCtx      = ambCanvas.getContext('2d');
    const trailCtx    = trailCanvas.getContext('2d');

    const resize = () => {
      ambCanvas.width   = trailCanvas.width  = window.innerWidth;
      ambCanvas.height  = trailCanvas.height = window.innerHeight;
      initColumns();
    };

    function initColumns() {
      const count = Math.floor(window.innerWidth / 28);
      columns.current = Array.from({ length: count }, (_, i) => ({
        x:       i * 28 + Math.random() * 14,
        y:       Math.random() * -window.innerHeight,
        speed:   0.4 + Math.random() * 0.5,
        chars:   Array.from({ length: 20 }, () => rand(CHARS)),
        mutate:  Array.from({ length: 20 }, () => Math.random() * 30 | 0),
        length:  8 + Math.floor(Math.random() * 12),
        opacity: 0.04 + Math.random() * 0.06,
      }));
    }

    resize();
    window.addEventListener('resize', resize);

    function resetIdle() {
      targetIdle.current = 0;
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => { targetIdle.current = 1; }, 1500);
    }

    const SPAWN_INTERVAL = 14;

    const onMove = (e) => {
      prevMouse.current = { ...mouse.current };
      mouse.current     = { x: e.clientX, y: e.clientY };
      setVisible(true);
      resetIdle();

      const lx   = lastSpawnPos.current.x;
      const ly   = lastSpawnPos.current.y;
      const dx   = mouse.current.x - lx;
      const dy   = mouse.current.y - ly;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist >= SPAWN_INTERVAL) {
        const steps = Math.floor(dist / SPAWN_INTERVAL);
        for (let s = 0; s < steps; s++) {
          const t = (s + 1) / steps;
          spawnChar(lx + dx * t, ly + dy * t);
        }
        lastSpawnPos.current = { x: mouse.current.x, y: mouse.current.y };
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown  = () => { setClicking(true); spawnBurst(); };
    const onUp    = () => setClicking(false);
    const onOver  = (e) => {
      setIsHover(!!e.target.closest('a, button, [role="button"], input, textarea'));
    };

    document.addEventListener('mousemove',  onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);
    document.addEventListener('mouseover',  onOver);

    resetIdle();

    function spawnChar(x, y, burst = false) {
      const maxLife = burst ? 55 + Math.random() * 30 : 50 + Math.random() * 30;
      particles.current.push({
        x, y,
        char:        rand(CHARS),
        vy:          burst ? 0.5 + Math.random() * 1.0 : 0.25 + Math.random() * 0.45,
        vx:          (Math.random() - 0.5) * (burst ? 1.2 : 0.35),
        life:        maxLife,
        maxLife,
        size:        burst ? 11 + Math.random() * 6 : 10 + Math.random() * 5,
        mutateTimer: Math.floor(Math.random() * 14) + 6,
        mutateCount: 0,
      });
    }

    function spawnBurst() {
      for (let i = 0; i < 14; i++) spawnChar(mouse.current.x, mouse.current.y, true);
    }

    function trailColor(p) {
      const t = p.life / p.maxLife;
      if (t > 0.8)  return `rgba(220,245,255,${((t - 0.8) / 0.2) * 0.85})`;
      if (t > 0.45) return `rgba(6,182,212,${0.2 + ((t - 0.45) / 0.35) * 0.55})`;
      return `rgba(37,99,235,${(t / 0.45) * 0.4})`;
    }

    const tick = () => {
      const W = ambCanvas.width;
      const H = ambCanvas.height;

      idleAlpha.current += (targetIdle.current - idleAlpha.current) * 0.025;

      ambCtx.clearRect(0, 0, W, H);

      if (idleAlpha.current > 0.005) {
        columns.current.forEach(col => {
          col.y += col.speed;
          if (col.y > H + col.length * FONT_SIZE) {
            col.y     = -col.length * FONT_SIZE;
            col.speed = 0.4 + Math.random() * 0.5;
            col.chars = Array.from({ length: 20 }, () => rand(CHARS));
          }

          col.mutate = col.mutate.map((m, ci) => {
            if (m <= 0) {
              col.chars[ci] = rand(CHARS);
              return Math.random() * 40 | 0;
            }
            return m - 1;
          });

          for (let ci = 0; ci < col.length; ci++) {
            const cy = col.y + ci * FONT_SIZE;
            if (cy < -FONT_SIZE || cy > H) continue;

            const isHead = ci === col.length - 1;
            const fade   = ci / col.length;

            let alpha;
            if (isHead) {
              alpha = col.opacity * 5 * idleAlpha.current;
              ambCtx.fillStyle = `rgba(200,240,255,${Math.min(alpha, 0.35)})`;
            } else {
              alpha = fade * col.opacity * idleAlpha.current * 3.5;
              ambCtx.fillStyle = `rgba(6,182,212,${Math.min(alpha, 0.22)})`;
            }

            ambCtx.font         = `${FONT_SIZE}px "JetBrains Mono", monospace`;
            ambCtx.textAlign    = 'center';
            ambCtx.textBaseline = 'top';
            ambCtx.fillText(col.chars[ci] || rand(CHARS), col.x, cy);
          }
        });
      }

      trailCtx.clearRect(0, 0, W, H);
      trailCtx.textAlign    = 'center';
      trailCtx.textBaseline = 'middle';

      particles.current.forEach(p => {
        p.vy  *= 1.011;
        p.x   += p.vx;
        p.y   += p.vy;
        p.life--;

        p.mutateCount++;
        if (p.mutateCount >= p.mutateTimer) {
          p.char        = rand(CHARS);
          p.mutateTimer = Math.floor(Math.random() * 14) + 5;
          p.mutateCount = 0;
        }

        trailCtx.save();
        trailCtx.shadowColor = `rgba(6,182,212,${(p.life / p.maxLife) * 0.5})`;
        trailCtx.shadowBlur  = 8;
        trailCtx.font        = `${p.size}px "JetBrains Mono", monospace`;
        trailCtx.fillStyle   = trailColor(p);
        trailCtx.fillText(p.char, p.x, p.y);
        trailCtx.restore();
      });

      particles.current = particles.current.filter(p => p.life > 0);

      if (reticleRef.current) {
        reticleRef.current.style.transform =
          `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%,-50%)`;
      }

      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      clearTimeout(idleTimer.current);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      document.removeEventListener('mouseover',  onOver);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { cursor: none !important; }

        .cc-ambient {
          position: fixed; inset: 0;
          pointer-events: none;
          z-index: 1;
        }
        .cc-trail {
          position: fixed; inset: 0;
          pointer-events: none;
          z-index: 2;
        }
        .cc-reticle {
          position: fixed;
          top: 0; left: 0;
          pointer-events: none;
          z-index: 99999;
          will-change: transform;
          transition: opacity 0.15s ease;
        }
        .cc-reticle.hidden { opacity: 0; }
        .cc-outer {
          position: absolute; inset: 0;
          border-radius: 50%;
          animation: reticle-spin 4s linear infinite;
        }
        .cc-outer-ring {
          position: absolute; inset: 0;
          border-radius: 50%;
          border: 1.5px solid transparent;
          border-top-color:   rgba(6,182,212,0.9);
          border-right-color: rgba(6,182,212,0.9);
          box-shadow: 0 0 8px rgba(6,182,212,0.4);
        }
        .cc-outer-ring-2 {
          position: absolute; inset: 0;
          border-radius: 50%;
          border: 1.5px solid transparent;
          border-bottom-color: rgba(37,99,235,0.8);
          border-left-color:   rgba(37,99,235,0.8);
        }
        .cc-inner {
          position: absolute; inset: 7px;
          border-radius: 50%;
          animation: reticle-spin-reverse 2.5s linear infinite;
        }
        .cc-inner-ring {
          position: absolute; inset: 0;
          border-radius: 50%;
          border: 1px solid transparent;
          border-top-color:    rgba(6,182,212,0.7);
          border-bottom-color: rgba(6,182,212,0.7);
        }
        .cc-cross {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .cc-cross::before, .cc-cross::after {
          content: '';
          position: absolute;
          background: rgba(6,182,212,0.5);
          border-radius: 1px;
        }
        .cc-cross::before { width: 1px; height: 100%; }
        .cc-cross::after  { width: 100%; height: 1px; }
        .cc-center {
          position: absolute;
          top: 50%; left: 50%;
          width: 4px; height: 4px;
          margin: -2px 0 0 -2px;
          border-radius: 50%;
          background: #fff;
          box-shadow:
            0 0 4px  rgba(6,182,212,1),
            0 0 10px rgba(6,182,212,0.7),
            0 0 20px rgba(37,99,235,0.5);
        }
        .cc-corners { position: absolute; inset: -6px; }
        .cc-corner {
          position: absolute;
          width: 8px; height: 8px;
          border-color: rgba(6,182,212,0.8);
          border-style: solid;
        }
        .cc-corner.tl { top:0;    left:0;  border-width: 1.5px 0 0 1.5px; }
        .cc-corner.tr { top:0;    right:0; border-width: 1.5px 1.5px 0 0; }
        .cc-corner.bl { bottom:0; left:0;  border-width: 0 0 1.5px 1.5px; }
        .cc-corner.br { bottom:0; right:0; border-width: 0 1.5px 1.5px 0; }

        .cc-reticle.hovering .cc-outer-ring  { border-top-color: rgba(6,182,212,1); border-right-color: rgba(6,182,212,1); box-shadow: 0 0 14px rgba(6,182,212,0.8); }
        .cc-reticle.hovering .cc-inner-ring  { border-top-color: rgba(6,182,212,1); border-bottom-color: rgba(6,182,212,1); }
        .cc-reticle.hovering .cc-center      { box-shadow: 0 0 6px rgba(6,182,212,1), 0 0 18px rgba(6,182,212,0.9), 0 0 32px rgba(37,99,235,0.7); }
        .cc-reticle.hovering .cc-corner      { border-color: rgba(6,182,212,1); }
        .cc-reticle.clicking .cc-outer       { animation-play-state: paused; }
        .cc-reticle.clicking .cc-center      { background: #06b6d4; width: 6px; height: 6px; margin: -3px 0 0 -3px; }

        @keyframes reticle-spin         { to { transform: rotate(360deg);  } }
        @keyframes reticle-spin-reverse { to { transform: rotate(-360deg); } }
      `}</style>

      <canvas ref={ambientRef} className="cc-ambient" />
      <canvas ref={trailRef}   className="cc-trail" />

      <div
        ref={reticleRef}
        className={[
          'cc-reticle',
          !visible  ? 'hidden'   : '',
          isHover   ? 'hovering' : '',
          clicking  ? 'clicking' : '',
        ].join(' ')}
        style={{
          width:  isHover ? '44px' : '32px',
          height: isHover ? '44px' : '32px',
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.15s ease',
        }}
      >
        <div className="cc-outer">
          <div className="cc-outer-ring" />
          <div className="cc-outer-ring-2" />
        </div>
        <div className="cc-inner">
          <div className="cc-inner-ring" />
        </div>
        <div className="cc-cross" />
        <div className="cc-center" />
        <div className="cc-corners">
          <div className="cc-corner tl" />
          <div className="cc-corner tr" />
          <div className="cc-corner bl" />
          <div className="cc-corner br" />
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────
//  ROOT EXPORT — SSR-safe device detection
// ─────────────────────────────────────────────
function CustomCursor() {
  // null = not yet determined (SSR / before first paint)
  const [isTouch, setIsTouch] = useState(null);

  useEffect(() => {
    // Runs only on the client, after hydration — no SSR mismatch
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  // Render nothing until we know which device type we're on
  if (isTouch === null) return null;

  // Touch devices get matrix rain only — no cursor
  return isTouch ? <MobileEffect /> : <DesktopCursor />;
}

export default CustomCursor;