const sqlite3 = require("sqlite3")

const db = new sqlite3.Database("./db/timetable.db")

const debug = true
var isTransaction = false

const teacherData = {
	ALH: {
		name: "Altindas",
		firstName: "Hanife",
		shortName: "ALH",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2022/09/ALH-2022.png",
		info: "UF Religion islamisch",
		title: "BEd",
		type: "teacher",
	},
	AND: {
		name: "Anderson",
		firstName: "Sophie",
		shortName: "",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2022/11/ANSO.png",
		info: "Sprachassistentin für Englisch",
		title: "",
		type: "teacher",
	},
	BAM: {
		name: "Bader-Stuefer",
		firstName: "Magdalena",
		shortName: "BAM",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2016/06/BAM.png",
		info: "Karenz",
		title: "Mag.ª, M.A.",
		type: "teacher",
	},
	BAC: {
		name: "Bahr",
		firstName: "Christine",
		shortName: "BAC",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/BAC.png",
		info: "UF Englisch, UF Geschichte, UÜ Schulzeitschrift, UÜ Begabtenförderung Englisch, Lehrer*innenvertreterin im Schulgemeinschaftsausschuss, QMS-Koordinatorin, Fachkoordination Englisch",
		title: "Mag.ª",
		type: "teacher",
	},
	BAI: {
		name: "Baldauf",
		firstName: "Irene",
		shortName: "BAI",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2020/06/BAI-2022.png",
		info: "Klassenvorständin 1C (2022/23), UF Mathematik, UF Physik, Brandschutzbeauftragte",
		title: "MEd",
		type: "teacher",
	},
	BAK: {
		name: "Banovits",
		firstName: "Karin",
		shortName: "BAK",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/BAK.png",
		info: "UF Mathematik, Organisation Känguru der Mathematik, Administratorin, Lehrer*innenvertreterin im Schulgemeinschaftsausschuss",
		title: "Mag.ª",
		type: "teacher",
	},
	CEM: {
		name: "Cernusca",
		firstName: "Maria",
		shortName: "CEM",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2017/08/CEM.png",
		info: "UF Deutsch, UF Englisch, UÜ Einführung ins Wissenschaftliche Arbeiten, Organisation Viennas English Theatre, Referentin Buchklub der Jugend",
		title: "Mag.ª, M.A.",
		type: "teacher",
	},
	DUS: {
		name: "Dupuy",
		firstName: "Stefanie",
		shortName: "DUS",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2017/08/DUS.png",
		info: "Karenz",
		title: "Mag.ª",
		type: "teacher",
	},
	EBS: {
		name: "Ebenhöh",
		firstName: "Sophie",
		shortName: "EBS",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2020/06/EBS.png",
		info: "Klassenvorständin 2D (2022/23), UF Englisch, UF Geographie, UÜ Einführung ins Wissenschaftliche Arbeiten",
		title: "MEd",
		type: "teacher",
	},
	EBL: {
		name: "Ebert",
		firstName: "Lukas",
		shortName: "EBL",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2021/11/EBL.png",
		info: "UF Latein, UF Geschichte, Fachkoordination Latein",
		title: "MEd",
		type: "teacher",
	},
	EIC: {
		name: "Eichinger",
		firstName: "Irmgard",
		shortName: "EIC",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/EIC.png",
		info: "Klassenvorständin 3Er (2022/23), UF Biologie, Hauptkoordination Umweltzeichen",
		title: "MMag.ª Dr.in",
		type: "teacher",
	},
	ED: {
		name: "Eisenhut",
		firstName: "Doris",
		shortName: "ED",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/ED-2021.png",
		info: "Klassenvorständin 5Bf (2022/23), UF Deutsch, UF Musik, UÜ Peermediation, Referentin Theater der Jugend",
		title: "Mag.ª",
		type: "teacher",
	},
	ECA: {
		name: "Eisenreich",
		firstName: "Caroline",
		shortName: "ECA",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2022/07/ECA.png",
		info: "UF Deutsch, UF Ethik, UF Psychologie und Philosophie",
		title: "MEd",
		type: "teacher",
	},
	FAW: {
		name: "Faber",
		firstName: "Wolfgang",
		shortName: "FAW",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/FAW-1.png",
		info: "Direktor, UF Chemie, UF Mathematik, UÜ Chemie-Olympiade",
		title: "Dir. Mag.",
		type: "teacher",
	},
	FAA: {
		name: "Fasching",
		firstName: "Andreas",
		shortName: "FAA",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/FAA.png",
		info: "UF Religion evangelisch, Fachkoordination Religion evangelisch",
		title: "Pfr. MMag.",
		type: "teacher",
	},
	FEC: {
		name: "Federer",
		firstName: "Clara",
		shortName: "FEC",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2022/04/FEC.png",
		info: "UF Bewegung und Sport Mädchen",
		title: "BEd",
		type: "teacher",
	},
	FEA: {
		name: "Fellner",
		firstName: "Anita",
		shortName: "FEA",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2019/06/FEA-1.png",
		info: "Klassenvorständin 7Dbd (2022/23), UF Englisch, UF Bewegung und Sport Mädchen",
		title: "Mag.ª",
		type: "teacher",
	},
	FI: {
		name: "Fichtenbauer",
		firstName: "Christoph",
		shortName: "FI",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/empty.png",
		info: "Klassenvorstand 4Er (2022/23), UF Mathematik, WPF Mathematik, Fachkoordination Mathematik",
		title: "Mag.",
		type: "teacher",
	},
	FOB: {
		name: "Förster",
		firstName: "Bettina",
		shortName: "FOB",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/FOB-2022.png",
		info: "Klassenvorständin 7Bf (2022/23), UF Deutsch, UF Geschichte, Leitung Nachmittagsbetreuung",
		title: "Mag.ª, B.A.",
		type: "teacher",
	},
	FBP: {
		name: "Frauenberger",
		firstName: "Petra",
		shortName: "FBP",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/FBP-1.png",
		info: "Klassenvorständin 4Am (2022/23), UF Musik, UF Chor, UÜ Spielmusik",
		title: "Mag.ª",
		type: "teacher",
	},
	FRE: {
		name: "Frédériks",
		firstName: "Birgit",
		shortName: "FRE",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2019/06/FRE.png",
		info: "UF Französisch, UF Religion katholisch",
		title: "Mag.ª",
		type: "teacher",
	},
	FRD: {
		name: "Frick",
		firstName: "Dagmar",
		shortName: "FRD",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/FRD.png",
		info: "Klassenvorständin 6Br (2022/23), UF Deutsch, UF Geschichte",
		title: "Mag.ª",
		type: "teacher",
	},
	GAI: {
		name: "Gallé",
		firstName: "Isabella",
		shortName: "GAI",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/GAI.png",
		info: "Klassenvorständin 2Am (2022/23), UF Deutsch, UF Philosophie und Psychologie",
		title: "MMag.ª",
		type: "teacher",
	},
	GIU: {
		name: "Girg",
		firstName: "Ursula",
		shortName: "GIU",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/GIU-1.png",
		info: "Klassenvorständin 5Cr (2022/23), UF Englisch, UF Psychologie und Philosophie, Fachkoordination Psychologie und Philosophie",
		title: "Mag.ª",
		type: "teacher",
	},
	GOC: {
		name: "Göller",
		firstName: "Clemens-G.",
		shortName: "GOC",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2017/09/GOC-2021.png",
		info: "UF Kunst und Gestaltung (Bildnerische Erziehung), UF Technik und Design (Technisches und textiles Werken), WPF Kunst und Gestaltung (Bildnerische Erziehung), UÜ Schulzeitschrift, Lehrer*innenvertreter im Schulgemeinschaftsausschuss, Kustodiat und Fachkoordination Kunst und Gestaltung, Webdesign und Webadministration, Corporate Design, Layout Schulzeitschrift",
		title: "MMag.",
		type: "teacher",
	},
	GOM: {
		name: "Göller",
		firstName: "Markus",
		shortName: "GOM",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/GOM-2022.png",
		info: "Klassenvorstand 1B (2022/23), UF Musik",
		title: "MMMag., PhD",
		type: "teacher",
	},
	GRP: {
		name: "Graßmück",
		firstName: "Philipp",
		shortName: "GRP",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2017/08/GRP.png",
		info: "UF Informatik, WPF Informatik, UF Geschichte, Kustodiat und Fachkoordination Informatik, Verwaltung der Lernplattformen, Organisation und Verwaltung Digitaler Endgeräte",
		title: "Mag.",
		type: "teacher",
	},
	GSK: {
		name: "Greimler-Stocker",
		firstName: "Karin",
		shortName: "GSK",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2019/07/GSK.png",
		info: "Klassenvorständin 4Fr (2022/23), UF Biologie, UF Psychologie und Philosophie, Young Science Gütesiegel",
		title: "MMag.ª",
		type: "teacher",
	},
	GRN: {
		name: "Grosinger",
		firstName: "Natalie",
		shortName: "GRN",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2022/07/GRN.png",
		info: "UF Deutsch, UF Ethik, UF Philosophie und Psychologie",
		title: "Mag.ª",
		type: "teacher",
	},
	GRC: {
		name: "Grubauer",
		firstName: "Christoph",
		shortName: "GRC",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/GRC.png",
		info: "UF Kunst und Gestaltung (Bildnerische Erziehung), UF Technik und Design (Technisches und textiles Werken), Organisation Schulbuchaktion",
		title: "Mag.",
		type: "teacher",
	},
	HAU: {
		name: "Hauer",
		firstName: "Viktoria",
		shortName: "HAU",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2019/06/HAU.png",
		info: "Klassenvorständin 5Dr (2022/23), UF Mathematik, UF Spanisch, WPF Spanisch, UÜ Umweltgremium",
		title: "Mag.ª",
		type: "teacher",
	},
	HB: {
		name: "Hawranek",
		firstName: "Beatrix",
		shortName: "HB",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/HB.png",
		info: "Klassenvorständin 5Am (2022/23), UF Musik, UF Chor, WPF Chor, UÜ Chor, Koordination Musisches Realgymnasium, Gewerkschaftlicher Betriebsausschuss",
		title: "Mag.ª",
		type: "teacher",
	},
	HM: {
		name: "Hawranek",
		firstName: "Martin",
		shortName: "HM",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/HM-1.png",
		info: "Klassenvorstand 7Am (2022/23), UF Chor, UF Geschichte, UF Musik, Kustodiat und Fachkoordination Musik, Gewerkschaftlicher Betriebsausschuss, stellvertretender Lehrer*innenvertreter im Schulgemeinschaftsausschuss",
		title: "Mag.",
		type: "teacher",
	},
	HEB: {
		name: "Heidegger",
		firstName: "Benjamin",
		shortName: "HEB",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/HEB.png",
		info: "UF Französisch, WPF Französisch, Fachkoordination Französisch, Frühförderung Französisch, Nachmittagsbetreuung",
		title: "Mag.",
		type: "teacher",
	},
	HIY: {
		name: "Hillebrand",
		firstName: "Yvonne",
		shortName: "HIY",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2017/08/HIY.png",
		info: "UF Geschichte, UF Latein, UÜ Schulzeitschrift",
		title: "Mag.ª",
		type: "teacher",
	},
	HO: {
		name: "Hoheneder",
		firstName: "Franz",
		shortName: "HO",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/HO.png",
		info: "Pension",
		title: "Legende",
		type: "teacher",
	},
	HP: {
		name: "Hübl",
		firstName: "Peter",
		shortName: "HP",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/HP.png",
		info: "Klassenvorstand 4Dr (2022/23), UF Musik, Schulband, Nachmittagsbetreuung, Kustodiat Audiovisuelle Medien, Personalvertreter",
		title: "",
		type: "teacher",
	},
	JE: {
		name: "Jedlička",
		firstName: "Ingrid",
		shortName: "JE",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/JE2.png",
		info: "UF Religion katholisch, UF Bewegung und Sport Mädchen, Jugend-Rotkreuz-Referentin",
		title: "Mag.ª",
		type: "teacher",
	},
	JUP: {
		name: "Jung",
		firstName: "Philip",
		shortName: "JUP",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2019/06/JUP.png",
		info: "UF Bewegung und Sport Knaben, Organisation Tag der offenen Tür",
		title: "Mag.",
		type: "teacher",
	},
	JUF: {
		name: "Juraszovich",
		firstName: "Flora",
		shortName: "JUF",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2021/09/JUF.png",
		info: "UF Kunst und Gestaltung (Bildnerische Erziehung), UF Technik und Design (Technisches und textiles Werken)",
		title: "B.A.",
		type: "teacher",
	},
	KAE: {
		name: "Kausl",
		firstName: "Elvira",
		shortName: "KAE",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2021/06/KAE.png",
		info: "Karenz",
		title: "Mag.ª, B.A.",
		type: "teacher",
	},
	KOC: {
		name: "Koch",
		firstName: "Andreas",
		shortName: "KOC",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2022/08/koc_2022.png",
		info: "UF Ethik, UF Psychologie und Philosophie, UF Religion katholisch",
		title: "Mag., M.A. M.A. MEd",
		type: "teacher",
	},
	KS: {
		name: "Krisai",
		firstName: "Susanne",
		shortName: "KS",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/KS.png",
		info: "UF Deutsch, UF Französisch",
		title: "Mag.ª",
		type: "teacher",
	},
	KW: {
		name: "Krisai",
		firstName: "Wolfgang",
		shortName: "KW",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/KW.png",
		info: "Klassenvorstand 8Afm (2022/23), UF Kunst und Gestaltung (Bildnerische Erziehung), UF Deutsch, Schulbibliothekar, Personalvertreter, Gewerkschaftlicher Betriebsausschuss",
		title: "Mag.",
		type: "teacher",
	},
	LAN: {
		name: "Langer",
		firstName: "Nicolette",
		shortName: "LAN",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2022/07/LAN.png",
		info: "UF Chemie, UF Mathematik",
		title: "Mag.ª",
		type: "teacher",
	},
	LAS: {
		name: "Lassnig",
		firstName: "Simone-M.",
		shortName: "LAS",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/LAS.png",
		info: "Karenz",
		title: "MMag.ª",
		type: "teacher",
	},
	LUB: {
		name: "Lux",
		firstName: "Benjamin",
		shortName: "LUB",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2021/06/LUB.png",
		info: "UF Mathematik, UF Physik, Kustodiat und Fachkoordination Physik, Ersthelfer",
		title: "MEd",
		type: "teacher",
	},
	MAD: {
		name: "Mader",
		firstName: "Denise",
		shortName: "MAD",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/MAD.png",
		info: "Klassenvorständin 4Bf (2022/23), UF Chemie, UF Mathematik",
		title: "Mag.ª",
		type: "teacher",
	},
	MAB: {
		name: "Mair",
		firstName: "Benjamin",
		shortName: "MAB",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2018/07/MAB.png",
		info: "UF Bewegung und Sport Knaben, UF Psychologie und Philosophie, WPF Theorie des Sports und der Bewegungskultur, Kustodiat und Fachkoordination Bewegung und Sport",
		title: "Mag.",
		type: "teacher",
	},
	MAR: {
		name: "Marosi",
		firstName: "Theresa",
		shortName: "MAR",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2019/06/MAR-1.png",
		info: "Karenz",
		title: "Mag.ª",
		type: "teacher",
	},
	MAT: {
		name: "Matsis",
		firstName: "Manuela",
		shortName: "MAT",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/MAT.png",
		info: "UF Religion katholisch, Kustodiat und Fachkoordination Religion katholisch",
		title: "Mag.ª",
		type: "teacher",
	},
	MES: {
		name: "Mew",
		firstName: "Steven",
		shortName: "MES",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2022/07/MES-2022.png",
		info: "Klassenvorstand 1F (2022/23), UF Englisch, UF Geographie",
		title: "B.A.",
		type: "teacher",
	},
	MID: {
		name: "Miksch",
		firstName: "Daniela",
		shortName: "MID",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/MID.png",
		info: "Klassenvorständin 3Am (2022/23), UF Biologie, UF Bewegung und Sport Mädchen, WPF Theorie des Sports und der Bewegungskultur, Schwimmassistenz",
		title: "Mag.ª",
		type: "teacher",
	},
	MIS: {
		name: "Milenkovski",
		firstName: "Sophia",
		shortName: "MIS",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2021/12/MIS.png",
		info: "UF Englisch, UF Bewegung und Sport Mädchen, UF Psychologie und Philosophie",
		title: "BEd",
		type: "teacher",
	},
	ME: {
		name: "Morgenbesser",
		firstName: "Elisabeth",
		shortName: "ME",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/ME.png",
		info: "UF Ethik, UF Geschichte, UF Religion katholisch",
		title: "Mag.ª",
		type: "teacher",
	},
	MUM: {
		name: "Muster",
		firstName: "Manfred",
		shortName: "MUM",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/MUM.png",
		info: "Klassenvorstand 2B (2022/23), UF Geographie, UF Geschichte, Bildungsberatung, Betreuung Schülerliga Fußball, Personalvertreter",
		title: "Mag.",
		type: "teacher",
	},
	NEA: {
		name: "Neuwirth",
		firstName: "Anna",
		shortName: "NEA",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2021/06/NEA.png",
		info: "UF Chemie, UF Geschichte",
		title: "BEd",
		type: "teacher",
	},
	NIH: {
		name: "Niedrist",
		firstName: "Hannah",
		shortName: "NIH",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2021/06/NIH-2022.png",
		info: "Klassenvorständin 1D (2022/23), UF Mathematik, UF Geographie",
		title: "MEd",
		type: "teacher",
	},
	NOR: {
		name: "Novinić",
		firstName: "Ramona",
		shortName: "NOR",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2020/06/NOR-2022.png",
		info: "Klassenvorständin 2F (2022/23), UF Mathematik, UF Bosnisch/Kroatisch/Serbisch, UÜ Volleyball",
		title: "MEd",
		type: "teacher",
	},
	ONJ: {
		name: "O’Neill",
		firstName: "Judith",
		shortName: "ONJ",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/ONJ.png",
		info: "UF Englisch, Schulbibliothekarin, QMS-Koordinatorin",
		title: "Mag.ª",
		type: "teacher",
	},
	OSN: {
		name: "Osterkorn",
		firstName: "Nina",
		shortName: "OSN",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/OSN.png",
		info: "UF Englisch, WPF Italienisch",
		title: "",
		type: "teacher",
	},
	PAT: {
		name: "Paier",
		firstName: "Tamara",
		shortName: "PAT",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2021/06/PAT.png",
		info: "UF Deutsch, UF Englisch",
		title: "Mag.ª, M.A.",
		type: "teacher",
	},
	PEF: {
		name: "Pehböck",
		firstName: "Felix",
		shortName: "PEF",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2017/02/PEF-1.png",
		info: "Klassenvorstand 4Cf (2022/23), UF Bewegung und Sport Knaben, UF Geographie, UÜ Peermediation, Schwimmassistenz",
		title: "Mag.",
		type: "teacher",
	},
	PEN: {
		name: "Pettau",
		firstName: "Nicole",
		shortName: "PEN",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2019/06/PEN.png",
		info: "Klassenvorständin 2C (2022/23), UF Biologie, UF Englisch",
		title: "Mag.ª",
		type: "teacher",
	},
	POE: {
		name: "Pohl",
		firstName: "Elisabeth",
		shortName: "POE",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/empty.png",
		info: "Klassenvorständin 7Cbd (2022/23), UF Englisch, WPF Englisch, UF Spanisch, WPF Spanisch, Fachkoordination Spanisch, Projektkoordinatorin Erasmus+",
		title: "Mag.ª",
		type: "teacher",
	},
	RAA: {
		name: "Radl",
		firstName: "Alexandra",
		shortName: "RAA",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2018/06/RAA.png",
		info: "Klassenvorständin 3Dr (2022/23), UF Biologie, UF Chemie, Kustodiat und Fachkoordination Biologie",
		title: "Mag.ª",
		type: "teacher",
	},
	RE: {
		name: "Rehberger",
		firstName: "Christine",
		shortName: "RE",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/RE.png",
		info: "UF Informatik, UF Physik",
		title: "Mag.ª",
		type: "teacher",
	},
	REV: {
		name: "Reich",
		firstName: "Veronika",
		shortName: "REV",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2017/07/REV.png",
		info: "UF Technik und Design (Technisches und textiles Werken), UF Kunst und Gestaltung (Bildnerische Erziehung), Nachmittagsbetreuung, Kustodiat und Fachkoordination Textiles Werken",
		title: "Mag.ª, MBA",
		type: "teacher",
	},
	SCHK: {
		name: "Schaffer",
		firstName: "Kerstin",
		shortName: "SCHK",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/SCHK.png",
		info: "Karenz",
		title: "MMag.ª",
		type: "teacher",
	},
	SCHI: {
		name: "Schilcher",
		firstName: "Claudia",
		shortName: "SCHI",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2020/06/SCHI.png",
		info: "UF Technik und Design (Technisches und textiles Werken)",
		title: "Mag.ª",
		type: "teacher",
	},
	SAL: {
		name: "Schubach",
		firstName: "Alexander",
		shortName: "SAL",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2022/07/SAL.png",
		info: "UF Religion evangelisch",
		title: "B.A. M.A.",
		type: "teacher",
	},
	SCA: {
		name: "Schütz",
		firstName: "Anna",
		shortName: "SCA",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2021/06/SCA.png",
		info: "Klassenvorständin 2E (2022/23), UF Deutsch, UF Französisch, UÜ Sprachwerkstatt",
		title: "MEd",
		type: "teacher",
	},
	SCB: {
		name: "Schwarz (B)",
		firstName: "Bettina",
		shortName: "SCB",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2017/08/SCB-2022.png",
		info: "Klassenvorständin 1Agm (2022/23), UF Deutsch, UF Ethik, UÜ Umweltgremium, UÜ Schulzeitschrift, Personalvertreterin",
		title: "Mag.ª, B.A.",
		type: "teacher",
	},
	SCC: {
		name: "Schwarz (C)",
		firstName: "Constanze",
		shortName: "SCC",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2020/06/SCC-2022.png",
		info: "Klassenvorständin 3Bf (2022/23), UF Englisch, UF Geschichte",
		title: "Mag.ª",
		type: "teacher",
	},
	SEK: {
		name: "Sereda",
		firstName: "Katharina",
		shortName: "SEK",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2020/06/SEK-2022.png",
		info: "Klassenvorständin 6Afm (2022/23), UF Deutsch, UF Englisch, UÜ Sprachwerkstatt",
		title: "MEd",
		type: "teacher",
	},
	SIM: {
		name: "Siebenhofer",
		firstName: "Margarita",
		shortName: "SIM",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2020/04/SIM-1.png",
		info: "UF Kunst und Gestaltung (Bildnerische Erziehung), UF Technik und Design (Technisches und textiles Werken), Nachmittagsbetreuung, Schulbuchaktion",
		title: "Mag.ª, BEd",
		type: "teacher",
	},
	SPA: {
		name: "Spreitzer",
		firstName: "Alexander",
		shortName: "SPA",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/empty.png",
		info: "Klassenvorstand 8Cbd (2022/23), UF Deutsch, UF Digitale Grundbildung, UÜ Sportklettern, Bildungsberatung",
		title: "Mag.",
		type: "teacher",
	},
	STI: {
		name: "Steinkellner",
		firstName: "Ingrid",
		shortName: "STI",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/STI.png",
		info: "UF Mathematik, UF Physik, Ersthelferin, Beauftragte für Schüler*innen mit besonderen Bedürfnissen (z. B. Hör- oder Sehbeeinträchtigungen)",
		title: "Mag.ª",
		type: "teacher",
	},
	STW: {
		name: "Steinkellner",
		firstName: "Walter",
		shortName: "STW",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/STW.png",
		info: "UF Mathematik, UF Physik, UF Digitale Grundbildung, Ersthelfer",
		title: "MMag. Dr.",
		type: "teacher",
	},
	STD: {
		name: "Steinlechner",
		firstName: "Diana",
		shortName: "STD",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2020/06/STD.png",
		info: "Klassenvorständin 1E (2022/23), UF Englisch, UF Geographie",
		title: "BEd",
		type: "teacher",
	},
	STO: {
		name: "Stock",
		firstName: "Daniel",
		shortName: "STO",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2022/07/STO.png",
		info: "UF Physik, Kustodiat Audiovisuelle Medien",
		title: "Dr.",
		type: "teacher",
	},
	STR: {
		name: "Streit",
		firstName: "Rita",
		shortName: "STR",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/STR.png",
		info: "UF Mathematik",
		title: "Mag.ª",
		type: "teacher",
	},
	SU: {
		name: "Suske",
		firstName: "Matthias",
		shortName: "SU",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/SU2.png",
		info: "UF Kunst und Gestaltung (Bildnerische Erziehung), UF Technik und Design (Technisches und textiles Werken), Kustodiat und Fachkoordination Technisches Werken, Kulturkontakt-Referent, Beauftragter für „Theatrale Bildung“ an Schulen",
		title: "Mag.",
		type: "teacher",
	},
	TRM: {
		name: "Trendl",
		firstName: "Matthias",
		shortName: "TRM",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2022/07/TRM-2022.png",
		info: "UF Bewegung und Sport Knaben, UF Geographie",
		title: "BEd",
		type: "teacher",
	},
	TRB: {
		name: "Trinkl",
		firstName: "Barbara",
		shortName: "TRB",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/TRB.png",
		info: "Klassenvorständin 3Fr (2022/23), UF Digitale Grundbildung, UF Informatik, UF Mathematik, UF Physik, stellvertretende Lehrer*innenvertreterin im Schulgemeinschaftsausschuss",
		title: "Mag.ª",
		type: "teacher",
	},
	UND: {
		name: "Unger-Pones",
		firstName: "Dagmar",
		shortName: "UND",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/UND.png",
		info: "Klassenvorständin 8Bbd (2022/23), UF Darstellende Geometrie, UF Geometrisches Zeichnen, UF Mathematik",
		title: "Mag.ª",
		type: "teacher",
	},
	WA: {
		name: "Walter",
		firstName: "Martin",
		shortName: "WA",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/WA.png",
		info: "UF Mathematik, UF Darstellende Geometrie, UF Geometrisch Zeichnen, Fachkoordination Darstellende Geometrie",
		title: "Mag.",
		type: "teacher",
	},
	WFM: {
		name: "Windhager-Fries",
		firstName: "Mobeen",
		shortName: "WFM",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2018/07/WFM-1.png",
		info: "Klassenvorstand 3Cfr (2022/23), UF Geschichte, UF Geographie, UF Digitale Grundbildung, WPF Geographie, WPF Unternehmerführerschein, UÜ Unternehmerführerschein, Kustodiat und Fachkoordination Geographie und Geschichte, Nachmittagsbetreuung, Organisation School Opening",
		title: "Mag.",
		type: "teacher",
	},
	WIB: {
		name: "Winter",
		firstName: "Birgit",
		shortName: "WIB",
		link: "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/WIB.png",
		info: "UF Digitale Grundbildung, UF Biologie, UF Mathematik, Organisation Mathematik-Wettbewerb Bolyai, Koordination Forschung–Jugend–Zukunft, Gewerkschaftlicher Betriebsausschuss",
		title: "Mag.ª",
		type: "teacher",
	},
}

const holidays = [
	{ longName: "schulautonom frei", startDate: "2022-10-24", endDate: "2022-10-25", bookingAllowed: false, name: "Ferien7" },
	{ longName: "Allerseelen", startDate: "2022-11-02", endDate: "2022-11-02", bookingAllowed: false, name: "Ferien1" },
	{ longName: "Landesfeiertag", startDate: "2022-11-15", endDate: "2022-11-15", bookingAllowed: false, name: "Ferien2" },
	{ longName: "Weihnachtsferien", startDate: "2022-12-24", endDate: "2023-01-06", bookingAllowed: false, name: "Ferien3" },
	{ longName: "Semesterferien", startDate: "2023-02-06", endDate: "2023-02-11", bookingAllowed: false, name: "Ferien4" },
	{ longName: "Osterferien", startDate: "2023-04-01", endDate: "2023-04-10", bookingAllowed: false, name: "Ferien5" },
	{ longName: "Pfingstsonntag", startDate: "2023-05-28", endDate: "2023-05-28", bookingAllowed: false, name: "Ferien6" },
	{ longName: "Nationalfeiertag", startDate: "2022-10-26", endDate: "2022-10-26", bookingAllowed: false, name: "Nationalfeiertag" },
	{ longName: "Herbstferien", startDate: "2022-10-27", endDate: "2022-10-31", bookingAllowed: false, name: "Herbstferien" },
	{ longName: "Allerheiligen", startDate: "2022-11-01", endDate: "2022-11-01", bookingAllowed: false, name: "Allerheiligen" },
	{ longName: "Maria Empfaengnis", startDate: "2022-12-08", endDate: "2022-12-08", bookingAllowed: false, name: "Maria Empfaengnis" },
	{ longName: "Staatsfeiertag", startDate: "2023-05-01", endDate: "2023-05-01", bookingAllowed: false, name: "Staatsfeiertag" },
	{ longName: "Christi Himmelfahrt", startDate: "2023-05-18", endDate: "2023-05-18", bookingAllowed: false, name: "Christi Himmelfahrt" },
	{ longName: "19.5.2023", startDate: "2023-05-19", endDate: "2023-05-19", bookingAllowed: false, name: "19.5." },
	{ longName: "Pfingstsamstag", startDate: "2023-05-27", endDate: "2023-05-27", bookingAllowed: false, name: "Pfingstsamstag" },
	{ longName: "Pfingstmontag", startDate: "2023-05-29", endDate: "2023-05-29", bookingAllowed: false, name: "Pfingstmontag" },
	{ longName: "Fronleichnam", startDate: "2023-06-08", endDate: "2023-06-08", bookingAllowed: false, name: "Fronleichnam" },
	{ longName: "9.6.2023", startDate: "2023-06-09", endDate: "2023-06-09", bookingAllowed: false, name: "9.6." },
]

db.serialize(() => {
	db.run("PRAGMA autocommit = 0")

	db.run(`
	CREATE TABLE IF NOT EXISTS Holidays (
		id INTEGER PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		startDate date NOT NULL,
		endDate date NOT NULL
	)
	`)

	db.run(`
    CREATE TABLE IF NOT EXISTS Groups (
      id INTEGER PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )
  `)

	db.run(`
    CREATE TABLE IF NOT EXISTS Teachers (
      id INTEGER PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      link VARCHAR(255) NOT NULL,
      info VARCHAR(255) NOT NULL
    )
  `)

	db.run(`
    CREATE TABLE IF NOT EXISTS Rooms (
      id INTEGER PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )
  `)

	db.run(`
    CREATE TABLE IF NOT EXISTS Subjects (
      id INTEGER PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )
  `)

	db.run(`
    CREATE TABLE IF NOT EXISTS Classes (
      id INTEGER PRIMARY KEY,
      subject_id INTEGER NOT NULL,
      lesson_id INTEGER NOT NULL,
      teacher_id INTEGER NOT NULL,
      room_id INTEGER NOT NULL,
      start_time TIME NOT NULL,
      end_time TIME NOT NULL,
      date DATE NOT NULL,
	  group_names VARCHAR(255) NOT NULL,
	  state VARCHAR(255),
	  info VARCHAR(255),
      FOREIGN KEY (subject_id) REFERENCES Subjects(id),
      FOREIGN KEY (teacher_id) REFERENCES Teachers(id),
      FOREIGN KEY (room_id) REFERENCES Rooms(id)
    )
  `)

	db.run(`
    CREATE TABLE IF NOT EXISTS Classes_Groups (
      class_id INTEGER NOT NULL,
      group_id INTEGER NOT NULL,
      FOREIGN KEY (class_id) REFERENCES Classes(id),
      FOREIGN KEY (group_id) REFERENCES Groups(id),
      PRIMARY KEY (class_id, group_id)
    )
  `)
})

async function beginCommit() {
	if (!isTransaction) {
		isTransaction = true
		db.run("BEGIN")
	}
}

async function submitCommit() {
	if (isTransaction) {
		isTransaction = false
		db.run("COMMIT")
	}
}

async function removeStartEndDate(startDate, endDate) {
	db.run(`DELETE FROM Classes WHERE date BETWEEN ? AND ?`, [startDate, endDate], (err) => {
		if (err) {
			if (debug) {
				console.log(err.message)
			}
			return
		}
	})
}

async function addHoliday(name, startDate, endDate) {
	db.run(`INSERT OR REPLACE INTO Holidays (name, startDate, endDate) VALUES (?, ?, ?)`, [name, startDate, endDate], (err) => {
		if (err) {
			if (debug) {
				console.log(err.message)
			}
			return
		}
	})
}

function addRoom(id, name) {
	db.run(`INSERT OR REPLACE INTO Rooms (id, name) VALUES (?, ?)`, [id, name], (err) => {
		if (err) {
			if (debug) {
				console.log(err.message)
			}
			return
		}
	})
}

function addTeacher(id, name) {
	const teacher = teacherData[name]
	let [firstName, lastName, link, info] = ["", "", "https://bgperchtoldsdorf.at/wp-content/uploads/2015/11/empty.png", ""]
	if (teacher != undefined) {
		firstName = teacher.firstName
		lastName = teacher.name
		link = teacher.link
		info = teacher.info
	}
	db.run(`INSERT OR REPLACE INTO Teachers (id, name, firstName, lastName, link, info) VALUES (?, ?, ?, ?, ?, ?)`, [id, name, firstName, lastName, link, info], (err) => {
		if (err) {
			if (debug) {
				console.log(err.message)
			}
			return
		}
	})
}

function addSubject(id, name) {
	db.run(`INSERT OR REPLACE INTO Subjects (id, name) VALUES (?, ?)`, [id, name], (err) => {
		if (err) {
			if (debug) {
				console.log(err.message)
			}
			return
		}
	})
}

function addGroup(id, name) {
	db.run(`INSERT OR REPLACE INTO Groups (id, name) VALUES (?, ?)`, [id, name], (err) => {
		if (err) {
			if (debug) {
				console.log(err.message)
			}
			return
		}
	})
}

function addClass(id, subject, lesson_id, teacher, room, startTime, endTime, groups, group_names, date, state, info) {
	db.run(
		`INSERT OR REPLACE INTO Classes (id, subject_id, lesson_id, teacher_id, room_id, start_time, end_time, group_names, date, state, info)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		[id, subject, lesson_id, teacher, room, startTime, endTime, group_names, date, state, info],
		function (err) {
			if (err) {
				if (debug) {
					console.log(err.message)
				}
				return
			} else {
				const classId = this.lastID

				groups.forEach((group) => {
					db.run(
						`INSERT OR REPLACE INTO Classes_Groups (class_id, group_id)
             VALUES (?, ?)`,
						[classId, group],
						(err) => {
							if (err) {
								if (debug) {
									console.log(err.message)
								}
								return
							}
						}
					)
				})
			}
		}
	)
}

function getClassesByGroupAndDateRange(groupId, startDate, endDate) {
	return new Promise((resolve, reject) => {
		const sql = `
			SELECT DISTINCT c.id, s.name AS subject, c.lesson_id as subjectID, t.name AS teacher, r.name AS room, c.start_time as startTime, c.end_time as endTime, c.date, g.name AS groupName, c.group_names as groupIDS, c.info, c.state
			FROM Classes c
			JOIN Subjects s ON c.subject_id = s.id
			JOIN Teachers t ON c.teacher_id = t.id
			JOIN Rooms r ON c.room_id = r.id
			JOIN Classes_Groups cg ON c.id = cg.class_id
			JOIN Groups g ON cg.group_id = g.id
			WHERE cg.group_id = ?
				AND c.date BETWEEN ? AND ?
				GROUP by c.id
			ORDER BY (case c.state 
			when "EXAM" then 1
			when "SUBSTITUTION" then 2
			when "ROOMSUBSTITUTION" then 2
			when "ADDITIONAL" then 2
			when "SHIFT" then 2
			when "STANDARD" then 3
			when "FREE" then 4
			when "CANCEL" then 4
			else 8 end)
			`

		db.all(sql, [groupId, startDate, endDate], (err, rows) => {
			if (err) {
				reject(err)
			} else {
				resolve(rows)
			}
		})
	})
}

function getClassesByTeacherAndDateRange(teacherId, startDate, endDate) {
	return new Promise((resolve, reject) => {
		const sql = `
      		SELECT DISTINCT c.id, s.name AS subject, c.lesson_id as subjectID, t.name AS teacher, r.name AS room, c.start_time as startTime, c.end_time as endTime, c.date, g.name AS groupName, c.group_names as groupIDS, c.info, c.state
			FROM Classes c
			JOIN Subjects s ON c.subject_id = s.id
			JOIN Teachers t ON c.teacher_id = t.id
			JOIN Rooms r ON c.room_id = r.id
			JOIN Classes_Groups cg ON c.id = cg.class_id
			JOIN Groups g ON cg.group_id = g.id
			WHERE t.id = ?
				AND c.date BETWEEN ? AND ?
				GROUP by c.id
			ORDER BY (case c.state 
			when "EXAM" then 1
			when "SUBSTITUTION" then 2
			when "ROOMSUBSTITUTION" then 2
			when "ADDITIONAL" then 2
			when "SHIFT" then 2
			when "STANDARD" then 3
			when "FREE" then 4
			when "CANCEL" then 4
			else 8 end)
			`

		db.all(sql, [teacherId, startDate, endDate], (err, rows) => {
			if (err) {
				reject(err)
			} else {
				resolve(rows)
			}
		})
	})
}

function getClassesByRoomAndDateRange(roomId, startDate, endDate) {
	return new Promise((resolve, reject) => {
		const sql = `
      		SELECT c.id, s.name AS subject, c.lesson_id as subjectID, t.name AS teacher, r.name AS room, c.start_time as startTime, c.end_time as endTime, c.date, g.name AS groupName, c.group_names as groupIDS, c.info, c.state
			FROM Classes c
			JOIN Subjects s ON c.subject_id = s.id
			JOIN Teachers t ON c.teacher_id = t.id
			JOIN Rooms r ON c.room_id = r.id
			JOIN Classes_Groups cg ON c.id = cg.class_id
			JOIN Groups g ON cg.group_id = g.id
			WHERE r.id = ?
				AND c.date BETWEEN ? AND ?
				GROUP by c.id
			ORDER BY (case c.state 
			when "EXAM" then 1
			when "SUBSTITUTION" then 2
			when "ROOMSUBSTITUTION" then 2
			when "ADDITIONAL" then 2
			when "SHIFT" then 2
			when "STANDARD" then 3
			when "FREE" then 4
			when "CANCEL" then 4
			else 8 end)`

		db.all(sql, [roomId, startDate, endDate], (err, rows) => {
			if (err) {
				reject(err)
			} else {
				resolve(rows)
			}
		})
	})
}

async function getHolidaysByDate(startDate, endDate) {
	return new Promise((resolve, reject) => {
		const sql = `
			SELECT h.name, h.startDate, h.endDate FROM Holidays h WHERE h.startDate BETWEEN ? AND ? OR h.endDate BETWEEN ? AND ? OR ? BETWEEN h.startDate AND h.endDate OR ? BETWEEN h.startDate AND h.endDate
		`

		db.all(sql, [startDate, endDate, startDate, endDate, startDate, endDate], (err, rows) => {
			if (err) {
				reject(err)
			} else {
				resolve(rows)
			}
		})
	})
}

function getGroups() {
	return new Promise((resolve, reject) => {
		db.all("SELECT * from Groups", (err, rows) => {
			if (err) {
				if (debug) {
					console.log(err.message)
				}
				reject(err.message)
			} else {
				resolve(rows)
			}
		})
	})
}

async function getRoomsTeachersGroups() {
	try {
		const rooms = await new Promise((resolve, reject) => {
			db.all("SELECT * FROM Rooms WHERE name != '---'", (err, rows) => {
				if (err) reject(err)
				else resolve(rows)
			})
		})
		const teachers = await new Promise((resolve, reject) => {
			db.all("SELECT * FROM Teachers WHERE name != '---'", (err, rows) => {
				if (err) reject(err)
				else resolve(rows)
			})
		})
		const groups = await new Promise((resolve, reject) => {
			db.all("SELECT * FROM Groups WHERE name != '---'", (err, rows) => {
				if (err) reject(err)
				else resolve(rows)
			})
		})
		return {
			rooms,
			teachers,
			groups,
		}
	} catch (err) {
		if (debug) {
			console.error(err)
		}
	}
}

async function addHolidaysToDB() {
	await beginCommit()
	holidays.map((holiday) => {
		addHoliday(holiday.longName, holiday.startDate, holiday.endDate)
	})
	await submitCommit()
}

module.exports = { beginCommit, submitCommit, removeStartEndDate, getRoomsTeachersGroups, addClass, addTeacher, addGroup, addRoom, addSubject, getClassesByGroupAndDateRange, getClassesByTeacherAndDateRange, getClassesByRoomAndDateRange, getGroups, getHolidaysByDate }
