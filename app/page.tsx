'use client';

import { useEffect, useRef, type CSSProperties, type MouseEvent, type PointerEvent } from 'react';
import { ArrowUpRight, Mail, Maximize2, X } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { profile } from './profile';

export const dynamic = 'force-static';

type Screenshot = { title: string; src: string };

function AmbientBackdrop() {
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function moveCursor(event: globalThis.PointerEvent) {
      if (event.pointerType === 'touch' || reducedMotion.matches) return;
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        root.style.setProperty('--ambient-cursor-x', `${event.clientX}px`);
        root.style.setProperty('--ambient-cursor-y', `${event.clientY}px`);
        root.style.setProperty('--ambient-cursor-opacity', '1');
        frame.current = null;
      });
    }

    function hideCursor() {
      root.style.setProperty('--ambient-cursor-opacity', '0');
    }

    window.addEventListener('pointermove', moveCursor, { passive: true });
    document.addEventListener('mouseleave', hideCursor);

    return () => {
      window.removeEventListener('pointermove', moveCursor);
      document.removeEventListener('mouseleave', hideCursor);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      root.style.removeProperty('--ambient-cursor-x');
      root.style.removeProperty('--ambient-cursor-y');
      root.style.removeProperty('--ambient-cursor-opacity');
    };
  }, []);

  return (
    <div className="ambient-backdrop" aria-hidden="true">
      <div className="ambient-base" />
      <div className="ambient-raster">
        {Array.from({ length: 32 }, (_, index) => (
          <span className="ambient-strip" key={index} />
        ))}
      </div>
      <div className="ambient-cursor-glow" />
      <div className="ambient-vignette" />
    </div>
  );
}

const screens = {
  home: { title: '主界面', src: '/game/home.png' },
  battle: { title: '战斗', src: '/game/battle.png' },
  guild: { title: '公会大厅', src: '/game/guild-home.png' },
  boss: { title: '关卡信息', src: '/game/boss.png' },
  dungeons: { title: '副本', src: '/game/dungeons.png' },
  technology: { title: '公会科技', src: '/game/guild-tech.png' },
  trade: { title: '公会砍价', src: '/game/guild-trade.png' },
  ranking: { title: '排行榜', src: '/game/ranking.png' },
  subscription: { title: '月卡', src: '/game/subscription.png' },
  mail: { title: '邮箱', src: '/game/mail.png' },
  reward: { title: '奖励弹窗', src: '/game/reward.png' },
} satisfies Record<string, Screenshot>;

function Screen({
  shot,
  className = '',
  eager = false,
}: {
  shot: Screenshot;
  className?: string;
  eager?: boolean;
}) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const lightFrame = useRef<number | null>(null);
  const imageSrc = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${shot.src}`;
  const artwork = { '--screen-art': `url("${imageSrc}")` } as CSSProperties;

  useEffect(() => () => {
    if (lightFrame.current !== null) cancelAnimationFrame(lightFrame.current);
  }, []);

  function moveGlassLight(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const element = event.currentTarget;
    const bounds = element.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    if (lightFrame.current !== null) cancelAnimationFrame(lightFrame.current);
    lightFrame.current = requestAnimationFrame(() => {
      if (element.isConnected) {
        element.style.setProperty('--light-x', `${x}%`);
        element.style.setProperty('--light-y', `${y}%`);
      }
      lightFrame.current = null;
    });
  }

  function resetGlassLight() {
    if (lightFrame.current !== null) cancelAnimationFrame(lightFrame.current);
    lightFrame.current = null;
    viewerRef.current?.style.removeProperty('--light-x');
    viewerRef.current?.style.removeProperty('--light-y');
  }

  function prepareViewerOrigin(event: MouseEvent<HTMLButtonElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const originX = bounds.left + bounds.width / 2 - window.innerWidth / 2;
    const originY = bounds.top + bounds.height / 2 - window.innerHeight / 2;
    document.documentElement.style.setProperty('--viewer-origin-x', `${originX}px`);
    document.documentElement.style.setProperty('--viewer-origin-y', `${originY}px`);
  }

  return (
    <figure className={`screen ${className}`} style={artwork}>
      <figcaption>{shot.title}</figcaption>
      <Dialog>
        <DialogTrigger
          className="screen-trigger"
          aria-label={`放大查看${shot.title}`}
          onClick={prepareViewerOrigin}
        >
          <span className="screen-glass">
            <img
              className="screen-image"
              alt={shot.title}
              src={imageSrc}
              width={520}
              height={925}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
            />
            <span className="expand-icon" aria-hidden="true">
              <Maximize2 size={18} strokeWidth={1.5} />
            </span>
          </span>
        </DialogTrigger>
        <DialogContent
          ref={viewerRef}
          className="image-viewer"
          style={artwork}
          showCloseButton={false}
          aria-describedby={undefined}
          initialFocus={(method) => method === 'keyboard' ? true : viewerRef.current}
          onPointerMove={moveGlassLight}
          onPointerLeave={resetGlassLight}
        >
          <div className="viewer-ambient" aria-hidden="true" />
          <div className="viewer-glaze" aria-hidden="true" />
          <div className="viewer-toolbar">
            <DialogTitle className="viewer-title">{shot.title}</DialogTitle>
            <DialogClose className="viewer-close" aria-label="关闭大图">
              <X size={22} strokeWidth={1.6} aria-hidden="true" />
            </DialogClose>
          </div>
          <div className="viewer-stage">
            <img src={imageSrc} alt={shot.title} />
          </div>
        </DialogContent>
      </Dialog>
    </figure>
  );
}

export default function Home() {
  return (
    <div className="showcase">
      <AmbientBackdrop />
      <a className="skip-link" href="#screenshots">跳转到游戏截图</a>

      <header className="masthead">
        <h1 className="game-title">{profile.gameTitle}</h1>
        {profile.email && (
          <a className="email-link" href={`mailto:${profile.email}`}>
            <Mail size={17} strokeWidth={1.5} aria-hidden="true" />
            <span>{profile.email}</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        )}
      </header>

      <main id="screenshots">
        <section className="featured-stage" aria-label="游戏主要界面">
          <div className="featured-screens">
            <Screen shot={screens.home} className="featured-screen featured-home" eager />
            <Screen shot={screens.battle} className="featured-screen featured-battle" eager />
            <Screen shot={screens.guild} className="featured-screen featured-guild" eager />
          </div>
        </section>

        <div className="paired-sections">
          <section className="gallery-section" aria-labelledby="battle-title">
            <h2 id="battle-title">关卡与副本</h2>
            <div className="screen-pair">
              <Screen shot={screens.boss} />
              <Screen shot={screens.dungeons} />
            </div>
          </section>
          <section className="gallery-section" aria-labelledby="guild-title">
            <h2 id="guild-title">公会</h2>
            <div className="screen-pair">
              <Screen shot={screens.technology} />
              <Screen shot={screens.trade} />
            </div>
          </section>
        </div>

        <section className="gallery-section other-section" aria-labelledby="other-title">
          <h2 id="other-title">其他界面</h2>
          <div className="other-screens">
            {[screens.ranking, screens.subscription, screens.mail, screens.reward].map((shot) => (
              <Screen key={shot.src} shot={shot} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
