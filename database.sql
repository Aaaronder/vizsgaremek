-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 05, 2025 at 09:28 PM
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
-- Database: `yolo`
--

-- --------------------------------------------------------

--
-- Table structure for table `playlists`
--

CREATE TABLE `playlists` (
  `plId` int(11) NOT NULL,
  `plName` varchar(255) NOT NULL,
  `plOwnerId` int(11) NOT NULL,
  `plCreated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `plsongs`
--

CREATE TABLE `plsongs` (
  `id` int(11) NOT NULL,
  `plId` int(11) NOT NULL,
  `songId` int(11) NOT NULL,
  `addedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `songs`
--

CREATE TABLE `songs` (
  `songId` int(11) NOT NULL,
  `songName` varchar(255) NOT NULL,
  `songArtist` varchar(255) NOT NULL,
  `songAlbum` varchar(255) DEFAULT NULL,
  `songGenre` varchar(255) NOT NULL,
  `songInstrument` varchar(255) DEFAULT NULL,
  `songPath` varchar(255) NOT NULL,
  `songImage` varchar(255) DEFAULT NULL,
  `songUploaderId` int(11) NOT NULL,
  `songUploadedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
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
-- Indexes for dumped tables
--

--
-- Indexes for table `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`plId`),
  ADD KEY `plOwnerId` (`plOwnerId`);

--
-- Indexes for table `plsongs`
--
ALTER TABLE `plsongs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `plId` (`plId`),
  ADD KEY `songId` (`songId`);

--
-- Indexes for table `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`songId`),
  ADD KEY `songUploaderId` (`songUploaderId`),
  ADD KEY `idx_song_search` (`songArtist`,`songGenre`,`songInstrument`);

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
-- AUTO_INCREMENT for table `playlists`
--
ALTER TABLE `playlists`
  MODIFY `plId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `plsongs`
--
ALTER TABLE `plsongs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `songs`
--
ALTER TABLE `songs`
  MODIFY `songId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `playlists`
--
ALTER TABLE `playlists`
  ADD CONSTRAINT `playlists_ibfk_1` FOREIGN KEY (`plOwnerId`) REFERENCES `users` (`userId`);

--
-- Constraints for table `plsongs`
--
ALTER TABLE `plsongs`
  ADD CONSTRAINT `plsongs_ibfk_1` FOREIGN KEY (`plId`) REFERENCES `playlists` (`plId`),
  ADD CONSTRAINT `plsongs_ibfk_2` FOREIGN KEY (`songId`) REFERENCES `songs` (`songId`);

--
-- Constraints for table `songs`
--
ALTER TABLE `songs`
  ADD CONSTRAINT `songs_ibfk_1` FOREIGN KEY (`songUploaderId`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
