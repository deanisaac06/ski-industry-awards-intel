# Ski Industry Awards, Publications & Marketing Intelligence

A searchable, static website (no build step, no server) that catalogs ski-industry awards and marketing recognition so you can see which resorts consistently do the best marketing work, what they did, and what can be learned from it.

## How to view it

Download or clone this repo and open index.html in any browser. Everything runs locally from data.js, data2.js and app.js. To publish it as a website, enable GitHub Pages (Settings > Pages) or drop the folder on any static host. Note that Pages on a private repo requires a paid GitHub plan.

## What is inside (v0.1, Nov 2026)

NSAA Marketing Awards: every winner 2010-2026 (2009-10 through 2025-26 seasons), plus 2026 finalists.

NSAA Golden Eagle sustainability awards: Overall Environmental Excellence 2010-2026, Hero of Sustainability, Climate Change Impact, Community & Partnerships, Innovation, and 2010 Silver Eagles.

NSAA Conversion Cup 2011-2026, and NSAA Safety Awards 2026 (winners + finalists).

SAM (Ski Area Management) Best & Worst in Marketing: full 2025-26 and 2024-25 features, 2014-15 General and Digital sections; SAM Peer Reviews 2025-26. Each entry has a short paraphrased summary, a lesson, creative partners/people, and tags.

Publication catalog with access status and an extraction to-do list.

## Site sections

Leaderboard (recognition score, repeat winners, who excels at what, small resorts outperforming their size), Awards database (filter by program, year, capability area, status, text; CSV export), Resort profiles (full timeline + campaigns), Campaign library, Lessons by theme, Creative partners (agencies, production companies, athletes, people), Sources, About/methodology.

## Data model

Award rows: program, year, category, recipient, location, status (W winner / F finalist / M mixed), notes. SAM rows: year, kind (Best / Worst / Mixed / Peer), channel, title, resort(s), summary, lesson, partners, tags, source URL. Add new records with the A(...) and X(...) helper calls in the data files.

## Known gaps / next steps

SAM Best/Worst 2016-2024 and Peer Reviews 2021-2025 sit in SAM's subscriber archive and need a subscription to extract. Prior-year NSAA finalists, past Safety winners, World Ski Awards, SKI Magazine rankings, USA Today 10Best, and state association programs are still to be added. Agency, production company and director credits need to be traced per campaign to connect with the creative-partner databases.
