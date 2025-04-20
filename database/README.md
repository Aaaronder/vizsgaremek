# Outclass - Adatbázis Dokumentáció

## Áttekintés

Ez a dokumentum az Outclass zenei streaming platform adatbázisát ismerteti. Az adatbázis előadókkal, albumokkal, dalokkal, műfajokkal, felhasználókkal és lejátszási listákkal kapcsolatos információkat tárol.

## Adatbázis Sémája

### Táblák

1. artists (előadók)
   - Leírás: Előadók adatait tárolja
   - Mezők:
     * artistId (INT, PRIMARY KEY) - Az előadó egyedi azonosítója
     * artistName (VARCHAR(255)) - Az előadó neve

2. albums (albumok)
   - Leírás: Album információkat tárol, kapcsolódik az előadókhoz
   - Mezők:
     * albumId (INT, PRIMARY KEY) - Az album egyedi azonosítója
     * albumName (VARCHAR(255)) - Az album címe
     * artistId (INT, FOREIGN KEY) - Az előadó azonosítója

3. genres (műfajok)
   - Leírás: Elérhető zenei műfajok listája
   - Mezők:
     * genreId (INT, PRIMARY KEY) - A műfaj egyedi azonosítója
     * genreName (VARCHAR(255)) - A műfaj neve

4. users (felhasználók)
   - Leírás: Platform felhasználói fiókok
   - Mezők:
     * userId (INT, PRIMARY KEY) - A felhasználó egyedi azonosítója
     * userName (VARCHAR(255)) - A felhasználó megjelenítendő neve
     * userEmail (VARCHAR(255)) - A felhasználó email címe (egyedi)
     * userPassword (VARCHAR(255)) - A jelszó hash-elt formában
     * isAdmin (TINYINT(1)) - Admin jogosultság (1 = admin, 0 = sima felhasználó)
     * userCreated (TIMESTAMP) - A fiók létrehozásának időbélyege

5. songs (dalok)
   - Leírás: Az összes dal információja metaadatokkal együtt
   - Mezők:
     * songId (INT, PRIMARY KEY) - A dal egyedi azonosítója
     * songName (VARCHAR(255)) - A dal címe
     * artistId (INT, FOREIGN KEY) - Az előadó azonosítója
     * albumId (INT, FOREIGN KEY) - Az album azonosítója (opcionális)
     * genreId (INT, FOREIGN KEY) - A műfaj azonosítója
     * songUploaderId (INT, FOREIGN KEY) - A feltöltő felhasználó azonosítója
     * songPath (VARCHAR(255)) - A dal fájl elérési útja
     * songImage (VARCHAR(255)) - A dalhoz tartozó borítóképe
     * songUploadedAt (TIMESTAMP) - A feltöltés időbélyege

6. playlists (lejátszási listák)
   - Leírás: Felhasználók által létrehozott lejátszási listák
   - Mezők:
     * plId (INT, PRIMARY KEY) - A lejátszási lista egyedi azonosítója
     * plName (VARCHAR(255)) - A lejátszási lista neve
     * plOwnerId (INT, FOREIGN KEY) - A tulajdonos felhasználó azonosítója
     * plCreated (TIMESTAMP) - A lista létrehozásának időbélyege
     * songId (INT, FOREIGN KEY) - A lejátszási listában szereplő dal azonosítója

## Kapcsolatok

- Előadó (1) → Album (n): Egy előadónak több albuma lehet
- Előadó (1) → Dal (n): Egy előadónak több dala lehet
- Album (1) → Dal (n): Egy albumhoz több dal tartozhat
- Felhasználó (1) → Lejátszási lista (n): Egy felhasználónak több lejátszási listája lehet

Alapértelmezett jelszó (minden fiókhoz): password (hash-elt formában)

## Technikai információk

- Adatbázis rendszer: MariaDB 10.4.32
- Karakterkészlet: utf8mb4
- Collation: utf8mb4_general_ci
- PHP verzió: 8.2.12
