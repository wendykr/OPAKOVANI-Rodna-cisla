# Rodná čísla

Osvěžení znalostí nabytých v předchozích lekcích a kurzech pro kurz JavaScript 2 od Czechitas.

Všechna cvičení se točí kolem úlohy ověřování platnosti rodného čísla občana České republiky. Co všechno je považováno za platné rodné číslo si můžete přečíst na [Wikipedii](https://cs.wikipedia.org/wiki/Rodn%C3%A9_%C4%8D%C3%ADslo). Je zde spousta různých výjimek a detailů, které si pro dnešní den odpustíme a pravidla si zjednodušíme takto:
- Rodné číslo se skládá z deseti číslic.
- Prvních šest číslic popisuje datum narození ve formátu RRMMDD, tj. po dvou číslicích pro rok, měsíc a den narození. Např. 701020 označuje datum narození 20. října 1970. Přitom ženy mají k měsíci narození připočteno 50 (tzn. 706020 označuje ženu narozenou 20. října 1970). Zbytek rodného čísla (tzv. koncovka) odlišuje osoby stejného pohlaví narozené ve stejný den a zpravidla se odděluje lomítkem. My jej však lomítkem oddělovat nebudeme.
- Celé rodné číslo musí být beze zbytku dělitelná jedenácti, aby bylo možno snadno detekovat překlepy či jiné náhodné chyby.

Celé rodné číslo by tedy mohlo vypadat takto 7060201236.

## Cvičení: Hodnoty, proměnné, podmínky, funkce

### 1. Rodná čísla

Napište program, který zjistí, jestli je zadané rodné číslo platné. (Skutečná rodná čísla mají 9 nebo 10 číslic, my budeme uvažovat pouze rodná čísla mladších lidí, která mají 10 číslic.) Postupujte dle následujících kroků.
- Založte si projekt příkazem
```
npm init kodim-app cviceni-rodna-cisla html-css-js
```
Ve VS Code otevřete složku `cviceni-rodna-cisla`.

- JavaScript vložte do stránky pomocí
```
<script type="module" src="index.js"></script>
```

- Pomocí funkce `prompt` se zeptejte uživatele na rodné číslo. Rodné číslo zkontrolujte podle bodů popsaných níže.
- Každé rodné číslo musí mít přesně 10 znaků. Zkontrolujte tedy, že zadaný řetězec je délky 10 a neprojdou nám například vstupy typu
```
nepovím
```
Slovo „nepovím“ má totiž jen 7 znaků.
```
123456789123456789
```
Řetězec „123456789123456789“ má totiž 18 znaků.
Pokud uživatel zadal číslo špatné délky, **vypište do konzole text**:
```
❌ Uživatel zadal rodné číslo neplatné délky.
```
V opačném případě vypište:
```
✔️ Zadané rodné číslo má správně deset znaků.
```
- Každé rodné číslo musí být celé číslo. Zde je nějaká hodnota celé číslo v JavaScriptu zkontrolujete pomocí funkce `Number.isInteger`. Musíte však vstup předtím převést na číslo pomocí funkce `Number`.

```
> Number.isInteger(Number('25'))
true
> Number.isInteger(Number('25.16'))
false
> Number.isInteger(Number('ahoj'))
false
```

Opět **vypište do konzole**, zda podmínka platí.
```
✔️ Rodné číslo je celé číslo. ❌ Rodné číslo obsahuje nepovolené znaky.
```
- Každé rodné číslo musí být dělitelné 11. Zkontrolujte tedy, že zadané číslo je dělitelné jedenácti a výsledek opět **vypište do konzole**.
```
✔️ Rodné číslo je dělitelné 11. ❌ Rodné číslo není dělitelné číslem 11.
```
- Pokud jsou všechny podmínky splněny, rodné číslo budeme považovat za platné. Informaci o platnosti **vypište do konzole**.
```
✔️ Zadané rodné číslo je platné. ❌ Uživatel zadal neplatné rodné číslo.
```
Po zadání rodného čísla by se v konzoli měly objevit čtyři výpisy.

### 2. Platnost jako funkce

Přepište kód z předchozího příkladu do funkce s názvem `checkBirthID`, která zkontroluje platnost rodného čísla. Funkce bude mít jeden parametr, ve kterém bude očekávat rodné číslo jako řetězec. Funkce bude vracet řetězec s výsledkem kontroly podle následujících pravidel:
- `'invalidLength'` v případě, že vstup nemá 10 znaků,
- `'notANumber'` v případě, že vstup není číslo,
- `'failedChecksum'` v případě, že číslo není dělitelné 11,
- `'ok'` v případě, že číslo prošlo kontrolou.

Funkci otestujte třeba na hodnotách:
```javascript
const rodnaCislaKOtestovani = [
  '123',
  'nepovím',
  '7060201236',
  '7060201235',
  '123456789123456789',
  '9062185440',
  '123č56q8y7',
];
```

## Cvičení: Pole, cykly, objekty

### 1. Kontrola cifer

V případě, že uživatel zadal do rodného čísla špatné znaky, budeme chtít tyto znaky vypsat a ukázat, kde se stala chyba. Pokračuje v kódu z předchozího příkladu.
- Vytvořte pole `digits` obsahující všechny cifry `'0'` až `'9'` jako řetězce.
- Napište funkci `isDigit`, která na vstup dostane řetězec a vrátí `true` pokud tento řetězec obsahuje právě jednu cifru. Použijte k tomu pole `digits` a metodu `includes` (viz dokumentace). V opačném případě funkce vrátí `false`.
- Napište funkci `logInvalidCharacters`. Funkce na vstupu dostane řetězec, ten převede na pole znaků (zkuste vygooglit, jak na to). Následně všechny znaky projde pomocí `forEach`. Do konzole vypíše ty znaky, které nesplňují podmínky z funkce `isDigit`. `logInvalidCharacters` vyzkoušejte například na textu `'123č56q8y7'` a `'7060201236'`. V prvním případě by se v konzoli mělo objevit na třech řádcích `č`, `q` a `y`. Pro druhý text by se nemělo vypsat nic.

### 2. Detailní kontrola cifer

V předchozím cvičení jsme pomocí cyklu vypisovali všechny špatně zadané znaky do konzole. Nyní tento kód přepíšeme tak, aby místo výpisů do konzole vyrobil pole objektů, obsahující informace o každém znaku. Například pro vstup
```
462748/312
```
chceme jako výsledek obdržet takovéto pole.
```javascript
[
  { char: '4', digit: true },
  { char: '6', digit: true },
  { char: '2', digit: true },
  { char: '7', digit: true },
  { char: '4', digit: true },
  { char: '8', digit: true },
  { char: '/', digit: false },
  { char: '3', digit: true },
  { char: '1', digit: true },
  { char: '2', digit: true },
];
```

Napište tedy funkci `validateCharacters`, která na vstupu dostane text a vrátí pole ve formátu jako výše. Postupujte následovně:
- Na začátku funkce si vytvořte proměnnou `result`, do které uložte prázdné pole.
- Projděte vstup znak po znaku jako v předchozím cvičení. Místo `console.log` však pro každý znak vyrobte odpovídající objekt a vložte jej do pole `result` pomocí metody `push`.
- Na konci funkce pole result vraťte pomocí return.
- Vyzkoušejte vaši funkci zavolat třeba se vstupy `'123č56q8y7'` a `'7060201236'` a výsledná pole vypište do konzole.
```javascript
> validateCharacters('123č56q8y7')
[
  { char: '1', digit: true },
  { char: '2', digit: true },
  { char: '3', digit: true },
  { char: 'č', digit: false },
  { char: '5', digit: true },
  { char: '6', digit: true },
  { char: 'q', digit: false },
  { char: '8', digit: true },
  { char: 'y', digit: false },
  { char: '7', digit: true },
];
> validateCharacters('7060201236')
[
  { char: '7', digit: true },
  { char: '0', digit: true },
  { char: '6', digit: true },
  { char: '0', digit: true },
  { char: '2', digit: true },
  { char: '0', digit: true },
  { char: '1', digit: true },
  { char: '2', digit: true },
  { char: '3', digit: true },
  { char: '6', digit: true },
];
```

## Cvičení: DOM a události

### 1. Vstup pomocí formuláře

Upravte vaši aplikaci na kontrolu rodných čísel tak, aby obsahovala formulář.
- Do HTML vaší stránky vložte formulář s textovým políčkem pro rodné číslo. Formulář se bude odesílat tlačítkem Zkontrolovat.
- Na událost `submit` formuláře pověste posluchač, který provede kontrolu zadaného rodného čísla tak, jak jsme ji dělali v předchozích cvičení.
- Do HTML vložte pod formulář `div` s nějakým vhodně zvoleným `id`. Tento `div` bude představovat zprávu pro uživatele.
- Z přechozích cvičení máme hotovou funkci `checkBirthID`, Pokud pro uživatelův vstup vrátí `'ok'`, vypište do vašeho `divu`
```
✔️ V pořádku.
```
- Pokud vrátí cokoliv jiného, vypište zprávu ve smyslu
```
❌ V rodném čísle jsou chyby.
```
- Vyzkoušejte do formuláře vyplnit aspoň jedno platné rodné číslo a jedno neplatné.

![ukázka výsledku](https://kodim.cz/cms/assets/kurzy/daweb/js2/opakovani/cv-dom-udalosti/cvlekce%3Evstup-formular/spravne.png)
![ukázka výsledku](https://kodim.cz/cms/assets/kurzy/daweb/js2/opakovani/cv-dom-udalosti/cvlekce%3Evstup-formular/chybne.png)

## Cvičení: innerHTML

### 1. Cifry jako HTML elementy

Pokračuje v kódu předchozího příkladu. Budeme chtít zobrazit jednotlivé cifry rodného čísla dle následujícího vzoru.

![ukázka výsledku](https://kodim.cz/cms/assets/kurzy/daweb/js2/opakovani/cv-innerhtml/cvlekce%3Ecifry-innerhtml/digits.png)

Cifry budeme do stránky vkládat pomocí vlastnosti `innerHTML`.
- Nedříve si rozmysleme, jak bude vypadat HTML pro jednu cifru. Může jít například o jednoduchý `div` s nějakou vhodně nastylovanou třídou.
- Pokud je znak platná číslice, bude mít na stránce zelené pozadí `#00DD00`. V opačném případě bude mít červené pozadí `#FF8686`.
- V souboru `index.html` vytvořte `div` s nějakým smysluplným `id`, ve kterém budeme zobrazovat jednotlivé cifry. Nastylujte jej pomocí flexboxu tak, abychom mohli cifry zobrazovat vedle sebe.
- Jakmile uživatel klikne na tlačítko *Zkontrolovat*, zavolejte na uživatelův vstup `validateCharacters`. Projděte vrácené pole pomocí cyklu `forEach` a naplňte váš připravený `div` ciframi s použitím vlastnosti `innerHTML`.
Vaše aplikace by měla ve výsledku fungovat tak, že kdykoliv uživatel zadá rodné číslo a nechá si jej zkontrolovat, aplikace vypíše, zda je číslo zadané dobře nebo špatně, a zobrazí jednotlivé znaky čísla s tím, že cifry jsou zelené a špatně zadané znaky jsou červené.

![ukázka výsledku](https://kodim.cz/cms/assets/kurzy/daweb/js2/opakovani/cv-innerhtml/cvlekce%3Ecifry-innerhtml/spravne.png)
![ukázka výsledku](https://kodim.cz/cms/assets/kurzy/daweb/js2/opakovani/cv-innerhtml/cvlekce%3Ecifry-innerhtml/chybne.png)