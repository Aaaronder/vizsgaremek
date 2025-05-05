# Outclass - Adatbázis README

## Projekt áttekintés
Az Outclass adatbázis egy MySQL/MariaDB alapú relációs adatbázis, amely a zenei streaming platform adatait tárolja, beleértve a felhasználókat, zenéket, előadókat, albumokat, műfajokat és lejátszási listákat.

## Adatbázis struktúra
Az adatbázis 6 fő táblából áll, amelyek a következő adatokat tárolják:

### Users
- **Cél**: Felhasználók adatainak tárolása.
- **Oszlopok**:
  - `userId`: INT, elsődleges kulcs
  - `userName`: VARCHAR(255)
  - `userEmail`: VARCHAR(255)
  - `userPassword`: VARCHAR(255), titkosítva
  - `isAdmin`: TINYINT(1)
  - `userCreated`: TIMESTAMP

### Artists
- **Cél**: Előadók tárolása.
- **Oszlopok**:
  - `artistId`: INT, elsődleges kulcs
  - `artistName`: VARCHAR(255)

### Albums
- **Cél**: Albumok tárolása.
- **Oszlopok**:
  - `albumId`: INT, elsődleges kulcs
  - `albumName`: VARCHAR(255)
  - `artistId`: INT, idegen kulcs

### Genres
- **Cél**: Műfajok tárolása.
- **Oszlopok**:
  - `genreId`: INT, elsődleges kulcs
  - `genreName`: VARCHAR(255)

### Songs
- **Cél**: Zenék és metaadatok tárolása.
- **Oszlopok**:
  - `songId`: INT, elsődleges kulcs
  - `songName`: VARCHAR(255)
  - `artistId`, `albumId`, `genreId`, `songUploaderId`: INT, idegen kulcsok
  - `songPath`, `songImage`: VARCHAR(255)
  - `songUploadedAt`: TIMESTAMP

### Playlists
- **Cél**: Lejátszási listák tárolása.
- **Oszlopok**:
  - `plId`: INT, elsődleges kulcs
  - `plName`: VARCHAR(255)
  - `plOwnerId`: INT, idegen kulcs
  - `plCreated`: TIMESTAMP
  - `songIds`: INT, idegen kulcs

## Kapcsolatok
- `Users` -> `Songs` (feltöltő)
- `Users` -> `Playlists` (tulajdonos)
- `Artists` -> `Albums`, `Songs`
- `Albums` -> `Songs`
- `Genres` -> `Songs`
- `Songs` -> `Playlists`

## Telepítés
1. Telepítsd a XAMPP-ot, és indítsd el az Apache és MySQL szolgáltatásokat.
2. Nyisd meg a phpMyAdmin felületet a MySQL "Admin" gombjával.
3. Importáld a `outclass.sql` fájlt a repository-ból.
4. Ellenőrizd a `.env` fájlban a következő beállításokat:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=outclass
   DB_PORT=3306
   ```

## Fejlesztési megjegyzések
- Az adatbázis normalizált, az adatredundancia elkerülése érdekében.
- Az idegen kulcsok biztosítják az adatok integritását.
- A jelszavak bcrypt titkosítással vannak tárolva.
