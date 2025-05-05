# Outclass - Összefoglaló README

## Projekt áttekintés
Az Outclass egy Spotify-hoz hasonló zenei streaming platform, amely lehetővé teszi a felhasználók számára zenék feltöltését, letöltését, keresését, lejátszását és lejátszási listák kezelését. A projekt egy webalkalmazásból (frontend és backend), egy MySQL alapú adatbázisból és egy offline Windows alapú zenelejátszóból áll. A rendszer reszponzív, biztonságos és felhasználóbarát.

## Főbb funkciók
- **Felhasználókezelés**: Regisztráció, bejelentkezés, profilkezelés.
- **Zenei tartalom kezelése**: MP3 fájlok feltöltése és letöltése (max. 5 MB), metaadatok kezelése.
- **Keresés és szűrés**: Előadó, műfaj, album vagy dalcím alapján.
- **Lejátszási listák**: Személyre szabott listák létrehozása, módosítása, törlése.
- **Adminisztráció**: Tartalom moderálása, felhasználók kezelése.
- **Offline lejátszó**: Windows alapú WinForms alkalmazás MP3/WAV fájlok lejátszására.

## Technológiai stack
- **Frontend**: React, React Router, Axios, CSS Modules, Vite
- **Backend**: Node.js, Express.js, MySQL, Bcrypt, JWT, Multer
- **Adatbázis**: MySQL/MariaDB
- **Asztali alkalmazás**: .NET 6, WinForms, NAudio, TagLib#
- **Fejlesztőeszközök**: Visual Studio Code, ThunderClient, Git, XAMPP

## Rendszerkövetelmények
- **Hardver**: 2 magos CPU, 4 GB RAM, 10 GB tárhely, 10 Mbps internet
- **Szoftver**:
  - Web: Node.js 18+, MySQL 8.0+, npm 9.x+, Git 2.35+
  - Asztali: Windows 10/11, .NET 6 runtime
- **Böngészők**: Modern böngészők (Chrome, Firefox, Edge)

## Telepítés
### Webalkalmazás
1. Klónozd a repository-t:
   ```bash
   git clone <repository-url>
   ```
2. **Backend**:
   - Lépj a `backend` mappába: `cd backend`
   - Telepítsd a függőségeket: `npm install`
   - Hozz létre egy `.env` fájlt (lásd a Backend README-t).
   - Importáld az `outclass.sql` fájlt a phpMyAdmin segítségével.
   - Indítsd el: `npm start`
3. **Frontend**:
   - Lépj a `frontend` mappába: `cd frontend`
   - Telepítsd a függőségeket: `npm install`
   - Indítsd el: `npm run dev`
4. Nyisd meg a böngészőben: `http://localhost:5173`

### Asztali alkalmazás
1. Töltsd le és telepítsd a `Setup.exe` vagy `OutclassAdmin.msi` fájlt.
2. Futtasd a `MusicPlayerWinForms.exe` fájlt.

## Használat
- **Webalkalmazás**:
  - Regisztrálj vagy jelentkezz be a `http://localhost:5173` címen.
  - Keresd, játszd le, töltsd fel vagy töltsd le a zenéket.
  - Hozz létre és kezelj lejátszási listákat.
- **Asztali alkalmazás**:
  - Húzz be MP3/WAV fájlokat, vagy használd az "Upload" gombot.
  - Kattints duplán egy zenére a lejátszáshoz, használd a vezérlőgombokat.

## Továbbfejlesztési lehetőségek
- Natív mobilalkalmazás Androidra és iOS-re.
- Sötét/világos téma és többnyelvű támogatás.
- Közösségi funkciók (kommentelés, megosztás, követés).
- AI alapú zeneajánló és metaadat-felismerés.
- Hangalapú keresés és okoseszköz-támogatás.

## Fejlesztők
- **Celik Alper Fatih**: Frontend és backend fejlesztés, API integráció.
- **Chen Jun Bo**: Autentikációs rendszer, WinForms zenelejátszó.
- **Drávicz Gyula Attila**: Adatbázis tervezés, dokumentáció.

## Licenc
Ez a projekt a BGSZC Logisztikai és Kereskedelmi Technikum és Szakképző Iskola vizsgaremek részeként készült. Minden jog fenntartva.
