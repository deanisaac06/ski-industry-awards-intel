// Dataset part 10: older NSAA results (2007-2009 marketing, 2009-2010 guest service, 2009 safety), NSAA 2019
// finalists, USA TODAY 10Best ski school / snow tubing / terrain park lists, Conde Nast Traveler Readers' Choice,
// and award-winning campaign details (campaign names, results, agencies and people) for NSAA winners.
PROGRAMS.GS = {name: "NSAA Guest Service Awards", org: "National Ski Areas Association", since: 2000, url: "https://www.saminfo.com/news/sam-headline-news/5185-528-nsaa-names-marketing-guest-service-leaders", type: "Guest service"};
PROGRAMS.CNT = {name: "Conde Nast Traveler Readers' Choice", org: "Conde Nast Traveler", since: 1988, url: "https://www.cntraveler.com/story/top-ski-resorts-us", type: "Reader survey ranking"};

// ---------- NSAA MARKETING before 2010 (from SAM news / resort releases; the NSAA archive starts in 2010) ----------
A("M",2009,"Best Overall Marketing Program (up to 100k visits)","Indianhead Mountain","MI","W","tie");
A("M",2009,"Best Overall Marketing Program (up to 100k visits)","Mad River Glen","VT","W","tie");
A("M",2009,"Best Overall Marketing Program (100k-250k visits)","Jay Peak Resort","VT");
A("M",2009,"Best Overall Marketing Program (250k-500k visits)","Telluride","CO");
A("M",2009,"Best Overall Marketing Program (500k+ visits)","Mammoth Mountain","CA");
A("M",2007,"Best Overall Marketing Program (500k+ visits)","Okemo","VT","W","2006-07 season; other divisions not captured");
// ---------- NSAA GUEST SERVICE AWARDS (discontinued after 2010) ----------
A("GS",2010,"Best Overall Guest Service Program (up to 100k visits)","McIntyre Ski Area","NH","W","tie");
A("GS",2010,"Best Overall Guest Service Program (up to 100k visits)","Thunder Ridge Ski Area","NY","W","tie");
A("GS",2010,"Best Overall Guest Service Program (100k-250k visits)","Sugar Bowl Resort","CA");
A("GS",2010,"Best Overall Guest Service Program (250k-500k visits)","Crested Butte","CO");
A("GS",2010,"Best Overall Guest Service Program (500k+ visits)","Beaver Creek","CO");
A("GS",2009,"Best Overall Guest Service Program (up to 100k visits)","Chestnut Mountain Resort","IL");
A("GS",2009,"Best Overall Guest Service Program (100k-250k visits)","Mount Sunapee","NH");
A("GS",2009,"Best Overall Guest Service Program (250k-500k visits)","Sugarbush","VT");
A("GS",2009,"Best Overall Guest Service Program (500k+ visits)","Beaver Creek","CO");
// ---------- NSAA SAFETY 2009 (2008-09 season, "Heads Up" awards) ----------
A("S",2009,"Best Overall Safety Program (over 250k visits)","Beaver Creek","CO");
A("S",2009,"Best Overall Safety Program (under 250k visits)","Arizona Snowbowl","AZ");
A("S",2009,"Best Safety Week Program","Vail Mountain","CO");
A("S",2009,"Best Terrain Park Safety","Stevens Pass","WA");
A("S",2009,"Best Avalanche Safety","Telluride","CO");
A("S",2009,"Best Helmet Safety","Okemo","VT");
A("S",2009,"Best Use of the Web in a Safety Campaign","Holiday Valley","NY");
A("S",2009,"Best Employee Involvement & Education","Mountain High","CA");
A("S",2009,"Best Community Outreach (safety)","Northstar","CA");

// ---------- NSAA 2019 FINALISTS (winners already in data.js / data7.js) ----------
A("M",2019,"Best Use of Social Media","Camelback Resort","PA","F");
A("M",2019,"Best Use of Social Media","Sunlight Mountain Resort","CO","F");
A("M",2019,"Best Use of Video","Showdown Montana","MT","F");
A("M",2019,"Best Use of Video","Sunlight Mountain Resort","CO","F");
A("M",2019,"Best LSSM / Bring a Friend Campaign","Boreal Mountain","CA","F");
A("M",2019,"Best LSSM / Bring a Friend Campaign","Camelback Resort","PA","F");
A("M",2019,"Most Unique Campaign","Big Sky Resort","MT","F");
A("M",2019,"Most Unique Campaign","Jay Peak Resort","VT","F");
A("M",2019,"Best Overall Campaign (under 500k visits)","Jay Peak Resort","VT","F");
A("M",2019,"Best Overall Campaign (under 500k visits)","Sugarbush","VT","F");
A("M",2019,"Best Overall Campaign (over 500k visits)","Aspen Snowmass","CO","F");
A("M",2019,"Best Overall Campaign (over 500k visits)","Big Sky Resort","MT","F");
A("S",2019,"Best Overall Safety Program (under 500k visits)","Holiday Valley","NY","F");
A("S",2019,"Best Overall Safety Program (under 500k visits)","Telluride","CO","F");
A("S",2019,"Best Overall Safety Program (over 500k visits)","Killington Resort","VT","F");
A("S",2019,"Best #RideAnotherDay Program","Telluride","CO","F");
A("S",2019,"Best Employee Safety Program","Telluride","CO","F");
A("S",2019,"Best Employee Safety Program","Vail Mountain","CO","F");
A("S",2019,"Best Guest Safety Program","Copper Mountain","CO","F");
A("S",2019,"Best Guest Safety Program","Mammoth Mountain","CA","F");
A("GE",2019,"Overall Environmental Excellence","Jiminy Peak","MA","F");
A("GE",2019,"Overall Environmental Excellence","SilverStar Mountain Resort","BC","F");
A("GE",2019,"Overall Environmental Excellence","Sun Valley Resort","ID","F");
A("GE",2019,"Innovation in Sustainability","Alta Ski Area","UT","F");
A("GE",2019,"Innovation in Sustainability","Bogus Basin","ID","F");
A("GE",2019,"Innovation in Sustainability","Snowbird","UT","F");
A("GE",2019,"Innovation in Sustainability","Palisades Tahoe","CA","F","as Squaw Valley Alpine Meadows");
A("GE",2019,"Climate Change Impact","Snowbird","UT","F");
A("GE",2019,"Climate Change Impact","Palisades Tahoe","CA","F","as Squaw Valley Alpine Meadows");
A("GE",2019,"Hero of Sustainability","Palisades Tahoe","CA","F","Michael Gross");
A("GE",2019,"Hero of Sustainability","Bogus Basin","ID","F","Jack Hicks");
A("CC",2019,"Conversion Cup","Blue Mountain Resort","PA","F");
A("CC",2019,"Conversion Cup","Boreal Mountain","CA","F");
A("CC",2019,"Conversion Cup","National Winter Activity Center","NJ","F","honorable mention");
A("CC",2019,"Conversion Cup","Tamarack Resort","ID","F","honorable mention");

// ---------- USA TODAY 10BEST: other resort-level categories ----------
R("TB",2025,"Best Ski School","Taos Ski Valley|NM|Ernie Blake Snowsports School; Hidden Valley Resort|PA; Winterplace Ski Resort|WV; Smugglers' Notch|VT; Aspen Snowmass|CO; Solitude|UT; Deer Valley Resort|UT; Wachusett Mountain|MA; Sun Valley Resort|ID; Snowshoe|WV");
R("TB",2024,"Best Ski School","Taos Ski Valley|NM|Ernie Blake Snowsports School; Kimberley Alpine Resort|BC|TELUS Winter Sports School; Sunshine Village|AB; Snowbird|UT; Lake Louise Ski Resort|AB; Brundage Mountain|ID; Solitude|UT; Mammoth Mountain|CA; Copper Mountain|CO; Palisades Tahoe|CA");
R("TB",2023,"Best Ski School","Kimberley Alpine Resort|BC|TELUS Winter Sports School; Winter Park Resort|CO; Brundage Mountain|ID; Sugarbush|VT; Lake Louise Ski Resort|AB; Palisades Tahoe|CA; Copper Mountain|CO; Mont-Sainte-Anne|QC|TELUS Winter Sports School; Deer Valley Resort|UT; Sunshine Village|AB");
R("TB",2025,"Best Place for Snow Tubing","Camelback Resort|PA; Blue Mountain Resort|PA; Winterplace Ski Resort|WV; Cranmore Mountain|NH; Wintergreen Resort|VA; Magic Mountain Alpine Slide||location not given; Liberty Mountain|PA; Bogus Basin|ID; Woolly's Adventure Summit|IA; Snowshoe|WV");
R("TB",2024,"Best Place for Snow Tubing","Camelback Resort|PA; Wintergreen Resort|VA; Tahoe Donner|CA|Tahoe Donner Snowplay; Cranmore Mountain|NH; Mount Snow|VT; Mt. Hood Skibowl|OR; Copper Mountain|CO; Winter Park Resort|CO|Coca-Cola Tube Hill; Snowshoe|WV; Magic Mountain Alpine Slide||location not given");
R("TB",2023,"Best Place for Snow Tubing","Camelback Resort|PA; Wintergreen Resort|VA; Big Bear Snow Play|CA; Winter Park Resort|CO|Coca-Cola Tube Hill; Cranmore Mountain|NH; King Pine Ski Area|NH; Mt. Hood Skibowl|OR; Ski Butternut|MA; Copper Mountain|CO; Keystone Resort|CO");
R("TB",2016,"Best Terrain Park","Seven Springs|PA; Big White|BC; Northstar|CA; Copper Mountain|CO; Stratton Mountain|VT; Mount Snow|VT; Keystone Resort|CO; Whistler Blackcomb|BC; Loon Mountain|NH; Breckenridge|CO","Feb 2016;");

// ---------- CONDE NAST TRAVELER READERS' CHOICE ----------
R("CNT",2026,"Top 30 Ski Resorts in the US","Big Sky Resort|MT|94.29; Deer Valley Resort|UT|94.23; Aspen Snowmass|CO|Aspen Mountain 94.13; Aspen Snowmass|CO|Snowmass 93.72; Breckenridge|CO|93.71; Sun Valley Resort|ID|93.27; Telluride|CO|93.15; Park City Mountain|UT|92.97; Bretton Woods|NH|92.43; Killington Resort|VT|92.23; Vail Mountain|CO|91.77; Jackson Hole Mountain Resort|WY|91.01; Stowe Mountain Resort|VT|90.87; Blue Mountain Resort|PA|89.36; Taos Ski Valley|NM|88.12; Camelback Resort|PA|88.01; Heavenly|CA/NV|87.83; Aspen Snowmass|CO|Aspen Highlands 87.83; Steamboat|CO|87.81; Sundance Mountain Resort|UT|87.45; Tamarack Resort|ID|86.05; Alyeska Resort|AK|85.38; Beaver Creek|CO|85.28; Winter Park Resort|CO|84.82; Aspen Snowmass|CO|Buttermilk 84.60; Keystone Resort|CO|84.28; Palisades Tahoe|CA|83.55; Waterville Valley|NH|82.29; Whiteface|NY|82.01; Whitefish Mountain Resort|MT|81.86","Oct 2026;");
R("CNT",2026,"Top 5 Ski Resorts in Canada","Whistler Blackcomb|BC|92.58; Tremblant|QC|91.80; Sunshine Village|AB|91.71; SilverStar Mountain Resort|BC|88.77; Lake Louise Ski Resort|AB|88.67","Oct 2026;");
R("CNT",2025,"Top 10 Ski Resorts in North America","Jackson Hole Mountain Resort|WY|98.40; Deer Valley Resort|UT|95.00; Aspen Snowmass|CO|Snowmass 95.00; Beaver Creek|CO|94.44; Big Sky Resort|MT|94.04; Taos Ski Valley|NM|93.33; Panorama Mountain Resort|BC|91.67; Whistler Blackcomb|BC|90.00; Aspen Snowmass|CO|Aspen Mountain 88.00; Vail Mountain|CO|86.67","Oct 2025;");
[["Bretton Woods","NH",3],["Blue Mountain Resort","PA",10],["Killington Resort","VT",12],["Stowe Mountain Resort","VT",14],["Whiteface","NY",16],["Camelback Resort","PA",21],["Snowshoe","WV",27]].forEach(function (x) {
AW.push({p: "CNT", y: 2025, c: "Top 30 Ski Resorts in the US", r: x[0], l: x[1], s: "R", n: "Oct 2025; #" + x[2] + " (eastern resorts only captured)", rank: x[2]});
});

// ---------- AWARD-WINNING CAMPAIGN DETAILS ----------
// C(program, year, category-match, resort, campaign name, what it was / results, partners & people, source)
var CAMP = [];
function C(p, y, c, r, name, d, pt, u) { CAMP.push({p: p, y: y, c: c, r: r, name: name, d: d, pt: pt || "", u: u || ""}); }
C("M",2025,"Best Overall Campaign (under 500k visits)","Jay Peak Resort","Pass the Jay","Season-long campaign framing the sharing of Jay's stories, traditions, stashes and apres rituals as something staff, guests and locals do together; Jay's 13th NSAA marketing award.","Origin (agency, original concept); Buttery Agency (design); Steve Wright (GM)","https://jaypeakresort.com/node/2850");
C("M",2025,"Best Overall Campaign (over 500k visits)","Snowbasin","No. 1","Finalist. Built on its No. 1 rankings from SKI, Outside and USA TODAY: ~25M impressions, 3.6x landing-page traffic, 72% higher CTR, $1M+ tracked e-commerce; dimensional arrow billboard at an SLC freeway entrance and airport baggage-claim placements.","In-house: Michael Rueckert; Brooks Roe; Nathan Megura; Kate Indart; Olivia Allsop","https://www.snowbasin.com/blog/news/NSAA-Marketing-Award-Finalist");
C("M",2025,"Mountains Are For Everyone","Mt. Bachelor","Play Forever","Company-wide access program with nonprofits, schools and agencies: 200 full-ride Alpine/Nordic scholarships across 11 nonprofits, lesson and rental scholarships, free lunches, comped tickets and gear grants.","Vamonos Outside; John Merriman (president & GM); Presley Quon (communications)","https://www.bendsource.com/business/mt-bachelor-wins-national-award-for-inclusion-and-belonging-23171660/");
C("M",2024,"Mountains Are For Everyone","Vail Resorts","Gondola Gallery by Epic","Art installations in gondola cabins plus a film series on artists who love the mountains, at Park City, Stowe and Whistler Blackcomb, to spark conversation on representation and access.","Epic Pass","https://www.snowsportsnews.com/articles/vail-resorts-wins-five-national-ski-area-association-awards");
C("M",2024,"Best Social Media Campaign","Keystone Resort","Bergman Unlocked","Video series telling the people and process behind the Bergman Bowl project and new Bergman Express lift (500+ acres of new lift-served terrain).","Keystone social media team","https://www.snowsportsnews.com/articles/vail-resorts-wins-five-national-ski-area-association-awards");
C("M",2024,"Stoked on Safety","Ski California","Deep Snow Safety","Video on tree-well and deep-snow immersion with two real rescues on camera, released just before an 8-10 ft storm cycle; quiz entry for a Gold Pass; amplified by member resorts.","Travis Ganong; Michael Reitzell (president)","https://skicalifornia.org/newsroom/news/ski-california-heavenly-mammoth-and-palisades-tahoe-awarded-for-safety-and-marketing/");
C("S",2024,"Best Collision Prevention Program","Heavenly","Mombo reroute & Lakeview Park rebuild","Rerouted the Mombo run and rebuilt the Lakeview Terrain Park to separate traffic and cut collisions.","","https://www.snowsportsnews.com/articles/vail-resorts-wins-five-national-ski-area-association-awards");
C("S",2024,"Safety Champion","Keystone Resort","Bergman Bowl build safety","Led the Bergman Bowl expansion with zero employee or contractor injuries; weekly safety audits for all project managers.","Kolina Coe (director of mountain operations)","https://www.snowsportsnews.com/articles/vail-resorts-wins-five-national-ski-area-association-awards");
C("M",2020,"Best Overall Campaign (over 500k visits)","Snowbird","Assume The Risk","Turned real on-mountain warnings and disclaimers into ads: +6% YoY display traffic, 2x average Facebook CTR, 17x return on social ads for tickets and passes (Dec-Feb).","","https://skiutah.com/news/2020-nsaa-award-winners");
C("S",2020,"Best Overall Safety Program (over 500k visits)","Snowbasin","#SAFERmtn","Safety brand built on Smart, Alert, Focused, Educated, Respectful; avalanche-dog demos, beacon park, base-camp booth (600+ visitors opening weekend), 21k+ views across channels.","","https://skiutah.com/news/2020-nsaa-award-winners");
C("S",2020,"Best #RideAnotherDay Program","Snowbasin","Family Zone & Safety Ambassadors","Expanded slow Family Zone in a busy beginner area and placed Safety Ambassadors; visits +27% while incidents fell 25% over two years.","","https://skiutah.com/news/2020-nsaa-award-winners");
C("CC",2020,"Conversion Cup","Blue Mountain Resort","Beginner pathway","Terrain Based Learning, on-demand lessons, school and family programs, follow-up lift/lesson offers and vouchers for beginners who skip lessons.","Terrain Based Learning","https://www.saminfo.com/news/sam-headline-news/nsaa-honors-resorts-for-sustainability-marketing-safety-and-growth");
C("M",2019,"Best Overall Campaign (over 500k visits)","Killington Resort","Be Fast & Be Fearless","Campaign built around hosting the 2018 Audi FIS Ski World Cup; Killington also won Best #RideAnotherDay that year.","Mike Solimano (president & GM); POWDR","https://vermontbiz.com/node/232674");
C("M",2018,"Best Overall Campaign (over 500k visits)","Snowbird","One Star","Turned real one-star reviews into ads that 'complained' about Snowbird's best features (steep, deep, hard), extended to receipts, a web page, merch and a lobby video wall.","","https://www.deseret.com/2018/5/10/20644725/snowbird-snowbasin-honored-at-ski-association-convention/");
C("M",2018,"Best Overall Campaign (under 500k visits)","Mount Snow","We Love Snow","New brand advertising campaign launched the prior season.","Thad Quimby (senior director of marketing & events)","https://www.deerfieldvalleynews.org/business/mountain-takes-top-award-marketing-series");
C("M",2017,"Best Overall Campaign","Killington Resort","Women's World Cup 2016","Year-long four-pillar campaign (advertising, PR with #beastworldcup, sales/hospitality, video and partnerships) for the Nov 2016 races: 30,000+ attendees, 25,000 official programs, won the right to host again.","The Mountain Times (official program)","https://mountaintimes.info/killington-resort-awarded-best-overall/");
C("M",2014,"Best Old School (radio, print, billboard)","Jay Peak Resort","Momentus ('Relive New Moments')","Second-season animated spot in which a 40-year-old's inner child questions her adult choices; ran on radio, print, TV and online, with radio driving a spike in calls.","Steve Wright (CMO)","https://alpinezone.com/?p=22922");
C("M",2010,"Best Overall Marketing Program (250k-500k visits)","Crested Butte","Fly Free","Industry-first fly-free program funded with marketing dollars from the airline minimum revenue guarantee, spawning Friends & Family Fly Free and Fly, Ski & Stay offers; Crested Butte also won the guest service award in the same division.","","https://crestedbuttenews.com/?p=2577");
C("GS",2010,"Best Overall Guest Service Program (250k-500k visits)","Crested Butte","Service Excellence","Guest survey scores up 13 points (RRC Associates) after early-season training, a cross-department Service Excellence Team, personal replies to comments, a central guest-service kiosk and new uniforms.","RRC Associates","https://crestedbuttenews.com/?p=2577");

// ---------- SOURCE CATALOG UPDATES ----------
(function () {
PUBS.forEach(function (p) {
if (p.n.indexOf("NSAA Marketing Awards") === 0) p.status = "Winners 2010-2026 (plus 2007 and 2009 from news coverage); finalists 2019 and 2021-2026";
if (p.n.indexOf("NSAA Safety Awards") === 0) p.status = "Winners 2009 and 2011-2026; finalists 2019 and 2021-2026";
if (p.n.indexOf("NSAA Golden Eagle") === 0) p.status = "Winners 2010-2026; finalists 2019 and 2021-2026";
if (p.n.indexOf("NSAA Conversion Cup") === 0) p.status = "Winners 2011-2026; finalists 2019 and 2021-2026";
if (p.n.indexOf("USA TODAY 10Best - other") === 0) p.status = "Ski School and Snow Tubing 2023-2025, Terrain Park 2016 done; ski town / hotel / apres / restaurant / shop are not resort awards and are skipped";
if (p.n.indexOf("SKI Magazine") === 0) p.status = "Full West 30 / East 20 for the 2023 and 2027 guides; full West + top-5 East for 2025; full 2026 guide; top 10s for 2022 and 2024 guides; #1s for 2019 and 2021";
if (p.n.indexOf("Conde Nast") === 0) { p.status = "US Top 30 + Canada Top 5 (2026), North America Top 10 + eastern US ranks (2025)"; p.url = "https://www.cntraveler.com/story/top-ski-resorts-us"; }
});
PUBS.push({n: "NSAA Guest Service Awards", org: "National Ski Areas Association", type: "Formal award program (discontinued)", years: "to 2010", access: "Free via SAM news archive", status: "2009 and 2010 extracted; earlier years to do", url: "https://www.saminfo.com/news/sam-headline-news/5443-880-nsaa-announces-marketing-and-guest-services-awards"});
PUBS.push({n: "NSAA Journal (winner case studies)", org: "National Ski Areas Association", type: "Member journal", years: "ongoing", access: "Members", status: "To do: in-depth reviews of each year's winning programs", url: "https://www.nsaa.org/"});
PUBS.push({n: "Resort and association press releases (campaign details)", org: "Various", type: "Campaign names, results, agencies", years: "2010-2025", access: "Free", status: "19 award-winning campaigns documented; continue for remaining winners", url: ""});
})();
