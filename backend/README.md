# Outclass - Backend README

## Projekt áttekintés
Az Outclass backend egy Node.js és Express.js alapú REST API, amely a zenei streaming platform szerveroldali logikáját kezeli. Biztosítja a felhasználókezelést, zenei tartalom kezelését, hitelesítést és fájlkezelést.

## Főbb funkciók
- **Felhasználókezelés**: Regisztráció, bejelentkezés, adatkezelés JWT alapú hitelesítéssel.
- **Zenei tartalom kezelése**: MP3 fájlok feltöltése és letöltése (max. 5 MB), metaadatok tárolása.
- **Keresés és szűrés**: Előadó, műfaj, album vagy dalcím alapú szűrés.
- **Adminisztráció**: Tartalom moderálása, felhasználók kezelése.
- **Biztonság**: Jelszavak titkosítása bcrypt segítségével, JWT token alapú hitelesítés.

## Technológiai stack
- **Node.js 18**: Futáskörnyezet.
- **Express.js 4.x**: REST API keretrendszer.
- **MySQL/MariaDB**: Adatbáziskezelés.
- **Bcrypt**: Jelszó titkosítás.
- **JWT**: Hitelesítés.
- **Multer**: Fájlfeltöltés kezelése.

## Fejlesztőkörnyezet beállítása
### Előfeltételek
- Node.js 18 vagy újabb
- npm 9.x vagy újabb
- MySQL 8.0 vagy újabb
- Git 2.35 vagy újabb
- XAMPP (Apache és MySQL szerverhez)

### Telepítés
1. Klónozd a repository-t:
   ```bash
   git clone <repository-url>
   ```
2. Lépj a backend mappába:
   ```bash
   cd backend
   ```
3. Telepítsd a függőségeket:
   ```bash
   npm install
   ```
4. Hozz létre egy `.env` fájlt a következő tartalommal:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=outclass
   DB_PORT=3306
   JWT_SECRET=kulcsocska
   NODE_ENV=development
   ```
5. Importáld az adatbázis sémát (`outclass.sql`) a phpMyAdmin felületen keresztül.
6. Indítsd el a szervert:
   ```bash
   npm start
   ```

### API végpontok
- `POST /users/register`: Felhasználó regisztráció.
- `POST /users/login`: Bejelentkezés.
- `GET /songs/download/:songId`: Zene letöltése.
- `POST /songs/upload`: Zene feltöltése.
- `GET /songs`: Zenék keresése és szűrése.

## Használat
- A backend alapértelmezett portja: `http://localhost:3000`.
- Teszteld az API-t ThunderClient vagy Postman segítségével.
- Ellenőrizd az adatbázis kapcsolatot a `.env` fájl beállításaival.

## Fejlesztési megjegyzések
- Az API végpontok REST elvek szerint vannak kialakítva.
- A fájlfeltöltés Multer middleware-rel történik, méretkorlátozással (5 MB).
- A hibakezelés centralizált, a válaszok JSON formátumban érkeznek.
