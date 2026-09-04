# CV source

LaTeX source for the CV the site offers for download. Kept in the repo so the CV and the
portfolio cannot drift apart — both now say **Backend & Platform Engineer** and carry the same
numbers.

## Files

| | |
|---|---|
| `CV_Mouad_Chaouni.tex` | The source. UTF-8 — keep it that way, the accents depend on it. |
| `photo.jpg` | Header photo, must sit next to the `.tex` when compiling. |

## Two switches, four variants

Near the top of the file:

```latex
\newif\ifenglish
\englishtrue        % English (true) / French (false)

\newif\ifphoto
\phototrue          % with photo (true) / no photo (false)
```

Flip and recompile. **When to use which:**

- **Photo** — expected in Morocco and France.
- **No photo** — the norm for Upwork, Toptal, and UK/US applications, where a photo can
  get a CV screened out.

## Compiling

There is no LaTeX toolchain on this machine, so compile in **[Overleaf](https://overleaf.com)**:

1. New Project → Upload Project, and upload **both** `CV_Mouad_Chaouni.tex` and `photo.jpg`.
2. Set the compiler to **pdfLaTeX** (Menu → Compiler). The file uses `fontawesome5` and `tcolorbox`,
   both of which Overleaf carries.
3. Compile, download the PDF, flip a switch, repeat.

Locally, if you ever install TeX Live or MiKTeX:

```sh
pdflatex CV_Mouad_Chaouni.tex   # run twice so the layout settles
```

## Where the PDFs go

The site links to these exact paths, and the About page serves the CV matching the page's
language:

```
public/cv/Mouad_Chaouni_CV_EN.pdf   ← \englishtrue
public/cv/Mouad_Chaouni_CV_FR.pdf   ← \englishfalse
```

Until those files exist the download button 404s. Set `about.resume.display` to `false` in
`src/resources/content.en.tsx` and `content.fr.tsx` if you want to hide it in the meantime.

Keep the no-photo variants for applications; they do not need to live in `public/`.

## What changed from the original

- **Title** is now the single specialty — `Backend & Platform Engineer` / `Ingénieur Backend &
  Cloud` — instead of `Full Stack Development & DevOps`, which read as two offerings rather than
  one. Matches the site.
- **Profile** leads with the specialty and the measured numbers (186 req/s, 79 ms p95, 729 tests,
  5 SDKs) instead of "autonomous, rigorous, comfortable in agile environments", which every CV
  claims and none evidences.
- **Photo switch restored** — it existed in the older `main.tex` and had been dropped.
- **MedReminder added** as a third project.
- **Skills reordered** to lead with the specialty: Backend → Security & IAM → DevOps & Cloud →
  Observability → Databases → Frontend → Languages → Concepts. A recruiter skimming the first two
  lines should hit the differentiator, not the commodity skills.
