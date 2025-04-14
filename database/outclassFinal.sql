-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2025 at 05:43 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `outclass`
--

-- --------------------------------------------------------

--
-- Table structure for table `albums`
--

CREATE TABLE `albums` (
  `albumId` int(11) NOT NULL,
  `albumName` varchar(255) NOT NULL,
  `artistId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `albums`
--

INSERT INTO `albums` (`albumId`, `albumName`, `artistId`) VALUES
(1, 'Abbey Road', 1),
(2, 'A Night at the Opera', 2),
(3, 'Thriller', 3),
(4, 'Like a Virgin', 4),
(5, 'Led Zeppelin IV', 5),
(6, 'The Dark Side of the Moon', 6),
(7, 'The Rise and Fall of Ziggy Stardust', 7),
(8, 'OK Computer', 8),
(9, 'Parachutes', 9),
(10, 'Random Access Memories', 10),
(11, 'To Pimp a Butterfly', 11),
(12, '1989', 12),
(13, 'When We All Fall Asleep, Where Do We Go?', 13),
(14, 'After Hours', 14),
(15, '21', 15),
(16, 'Revolver', 1),
(17, 'News of the World', 2),
(18, 'Bad', 3),
(19, 'True Blue', 4),
(20, 'Physical Graffiti', 5);

-- --------------------------------------------------------

--
-- Table structure for table `artists`
--

CREATE TABLE `artists` (
  `artistId` int(11) NOT NULL,
  `artistName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `artists`
--

INSERT INTO `artists` (`artistId`, `artistName`) VALUES
(15, 'Adele'),
(13, 'Billie Eilish'),
(9, 'Coldplay'),
(10, 'Daft Punk'),
(7, 'David Bowie'),
(11, 'Kendrick Lamar'),
(5, 'Led Zeppelin'),
(4, 'Madonna'),
(3, 'Michael Jackson'),
(6, 'Pink Floyd'),
(2, 'Queen'),
(8, 'Radiohead'),
(12, 'Taylor Swift'),
(1, 'The Beatles'),
(14, 'The Weeknd');

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `genreId` int(11) NOT NULL,
  `genreName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`genreId`, `genreName`) VALUES
(11, 'Alternative'),
(15, 'Blues'),
(6, 'Classical'),
(8, 'Country'),
(13, 'Disco'),
(4, 'Electronic'),
(12, 'Funk'),
(3, 'Hip Hop'),
(10, 'Indie'),
(5, 'Jazz'),
(9, 'Metal'),
(2, 'Pop'),
(7, 'R&B'),
(14, 'Reggae'),
(1, 'Rock');

-- --------------------------------------------------------

--
-- Table structure for table `playlists`
--

CREATE TABLE `playlists` (
  `plId` int(11) NOT NULL,
  `plName` varchar(255) NOT NULL,
  `plOwnerId` int(11) NOT NULL,
  `plCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `songId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `playlists`
--

INSERT INTO `playlists` (`plId`, `plName`, `plOwnerId`, `plCreated`, `songId`) VALUES
(1, 'Classic Rock Hits', 1, '2024-02-01 09:00:00', 1),
(2, 'Classic Rock Hits', 1, '2024-02-01 09:00:00', 5),
(3, 'Classic Rock Hits', 1, '2024-02-01 09:00:00', 6),
(4, 'Pop Party', 2, '2024-02-02 10:00:00', 3),
(5, 'Pop Party', 2, '2024-02-02 10:00:00', 4),
(6, 'Pop Party', 2, '2024-02-02 10:00:00', 12),
(7, 'Chill Vibes', 3, '2024-02-03 11:00:00', 9),
(8, 'Chill Vibes', 3, '2024-02-03 11:00:00', 14),
(9, 'Chill Vibes', 3, '2024-02-03 11:00:00', 15),
(10, 'Workout Mix', 4, '2024-02-04 12:00:00', 10),
(11, 'Workout Mix', 4, '2024-02-04 12:00:00', 11),
(12, 'Workout Mix', 4, '2024-02-04 12:00:00', 13),
(13, 'Road Trip', 5, '2024-02-05 13:00:00', 2),
(14, 'Road Trip', 5, '2024-02-05 13:00:00', 7),
(15, 'Road Trip', 5, '2024-02-05 13:00:00', 20);

-- --------------------------------------------------------

--
-- Table structure for table `songs`
--

CREATE TABLE `songs` (
  `songId` int(11) NOT NULL,
  `songName` varchar(255) NOT NULL,
  `artistId` int(11) NOT NULL,
  `albumId` int(11) DEFAULT NULL,
  `genreId` int(11) NOT NULL,
  `songUploaderId` int(11) NOT NULL,
  `songPath` varchar(255) NOT NULL,
  `songImage` varchar(255) DEFAULT NULL,
  `songUploadedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `songs`
--

INSERT INTO `songs` (`songId`, `songName`, `artistId`, `albumId`, `genreId`, `songUploaderId`, `songPath`, `songImage`, `songUploadedAt`) VALUES
(1, 'Come Together', 1, 1, 1, 1, 'songs/come_together.mp3', 'abbey_road.jpg', '2024-01-10 09:00:00'),
(2, 'Bohemian Rhapsody', 2, 2, 1, 2, 'songs/bohemian_rhapsody.mp3', 'night_at_opera.jpg', '2024-01-11 10:00:00'),
(3, 'Billie Jean', 3, 3, 2, 3, 'songs/billie_jean.mp3', 'thriller.jpg', '2024-01-12 11:00:00'),
(4, 'Like a Virgin', 4, 4, 2, 4, 'songs/like_a_virgin.mp3', 'like_a_virgin.jpg', '2024-01-13 12:00:00'),
(5, 'Stairway to Heaven', 5, 5, 1, 5, 'songs/stairway_to_heaven.mp3', 'led_zeppelin_iv.jpg', '2024-01-14 13:00:00'),
(6, 'Money', 6, 6, 1, 1, 'songs/money.mp3', 'dark_side.jpg', '2024-01-15 14:00:00'),
(7, 'Ziggy Stardust', 7, 7, 1, 2, 'songs/ziggy_stardust.mp3', 'ziggy.jpg', '2024-01-16 15:00:00'),
(8, 'Paranoid Android', 8, 8, 11, 3, 'songs/paranoid_android.mp3', 'ok_computer.jpg', '2024-01-17 16:00:00'),
(9, 'Yellow', 9, 9, 11, 4, 'songs/yellow.mp3', 'parachutes.jpg', '2024-01-18 17:00:00'),
(10, 'Get Lucky', 10, 10, 4, 5, 'songs/get_lucky.mp3', 'random_access.jpg', '2024-01-19 18:00:00'),
(11, 'Alright', 11, 11, 3, 1, 'songs/alright.mp3', 'pimp_butterfly.jpg', '2024-01-20 19:00:00'),
(12, 'Shake It Off', 12, 12, 2, 2, 'songs/shake_it_off.mp3', '1989.jpg', '2024-01-21 20:00:00'),
(13, 'bad guy', 13, 13, 2, 3, 'songs/bad_guy.mp3', 'when_we_all.jpg', '2024-01-22 21:00:00'),
(14, 'Blinding Lights', 14, 14, 7, 4, 'songs/blinding_lights.mp3', 'after_hours.jpg', '2024-01-23 22:00:00'),
(15, 'Rolling in the Deep', 15, 15, 2, 5, 'songs/rolling_in_deep.mp3', '21.jpg', '2024-01-23 23:00:00'),
(16, 'Eleanor Rigby', 1, 16, 1, 1, 'songs/eleanor_rigby.mp3', 'revolver.jpg', '2024-01-25 00:00:00'),
(17, 'We Will Rock You', 2, 17, 1, 2, 'songs/we_will_rock.mp3', 'news_world.jpg', '2024-01-26 01:00:00'),
(18, 'Smooth Criminal', 3, 18, 2, 3, 'songs/smooth_criminal.mp3', 'bad.jpg', '2024-01-27 02:00:00'),
(19, 'Papa Don\'t Preach', 4, 19, 2, 4, 'songs/papa_dont.mp3', 'true_blue.jpg', '2024-01-28 03:00:00'),
(20, 'Kashmir', 5, 20, 1, 5, 'songs/kashmir.mp3', 'physical_graffiti.jpg', '2024-01-29 04:00:00'),
(21, 'Tunnel Vision', 1, 1, 1, 1, '/path/to/s123131312ng.mp3', '/path/to/image.jpg', '2025-04-06 11:40:38'),
(22, 'Hop On Fortnite', 3, 1, 2, 1, '/path/to/s123131312ng.mp3', '/path/to/image.jpg', '2025-04-06 11:41:06'),
(23, 'log off nigger', 2, 5, 3, 3, '/path/to/s123131312ng.mp3', '/path/to/image.jpg', '2025-04-06 11:41:26'),
(24, 'mejf', 2, 2, 3, 3, '/path/to/s123131312ng.mp3', '/path/to/image.jpg', '2025-04-06 15:30:22'),
(25, 'gayttt', 1, 5, 3, 1, '/path/to/s123131312ng.mp3', '/path/to/image.jpg', '2025-04-06 15:30:37');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `userEmail` varchar(255) NOT NULL,
  `userPassword` varchar(255) NOT NULL,
  `userCreated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `userName`, `userEmail`, `userPassword`, `userCreated`) VALUES
(1, 'john_doe', 'john@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-01 09:00:00'),
(2, 'jane_smith', 'jane@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-02 10:00:00'),
(3, 'music_lover', 'music@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-03 11:00:00'),
(4, 'dj_pro', 'dj@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-04 12:00:00'),
(5, 'song_writer', 'writer@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-05 13:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`albumId`),
  ADD UNIQUE KEY `albumName` (`albumName`),
  ADD KEY `artistId` (`artistId`);

--
-- Indexes for table `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`artistId`),
  ADD UNIQUE KEY `artistName` (`artistName`);

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`genreId`),
  ADD UNIQUE KEY `genreName` (`genreName`);

--
-- Indexes for table `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`plId`),
  ADD KEY `plOwnerId` (`plOwnerId`),
  ADD KEY `fkplaylist_song` (`songId`);

--
-- Indexes for table `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`songId`),
  ADD KEY `artistId` (`artistId`),
  ADD KEY `albumId` (`albumId`),
  ADD KEY `genreId` (`genreId`),
  ADD KEY `songUploaderId` (`songUploaderId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `userName` (`userName`),
  ADD UNIQUE KEY `userEmail` (`userEmail`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `albums`
--
ALTER TABLE `albums`
  MODIFY `albumId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `artists`
--
ALTER TABLE `artists`
  MODIFY `artistId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `genreId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `playlists`
--
ALTER TABLE `playlists`
  MODIFY `plId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `songs`
--
ALTER TABLE `songs`
  MODIFY `songId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `playlists`
--
ALTER TABLE `playlists`
  ADD CONSTRAINT `fkplaylist_song` FOREIGN KEY (`songId`) REFERENCES `songs` (`songId`),
  ADD CONSTRAINT `playlists_ibfk_1` FOREIGN KEY (`plOwnerId`) REFERENCES `users` (`userId`);

--
-- Constraints for table `songs`
--
ALTER TABLE `songs`
  ADD CONSTRAINT `songs_ibfk_1` FOREIGN KEY (`artistId`) REFERENCES `artists` (`artistId`),
  ADD CONSTRAINT `songs_ibfk_2` FOREIGN KEY (`albumId`) REFERENCES `albums` (`albumId`),
  ADD CONSTRAINT `songs_ibfk_3` FOREIGN KEY (`genreId`) REFERENCES `genres` (`genreId`),
  ADD CONSTRAINT `songs_ibfk_5` FOREIGN KEY (`songUploaderId`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
