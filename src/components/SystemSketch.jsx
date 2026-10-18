import Icon from "./Icon.jsx";

export default function SystemSketch({ type }) {
  if (type === "rice")
    return (
      <div className="rice-demo" aria-hidden="true">
        <div className="rice-topbar">
          <span>
            <Icon name="spark" /> Rice Leaf Lab
          </span>
          <span>BIT MESRA / COMPUTER VISION</span>
        </div>
        <div className="rice-workflow">
          <div className="leaf-sample">
            <svg viewBox="0 0 120 140" fill="none">
              <path
                d="M19 123C9 63 53 22 104 11c3 57-16 103-69 111"
                fill="#a4b580"
              />
              <path
                d="M19 123 95 25M42 96l-3-34m20 13-3-31m-3 38 34-5m-17-16 25-7"
                stroke="#698553"
                strokeWidth="2"
              />
              <path
                d="m67 50 7 11-9 9-8-9zm-26 35 8 6-4 8-8-5z"
                fill="#cab184"
              />
            </svg>
            <span>INPUT / LEAF IMAGE</span>
          </div>
          <div className="rice-model">
            <span className="rice-model-label">TRANSFER LEARNING</span>
            <h4>VGG16</h4>
            <p>4 disease classes</p>
            <div className="model-comparison">
              <span>ResNet50</span>
              <span>EfficientNet</span>
              <span>Custom CNN</span>
            </div>
          </div>
        </div>
        <div className="rice-metrics">
          <div>
            <strong>
              87.21<span>%</span>
            </strong>
            <span>TEST ACCURACY</span>
          </div>
          <div>
            <strong>
              87.20<span>%</span>
            </strong>
            <span>F1-SCORE</span>
          </div>
          <span className="gradio-tag">
            <span className="status-dot" /> Gradio interface
          </span>
        </div>
      </div>
    );
  if (type === "hero")
    return (
      <div
        className="hero-system"
        aria-label="DocuMind architecture illustration: documents are embedded, retrieved, and used to generate a contextual answer"
        role="img"
      >
        <div className="system-document">
          <span className="document-symbol">
            <Icon name="file" />
          </span>
          <div>
            <strong>research_notes.pdf</strong>
            <span>Every answer starts with context.</span>
          </div>
          <span className="file-type">PDF</span>
        </div>
        <div className="flow-wire">
          <span />
          <span />
          <span />
        </div>
        <div className="engine-card">
          <div className="engine-header">
            <span className="engine-brand">
              <Icon name="spark" /> DocuMind
            </span>
            <span className="engine-tag">RAG PIPELINE</span>
          </div>
          <div className="pipeline-stages">
            <div>
              <span>01</span>
              <Icon name="layers" />
              <strong>Embed</strong>
              <small>SentenceTransformers</small>
            </div>
            <i />
            <div>
              <span>02</span>
              <Icon name="database" />
              <strong>Retrieve</strong>
              <small>FAISS vector search</small>
            </div>
            <i />
            <div>
              <span>03</span>
              <Icon name="spark" />
              <strong>Generate</strong>
              <small>Context-aware LLM</small>
            </div>
          </div>
          <div className="engine-footer">
            <span className="status-dot" /> FastAPI <i /> PostgreSQL <i /> React
          </div>
        </div>
        <div className="answer-wire" />
        <div className="answer-card">
          <span className="answer-avatar">
            <Icon name="spark" />
          </span>
          <div>
            <strong>Less searching. More understanding.</strong>
            <span>Documents in. Contextual answers out.</span>
            <div className="answer-tags">
              <span>Semantic retrieval</span>
              <span>Streaming</span>
            </div>
          </div>
        </div>
        <span className="sketch-caption">A LOOK INSIDE THE ARCHITECTURE</span>
      </div>
    );
  if (type === "documind")
    return (
      <div className="doc-demo" aria-hidden="true">
        <div className="demo-topbar">
          <span className="demo-brand">
            <Icon name="spark" /> DocuMind
          </span>
          <span>YOUR DOCUMENTS, CONNECTED</span>
        </div>
        <div className="doc-demo-body">
          <div className="doc-sidebar">
            <span>WORKSPACE</span>
            <p>
              <Icon name="file" /> Research.pdf
            </p>
            <p>
              <Icon name="file" /> Notes.docx
            </p>
            <div className="index-ready">
              <span className="status-dot" /> Indexed for retrieval
            </div>
          </div>
          <div className="doc-conversation">
            <span className="question-bubble">What connects these ideas?</span>
            <div className="mock-answer">
              <Icon name="spark" />
              <div>
                <span />
                <span />
                <span className="short" />
                <div className="source-chips">
                  <b>Retrieval</b>
                  <b>Context</b>
                </div>
              </div>
            </div>
            <div className="mock-input">
              Ask your documents anything
              <Icon name="arrowUp" />
            </div>
          </div>
        </div>
      </div>
    );
  if (type === "tweetie")
    return (
      <div className="tweetie-demo" aria-hidden="true">
        <div className="feed-sidebar">
          <span className="tweetie-brand">t.</span>
          <Icon name="globe" />
          <Icon name="file" />
          <Icon name="code" />
        </div>
        <div className="feed-panel">
          <div className="feed-title">
            For you <span>Following</span>
            <Icon name="spark" />
          </div>
          <div className="feed-post">
            <div className="mock-avatar">ag</div>
            <div>
              <strong>
                Aryan Gupta <span>@aryan</span>
              </strong>
              <p>Building the backend behind the feed.</p>
              <div className="feed-code">
                <span>score = engagement / age</span>
                <small>Time-decay ranking + background worker</small>
              </div>
              <div className="feed-post-bottom">
                <span>↗ Ranking</span>
                <span>◌ API</span>
                <span>♡ React</span>
              </div>
            </div>
          </div>
          <div className="feed-post skeleton-post">
            <div className="mock-avatar">↗</div>
            <div>
              <b />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    );
  if (type === "dpi")
    return (
      <div className="packet-demo" aria-hidden="true">
        <div className="packet-title">
          <Icon name="terminal" />
          <span>dpi_engine / packet trace</span>
          <span>PCAP</span>
        </div>
        <div className="packet-grid">
          <span>PROTOCOL</span>
          <span>CLASSIFIER</span>
          <span>RULE</span>
          {[
            ["TLS 1.3", "SNI extraction", "ALLOW"],
            ["HTTP", "Host header", "ALLOW"],
            ["DNS", "Domain lookup", "FILTER"],
          ].map((row, rowIndex) =>
            row.map((value, index) => (
              <span
                key={`${rowIndex}-${index}`}
                className={
                  index === 2
                    ? `packet-rule ${value === "FILTER" ? "filtered" : ""}`
                    : ""
                }
              >
                {value}
              </span>
            )),
          )}
        </div>
        <div className="packet-flow">
          <span>PCAP</span>
          <Icon name="arrowRight" />
          <span>Parse</span>
          <Icon name="arrowRight" />
          <span>Classify</span>
          <Icon name="arrowRight" />
          <span>Filter</span>
        </div>
        <p>
          <span className="status-dot" /> C++17 <i /> Thread-safe queues <i />{" "}
          Flow tracking
        </p>
      </div>
    );
  return null;
}
