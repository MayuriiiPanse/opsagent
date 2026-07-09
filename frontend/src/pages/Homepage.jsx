import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Homepage.css";

const steps = [
  {
    number: 1,
    icon: "🏢",
    title: "Add your organization",
    description: "Tell us about your organization and facilities."
  },
  {
    number: 2,
    icon: "🔗",
    title: "Connect your data",
    description: "Integrate your systems to bring in assets, work orders, and more."
  },
  {
    number: 3,
    icon: "🤖",
    title: "Activate AI agents",
    description: "Choose agents, set goals, and let OpsAgent get to work."
  }
];

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <header className="home-nav">
        <div className="home-brand">
          <span className="home-logo">⬡</span>
          <div>
            <span className="home-brand-name">OpsAgent</span>
            <span className="home-brand-divider">|</span>
            <span className="home-brand-sub">Agentic Facility Ops AI Platform</span>
          </div>
        </div>
        <a className="home-help" href="#help">
          <span>❓</span> Need help?
        </a>
      </header>

      <section className="home-hero">
        <div className="home-hero-copy">
          <h1>
            Get started with <span className="accent">OpsAgent</span>
          </h1>
          <p>
            Set up your workspace in a few simple steps and let AI agents
            handle your facility operations.
          </p>
        </div>
        <div className="home-hero-art" aria-hidden="true">
          <div className="floating-icon icon-1">📋</div>
          <div className="floating-icon icon-2">📊</div>
          <div className="hexagon">⬡</div>
          <div className="floating-icon icon-3">◔</div>
          <div className="floating-icon icon-4">📋</div>
        </div>
      </section>

      <section className="home-steps-section">
        <h2>Start in 3 simple steps</h2>
        <div className="steps-progress">
          <span className="dash active" />
          <span className="dash" />
          <span className="dash" />
        </div>

        <div className="steps-grid">
          {steps.map((s) => (
            <div className="step-card" key={s.number}>
              <span className="step-number">{s.number}</span>
              <div className="step-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>

        <button className="btn btn-primary cta" onClick={() => navigate("/dashboard")}>
          Let's get started <span>›</span>
        </button>
        <p className="cta-note">Takes ~5 minutes</p>

        <div className="secure-banner">
          <span className="secure-icon">🛡️</span>
          <div>
            <strong>Your data is secure and never shared.</strong>
            <p>You're in control at every step.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
