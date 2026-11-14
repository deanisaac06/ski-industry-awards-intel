// Dataset part 9: consumer reputation rankings (World Ski Awards, USA TODAY 10Best Readers' Choice,
// SKI Magazine Reader Resort Survey) + updated source catalog.
// These are reputation signals, not marketing awards: the app shows them separately and leaves them out of
// the marketing recognition score. Status: W = #1 / country winner, R = ranked on the list, F = nominee.
// Year = calendar year the result was published (SKI's guide is labelled the following year; see notes).
PROGRAMS.WSA = {name: "World Ski Awards", org: "World Ski Awards", since: 2013, url: "https://worldskiawards.com/winners", type: "Consumer & industry vote"};
PROGRAMS.TB = {name: "USA TODAY 10Best Readers' Choice", org: "USA TODAY", since: 2016, url: "https://10best.usatoday.com/awards/best-ski-resort/", type: "Reader vote"};
PROGRAMS.SKI = {name: "SKI Magazine Reader Resort Survey", org: "SKI Magazine (Outside)", since: 1989, url: "https://www.skimag.com/ski-resort-life/resort-guide-2027/top-30-ski-resorts-west-2027/", type: "Reader survey ranking"};
// List helper: R(program, year, category, "Name|LOC; Name|LOC; ...", note prefix). First entry = #1.
function R(p, y, c, list, pre) {
list.split(/;\s*/).forEach(function (it, i) {
var b = it.split("|"), nm = b[0].trim(), x = (b[2] || "").trim();
AW.push({p: p, y: y, c: c, r: nm, l: (b[1] || "").trim(), s: i === 0 ? "W" : "R", n: (pre ? pre + " " : "") + "#" + (i + 1) + (x ? " (" + x + ")" : ""), rank: i + 1});
});
}

// ---------- WORLD SKI AWARDS: country winners (US and Canada) ----------
[2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026].forEach(function (y) {
A("WSA", y, "United States' Best Ski Resort", "Deer Valley Resort", "UT", "W", "World Ski Awards " + y);
});
var WSACA = {2013: "Lake Louise Ski Resort", 2014: "Lake Louise Ski Resort", 2015: "Lake Louise Ski Resort", 2016: "Revelstoke Mountain Resort", 2017: "Lake Louise Ski Resort", 2018: "Lake Louise Ski Resort", 2019: "Lake Louise Ski Resort", 2020: "Revelstoke Mountain Resort", 2021: "Lake Louise Ski Resort", 2022: "Lake Louise Ski Resort", 2023: "Lake Louise Ski Resort", 2024: "Lake Louise Ski Resort", 2025: "Lake Louise Ski Resort", 2026: "Lake Louise Ski Resort"};
Object.keys(WSACA).forEach(function (y) { A("WSA", +y, "Canada's Best Ski Resort", WSACA[y], WSACA[y] === "Lake Louise Ski Resort" ? "AB" : "BC", "W"); });
// 2026 nominees (winners above); the US and Canadian shortlists have been nearly identical every year
"Alta Ski Area|UT; Aspen Snowmass|CO; Beaver Creek|CO; Big Sky Resort|MT; Breckenridge|CO; Crested Butte|CO; Jackson Hole Mountain Resort|WY; Mammoth Mountain|CA; Palisades Tahoe|CA; Park City Mountain|UT; Snowbasin|UT; Snowbird|UT; Steamboat|CO; Stowe Mountain Resort|VT; Sun Valley Resort|ID; Telluride|CO; Vail Mountain|CO".split(/;\s*/).forEach(function (it) { var b = it.split("|"); A("WSA", 2026, "United States' Best Ski Resort", b[0], b[1], "F", "nominee"); });
"Sunshine Village|AB; Big White|BC; Fernie Alpine Resort|BC; Panorama Mountain Resort|BC; RED Mountain|BC; Revelstoke Mountain Resort|BC; Sun Peaks|BC; Tremblant|QC; Whistler Blackcomb|BC; Whitewater|BC".split(/;\s*/).forEach(function (it) { var b = it.split("|"); A("WSA", 2026, "Canada's Best Ski Resort", b[0], b[1], "F", "nominee"); });
// World-level wins by North American properties (non-resort categories, kept for context)
A("WSA",2013,"World's Best Ski Hotel","Beaver Creek","CO","W","Ritz-Carlton Bachelor Gulch");
A("WSA",2015,"World's Best Ski Hotel","Deer Valley Resort","UT","W","Stein Eriksen Lodge");
A("WSA",2022,"World's Best Ski Boutique Hotel","Deer Valley Resort","UT","W","Stein Eriksen Residences");
A("WSA",2025,"World's Best Ski Hotel","Deer Valley Resort","UT","W","Stein Eriksen Lodge Deer Valley");

// ---------- USA TODAY 10BEST READERS' CHOICE: Best Ski Resort (US & Canada), top 10 ----------
// Year = year results were announced (late November/early December, ahead of that winter). 2026 voting closed; results pending.
var TBN = "Best Ski Resort (US & Canada)";
R("TB",2025,TBN,"Snowbasin|UT; Smugglers' Notch|VT; Mount Bohemia|MI; Aspen Snowmass|CO; Killington Resort|VT; Deer Valley Resort|UT; Big Sky Resort|MT; Palisades Tahoe|CA; Mammoth Mountain|CA; Loon Mountain|NH");
R("TB",2024,TBN,"Snowbasin|UT; Mount Bohemia|MI; Sunshine Village|AB; Steamboat|CO; Heavenly|CA; Copper Mountain|CO; Cannon Mountain|NH; Snowbird|UT; Winter Park Resort|CO; Mammoth Mountain|CA");
R("TB",2023,TBN,"Mount Bohemia|MI; Sunshine Village|AB; Winter Park Resort|CO; Lutsen Mountains|MN; Heavenly|CA; Palisades Tahoe|CA; Vail Mountain|CO; Sun Valley Resort|ID; Cannon Mountain|NH; Alta Ski Area|UT");
R("TB",2022,TBN,"Sunshine Village|AB; Winter Park Resort|CO; Mount Bohemia|MI; Brundage Mountain|ID; Lake Louise Ski Resort|AB; Deer Valley Resort|UT; Copper Mountain|CO; Revelstoke Mountain Resort|BC; Stowe Mountain Resort|VT; Sun Valley Resort|ID");
R("TB",2021,TBN,"Winter Park Resort|CO; Sunshine Village|AB; Palisades Tahoe|CA; Mount Bohemia|MI; Kirkwood|CA; Copper Mountain|CO; Brundage Mountain|ID; Stowe Mountain Resort|VT; Lake Louise Ski Resort|AB; Revelstoke Mountain Resort|BC");
R("TB",2020,TBN,"Sunshine Village|AB; Brundage Mountain|ID; Copper Mountain|CO; Mount Bohemia|MI; Kirkwood|CA; Ski Land|AK; Cannon Mountain|NH; Lake Louise Ski Resort|AB; Telluride|CO; SilverStar Mountain Resort|BC");
R("TB",2019,TBN,"Winter Park Resort|CO; Palisades Tahoe|CA|as Squaw Valley Alpine Meadows; Mount Bohemia|MI; Revelstoke Mountain Resort|BC; Copper Mountain|CO; Telluride|CO; Crystal Mountain||listed as Crystal Mountain Ski Area; Big Sky Resort|MT; Stowe Mountain Resort|VT; Kicking Horse Mountain Resort|BC");
R("TB",2018,TBN,"Winter Park Resort|CO; Mount Bohemia|MI; Palisades Tahoe|CA|as Squaw Valley Alpine Meadows; Alta Ski Area|UT; Copper Mountain|CO; Kicking Horse Mountain Resort|BC; Deer Valley Resort|UT; Revelstoke Mountain Resort|BC; Taos Ski Valley|NM; Telluride|CO");
R("TB",2017,TBN,"Palisades Tahoe|CA|as Squaw Valley Alpine Meadows; Big Sky Resort|MT; Keystone Resort|CO; Aspen Snowmass|CO; Beaver Creek|CO; Park City Mountain|UT; Deer Valley Resort|UT; Steamboat|CO; Sugarbush|VT; Killington Resort|VT");
R("TB",2016,TBN,"Palisades Tahoe|CA|as Squaw Valley Alpine Meadows; Sugarbush|VT; Big Sky Resort|MT; Alta Ski Area|UT; Crested Butte|CO; Deer Valley Resort|UT; Revelstoke Mountain Resort|BC; Killington Resort|VT; Steamboat|CO; Whistler Blackcomb|BC");

// ---------- SKI MAGAZINE READER RESORT SURVEY ----------
R("SKI",2026,"Top 30 Resorts in the West","Sunshine Village|AB|Banff Sunshine; Lake Louise Ski Resort|AB; Snowbasin|UT; Alta Ski Area|UT; Big Sky Resort|MT; Sun Valley Resort|ID; Mammoth Mountain|CA; Whistler Blackcomb|BC; Grand Targhee Resort|WY; Jackson Hole Mountain Resort|WY; Snowbird|UT; Aspen Snowmass|CO; Whitefish Mountain Resort|MT; Arapahoe Basin|CO; Telluride|CO; Deer Valley Resort|UT; Copper Mountain|CO; Winter Park Resort|CO; Beaver Creek|CO; Palisades Tahoe|CA; Taos Ski Valley|NM; Brighton|UT; Mt. Bachelor|OR; Vail Mountain|CO; Tamarack Resort|ID; Breckenridge|CO; Steamboat|CO; Keystone Resort|CO; Heavenly|CA; Park City Mountain|UT","2027 guide");
R("SKI",2026,"Top 20 Resorts in the East","Saddleback|ME; Bretton Woods|NH; Killington Resort|VT; Mad River Glen|VT; Magic Mountain|VT; Sugarloaf|ME; Waterville Valley|NH; Jay Peak Resort|VT; Sunday River|ME; Loon Mountain|NH; Smugglers' Notch|VT; Stowe Mountain Resort|VT; Cannon Mountain|NH; Okemo|VT; Sugarbush|VT; Wachusett Mountain|MA; Cranmore Mountain|NH; Stratton Mountain|VT; Attitash|NH; Wildcat Mountain|NH","2027 guide");
R("SKI",2025,"Top 30 Resorts in the West","Big Sky Resort|MT; Sunshine Village|AB|Banff Sunshine; Snowbasin|UT; Aspen Snowmass|CO; Grand Targhee Resort|WY; Alta Ski Area|UT; Mammoth Mountain|CA; Sun Valley Resort|ID; Deer Valley Resort|UT; Whistler Blackcomb|BC; Jackson Hole Mountain Resort|WY; Vail Mountain|CO; Telluride|CO; Snowbird|UT; Lake Louise Ski Resort|AB; Breckenridge|CO; Beaver Creek|CO; Arapahoe Basin|CO; Winter Park Resort|CO; Copper Mountain|CO; Keystone Resort|CO; Whitefish Mountain Resort|MT; Taos Ski Valley|NM; Loveland Ski Area|CO; Steamboat|CO; Solitude|UT; Powder Mountain|UT; Revelstoke Mountain Resort|BC; Heavenly|CA; Park City Mountain|UT","2026 guide");
R("SKI",2025,"Top 20 Resorts in the East","Saddleback|ME; Sugarloaf|ME; Whiteface|NY; Holiday Valley|NY; Bretton Woods|NH; Killington Resort|VT; Smugglers' Notch|VT; Mad River Glen|VT; Jay Peak Resort|VT; Sunday River|ME; Gore Mountain|NY; Stowe Mountain Resort|VT; Cannon Mountain|NH; Sugarbush|VT; Waterville Valley|NH; Tremblant|QC; Stratton Mountain|VT; Loon Mountain|NH; Okemo|VT; Seven Springs|PA","2026 guide");
R("SKI",2024,"Top 30 Resorts in the West","Snowbasin|UT; Aspen Snowmass|CO; Sunshine Village|AB|Banff Sunshine; Taos Ski Valley|NM; Alta Ski Area|UT","2025 guide, top 5 captured");
R("SKI",2024,"Top 20 Resorts in the East","Mad River Glen|VT; Saddleback|ME; Jay Peak Resort|VT; Bretton Woods|NH; Smugglers' Notch|VT","2025 guide, top 5 captured");
A("SKI",2023,"Top 30 Resorts in the West","Powder Mountain","UT","W","2024 guide #1");
A("SKI",2023,"Top 20 Resorts in the East","Mad River Glen","VT","W","2024 guide #1");
A("SKI",2022,"Top 30 Resorts in the West","Sun Valley Resort","ID","W","2023 guide #1 (third straight year)");
A("SKI",2022,"Top 20 Resorts in the East","Smugglers' Notch","VT","W","2023 guide #1 (repeat)");
A("SKI",2022,"Top 20 Resorts in the East","Bretton Woods","NH","R","2023 guide #2");
R("SKI",2021,"Top 30 Resorts in the West","Sun Valley Resort|ID; Deer Valley Resort|UT; Whitefish Mountain Resort|MT; Taos Ski Valley|NM; Aspen Snowmass|CO; Telluride|CO; Whistler Blackcomb|BC; Steamboat|CO; Beaver Creek|CO; Crested Butte|CO","2022 guide, top 10 captured");
R("SKI",2021,"Top 20 Resorts in the East","Smugglers' Notch|VT; Tremblant|QC; Mad River Glen|VT; Killington Resort|VT; Whiteface|NY; Holiday Valley|NY; Bretton Woods|NH; Sugarbush|VT; Wachusett Mountain|MA; Sunday River|ME","2022 guide, top 10 captured");
A("SKI",2020,"Top 30 Resorts in the West","Sun Valley Resort","ID","W","2021 guide #1");
A("SKI",2018,"Resort of the Year (West)","Aspen Snowmass","CO","W","2018-19 reader survey");
A("SKI",2018,"Resort of the Year (East)","Smugglers' Notch","VT","W","2018-19 reader survey");

// ---------- SOURCE CATALOG UPDATES ----------
(function () {
function upd(prefix, fields) { PUBS.forEach(function (p) { if (p.n.indexOf(prefix) === 0) { Object.keys(fields).forEach(function (k) { p[k] = fields[k]; }); } }); }
upd("Ski Area Management (SAM) - Best & Worst", {access: "Free full text: 2009-10 (advertising), 2011-12 through 2015-16, 2024-25, 2025-26. Subscriber archive: 2003-2009, 2010-11, 2016-17 through 2023-24 (confirmed 2018-19 and 2023-24 sit behind the paywall)", status: "All free years extracted (2009-10, 2011-12 to 2015-16, 2024-25, 2025-26); subscriber years to do"});
upd("SAM - Peer Reviews", {access: "2025-26 free; 2021-22 and 2022-23 pages exist but sit in the subscriber archive", status: "2025-26 extracted; 2021-2025 need a subscription"});
upd("NSAA Marketing Awards", {status: "Winners 2010-2026 extracted; finalists 2021-2026 extracted"});
upd("NSAA Golden Eagle Awards", {status: "Winners 2010-2026 extracted; finalists 2021-2026 extracted"});
upd("NSAA Conversion Cup", {status: "Winners 2011-2026 and finalists 2021-2026 extracted"});
upd("NSAA Safety Awards", {years: "2011-present", status: "Winners 2011-2026 and finalists 2021-2026 extracted", url: "https://www.nsaa.org/NSAA/Programs/Awards/Past_Safety_Winners.aspx"});
upd("Shop Eat Surf Outdoor", {status: "Used for 2026 results; SnowBrains reprints of NSAA releases used for 2021-2024 finalists"});
upd("SKI Magazine", {years: "1989-present", status: "Full West 30 / East 20 for the 2026 and 2027 guides; partial lists and #1s for 2019-2025 guides", url: "https://www.skimag.com/ski-resort-life/resort-guide-2027/top-30-ski-resorts-west-2027/"});
upd("World Ski Awards", {status: "US and Canada winners 2013-2026 extracted; 2026 nominees", url: "https://worldskiawards.com/winners"});
upd("USA Today 10Best", {years: "2016-present", status: "Top 10 Best Ski Resort 2016-2025 extracted; 2026 results pending (voting closed)", url: "https://10best.usatoday.com/awards/best-ski-resort/"});
PUBS.push({n: "SAM - Outlook on Resort Marketing report", org: "SAM Magazine", type: "Annual marketing survey/report", years: "ongoing", access: "Subscriber archive", status: "To do (subscription)", url: "https://www.saminfo.com/"});
PUBS.push({n: "USA TODAY 10Best - other ski categories (ski town, ski hotel, apres bar, terrain park, family resort)", org: "USA TODAY", type: "Reader vote", years: "ongoing", access: "Free", status: "To do (resort-level list done)", url: "https://10best.usatoday.com/"});
PUBS.push({n: "Conde Nast Traveler Readers' Choice - ski resorts", org: "Conde Nast", type: "Reader vote", years: "ongoing", access: "Free", status: "To do", url: "https://www.cntraveler.com/"});
})();
