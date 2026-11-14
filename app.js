// Ski Industry Awards & Marketing Intelligence - app logic (vanilla JS, no build step)
(function () {
"use strict";
function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function $(id) { return document.getElementById(id); }
function uniq(a) { var o = {}, r = []; a.forEach(function (x) { if (x !== "" && x != null && !o[x]) { o[x] = 1; r.push(x); } }); return r; }
// ---- merge SAM editorial entries into the unified recognition table ----
SAM.forEach(function (e, i) {
e.id = i;
var names = e.r.split(/;\s*/), locs = String(e.l || "").split("/");
names.forEach(function (nm, j) {
var prog = e.k === "W" ? "SW" : (e.k === "P" ? "PR" : "SB");
AW.push({p: prog, y: e.y, c: e.t, r: nm.trim(), l: (locs.length === names.length ? locs[j] : e.l) || "", s: e.k === "M" ? "M" : "W", n: e.s, sam: i});
});
});
// ---- classify every recognition into capability areas ----
var AREAS = [
["Overall campaign", /overall|integrated|emotive|competitive positioning/i],
["Social media", /social|instagram|blog|hashtag|follower|valentine|gamification|clickbait|responses to hate|opening day messages|bandwagon|twitter|facebook/i],
["Video & film", /video|film|spoof|edit|rope drop|duo|documentary|trail spotlight|first-timer|reverse psychology|humanization|doublespeak|slang|snow stake|love letter|\btv\b/i],
["Digital, web & mobile", /mobile|technology|website|digital|email|banner|pop-up|online|live feed|webcam|widget|distraction tool|retargeting|sms/i],
["Beginner & conversion", /lssm|bring a friend|conversion|lapsed|beginner|lesson|first-timer|referral/i],
["Family", /family|mom|mascot|kids/i],
["Inclusion & community", /everyone|inclusion|community|parks|hate|diplomacy|recruiting|solidarity|fundraiser/i],
["Traditional & direct", /old school|traditional|direct|print|tradeshow|potty/i],
["Events & earned media", /event|bash|showcase|earned media|power move|friday night|star power|kickoff|stored snow|rivalry|unique|newsjacking|viral/i],
["Sustainability", /environment|sustainab|climate|eagle/i],
["Safety", /safety|collision|responsibility code|rideanotherday|helmet|avalanche|chairlift/i]
];
var CONS = {WSA: 1, TB: 1, SKI: 1}; // consumer reputation programs: shown separately, not in the marketing score
function areasOf(a) {
if (CONS[a.p]) return ["Consumer reputation"];
var txt = a.c + " " + (a.sam != null ? SAM[a.sam].tg : "");
var r = [];
AREAS.forEach(function (ar) { if (ar[1].test(txt)) r.push(ar[0]); });
if (a.p === "GE" && r.indexOf("Sustainability") < 0) r.push("Sustainability");
if (a.p === "S" && r.indexOf("Safety") < 0) r.push("Safety");
if (a.p === "S") r = r.filter(function (x) { return x === "Safety" || x === "Social media"; });
if (a.p === "CC" && r.indexOf("Beginner & conversion") < 0) r.push("Beginner & conversion");
return r;
}
AW.forEach(function (a) { a.areas = areasOf(a); a.small = /under 500k|up to 100k|100k-250k|250k-500k|under 350k|under 250k/i.test(a.c); });
var FORMAL = {M: 1, GE: 1, CC: 1, S: 1};
var YEARS = uniq(AW.map(function (a) { return a.y; })).sort(function (a, b) { return b - a; });
var RESORTS = uniq(AW.map(function (a) { return a.r; })).sort();
// ---- per-resort stats ----
function stats() {
var m = {};
AW.forEach(function (a) {
var s = m[a.r] || (m[a.r] = {r: a.r, l: a.l, mk: 0, formal: 0, fin: 0, best: 0, worst: 0, peer: 0, rep1: 0, repR: 0, repP: {}, years: {}, areas: {}});
if (!s.l && a.l) s.l = a.l;
if (CONS[a.p]) { if (a.s === "W") s.rep1++; else if (a.s === "R") s.repR++; s.repP[a.p] = 1; return; }
if (FORMAL[a.p] && a.s === "W") { s.formal++; if (a.p === "M") s.mk++; s.years[a.y] = 1; }
if (FORMAL[a.p] && a.s === "F") s.fin++;
if (a.p === "SB" && a.s === "W") { s.best++; s.years[a.y] = 1; }
if (a.p === "SW") s.worst++;
if (a.p === "PR") { s.peer++; s.years[a.y] = 1; }
if ((FORMAL[a.p] && a.s === "W") || (a.p === "SB" && a.s === "W") || a.p === "PR") { a.areas.forEach(function (x) { s.areas[x] = (s.areas[x] || 0) + 1; }); }
});
Object.keys(m).forEach(function (k) {
var s = m[k];
s.score = s.mk * 3 + (s.formal - s.mk) * 2 + s.fin + s.best + s.peer * 2 - s.worst * 0.5;
s.span = Object.keys(s.years).length;
s.rep = s.rep1 * 3 + s.repR;
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
function opts(arr, label) { return '<option value="">' + esc(label) + '</option>' + arr.map(function (x) { var v = Array.isArray(x) ? x[0] : x, t = Array.isArray(x) ? x[1] : x; return '<option value="' + esc(v) + '">' + esc(t) + '</option>'; }).join(""); }
// ================= VIEWS =================
var V = {};
// ---- Dashboard / leaderboard ----
V.dash = function () {
var list = Object.keys(ST).map(function (k) { return ST[k]; }).filter(function (s) { return s.score > 0; }).sort(function (a, b) { return b.score - a.score || b.mk - a.mk; });
var formalCount = AW.filter(function (a) { return FORMAL[a.p]; }).length;
var consCount = AW.filter(function (a) { return CONS[a.p]; }).length;
var h = '<div class="kpis">' +
'<div class="kpi"><b>' + formalCount + '</b><span>NSAA award records (winners + finalists)</span></div>' +
'<div class="kpi"><b>' + SAM.length + '</b><span>SAM Best/Worst & Peer Review entries</span></div>' +
'<div class="kpi"><b>' + consCount + '</b><span>consumer ranking records</span></div>' +
'<div class="kpi"><b>' + RESORTS.length + '</b><span>resorts & organizations</span></div>' +
'<div class="kpi"><b>' + YEARS[YEARS.length - 1] + '-' + YEARS[0] + '</b><span>years covered</span></div></div>';
h += '<h2>Most-recognized resorts (industry recognition)</h2><p class="muted">Score = NSAA Marketing win x3 + other NSAA win (Golden Eagle, Conversion Cup, Safety) x2 + NSAA finalist x1 + SAM "Best" x1 + SAM Peer Review x2 - SAM "Worst" x0.5. Consumer rankings are shown in their own column and table but do not count toward the score. Click a resort for its full profile.</p>';
h += '<table><thead><tr><th>#</th><th>Resort / org</th><th>Loc</th><th>Score</th><th>NSAA Mktg wins</th><th>All NSAA wins</th><th>Finalist</th><th>SAM Best</th><th>Peer</th><th>SAM Worst</th><th>Consumer #1s / listed</th><th>Yrs recognized</th><th>Top strengths</th></tr></thead><tbody>';
list.slice(0, 50).forEach(function (s, i) {
var top = Object.keys(s.areas).sort(function (a, b) { return s.areas[b] - s.areas[a]; }).slice(0, 3).map(function (x) { return '<span class="tag">' + esc(x) + ' ' + s.areas[x] + '</span>'; }).join(" ");
h += '<tr><td>' + (i + 1) + '</td><td>' + rlink(s.r) + '</td><td>' + esc(s.l) + '</td><td><b>' + s.score + '</b></td><td>' + s.mk + '</td><td>' + s.formal + '</td><td>' + s.fin + '</td><td>' + s.best + '</td><td>' + s.peer + '</td><td>' + s.worst + '</td><td>' + s.rep1 + ' / ' + s.repR + '</td><td>' + s.span + '</td><td>' + top + '</td></tr>';
});
h += '</tbody></table>';
// specialists by area
h += '<h2>Who excels at what</h2><p class="muted">Wins + SAM "Best" mentions + Peer picks per capability area (finalists and "Worst" excluded).</p><div class="grid">';
AREAS.forEach(function (ar) {
var name = ar[0];
var rows = Object.keys(ST).map(function (k) { return ST[k]; }).filter(function (s) { return s.areas[name]; }).sort(function (a, b) { return b.areas[name] - a.areas[name]; }).slice(0, 6);
if (!rows.length) return;
h += '<div class="card"><h3>' + esc(name) + '</h3><ol>' + rows.map(function (s) { return '<li>' + rlink(s.r) + ' <span class="muted">(' + s.areas[name] + ')</span></li>'; }).join("") + '</ol></div>';
});
h += '</div>';
// consumer reputation
var rep = Object.keys(ST).map(function (k) { return ST[k]; }).filter(function (s) { return s.rep > 0; }).sort(function (a, b) { return b.rep - a.rep || b.rep1 - a.rep1; });
h += '<h2>Consumer reputation leaders</h2><p class="muted">World Ski Awards country wins, USA TODAY 10Best Readers\' Choice and SKI Magazine reader survey. Reputation index = #1 / country win x3 + any other listing x1 (nominations excluded). Useful for comparing marketing recognition with how guests actually rate the product.</p><table><thead><tr><th>#</th><th>Resort</th><th>Loc</th><th>Index</th><th>#1s / wins</th><th>Other listings</th><th>Programs</th><th>Marketing score</th></tr></thead><tbody>';
rep.slice(0, 30).forEach(function (s, i) { h += '<tr><td>' + (i + 1) + '</td><td>' + rlink(s.r) + '</td><td>' + esc(s.l) + '</td><td><b>' + s.rep + '</b></td><td>' + s.rep1 + '</td><td>' + s.repR + '</td><td class="small">' + Object.keys(s.repP).map(progName).join(", ") + '</td><td>' + s.score + '</td></tr>'; });
h += '</tbody></table>';
// small resorts punching above their weight
var small = {};
AW.forEach(function (a) { if (a.p === "M" && a.s === "W" && a.small && !/250k-500k/.test(a.c)) { small[a.r] = (small[a.r] || []); small[a.r].push(a.y + ": " + a.c); } });
var sk = Object.keys(small).sort(function (a, b) { return small[b].length - small[a].length; });
h += '<h2>Smaller resorts outperforming their size</h2><p class="muted">NSAA Marketing wins in the under-500k / under-250k / under-100k visit divisions.</p><table><thead><tr><th>Resort</th><th>Wins</th><th>Detail</th></tr></thead><tbody>';
sk.forEach(function (r) { h += '<tr><td>' + rlink(r) + '</td><td>' + small[r].length + '</td><td class="muted">' + esc(small[r].join(" | ")) + '</td></tr>'; });
h += '</tbody></table>';
return h;
};
// ---- Awards database ----
V.awards = function () {
var h = '<h2>Historical awards, recognition & rankings database</h2><div class="filters">' +
'<select id="fP">' + opts(Object.keys(PROGRAMS).map(function (k) { return [k, PROGRAMS[k].name]; }), "All programs") + '</select>' +
'<select id="fY">' + opts(YEARS, "All years") + '</select>' +
'<select id="fA">' + opts(AREAS.map(function (a) { return a[0]; }).concat(["Consumer reputation"]), "All capability areas") + '</select>' +
'<select id="fS">' + opts([["W", "Winners / Best / #1"], ["F", "Finalists / nominees"], ["M", "Mixed reviews"], ["R", "Ranked (lists)"]], "Any status") + '</select>' +
'<input id="fQ" placeholder="Search resort, category, note...">' +
'<button id="fX">Export CSV</button></div><div id="aOut"></div>';
return h;
};
function filteredAwards() {
var p = $("fP").value, y = $("fY").value, ar = $("fA").value, s = $("fS").value, q = $("fQ").value.toLowerCase();
return AW.filter(function (a) {
if (p && a.p !== p) return false;
if (y && String(a.y) !== y) return false;
if (ar && a.areas.indexOf(ar) < 0) return false;
if (s && a.s !== s) return false;
if (q && (a.r + " " + a.c + " " + a.n + " " + a.l).toLowerCase().indexOf(q) < 0) return false;
return true;
}).sort(function (a, b) { return b.y - a.y || a.p.localeCompare(b.p) || a.c.localeCompare(b.c) || (a.rank || 0) - (b.rank || 0); });
}
function drawAwards() {
var rows = filteredAwards();
var h = '<p class="muted">' + rows.length + ' records</p><table><thead><tr><th>Year</th><th>Program</th><th>Category / title</th><th>Recipient</th><th>Loc</th><th>Status</th><th>Areas</th><th>Notes</th></tr></thead><tbody>';
rows.forEach(function (a) {
var src = a.sam != null ? SAM[a.sam].u : PROGRAMS[a.p].url;
h += '<tr><td>' + a.y + '</td><td><a href="' + esc(src) + '" target="_blank" rel="noopener">' + esc(progName(a.p)) + '</a></td><td>' + esc(a.c) + '</td><td>' + rlink(a.r) + '</td><td>' + esc(a.l) + '</td><td>' + statusBadge(a) + '</td><td>' + a.areas.map(function (x) { return '<span class="tag">' + esc(x) + '</span>'; }).join(" ") + '</td><td class="small">' + esc(a.n) + '</td></tr>';
});
$("aOut").innerHTML = h + '</tbody></table>';
}
function csv() {
var rows = filteredAwards(), out = [["year", "program", "category", "recipient", "location", "status", "rank", "areas", "notes"]];
rows.forEach(function (a) { out.push([a.y, progName(a.p), a.c, a.r, a.l, a.s, a.rank || "", a.areas.join("; "), a.n]); });
var txt = out.map(function (r) { return r.map(function (v) { return '"' + String(v).replace(/"/g, '""') + '"'; }).join(","); }).join("\n");
var el = document.createElement("a");
el.href = URL.createObjectURL(new Blob([txt], {type: "text/csv"}));
el.download = "ski-awards.csv";
el.click();
}
// ---- Resort profiles ----
V.resorts = function () {
return '<h2>Resort recognition profiles</h2><div class="filters"><input id="rQ" list="rList" placeholder="Type a resort name..."><datalist id="rList">' + RESORTS.map(function (r) { return '<option value="' + esc(r) + '">'; }).join("") + '</datalist></div><div id="rOut"><p class="muted">Pick a resort (or click any resort name elsewhere on the site).</p></div>';
};
function drawResort(r) {
var s = ST[r];
if (!s) { $("rOut").innerHTML = '<p class="muted">No records for "' + esc(r) + '".</p>'; return; }
var rows = AW.filter(function (a) { return a.r === r; }).sort(function (a, b) { return b.y - a.y || a.p.localeCompare(b.p); });
var areas = Object.keys(s.areas).sort(function (a, b) { return s.areas[b] - s.areas[a]; });
var h = '<div class="profile"><h2>' + esc(r) + ' <span class="muted">' + esc(s.l) + '</span></h2>' +
'<div class="kpis"><div class="kpi"><b>' + s.score + '</b><span>recognition score</span></div><div class="kpi"><b>' + s.mk + '</b><span>NSAA Marketing wins</span></div><div class="kpi"><b>' + s.formal + '</b><span>all NSAA wins</span></div><div class="kpi"><b>' + s.fin + '</b><span>NSAA finalist</span></div><div class="kpi"><b>' + s.best + ' / ' + s.worst + '</b><span>SAM Best / Worst</span></div><div class="kpi"><b>' + s.peer + '</b><span>Peer Review picks</span></div><div class="kpi"><b>' + s.rep1 + ' / ' + s.repR + '</b><span>consumer #1s / other listings</span></div></div>' +
'<p>Strengths: ' + (areas.map(function (x) { return '<span class="tag">' + esc(x) + ' ' + s.areas[x] + '</span>'; }).join(" ") || '<span class="muted">n/a</span>') + '</p>';
h += '<h3>Timeline</h3><table><thead><tr><th>Year</th><th>Program</th><th>Category / title</th><th>Status</th><th>Notes</th></tr></thead><tbody>';
rows.forEach(function (a) { h += '<tr><td>' + a.y + '</td><td>' + esc(progName(a.p)) + '</td><td>' + esc(a.c) + '</td><td>' + statusBadge(a) + '</td><td class="small">' + esc(a.n) + '</td></tr>'; });
h += '</tbody></table>';
var cs = SAM.filter(function (e) { return e.r.split(/;\s*/).indexOf(r) >= 0; });
if (cs.length) { h += '<h3>Campaigns & lessons (SAM)</h3><div class="grid">' + cs.map(card).join("") + '</div>'; }
$("rOut").innerHTML = h + '</div>';
}
// ---- Campaign & lesson library ----
function card(e) {
var kind = {B: '<span class="b win">SAM Best</span>', W: '<span class="b worst">SAM Worst</span>', M: '<span class="b mixed">Mixed</span>', P: '<span class="b peer">Peer Review</span>'}[e.k];
return '<div class="card c' + e.k + '"><div class="meta">' + kind + ' <span class="muted">' + e.y + ' | ' + esc(e.ch) + '</span></div><h3>' + esc(e.t) + '</h3><p class="who">' + e.r.split(/;\s*/).map(rlink).join(", ") + ' <span class="muted">' + esc(e.l) + '</span></p><p>' + esc(e.s) + '</p><p class="lesson"><b>Lesson:</b> ' + esc(e.les) + '</p>' + (e.pt ? '<p class="small"><b>Partners/people:</b> ' + esc(e.pt) + '</p>' : '') + '<p class="small">' + e.tg.split(",").map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join(" ") + ' <a href="' + esc(e.u) + '" target="_blank" rel="noopener">source</a></p></div>';
}
V.library = function () {
var chans = uniq(SAM.map(function (e) { return e.ch; })).sort();
return '<h2>Marketing campaign & lesson library</h2><p class="muted">Summaries and lessons are our own paraphrases of SAM\'s reviewers\' assessments. Follow the source link for the original article.</p><div class="filters">' +
'<select id="lK">' + opts([["B", "Best"], ["W", "Worst"], ["M", "Mixed"], ["P", "Peer Review"]], "Best + Worst + Peer") + '</select>' +
'<select id="lY">' + opts(uniq(SAM.map(function (e) { return e.y; })).sort(function (a, b) { return b - a; }), "All years") + '</select>' +
'<select id="lC">' + opts(chans, "All channels") + '</select>' +
'<input id="lQ" placeholder="Search: humor, email, beginner, Zeb Powell, transparency..."></div><div id="lOut" class="grid"></div>';
};
function drawLib() {
var k = $("lK").value, y = $("lY").value, c = $("lC").value, q = $("lQ").value.toLowerCase();
var rows = SAM.filter(function (e) {
if (k && e.k !== k) return false;
if (y && String(e.y) !== y) return false;
if (c && e.ch !== c) return false;
if (q && (e.t + " " + e.r + " " + e.s + " " + e.les + " " + e.pt + " " + e.tg).toLowerCase().indexOf(q) < 0) return false;
return true;
}).sort(function (a, b) { return b.y - a.y; });
$("lOut").innerHTML = rows.length ? rows.map(card).join("") : '<p class="muted">No matches.</p>';
}
// ---- Lessons digest: themes ----
V.lessons = function () {
var themes = {};
SAM.forEach(function (e) { e.tg.split(",").forEach(function (t) { t = t.trim(); if (!t) return; (themes[t] = themes[t] || {b: 0, w: 0, list: []}); if (e.k === "W") themes[t].w++; else themes[t].b++; themes[t].list.push(e); }); });
var keys = Object.keys(themes).sort(function (a, b) { return themes[b].list.length - themes[a].list.length; });
var h = '<h2>Lessons by theme</h2><p class="muted">Tags across all SAM entries, ranked by frequency, with every lesson attached. Use this to back up client recommendations with real examples.</p>';
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
SAM.forEach(function (e) { if (!e.pt) return; e.pt.split(/;\s*/).forEach(function (p) { p = p.trim(); (m[p] = m[p] || []).push(e); }); });
AW.forEach(function (a) { if ((a.p === "GE" || a.p === "S") && isPerson(a.n)) { var p = a.n.replace(/\s*\(.*\)\s*$/, "") + " (individual honoree)"; (m[p] = m[p] || []).push({y: a.y, r: a.r, t: progName(a.p) + ": " + a.c + (a.s === "F" ? " (finalist)" : ""), k: a.s}); } });
var keys = Object.keys(m).sort(function (a, b) { return m[b].length - m[a].length || a.localeCompare(b); });
var h = '<h2>Agencies, production companies, creatives, athletes & people</h2><p class="muted">Extracted from recognized work. This is the seed list for linking to the agency / production company / talent databases.</p><table><thead><tr><th>Partner / person</th><th>#</th><th>Connected work</th></tr></thead><tbody>';
keys.forEach(function (p) { h += '<tr><td><b>' + esc(p) + '</b></td><td>' + m[p].length + '</td><td class="small">' + m[p].map(function (e) { return e.y + ' ' + esc(e.r) + ': ' + esc(e.t); }).join("<br>") + '</td></tr>'; });
return h + '</tbody></table>';
};
// ---- Sources ----
V.sources = function () {
var h = '<h2>Publication & source archive</h2><table><thead><tr><th>Source</th><th>Organization</th><th>Type</th><th>Years</th><th>Access</th><th>Extraction status</th></tr></thead><tbody>';
PUBS.forEach(function (p) { h += '<tr><td>' + (p.url ? '<a href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(p.n) + '</a>' : esc(p.n)) + '</td><td>' + esc(p.org) + '</td><td>' + esc(p.type) + '</td><td>' + esc(p.years) + '</td><td class="small">' + esc(p.access) + '</td><td>' + esc(p.status) + '</td></tr>'; });
h += '</tbody></table><h2>Award programs in the database</h2><table><thead><tr><th>Code</th><th>Program</th><th>Organization</th><th>Type</th><th>Records</th><th>Years in database</th></tr></thead><tbody>';
Object.keys(PROGRAMS).forEach(function (k) { var rs = AW.filter(function (a) { return a.p === k; }), ys = rs.map(function (a) { return a.y; }); h += '<tr><td>' + k + '</td><td><a href="' + esc(PROGRAMS[k].url) + '" target="_blank" rel="noopener">' + esc(PROGRAMS[k].name) + '</a></td><td>' + esc(PROGRAMS[k].org) + '</td><td>' + esc(PROGRAMS[k].type) + '</td><td>' + rs.length + '</td><td>' + (ys.length ? Math.min.apply(null, ys) + '-' + Math.max.apply(null, ys) : '') + '</td></tr>'; });
return h + '</tbody></table>';
};
// ---- About ----
V.about = function () {
return '<h2>About this research resource</h2><div class="prose"><p>This database answers one question: which ski resorts consistently do the best marketing work, what exactly are they doing differently, and what can we learn from them?</p>' +
'<p><b>Formal awards</b> come from the National Ski Areas Association: Marketing Awards (2010-2026), Golden Eagle sustainability awards (2010-2026), Conversion Cup (2011-2026) and Safety Awards (2011-2026). Finalists are included for 2021-2026.</p>' +
'<p><b>Editorial recognition</b> comes from Ski Area Management (SAM): the annual Best & Worst in Marketing feature and Peer Reviews. Every year with free full text online is extracted (2009-10, 2011-12 through 2015-16, 2024-25, 2025-26, plus 2025-26 Peer Reviews). A SAM "Best" is an editorial mention by a reviewer panel, not a formal award, and a "Worst" is a critique. They are kept as separate programs and weighted differently.</p>' +
'<p><b>Consumer reputation</b> comes from the World Ski Awards (US and Canada winners 2013-2026), USA TODAY 10Best Readers\' Choice (top 10, 2016-2025) and the SKI Magazine reader survey. These measure how guests rate the resort, not its marketing, so they are reported separately and excluded from the recognition score. SKI results are filed under the year they were published (the guide carries the next year\'s label).</p>' +
'<p><b>Naming:</b> resorts are normalized to their current name (e.g., Squaw Valley | Alpine Meadows is grouped under Palisades Tahoe, and Aspen Skiing Company under Aspen Snowmass). The original name is kept in the notes. The year is the calendar year the award was presented (2025 = the 2024-25 season).</p>' +
'<p><b>Copyright:</b> campaign summaries and lessons are short paraphrases written for this database. Read the full original articles at the linked sources.</p>' +
'<p><b>Next steps:</b> extract the SAM subscriber archive (Best/Worst 2003-2009, 2010-11 and 2016-17 through 2023-24; Peer Reviews 2021-22 through 2024-25; Outlook on Resort Marketing reports); add NSAA finalists before 2021; add the 2026 USA TODAY 10Best results when published, other 10Best ski categories and Conde Nast Traveler; link each campaign to its agency, production company, director and talent; and connect to the resort profile, ad campaign and creative partner databases.</p></div>';
};
// ================= ROUTER =================
var TABS = [["dash", "Leaderboard"], ["awards", "Awards database"], ["resorts", "Resort profiles"], ["library", "Campaign library"], ["lessons", "Lessons by theme"], ["partners", "Creative partners"], ["sources", "Sources"], ["about", "About"]];
function show(tab, arg) {
$("nav").innerHTML = TABS.map(function (t) { return '<button data-t="' + t[0] + '" class="' + (t[0] === tab ? "on" : "") + '">' + t[1] + '</button>'; }).join("");
$("main").innerHTML = V[tab]();
if (tab === "awards") { ["fP", "fY", "fA", "fS"].forEach(function (id) { $(id).onchange = drawAwards; }); $("fQ").oninput = drawAwards; $("fX").onclick = csv; drawAwards(); }
if (tab === "library") { ["lK", "lY", "lC"].forEach(function (id) { $(id).onchange = drawLib; }); $("lQ").oninput = drawLib; drawLib(); }
if (tab === "resorts") { $("rQ").onchange = function () { drawResort(this.value); }; if (arg) { $("rQ").value = arg; drawResort(arg); } }
window.scrollTo(0, 0);
}
document.addEventListener("click", function (ev) {
var t = ev.target;
if (t.matches && t.matches("#nav button")) { show(t.getAttribute("data-t")); }
if (t.matches && t.matches("a.rl")) { ev.preventDefault(); show("resorts", t.getAttribute("data-r")); }
});
show("dash");
})();
