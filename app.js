// Ski Industry Awards & Marketing Intelligence - app logic (vanilla JS, no build step)
// Marketing-first: the leaderboard, KPIs and lessons focus on marketing recognition. Safety, sustainability and
// guest service live under "Other awards"; consumer rankings under "Reputation". Global filters: year range + resort size.
(function () {
"use strict";
function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function $(id) { return document.getElementById(id); }
function uniq(a) { var o = {}, r = []; a.forEach(function (x) { if (x !== "" && x != null && !o[x]) { o[x] = 1; r.push(x); } }); return r; }
function store(k, v) { try { if (v === undefined) return JSON.parse(localStorage.getItem(k)); localStorage.setItem(k, JSON.stringify(v)); } catch (e) { return null; } }

// ---- merge SAM editorial entries into the unified recognition table ----
SAM.forEach(function (e, i) {
e.id = i;
var names = e.r.split(/;\s*/), locs = String(e.l || "").split("/");
names.forEach(function (nm, j) {
var prog = e.k === "W" ? "SW" : (e.k === "P" ? "PR" : "SB");
AW.push({p: prog, y: e.y, c: e.t, r: nm.trim(), l: (locs.length === names.length ? locs[j] : e.l) || "", s: e.k === "M" ? "M" : "W", n: e.s, sam: i});
});
});
// ---- program groups ----
var MKT = {M: 1, CC: 1, SB: 1, SW: 1, PR: 1};          // marketing (incl. beginner conversion)
var OTHER = {S: 1, GE: 1, GS: 1};                      // safety, sustainability, guest service
var CONS = {WSA: 1, TB: 1, SKI: 1, CNT: 1};            // consumer reputation
function group(p) { return MKT[p] ? "mkt" : OTHER[p] ? "other" : CONS[p] ? "cons" : "mkt"; }
// ---- campaign details (data10.js) ----
var CAMPS = (typeof CAMP !== "undefined") ? CAMP : [];
CAMPS.forEach(function (k) { AW.forEach(function (a) { if (a.p === k.p && a.y === k.y && a.r === k.r && a.c === k.c) { a.camp = k; } }); });
// ---- capability areas ----
var MAREAS = [
["Overall campaign", /overall|integrated|emotive|competitive positioning|brand|rebrand|campaign/i],
["Social media", /social|instagram|blog|hashtag|follower|valentine|gamification|clickbait|responses to hate|opening day messages|bandwagon|twitter|facebook|ugc|influencer/i],
["Video & film", /video|film|spoof|edit|rope drop|duo|documentary|trail spotlight|first-timer video|reverse psychology|humanization|doublespeak|slang|snow stake|love letter|\btv\b/i],
["Digital, web & mobile", /mobile|technology|website|digital|email|banner|pop-up|online|live feed|webcam|widget|distraction tool|retargeting|sms|app\b/i],
["Print & outdoor", /old school|traditional|direct|print|tradeshow|potty|billboard|ooh|signage/i],
["Beginner & conversion", /lssm|bring a friend|conversion|lapsed|beginner|lesson|first-timer|referral/i],
["Pricing & passes", /pass|pricing|deal|discount|ticket/i],
["Family", /family|mom|mascot|kids/i],
["Inclusion & community", /everyone|inclusion|community|hate|diplomacy|recruiting|solidarity|fundraiser|nonprofit/i],
["Events & earned media", /event|bash|showcase|earned media|power move|friday night|star power|kickoff|stored snow|rivalry|unique|newsjacking|viral|\bpr\b|stunt/i],
["Humor & brand voice", /humor|brand voice|parody|spoof|sarcasm/i],
["Crisis & transparency", /crisis|transparency|honest|apology|weather/i]
];
var OAREAS = [["Safety", /./], ["Sustainability", /./], ["Guest service", /./]];
function areasOf(a) {
if (CONS[a.p]) return ["Consumer reputation"];
if (a.p === "S") return ["Safety"];
if (a.p === "GE") return ["Sustainability"];
if (a.p === "GS") return ["Guest service"];
var txt = a.c + " " + (a.sam != null ? SAM[a.sam].tg + " " + SAM[a.sam].ch : "");
var r = [];
MAREAS.forEach(function (ar) { if (ar[1].test(txt)) r.push(ar[0]); });
if (a.p === "CC" && r.indexOf("Beginner & conversion") < 0) r.push("Beginner & conversion");
return r;
}
AW.forEach(function (a) { a.areas = areasOf(a); a.g = group(a.p); });
// ---- resort size: inferred from NSAA visit divisions (most recent wins), then SIZE map overrides ----
var SZ = {}, SZy = {};
AW.forEach(function (a) {
if (a.p !== "M" && a.p !== "S") return;
var v = /over 500k|500k\+/i.test(a.c) ? "L" : (/under 500k|up to 100k|100k-250k|250k-500k/i.test(a.c) ? "S" : "");
if (v && (!SZy[a.r] || a.y >= SZy[a.r])) { SZ[a.r] = v; SZy[a.r] = a.y; }
});
if (typeof SIZE !== "undefined") Object.keys(SIZE).forEach(function (k) { if (SIZE[k]) SZ[k] = SIZE[k]; });
function sizeOf(r) { return SZ[r] || ""; }
var SIZENAME = {L: "Over 500k visits", S: "Under 500k visits", O: "Organization / multi-resort", "": "Size unknown"};
function sizeTag(r) { var s = sizeOf(r); return s ? '<span class="sz sz' + s + '" title="' + SIZENAME[s] + '">' + (s === "L" ? "500k+" : s === "S" ? "<500k" : "org") + '</span>' : ''; }

var YEARS = uniq(AW.map(function (a) { return a.y; })).sort(function (a, b) { return b - a; });
var YMIN = YEARS[YEARS.length - 1], YMAX = YEARS[0];
var RESORTS = uniq(AW.map(function (a) { return a.r; })).sort();

// ================= GLOBAL FILTERS =================
var F = store("skiF") || {};
F.y0 = F.y0 || YMIN; F.y1 = F.y1 || YMAX; F.size = F.size || "";
function inF(a) { return a.y >= F.y0 && a.y <= F.y1 && (!F.size || sizeOf(a.r) === F.size); }
function inY(y) { return y >= F.y0 && y <= F.y1; }
function rangeLabel() { return (F.y0 === YMIN && F.y1 === YMAX ? "all years" : F.y0 + "-" + F.y1) + (F.size ? ", " + SIZENAME[F.size].toLowerCase() : ""); }
function drawFilters() {
var yo = YEARS.slice().sort(function (a, b) { return a - b; });
function sel(id, v) { return '<select id="' + id + '">' + yo.map(function (y) { return '<option' + (y === v ? ' selected' : '') + '>' + y + '</option>'; }).join("") + '</select>'; }
var pre = [["all", "All years"], ["3", "Last 3 yrs"], ["5", "Last 5 yrs"], ["10", "Last 10 yrs"]];
$("gf").innerHTML = '<span class="gl">Years</span>' + sel("gy0", F.y0) + '<span class="muted">to</span>' + sel("gy1", F.y1) +
pre.map(function (p) { var on = p[0] === "all" ? (F.y0 === YMIN && F.y1 === YMAX) : (F.y1 === YMAX && F.y0 === YMAX - (+p[0]) + 1); return '<button class="chip' + (on ? ' on' : '') + '" data-pre="' + p[0] + '">' + p[1] + '</button>'; }).join("") +
'<span class="gl">Resort size</span>' + [["", "All"], ["L", "Over 500k visits"], ["S", "Under 500k visits"]].map(function (s) { return '<button class="chip' + (F.size === s[0] ? ' on' : '') + '" data-size="' + s[0] + '">' + s[1] + '</button>'; }).join("");
$("gy0").onchange = function () { F.y0 = +this.value; if (F.y0 > F.y1) F.y1 = F.y0; applyF(); };
$("gy1").onchange = function () { F.y1 = +this.value; if (F.y1 < F.y0) F.y0 = F.y1; applyF(); };
}
function applyF() { store("skiF", F); drawFilters(); show(CUR, CURARG); }

// ---- per-resort stats over the filtered set ----
function stats() {
var m = {};
AW.forEach(function (a) {
if (!inF(a)) return;
var s = m[a.r] || (m[a.r] = {r: a.r, l: a.l, mk: 0, mkf: 0, cc: 0, ccf: 0, best: 0, mixed: 0, worst: 0, peer: 0, oth: 0, othf: 0, rep1: 0, repR: 0, repP: {}, years: {}, areas: {}, oareas: {}});
if (!s.l && a.l) s.l = a.l;
if (CONS[a.p]) { if (a.s === "W") s.rep1++; else if (a.s === "R") s.repR++; s.repP[a.p] = 1; return; }
if (OTHER[a.p]) { if (a.s === "W") { s.oth++; s.oareas[a.areas[0]] = (s.oareas[a.areas[0]] || 0) + 1; } else if (a.s === "F") s.othf++; return; }
var pos = false;
if (a.p === "M") { if (a.s === "W") { s.mk++; pos = true; } else if (a.s === "F") s.mkf++; }
if (a.p === "CC") { if (a.s === "W") { s.cc++; pos = true; } else if (a.s === "F") s.ccf++; }
if (a.p === "SB") { if (a.s === "W") { s.best++; pos = true; } else s.mixed++; }
if (a.p === "PR") { s.peer++; pos = true; }
if (a.p === "SW") s.worst++;
if (pos) { s.years[a.y] = 1; a.areas.forEach(function (x) { s.areas[x] = (s.areas[x] || 0) + 1; }); }
});
Object.keys(m).forEach(function (k) {
var s = m[k];
s.score = s.mk * 3 + s.mkf + s.cc * 2 + s.ccf * 0.5 + s.best + s.peer * 2 - s.worst * 0.5;
s.span = Object.keys(s.years).length;
s.rep = s.rep1 * 3 + s.repR;
s.oscore = s.oth * 2 + s.othf;
});
return m;
}
var ST = stats();
function progName(p) { return PROGRAMS[p] ? PROGRAMS[p].name : p; }
function statusBadge(a) {
if (a.p === "SW") return '<span class="b worst">Worst</span>';
if (a.s === "F") return CONS[a.p] ? '<span class="b fin">Nominee</span>' : '<span class="b fin">Finalist</span>';
if (a.s === "M") return '<span class="b mixed">Mixed</span>';
if (a.s === "R") return '<span class="b rank">' + (a.rank ? "#" + a.rank : "Ranked") + '</span>';
if (a.p === "PR") return '<span class="b peer">Peer pick</span>';
if (CONS[a.p]) return '<span class="b win">' + (a.rank ? "#1" : "Winner") + '</span>';
return '<span class="b win">Winner</span>';
}
function rlink(r) { return '<a href="#" class="rl" data-r="' + esc(r) + '">' + esc(r) + '</a>'; }
function opts(arr, label, cur) { return '<option value="">' + esc(label) + '</option>' + arr.map(function (x) { var v = Array.isArray(x) ? x[0] : x, t = Array.isArray(x) ? x[1] : x; return '<option value="' + esc(v) + '"' + (String(cur) === String(v) ? ' selected' : '') + '>' + esc(t) + '</option>'; }).join(""); }
function tags(o, n) { return Object.keys(o).sort(function (a, b) { return o[b] - o[a]; }).slice(0, n || 3).map(function (x) { return '<span class="tag">' + esc(x) + ' ' + o[x] + '</span>'; }).join(" "); }
function scopeNote() { return '<p class="scope">Showing <b>' + esc(rangeLabel()) + '</b>. Change years and resort size in the filter bar above.</p>'; }
function samIn(e) { return inY(e.y) && (!F.size || e.r.split(/;\s*/).some(function (r) { return sizeOf(r) === F.size; })); }

// ================= VIEWS =================
var V = {};
// ---- Leaderboard (marketing) ----
V.dash = function () {
var list = Object.keys(ST).map(function (k) { return ST[k]; }).filter(function (s) { return s.score > 0; }).sort(function (a, b) { return b.score - a.score || b.mk - a.mk || b.best - a.best; });
var mrows = AW.filter(function (a) { return a.g === "mkt" && inF(a); });
var samN = SAM.filter(samIn).length;
var h = scopeNote() + '<div class="kpis">' +
'<div class="kpi"><b>' + mrows.filter(function (a) { return a.p === "M"; }).length + '</b><span>NSAA Marketing Award records</span></div>' +
'<div class="kpi"><b>' + samN + '</b><span>SAM Best/Worst & Peer entries</span></div>' +
'<div class="kpi"><b>' + CAMPS.filter(function (k) { return inY(k.y) && (!F.size || sizeOf(k.r) === F.size); }).length + '</b><span>documented award campaigns</span></div>' +
'<div class="kpi"><b>' + list.length + '</b><span>resorts with marketing recognition</span></div></div>';
h += '<h2>Marketing leaderboard</h2><p class="muted">Marketing score = NSAA Marketing win x3 + finalist x1 + Conversion Cup win x2 (finalist x0.5) + SAM "Best" x1 + SAM Peer Review x2 - SAM "Worst" x0.5. Safety, sustainability and consumer rankings are not counted (see Other awards and Reputation).</p>';
if (!list.length) return h + '<p class="muted">No marketing recognition in this range.</p>';
h += '<table><thead><tr><th>#</th><th>Resort / org</th><th>Loc</th><th>Size</th><th>Score</th><th>NSAA Mktg wins</th><th>Finalist</th><th>SAM Best</th><th>Peer</th><th>SAM Worst</th><th>Conv. Cup</th><th>Yrs</th><th>Marketing strengths</th></tr></thead><tbody>';
list.slice(0, 60).forEach(function (s, i) {
h += '<tr><td>' + (i + 1) + '</td><td>' + rlink(s.r) + '</td><td>' + esc(s.l) + '</td><td>' + sizeTag(s.r) + '</td><td><b>' + s.score + '</b></td><td>' + s.mk + '</td><td>' + s.mkf + '</td><td>' + s.best + '</td><td>' + s.peer + '</td><td>' + s.worst + '</td><td>' + s.cc + '</td><td>' + s.span + '</td><td>' + tags(s.areas) + '</td></tr>';
});
h += '</tbody></table>';
h += '<h2>Who excels at what</h2><p class="muted">NSAA Marketing and Conversion Cup wins + SAM "Best" mentions + Peer picks per marketing area (finalists and "Worst" excluded).</p><div class="grid">';
MAREAS.forEach(function (ar) {
var name = ar[0];
var rows = list.filter(function (s) { return s.areas[name]; }).sort(function (a, b) { return b.areas[name] - a.areas[name] || b.score - a.score; }).slice(0, 6);
if (!rows.length) return;
h += '<div class="card"><h3>' + esc(name) + '</h3><ol>' + rows.map(function (s) { return '<li>' + rlink(s.r) + ' ' + sizeTag(s.r) + ' <span class="muted">(' + s.areas[name] + ')</span></li>'; }).join("") + '</ol></div>';
});
h += '</div>';
// most-critiqued
var crit = Object.keys(ST).map(function (k) { return ST[k]; }).filter(function (s) { return s.worst > 0; }).sort(function (a, b) { return b.worst - a.worst; }).slice(0, 10);
if (crit.length) {
h += '<h2>Most critiqued</h2><p class="muted">SAM "Worst" mentions in range. Worth reading for what not to do.</p><table><thead><tr><th>Resort</th><th>Worst</th><th>Best</th><th>Critiques</th></tr></thead><tbody>';
crit.forEach(function (s) { var ts = AW.filter(function (a) { return a.r === s.r && a.p === "SW" && inF(a); }).map(function (a) { return a.y + ': ' + a.c; }); h += '<tr><td>' + rlink(s.r) + '</td><td>' + s.worst + '</td><td>' + s.best + '</td><td class="small">' + esc(ts.join(" | ")) + '</td></tr>'; });
h += '</tbody></table>';
}
return h;
};
// ---- Awards database ----
var AF = store("skiAF") || {g: "mkt"};
V.awards = function () {
var progs = Object.keys(PROGRAMS).filter(function (k) { return !AF.g || group(k) === AF.g; });
return '<h2>Awards, recognition & rankings database</h2>' + scopeNote() + '<div class="filters">' +
'<select id="fG">' + opts([["mkt", "Marketing (NSAA Marketing, Conversion Cup, SAM)"], ["other", "Other industry awards (safety, sustainability, guest service)"], ["cons", "Consumer rankings"]], "Everything", AF.g) + '</select>' +
'<select id="fP">' + opts(progs.map(function (k) { return [k, PROGRAMS[k].name]; }), "All programs in group", AF.p) + '</select>' +
'<select id="fA">' + opts(MAREAS.map(function (a) { return a[0]; }).concat(["Safety", "Sustainability", "Guest service", "Consumer reputation"]), "All areas", AF.a) + '</select>' +
'<select id="fS">' + opts([["W", "Winners / Best / #1"], ["F", "Finalists / nominees"], ["M", "Mixed reviews"], ["R", "Ranked (lists)"]], "Any status", AF.s) + '</select>' +
'<input id="fQ" placeholder="Search resort, category, campaign, note..." value="' + esc(AF.q || "") + '">' +
'<button id="fX">Export CSV</button></div><div id="aOut"></div>';
};
function filteredAwards() {
var g = AF.g, p = AF.p, ar = AF.a, s = AF.s, q = (AF.q || "").toLowerCase();
return AW.filter(function (a) {
if (!inF(a)) return false;
if (g && a.g !== g) return false;
if (p && a.p !== p) return false;
if (ar && a.areas.indexOf(ar) < 0) return false;
if (s && a.s !== s) return false;
if (q && (a.r + " " + a.c + " " + a.n + " " + a.l + " " + (a.camp ? a.camp.name + " " + a.camp.pt : "")).toLowerCase().indexOf(q) < 0) return false;
return true;
}).sort(function (a, b) { return b.y - a.y || a.p.localeCompare(b.p) || a.c.localeCompare(b.c) || (a.rank || 0) - (b.rank || 0); });
}
function drawAwards() {
var rows = filteredAwards();
var h = '<p class="muted">' + rows.length + ' records</p><table><thead><tr><th>Year</th><th>Program</th><th>Category / title</th><th>Recipient</th><th>Loc</th><th>Size</th><th>Status</th><th>Areas</th><th>Notes</th></tr></thead><tbody>';
rows.slice(0, 1500).forEach(function (a) {
var src = a.sam != null ? SAM[a.sam].u : PROGRAMS[a.p].url;
h += '<tr><td>' + a.y + '</td><td><a href="' + esc(src) + '" target="_blank" rel="noopener">' + esc(progName(a.p)) + '</a></td><td>' + esc(a.c) + '</td><td>' + rlink(a.r) + '</td><td>' + esc(a.l) + '</td><td>' + sizeTag(a.r) + '</td><td>' + statusBadge(a) + '</td><td>' + a.areas.map(function (x) { return '<span class="tag">' + esc(x) + '</span>'; }).join(" ") + '</td><td class="small">' + (a.camp ? '<b>' + esc(a.camp.name) + '</b>' + (a.n ? ' &middot; ' : '') : '') + esc(a.n) + '</td></tr>';
});
$("aOut").innerHTML = h + '</tbody></table>' + (rows.length > 1500 ? '<p class="muted">Showing first 1,500; narrow the filters or export CSV for all.</p>' : '');
}
function csv() {
var rows = filteredAwards(), out = [["year", "program", "category", "recipient", "location", "size", "status", "rank", "areas", "campaign", "notes"]];
rows.forEach(function (a) { out.push([a.y, progName(a.p), a.c, a.r, a.l, SIZENAME[sizeOf(a.r)], a.s, a.rank || "", a.areas.join("; "), a.camp ? a.camp.name : "", a.n]); });
var txt = out.map(function (r) { return r.map(function (v) { return '"' + String(v).replace(/"/g, '""') + '"'; }).join(","); }).join("\n");
var el = document.createElement("a");
el.href = URL.createObjectURL(new Blob([txt], {type: "text/csv"}));
el.download = "ski-marketing-awards.csv";
el.click();
}
// ---- Resort profiles ----
V.resorts = function () {
return '<h2>Resort profiles</h2>' + scopeNote() + '<div class="filters"><input id="rQ" list="rList" placeholder="Type a resort name..."><datalist id="rList">' + RESORTS.map(function (r) { return '<option value="' + esc(r) + '">'; }).join("") + '</datalist></div><div id="rOut"><p class="muted">Pick a resort (or click any resort name elsewhere on the site).</p></div>';
};
function drawResort(r) {
var s = ST[r] || {score: 0, mk: 0, mkf: 0, best: 0, worst: 0, peer: 0, cc: 0, oth: 0, rep1: 0, repR: 0, areas: {}, l: ""};
var all = AW.filter(function (a) { return a.r === r && inY(a.y); }).sort(function (a, b) { return b.y - a.y || a.p.localeCompare(b.p); });
if (!all.length) { $("rOut").innerHTML = '<p class="muted">No records for "' + esc(r) + '" in ' + esc(rangeLabel()) + '.</p>'; return; }
var h = '<div class="profile"><h2>' + esc(r) + ' <span class="muted">' + esc(s.l || all[0].l) + '</span> ' + sizeTag(r) + '</h2>' +
'<div class="kpis"><div class="kpi"><b>' + s.score + '</b><span>marketing score</span></div><div class="kpi"><b>' + s.mk + ' / ' + s.mkf + '</b><span>NSAA Marketing wins / finalist</span></div><div class="kpi"><b>' + s.best + ' / ' + s.worst + '</b><span>SAM Best / Worst</span></div><div class="kpi"><b>' + s.peer + '</b><span>Peer Review picks</span></div><div class="kpi"><b>' + s.cc + '</b><span>Conversion Cup wins</span></div><div class="kpi"><b>' + s.oth + '</b><span>safety / sustainability wins</span></div><div class="kpi"><b>' + s.rep1 + ' / ' + s.repR + '</b><span>consumer #1s / listings</span></div></div>' +
'<p>Marketing strengths: ' + (tags(s.areas, 12) || '<span class="muted">n/a</span>') + '</p>';
var ac = CAMPS.filter(function (k) { return k.r === r && inY(k.y); });
if (ac.length) { h += '<h3>Award-winning campaigns</h3><div class="grid">' + ac.map(ccard).join("") + '</div>'; }
var cs = SAM.filter(function (e) { return e.r.split(/;\s*/).indexOf(r) >= 0 && inY(e.y); }).sort(function (a, b) { return b.y - a.y; });
if (cs.length) { h += '<h3>SAM campaigns & lessons</h3><div class="grid">' + cs.map(card).join("") + '</div>'; }
[["mkt", "Marketing timeline"], ["other", "Safety, sustainability & guest service"], ["cons", "Consumer rankings"]].forEach(function (g) {
var rows = all.filter(function (a) { return a.g === g[0] && a.sam == null; });
if (!rows.length) return;
h += '<h3>' + g[1] + '</h3><table><thead><tr><th>Year</th><th>Program</th><th>Category</th><th>Status</th><th>Notes</th></tr></thead><tbody>' + rows.map(function (a) { return '<tr><td>' + a.y + '</td><td>' + esc(progName(a.p)) + '</td><td>' + esc(a.c) + '</td><td>' + statusBadge(a) + '</td><td class="small">' + (a.camp ? '<b>' + esc(a.camp.name) + '</b> ' : '') + esc(a.n) + '</td></tr>'; }).join("") + '</tbody></table>';
});
$("rOut").innerHTML = h + '</div>';
}
// ---- cards ----
function card(e) {
var kind = {B: '<span class="b win">SAM Best</span>', W: '<span class="b worst">SAM Worst</span>', M: '<span class="b mixed">Mixed</span>', P: '<span class="b peer">Peer Review</span>'}[e.k];
return '<div class="card c' + e.k + '"><div class="meta">' + kind + ' <span class="muted">' + e.y + ' | ' + esc(e.ch) + '</span></div><h3>' + esc(e.t) + '</h3><p class="who">' + e.r.split(/;\s*/).map(function (r) { return rlink(r) + ' ' + sizeTag(r); }).join(", ") + ' <span class="muted">' + esc(e.l) + '</span></p><p>' + esc(e.s) + '</p><p class="lesson"><b>Lesson:</b> ' + esc(e.les) + '</p>' + (e.pt ? '<p class="small"><b>Partners/people:</b> ' + esc(e.pt) + '</p>' : '') + '<p class="small">' + e.tg.split(",").map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join(" ") + ' <a href="' + esc(e.u) + '" target="_blank" rel="noopener">source</a></p></div>';
}
function ccard(k) {
return '<div class="card cB"><div class="meta"><span class="b win">' + esc(progName(k.p)) + '</span> <span class="muted">' + k.y + ' | ' + esc(k.c) + '</span></div><h3>' + esc(k.name) + '</h3><p class="who">' + rlink(k.r) + ' ' + sizeTag(k.r) + '</p><p>' + esc(k.d) + '</p>' + (k.pt ? '<p class="small"><b>Partners/people:</b> ' + esc(k.pt) + '</p>' : '') + (k.u ? '<p class="small"><a href="' + esc(k.u) + '" target="_blank" rel="noopener">source</a></p>' : '') + '</div>';
}
// ---- Campaign library (SAM) ----
var LF = store("skiLF") || {};
V.library = function () {
var chans = uniq(SAM.map(function (e) { return e.ch; })).sort();
return '<h2>Campaign & lesson library</h2>' + scopeNote() + '<p class="muted">SAM Best/Worst and Peer Review entries. Summaries and lessons are our own paraphrases; follow the source link for the original.</p><div class="filters">' +
'<select id="lK">' + opts([["B", "Best"], ["W", "Worst"], ["M", "Mixed"], ["P", "Peer Review"]], "Best + Worst + Peer", LF.k) + '</select>' +
'<select id="lC">' + opts(chans, "All channels", LF.c) + '</select>' +
'<select id="lA">' + opts(MAREAS.map(function (a) { return a[0]; }), "All marketing areas", LF.a) + '</select>' +
'<input id="lQ" placeholder="Search: humor, email, beginner, Zeb Powell, transparency..." value="' + esc(LF.q || "") + '"></div><div id="lN" class="muted"></div><div id="lOut" class="grid"></div>';
};
function drawLib() {
var q = (LF.q || "").toLowerCase();
var rows = SAM.filter(function (e) {
if (!samIn(e)) return false;
if (LF.k && e.k !== LF.k) return false;
if (LF.c && e.ch !== LF.c) return false;
if (LF.a) { var re = MAREAS.filter(function (x) { return x[0] === LF.a; })[0][1]; if (!re.test(e.t + " " + e.tg + " " + e.ch)) return false; }
if (q && (e.t + " " + e.r + " " + e.s + " " + e.les + " " + e.pt + " " + e.tg).toLowerCase().indexOf(q) < 0) return false;
return true;
}).sort(function (a, b) { return b.y - a.y; });
$("lN").textContent = rows.length + " entries";
$("lOut").innerHTML = rows.length ? rows.map(card).join("") : '<p class="muted">No matches.</p>';
}
// ---- Award campaigns ----
V.campaigns = function () {
var rows = CAMPS.filter(function (k) { return inY(k.y) && (!F.size || sizeOf(k.r) === F.size); }).sort(function (a, b) { return (group(a.p) === "mkt" ? 0 : 1) - (group(b.p) === "mkt" ? 0 : 1) || b.y - a.y; });
return '<h2>Award-winning campaigns</h2>' + scopeNote() + '<p class="muted">Campaign names, results, agencies and people behind NSAA winners (and notable finalists), from resort and association releases. ' + rows.length + ' shown.</p><div class="grid">' + (rows.map(ccard).join("") || '<p class="muted">None in this range.</p>') + '</div>';
};
// ---- Lessons by theme ----
V.lessons = function () {
var themes = {};
SAM.filter(samIn).forEach(function (e) { e.tg.split(",").forEach(function (t) { t = t.trim(); if (!t) return; (themes[t] = themes[t] || {b: 0, w: 0, list: []}); if (e.k === "W") themes[t].w++; else themes[t].b++; themes[t].list.push(e); }); });
var keys = Object.keys(themes).sort(function (a, b) { return themes[b].list.length - themes[a].list.length; });
var h = '<h2>Lessons by theme</h2>' + scopeNote() + '<p class="muted">Tags across SAM entries, ranked by frequency, with every lesson attached. Use this to back up recommendations with real examples.</p>';
keys.forEach(function (t) {
var th = themes[t];
h += '<details><summary><b>' + esc(t) + '</b> <span class="muted">' + th.list.length + ' examples (' + th.b + ' positive, ' + th.w + ' negative)</span></summary><ul>' + th.list.slice().sort(function (a, b) { return b.y - a.y; }).map(function (e) { return '<li>' + (e.k === "W" ? '<span class="b worst">Worst</span> ' : '') + '<b>' + esc(e.r) + '</b> (' + e.y + ', ' + esc(e.t) + '): ' + esc(e.les) + '</li>'; }).join("") + '</ul></details>';
});
return h;
};
// ---- Creative partners & people ----
function isPerson(n) {
n = String(n || "").replace(/\s*\(.*\)\s*$/, "");
if (!n || /tie|as |joint|Aspen Skiing|Alta, Brighton|Boreal|\/|nominee|listed|named|release|archive|World Ski|nonprofit|Snowmass|Pico/.test(n)) return false;
return n.split(/\s*\/\s*/).every(function (x) { return /^[A-Z][A-Za-z.'\-]+( [A-Z][A-Za-z.'\-]+)+$/.test(x); });
}
V.partners = function () {
var m = {};
function add(p, e, mk) { p = p.trim(); if (!p) return; var o = m[p] || (m[p] = {list: [], mk: 0}); o.list.push(e); if (mk) o.mk++; }
CAMPS.forEach(function (k) { if (!k.pt || !inY(k.y)) return; k.pt.split(/;\s*/).forEach(function (p) { add(p, {y: k.y, r: k.r, t: progName(k.p) + ': ' + k.name}, group(k.p) === "mkt"); }); });
SAM.forEach(function (e) { if (!e.pt || !samIn(e)) return; e.pt.split(/;\s*/).forEach(function (p) { add(p, e, true); }); });
AW.forEach(function (a) { if ((a.p === "GE" || a.p === "S") && inF(a) && isPerson(a.n)) { add(a.n.replace(/\s*\(.*\)\s*$/, "") + " (individual honoree)", {y: a.y, r: a.r, t: progName(a.p) + ": " + a.c + (a.s === "F" ? " (finalist)" : "")}, false); } });
var keys = Object.keys(m).sort(function (a, b) { return (m[b].mk ? 1 : 0) - (m[a].mk ? 1 : 0) || m[b].list.length - m[a].list.length || a.localeCompare(b); });
var h = '<h2>Agencies, production companies, creatives, athletes & people</h2>' + scopeNote() + '<p class="muted">Extracted from recognized marketing work first, then safety and sustainability honorees.</p><table><thead><tr><th>Partner / person</th><th>#</th><th>Connected work</th></tr></thead><tbody>';
keys.forEach(function (p) { h += '<tr><td><b>' + esc(p) + '</b></td><td>' + m[p].list.length + '</td><td class="small">' + m[p].list.map(function (e) { return e.y + ' ' + esc(e.r) + ': ' + esc(e.t); }).join("<br>") + '</td></tr>'; });
return h + '</tbody></table>';
};
// ---- Other awards (safety, sustainability, guest service) ----
V.other = function () {
var h = '<h2>Other industry awards</h2>' + scopeNote() + '<p class="muted">NSAA Safety, Golden Eagle (sustainability) and Guest Service awards. Kept separate from the marketing score. Score = win x2 + finalist x1.</p>';
var list = Object.keys(ST).map(function (k) { return ST[k]; }).filter(function (s) { return s.oscore > 0; }).sort(function (a, b) { return b.oscore - a.oscore; });
h += '<table><thead><tr><th>#</th><th>Resort / org</th><th>Loc</th><th>Size</th><th>Score</th><th>Wins</th><th>Finalist</th><th>Split</th><th>Marketing score</th></tr></thead><tbody>';
list.slice(0, 40).forEach(function (s, i) { h += '<tr><td>' + (i + 1) + '</td><td>' + rlink(s.r) + '</td><td>' + esc(s.l) + '</td><td>' + sizeTag(s.r) + '</td><td><b>' + s.oscore + '</b></td><td>' + s.oth + '</td><td>' + s.othf + '</td><td>' + tags(s.oareas) + '</td><td>' + s.score + '</td></tr>'; });
h += '</tbody></table><div class="grid" style="margin-top:14px">';
OAREAS.forEach(function (ar) {
var rows = list.filter(function (s) { return s.oareas[ar[0]]; }).sort(function (a, b) { return b.oareas[ar[0]] - a.oareas[ar[0]]; }).slice(0, 8);
if (rows.length) h += '<div class="card"><h3>' + ar[0] + '</h3><ol>' + rows.map(function (s) { return '<li>' + rlink(s.r) + ' <span class="muted">(' + s.oareas[ar[0]] + ')</span></li>'; }).join("") + '</ol></div>';
});
return h + '</div>';
};
// ---- Reputation (consumer rankings) ----
V.rep = function () {
var rep = Object.keys(ST).map(function (k) { return ST[k]; }).filter(function (s) { return s.rep > 0; }).sort(function (a, b) { return b.rep - a.rep || b.rep1 - a.rep1; });
var h = '<h2>Consumer reputation</h2>' + scopeNote() + '<p class="muted">World Ski Awards, USA TODAY 10Best, SKI Magazine reader survey and Conde Nast Traveler Readers\' Choice. Index = #1 / country win x3 + any other listing x1 (nominations excluded). Compare with the marketing score to see who markets above or below their product reputation.</p>';
h += '<table><thead><tr><th>#</th><th>Resort</th><th>Loc</th><th>Size</th><th>Index</th><th>#1s / wins</th><th>Other listings</th><th>Programs</th><th>Marketing score</th></tr></thead><tbody>';
rep.slice(0, 50).forEach(function (s, i) { h += '<tr><td>' + (i + 1) + '</td><td>' + rlink(s.r) + '</td><td>' + esc(s.l) + '</td><td>' + sizeTag(s.r) + '</td><td><b>' + s.rep + '</b></td><td>' + s.rep1 + '</td><td>' + s.repR + '</td><td class="small">' + Object.keys(s.repP).map(progName).join(", ") + '</td><td>' + s.score + '</td></tr>'; });
return h + '</tbody></table>';
};
// ---- Sources ----
V.sources = function () {
var h = '<h2>Publication & source archive</h2><table><thead><tr><th>Source</th><th>Organization</th><th>Type</th><th>Years</th><th>Access</th><th>Extraction status</th></tr></thead><tbody>';
PUBS.forEach(function (p) { h += '<tr><td>' + (p.url ? '<a href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(p.n) + '</a>' : esc(p.n)) + '</td><td>' + esc(p.org) + '</td><td>' + esc(p.type) + '</td><td>' + esc(p.years) + '</td><td class="small">' + esc(p.access) + '</td><td>' + esc(p.status) + '</td></tr>'; });
h += '</tbody></table><h2>Programs in the database</h2><table><thead><tr><th>Code</th><th>Program</th><th>Group</th><th>Organization</th><th>Type</th><th>Records</th><th>Years</th></tr></thead><tbody>';
var GN = {mkt: "Marketing", other: "Other awards", cons: "Reputation"};
Object.keys(PROGRAMS).forEach(function (k) { var rs = AW.filter(function (a) { return a.p === k; }), ys = rs.map(function (a) { return a.y; }); h += '<tr><td>' + k + '</td><td><a href="' + esc(PROGRAMS[k].url) + '" target="_blank" rel="noopener">' + esc(PROGRAMS[k].name) + '</a></td><td>' + GN[group(k)] + '</td><td>' + esc(PROGRAMS[k].org) + '</td><td>' + esc(PROGRAMS[k].type) + '</td><td>' + rs.length + '</td><td>' + (ys.length ? Math.min.apply(null, ys) + '-' + Math.max.apply(null, ys) : '') + '</td></tr>'; });
var known = RESORTS.filter(function (r) { return sizeOf(r) === "L" || sizeOf(r) === "S"; }).length;
return h + '</tbody></table><p class="muted">Resort size is known for ' + known + ' of ' + RESORTS.length + ' names (inferred from NSAA visit divisions, plus data11.js). Unknown-size resorts drop out when a size filter is on.</p>';
};
// ---- About ----
V.about = function () {
return '<h2>About this research resource</h2><div class="prose"><p>This database answers one question: which ski resorts consistently do the best marketing work, what exactly are they doing differently, and what can we learn from them?</p>' +
'<p><b>Marketing recognition</b> (the leaderboard): NSAA Marketing Awards (2007, 2009-2026, finalists 2019 and 2021-2026), the NSAA Conversion Cup for beginner conversion, and Ski Area Management (SAM) editorial picks: Best & Worst in Marketing for every year with free full text (2009-10, 2011-12 through 2015-16, 2024-25, 2025-26) plus 2025-26 Peer Reviews. A SAM "Best" is an editorial mention, not a formal award; a "Worst" is a critique and counts against the score.</p>' +
'<p><b>Award campaigns</b> document the campaign behind NSAA winners where resorts published details: name, results, agencies and people.</p>' +
'<p><b>Other awards</b> (NSAA Safety, Golden Eagle sustainability, Guest Service) and <b>Reputation</b> (World Ski Awards, USA TODAY 10Best, SKI Magazine, Conde Nast Traveler) are kept in their own tabs and do not affect the marketing score.</p>' +
'<p><b>Filters:</b> the year range and resort size in the bar at the top apply to every tab. Size comes from the NSAA visit divisions a resort has entered (over/under 500k skier visits), with manual additions in data11.js.</p>' +
'<p><b>Naming:</b> resorts are normalized to their current name (e.g., Squaw Valley | Alpine Meadows is grouped under Palisades Tahoe). The original name is kept in the notes. The year is the calendar year the award or ranking was published (2025 = the 2024-25 season).</p>' +
'<p><b>Copyright:</b> campaign summaries and lessons are short paraphrases written for this database. Read the full originals at the linked sources.</p>' +
'<p><b>Next steps:</b> extract the SAM subscriber archive (Best/Worst 2003-2009, 2010-11, 2016-17 through 2023-24; Peer Reviews 2021-22 through 2024-25); document campaigns and agencies for more NSAA winners; add NSAA finalists for 2010-2018 and 2020.</p></div>';
};
// ================= ROUTER =================
var TABS = [["dash", "Leaderboard"], ["campaigns", "Award campaigns"], ["library", "Campaign library"], ["lessons", "Lessons by theme"], ["resorts", "Resort profiles"], ["awards", "Database"], ["partners", "Creative partners"], ["other", "Other awards"], ["rep", "Reputation"], ["sources", "Sources"], ["about", "About"]];
var CUR = "dash", CURARG = null;
function show(tab, arg) {
CUR = tab; CURARG = arg || null; ST = stats();
$("nav").innerHTML = TABS.map(function (t) { return '<button data-t="' + t[0] + '" class="' + (t[0] === tab ? "on" : "") + '">' + t[1] + '</button>'; }).join("");
$("main").innerHTML = V[tab]();
if (tab === "awards") {
var bind = function (id, key) { $(id).onchange = function () { AF[key] = this.value; if (key === "g") AF.p = ""; store("skiAF", AF); if (key === "g") show("awards"); else drawAwards(); }; };
bind("fG", "g"); bind("fP", "p"); bind("fA", "a"); bind("fS", "s");
$("fQ").oninput = function () { AF.q = this.value; store("skiAF", AF); drawAwards(); }; $("fX").onclick = csv; drawAwards();
}
if (tab === "library") {
["lK:k", "lC:c", "lA:a"].forEach(function (x) { var p = x.split(":"); $(p[0]).onchange = function () { LF[p[1]] = this.value; store("skiLF", LF); drawLib(); }; });
$("lQ").oninput = function () { LF.q = this.value; store("skiLF", LF); drawLib(); }; drawLib();
}
if (tab === "resorts") { $("rQ").onchange = function () { CURARG = this.value; drawResort(this.value); }; if (arg) { $("rQ").value = arg; drawResort(arg); } }
}
document.addEventListener("click", function (ev) {
var t = ev.target;
if (!t.matches) return;
if (t.matches("#nav button")) { show(t.getAttribute("data-t")); window.scrollTo(0, 0); }
if (t.matches("a.rl")) { ev.preventDefault(); show("resorts", t.getAttribute("data-r")); window.scrollTo(0, 0); }
if (t.matches("#gf [data-pre]")) { var v = t.getAttribute("data-pre"); F.y1 = YMAX; F.y0 = v === "all" ? YMIN : YMAX - (+v) + 1; applyF(); }
if (t.matches("#gf [data-size]")) { F.size = t.getAttribute("data-size"); applyF(); }
});
drawFilters();
show("dash");
})();
