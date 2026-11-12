// Live GitHub audit: 2026-11-12. Merges require both mergedAt and a merge commit.
// Scope: upstream library/tool fixes, separate from personal project maintenance.
export const contributionSnapshot = {
  checkedOn: "2026-11-12",
  label: "November 12, 2026",
  author: "Aryangupta-05",
};

export const mergedContributions = [
  {
    repo: "node-cron / node-cron",
    number: 622,
    language: "TypeScript",
    title: "Stop failed jobs at their execution limit.",
    problem: "A scheduled task could keep running after maxExecutions when it threw or rejected.",
    change: "Moved limit enforcement into the completion path so failed scheduled runs also stop the task.",
    evidence: "Regression tests cover synchronous throws and rejected promises.",
    mergedOn: "Nov 6, 2026",
    mergedAt: "2026-11-06T14:49:41Z",
    mergeCommit: "011bfbba5883afef5f7caa2b7235ef02bb646a95",
    url: "https://github.com/node-cron/node-cron/pull/622",
  },
  {
    repo: "getkin / kin-openapi",
    number: 1413,
    language: "Go",
    title: "Resolve schema references in the right document.",
    problem: "A schema alias could silently resolve a local fragment against the referring file’s components.",
    change: "Restored the alias file’s document context before resolving its local schema references.",
    evidence: "16 regression and control cases span YAML/JSON and OpenAPI 3.0/3.1.",
    mergedOn: "Nov 1, 2026",
    mergedAt: "2026-11-01T09:53:18Z",
    mergeCommit: "b91a6818d29597b2ea6ef376ad6ec7b745e2f17f",
    url: "https://github.com/getkin/kin-openapi/pull/1413",
  },
  {
    repo: "go-co-op / gocron",
    number: 966,
    language: "Go",
    title: "Keep scheduled jobs through midnight DST changes.",
    problem: "Daily and weekly jobs could lose their next run when local midnight fell in a daylight-saving gap.",
    change: "Separated calendar-date arithmetic from local-midnight normalization while retaining the scheduler’s DST policies.",
    evidence: "Tests exercise daily/weekly intervals and public NextRuns predictions.",
    mergedOn: "Oct 26, 2026",
    mergedAt: "2026-10-26T08:55:07Z",
    mergeCommit: "cc5bcedc9752b67fca333d9972d74839a3c31331",
    url: "https://github.com/go-co-op/gocron/pull/966",
  },
  {
    repo: "scrapy / w3lib",
    number: 379,
    language: "Python",
    title: "Recover base URLs after non-exact script end tags.",
    problem: "HTML scanning missed real base elements after script/noscript end tags containing whitespace or attributes.",
    change: "Corrected shared ignored-tag scanning for base URL and meta-refresh extraction.",
    evidence: "Regression coverage checks valid, misleading, and malformed closing tags.",
    mergedOn: "Oct 18, 2026",
    mergedAt: "2026-10-18T10:20:18Z",
    mergeCommit: "9ded4ea3137a6db9dc04e32d3186f61007f3cb4d",
    url: "https://github.com/scrapy/w3lib/pull/379",
  },
  {
    repo: "go-git / go-billy",
    number: 247,
    language: "Go",
    title: "Distinguish regular files from empty directories.",
    problem: "The in-memory filesystem returned an empty directory result when ReadDir was called on a regular file.",
    change: "Return a path error wrapping ENOTDIR after symlink resolution, matching the filesystem contract.",
    evidence: "Conformance and symlink regressions compare valid and invalid directory paths.",
    mergedOn: "Oct 16, 2026",
    mergedAt: "2026-10-16T21:17:43Z",
    mergeCommit: "fd38f5ac32fe82cb7f9093540207ecaf4d687bdb",
    url: "https://github.com/go-git/go-billy/pull/247",
  },
];

export const openContributions = [
  { repo: "go-resty / resty", number: 1276, language: "Go", title: "Prevent SSE retry durations from overflowing during conversion.", url: "https://github.com/go-resty/resty/pull/1276" },
  { repo: "immerjs / immer", number: 1369, language: "TypeScript", title: "Preserve symbol keys while replaying nested patch paths.", url: "https://github.com/immerjs/immer/pull/1369" },
  { repo: "prometheus / client_python", number: 1237, language: "Python", title: "Keep unit metadata in restricted registries and filtered OpenMetrics output.", url: "https://github.com/prometheus/client_python/pull/1237" },
  { repo: "go-chi / chi", number: 1244, language: "Go", title: "Reject already-canceled requests before throttle admission.", url: "https://github.com/go-chi/chi/pull/1244" },
  { repo: "go-git / go-git", number: 2541, language: "Go", title: "Handle gitlinks, symlink blobs, and tree types during repository maintenance.", url: "https://github.com/go-git/go-git/pull/2541" },
  { repo: "oasdiff / yaml", number: 20, language: "Go", title: "Reject YAML keys that collide when converted into JSON member names.", url: "https://github.com/oasdiff/yaml/pull/20" },
  { repo: "fossasia / visdom", number: 2028, language: "Python", title: "Preserve boxplot columns through legend validation.", url: "https://github.com/fossasia/visdom/pull/2028" },
  { repo: "kubernetes / minikube", number: 23835, language: "Go", title: "Reuse disk-image helpers and propagate disk creation errors.", url: "https://github.com/kubernetes/minikube/pull/23835" },
];

export const contributionStats = {
  merged: mergedContributions.length,
  open: openContributions.length,
  languages: [...new Set(mergedContributions.map((item) => item.language))],
};
