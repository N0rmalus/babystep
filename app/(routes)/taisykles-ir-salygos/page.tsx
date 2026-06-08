import type { ReactNode } from 'react';

import { LegalContentNav, type LegalContentNavItem } from '@/components/legal/legal-content-nav';
import { PageHeader } from '@/components/page-header';
import Container from '@/components/ui/container';
import { PaperWrapper } from '@/components/ui/paper-wrapper';
import { CONTACT_EMAIL } from '@/lib/consts';

type TermsSubchapter = {
  id: string;
  number: string;
  title: string;
  paragraphs: ReactNode[];
};

type TermsChapter = {
  id: string;
  number: string;
  title: string;
  subchapters: TermsSubchapter[];
};

const termsChapters = [
  {
    id: 'savokos',
    number: '01',
    title: 'Sąvokos',
    subchapters: [
      {
        id: 'nuotoline-sutartis',
        number: '1.1',
        title: 'Nuotolinė sutartis',
        paragraphs: [
          'Nuotolinės prekės ar paslaugos pirkimo/pardavimo sutarties, kuriomis nustatomos Pirkėjo ir Pardavėjo pareigos bei teisės, įsigyjant prekes ir paslaugas bei apmokėjimo sąlygos už jas prekių pristatymo (jei prekė siunčiama) ir grąžinimo tvarka, šalių atsakomybės ir su kitomis prekių ir paslaugų pirkimu/pardavimų atliekamų https://babystep.lt internetiniame puslapyje susijusiomis nuostatomis.',
        ],
      },
      {
        id: 'pardavejas',
        number: '1.2',
        title: 'Pardavėjas',
        paragraphs: [
          'Pardavėjas – MB Babystepsgroup, įmonės kodas: 306357268, įmonės adresas Pušyno g. 3, Dėdeliškių k, LT-21401 Trakų r., Lietuvos Respublika. El. paštas: info@babystep.lt. Duomenys apie Pardavėją saugomi Juridinių asmenų registre, kurio tvarkytojas yra VĮ Registrų centras.',
        ],
      },
      {
        id: 'pirkejas',
        number: '1.3',
        title: 'Pirkėjas',
        paragraphs: [
          'Pirkėjas – 1) asmuo sulaukęs pilnametystės pagal LR įstatymus, kurio veiksnumas nėra apribojamas teismo tvarka; 2) juridinis asmuo; 3) visų aukščiau nurodytų asmenų tinkamai įgalioti atstovai.',
        ],
      },
      {
        id: 'asmens-duomenys',
        number: '1.4',
        title: 'Asmens duomenys',
        paragraphs: ['Asmens duomenys – Pirkėjo vardas, pavardė, telefono numeris, elektroninio pašto adresas.'],
      },
    ],
  },
  {
    id: 'bendrosios-nuostatos',
    number: '02',
    title: 'Bendrosios nuostatos',
    subchapters: [
      {
        id: 'taisykles-privalomos',
        number: '2.1',
        title: 'Taisyklių privalomumas',
        paragraphs: [
          'Sąlygos ir taisyklės yra privalomas teisinis dokumentas abiem šalims, jame nustatomos Pirkėjo ir Pardavėjo teisės ir pareigos, pristatymo ir grąžinimo tvarka, prekių įsigijimo ir apmokėjimo sąlygos, šalių atsakomybė bei kitos galimos sąlygos susijusios su prekių ir paslaugų pirkumu/pardavimu intertiniame puslapyje – babystep.lt',
        ],
      },
      {
        id: 'taisykliu-keitimas',
        number: '2.2',
        title: 'Taisyklių keitimas',
        paragraphs: [
          'Pardavėjas pasilieką teisę bet kuriuo metu pakeisti, papildyti ar taisyti taisykles. Apie taisyklių pakeitimus, taisymus ar papildymus. Pirkėjai informuojami svetainėje https://babystep.lt/taisykles-ir-salygos/su kuriomis Pirkėjai turi susipažinti prieš pirkdami prekę/paslaugą. Naujos taisyklės ir taisyklių pataisymai bei papildymai įsigalioja jas paskelbus https://babystep.lt/taisykles-ir-salygos/puslapyje su prierašu “Taisyklių pakeitimas” ir taisyklių pakeitimo data.',
        ],
      },
      {
        id: 'teise-pirkti',
        number: '2.3',
        title: 'Teisė pirkti',
        paragraphs: [
          'Pirkti prekes ir paslaugas iš babystep.lt internetinio puslapio turi teisę tik tie Pirkėjai kurie atitinkta 1.3 taisyklių punktą. Registruodamasis ir pirkdamas prekes ir paslaugas Pirkėjas patvirtina, kad atitinka 1.3 punkto reikalavimus. Pardavėjas pasilieka teisę kilus neaiškumams paprašyti Pirkėjo dar kartą patvirtinti asmeninius duomenis.',
        ],
      },
      {
        id: 'prekes-nepardavimas',
        number: '2.4',
        title: 'Pardavėjo teisė neparduoti',
        paragraphs: [
          'Pardavėjas turi teisę neparduoti prekės ir/arba sustabdyti paslaugos teikimą Pirkėjui nepatvirtinus 1.3 punkte nurodytų reikalavimų.',
        ],
      },
    ],
  },
  {
    id: 'asmens-duomenu-apsauga',
    number: '03',
    title: 'Asmens duomenų apsauga',
    subchapters: [
      {
        id: 'duomenu-tvarkymo-sutikimas',
        number: '3.1',
        title: 'Duomenų tvarkymo sutikimas',
        paragraphs: [
          'Pirkdamas prekes ir paslaugas iš babystep.lt Pirkėjas sutinka, kad jo vardą ir pavardę, elektroninį adresą, telefono numerį babystep.lt tvarkytu tiesioginės rinkodaros ir veiklos analizės tikslais.',
        ],
      },
      {
        id: 'nesutikimas-del-rinkodaros',
        number: '3.2',
        title: 'Nesutikimas dėl tiesioginės rinkodaros',
        paragraphs: [
          'Jei Pirkėjas nepageidauja, kad pagal 3.1. punktą jo duomenys būtu tvarkomi, Pirkėjas privalo nepažymėti varnelės “Sutinku su babystep.lt pirkimo-pardavimo taisyklėmis”. Jei Pirkėjęs nebenori, kad jo duomenys būtu naudojami tiesioginės rinkodaros tikslais Pirkėjas privalo informuoti Pardavėją elektroniniu paštu.',
        ],
      },
      {
        id: 'duomenu-atskleidimas',
        number: '3.3',
        title: 'Duomenų atskleidimas',
        paragraphs: [
          'Pardavėjas patvirtina, jog Pirkėjo nurodyti Asmens duomenys bus tvarkomi tik prekių ir paslaugų pardavimo interneto mokykloje babystep.lt , taip pat Pardavėjo veiklos analizės ir tiesioginės rinkodaros tikslais (išskyrus atvejus, kai Pirkėjas Taisyklių 3.2 punkte nurodyta tvarka praneša, kad nepageidauja, jog jo Asmens duomenys būtų tvarkomi tiesioginės rinkodaros tikslu). Pardavėjas įsipareigoja neatskleisti Pirkėjo Asmens duomenų tretiems asmenims, išskyrus šiuos atvejus:',
          'Pardavėjas patvirtina, jog Pirkėjo suteikti Asmens duomenys bus tvarkimo tik prekių ir paslaugų pardavimo babystep.lt tikslais, bei tiesioginės rinkodaros ir analizės tikslais. Pardavėjas įsipareigoja neatskleisti Pirkėjo asmens duomenų tretiems asmenims išskyrus šiuos atvėjus:',
          '3.3.1. vykdant užsakymą ar teikiant kitas paslaugas – Pardavėjo partneriams, teikiantiems prekių pristatymo ar kitas Pirkėjo užsisakytas paslaugas;',
          '3.3.2. teisėsaugos institucijoms pagal Lietuvos Respublikos teisės aktų numatytą tvarką;',
          '3.3.3. jeigu būtina užkirsti kelią nusikalstamoms veikoms arba būtina jas tirti.',
        ],
      },
      {
        id: 'pirkejo-duomenu-teises',
        number: '3.4',
        title: 'Pirkėjo teisės',
        paragraphs: [
          'Pirkėjas turi šias teises:',
          '3.4.1. Būti informuotas paie savo Asmens duomenų tvarkymą.',
          '3.4.2. Susipažinti su savo pateiktais Asmens duomenimis ir žinoti kaip jie yra tvarkomi.',
          '3.4.3. Gauti informaciją kam ir kokiu tikslu yra tvarkomi jo Asmens duomenys, kam jie buvo suteikti.',
          '3.4.4. Reikalauti ištaisyti arba sunaikinti savo Asmens duomenis ir sustabdyti Asmens duomenų tvarkymo veiksmus.',
          '3.4.5. Nesutikti, kad jo Asmens duomenys būtų tvarkomi.',
        ],
      },
      {
        id: 'duomenu-saugojimas',
        number: '3.5',
        title: 'Duomenų saugojimas',
        paragraphs: [
          'Pirkėjas pirkdamas prekes ir paslaugas babystep.lt puslapyje sutinka, kad Pardavėjas turi teisę laikyti jo duomenis serveryje neterminuotai, esant visiems teisėtiems tikslams saugoti Asmens duomenis.',
        ],
      },
      {
        id: 'tapatybes-dokumentas',
        number: '3.6',
        title: 'Tapatybės dokumentas',
        paragraphs: [
          'Pardavėjui, Lietuvos pašto darbuotojui ar kurjerių tarnybos darbuotojui pateiktas susipažinti Pirkėjo tapatybės patvirtinimo dokumentas ir jame esantys duomenys yra naudojami tik nustatant asmens tapatybę ir identifikavimui.',
        ],
      },
      {
        id: 'duomenu-prasymai',
        number: '3.8',
        title: 'Prašymai dėl duomenų',
        paragraphs: [
          'Prašymą ar nurodymą susijusį su Asmens duomenų tvarkymu. Pirkėjas privalo pateiktu raštu išsiūsdamas elektroninį laišką adresu: NN. Pardavėjas gavęs tokį prašymą ar nurodymą iš Pirkėjo privalo ne vėliau kaip per 10 (dešimt) kalendorinių dienų pateikti Pirkėjui raštišką atsakymą el.paštu bei atlikti prašyme ar nurodyme nurodytus veiksmus ar atsakyti, kodėl juos atsisako atlikti.',
        ],
      },
    ],
  },
  {
    id: 'prekiu-uzsakymas',
    number: '04',
    title: 'Prekių užsakymas, pirkimo – pardavimo teisinių santykių sukūrimo momentas',
    subchapters: [
      {
        id: 'uzsakymo-duomenys',
        number: '4.1',
        title: 'Užsakymo duomenys',
        paragraphs: [
          'Pirkėjas užsakydamas prekes ar paslaugas iš babystep.lt internetinio puslapio privalo Pardavėjo pateiktuose informacijos laukuose nurodyti tinkamą prekių užsakymo įvykdymui būtinus ir teisingus savo asmens duomenis: vardą, pavardę, prekių pristatymo adresą, telefono numerį ir elektroninio pašto adresą. Pirkėjas sutinka,kad jam elektroniu paštu ar SMS žinute būtu siunčiama informacija ir pranešimai būtini prekių užsakymų vykdymui. Pirkėjas sutinka, kad Pirkėjo Asmens duomenų dalis būtu perduodami Pardavėjo partneriams (duomenų tvarkytojams) siekiant tinkamai vykdyti užsakymą ir tinkamai suteikti paslaugą.',
        ],
      },
      {
        id: 'sutarties-sudarymas',
        number: '4.2',
        title: 'Sutarties sudarymas',
        paragraphs: [
          'Pirkėjui išsirinkus prekę ar paslaugą ir suformavus prekių krepšelį bei jį patvirtinus įvykdant visus užsakymo žingsnius laikoma, kad tarp Pirkėjo ir Pardavėjo buvo sudaryta pirkimo-pardavimo sutartis ir teisiniai pirkimo-pardavimo santykiai.',
        ],
      },
      {
        id: 'uzsakymo-patvirtinimas',
        number: '4.3',
        title: 'Užsakymo patvirtinimas',
        paragraphs: [
          'Pirkėjas yra informuojamas elektroniniu paštu ar SMS žinute kai visi užsakymo žingsniai yra atlikti teisingai.',
        ],
      },
      {
        id: 'uzsakymu-saugojimas',
        number: '4.5',
        title: 'Užsakymų saugojimas',
        paragraphs: ['Pirkėjo užsakymai yra saugomi twobrostory.com duomenų bazėje.'],
      },
    ],
  },
  {
    id: 'pirkejo-teises',
    number: '05',
    title: 'Pirkėjo teisės',
    subchapters: [
      {
        id: 'teise-pirkti-prekes',
        number: '5.1',
        title: 'Teisė pirkti',
        paragraphs: [
          'Pirkėjas turi teisę pirkti prekes ir paslaugas babystep.lt internetiniame puslapyje Taisyklių nustatyta tvarka.',
        ],
      },
      {
        id: 'teise-atsisakyti',
        number: '5.2',
        title: 'Teisė atsisakyti',
        paragraphs: ['Pirkėjas turi teisę atsisakyti užsakytų prekių ir paslaugų Taisyklių numatyta tvarka.'],
      },
      {
        id: 'teise-grazinti',
        number: '5.3',
        title: 'Teisė grąžinti',
        paragraphs: ['Pirkėjas turi teisę grąžinti prekes ir paslaugas Taisyklių nustatyta tvarka.'],
      },
      {
        id: 'kitos-teises',
        number: '5.4',
        title: 'Kitos teisės',
        paragraphs: ['Pirkėjas turi kitų teisių, įtvirtintų šiose Taisyklėse.'],
      },
    ],
  },
  {
    id: 'pirkejo-isipareigojimai',
    number: '06',
    title: 'Pirkėjo įsipareigojimai',
    subchapters: [
      {
        id: 'taisykliu-laikymasis',
        number: '6.1',
        title: 'Taisyklių laikymasis',
        paragraphs: [
          'Pirkėjas, pirkdamas prekes ir naudodamasis babystep.lt paslaugomis , įsipareigoja laikytis šių Taisyklių, kitų sąlygų, aiškiai nurodytų svetainėje – babystep.lt/taisykles-ir-salygos/ ir babystep.lt/grazinimo-informacija/, bei nepažeisti Lietuvos Respublikos teisės aktų.',
        ],
      },
      {
        id: 'teisingi-duomenys',
        number: '6.2',
        title: 'Teisingi duomenys',
        paragraphs: [
          'Užsiregistravęs arba pirkdamas prekes ir paslaugas internetiniame puslapyje https://babystep.lt Pirkėjas įsipareigoja užtikrinti, kad pateikta informacija ir Asmens duomenys nėra klaidingi ar neteisingi.',
        ],
      },
      {
        id: 'duomenu-pasikeitimas',
        number: '6.3',
        title: 'Duomenų pasikeitimas',
        paragraphs: [
          'Pasikeitus Pirkėjo duomenims registracijos ir pirkimo formoje Pirkėjas privalo informuoti Pardavėją el.paštu: info@babystep.lt',
        ],
      },
      {
        id: 'prisijungimo-duomenys',
        number: '6.4',
        title: 'Prisijungimo duomenys',
        paragraphs: [
          'Pirkėjas yra atsakingas už savo prisijungimo ir registracijos duomenis ir negali jais dalintis su trečiaisiais asmenimis ir sudaryti sąlygų šiuos duomenis gauti tretiems asmenims ir jų grupėmis. Pirkėjas registruodamasis ir pirkdamas produktus bei paslaugas sutinka, kad yra tiesiogiai atsakingas už nuostolius atsiradusius dėl neteisėto Pirkėjo Paskyros ir Duomenų panaudojimo ir neapsaugojimo nuo trečiųjų asmenų ir jų grupių.',
        ],
      },
      {
        id: 'duomenu-nutekejimas',
        number: '6.5',
        title: 'Duomenų nutekėjimas',
        paragraphs: [
          'Jei Pirkėjo prisijungimo duomenys ir registracijos informacija tampa žinomi tretiems asmenims, Pirkėjas privalo informuoti Pardavėją nedelsiant el.paštu: info@babystep.lt, per vieną darbo dieną nuo duomenų nutekinimo.',
        ],
      },
      {
        id: 'vienas-vartotojas',
        number: '6.6',
        title: 'Vienas vartotojas',
        paragraphs: [
          'Pirkėjas įsipareigoja registruoti tik vieną vartotoją babystep.lt puslapyje, ir nekurti daugiau papildomų vartotojų savo ar kitų duomenimis.',
        ],
      },
      {
        id: 'paskyros-panaikinimas',
        number: '6.7',
        title: 'Paskyros panaikinimas',
        paragraphs: [
          'Kai prisijungimo prie Pirkėjo paskyros duomenys tapo žinomi tretiems asmenims, Pardavėjas tokią paskyrą panaikina ir suteikia teisę Pirkėjui susikurti naują Paskyrą.',
          'Pirkėjo vartotojo duomenims tapus žinomiems tretiems asmenims Pardavėjas panaikiną šį vartotoją ir suteikią teisę Pirkėjui susikurti naują vartotoją su naujais prisijungimo duomenimis.',
        ],
      },
      {
        id: 'apmokejimo-terminas',
        number: '6.8',
        title: 'Apmokėjimo terminas',
        paragraphs: [
          'Pirkėjas privalo susimokėti už užsakytas prekes ir paslaugas per nurodyta – 1 d. laikotarpį per savo pasirinktą apmokėjimo būdą.',
        ],
      },
      {
        id: 'kursai-ir-konsultacijos',
        number: '6.9',
        title: 'Kursai ir konsultacijos',
        paragraphs: [
          'Pirkėjas užsiregistravęs ir pirkdamas paslaugą iš babystep.lt privalo laikytis gautais nurodymais ir prisijungti prie kursų/konsultacijos jam paskirtu laiku. Negalėdamas prisijungti prie kursų/konsultacijos vykstančiu jam paskirtu laiku Pirkėjas privalo informuoti Pardavėją likus ne daugiau nei vienai darbo dienai iki susitikimo.',
          '6.9.1 Pirkėjui suteikta mokymo informacija ir medžiaga yra skirta konkrečiai jam ir ji negali būti platinama ar viešinama tretiems asmenims.',
        ],
      },
    ],
  },
  {
    id: 'pardavejo-teises',
    number: '07',
    title: 'Pardavėjo teisės',
    subchapters: [
      {
        id: 'svetaines-funkcijos',
        number: '7.1',
        title: 'Svetainės funkcijos',
        paragraphs: [
          'Pardavėjas pasilieką teisę sustabdyti ar keisti svetainės babystep.lt funkcijas, išdėstymą, nutraukti ar koreguoti svetaines funkcijas.',
        ],
      },
      {
        id: 'paslaugu-sustabdymas',
        number: '7.2',
        title: 'Paslaugų sustabdymas',
        paragraphs: [
          'Pardavėjas pasilieką teisę sustabdyti ar nutraukti teikiamas paslaugas esančias babystep.lt svetainėje.',
        ],
      },
      {
        id: 'paslaugu-keitimas',
        number: '7.4',
        title: 'Paslaugų ir prekių keitimas',
        paragraphs: [
          'Pardavėjas pasilieka teisę keisti paslaugų esančių – babystep.lt apimtį, būdą, paslaugų teikimą, keisti paslaugų ir prekių kainas.',
          'Jei Pirkėjas bando pakenkti svetainės babystep.lt darbo stabilumui ir saugumui ar nevykdo savo įsipareigojimų, Pardavėjas turi teisę nedelsiant ir be išankstinio įspėjimo apriboti arba sustabdyti Pirkėjo galimybę naudotis svetaine babystep.lt arba išskirtiniais atvejais panaikinti Pirkėjo Paskyrą.',
          'Pirkėjui bandant pakenkti svetainės babystep.lt stabilumui ir informacijos saugai, Pardavėjas turi teisę nedelsiant, be išankstinio įspėjimo sustabdyti, apriboti ar panaikinti Pirkėjo vartotoją ir Pirkėjo veiksmus, bei galimybe naudotis svetaine – babystep.lt',
        ],
      },
    ],
  },
  {
    id: 'pardavejo-isipareigojimai',
    number: '08',
    title: 'Pardavėjo įsipareigojimai',
    subchapters: [
      {
        id: 'paslaugu-teikimas',
        number: '8.1',
        title: 'Paslaugų teikimas',
        paragraphs: [
          'Pardavėjas įsipareigoja teikti paslaugas ir prekes pagal Taisyklėse numatytas nuostatas ir sąlygas, sudaryti Pirkėjui galimybe pirkti ir naudotis babystep.lt teikiamomis paslaugomis ir prekėmis.',
        ],
      },
      {
        id: 'asmens-duomenu-tvarkymas',
        number: '8.2',
        title: 'Asmens duomenų tvarkymas',
        paragraphs: [
          'Pardavėjas įsipareigoja tvarkyti Pirkėjo Asmens duomenis pagal Lietuvos Respublikos teisės aktų numatytą tvarką ir Taisyklių 3 punkte nurodytomis nuostatomis.',
        ],
      },
      {
        id: 'informavimas-apie-pakeitimus',
        number: '8.3',
        title: 'Informavimas apie pakeitimus',
        paragraphs: ['Informuoti Pirkėją apie Taisyklių 7.1. – 7.4 punktuose atliekamus pakeitimus.'],
      },
      {
        id: 'prekiu-pristatymo-informacija',
        number: '8.4',
        title: 'Prekių ir paslaugų pristatymo-informacija',
        paragraphs: [
          'Pardavėjas įsipareigoja pristatyti Pirkėjo užsakytas prekes ir paslaugas jo nurodytu adresu ar numatytu paslaugos pristatymo būdu.',
        ],
      },
      {
        id: 'grazinamu-prekiu-priemimas',
        number: '8.5',
        title: 'Grąžinamų prekių priėmimas',
        paragraphs: [
          'Pardavėjas įsipareigoja priimti Pirkėjo grąžinamas prekes ir paslaugas pagal “Prekių ir paslaugų grąžinimo sąlygos” nurodytas nuostatas.',
        ],
      },
    ],
  },
  {
    id: 'apsikeitimas-informacija',
    number: '09',
    title: 'Apsikeitimas informacija',
    subchapters: [
      {
        id: 'pardavejo-pranesimai',
        number: '9.1',
        title: 'Pardavėjo pranešimai',
        paragraphs: [
          'Pardavėjas visus pranešimus siunčia Taisyklių 3.2 numatyta tvarka į Pirkėjo nurodytą kontaktinę informaciją.',
        ],
      },
      {
        id: 'pirkejo-pranesimai',
        number: '9.2',
        title: 'Pirkėjo pranešimai',
        paragraphs: [
          'Kilus klausimams ar sprendžiant problemą Pirkėjas pranešimus siunčia į Pardavėjo “Kontaktai” puslapyje nurodytus kontaktus.',
        ],
      },
    ],
  },
  {
    id: 'baigiamosios-nuostatos',
    number: '10',
    title: 'Baigiamosios nuostatos',
    subchapters: [
      {
        id: 'teises-aktai',
        number: '10.1',
        title: 'Lietuvos Respublikos teisės aktai',
        paragraphs: ['Šios taisyklės sudarytos vadovaujantis Lietuvos Respublikos teisės aktais.'],
      },
      {
        id: 'taikoma-teise',
        number: '10.2',
        title: 'Taikoma teisė',
        paragraphs: ['Šių Taisyklių pagrindu kylantiems santykiams taikoma Lietuvos Respublikos teisė.'],
      },
      {
        id: 'gincu-sprendimas',
        number: '10.3',
        title: 'Ginčų sprendimas',
        paragraphs: [
          'Visi nesutarimai, kilę dėl šių Taisyklių vykdymo, sprendžiami derybų būdu. Nepavykus susitarti per 20 (dvidešimt) kalendorinių dienų, ginčai sprendžiami Lietuvos Respublikos teisės aktų nustatyta tvarka.1',
        ],
      },
    ],
  },
  {
    id: 'prekiu-pristatymo-informacija',
    number: '11',
    title: 'Prekių pristatymo-informacija',
    subchapters: [
      {
        id: 'pristatymo-budas',
        number: '11.1',
        title: 'Pristatymo būdas',
        paragraphs: [
          'Pirkėjui užsakant prekes svetainėje – twobrostory.com, jis pasirenka pristatymo būdą. Pirkėjas užsakydamas prekes privalo užpildyti reikiamus duomenis reikalingus tinkamai atlikti paslaugą. Jei, duomenys yra užpildomi netinkamai dėl Pirkėjo kaltės – visą atsakomybę dėl prekės neatvykimo tiesiogiai prisiima Pirkėjas. Prekės pristatomos Lietuvos Respublikos teritorijoje. Dėl pristatymo į kitas šalis Pirkėjas gali kreiptis el. paštu info@babystep.lt.',
        ],
      },
      {
        id: 'prekiu-priemimas',
        number: '11.2',
        title: 'Prekių priėmimas',
        paragraphs: [
          'Pirkėjas įsipareigoja priimti užsakytas prekes pagal jo pasirinktą atsiėmimo metodą. Pirkėjui neatsiėmus prekių pagal jo pasirinktą būdą ir neinformavus Pardavėjo apie tai Pirkėjas neturi teisės reikšti pretenzijų Pardavėjui. Prekei grįžus į prekės siuntėjo adresą už pakartotiną prekes išsiuntimą Pirkėjas turi susisiekti su Pardavėju pagal nurodytus kontaktinius duomenis.',
        ],
      },
      {
        id: 'pristatymo-terminai',
        number: '11.3',
        title: 'Pristatymo terminai',
        paragraphs: [
          'Pardavėjas įsipareigoja pristatyti prekes Pirkėjui laikydamasis prekių aprašymuose nurodytų terminų. Šie terminai netaikomi tais atvejais, kai Pardavėjo sandėlyje nėra reikiamų arba alternatyvių prekių, o Pirkėjas informuojamas apie jo užsakytų prekių trūkumą. Pirkėjas sutinka, kad esant nenumatytų, nuo Pardavėjo nepriklausančių aplinkybių, prekių pristatymo terminas gali skirtis nuo nurodytų prekių aprašymuose terminų arba Pirkėjo ir Pardavėjo aptarto prekių pristatymo termino. Esant nenumatytų aplinkybių, Pardavėjas įsipareigoja nedelsiant susisiekti su Pirkėju ir suderinti prekių pristatymo terminą ir kitus su pristatymu susijusius klausimus.',
        ],
      },
      {
        id: 'atsakomybe-del-pristatymo',
        number: '11.4',
        title: 'Atsakomybė dėl pristatymo',
        paragraphs: [
          'Pardavėjas visais atvejais atleidžiamas nuo atsakomybės už prekių pristatymo termino pažeidimą, kai šis pažeidimas yra padarytas dėl ne nuo Pardavėjui priklausančių aplinkybių.',
        ],
      },
    ],
  },
  {
    id: 'prekiu-ir-paslaugu-grazinimas',
    number: '12',
    title: 'Prekių ir paslaugų grąžinimo sąlygos',
    subchapters: [
      {
        id: 'paslaugu-pinigu-grazinimas',
        number: '12.1',
        title: 'Pinigų grąžinimas už paslaugas',
        paragraphs: [
          'Suteikiame 100% pinigų grąžinimo garantiją, jeigu prekė arba paslauga yra atšaukiama dėl babystep.lt kaltės. Pinigai bus grąžinamu pateikus Jums raštišką prašymą elektroniniu paštu – info@babystep.lt, per 2 darbo dienas nuo prašymo gavimo ir prašymo nagrinėjimo pabaigos.',
          '1.1.Už kursus ir konsultacijas pinigai yra negrąžinami jei buvo suteikta daugiau nei 30% mokymo medžiagos ar konsultacijos.',
        ],
      },
      {
        id: 'prekiu-grazinimo-salygos',
        number: '12.2',
        title: 'Prekių grąžinimo sąlygos',
        paragraphs: [
          '2.1. Parduotų prekių trūkumai šalinami, prekės keičiamos ir grąžinamos vadovaujantis Lietuvos Respublikos Vyriausybės 2001 m. birželio 11 d. nutarimu Nr. 697 patvirtintomis Mažmeninės prekybos taisyklėmis ir kitais galiojančiais Lietuvos Respublikos teisės aktais.',
          '2.2. Pirkėjas pagal pirkimo-pardavimo taisykles, norėdamas grąžinti prekę turi išsiųsti užklausą elektroniniu paštu – info@babystep.lt ir išvardinti dėl kokių priežasčių jis nori grąžinti prekę.',
          '2.3Prekių siuntimo/pristatymo išlaidas, Pirkėjui siunčiant prekes Pardavėjui grąžinti ar pakeisti dėl nustatytu prekės trūkumų ar defektų apmoka Pardavėjas tuo atveju kai grąžinti išsiųstuose prekėse nustatyti trūkumai ar defektai. Prekėse nenustačius trūkumų ar defektų, siuntimo išlaidas apmoka Pirkėjas.',
          '2.4. Pirkėjui siunčiant prekes Pirkimo pardavimo taisyklių 12.1 punkte nurodytu atveju, būtina laikytis šių sąlygų:',
          '2.4.1. pageidautina, bet neprivaloma, kad grąžiname prekė būtu originalioje, nepažeistoje pakuotėje;',
          '2.4.2. grąžiname prekė turi būti tokios pačios komplektacijos kokia buvo užsakyta ir gauta Pirkėjo; rinkiniai, kuriems buvo taikomas bendras kainos pasiūlymas negali būti skaidomi;',
          '2.4.3. grąžinama prekė turi būti nenaudota, nesugadinta, nepakeista fizinė prekės formą ar sudėtis, švari ir tvarkinga;',
          '2.4.4. grąžinamos prekė turi būti su visomis originaliomis etiketėmis;',
          '2.4.5. Pateikiamas rašytinis prašymas kuriame nurodomas pageidavimas pakeisti prekę į kokybišką prekę, ištaisyti prekės defektus ir trūkumus, grąžinti Pirkėjo sumokėtus pinigus;',
          '2.4.6. pateikiamas prekės įsigijimą patvirtinantis dokumentas (kasos kvitas, sąskaita faktūra, prekės priėmimą patvirtinantis dokumentas, užsakymo patvirtinimo elektroninis laiškas).',
          '2.5. Pirkėjas turi teisę, nenurodydamas priežasties ir nepatirdamas kitų, negu nustatyta Civilinio kodekso 6.22811 straipsnyje, išlaidų, per keturiolika dienų atsisakyti sudarytos sutarties, išskyrus Civilinio kodekso 6.22810 straipsnio 2 dalyje numatytas išimtis.',
          '2.6. Pirkėjo teisė atsisakyti sudarytos pirkimo-pardavimo sutarties netaikoma šioms sutartims: paslaugų sutartims, pagal kurias paslaugos ir prekės Pirkėjui yra suteiktos tokios, – kokios buvo nurodytos perkant babystep.lt svetainėje; sutartims dėl pagal specialius Pirkėjo nurodymus pagamintų prekių, kurios nėra iš anksto pagamintos ir kurios gaminamos atsižvelgiant į Pirkėjo asmeninį pasirinkimą ar nurodymą, individualų užsakymą; sutartims dėl greitai gendančių prekių, kurių galiojimo laikas yra trumpas; sutartims dėl supakuotų prekių, kurios buvo išpakuotos po pristatymo ir kurios yra netinkamos grąžinti dėl sveikatos apsaugos ar higienos priežasčių; sutartims dėl skaitmeninio turinio teikimo, jeigu skaitmeninio turinio teikimas buvo pradėtas Pirkėjui iš anksto aiškiai sutikus ir pripažinus, kad dėl to jis praras teisę atsisakyti sutarties.',
          '2.7. Pirkėjas, sutikdamas su šiomis taisyklėmis, taip pat patvirtina, jog supranta, kad Pirkimo-pardavimo taisyklių 12.6 punkte nurodytoms prekių kategorijoms priklauso ir kosmetikos priemonės, t. y. Pardavėjas nesuteikia Pirkėjui teisės nenurodant pagrindo atsisakyti sutarties, sudarytos dėl šių prekių.',
          '2.8. Sutarties atsisakymo terminas pasibaigia po keturiolikos dienų: kai sudaroma pirkimo–pardavimo sutartis, – nuo tos dienos, kurią Pirkėjas ar Pirkėjo nurodytas asmuo, išskyrus vežėją, gauna užsakytą prekę arba: jeigu Pirkėjas vienu užsakymu užsakė daugiau negu vieną prekę ir prekės pristatomos atskirai, – nuo tos dienos, kurią Pirkėjas ar Pirkėjo nurodytas asmuo, išskyrus vežėją, gauna paskutinę prekę; jeigu prekė pristatoma skirtingomis partijomis arba dalimis, – nuo tos dienos, kurią Pirkėjas ar Pirkėjo nurodytas asmuo, išskyrus vežėją, gauna paskutinę partiją ar dalį.',
          '2.9. Pardavėjas įsipareigoja ne vėliau kaip per keturioliką kalendorinių dienų nuo Pirkėjo pranešimo apie sutarties atsisakymą, turi grąžinti Pirkėjui visas šio sumokėtas sumas, įskaitant sumokėtas Pirkėjo pristatymo išlaidas. Visa suma grąžinama į Pirkėjo nurodytą sąskaitą per pasirinktą pinigų pavedimo metodą. Tais atvejais, kai Pirkėjui pristatytos prekės patenka į Pirkimo pardavimo taisyklių 2.6 punkte nurodytas kategorijas, prekių pristatymo mokestis Pirkėjui nėra grąžinamas.',
          '2.10. Pardavėjas neprivalo grąžinti Pirkėjui papildomų išlaidų, kurios susidarė Pirkėjui pasirinkus kitą būdą negu Pardavėjo siūlytas pigiausias įprastinis pristatymo būdas.',
          '2.11. Pardavėjas grąžinti Pirkėjui jo sumokėtų sumų negali tol, kol prekės nėra grąžintos Pardavėjui arba kol Pirkėjas pateikia įrodymą, kad prekės yra išsiųstos Pardavėjui.',
          '2.12.Pirkėjas ne vėliau kaip per keturioliką dienų nuo pranešimo apie sutarties atsisakymą ir prekės ar paslaugos grąžinimo pateikimo Pardavėjui turi išsiųsti prekes Pardavėjui arba jo įgaliotam asmeniui. Pirkėjui įgyvendinant sutarties atsisakymą, Pirkėjui tiesiogiai tenka prekės grąžinimo išlaidos.',
          '2.18. Pirkėjas atsako tik už prekės vertės sumažėjimą, atsiradusį dėl veiksmų, nebūtinų prekės pobūdžiui, savybėms ir veikimui nustatyti. Pirkėjas neatsako už prekės vertės sumažėjimą, jeigu Pardavėjas nepateikė Pirkėjui informacijos apie teisę atsisakyti sutarties pagal Civilinio kodekso 6.2287 straipsnio 1 dalies 7 punktą.',
          '2.19. Pirkėjui įgyvendinus teisę atsisakyti sudarytos sutarties, automatiškai nutraukiamos papildomos sutartys be jokių išlaidų Pirkėjui, išskyrus išlaidas, kurios numatytos Civilinio kodekso 6.22811 ir 6.22812 straipsnyje.',
          'Papildomomis sutartimis laikomos sutartys, pagal kurias Pirkėjas įsigyja prekių ar paslaugų, susijusių su sudaryta sutartimi, o tas prekes tiekia ar paslaugas teikia Pardavėjas ar kitas asmuo pagal susitarimą su Pardavėju. Pirkėjas privalo nedelsdamas pranešti raštu kitai sutarties šaliai apie papildomos sutarties nutraukimą ir pateikti duomenis apie nuotolinės sutarties arba ne prekybos patalpose sudarytos sutarties atsisakymą. Atskiras Pirkėjo pranešimas nereikalingas tais atvejais, kai papildoma sutartis buvo sudaryta su tuo pačiu Pardavėju, kuriam buvo pranešta apie sutarties atsisakymą pagal Civilinio kodekso 6.22810 straipsnį.',
        ],
      },
    ],
  },
] satisfies TermsChapter[];

const termsNavItems = termsChapters.map((chapter) => ({
  id: chapter.id,
  number: chapter.number,
  title: chapter.title,
  subitems: chapter.subchapters.map((subchapter) => ({
    id: subchapter.id,
    number: subchapter.number,
    title: subchapter.title,
  })),
})) satisfies LegalContentNavItem[];

const TaisyklesIrSalygosPage = () => {
  return (
    <Container>
      <PageHeader
        smallText="Pagalba"
        bigText="Taisyklės ir sąlygos"
        description="Pirkimo–pardavimo sutarties sąlygos, nustatančios Pirkėjo ir Pardavėjo teises bei pareigas, pristatymo ir prekių grąžinimo tvarką."
      />

      <p className="text-base text-neutral-500">Atnaujinta: 2026 m. birželio 1 d.</p>

      <div className="grid gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-20">
        <LegalContentNav ariaLabel="Taisyklių ir sąlygų turinys" items={termsNavItems} />

        <article className="min-w-0 space-y-8">
          <div className="space-y-8">
            {termsChapters.map((chapter) => (
              <div
                key={chapter.id}
                id={chapter.id}
                className="border-tumbleweed-100 flex scroll-mt-28 flex-col gap-4 border-b pb-8 last:border-b-0 last:pb-0"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-accent text-tumbleweed-700 text-lg font-bold">{chapter.number}</span>
                  <h2 className="font-accent text-2xl leading-tight font-semibold text-neutral-950 sm:text-3xl">
                    {chapter.title}
                  </h2>
                </div>

                <div className="space-y-6">
                  {chapter.subchapters.map((subchapter) => (
                    <section key={subchapter.id} id={subchapter.id} className="scroll-mt-28">
                      <div className="flex items-baseline gap-3">
                        <span className="text-tumbleweed-700 text-sm font-semibold">{subchapter.number}</span>
                        <h3 className="font-accent text-xl font-semibold text-neutral-950 sm:text-2xl">
                          {subchapter.title}
                        </h3>
                      </div>
                      <div className="mt-3 space-y-4 text-base leading-8 text-neutral-600 sm:text-lg sm:leading-9">
                        {subchapter.paragraphs.map((paragraph, paragraphIndex) => (
                          <p key={`${subchapter.id}-${paragraphIndex}`}>{paragraph}</p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <PaperWrapper className="max-w-xl">
            <h3 className="text-sm font-semibold tracking-[0.16em] text-neutral-500 uppercase">Reikia pagalbos?</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">
              Jei turite klausimų dėl užsakymo, taisyklių arba prekių grąžinimo, susisiekite su mumis.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-flex text-sm font-semibold text-neutral-900 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </PaperWrapper>
        </article>
      </div>
    </Container>
  );
};

export default TaisyklesIrSalygosPage;
