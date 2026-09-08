'use client';

import { useState } from 'react';

type Shot = {
  title: string;
  category: string;
  description: string;
  src: string;
  accent: string;
};

const systems: Shot[] = [
  {
    title: '主城与公会空间',
    category: 'HUB WORLD',
    description: '用主城承载公会科技、贡献、探矿与副本入口，让成长系统集中在一个可探索的空间里。',
    src: '/game/guild-home.png',
    accent: 'cyan',
  },
  {
    title: '战斗与召唤',
    category: 'COMBAT LOOP',
    description: '从战斗倒计时、召唤槽到自动战斗入口，完整呈现关卡内的即时玩法节奏。',
    src: '/game/battle.png',
    accent: 'violet',
  },
  {
    title: '关卡与敌人信息',
    category: 'ENEMY DESIGN',
    description: '展示关卡推进、敌人弱点、抗性与首通奖励等信息组织方式。',
    src: '/game/boss.png',
    accent: 'amber',
  },
  {
    title: '副本挑战',
    category: 'PVE CONTENT',
    description: '多种副本入口用不同主题区分，并配合排名、奖励和解锁状态形成挑战路径。',
    src: '/game/dungeons.png',
    accent: 'pink',
  },
];

const featureShots: Shot[] = [
  {
    title: '公会科技树',
    category: 'PROGRESSION',
    description: '分支式科技升级与资源消耗反馈。',
    src: '/game/guild-tech.png',
    accent: 'cyan',
  },
  {
    title: '公会砍价',
    category: 'SOCIAL ECONOMY',
    description: '基于公会成员协作的动态折扣交互。',
    src: '/game/guild-trade.png',
    accent: 'violet',
  },
  {
    title: '关卡排行榜',
    category: 'RANKING',
    description: '关卡榜单、段位奖励与玩家进度展示。',
    src: '/game/ranking.png',
    accent: 'amber',
  },
  {
    title: '月卡系统',
    category: 'LIVE OPS',
    description: '权益对比、每日奖励与续费状态信息。',
    src: '/game/subscription.png',
    accent: 'pink',
  },
  {
    title: '邮件与奖励',
    category: 'REWARD FLOW',
    description: '批量领取、已读状态和奖励内容确认。',
    src: '/game/mail.png',
    accent: 'cyan',
  },
  {
    title: '通关奖励',
    category: 'FEEDBACK',
    description: '结算弹窗与奖励反馈，强化通关成就感。',
    src: '/game/reward.png',
    accent: 'amber',
  },
];

function ShotCard({ shot, onOpen }: { shot: Shot; onOpen: (shot: Shot) => void }) {
  return (
    <button className={`shot-card accent-${shot.accent}`} onClick={() => onOpen(shot)} type="button">
      <span className="shot-image-wrap">
        <img alt={shot.title} className="shot-image" loading="lazy" src={shot.src} />
        <span className="zoom-hint">查看大图 ↗</span>
      </span>
      <span className="shot-card-copy">
        <span className="eyebrow">{shot.category}</span>
        <span className="shot-title">{shot.title}</span>
        <span className="shot-description">{shot.description}</span>
      </span>
    </button>
  );
}

export default function Home() {
  const [selected, setSelected] = useState<Shot | null>(null);

  return (
    <main className="site-shell">
      <nav className="topbar">
        <a className="brand" href="#top" aria-label="返回顶部">
          <span className="brand-mark">LH</span>
          <span>LIU HAI / GAME DEV</span>
        </a>
        <div className="nav-links">
          <a href="#systems">系统展示</a>
          <a href="#gallery">全部截图</a>
          <a className="nav-cta" href="#contact">联系我 <span>↗</span></a>
        </div>
      </nav>

      <section className="hero section-pad" id="top">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow"><span className="status-dot" /> GAMEPLAY PORTFOLIO · 2026</div>
          <h1>幻想冒险 RPG<br /><em>玩法系统作品集</em></h1>
          <p className="hero-lede">
            一组移动端 RPG 游戏系统与玩法界面。从主城、公会成长，到关卡战斗与奖励反馈，记录一个游戏世界如何被组织、推进和反复游玩。
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#systems">查看玩法模块 <span>↓</span></a>
            <a className="text-link" href="#gallery">浏览全部截图 <span>↗</span></a>
          </div>
          <div className="hero-meta">
            <div><span className="meta-label">ROLE</span><strong>Game Development</strong></div>
            <div><span className="meta-label">FORMAT</span><strong>Mobile RPG</strong></div>
            <div><span className="meta-label">SCOPE</span><strong>Gameplay · UI · Systems</strong></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="hero-phone-frame">
            <img alt="游戏主城与关卡入口界面" src="/game/home.png" />
          </div>
          <div className="float-card float-card-top"><span>01</span><strong>主城循环</strong><small>Explore · Grow · Return</small></div>
          <div className="float-card float-card-bottom"><span>02</span><strong>战斗反馈</strong><small>Summon · Fight · Reward</small></div>
        </div>
      </section>

      <section className="signal-strip section-pad" aria-label="作品集概览">
        <div className="signal-item"><strong>11</strong><span>张核心界面截图</span></div>
        <div className="signal-item"><strong>05</strong><span>个玩法系统模块</span></div>
        <div className="signal-item"><strong>01</strong><span>个移动端 RPG 作品</span></div>
        <div className="signal-item signal-note"><span>点击任意截图<br />可查看高清大图</span><b>↘</b></div>
      </section>

      <section className="intro-section section-pad" id="systems">
        <div className="section-kicker">01 / CORE SYSTEMS</div>
        <div className="section-heading-row">
          <h2>让玩家不断回来<br /><em>继续成长。</em></h2>
          <p>作品重点放在“循环”本身：玩家进入主城，选择一个挑战，完成战斗，再把奖励投入下一轮成长。每个界面都是这条循环上的一个节点。</p>
        </div>
        <div className="systems-grid">
          {systems.map((shot) => <ShotCard key={shot.src} onOpen={setSelected} shot={shot} />)}
        </div>
      </section>

      <section className="dark-band">
        <div className="section-pad dark-band-inner">
          <div className="section-kicker">02 / PLAYER JOURNEY</div>
          <div className="journey-grid">
            <div>
              <h2>从一次点击，<br /><em>走完一轮成长。</em></h2>
              <p>用清晰的入口和强烈的反馈，让不同系统彼此连接：主城是起点，副本是目标，公会与奖励是长期留存的动力。</p>
            </div>
            <div className="journey-steps">
              <div className="journey-step"><span>01</span><div><strong>进入主城</strong><small>快速识别可操作的功能入口</small></div></div>
              <div className="journey-step"><span>02</span><div><strong>选择挑战</strong><small>副本、排行与敌人信息形成决策</small></div></div>
              <div className="journey-step"><span>03</span><div><strong>战斗与结算</strong><small>召唤、自动战斗、掉落与奖励反馈</small></div></div>
              <div className="journey-step"><span>04</span><div><strong>投入成长</strong><small>公会科技、月卡和资源循环继续推进</small></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="gallery-section section-pad" id="gallery">
        <div className="section-kicker">03 / UI &amp; LIVE SYSTEMS</div>
        <div className="section-heading-row gallery-heading">
          <h2>细节决定<br /><em>游戏的手感。</em></h2>
          <p>从系统入口到结算弹窗，所有界面都围绕信息层级、操作反馈和视觉节奏展开。点击卡片查看原图。</p>
        </div>
        <div className="gallery-grid">
          {featureShots.map((shot) => <ShotCard key={shot.src} onOpen={setSelected} shot={shot} />)}
        </div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <div className="contact-panel">
          <div>
            <div className="section-kicker">04 / NEXT LEVEL</div>
            <h2>一起做一个<br /><em>值得被玩的世界。</em></h2>
          </div>
          <div className="contact-copy">
            <p>这是刘海的游戏开发作品集。简历中可以直接附上这个页面，让面试官先看到玩法，再了解你的技术经历。</p>
            <div className="contact-line"><span>GAME DEVELOPMENT ENGINEER</span><span>LIU HAI / 2026</span></div>
          </div>
        </div>
      </section>

      <footer className="footer section-pad"><span>LIU HAI / GAMEPLAY PORTFOLIO</span><span>Made for game development applications <b>✦</b></span></footer>

      {selected && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={selected.title} onClick={() => setSelected(null)}>
          <button aria-label="关闭大图" className="lightbox-close" onClick={() => setSelected(null)} type="button">×</button>
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <img alt={selected.title} src={selected.src} />
            <div><span className="eyebrow">{selected.category}</span><strong>{selected.title}</strong></div>
          </div>
        </div>
      )}
    </main>
  );
}
