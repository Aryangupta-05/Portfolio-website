# Aryan Gupta — AI/ML & Backend Portfolio

A responsive React portfolio built to help recruiters and engineers understand the work, inspect the source, and get in touch.

## Run locally

Use Node.js 20.19+ or 22.12+ and npm. On Windows PowerShell:

```powershell
npm.cmd ci
npm.cmd run dev
```

Open the Local URL printed by Vite. For a production preview:

```powershell
npm.cmd run build
npm.cmd run preview
```

The build compiles assets and prerenders the complete portfolio into `dist/index.html`. React hydrates navigation, search, filters, copy-email, and the query form. There is no runtime GitHub API dependency or custom backend. The query form uses three EmailJS public identifiers; see `EMAIL_SETUP.md`. No CAPTCHA or spam-check step is enabled, as requested. Direct email links remain available.

## Update the content

- `src/data/portfolio.js`: profile links, projects, and toolkit.
- `src/data/contributions.js`: dated merged/open PR snapshot, verified merge records, and derived summary counts.
- `src/components/OpenSource.jsx`: merged-fix highlights and the expandable open-PR list.
- `src/App.jsx`: sections, filtering, accessible disclosures, navigation, and contact.
- `src/components/SystemSketch.jsx`: native architecture/interface illustrations. Interface concepts are labelled; they are not screenshots.
- `src/index.css`: responsive layouts, focus states, and reduced-motion support.
- `public/Aryan_Gupta_Resume.pdf`: the existing October resume with the matching public contact address. Replace when the resume changes.
- `index.html`: title, description, canonical URL, social metadata, and structured data.
- `public/og-image.png`, `robots.txt`, `sitemap.xml`: sharing and search discovery.
- `scripts/prerender.mjs`: static rendering at build time.

The index includes 14 selected public projects, including SwasthIQ Front Desk Agent, Acadza Report to Fix, and Multimodal Submission Integrity. Featured order remains DocuMind, DPI Engine, Tweetie, and Rice Leaf. Other repositories are accessible through the GitHub link.

The design replaces WebGL models, the globe, autoplay videos, and animation libraries with native illustrations. Contact offers direct email, clipboard copying, and a query form with a linked email acknowledgement. Experience includes QOE and the BIT Mesra project internship.

## Themes

The header sun/moon button switches between light and dark themes. The first visit follows the system preference; explicit selection is saved locally. A small head script applies the saved theme before paint, and React updates the accessible control after hydration. Storage failures do not prevent switching.

## Content sources

Reviewed October 18, 2026 against public GitHub repositories, upstream PRs, the October resume, and the owner's Rice Leaf description. Rice Leaf's 87.21% test accuracy and 87.20% F1-score are owner-reported, not independently benchmarked here. Internship dates were not supplied and are not invented. Some implementation details describe resume-authoritative local work that may not appear on public default branches.

Public project additions and contribution states were refreshed November 12, 2026. Five upstream bug fixes are merged and eight other PRs remain open. `OPEN_SOURCE_REVIEW.md` records all 15 upstream submissions, including two closed without merge, and the merge commits behind the highlights. Contribution state is a dated snapshot. Update it after checking the upstream PR; approval or closure alone does not prove a merge.

## Vercel deployment

The existing portfolio URL is `https://aryanportfolio-theta.vercel.app/`. `vercel.json` uses `npm run build` and `dist`. Pushes to the connected GitHub branch can trigger the existing Vercel integration. Set the three public EmailJS variables in the Vercel project before rebuilding to enable the query form; local `.env.local` is ignored by Git. No replacement hosting service is needed.

After deployment, inspect the live site, resume, sharing preview, and canonical URL. Increased traffic is not guaranteed: these changes improve crawlable content, sharing, loading behavior, and recruiter actions. For measurement, enable Vercel Web Analytics in the existing project if desired. No tracking or synthetic visitor counter has been added.

The theme switch uses a 650ms circular reveal that expands from the button in either direction. Reduced-motion preferences and browsers without View Transitions switch immediately. A repeated click interrupts the current reveal.
