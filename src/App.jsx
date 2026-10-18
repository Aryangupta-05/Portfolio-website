import { useEffect, useRef, useState } from "react";
import { profile, projects, contributions, skills } from "./data/portfolio.js";
import Icon from "./components/Icon.jsx";
import SystemSketch from "./components/SystemSketch.jsx";

const external = { target: "_blank", rel: "noopener noreferrer" };
const featuredProjects = ["documind", "dpi", "tweetie", "rice"].map((id) =>
  projects.find((project) => project.id === id),
);

function SectionTitle({ number, eyebrow, title, children }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{number}</span> {eyebrow}
        </p>
        <h2>{title}</h2>
      </div>
      {children && <p className="section-intro">{children}</p>}
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <article className={`project-card project-${project.id}`}>
      <div className="project-art">
        <SystemSketch type={project.id} />
        <span className="art-caption">{project.visualLabel}</span>
      </div>
      <div className="project-content">
        <div className="project-meta">
          <span>{project.category}</span>
          <span>0{index + 1} / SELECTED WORK</span>
        </div>
        <h3>
          {project.name}
          <span>{project.subtitle}</span>
        </h3>
        <p>{project.description}</p>
        {project.id === "rice" && (
          <dl className="project-results">
            <div>
              <dt>Test accuracy</dt>
              <dd>87.21%</dd>
            </div>
            <div>
              <dt>F1-score</dt>
              <dd>87.20%</dd>
            </div>
          </dl>
        )}
        <div className="tags">
          {project.stack.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <details className="project-details">
          <summary>
            Inside the engineering <Icon name="plus" />
          </summary>
          <div className="detail-body">
            <p className="ownership">{project.ownership}</p>
            <ul>
              {project.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
        </details>
        <div className="project-actions">
          <a href={project.repo} {...external}>
            <Icon name="github" /> Source code <Icon name="arrowUp" />
          </a>
          {project.demo && (
            <a href={project.demo} {...external}>
              {project.demoLabel || "Live demo"} <Icon name="arrowUp" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectIndex() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const visible = [
    ...featuredProjects,
    ...projects.filter((project) => !project.featured),
  ].filter(
    (project) =>
      (filter === "All" || project.filters.includes(filter)) &&
      `${project.name} ${project.subtitle} ${project.stack.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <div className="project-index">
      <div className="index-header">
        <div>
          <p className="eyebrow">KEEP EXPLORING</p>
          <h3>
            The project index
            <span> / {projects.length.toString().padStart(2, "0")}</span>
          </h3>
        </div>
        <label className="search">
          <Icon name="search" />
          <span className="sr-only">Search projects by name or technology</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find a project or technology"
          />
        </label>
      </div>
      <div className="filter-bar" role="group" aria-label="Filter projects">
        {["All", "AI / ML", "Backend", "Frontend"].map((item) => (
          <button
            key={item}
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
            {item === "All" && <span>{projects.length}</span>}
          </button>
        ))}
        <span className="results-count" role="status" aria-live="polite">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </span>
      </div>
      <div className="project-list">
        {visible.map((project) => (
          <div className="project-row" key={project.id}>
            <span
              className={`row-icon ${project.filters.includes("AI / ML") ? "mint" : ""}`}
            >
              <Icon name={project.icon || "code"} />
            </span>
            <div className="row-name">
              <a href={project.repo} {...external}>
                {project.name}
                <Icon name="arrowUp" />
              </a>
              <p>{project.indexDescription || project.subtitle}</p>
            </div>
            <span className="row-kind">{project.kind || project.category}</span>
            <div className="row-links">
              {project.demo && (
                <a
                  href={project.demo}
                  {...external}
                  aria-label={`${project.name}: ${project.demoLabel || "Live demo"}`}
                >
                  {project.demoLabel || "Live demo"} <Icon name="arrowUp" />
                </a>
              )}
              <a
                href={project.repo}
                {...external}
                aria-label={`${project.name} on GitHub`}
              >
                <Icon name="github" />
              </a>
            </div>
          </div>
        ))}
      </div>
      {visible.length === 0 && (
        <div className="empty-state">
          <Icon name="search" />
          <h4>No projects found</h4>
          <p>Try a technology like Python, React, or Node.js.</p>
          <button
            className="text-link"
            onClick={() => {
              setFilter("All");
              setQuery("");
            }}
          >
            Reset filters <Icon name="arrowRight" />
          </button>
        </div>
      )}
      <p className="index-note">
        Projects and experiments from my GitHub. Explore more repositories and
        learning resources on{" "}
        <a href={`${profile.github}?tab=repositories`} {...external}>
          GitHub <Icon name="arrowUp" />
        </a>
        .
      </p>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [copyState, setCopyState] = useState("");
  const copyTimer = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        }),
      { rootMargin: "-15% 0px -55% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      clearTimeout(copyTimer.current);
    };
  }, []);
  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("Email copied");
    } catch {
      setCopyState("Copy unavailable. Use the email link to get in touch.");
    }
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyState(""), 4000);
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a className="wordmark" href="#home" aria-label="Aryan Gupta, home">
            ag<span>.</span>
          </a>
          <nav
            className={menuOpen ? "nav open" : "nav"}
            id="main-navigation"
            aria-label="Main navigation"
          >
            {[
              ["work", "Work"],
              ["opensource", "Open source"],
              ["about", "About"],
            ].map(([id, name]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {name}
              </a>
            ))}
            <a
              className="nav-contact"
              href="#contact"
              onClick={() => setMenuOpen(false)}
            >
              Let’s talk <Icon name="arrowUp" />
            </a>
          </nav>
          <div className="header-actions">
            <button
              className="menu-toggle"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="main-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>
      <main id="main">
        <section id="home" className="hero container">
          <div className="hero-copy">
            <a href="#contact" className="availability">
              <span className="status-dot" /> Open to AI/ML, backend &
              full-stack internships <Icon name="arrowUp" />
            </a>
            <p className="hero-kicker">ARYAN GUPTA / SOFTWARE ENGINEER</p>
            <h1>
              Thoughtful AI.
              <br />
              Solid <em>engineering.</em>
            </h1>
            <p className="hero-description">
              I build AI applications and the backends behind them. From
              document retrieval to reliable APIs, I like turning complex
              problems into systems people can use.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">
                Explore my work <Icon name="arrowDown" />
              </a>
              <a
                className="button button-outline"
                href={profile.resume}
                {...external}
              >
                View resume <Icon name="file" />
              </a>
            </div>
            <div className="hero-footnote">
              <span className="mini-mark">↳</span>
              <span>
                BIT Mesra ’27 <span className="dot-separator">·</span> Based in
                India
              </span>
              <a
                href={profile.github}
                {...external}
                aria-label="Aryan Gupta on GitHub"
              >
                <Icon name="github" />
              </a>
              <a
                href={profile.linkedin}
                {...external}
                aria-label="Aryan Gupta on LinkedIn"
              >
                <Icon name="linkedin" />
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-label">
              <span className="status-dot" /> FROM DOCUMENTS TO ANSWERS{" "}
              <span>01—03</span>
            </div>
            <SystemSketch type="hero" />
            <div className="visual-bottom">
              <span>
                <Icon name="code" /> Built to be understood.
              </span>
              <a href="#project-documind">
                Meet DocuMind <Icon name="arrowUp" />
              </a>
            </div>
          </div>
        </section>
        <div className="proof-strip container">
          <div>
            <span className="proof-icon">
              <Icon name="gitMerge" />
            </span>
            <p>
              <strong>Merged upstream</strong>
              <span>w3lib & go-billy</span>
            </p>
          </div>
          <div>
            <span className="proof-icon">
              <Icon name="terminal" />
            </span>
            <p>
              <strong>750+ problems solved</strong>
              <span>DSA & competitive programming</span>
            </p>
          </div>
          <div>
            <span className="proof-icon">
              <Icon name="award" />
            </span>
            <p>
              <strong>LeetCode Knight</strong>
              <span>Peak rating 1943</span>
            </p>
          </div>
          <div>
            <span className="proof-icon">
              <Icon name="graduation" />
            </span>
            <p>
              <strong>BIT Mesra · 2027</strong>
              <span>B.Tech ECE · 8.49 CGPA</span>
            </p>
          </div>
        </div>
        <section className="section container" id="work">
          <SectionTitle
            number="01"
            eyebrow="SELECTED WORK"
            title={
              <>
                Ideas, built into
                <br />
                <em>working systems.</em>
              </>
            }
          >
            A closer look at the problems I work on, the decisions behind the
            code, and the projects you can explore.
          </SectionTitle>
          <div className="featured-projects">
            {featuredProjects.map((project, index) => (
              <div id={`project-${project.id}`} key={project.id}>
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
          <ProjectIndex />
        </section>
        <section id="opensource" className="opensource">
          <div className="container">
            <SectionTitle
              number="02"
              eyebrow="BEYOND MY OWN REPOS"
              title={
                <>
                  Small fixes.
                  <br />
                  <em>Shared impact.</em>
                </>
              }
            >
              I contribute fixes to tools other developers use—working through
              edge cases, regression tests, and maintainer feedback.
            </SectionTitle>
            <div className="contributions">
              {contributions.map((item) => (
                <a
                  className="contribution"
                  href={item.url}
                  {...external}
                  key={item.url}
                >
                  <div className="contribution-top">
                    <span className={`pr-status ${item.state.toLowerCase()}`}>
                      <Icon
                        name={item.state === "Merged" ? "gitMerge" : "gitPull"}
                      />
                      {item.state}
                    </span>
                    <span>#{item.number}</span>
                  </div>
                  <h3>
                    {item.repo}
                    <Icon name="arrowUp" />
                  </h3>
                  <p>{item.title}</p>
                  <span className="contribution-language">{item.language}</span>
                </a>
              ))}
            </div>
            <div className="opensource-footer">
              <span>Public pull request status checked October 18, 2026.</span>
              <a
                href="https://github.com/pulls?q=is%3Apr+author%3AAryangupta-05"
                {...external}
              >
                All contributions <Icon name="arrowUp" />
              </a>
            </div>
          </div>
        </section>
        <section className="section container" id="about">
          <SectionTitle
            number="03"
            eyebrow="THE PERSON BEHIND THE CODE"
            title={
              <>
                Curious by nature.
                <br />
                <em>Engineer by practice.</em>
              </>
            }
          >
            I’m Aryan, an Electronics & Communication Engineering student at BIT
            Mesra, graduating in 2027. My focus is applied AI, backend
            development, and getting the fundamentals right.
          </SectionTitle>
          <div className="about-grid">
            <div className="experience-column">
              <p className="eyebrow">EXPERIENCE</p>
              <article className="experience">
                <div className="experience-mark">Q</div>
                <div>
                  <div className="experience-date">
                    MAY — JUN 2026 <span>REMOTE</span>
                  </div>
                  <h3>Software Developer Intern</h3>
                  <p className="experience-company">
                    QOE Technologies and Services
                  </p>
                  <p>
                    Built full-stack features for Soul Consciousness Lab with
                    React, Node.js, Express, and MongoDB. Developed REST APIs
                    with validation and structured error handling, and reduced
                    redundant API calls and unnecessary renders.
                  </p>
                </div>
              </article>
              <article className="experience academic-experience">
                <div className="experience-mark">
                  <Icon name="graduation" />
                </div>
                <div>
                  <div className="experience-date">
                    PROJECT INTERNSHIP <span>BIT MESRA</span>
                  </div>
                  <h3>Project Intern · Computer Vision</h3>
                  <a
                    href="https://github.com/Aryangupta-05/Rice_Leaf_Detection"
                    {...external}
                  >
                    Birla Institute of Technology, Mesra <Icon name="arrowUp" />
                  </a>
                  <p>
                    Developed a four-class rice leaf disease classifier using
                    TensorFlow/Keras. Compared VGG16, EfficientNet, ResNet50,
                    and a custom CNN, and deployed the VGG16 model through
                    Gradio. Reported test accuracy: 87.21%; F1-score: 87.20%.
                  </p>
                </div>
              </article>
              <article className="education">
                <Icon name="graduation" />
                <div>
                  <h3>Birla Institute of Technology, Mesra</h3>
                  <p>B.Tech · Electronics & Communication Engineering</p>
                  <span>
                    2023 — 2027 <i /> CGPA 8.49 / 10
                  </span>
                </div>
              </article>
              <div className="outside-code">
                <span>AWAY FROM THE KEYBOARD</span>
                <p>
                  Captain of the BIT Mesra football team. The same curiosity and
                  teamwork, on a different field.
                </p>
              </div>
            </div>
            <div className="skills-column">
              <p className="eyebrow">MY TOOLKIT</p>
              {skills.map((group) => (
                <div className="skill-group" key={group.name}>
                  <h3>
                    <Icon name={group.icon} />
                    {group.name}
                  </h3>
                  <div className="tags">
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
              <a className="text-link" href={profile.resume} {...external}>
                The full picture, in my resume <Icon name="arrowUp" />
              </a>
            </div>
          </div>
          <div className="problem-solving">
            <div>
              <p className="eyebrow">A FOUNDATION IN PROBLEM SOLVING</p>
              <h3>Practice that carries into the work.</h3>
            </div>
            <div className="coding-profiles">
              <a href="https://leetcode.com/u/aryangupta_/" {...external}>
                <strong>
                  1943 <span>peak</span>
                </strong>
                <span>
                  LeetCode · Knight <Icon name="arrowUp" />
                </span>
              </a>
              <a href="https://www.codechef.com/users/itss_levi" {...external}>
                <strong>
                  1639 <span>peak</span>
                </strong>
                <span>
                  CodeChef · 3-star <Icon name="arrowUp" />
                </span>
              </a>
              <a
                href="https://codeforces.com/profile/aryangupta_"
                {...external}
              >
                <strong>Pupil</strong>
                <span>
                  Codeforces <Icon name="arrowUp" />
                </span>
              </a>
            </div>
          </div>
        </section>
        <section className="contact-section" id="contact">
          <div className="container contact-inner">
            <div>
              <p className="eyebrow">
                <span className="status-dot" /> OPEN TO OPPORTUNITIES
              </p>
              <h2>
                Your next idea.
                <br />
                <em>Let’s build it.</em>
              </h2>
              <p>
                I’m looking for AI/ML and backend internships where I can
                contribute, learn from a strong team, and take ownership of
                meaningful work.
              </p>
              <a
                className="button button-dark"
                href={`mailto:${profile.email}?subject=AI%20%2F%20Backend%20opportunity`}
              >
                Start a conversation <Icon name="arrowUp" />
              </a>
            </div>
            <div className="contact-card">
              <span className="contact-card-label">SAY HELLO</span>
              <a className="email-link" href={`mailto:${profile.email}`}>
                {profile.email}
                <Icon name="arrowUp" />
              </a>
              <button className="copy-button" onClick={copyEmail}>
                <Icon name={copyState === "Email copied" ? "check" : "copy"} />
                {copyState === "Email copied"
                  ? "Copied!"
                  : "Copy email address"}
              </button>
              <p className="copy-status" role="status" aria-live="polite">
                {copyState}
              </p>
              <div className="contact-socials">
                <a href={profile.linkedin} {...external}>
                  <Icon name="linkedin" /> LinkedIn <Icon name="arrowUp" />
                </a>
                <a href={profile.github} {...external}>
                  <Icon name="github" /> GitHub <Icon name="arrowUp" />
                </a>
                <a href={profile.resume} {...external}>
                  <Icon name="file" /> Resume <Icon name="arrowUp" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="container site-footer">
        <a className="wordmark" href="#home" aria-label="Back to top">
          ag<span>.</span>
        </a>
        <span>
          © {new Date().getFullYear()} Aryan Gupta{" "}
          <span className="footer-note">· Built with care, and React.</span>
        </span>
        <a href="#home">
          Back to top <Icon name="arrowUp" />
        </a>
      </footer>
    </>
  );
}
