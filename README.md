<div align="center">

<img src="src/app/icon.svg" alt="ShipSpark Logo" width="112" />

# ShipSpark

### Know when a release deserves attention.

**AI powered release intelligence for mobile app teams.**

ShipSpark combines store data, customer reviews, release notes, and optional GitHub activity to decide whether a release should be **PROMOTED**, should **WAIT**, or should be **SKIPPED**.

<br />

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-20232a?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)
![Gemini](https://img.shields.io/badge/Google-Gemini-4285f4?style=flat-square&logo=google)
![Three.js](https://img.shields.io/badge/Three.js-Interactive_Graph-black?style=flat-square&logo=threedotjs)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-black?style=flat-square&logo=vercel)

![App Store](https://img.shields.io/badge/App_Store-Evidence-0d96f6?style=flat-square&logo=apple)
![Google Play](https://img.shields.io/badge/Google_Play-Evidence-34a853?style=flat-square&logo=googleplay)
![GitHub](https://img.shields.io/badge/GitHub-Release_Context-181717?style=flat-square&logo=github)
![Discord](https://img.shields.io/badge/Discord-Publishing-5865f2?style=flat-square&logo=discord)

</div>

---

### 🎯 The problem

Mobile teams ship constantly, but not every release deserves a campaign.

A release might be a major feature, a useful UX improvement, bug fixes, maintenance work, or mostly internal changes.

Most AI marketing tools start with:

> **What should we write about this release?**

ShipSpark starts with the more important question:

> **Is this release worth promoting at all?**

---

### ⚡ What ShipSpark does

Give ShipSpark any one source or combine several:

* App Store URL
* Google Play URL
* Public GitHub repository

ShipSpark collects the available evidence and returns one clear decision.

**PROMOTE**  
The release has meaningful user value, customer relevance, and a strong enough story to market.

**WAIT**  
There may be an opportunity, but the timing or evidence is not strong enough yet.

**SKIP**  
The release does not currently justify marketing attention.

---

### 🔄 Product flow

ShipSpark follows a decision first workflow.

| Step | What happens |
| --- | --- |
| **1. Collect evidence** | Read available store, review, release, and source data |
| **2. Understand customers** | Find repeated complaints, praise, and feature demand |
| **3. Understand the release** | Separate meaningful user facing changes from maintenance |
| **4. Score the opportunity** | Evaluate novelty, value, demand, positioning, timing, and evidence |
| **5. Make the decision** | Return PROMOTE, WAIT, or SKIP |
| **6. Explain why** | Show score reasoning, strongest signals, risks, and the recommended next action |
| **7. Promote when justified** | Generate campaign content only when the decision is PROMOTE |
| **8. Publish** | Share socially through the native share flow or publish directly to Discord, with optional links and images |

**Evidence → Decision → Explanation → Promotion → Distribution**

---

### 🔎 What gets analyzed

#### Customer evidence

ShipSpark can use:

* Recent customer reviews
* Repeated complaints
* Repeated praise
* Feature requests
* Customer demand
* Unresolved problems
* Needs that appear to match the current release

#### Release evidence

ShipSpark can inspect:

* Current version
* Release notes
* User facing changes
* Maintenance changes
* Latest GitHub release
* Recent commits
* Repository context

#### Product context

ShipSpark also evaluates:

* Current store positioning
* Promotion timing
* Positioning opportunities
* Strength of the available evidence

---

### 📊 Release Intelligence

ShipSpark scores six signals.

| Signal | What it means |
| --- | --- |
| **Change novelty** | How meaningful or different the release is |
| **User value** | How much the release appears to improve the product for users |
| **Customer demand** | How closely the release matches available customer feedback |
| **Positioning** | Whether there is a strong product story worth telling |
| **Timing** | Whether now appears to be a good moment to promote |
| **Evidence quality** | How much reliable evidence supports the decision |

These signals produce:

* Opportunity score
* Decision confidence
* PROMOTE, WAIT, or SKIP

Every score includes an explanation.

---

### 🌐 Interactive evidence graph

The Intelligence workspace includes a live Three.js visualization of the release decision.

The center shows the opportunity score and confidence.

The surrounding nodes represent the six decision signals:

* Change novelty
* User value
* Customer demand
* Positioning
* Timing
* Evidence quality

The visualization is driven by the current analysis result and gives users another way to understand the decision.

---

### 💬 Customer Intelligence

ShipSpark turns recent store reviews into structured customer evidence.

It can highlight:

* Repeated complaints
* Repeated praise
* Feature requests
* Customer needs
* Needs that appear to match the release
* Important unresolved problems

When both stores are provided, ShipSpark includes evidence from both platforms in the same release decision.

The goal is to compare:

**What customers care about**

with:

**What actually shipped**

---

### 🧠 Why the AI matters

ShipSpark does not use AI mainly as a copy generator.

The model first reasons about:

* What changed
* Who benefits
* What customers are asking for
* Whether the release appears to answer those needs
* What remains unresolved
* Whether there is a credible promotion opportunity
* Whether the available evidence is strong enough

Only after that decision does campaign generation happen.

**The AI decides before it writes.**

---

### 📣 Promotion

Campaign generation is gated by the release decision.

If ShipSpark returns **WAIT** or **SKIP**, it explains what is missing instead of generating campaign content anyway.

When ShipSpark returns **PROMOTE**, the current analysis can include:

* Campaign angle
* Headline
* Hook
* Target audience
* CTA
* Social copy
* Discord copy
* Recommended next step

---

### 📡 Real distribution

ShipSpark includes two working distribution paths.

The user can:

1. Review the generated social and Discord campaign assets
2. Add an optional destination link and image URL for each channel
3. Share the social asset through the device native share flow without social API credentials
4. Add a Discord webhook and publish the Discord announcement directly from ShipSpark
5. Receive the Discord publishing result

This means the prototype can move from release intelligence to a real distribution action while keeping every publish action explicit.

---

### 🧪 Real public evidence

ShipSpark uses real public evidence during normal analysis.

| Source | Purpose |
| --- | --- |
| **App Store** | Listing, rating, version, and release notes |
| **Apple review feeds** | Recent customer reviews |
| **Google Play** | Listing and review evidence |
| **GitHub REST API** | Releases, commits, README, and repository context |
| **Google Gemini** | Structured release reasoning |
| **Discord Webhooks** | Campaign publishing |

ShipSpark does not invent customer demand when review evidence is unavailable.

---

### 🧩 Flexible source modes

#### Store only

Useful for private products without a public repository.

ShipSpark uses store positioning, release notes, ratings, and customer reviews.

#### GitHub only

Useful for open source projects.

ShipSpark can reason about what changed and likely user value without pretending customer review evidence exists.

#### Store and GitHub

This gives ShipSpark stronger context because it can compare available customer demand with what actually shipped.

#### App Store, Google Play, and GitHub

This provides the broadest available evidence for a single release decision.

---

### 🆚 Why ShipSpark is different

There are already strong tools for app reviews, ASO, app intelligence, and marketing generation.

Adjacent products include AppFollow, Appbot, AppTweak, and App Radar.

ShipSpark focuses on the decision between product development and marketing:

> **Should this specific release receive marketing attention at all?**

It combines:

**Customer evidence + release evidence + product context → release decision → campaign → publishing**

The core advantage is:

> **ShipSpark decides whether a campaign should exist before writing one.**

---

### 👥 Who it is for

ShipSpark is built for:

* Indie developers
* Mobile app founders
* Product managers
* Growth teams
* Mobile marketers
* Developer led startups
* Small mobile product teams

The strongest early customer is a team where product, engineering, and growth responsibilities overlap.

---

### 💰 Business direction

The hackathon build focuses on proving the release decision workflow.

A future commercial version could follow a SaaS model.

#### Free

* Limited release analyses
* One app
* Basic release intelligence

#### Indie

* More analyses
* Multiple apps
* Release history
* Campaign generation
* Customer demand tracking

#### Team

Potential future features could include:

* Shared workspaces
* Multiple products
* Automated release monitoring
* Integrations
* Webhooks
* Historical intelligence
* Team analytics

These commercial features are product direction, not part of the current hackathon prototype.

---

### 🛠️ Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 |
| UI | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| AI | Google Gemini |
| 3D visualization | Three.js |
| React 3D | React Three Fiber |
| Three helpers | Drei |
| Animation | Motion |
| Icons | Lucide |
| App Store data | Apple public endpoints |
| Google Play data | Google Play Scraper |
| Source intelligence | GitHub REST API |
| Publishing | Discord Webhooks |
| Deployment | Vercel |

---

### 🚀 Run locally

Install dependencies:

```bash
pnpm install
```

Create `.env.local`:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_DEV_MODE=true
GEMINI_DEV_MODEL=gemini-3.5-flash-lite
```

Start ShipSpark:

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

For production:

```env
GEMINI_DEV_MODE=false
```

---

### 🎬 Demo flow

A strong demo path is:

1. Add a real mobile app source
2. Run the analysis
3. Show PROMOTE, WAIT, or SKIP
4. Explore the live evidence graph
5. Open the score explanations
6. Review customer intelligence
7. Open the generated campaign
8. Share socially or publish it directly to Discord

---

<div align="center">

### 🏆 Built for HackOnVibe

**Evidence first. Marketing second.**

</div>
