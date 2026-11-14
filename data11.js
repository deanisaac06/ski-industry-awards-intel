// Dataset part 11: resort size classes for the "Resort size" filter.
// The app first infers size from NSAA visit divisions a resort has been entered in (most recent year wins):
//   L = over 500k skier visits, S = under 500k. This map fills gaps and overrides where the inference is wrong.
// Edit freely: "L", "S", or "" (unknown). Associations, passes and multi-resort companies are marked "O" (organization).
var SIZE = {
"Vail Mountain": "L", "Breckenridge": "L", "Keystone Resort": "L", "Copper Mountain": "L", "Winter Park Resort": "L",
"Steamboat": "L", "Aspen Snowmass": "L", "Beaver Creek": "L", "Park City Mountain": "L", "Deer Valley Resort": "L",
"Snowbird": "L", "Snowbasin": "L", "Mammoth Mountain": "L", "Palisades Tahoe": "L", "Heavenly": "L", "Northstar": "L",
"Jackson Hole Mountain Resort": "L", "Big Sky Resort": "L", "Sun Valley Resort": "L", "Killington Resort": "L",
"Stowe Mountain Resort": "L", "Whistler Blackcomb": "L", "Canyons Resort": "L", "Tremblant": "L",
"Jay Peak Resort": "S", "Mad River Glen": "S", "Magic Mountain": "S", "Saddleback": "S", "Bolton Valley": "S",
"Mount Bohemia": "S", "McIntyre Ski Area": "S", "Trollhaugen": "S", "Ski Cooper": "S", "Sunlight Mountain Resort": "S",
"Indianhead Mountain": "S", "Ragged Mountain": "S", "Grand Targhee Resort": "S", "Taos Ski Valley": "S",
"Schweitzer": "S", "Arapahoe Basin": "S", "Mountain Creek": "S", "Mount Snow": "S", "Tamarack Resort": "S",
"Crotched Mountain": "S", "Hatley Pointe": "S", "Wisp Resort": "S", "Wild Mountain": "S", "Granite Peak": "S",
"Mission Ridge": "S", "Cannon Mountain": "S", "Boreal Mountain": "S", "Homewood Mountain Resort": "S", "Pats Peak": "S",
"Peek'n Peak Resort": "S", "Ski Apache": "S", "Bristol Mountain": "S", "Roundtop Mountain Resort": "S", "Beech Mountain": "S",
"Wachusett Mountain": "S", "Camelback Resort": "S", "Shawnee Mountain": "S", "Seven Springs": "S", "Big SNOW American Dream": "S",
"Eaglecrest Ski Area": "S", "Mt. Shasta Ski Park": "S", "Pico Mountain": "S", "Alyeska Resort": "S", "SilverStar Mountain Resort": "S",
"Bogus Basin": "S", "Snow Snake Ski & Golf": "S", "Windham Mountain": "S", "Stevens Pass": "S", "Holiday Valley": "S",
"Loveland Ski Area": "S", "Winterplace Ski Resort": "S", "Showdown Montana": "S", "Brundage Mountain": "S", "Sugar Bowl Resort": "S",
"Ski Utah": "O", "Ski California": "O", "SkiBig3": "O", "Vail Resorts": "O", "Boyne Resorts": "O", "POWDR": "O", "Indy Pass": "O",
"Ikon Pass": "O", "Powder Alliance": "O", "Mountain Collective": "O", "Freedom Pass": "O", "Industry (all resorts)": "O",
"State associations (industry)": "O", "Alberta resorts (industry)": "O", "World's Largest Lesson (LSSM)": "O", "Snow Angel Foundation": "O",
"Ski Maine": "O", "Travel Alberta": "O", "Banff & Lake Louise Tourism": "O", "Tourism Eastern Townships": "O", "Visit Jackson Hole": "O",
"Olympic Regional Development Authority": "O", "Cottonwood Canyons Resorts": "O", "Many Resorts": "O", "Protect Our Winters": "O",
"MountainGuard Insurance Program": "O", "Winter 4 Kids": "O", "Snow Time, Inc.": "O", "Peak Resorts": "O", "Resorts of the Canadian Rockies": "O"
};
