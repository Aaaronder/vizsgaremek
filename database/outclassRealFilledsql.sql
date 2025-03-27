-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3307
-- Létrehozás ideje: 2025. Már 21. 10:48
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `probafel`
--
CREATE DATABASE IF NOT EXISTS `outclass` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `outclass`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `albums`
--

CREATE TABLE `albums` (
  `albumId` int(11) NOT NULL,
  `albumName` varchar(255) NOT NULL,
  `artistId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `albums`
--

INSERT INTO `albums` (`albumId`, `albumName`, `artistId`) VALUES
(1, 'Currents', 1),
(2, 'The Slow Rush', 1),
(3, 'Synkronized', 2),
(4, 'Love + War', 3),
(5, 'Demon Days', 4),
(6, 'Plastic Beach', 4),
(7, 'AmeriKKKa’s Most Wanted', 5),
(8, 'you broke me first', 6),
(9, 'i used to think i could fly', 6),
(10, 'A Funk Odyssey', 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `artists`
--

CREATE TABLE `artists` (
  `artistId` int(11) NOT NULL,
  `artistName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `artists`
--

INSERT INTO `artists` (`artistId`, `artistName`) VALUES
(4, 'Gorillaz'),
(5, 'Ice Cube'),
(2, 'Jamiroquai'),
(3, 'Kwabs'),
(1, 'Tame Impala'),
(6, 'Tate McRae');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `genres`
--

CREATE TABLE `genres` (
  `genreId` int(11) NOT NULL,
  `genreName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `genres`
--

INSERT INTO `genres` (`genreId`, `genreName`) VALUES
(4, 'Alternative'),
(7, 'Electronic'),
(2, 'Funk'),
(5, 'Hip-Hop'),
(8, 'Indie Pop'),
(6, 'Pop'),
(1, 'Psychedelic Rock'),
(3, 'Soul');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `instruments`
--

CREATE TABLE `instruments` (
  `instrumentId` int(11) NOT NULL,
  `instrumentName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `instruments`
--

INSERT INTO `instruments` (`instrumentId`, `instrumentName`) VALUES
(2, 'Bass Guitar'),
(4, 'Drums'),
(1, 'Guitar'),
(3, 'Keyboards'),
(8, 'Piano'),
(5, 'Synthesizer'),
(7, 'Turntables'),
(6, 'Vocals');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `playlists`
--

CREATE TABLE `playlists` (
  `plId` int(11) NOT NULL,
  `plName` varchar(255) NOT NULL,
  `plOwnerId` int(11) NOT NULL,
  `plCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `songId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `playlists`
--

INSERT INTO `playlists` (`plId`, `plName`, `plOwnerId`, `plCreated`, `songId`) VALUES
(1, 'Psychedelic Vibes', 1, '2024-05-15 06:00:00', 1),
(2, 'Funk Grooves', 2, '2024-05-20 10:00:00', 3),
(3, 'Soulful Tunes', 3, '2024-05-25 13:30:00', 5),
(4, 'Alt Jams', 4, '2024-06-01 07:45:00', 6),
(5, 'Rap Classics', 5, '2024-06-05 12:20:00', 8),
(6, 'Pop Hits', 6, '2024-06-10 09:10:00', 10),
(7, 'Tame Impala Mix', 7, '2024-06-15 14:00:00', 2),
(8, 'Gorillaz Party', 8, '2024-06-20 08:25:00', 7),
(9, 'Chill Indie', 9, '2024-06-25 11:40:00', 11),
(10, 'Dance Floor Funk', 10, '2024-07-01 15:15:00', 15);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `songs`
--

CREATE TABLE `songs` (
  `songId` int(11) NOT NULL,
  `songName` varchar(255) NOT NULL,
  `artistId` int(11) NOT NULL,
  `albumId` int(11) DEFAULT NULL,
  `genreId` int(11) NOT NULL,
  `songUploaderId` int(11) NOT NULL,
  `instrumentId` int(11) DEFAULT NULL,
  `songPath` varchar(255) NOT NULL,
  `songImage` varchar(255) DEFAULT NULL,
  `songUploadedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `songs`
--

INSERT INTO `songs` (`songId`, `songName`, `artistId`, `albumId`, `genreId`, `songUploaderId`, `instrumentId`, `songPath`, `songImage`, `songUploadedAt`) VALUES
(1, 'The Less I Know the Better', 1, 1, 1, 1, 1, '/songs/less_i_know.mp3', 'less_i_know.jpg', '2024-03-01 09:00:00'),
(2, 'Let It Happen', 1, 1, 1, 2, 5, '/songs/let_it_happen.mp3', NULL, '2024-03-05 13:30:00'),
(3, 'Cosmic Girl', 2, 3, 2, 3, 3, '/songs/cosmic_girl.mp3', 'cosmic_girl.jpg', '2024-03-10 08:15:00'),
(4, 'Canned Heat', 2, 3, 2, 4, 2, '/songs/canned_heat.mp3', NULL, '2024-03-15 15:45:00'),
(5, 'Walk', 3, 4, 3, 5, 6, '/songs/walk.mp3', 'walk.jpg', '2024-03-20 10:20:00'),
(6, 'Feel Good Inc.', 4, 5, 4, 6, 7, '/songs/feel_good_inc.mp3', 'feel_good.jpg', '2024-03-25 12:10:00'),
(7, 'Clint Eastwood', 4, 5, 4, 7, 5, '/songs/clint_eastwood.mp3', NULL, '2024-04-01 13:00:00'),
(8, 'It Was a Good Day', 5, 7, 5, 8, 6, '/songs/good_day.mp3', 'good_day.jpg', '2024-04-05 06:30:00'),
(9, 'Check Yo Self', 5, 7, 5, 9, 7, '/songs/check_yo_self.mp3', NULL, '2024-04-10 10:00:00'),
(10, 'you broke me first', 6, 8, 6, 10, 8, '/songs/you_broke_me_first.mp3', 'you_broke.jpg', '2024-04-15 15:25:00'),
(11, 'she’s all i wanna be', 6, 9, 8, 1, 8, '/songs/shes_all.mp3', 'shes_all.jpg', '2024-04-20 07:45:00'),
(12, 'Borderline', 1, 2, 1, 2, 1, '/songs/borderline.mp3', NULL, '2024-04-25 12:15:00'),
(13, 'Love + War', 3, 4, 3, 3, 6, '/songs/love_war.mp3', 'love_war.jpg', '2024-05-01 08:30:00'),
(14, 'Dare', 4, 5, 4, 4, 5, '/songs/dare.mp3', NULL, '2024-05-05 14:00:00'),
(15, 'Virtual Insanity', 2, 10, 2, 5, 3, '/songs/virtual_insanity.mp3', 'virtual.jpg', '2024-05-10 09:50:00');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `userEmail` varchar(255) NOT NULL,
  `userPassword` varchar(255) NOT NULL,
  `userPp` varchar(255) DEFAULT NULL,
  `userCreated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`userId`, `userName`, `userEmail`, `userPassword`, `userPp`, `userCreated`) VALUES
(1, 'john_doe', 'john.doe@email.com', 'hashedpass123', 'profile1.jpg', '2024-01-10 07:00:00'),
(2, 'jane_smith', 'jane.smith@email.com', 'hashedpass456', 'profile2.jpg', '2024-02-15 11:30:00'),
(3, 'rockfan99', 'rockfan99@email.com', 'hashedpass789', NULL, '2024-03-01 14:45:00'),
(4, 'poplover', 'poplover@email.com', 'hashedpass101', 'profile3.jpg', '2024-04-20 07:15:00'),
(5, 'jazzguy', 'jazzguy@email.com', 'hashedpass202', NULL, '2024-05-05 15:00:00'),
(6, 'metalhead', 'metalhead@email.com', 'hashedpass303', 'profile4.jpg', '2024-06-10 12:20:00'),
(7, 'edmlistener', 'edm@email.com', 'hashedpass404', NULL, '2024-07-01 08:10:00'),
(8, 'folkfan', 'folkfan@email.com', 'hashedpass505', 'profile5.jpg', '2024-08-15 11:25:00'),
(9, 'hiphopking', 'hiphop@email.com', 'hashedpass606', NULL, '2024-09-20 14:40:00'),
(10, 'indielover', 'indie@email.com', 'hashedpass707', 'profile6.jpg', '2024-10-25 09:55:00');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`albumId`),
  ADD UNIQUE KEY `albumName` (`albumName`),
  ADD KEY `artistId` (`artistId`);

--
-- A tábla indexei `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`artistId`),
  ADD UNIQUE KEY `artistName` (`artistName`);

--
-- A tábla indexei `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`genreId`),
  ADD UNIQUE KEY `genreName` (`genreName`);

--
-- A tábla indexei `instruments`
--
ALTER TABLE `instruments`
  ADD PRIMARY KEY (`instrumentId`),
  ADD UNIQUE KEY `instrumentName` (`instrumentName`);

--
-- A tábla indexei `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`plId`),
  ADD KEY `plOwnerId` (`plOwnerId`),
  ADD KEY `fkplaylist_song` (`songId`);

--
-- A tábla indexei `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`songId`),
  ADD KEY `artistId` (`artistId`),
  ADD KEY `albumId` (`albumId`),
  ADD KEY `genreId` (`genreId`),
  ADD KEY `instrumentId` (`instrumentId`),
  ADD KEY `songUploaderId` (`songUploaderId`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `userName` (`userName`),
  ADD UNIQUE KEY `userEmail` (`userEmail`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `albums`
--
ALTER TABLE `albums`
  MODIFY `albumId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `artists`
--
ALTER TABLE `artists`
  MODIFY `artistId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `genres`
--
ALTER TABLE `genres`
  MODIFY `genreId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `instruments`
--
ALTER TABLE `instruments`
  MODIFY `instrumentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `playlists`
--
ALTER TABLE `playlists`
  MODIFY `plId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `songs`
--
ALTER TABLE `songs`
  MODIFY `songId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `playlists`
--
ALTER TABLE `playlists`
  ADD CONSTRAINT `fkplaylist_song` FOREIGN KEY (`songId`) REFERENCES `songs` (`songId`),
  ADD CONSTRAINT `playlists_ibfk_1` FOREIGN KEY (`plOwnerId`) REFERENCES `users` (`userId`);

--
-- Megkötések a táblához `songs`
--
ALTER TABLE `songs`
  ADD CONSTRAINT `songs_ibfk_1` FOREIGN KEY (`artistId`) REFERENCES `artists` (`artistId`),
  ADD CONSTRAINT `songs_ibfk_2` FOREIGN KEY (`albumId`) REFERENCES `albums` (`albumId`),
  ADD CONSTRAINT `songs_ibfk_3` FOREIGN KEY (`genreId`) REFERENCES `genres` (`genreId`),
  ADD CONSTRAINT `songs_ibfk_4` FOREIGN KEY (`instrumentId`) REFERENCES `instruments` (`instrumentId`),
  ADD CONSTRAINT `songs_ibfk_5` FOREIGN KEY (`songUploaderId`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
