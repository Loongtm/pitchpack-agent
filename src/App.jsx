import { useMemo, useState } from 'react';
import { generatePitchPack } from './agent/pitchpackAgent.js';

const initialForm = {
  projectName: 'PitchPack Agent',
  projectIdea:
    'An AI agent that helps hackathon builders turn rough ideas into complete judge-ready submission packs.',
  targetUsers: 'hackathon builders, solo developers, student teams, and startup builders',
  techStack: 'React, Vite, JavaScript, local agent logic, CAP-style JSON receipt',
  track: 'Creator & Content Ops Agents'
};

const sectionLabels = {
  buidlDescription: 'DoraHacks BUIDL Description',
  problemStatement: 'Problem Statement',
  solution: 'Solution',
  keyFeatures: 'Key Features',
  readmeStarter: 'README Starter',
  pitchScript: '60-Second Pitch Script',
  demoScript: 'Demo Video Script',
  socialPost: 'Social Launch Post'
};

function Field({ label, name, value, onChange, textarea = false, placeholder }) {
  const Component = textarea ? 'textarea' : 'input';
  return (
    <label className="field">
      <span>{label}</span>
      <Component
        name={name}
        value={value}
        placeholder={placeholder}
        rows={textarea ? 5 : undefined}
        onChange={(event) => onChange(name, event.target.value)}
      />
    </label>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1300);
  };

  return (
    <button className="copy-button" type="button" onClick={handleCopy}>
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function OutputSection({ title, content }) {
  return (
    <article className="output-card">
      <div className="output-header">
        <h3>{title}</h3>
        <CopyButton text={content} />
      </div>
      <pre>{content}</pre>
    </article>
  );
}

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [pack, setPack] = useState(() => generatePitchPack(initialForm));
  const [activeTab, setActiveTab] = useState('pack');

  const receiptText = useMemo(() => JSON.stringify(pack.receipt, null, 2), [pack]);

  const updateField = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const generatePack = () => {
    setPack(generatePitchPack(form));
    setActiveTab('pack');
  };

  const resetExample = () => {
    setForm({
      projectName: 'RiskPilot Mini',
      projectIdea:
        'An AI wallet risk assistant that reads DeFi wallet activity and explains risky positions in simple language.',
      targetUsers: 'crypto beginners, DeFi users, wallet builders, and risk analysts',
      techStack: 'React, JavaScript, wallet data mock, AI risk explanation, CAP-style receipt',
      track: 'Research & Intelligence Agents'
    });
  };

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">CROO Agent Hackathon MVP</p>
          <h1>PitchPack Agent</h1>
          <p>
            A creator and content operations agent that turns rough hackathon ideas into
            judge-ready BUIDL pages, README starters, pitch scripts, demo scripts, and
            CAP-style task receipts.
          </p>
          <div className="hero-actions">
            <button type="button" onClick={generatePack}>
              Generate Submission Pack
            </button>
            <button className="secondary" type="button" onClick={resetExample}>
              Load Example Idea
            </button>
          </div>
        </div>
        <div className="hero-card">
          <span className="status-dot" />
          <p>Agent status</p>
          <strong>Ready for creator ops task</strong>
          <small>Output: 8 content sections + CAP-style receipt</small>
        </div>
      </section>

      <section className="workspace">
        <form className="form-panel" onSubmit={(event) => event.preventDefault()}>
          <div className="panel-title">
            <p className="eyebrow">Input</p>
            <h2>Raw builder context</h2>
          </div>

          <Field label="Project Name" name="projectName" value={form.projectName} onChange={updateField} />
          <Field
            label="Rough Project Idea"
            name="projectIdea"
            value={form.projectIdea}
            onChange={updateField}
            textarea
          />
          <Field label="Target Users" name="targetUsers" value={form.targetUsers} onChange={updateField} />
          <Field label="Tech Stack" name="techStack" value={form.techStack} onChange={updateField} />
          <Field label="Hackathon Track" name="track" value={form.track} onChange={updateField} />

          <button className="full-button" type="button" onClick={generatePack}>
            Generate Submission Pack
          </button>
        </form>

        <section className="results-panel">
          <div className="tabs">
            <button
              className={activeTab === 'pack' ? 'active' : ''}
              type="button"
              onClick={() => setActiveTab('pack')}
            >
              Submission Pack
            </button>
            <button
              className={activeTab === 'receipt' ? 'active' : ''}
              type="button"
              onClick={() => setActiveTab('receipt')}
            >
              CAP-Style Receipt
            </button>
          </div>

          {activeTab === 'pack' ? (
            <div className="outputs">
              {Object.entries(sectionLabels).map(([key, label]) => (
                <OutputSection key={key} title={label} content={pack[key]} />
              ))}
            </div>
          ) : (
            <OutputSection title="Agent Job Receipt" content={receiptText} />
          )}
        </section>
      </section>
    </main>
  );
}
