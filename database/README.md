# Adatbázis README

Ez a dokumentáció a Outclass adatbázisának struktúráját tartalmazza.

## Adatbázis szerkezete

### **Tablák**

A következő táblák találhatók az adatbázisban:

- **`albums`** – Az albumok táblája, amely tartalmazza az albumok nevét és a hozzájuk tartozó művész azonosítóját.
- **`artists`** – A művészek táblája, amely tartalmazza a művész nevét.
- **`genres`** – A műfajok táblája, amely tartalmazza a műfaj nevét.
- **`instruments`** – A hangszerek táblája, amely tartalmazza a hangszer nevét.
- **`playlists`** – A lejátszási listák táblája, amely tartalmazza a lista nevét, a lista tulajdonosát és a hozzá tartozó zenéket.
- **`songs`** – A zenék táblája, amely tartalmazza a zene nevét, a művész azonosítóját, az albumot, műfajt, hangszert és az feltöltő felhasználó adatait.
- **`users`** – A felhasználók táblája, amely tartalmazza a felhasználók nevét, e-mail címét, jelszavát és profilképét.
