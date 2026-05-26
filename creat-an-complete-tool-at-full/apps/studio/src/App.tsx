import { useEffect, useState } from "react";
import type { CompiledCommand, ExecuteResponse, Workflow } from "@evona/contracts";

type WorkflowListResponse = {
  ok: boolean;
  workflows: Workflow[];
};

type HealthResponse = {
  ok: boolean;
  aiConfigured: boolean;
  service: string;
};

export function App() {
  const [prompt, setPrompt] = useState("open chrome and go to youtube");
  const [compiled, setCompiled] = useState<CompiledCommand | null>(null);
  const [execution, setExecution] = useState<ExecuteResponse | null>(null);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [aiConfigured, setAiConfigured] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void loadHealth();
    void loadWorkflows();
  }, []);

  async function loadHealth() {
    const response = await fetch("/health");
    const data = (await response.json()) as HealthResponse;
    setAiConfigured(data.aiConfigured);
  }

  async function loadWorkflows() {
    const response = await fetch("/v1/workflows");
    const data = (await response.json()) as WorkflowListResponse;
    setWorkflows(data.workflows);
  }

  async function compileCommand() {
    setBusy(true);
    setExecution(null);
    try {
      const response = await fetch("/v1/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: prompt, previewOnly: true })
      });
      const data = (await response.json()) as { command: CompiledCommand };
      setCompiled(data.command);
    } finally {
      setBusy(false);
    }
  }

  async function executeCompiled(dryRun: boolean) {
    if (!compiled) {
      return;
    }

    setBusy(true);
    try {
      const response = await fetch("/v1/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workflow: compiled.workflow, dryRun })
      });
      const data = (await response.json()) as ExecuteResponse;
      setExecution(data);
    } finally {
      setBusy(false);
    }
  }

  async function executeWorkflow(id: string) {
    setBusy(true);
    try {
      const response = await fetch(`/v1/workflows/${id}/execute`, {
        method: "POST"
      });
      const data = (await response.json()) as ExecuteResponse;
      setExecution(data);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="shell">
      <div className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Local Desktop Intelligence</p>
          <h1>EVONA AUTOMATION</h1>
          <p className="summary">
            Compile custom language into auditable Windows automation flows with a
            workflow engine, policy guardrails, and optional AI planning through
            the <code>JARVIS</code> key.
          </p>
        </div>
        <div className="status-card">
          <span className={`status-dot ${aiConfigured ? "active" : "idle"}`} />
          <div>
            <strong>{aiConfigured ? "JARVIS connected" : "JARVIS placeholder"}</strong>
            <p>{aiConfigured ? "AI planning ready." : "Replace JARVIS=null in .env to enable AI."}</p>
          </div>
        </div>
      </div>

      <div className="grid">
        <section className="panel command-panel">
          <div className="panel-header">
            <h2>Command Studio</h2>
            <p>Describe what the PC should do.</p>
          </div>
          <textarea
            className="command-box"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="open downloads folder then launch chrome"
          />
          <div className="actions">
            <button onClick={() => void compileCommand()} disabled={busy}>
              Compile Flow
            </button>
            <button onClick={() => void executeCompiled(true)} disabled={busy || !compiled}>
              Dry Run
            </button>
            <button className="accent" onClick={() => void executeCompiled(false)} disabled={busy || !compiled}>
              Execute
            </button>
          </div>
          {compiled ? (
            <div className="preview">
              <h3>Compiled Workflow</h3>
              <p>{compiled.workflow.description}</p>
              <div className="chips">
                {compiled.workflow.nodes.map((node) => (
                  <span key={node.id} className="chip">
                    {node.action}
                  </span>
                ))}
              </div>
              {compiled.reasoning.length > 0 ? (
                <ul className="notes">
                  {compiled.reasoning.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {compiled.warnings.length > 0 ? (
                <div className="warning-block">
                  {compiled.warnings.map((warning) => (
                    <p key={warning}>{warning}</p>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>Built-in Workflows</h2>
            <p>Reusable flows inspired by automation boards.</p>
          </div>
          <div className="workflow-list">
            {workflows.map((workflow) => (
              <article key={workflow.id} className="workflow-card">
                <div>
                  <h3>{workflow.name}</h3>
                  <p>{workflow.description}</p>
                </div>
                <button onClick={() => void executeWorkflow(workflow.id)} disabled={busy}>
                  Run Flow
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>Execution Feed</h2>
            <p>Review what happened node by node.</p>
          </div>
          {execution ? (
            <div className="event-list">
              {execution.events.map((event) => (
                <article key={`${event.nodeId}-${event.timestamp}`} className={`event event-${event.status}`}>
                  <strong>{event.nodeId}</strong>
                  <p>{event.message}</p>
                  <span>{new Date(event.timestamp).toLocaleTimeString()}</span>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">No execution yet. Compile a flow or run a built-in workflow.</div>
          )}
        </section>
      </div>
    </div>
  );
}
