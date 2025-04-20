-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 20, 2025 at 09:32 PM
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
CREATE DATABASE IF NOT EXISTS `outclass` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `outclass`;

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
(1, 'Thriller', 1),
(2, 'Back in Black', 2),
(3, 'The Dark Side of the Moon', 3),
(4, 'Rumours', 4),
(5, 'Nevermind', 5),
(6, 'Abbey Road', 6),
(7, 'Purple Rain', 7),
(8, 'Born in the U.S.A.', 8),
(9, 'Hotel California', 9),
(10, 'The Joshua Tree', 10);

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
(1, 'Michael Jackson'),
(2, 'AC/DC'),
(3, 'Pink Floyd'),
(4, 'Fleetwood Mac'),
(5, 'Nirvana'),
(6, 'The Beatles'),
(7, 'Prince'),
(8, 'Bruce Springsteen'),
(9, 'Eagles'),
(10, 'U2');

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
(1, 'Pop'),
(2, 'Rock'),
(3, 'Metal'),
(4, 'Hip Hop'),
(5, 'R&B'),
(6, 'Jazz'),
(7, 'Electronic'),
(8, 'Classical'),
(9, 'Country'),
(10, 'Blues');

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
(1, 'Workout Mix', 2, '2025-04-19 15:40:00', 1),
(2, 'Chill Vibes', 3, '2025-04-19 15:41:00', 4),
(3, 'Road Trip', 4, '2025-04-19 15:42:00', 7),
(4, 'Party Hits', 5, '2025-04-19 15:43:00', 10),
(5, 'Study Focus', 6, '2025-04-19 15:44:00', 2);

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
(1, 'Billie Jean', 1, 1, 1, 2, '/songs/mj_billie_jean.mp3', '/images/thriller.jpg', '2025-04-19 15:45:00'),
(2, 'Back in Black', 2, 2, 2, 3, '/songs/acdc_back_in_black.mp3', '/images/back_in_black.jpg', '2025-04-19 15:46:00'),
(3, 'Comfortably Numb', 3, 3, 2, 4, '/songs/pf_comfortably_numb.mp3', '/images/dark_side.jpg', '2025-04-19 15:47:00'),
(4, 'Go Your Own Way', 4, 4, 2, 5, '/songs/fm_go_your_own_way.mp3', '/images/rumours.jpg', '2025-04-19 15:48:00'),
(5, 'Smells Like Teen Spirit', 5, 5, 2, 6, '/songs/nirvana_smells_like_teen_spirit.mp3', '/images/nevermind.jpg', '2025-04-19 15:49:00'),
(6, 'Come Together', 6, 6, 2, 7, '/songs/beatles_come_together.mp3', '/images/abbey_road.jpg', '2025-04-19 15:50:00'),
(7, 'Purple Rain', 7, 7, 5, 8, '/songs/prince_purple_rain.mp3', '/images/purple_rain.jpg', '2025-04-19 15:51:00'),
(8, 'Born in the U.S.A.', 8, 8, 2, 9, '/songs/springsteen_born_in_usa.mp3', '/images/born_in_usa.jpg', '2025-04-19 15:52:00'),
(9, 'Hotel California', 9, 9, 2, 10, '/songs/eagles_hotel_california.mp3', '/images/hotel_california.jpg', '2025-04-19 15:53:00'),
(10, 'With or Without You', 10, 10, 2, 11, '/songs/u2_with_or_without_you.mp3', '/images/joshua_tree.jpg', '2025-04-19 15:54:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `userEmail` varchar(255) NOT NULL,
  `userPassword` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0,
  `userCreated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `userName`, `userEmail`, `userPassword`, `isAdmin`, `userCreated`) VALUES
(1, 'Aaronder', 'admin@outclass.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, '2025-01-01 00:00:00'),
(2, 'AndroidProYT', 'user2@outclass.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, '2025-01-02 00:00:00'),
(3, 'DJ ZEUSZ', 'user3@outclass.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, '2025-01-03 00:00:00'),
(4, 'Papirtepo', 'user4@outclass.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, '2025-01-04 00:00:00'),
(5, 'escupir', 'user5@outclass.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, '2025-01-05 00:00:00'),
(6, 'Trippie Redd', 'user6@outclass.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, '2025-01-06 00:00:00'),
(7, 'lajos', 'user7@outclass.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, '2025-01-07 00:00:00'),
(8, 'KirályDani', 'user8@outclass.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, '2025-01-08 00:00:00'),
(9, 'The Dead Pool', 'user9@outclass.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, '2025-01-09 00:00:00'),
(10, 'Vorinclex', 'user10@outclass.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, '2025-01-10 00:00:00'),
(11, 'pityupang', 'user11@outclass.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, '2025-01-11 00:00:00'),
(12, 'Zane', 'user12@outclass.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, '2025-01-12 00:00:00'),
(13, 'W3ND3L', 'user13@outclass.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, '2025-01-13 00:00:00'),
(14, 'Gecó Fecó', 'user14@outclass.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, '2025-01-14 00:00:00'),
(15, 'barnafasz', 'user15@outclass.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, '2025-01-15 00:00:00'),
(16, 'doriszkaka', 'user16@outclass.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, '2025-01-16 00:00:00'),
(17, 'hertyu', 'hertyu@outclass.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, '2025-04-19 13:39:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`albumId`),
  ADD KEY `artistId` (`artistId`);

--
-- Indexes for table `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`artistId`);

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`genreId`);

--
-- Indexes for table `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`plId`),
  ADD KEY `plOwnerId` (`plOwnerId`),
  ADD KEY `songId` (`songId`);

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
  ADD UNIQUE KEY `userEmail` (`userEmail`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `albums`
--
ALTER TABLE `albums`
  MODIFY `albumId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `artists`
--
ALTER TABLE `artists`
  MODIFY `artistId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `genreId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `playlists`
--
ALTER TABLE `playlists`
  MODIFY `plId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `songs`
--
ALTER TABLE `songs`
  MODIFY `songId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `albums`
--
ALTER TABLE `albums`
  ADD CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`artistId`) REFERENCES `artists` (`artistId`);

--
-- Constraints for table `playlists`
--
ALTER TABLE `playlists`
  ADD CONSTRAINT `playlists_ibfk_1` FOREIGN KEY (`plOwnerId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `playlists_ibfk_2` FOREIGN KEY (`songId`) REFERENCES `songs` (`songId`);

--
-- Constraints for table `songs`
--
ALTER TABLE `songs`
  ADD CONSTRAINT `songs_ibfk_1` FOREIGN KEY (`artistId`) REFERENCES `artists` (`artistId`),
  ADD CONSTRAINT `songs_ibfk_2` FOREIGN KEY (`albumId`) REFERENCES `albums` (`albumId`),
  ADD CONSTRAINT `songs_ibfk_3` FOREIGN KEY (`genreId`) REFERENCES `genres` (`genreId`),
  ADD CONSTRAINT `songs_ibfk_4` FOREIGN KEY (`songUploaderId`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
