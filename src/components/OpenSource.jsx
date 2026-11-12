import {
  contributionSnapshot,
  contributionStats,
  mergedContributions,
} from "../data/contributions.js";
import Icon from "./Icon.jsx";

const external = { target: "_blank", rel: "noopener noreferrer" };

export default function OpenSource() {
  return (
    <section id="opensource" className="opensource" aria-labelledby="opensource-title">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span>01</span> / OPEN SOURCE</p>
            <h2 id="opensource-title">Fixes that made it<br /><em>upstream.</em></h2>
          </div>
          <p className="section-intro">
            From scheduler failures to schema resolution, I contribute focused
            fixes to libraries other developers build on—with reproductions,
            regression tests, and maintainer review.
          </p>
        </div>
        <dl className="oss-stats" aria-label="Verified open-source contribution summary">
          <div><dt>Merged upstream fixes</dt><dd>{contributionStats.merged.toString().padStart(2, "0")}</dd><dd className="oss-stat-note">Across five libraries</dd></div>
          <div><dt>Languages in merged work</dt><dd>{contributionStats.languages.length.toString().padStart(2, "0")}</dd><dd className="oss-stat-note">{contributionStats.languages.join(" · ")}</dd></div>
        </dl>
        <div className="oss-group-heading">
          <h3><Icon name="gitMerge" /> Merged contributions</h3>
          <span>Explore the change, tests, and review</span>
        </div>
        <div className="contributions">
          {mergedContributions.map((item) => (
            <article className="contribution" key={item.url}>
              <div className="contribution-top">
                <span className="pr-status merged"><Icon name="gitMerge" /> Merged</span>
                <time dateTime={item.mergedAt}>{item.mergedOn}</time>
              </div>
              <h3><a href={item.url} {...external}>{item.repo}<Icon name="arrowUp" /></a></h3>
              <h4>{item.title}</h4>
              <p>{item.problem}</p>
              <p className="contribution-change">{item.change}</p>
              <p className="contribution-evidence"><Icon name="check" />{item.evidence}</p>
              <div className="contribution-bottom">
                <span className="contribution-language">{item.language}</span>
                <a href={item.url} {...external} aria-label={`Read ${item.repo} pull request ${item.number}`}>Review PR #{item.number}<Icon name="arrowUp" /></a>
              </div>
            </article>
          ))}
        </div>
        <div className="opensource-footer">
          <span>GitHub status verified {contributionSnapshot.label}.</span>
          <a href={`https://github.com/pulls?q=is%3Apr+is%3Amerged+author%3A${contributionSnapshot.author}`} {...external}>View merged pull requests <Icon name="arrowUp" /></a>
        </div>
      </div>
    </section>
  );
}
