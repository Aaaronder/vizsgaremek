-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 16, 2025 at 04:49 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

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
(1, 'Album1', 1),
(2, 'Album2', 2),
(3, 'Album3', 3),
(4, 'Album4', 4),
(5, 'Album5', 5),
(6, 'Album6', 6),
(7, 'Album7', 7),
(8, 'Album8', 8),
(9, 'Album9', 9),
(10, 'Album10', 10);

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
(1, 'Artist1'),
(10, 'Artist10'),
(2, 'Artist2'),
(3, 'Artist3'),
(4, 'Artist4'),
(5, 'Artist5'),
(6, 'Artist6'),
(7, 'Artist7'),
(8, 'Artist8'),
(9, 'Artist9');

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
(7, 'Blues'),
(4, 'Classical'),
(8, 'Country'),
(6, 'Electronic'),
(5, 'Hip-Hop'),
(3, 'Jazz'),
(10, 'Metal'),
(2, 'Pop'),
(9, 'Reggae'),
(1, 'Rock');

-- --------------------------------------------------------

--
-- Table structure for table `instruments`
--

CREATE TABLE `instruments` (
  `instrumentId` int(11) NOT NULL,
  `instrumentName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `instruments`
--

INSERT INTO `instruments` (`instrumentId`, `instrumentName`) VALUES
(4, 'Bass'),
(9, 'Cello'),
(10, 'Clarinet'),
(3, 'Drums'),
(8, 'Flute'),
(1, 'Guitar'),
(2, 'Piano'),
(6, 'Saxophone'),
(7, 'Trumpet'),
(5, 'Violin');

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
(1, 'Playlist1', 1, '2025-03-16 15:27:14', 1),
(2, 'Playlist2', 2, '2025-03-16 15:27:14', 2),
(3, 'Playlist3', 3, '2025-03-16 15:27:14', 3),
(4, 'Playlist4', 4, '2025-03-16 15:27:14', 4),
(5, 'Playlist5', 5, '2025-03-16 15:27:14', 5),
(6, 'Playlist6', 6, '2025-03-16 15:27:14', 6),
(7, 'Playlist7', 7, '2025-03-16 15:27:14', 7),
(8, 'Playlist8', 8, '2025-03-16 15:27:14', 8),
(9, 'Playlist9', 9, '2025-03-16 15:27:14', 9),
(10, 'Playlist10', 10, '2025-03-16 15:27:14', 10);

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
  `instrumentId` int(11) DEFAULT NULL,
  `songPath` varchar(255) NOT NULL,
  `songImage` varchar(255) DEFAULT NULL,
  `songUploadedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `songs`
--

INSERT INTO `songs` (`songId`, `songName`, `artistId`, `albumId`, `genreId`, `songUploaderId`, `instrumentId`, `songPath`, `songImage`, `songUploadedAt`) VALUES
(1, 'Song1', 1, 1, 1, 1, 1, 'path1.mp3', 'image1.jpg', '2025-03-16 15:27:14'),
(2, 'Song2', 2, 2, 2, 2, 2, 'path2.mp3', 'image2.jpg', '2025-03-16 15:27:14'),
(3, 'Song3', 3, 3, 3, 3, 3, 'path3.mp3', 'image3.jpg', '2025-03-16 15:27:14'),
(4, 'Song4', 4, 4, 4, 4, 4, 'path4.mp3', 'image4.jpg', '2025-03-16 15:27:14'),
(5, 'Song5', 5, 5, 5, 5, 5, 'path5.mp3', 'image5.jpg', '2025-03-16 15:27:14'),
(6, 'Song6', 6, 6, 6, 6, 6, 'path6.mp3', 'image6.jpg', '2025-03-16 15:27:14'),
(7, 'Song7', 7, 7, 7, 7, 7, 'path7.mp3', 'image7.jpg', '2025-03-16 15:27:14'),
(8, 'Song8', 8, 8, 8, 8, 8, 'path8.mp3', 'image8.jpg', '2025-03-16 15:27:14'),
(9, 'Song9', 9, 9, 9, 9, 9, 'path9.mp3', 'image9.jpg', '2025-03-16 15:27:14'),
(10, 'Song10', 10, 10, 10, 10, 10, 'path10.mp3', 'image10.jpg', '2025-03-16 15:27:14'),
(11, 'Song11', 1, 1, 1, 1, 1, 'path11.mp3', 'image11.jpg', '2025-03-16 15:27:14'),
(12, 'Song12', 2, 2, 2, 2, 2, 'path12.mp3', 'image12.jpg', '2025-03-16 15:27:14'),
(13, 'Song13', 3, 3, 3, 3, 3, 'path13.mp3', 'image13.jpg', '2025-03-16 15:27:14'),
(14, 'Song14', 4, 4, 4, 4, 4, 'path14.mp3', 'image14.jpg', '2025-03-16 15:27:14'),
(15, 'Song15', 5, 5, 5, 5, 5, 'path15.mp3', 'image15.jpg', '2025-03-16 15:27:14'),
(16, 'Song16', 6, 6, 6, 6, 6, 'path16.mp3', 'image16.jpg', '2025-03-16 15:27:14'),
(17, 'Song17', 7, 7, 7, 7, 7, 'path17.mp3', 'image17.jpg', '2025-03-16 15:27:14'),
(18, 'Song18', 8, 8, 8, 8, 8, 'path18.mp3', 'image18.jpg', '2025-03-16 15:27:14'),
(19, 'Song19', 9, 9, 9, 9, 9, 'path19.mp3', 'image19.jpg', '2025-03-16 15:27:14'),
(20, 'Song20', 10, 10, 10, 10, 10, 'path20.mp3', 'image20.jpg', '2025-03-16 15:27:14');

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
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `userName`, `userEmail`, `userPassword`, `userPp`, `userCreated`) VALUES
(1, 'user1', 'user1@example.com', 'password1', 'pp1.jpg', '2025-03-16 15:27:14'),
(2, 'user2', 'user2@example.com', 'password2', 'pp2.jpg', '2025-03-16 15:27:14'),
(3, 'user3', 'user3@example.com', 'password3', 'pp3.jpg', '2025-03-16 15:27:14'),
(4, 'user4', 'user4@example.com', 'password4', 'pp4.jpg', '2025-03-16 15:27:14'),
(5, 'user5', 'user5@example.com', 'password5', 'pp5.jpg', '2025-03-16 15:27:14'),
(6, 'user6', 'user6@example.com', 'password6', 'pp6.jpg', '2025-03-16 15:27:14'),
(7, 'user7', 'user7@example.com', 'password7', 'pp7.jpg', '2025-03-16 15:27:14'),
(8, 'user8', 'user8@example.com', 'password8', 'pp8.jpg', '2025-03-16 15:27:14'),
(9, 'user9', 'user9@example.com', 'password9', 'pp9.jpg', '2025-03-16 15:27:14'),
(10, 'user10', 'user10@example.com', 'password10', 'pp10.jpg', '2025-03-16 15:27:14');

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
-- Indexes for table `instruments`
--
ALTER TABLE `instruments`
  ADD PRIMARY KEY (`instrumentId`),
  ADD UNIQUE KEY `instrumentName` (`instrumentName`);

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
  ADD KEY `instrumentId` (`instrumentId`),
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
-- AUTO_INCREMENT for table `instruments`
--
ALTER TABLE `instruments`
  MODIFY `instrumentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `playlists`
--
ALTER TABLE `playlists`
  MODIFY `plId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `songs`
--
ALTER TABLE `songs`
  MODIFY `songId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
  ADD CONSTRAINT `songs_ibfk_4` FOREIGN KEY (`instrumentId`) REFERENCES `instruments` (`instrumentId`),
  ADD CONSTRAINT `songs_ibfk_5` FOREIGN KEY (`songUploaderId`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
