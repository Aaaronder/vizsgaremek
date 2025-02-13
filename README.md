1.	Projekt tervezése
a)	Követelmények meghatározása
A projekt első lépése a követelmények pontos és részletes meghatározása. Ebbe beletartozik mind a funkcionális, mind a nem funkcionális igények rögzítését, hogy a fejlesztés során minden elvárásnak megfelelően haladhassunk.
•	Funkcionális igények:
o	Felhasználók regisztrálása, bejelentkezése
o	Zenei adatbázis kezelése (előadók, stílusok, hangszerek)
o	Keresési lehetőségek biztosítása
o	Saját zene feltöltése, letörlése
o	Zenék letöltése
o	Lejátszási listák létrehozása, módosítása, törlése
•	Nem funkcionális igények:
o	Felhasználó barát, reszponzív felület
o	Adatbiztonság (pl.: jelszavak titkosítása)
o	Gyors, hatékony adatkezelés
b)	Adatbázis tervezése
Példa adatbázis struktúra
•	Users: felhasználók adatai (ID, név, email, jelszó)
•	Songs: dalok adatai (ID, cím, előadó, stílus, hangszerek)
•	Playlists: lejátszási listák (ID, név, felhasználó ID)

2.	Fejlesztői környezet beállítása
•	Nyelv: C# (windows forms, wpf), webes környezet esetén JavaScript
•	Frontend: HTML, CSS, JavaScript
•	Adatbázis: MySQL
•	Framework: ha webes, ASP.NET Core; asztali alkalmazás esetén .NET Windows Forms
•	Fejlesztői eszközök: Visual Studio, Git verziókövetés

3.	Felhasználói felület kialakítása
a)	Regisztráció, bejelentkezés
•	Regisztrációs űrlap (név, e-mail, jelszó, profilkép)
•	Bejelentkezési felület
b)	Fő funkciók UI
•	Keresés (szűrők: előadó, hangszerek, stílus)
o	Zeneajánló 
o	Szűrés (előadó, hangszerek, stílus) 
o	Keresősáv
•	Könyvtár
o	Kedvelt zenék
o	Custom lejátszási listák (zenék hozzáadása, törlése)
•	Zenelejátszó
o	Mindig jelenlévő ’overlay’ egyszerű vezérlőkkel (szünet, lejátszás, következő)
•	Profil
o	Személyes adatok
o	Zene feltöltő (saját zenék)

4.	Backend fejlesztés
A backend fejlesztése során az adatbázis-kezelés, a felhasználói funkciók megvalósítása és a rendszer logikai rétegének kidolgozása kap kiemelt szerepet. Ez a rész biztosítja az adatok biztonságos tárolását, kezelését, valamint a frontend és az adatbázis közötti kommunikációt.
a)	Adatbázis kezelés
•	Kapcsolat létrehozása az adatbázissal
•	CRUD műveletek (Create, Read, Update, Delete) megvalósítása
b)	Felhasználói funkciók
•	Felhasználói regisztráció (jelszó titkosítása)
•	Bejelentkezési folyamat (auth tokenek, session kezelés)
•	Keresési logika (előadó, stílus szerint)
•	Lejátszási listák létrehozása, módosítása, törlése
c)	Felhasználói funkciók
1.	Felhasználókezelés
•	POST /users/register - Új felhasználó regisztrálása (név, e-mail, jelszó megadásával)
•	POST /users/login - Felhasználó bejelentkezése
•	POST /users/logout - Felhasználó kijelentkezése
•	GET /users/me - Aktuális felhasználói adatok lekérdezése
•	PUT /users/me - Felhasználói profil módosítása
2.	Zenék kezelése
Előadók
•	GET /artists - Előadók listázása, opcionális szűrés (név vagy stílus alapján)
•	GET /artists/{id} - Egy adott előadó részletei
•	POST /artists - Új előadó létrehozása (adminisztrátoroknak vagy jogosult felhasználóknak)
•	PUT /artists/{id} - Előadó adatainak módosítása
•	DELETE /artists/{id} - Előadó törlése
