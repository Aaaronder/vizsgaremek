-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 03, 2025 at 03:25 PM
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
(1, 'Insanity', 1),
(2, 'Crab Rangoon', 2),
(3, 'Sins of the Father', 3),
(4, 'The American Nightmare', 4),
(5, 'We want more!', 5),
(6, 'Vanilla', 6),
(7, 'Firewatch', 7),
(8, 'Portal', 8),
(9, 'Watch em dawgs', 9),
(10, 'Pre-Casino', 10);

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
(1, 'Skrillex'),
(2, 'PANJABI MC & The Clash'),
(3, 'The Platters'),
(4, 'Michael Hunter'),
(5, 'Martin Schioeler'),
(6, 'C418'),
(7, 'Chris Remo'),
(8, 'Mike Morasky'),
(9, 'Shanghaied'),
(10, 'MC Eiht & Freddie Gibbs');

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
(3, 'Jazz'),
(4, 'Classical'),
(5, 'Hip-Hop'),
(6, 'Rap'),
(7, 'Electronic'),
(8, 'Dance'),
(9, 'Reggae'),
(10, 'Blues'),
(11, 'Country'),
(12, 'Folk'),
(13, 'Soul'),
(14, 'R&B'),
(15, 'Metal'),
(16, 'Punk'),
(17, 'Indie'),
(18, 'Alternative'),
(19, 'Funk'),
(20, 'Gospel'),
(21, 'Techno'),
(22, 'House'),
(23, 'Trance'),
(24, 'Dubstep'),
(25, 'Drum and Bass'),
(26, 'Ambient'),
(27, 'Chillout'),
(28, 'Grunge'),
(29, 'Ska'),
(30, 'Disco'),
(31, 'Latin'),
(32, 'Salsa'),
(33, 'Reggaeton'),
(34, 'K-Pop'),
(35, 'J-Pop'),
(36, 'World Music'),
(37, 'New Wave'),
(38, 'Synthpop'),
(39, 'Baroque'),
(40, 'Opera'),
(41, 'Bluegrass'),
(42, 'Swing'),
(43, 'Big Band'),
(44, 'Trap'),
(45, 'Grime'),
(46, 'Emo'),
(47, 'Post-Rock'),
(48, 'Shoegaze'),
(49, 'Progressive Rock'),
(50, 'Psychedelic');

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
(1, 'Workout', 2, '2025-05-03 13:09:54', 1),
(2, 'Road Trip', 2, '2025-05-03 13:09:54', 6);

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
(1, 'Make It Bun Dem', 1, 1, 9, 1, '/uploads/songs/song1.mp3', '/uploads/images/cover1.jpg', '2025-05-03 13:09:54'),
(2, 'Jogi', 2, 2, 5, 1, '/uploads/songs/song2.mp3', '/uploads/images/cover2.jpg', '2025-05-03 13:09:54'),
(3, 'Only You', 3, 3, 2, 1, '/uploads/songs/song3.mp3', '/uploads/images/cover3.jpg', '2025-05-03 13:09:54'),
(4, 'Should I Stay or Should I Go', 2, 2, 2, 1, '/uploads/songs/song4.mp3', '/uploads/images/cover4.jpg', '2025-05-03 13:09:54'),
(5, 'Soviet Connection', 4, 4, 5, 1, '/uploads/songs/song5.mp3', '/uploads/images/cover5.jpg', '2025-05-03 13:09:54'),
(6, 'Sudden Death', 5, 5, 17, 1, '/uploads/songs/song6.mp3', '/uploads/images/cover6.jpg', '2025-05-03 13:09:54'),
(7, 'Time Limit', 5, 5, 17, 1, '/uploads/songs/song7.mp3', '/uploads/images/cover7.jpg', '2025-05-03 13:09:54'),
(8, 'Aria Math', 6, 6, 17, 1, '/uploads/songs/song8.mp3', '/uploads/images/cover8.jpg', '2025-05-03 13:09:54'),
(9, 'Prologue', 7, 7, 17, 1, '/uploads/songs/song9.mp3', '/uploads/images/cover9.jpg', '2025-05-03 13:09:54'),
(10, 'Science Is Fun', 8, 8, 17, 1, '/uploads/songs/song10.mp3', '/uploads/images/cover10.jpg', '2025-05-03 13:09:54'),
(11, 'Dead Sec', 9, 9, 17, 1, '/uploads/songs/song11.mp3', '/uploads/images/cover11.jpg', '2025-05-03 13:09:54'),
(12, 'Welcome To Los Santos', 10, 10, 5, 1, '/uploads/songs/song12.mp3', '/uploads/images/cover12.jpg', '2025-05-03 13:09:54');

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
(1, 'Outclass Admin', 'admin@outclass.com', 'admin1234', 1, '2025-05-03 13:09:54'),
(2, 'User1', 'user1@outclass.com', 'user1234', 0, '2025-05-03 13:09:54'),
(3, 'hertyu', 'hertyu@outclass.com', '$2b$10$UYTYNOKPnc9uqPhvF/olR.dd2OC84kPGXEiO.eGbcskK7todJo7EG', 0, '2025-05-03 13:13:25');

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
  MODIFY `genreId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `playlists`
--
ALTER TABLE `playlists`
  MODIFY `plId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `songs`
--
ALTER TABLE `songs`
  MODIFY `songId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
