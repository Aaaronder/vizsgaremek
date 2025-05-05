# Outclass - Frontend README

## Projekt áttekintés
Az Outclass egy Spotify-hoz hasonló zenei streaming webalkalmazás frontend része, amely lehetővé teszi a felhasználók számára zenék keresését, lejátszását, feltöltését, letöltését és lejátszási listák kezelését. A frontend React alapú, reszponzív felülettel, amely mobil és asztali eszközökön is jól működik.

## Főbb funkciók
- **Regisztráció és bejelentkezés**: Felhasználói fiók létrehozása és hitelesítése.
- **Zene keresés és szűrés**: Keresés előadó, műfaj, album vagy dalcím alapján.
- **Zene lejátszás**: HTML5 audio lejátszóval történő zenehallgatás.
- **Zene feltöltés és letöltés**: MP3 és JPG fájlok feltöltése, letöltése max. 5 MB méretig.
- **Lejátszási listák**: Személyre szabott lejátszási listák létrehozása, módosítása és törlése.
- **Reszponzív design**: Mobil, tablet és asztali nézetek támogatása.

## Technológiai stack
- **React**: Komponensalapú felület, hook-ok és context API használatával.
- **React Router**: Navigáció az oldalak között.
- **Axios**: HTTP kérések kezelése a backend API-val.
- **CSS Modules**: Stíluskezelés és reszponzív design.
- **Vite**: Gyors fejlesztési környezet és build eszköz.

## Fejlesztőkörnyezet beállítása
### Előfeltételek
- Node.js 18 vagy újabb
- npm 9.x vagy újabb
- Git 2.35 vagy újabb

### Telepítés
1. Klónozd a repository-t:
   ```bash
   git clone <repository-url>
   ```
2. Lépj a frontend mappába:
   ```bash
   cd frontend
   ```
3. Telepítsd a függőségeket:
   ```bash
   npm install
   ```
4. Indítsd el a fejlesztői szervert:
   ```bash
   npm run dev
   ```

### Környezeti változók
A frontend a backend API-val kommunikál. Ellenőrizd, hogy a backend API elérési útja megfelelően van beállítva (alapértelmezett: `http://localhost:3000`).

## Használat
- A böngészőben nyisd meg a `http://localhost:5173` címet (Vite alapértelmezett portja).
- Regisztrálj vagy jelentkezz be a funkciók eléréséhez.
- Használd a kereső sávot a zenék szűréséhez, tölts fel új dalokat, vagy hozz létre lejátszási listákat.

## Fejlesztési megjegyzések
- A kód modularizált, komponensalapú struktúrával.
- A HTTP kérések hibakezelése az Axios interceptorokkal történik.
- A reszponzív design CSS Modules és média lekérdezések használatával készült.

## Továbbfejlesztési lehetőségek
- Sötét/világos téma támogatása.
- Drag & drop funkció a lejátszási listákhoz.
- Többnyelvű felület támogatása.
- Közösségi funkciók (pl. kommentelés, megosztás).

## Licenc
Ez a projekt a BGSZC Logisztikai és Kereskedelmi Technikum és Szakképző Iskola vizsgaremek részeként készült. Minden jog fenntartva.
