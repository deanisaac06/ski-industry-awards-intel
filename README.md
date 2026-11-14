# Ski Industry Awards, Publications & Marketing Intelligence

A searchable, static website (no build step, no server) that catalogs ski-industry awards, marketing recognition and consumer rankings so you can see which resorts consistently do the best marketing work, what they did, and what can be learned from it.

## How to view it

Download or clone this repo and open `index.html` in any browser. Everything runs locally from `data.js` ... `data9.js` and `app.js`. To publish it as a website, enable GitHub Pages (Settings > Pages) or drop the folder on any static host. Note that Pages on a private repo requires a paid GitHub plan.

## What is inside (v0.2, Nov 2026)

**NSAA (formal industry awards)**
- Marketing Awards: every winner 2010-2026 (2009-10 through 2025-26 seasons), plus finalists 2021-2026.
- Golden Eagle sustainability awards: Overall Environmental Excellence 2010-2026, Hero of Sustainability, Climate Change Impact, Community & Partnerships, Innovation, 2010 Silver Eagles; finalists 2021-2026.
- Conversion Cup winners 2011-2026, finalists 2021-2026.
- Safety Awards: every winner 2011-2026 (all categories, including Safety Champions), finalists 2021-2026.

**SAM (Ski Area Management) editorial recognition**
- Best & Worst in Marketing: 2025-26, 2024-25, 2015-16, 2014-15 (General, Digital, Print, Video), 2013-14, 2012-13, 2011-12 and 2009-10. That is every year with free full text on saminfo.com.
- Peer Reviews 2025-26.
- Each entry has a short paraphrased summary, a lesson, creative partners/people, and tags.

**Consumer reputation (shown separately, not part of the marketing score)**
- World Ski Awards: United States' and Canada's Best Ski Resort 2013-2026, 2026 nominees, and world-level hotel wins by North American properties.
- USA TODAY 10Best Readers' Choice, Best Ski Resort: top 10 for 2016-2025.
- SKI Magazine reader survey: full West 30 / East 20 for the 2026 and 2027 guides, top 5 or top 10 for the 2022 and 2025 guides, and #1s for 2019-2024.

**Publication catalog** with access status and an extraction to-do list.

## Site sections

Leaderboard (industry recognition score, consumer reputation leaders, repeat winners, who excels at what, small resorts outperforming their size), Awards database (filter by program, year, capability area, status, text; CSV export), Resort profiles (full timeline + campaigns), Campaign library, Lessons by theme, Creative partners (agencies, production companies, athletes, people, individual honorees), Sources, About/methodology.

## Data model

- Award rows: program, year, category, recipient, location, status (W winner / F finalist or nominee / M mixed / R ranked on a list), notes, rank. Add with `A(...)`, or `R(...)` for a ranked list (data9.js).
- SAM rows: year, kind (Best / Worst / Mixed / Peer), channel, title, resort(s), summary, lesson, partners, tags, source URL. Add with `X(...)`.
- Year = calendar year the award or ranking was published (2025 = the 2024-25 season; SKI's guide is labelled the following year).

| File | Contents |
| --- | --- |
| data.js | Programs, NSAA winners, 2026 finalists, SAM 2025-26 / 2024-25 / Peer Reviews 2025-26 |
| data2.js | SAM 2014-15 General + Digital, publication catalog |
| data3.js | SAM 2014-15 Print + Video, SAM 2015-16 |
| data4.js | SAM 2013-14 |
| data5.js | SAM 2012-13 |
| data6.js | SAM 2011-12 |
| data7.js | NSAA Safety winners 2011-2025; Marketing, Safety, Golden Eagle and Conversion Cup finalists 2021-2025 |
| data8.js | SAM Best/Worst Advertising 2010 (2009-10 season) |
| data9.js | World Ski Awards, USA TODAY 10Best, SKI Magazine rankings; source catalog updates |

## Known gaps / next steps

- **Needs a SAM subscription:** Best/Worst 2003-2009, 2010-11 and 2016-17 through 2023-24; Peer Reviews 2021-22 through 2024-25; Outlook on Resort Marketing reports.
- NSAA finalists before 2021 (NSAA only publishes winners in its archives).
- USA TODAY 10Best 2026 results (voting has closed; results pending), plus its other ski categories (ski town, ski hotel, apres, terrain park).
- SKI Magazine full lists for the 2019-2025 guides; Conde Nast Traveler Readers' Choice.
- State association award programs.
- Agency, production company and director credits traced per campaign to connect with the creative-partner databases.
