# Outclass - Asztali alkalmazás README

## Projekt áttekintés
Az Outclass asztali alkalmazás egy Windows alapú, offline zenelejátszó, amely lehetővé teszi MP3 és WAV fájlok lejátszását internetkapcsolat nélkül. A WinForms technológiával készült, egyszerű és felhasználóbarát felülettel.

## Főbb funkciók
- **Fájl importálás**: MP3/WAV fájlok feltöltése drag & drop módszerrel vagy fájlválasztóval.
- **Lejátszás vezérlés**: Lejátszás, szünet, előző/következő szám, törlés.
- **Metaadatok kezelése**: Cím, előadó, hossz automatikus kitöltése.
- **Állapot csúszka**: Aktuális idő kijelzése, ugrás a zene adott pontjára.
- **Hangerő szabályzás**: Hangerő csúszka.
- **Billentyűparancsok**: Space (lejátszás/szünet), ← → (előző/következő), Delete (törlés).

## Technológiai stack
- **.NET 6**: Futáskörnyezet.
- **WinForms**: Grafikus felület.
- **NAudio**: Zenelejátszás.
- **TagLib#**: Metaadatok kezelése.

## Rendszerkövetelmények
- **Operációs rendszer**: Windows 10/11 (x64)
- **.NET 6 vagy újabb** runtime
- **Hardver**: 2 magos CPU, 2 GB RAM, 50 MB tárhely

## Telepítés
1. Töltsd le a `Setup.exe` vagy `OutclassAdmin.msi` telepítőt a repository-ból.
2. Futtasd a telepítőt és kövesd az utasításokat.
3. Indítsd el az alkalmazást a `MusicPlayerWinForms.exe` futtatásával.

## Használat
1. Húzz be MP3 vagy WAV fájlokat az alkalmazás felületére, vagy használd az "Upload" gombot.
2. Kattints duplán egy zenére, vagy használd a lejátszás gombot.
3. Használd az előző/következő gombokat a váltáshoz, a csúszkát az időbeli ugráshoz, és a hangerő szabályzót.

## Fejlesztési megjegyzések
- Az eseményvezérelt GUI és az aszinkron lejátszás összehangolása deadlock-mentes.
- A metaadatok automatikus kitöltése TagLib# segítségével történik.
- A billentyűparancsok növelik a használhatóságot.
