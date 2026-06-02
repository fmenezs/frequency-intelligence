// api/spotify.js — Frequency Intelligence v8.0 — FMENEZS
// Fonte primária: playlists curadas do FMENEZS no Spotify

// Banco estático das playlists curadas do FMENEZS
// 243 tracks extraídas manualmente — fonte garantida, sem depender de API
const FMENEZS_TRACKS = {
  g1: [
    {name:'New World',artist:'Tuccillo',album:'Happyness'},
    {name:'The Frequency - N.W.N. Remix',artist:'Tracksuit Society, N.W.N.',album:'The Frequency (N.W.N. Remix)'},
    {name:'Jeep',artist:'Franck Roger',album:'Jeep'},
    {name:'Lost Sands',artist:'Franck Roger',album:'Life In Blue'},
    {name:'Bring Back The Hustle - Juan Mejia Sosa Remix',artist:'Joeski, Juan Mejia',album:'Bring Back The Hustle'},
    {name:'Came Back Raw - Extended Mix',artist:'Igor Gonya, Stogov',album:'Came Back Raw / Pump Keen'},
    {name:'Noone',artist:'Donnell Knox',album:'House Trax'},
    {name:'Intentions - Frits Wentink Remix',artist:'Max Sinàl, KingCrowney, Liv East, Frits Wentink',album:'Intentions Remixes'},
    {name:'Backroom',artist:'Loftsoul',album:'Reunion E.P.'},
    {name:'90\'s Stars',artist:'Gion',album:'90\'s Stars'},
    {name:'Afterhours',artist:'Plaisance',album:'Coldie EP'},
    {name:'Galaxy - Jimpster Remix',artist:'Nacho Marco, Jimpster',album:'Galaxy (incl. Jimpster remix)'},
    {name:'Organic Horizon - Deep House Instrumental',artist:'Summer Fusion',album:'Ibiza Sax on the Beach'},
    {name:'Speak To Me',artist:'Thomas Wood',album:'Quiet Storm EP'},
    {name:'Keep On Movin\'',artist:'Gorge',album:'Keep On Movin\' EP'},
    {name:'Dearly Devoted - Gorge\'s Classic Remix',artist:'Evren Ulusoy',album:'Dearly Devoted'},
    {name:'Feeling Nervous',artist:'E. Live',album:'Feeling Nervous / Feelin You Up'},
    {name:'You\'re In Love',artist:'Franck Roger',album:'Life In Blue'},
    {name:'Shuffle Board - Demuir\'s Playboy Edit',artist:'Demarkus Lewis, Demuir',album:'Deez Highlight'},
    {name:'Illusions - DJ Steaw Extended Interpretation',artist:'DJ Dove, Dj Steaw',album:'Illusions (DJ Steaw Interpretation)'},
    {name:'If You Want Me - Club Mix',artist:'Lenny Fontana, Jasmine Lovett',album:'If You Want Me'},
    {name:'Frenka',artist:'Hugo Samba, Brahim Samba, Sounds Of Sirin',album:'Frenka'},
    {name:'Somebody - Extended Mix',artist:'Cem Gemalmaz',album:'Somebody'},
    {name:'This Could Be Us - The Layabouts Instrumental Mix',artist:'Tony Momrelle, The Layabouts',album:'This Could Be Us (The Layabouts Remixes)'},
    {name:'Chord Looper',artist:'Mika Olson',album:'Terry\'s Cafe 14'},
    {name:'Vertical Horizon',artist:'Slow Riffs',album:'Simulacra'},
    {name:'Pictures (feat. Ntsakosoul & Vhuvii)',artist:'MacZito, Ntsakosoul, Vhuvii',album:'Canvas Of Sound'},
    {name:'Nightshade',artist:'MARINI',album:'Nightshade'},
    {name:'Chewi',artist:'DJ Sandwich',album:'Hamkke EP'},
    {name:'Promises',artist:'Rollercone',album:'Back at Home'},
    {name:'Neon Drift - Club Mix',artist:'Fouk',album:'Neon Drift (Club Mix)'},
    {name:'Drowned in Blue',artist:'Godblesscomputers',album:'Drowned in Blue'},
    {name:'707 Baby - DJ Merci Remix',artist:'Aircrax, DJ Merci',album:'Fantasy'},
    {name:'Lola\'s Scream',artist:'Franck Roger',album:'Lola\'s Scream EP'},
    {name:'Havana Jazz - Extended Mix',artist:'T.Markakis, Blanco K',album:'Havana Jazz'},
    {name:'Get Up',artist:'John Pridgen',album:'Crossed Signals, Vol. 19'},
    {name:'Soul and Love',artist:'Jaques Le Noir',album:'Soul and Love'},
  ],
  g2: [
    {name:'Dreams of Gaia - Br!tch Remix',artist:'Walls of Arctica, Br!tch',album:'Dreams of Gaia'},
    {name:'Sinergy',artist:'Dabeat',album:'Elevate'},
    {name:'Wild Raspberry',artist:'DJ Phellix',album:'Wild Raspberry'},
    {name:'Dhegoma',artist:'3Kilo',album:'Three of a Kind #39'},
    {name:'Waking Motion - Santiago Rossi Remix - Mixed',artist:'Xspance, Santiago Rossi',album:'Elsewhere 001 (DJ Mix)'},
    {name:'Sublimate',artist:'GMJ',album:'Evocative 039'},
    {name:'South Dub',artist:'Dubtommy',album:'Cardinal Directions Pt.1'},
    {name:'Moon - Mixed',artist:'Lake Avalon',album:'Melodic & Progressive House, Spring 20...'},
    {name:'Elemento',artist:'Thales Senses',album:'Best of 3rd Avenue | Winter 2020'},
    {name:'Mellotronesque - Willscape Remix',artist:'P U L S A R, Willscape',album:'Mellotronesque'},
    {name:'Bushido',artist:'Leap Seconds',album:'Bushido'},
    {name:'A Long Time Ago',artist:'Emanuel Brizuela',album:'A Long Time Ago'},
    {name:'Fermee',artist:'CHOMBA',album:'The Leftovers'},
    {name:'Spectral',artist:'Joachim Spieth, Warmth',album:'Fragments'},
    {name:'Don\'t Think Loud',artist:'Yoni Yarchi',album:'The Subconscious EP'},
    {name:'Nebula',artist:'Sajith Prakash',album:'Nebula'},
    {name:'Hologram Sunday',artist:'AudioStorm',album:'Unknown Destination'},
    {name:'Wildflower - Mauro Masi Remix',artist:'Travis Jesse, Mauro Masi',album:'Salvage'},
    {name:'Opal - Izzet Remix',artist:'Dave Leck, Izzet',album:'Opal'},
    {name:'Particles - Dimuth K. Remix',artist:'Bermuda, Happy Deny, Sonic Holiday, Dimuth K',album:'Particles'},
    {name:'Rojo Vivo',artist:'Abaze',album:'18 Years Anniversary'},
    {name:'Someday - Aman Anand \'Moonlight\' Dub Remix',artist:'Aetha, Aman Anand',album:'Someday (Remixes)'},
    {name:'Tempt With Discovery',artist:'Chris Barag',album:'Tempt With Discovery'},
    {name:'Bark - Original Mix',artist:'Frankie M.',album:'Luz De Selva'},
    {name:'Removed Mind (Equinox 1)',artist:'Dunadry',album:'Removed Mind (Equinox 1)'},
    {name:'All Summer Long - Ranj Kaler Remix',artist:'Circulation, Ranj Kaler',album:'All Summer Long'},
    {name:'Enough 2026 - Club Mix',artist:'Peter Mac',album:'Enough 2026'},
    {name:'Dearly Devoted - Gorge\'s Classic Remix',artist:'Evren Ulusoy',album:'Dearly Devoted'},
    {name:'Rescue - Futura City Ending Texture',artist:'Marway, Futura City',album:'The Remixes, Vol. 3'},
    {name:'Space Medley - Futura City FM Texture',artist:'Circulation, Futura City',album:'The Remixes, Vol. 3'},
    {name:'Morning Birds - Domingo+ & Loveclub Remix',artist:'FMENEZS, Loveclub, Domingo+',album:'Morning Birds'},
    {name:'Morning Birds',artist:'FMENEZS',album:'Morning Birds'},
    {name:'Limbo',artist:'FMENEZS, Caio Assis',album:'Limbo'},
    {name:'Aurora',artist:'Hans Gerd',album:'Cybertron'},
    {name:'Find Yourself - Alex O\'Rion Remix - Mixed',artist:'Digital Mess, Alex O\'Rion',album:'THE ALLEYS MIX SERIES 004 (DJ Mix)'},
    {name:'Reality Shifting',artist:'Hraach',album:'Sushupti'},
    {name:'Passion and Pain - Dust Yard Remix',artist:'D.M.P, Dust Yard',album:'Passion and Pain'},
    {name:'Love and Money',artist:'Alexander Sound',album:'Love and Money'},
    {name:'Louna',artist:'Sam Shure',album:'Louna'},
  ],
  g3: [
    {name:'Need U - Original Mix',artist:'Four Candles, Kabi (AR)',album:'Sofa Surfing'},
    {name:'Coaster - Durante Remix',artist:'Anonimat, Ilias Katelanos, Plecta, Durante',album:'Coaster EP'},
    {name:'Roots - Cornucopia Remix',artist:'Chopstick & Johnjon, Signaljacker, Cornucopia',album:'Roots (Cornucopia Remix)'},
    {name:'Freydies - Extended Mix',artist:'Yuvèe',album:'Freydies EP'},
    {name:'Elysium',artist:'ANT ONE BIF',album:'Skill Box, Vol. 17'},
    {name:'Blaze',artist:'Nicolas Viana',album:'Blaze / Pixel EP'},
    {name:'Vdol Po Rechenke',artist:'Volen Sentir',album:'Vdol Po Rechenke'},
    {name:'Spaces In Between - Rodriguez Jr. Remix',artist:'Qess, Ursula Rucker, Rodriguez Jr.',album:'Spaces In Between (Rodriguez Jr. Remix)'},
    {name:'Remember Me',artist:'Cornucopia',album:'Remember Me / Early Morning'},
    {name:'Just Breathe',artist:'Fauxplay, Ranj Kaler',album:'We Have Everything'},
    {name:'The Bay 6 - pt. 1',artist:'DAVI',album:'The Bay 6 EP'},
    {name:'Tuesday Maybe - Guy J Remix',artist:'Way Out West, Guy J',album:'Tuesday Maybe (Remixed)'},
    {name:'Ame Nimo Makezu',artist:'Malkov, Gronny',album:'Deepness'},
    {name:'Beautiful Life - Original Mix',artist:'Martin Roth',album:'Beautiful Life / Make Love To Me Baby'},
    {name:'Don\'t Let Me Go - Mixed',artist:'Melarmony',album:'Anjunadeep 16'},
    {name:'Rage - Orginal Mix',artist:'MYTRIPISMYTRIP',album:'Rage People'},
    {name:'Spectral',artist:'Joachim Spieth, Warmth',album:'Fragments'},
    {name:'Sunshine - Sentre Club Mix',artist:'Sentre',album:'Sunshine'},
    {name:'Down With Us - Original Mix',artist:'Mario Neha',album:'Two Suns EP (Mario Neha)'},
    {name:'Deep In My Soul - Original Mix',artist:'16BL',album:'Deep In My Soul EP'},
    {name:'Virtue',artist:'Sean Branton',album:'Warung EP'},
    {name:'Malibu - Deeplomatik Remix',artist:'ÜDORÃ, Kamil Grabowski, Deeplomatik',album:'Malibu'},
    {name:'Jolene',artist:'Oron K, YAKOS, KSANA',album:'Jolene'},
    {name:'Twotrunks',artist:'Doppel',album:'Twotrunks (Tom Baker Remix)'},
    {name:'Lura',artist:'Soudant',album:'Lura'},
    {name:'Wouldi',artist:'Dandara',album:'Music Lovers Club #007'},
    {name:'Time With Me',artist:'Moon Rocket',album:'Time With Me'},
    {name:'The Bay 6 - pt. 2',artist:'DAVI',album:'The Bay 6 EP'},
    {name:'Beat Organ - Original Mix',artist:'16BL',album:'Beat Organ EP'},
    {name:'7AM Drop',artist:'Andy Cato',album:'Times and Places (Sketches from the Ro...)'},
    {name:'Stick By This',artist:'Dusky',album:'Stick By This'},
    {name:'Have You Ever - Original Mix',artist:'Martin Roth',album:'Have You Ever'},
    {name:'Lost Highway',artist:'Dusky',album:'Anjunadeep 04'},
    {name:'Get To Know You',artist:'Vincenzo',album:'Anjunadeep 04'},
    {name:'Beautiful Life',artist:'Martin Roth',album:'Anjunadeep 04'},
    {name:'Bunker - Jay Hill\'s Dreamy Tech Remix',artist:'Allies for Everyone',album:'Bunker (Remixes)'},
    {name:'Obsession',artist:'Superpoze',album:'Siècle'},
    {name:'Stories In Light - Sunset Mix',artist:'Trilucid',album:'Stories in Light (Sunset Mix)'},
    {name:'Drift__',artist:'XENIA REAPER',album:'Nept Polarisation'},
  ],
  g4: [
    {name:'Forest - A Lovelee Sensational Dae Mix',artist:'Bitowa, YAMADAtheGIANT',album:'A Cult House Muzik EP'},
    {name:'Seeq',artist:'Andrés Zacco',album:'Ortsom'},
    {name:'Enlightment',artist:'D&S (NL)',album:'ÆX011'},
    {name:'The Wind Blew Past As We Shut Our Eyes (Part One)',artist:'Jesse Somfay',album:'Between Heartbeats'},
    {name:'Maize Maze',artist:'Future Simplicity',album:'Blending Frequencies EP'},
    {name:'Off the Grid',artist:'Modus',album:'Super-Kamio'},
    {name:'Neolithic Dreams',artist:'Jamie Bissmire',album:'Seasons & Cycles'},
    {name:'Three Missing Puzzle Pieces',artist:'Johannes Volk',album:'A New Biosphere'},
    {name:'Vessels',artist:'Lasse Tapio Junnila',album:'Childhood Amnesia'},
    {name:'Indianman',artist:'Ludwig Leitner',album:'Belladonna'},
    {name:'Rage - Orginal Mix',artist:'MYTRIPISMYTRIP',album:'Rage People'},
    {name:'Come Rain Or Shine - Original Mix',artist:'Minor Sine Project',album:'Come Rain Or Shine'},
    {name:'Seven Sisters Electric Plant - Original Mix',artist:'Repair',album:'Lines Drawn'},
    {name:'Thecla',artist:'Feel Fly',album:'Festina Lente'},
    {name:'Dextro',artist:'Nepotek',album:'Dextro'},
    {name:'Onera',artist:'Kat Davids, Mascha',album:'Onera'},
    {name:'Take Me Where I Want to Go',artist:'Rick Fox',album:'Take Me Where I Want to Go'},
    {name:'Loch Ness',artist:'Rnesto',album:'Paradox Ep'},
    {name:'Mars',artist:'M23, Slam Mode',album:'Mars'},
    {name:'Zebra',artist:'Noni',album:'Loud Thoughts'},
    {name:'Shook Ones',artist:'DJ Bone',album:'The Soapbox'},
    {name:'Grooves & Tools - Sub Series Tool 006',artist:'Subb-an',album:'Grooves & Tools'},
    {name:'Grooves & Tools - Sub Series Tool 008',artist:'Subb-an',album:'Grooves & Tools'},
    {name:'Grooves & Tools - Sub Series Tool 007',artist:'Subb-an',album:'Grooves & Tools'},
    {name:'Din',artist:'Amotik',album:'Raat EP'},
    {name:'Shaam',artist:'Amotik',album:'Raat EP'},
    {name:'mtsa',artist:'543ff',album:'Tar 39'},
    {name:'Blow',artist:'Juk Juk',album:'The World Inside A Sample'},
    {name:'Submersion',artist:'Altinbas',album:'On Board 10'},
    {name:'Darién Gap',artist:'LT',album:'RSDUB003'},
    {name:'Concrete and Sweat',artist:'Neon Fog',album:'Concrete and Sweat'},
    {name:'Echion',artist:'Dino Sabatini, Maurizio Cascella',album:'Chiron'},
    {name:'Euphemus',artist:'Dino Sabatini, Maurizio Cascella',album:'Chiron'},
    {name:'Chain - Original Mix',artist:'Joachim Spieth',album:'Deep Sessions'},
    {name:'Saichh Sequences',artist:'Aris Kindt',album:'Now Claims My Timid Heart'},
  ],
  g5: [
    {name:'Silver And Exact',artist:'Torc',album:'VA-02'},
    {name:'Psycho Magnotheric Pt.1',artist:'Cari Lekebusch, Spekki Webu',album:'Ethereo Spatial Rift'},
    {name:'Electrokinetic Absorption Pt.1',artist:'Cari Lekebusch, Spekki Webu',album:'Ethereo Spatial Rift'},
    {name:'Dfamation 003',artist:'Kamen',album:'The Nest EP'},
    {name:'Veleno Per La Mente II - Audio Resistance Remix (SYEP039)',artist:'Tommaso Arcuri, Audio Resistance',album:'Veleno Per La Mente (SYEP039)'},
    {name:'Remember To Forget - Original Mix',artist:'Offtrack',album:'OFK 002 (Extended LP)'},
    {name:'Negroni Times',artist:'Concret, Iñigo Vontier, The Diyeis',album:'Music For Dunkies'},
    {name:'Dontenmoyou - Koichi Sugimoto Remix',artist:'Nobuharu Morimoto, Koichi Sugimoto',album:'Dontenmoyou'},
    {name:'Melancholic Therapy - Ombrar Remix',artist:'Catartsis, Ombrar',album:'Melancholic Therapy'},
    {name:'Chrome Hearted',artist:'Rawdecks',album:'The Cost of Living'},
    {name:'Mocoa Rules',artist:'Krubim',album:'Séptimo Sol'},
    {name:'Nightcrawler - dxrvo Remix',artist:'BLZS',album:'Test Subject EP'},
    {name:'Exotic Ensemble - Original Mix',artist:'Ponti',album:'Gordos Groove\'s 002'},
    {name:'Unseen Horizons',artist:'VIVEZ',album:'Beyond the Surface'},
    {name:'On The Run',artist:'Kamen',album:'On The Run'},
    {name:'Horn of the Unicorn',artist:'Kosmos',album:'Ariel'},
    {name:'Has Begun',artist:'Danniel selfmade',album:'Has Begun'},
    {name:'Our Souls',artist:'Space (GR)',album:'Return'},
    {name:'We\'ve Got A Love',artist:'Italo Bounce',album:'Italo Bounce EP13'},
    {name:'Push Your Hands Up - Extended Mix',artist:'Lost Bandit',album:'Push Your Hands Up'},
    {name:'Corridor',artist:'Leibniz',album:'Corridor EP'},
    {name:'Mirror',artist:'John Wick',album:'Mirror'},
    {name:'Layer by Layer',artist:'Texlet',album:'Layer by Layer EP'},
    {name:'The Warrior',artist:'Tiger Musik',album:'The Warrior'},
    {name:'Sonus Aurorae',artist:'Audyca',album:'Sonus Aurorae EP'},
    {name:'Nachtglanz',artist:'Oliver Kalte',album:'Klangfall EP'},
    {name:'Tides',artist:'Folding Waves',album:'TEN'},
    {name:'Voicemail - Neila Edel Remix',artist:'Lizz V, Neila Edel',album:'Voicemail'},
    {name:'New Frontier',artist:'Convoke',album:'Nothing Stays The Same'},
    {name:'split roads',artist:'Tom Jarmey',album:'split roads'},
    {name:'Sinkhole - Radioactiveman Dub 1',artist:'Radioactive Man, Chloé Raunet, Ali Love',album:'Jam Out The Mix'},
    {name:'Canopée Imaginaire - Polygonia Rework',artist:'Azu Tiwaline, Polygonia',album:'Canopée Imaginaire (Polygonia Rework)'},
    {name:'Phantom',artist:'Joachim Spieth',album:'Petricor'},
    {name:'Drip Cycle',artist:'Droneghost',album:'Steam Ritual'},
    {name:'Pelias',artist:'Dino Sabatini, Maurizio Cascella',album:'Chiron'},
    {name:'Medea',artist:'Dino Sabatini, Maurizio Cascella',album:'Chiron'},
    {name:'Forward - Donato Dozzy Remix',artist:'Mike Parker, Donato Dozzy',album:'Forward'},
    {name:'Maize Maze',artist:'Future Simplicity',album:'Blending Frequencies EP'},
  ],
  g6: [
    {name:'Edge',artist:'LoopMan (SA)',album:'Edge'},
    {name:'Siente el Ritmo - Extended Mix',artist:'David Spano, Helen Khru, Davide Leonardo (ES)',album:'Siente el Ritmo'},
    {name:'After We Fade - Short Edit',artist:'Alande',album:'After We Fade'},
    {name:'Sui, My Love',artist:'TÂCHES',album:'Sui, My Love'},
    {name:'Don\'t You',artist:'Man Go Funk, Kali Mija',album:'Don\'t You'},
    {name:'Sad Saz House',artist:'Oh Voyage',album:'Sad Saz House'},
    {name:'Substance',artist:'Arven Deep',album:'Substance'},
    {name:'PARAGOU',artist:'Emilio Törnqvist',album:'PARAGOU'},
    {name:'Abiro (Deep House Revisit)',artist:'DeeJay Soul Key, Vick\'s De DeeJay, Beekay Monalayzzar, Dj TakeOver Rsa',album:'Abiro (Deep House Revisit)'},
    {name:'Cherry Vanilla - Sigma Pr Remix',artist:'Elias Fassos, RisK (GR), Joahn Dashi, Sigma Pr',album:'Cherry Vanilla'},
    {name:'El arbi cheb khaled (abdou switch edit) - abdou switch Remix',artist:'Dj switch abdou, abdou switch',album:'El arbi cheb khaled (abdou switch edit)'},
    {name:'Monsters R Us - Original Mix',artist:'KidIsLive',album:'Break Your Heart'},
    {name:'Que Quando - Extended Version',artist:'Zigan Aldi, MetinKmusic',album:'Abusadora'},
    {name:'Organic Horizon - Deep House Instrumental',artist:'Summer Fusion',album:'Ibiza Sax on the Beach'},
    {name:'Rumena',artist:'Toni Ter Wonder, Tibetania',album:'Rumena'},
    {name:'One Day It\'ll All Make Sense',artist:'Waroxe',album:'One Day It\'ll All Make Sense'},
    {name:'Da Na Nahie - Extended Mix',artist:'Mauro Masi',album:'Purple EP'},
    {name:'Satori',artist:'AIWAA, Stories of Dharma',album:'Satori'},
    {name:'Chemistry - Rameff Remix',artist:'Max Mignot, RAMEFF',album:'Kairos'},
    {name:'Khalouni Neich',artist:'Mo-Omar',album:'Best Ethnic Deep House 2026 (Best Orie...)'},
    {name:'cenizas',artist:'Nau Leone',album:'cenizas'},
    {name:'A Strange and Special Air',artist:'r/ú, Cafe De Anatolia',album:'Unity, Pt. 1'},
    {name:'So Many Times - Original Mix',artist:'Gokhan Aydogmus',album:'So Many Times'},
    {name:'Amore Profondo - Caiiro Remix',artist:'Sparrow & Barbossa, Nomvula SA, Sparrow (CH), Caiiro',album:'Amore Profondo'},
    {name:'Ubala (feat. Maline Aura & DR Thulz)',artist:'Citizen Deep, Maline Aura, DR Thulz',album:'Ubala (feat. Maline Aura & DR Thulz)'},
    {name:'Nara',artist:'BuVu, David de José',album:'Nara'},
    {name:'Vision',artist:'Ceas',album:'Vision'},
    {name:'Qalbi',artist:'Sarco, Gobi Desert Collective, Sheenubb, Sounds Of Sirin',album:'Qalbi'},
  ],
  g7: [
    {name:'A Way',artist:'Jean Caillou',album:'End of Time'},
    {name:'Beyond Measure - Extended Mix',artist:'Death on the Balcony',album:'Suprematic 2025'},
    {name:'Timeless - Mixed',artist:'Cedric Salander',album:'Déepalma Ibiza 2025 (Mixed)'},
    {name:'Feel the Distance',artist:'Shell Robinson',album:'Feel the Distance'},
    {name:'It\'s Okay',artist:'GÆEO',album:'Lunar Eclipse EP'},
    {name:'Cycles',artist:'Alley SA',album:'Cycles'},
    {name:'37',artist:'Alex Hoevelmann',album:'Haunted EP'},
    {name:'Sunrise Dream',artist:'fishplant',album:'Morning EP'},
    {name:'Fermee',artist:'CHOMBA',album:'The Leftovers'},
    {name:'Yes It\'s You',artist:'Evan Fraser, Vir McCoy, Rising Appalachia, Leah Song',album:'Guardians'},
    {name:'Organic Horizon - Deep House Instrumental',artist:'Summer Fusion',album:'Ibiza Sax on the Beach'},
    {name:'Legion of Secrets',artist:'Døøm',album:'Legion of Secrets'},
    {name:'Golden Cellophane - Extended Mix',artist:'VEHA, Rondo Mo',album:'Euphoric Beats 026'},
    {name:'The Abyss',artist:'Awaken',album:'Fragments of Frequencies'},
    {name:'Higher Than the Clouds',artist:'Slow Hearts',album:'Higher Than the Clouds'},
    {name:'Sad Island - Hazner Remix',artist:'Sonic Dust, Hazner',album:'Sad Island'},
    {name:'In The Past - Extended Mix',artist:'Netochno, Sounds Of Sirin',album:'Sounds Of Sirin: Selektion 2025'},
    {name:'Story',artist:'Pablo Bolivar, Alexandra Savvidi',album:'Other Stories'},
    {name:'Ikigai - Mixed',artist:'Modd, Songspire',album:'Songspire Records in Amsterdam 2025...'},
    {name:'Qalbi',artist:'Sarco, Gobi Desert Collective, Sheenubb, Sounds Of Sirin',album:'Qalbi'},
    {name:'Have It All - Extended Mix',artist:'Fabian Balino',album:'Have It All'},
    {name:'Palmtrace',artist:'VILT',album:'Palmtrace'},
    {name:'Be Honest',artist:'Toribio, musclecars',album:'Be Honest'},
    {name:'Stones Speak Silent - Original Mix',artist:'Nuage',album:'Florilegia II'},
    {name:'We Ignite',artist:'Stendahl',album:'We Ignite'},
    {name:'escape with me',artist:'nova fell',album:'escape with me'},
    {name:'ghost champagne',artist:'D.hyperhead',album:'Groove Expedition'},
  {name:'Life Echoes - Extended Mix',artist:'Maple Sun',album:'Life Echoes'},
  {name:'In Motion',artist:'Djena',album:'Motion Blur EP'},
  {name:'Saguaro Soul',artist:'Hugo Samba, Brahim Samba, Sounds Of Sirin',album:'Frenka'},
  {name:'Frenka',artist:'Hugo Samba, Brahim Samba, Sounds Of Sirin',album:'Frenka'},
  {name:'Your Oasis',artist:'Hugo Samba, Sounds Of Sirin',album:'Your Oasis'},
  {name:'Stay Low',artist:'røamr',album:'Stay Low'},
  {name:'Without You',artist:'A.M.R, Aether',album:'Without You'},
  {name:'Traces',artist:'Sebastian Mullaert, Hush Forever',album:'Traces'},
  {name:'Never Saw You Coming',artist:'Stelios Vassiloudis',album:'Texture EP'},
  {name:'Everybody Is Here',artist:'Stelios Vassiloudis',album:'Texture EP'},
  ],
};

const HEADLINER_MAP = {
  'kerri chandler':'g1','honey dijon':'g1','mochakk':'g1','dennis cruz':'g1',
  'seth troxler':'g1','the martinez brothers':'g1','jamie jones':'g1',
  'danny tenaglia':'g1','green velvet':'g1','fouk':'g1','franck roger':'g1',
  'vintage culture':'g1','peggy gou':'g1','dj tennis':'g1','gorge':'g1',
  'hernan cattaneo':'g2','nox vahn':'g2','guy j':'g2','sasha':'g2',
  'john digweed':'g2','sam shure':'g2','hraach':'g2','nick warren':'g2',
  'tale of us':'g3','artbat':'g3','anyma':'g3','adriatique':'g3',
  'hosh':'g3','maceo plex':'g3','bicep':'g3','eric prydz':'g3',
  'anna':'g4','charlotte de witte':'g4','amelie lens':'g4','richie hawtin':'g4',
  'carl cox':'g4','adam beyer':'g4','paco osuna':'g4','marco carola':'g4',
  'surgeon':'g4','blawan':'g4','joachim spieth':'g4',
  'reinier zonneveld':'g5','i hate models':'g5','spfdj':'g5',
  'black coffee':'g6','adam port':'g6','bedouin':'g6','damian lazarus':'g6',
  'ahmed spins':'g6','blond:ish':'g6','keinemusik':'g6','rampa':'g6',
  '&me':'g6','themba':'g6','enoo napa':'g6','shimza':'g6',
  'satori':'g7','lee burridge':'g7','mauro masi':'g7','worakls':'g7',
  "n'to":'g7','monolink':'g7','bonobo':'g7','nicola cruz':'g7',
};

const SLOT_BPM = {
  slot1: { min: 107, max: 122 },
  slot2: { min: 114, max: 127 },
};

// IDs diretos para artistas com nome ambíguo
const AMBIGUOUS_IDS = {
  'sasha':   '2SHyvQHTbMoFVT5s5LkS38',
  'anna':    '3gqTLkCGKp5mFk7FuJKSSq',
  'bonobo':  '0cmWgDlu9CwTgxPhf403hb',
  'bicep':   '73A3bLnfnz5BoQjb4gNCga',
  'monolink':'2m4WFg9cExkUcXg0YvAaHp',
  'bedouin': '5bKdC6382t97Qnpvs81Rqx',
};

async function proxyImage(url, res) {
  try {
    const r = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'https://open.spotify.com/',
      }
    });
    if (!r.ok) { res.status(404).end(); return; }
    const buf = await r.arrayBuffer();
    res.setHeader('Content-Type', r.headers.get('content-type') || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(Buffer.from(buf));
  } catch(e) { res.status(404).end(); }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.query.img) return proxyImage(decodeURIComponent(req.query.img), res);

  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('X-FI-Version', '8.1');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const q = req.query;
  console.log('[FI v8.0]', JSON.stringify(q));

  try {
    const token = await getToken();
    if (q.artist)    return res.status(200).json(await searchArtist(token, q.artist));
    if (q.id)        return res.status(200).json(await fetchArtistById(token, q.id));
    if (q.search)    return res.status(200).json(await searchFree(token, q.search));
    if (q.test)      return res.status(200).json(await runTest(token, q.test));
    if (q.headliner) return res.status(200).json(await generateSet(token, q.headliner, q.slot||'slot1'));
    return res.status(200).json({ version:'8.0', status:'online' });
  } catch (err) {
    console.error('[FI] ERRO:', err.message);
    return res.status(500).json({ error: err.message, tracks: [], total: 0 });
  }
}

async function getToken() {
  const { SPOTIFY_CLIENT_ID: cid, SPOTIFY_CLIENT_SECRET: csec } = process.env;
  if (!cid || !csec) throw new Error('Missing credentials');
  const b64 = Buffer.from(`${cid}:${csec}`).toString('base64');
  const r = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { Authorization:`Basic ${b64}`, 'Content-Type':'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials',
  });
  if (!r.ok) throw new Error(`Token failed: ${r.status}`);
  return (await r.json()).access_token;
}

async function generateSet(token, headliner, slot) {
  const hlKey = Object.keys(HEADLINER_MAP).find(k => k === headliner.toLowerCase());
  const group = hlKey ? HEADLINER_MAP[hlKey] : 'g1';
  const bpmRange = SLOT_BPM[slot] || SLOT_BPM.slot1;

  console.log(`[FI] headliner="${headliner}" group=${group}`);

  // Usa banco estático das playlists curadas do FMENEZS
  const pool = (FMENEZS_TRACKS[group] || FMENEZS_TRACKS.g1).filter(t =>
    !t.artist.toLowerCase().includes(headliner.toLowerCase())
  );

  // Embaralha e retorna 12 tracks variadas
  const shuffled = shuffle([...pool]);
  const tracks = shuffled.slice(0, 12).map(t => ({
    name: t.name,
    artist: t.artist,
    album: t.album,
    bpm: null,
    key: null,
    duration: null,
    releaseDate: null,
    previewUrl: null,
    spotifyUrl: null,
    image: null,
    source: 'fmenezs_playlist',
  }));

  console.log(`[FI] ${tracks.length} tracks do banco curado`);
  return { headliner, group, slot, bpmRange, tracks, total: pool.length, sources: { playlist: tracks.length } };
}


async function runTest(token, group) {
  const grp = FMENEZS_TRACKS[group] ? group : 'g6';
  const pool = FMENEZS_TRACKS[grp] || [];
  return {
    version: '8.1',
    group: grp,
    totalTracks: pool.length,
    sample: pool.slice(0, 3).map(t => ({ name: t.name, artist: t.artist })),
    status: 'OK',
    source: 'static_bank',
  };
}

async function searchArtist(token, name) {
  const directId = AMBIGUOUS_IDS[name.toLowerCase()];
  if (directId) {
    try {
      const r = await fetch(`https://api.spotify.com/v1/artists/${directId}`,
        { headers: { Authorization:`Bearer ${token}` } });
      if (r.ok) {
        const a = await r.json();
        return { ...formatArtist(a), group: detectGroup(name) };
      }
    } catch(e) {}
  }

  const ELEC = ['electronic','house','techno','organic','afro','deep','minimal','ambient','progressive'];
  const queries = [`${name} genre:electronic`, `${name} genre:house`, `${name} genre:techno`, name];

  for (const q of queries) {
    try {
      const r = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=artist&limit=5`,
        { headers: { Authorization:`Bearer ${token}` } }
      );
      if (!r.ok) continue;
      const d = await r.json();
      const artists = d.artists?.items || [];
      const elec = artists.find(a => (a.genres||[]).some(g => ELEC.some(eg => g.toLowerCase().includes(eg))));
      const pick = elec || (q === name ? artists[0] : null);
      if (pick) return { ...formatArtist(pick), group: detectGroup(name) };
    } catch(e) {}
  }
  return { name, photo: '', group: detectGroup(name) };
}

async function fetchArtistById(token, id) {
  const r = await fetch(`https://api.spotify.com/v1/artists/${id}`,
    { headers: { Authorization:`Bearer ${token}` } });
  if (!r.ok) throw new Error(`Artist fetch failed: ${r.status}`);
  const a = await r.json();
  return { ...formatArtist(a), group: detectGroup(a.name) };
}

async function searchFree(token, query) {
  const r = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=8`,
    { headers: { Authorization:`Bearer ${token}` } }
  );
  if (!r.ok) throw new Error(`Search failed: ${r.status}`);
  const d = await r.json();
  return { results: (d.artists?.items||[]).map(a => ({ ...formatArtist(a), group: detectGroup(a.name) })) };
}

function formatArtist(a) {
  return {
    id: a.id, name: a.name,
    photo: a.images?.[0]?.url || '',
    photoSmall: a.images?.[2]?.url || a.images?.[0]?.url || '',
    genres: a.genres || [],
    followers: a.followers?.total || 0,
    popularity: a.popularity || 0,
    spotifyUrl: a.external_urls?.spotify || '',
  };
}

function detectGroup(name) {
  if (!name) return 'g1';
  const n = name.toLowerCase();
  const key = Object.keys(HEADLINER_MAP).find(k => n.includes(k));
  return key ? HEADLINER_MAP[key] : 'g1';
}

function formatDuration(ms) {
  if (!ms) return '';
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
