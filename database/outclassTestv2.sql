-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2025 at 06:04 PM
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
(16, 'AM', 16),
(17, 'Currents', 17),
(18, 'Norman Fucking Rockwell!', 18),
(19, 'Sticky Fingers', 19),
(20, 'Back in Black', 20),
(21, 'Master of Puppets', 21),
(22, 'Nevermind', 22),
(23, 'Ten', 23),
(24, 'Californication', 24),
(25, 'The Colour and the Shape', 25),
(26, 'Hot Fuss', 26),
(27, 'Origin of Symmetry', 27),
(28, 'Funeral', 28),
(29, 'Lungs', 29),
(30, 'Brothers', 30),
(31, 'Blunderbuss', 31),
(32, 'Is This It', 32),
(33, 'Turn on the Bright Lights', 33),
(34, 'Modern Vampires of the City', 34),
(35, 'Oracular Spectacular', 35),
(36, 'Demon Days', 36),
(37, 'Parklife', 37),
(38, '(What\'s the Story) Morning Glory?', 38),
(39, 'Urban Hymns', 39),
(40, 'Different Class', 40),
(41, 'Dog Man Star', 41),
(42, 'The Queen Is Dead', 42),
(43, 'Unknown Pleasures', 43),
(44, 'Power, Corruption & Lies', 44),
(45, 'Violator', 45),
(46, 'Disintegration', 46),
(47, 'The Downward Spiral', 47),
(48, 'Lateralus', 48),
(49, 'Toxicity', 49),
(50, 'Mutter', 50),
(51, 'Revolver', 1),
(52, 'News of the World', 2),
(53, 'Bad', 3),
(54, 'True Blue', 4),
(55, 'Physical Graffiti', 5),
(56, 'Wish You Were Here', 6),
(57, 'Hunky Dory', 7),
(58, 'Kid A', 8),
(59, 'A Rush of Blood to the Head', 9),
(60, 'Discovery', 10),
(61, 'good kid, m.A.A.d city', 11),
(62, 'Red', 12),
(63, 'Happier Than Ever', 13),
(64, 'Dawn FM', 14),
(65, '25', 15),
(66, 'Whatever People Say I Am, That\'s What I\'m Not', 16),
(67, 'Lonerism', 17),
(68, 'Ultraviolence', 18),
(69, 'Exile on Main St.', 19),
(70, 'Highway to Hell', 20),
(71, 'Ride the Lightning', 21),
(72, 'In Utero', 22),
(73, 'Vs.', 23),
(74, 'By the Way', 24),
(75, 'Wasting Light', 25),
(76, 'Sam\'s Town', 26),
(77, 'Absolution', 27),
(78, 'The Suburbs', 28),
(79, 'Ceremonials', 29),
(80, 'El Camino', 30),
(81, 'Lazaretto', 31),
(82, 'Room on Fire', 32),
(83, 'Antics', 33),
(84, 'Contra', 34),
(85, 'Congratulations', 35),
(86, 'Plastic Beach', 36),
(87, '13', 37),
(88, 'Definitely Maybe', 38),
(89, 'A Northern Soul', 39),
(90, 'His \'n\' Hers', 40),
(91, 'Coming Up', 41),
(92, 'Meat Is Murder', 42),
(93, 'Closer', 43),
(94, 'Technique', 44),
(95, 'Songs of Faith and Devotion', 45),
(96, 'Pornography', 46),
(97, 'The Fragile', 47),
(98, 'Ænima', 48),
(99, 'Steal This Album!', 49),
(100, 'Reise, Reise', 50);

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
(20, 'AC/DC'),
(15, 'Adele'),
(28, 'Arcade Fire'),
(16, 'Arctic Monkeys'),
(13, 'Billie Eilish'),
(37, 'Blur'),
(9, 'Coldplay'),
(10, 'Daft Punk'),
(7, 'David Bowie'),
(45, 'Depeche Mode'),
(29, 'Florence + The Machine'),
(25, 'Foo Fighters'),
(36, 'Gorillaz'),
(33, 'Interpol'),
(31, 'Jack White'),
(43, 'Joy Division'),
(11, 'Kendrick Lamar'),
(18, 'Lana Del Rey'),
(5, 'Led Zeppelin'),
(4, 'Madonna'),
(21, 'Metallica'),
(35, 'MGMT'),
(3, 'Michael Jackson'),
(27, 'Muse'),
(44, 'New Order'),
(47, 'Nine Inch Nails'),
(22, 'Nirvana'),
(38, 'Oasis'),
(23, 'Pearl Jam'),
(6, 'Pink Floyd'),
(40, 'Pulp'),
(2, 'Queen'),
(8, 'Radiohead'),
(50, 'Rammstein'),
(24, 'Red Hot Chili Peppers'),
(41, 'Suede'),
(49, 'System of a Down'),
(17, 'Tame Impala'),
(12, 'Taylor Swift'),
(1, 'The Beatles'),
(30, 'The Black Keys'),
(46, 'The Cure'),
(26, 'The Killers'),
(19, 'The Rolling Stones'),
(42, 'The Smiths'),
(32, 'The Strokes'),
(39, 'The Verve'),
(14, 'The Weeknd'),
(48, 'Tool'),
(34, 'Vampire Weekend');

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
(22, 'Ambient'),
(46, 'Black Metal'),
(15, 'Blues'),
(6, 'Classical'),
(8, 'Country'),
(45, 'Death Metal'),
(13, 'Disco'),
(26, 'Drum & Bass'),
(27, 'Dubstep'),
(4, 'Electronic'),
(35, 'Experimental'),
(19, 'Folk'),
(49, 'Folk Metal'),
(12, 'Funk'),
(17, 'Gospel'),
(28, 'Grime'),
(42, 'Grunge'),
(43, 'Hard Rock'),
(44, 'Heavy Metal'),
(3, 'Hip Hop'),
(24, 'House'),
(10, 'Indie'),
(37, 'Industrial'),
(31, 'J-Pop'),
(5, 'Jazz'),
(30, 'K-Pop'),
(34, 'Lo-fi'),
(39, 'Math Rock'),
(9, 'Metal'),
(21, 'New Age'),
(36, 'Noise'),
(50, 'Nu Metal'),
(2, 'Pop'),
(38, 'Post-rock'),
(47, 'Power Metal'),
(40, 'Progressive Rock'),
(41, 'Psychedelic Rock'),
(16, 'Punk'),
(7, 'R&B'),
(14, 'Reggae'),
(1, 'Rock'),
(18, 'Soul'),
(48, 'Symphonic Metal'),
(32, 'Synthwave'),
(23, 'Techno'),
(25, 'Trance'),
(29, 'Trap'),
(33, 'Vaporwave'),
(20, 'World Music');

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
(1, 'Classic Rock Hits', 1, '2024-02-01 08:00:00', 1),
(2, 'Classic Rock Hits', 1, '2024-02-01 08:00:00', 5),
(3, 'Classic Rock Hits', 1, '2024-02-01 08:00:00', 6),
(4, 'Pop Party', 2, '2024-02-02 09:00:00', 3),
(5, 'Pop Party', 2, '2024-02-02 09:00:00', 4),
(6, 'Pop Party', 2, '2024-02-02 09:00:00', 12),
(7, 'Chill Vibes', 3, '2024-02-03 10:00:00', 9),
(8, 'Chill Vibes', 3, '2024-02-03 10:00:00', 14),
(9, 'Chill Vibes', 3, '2024-02-03 10:00:00', 15),
(10, 'Workout Mix', 4, '2024-02-04 11:00:00', 10),
(11, 'Workout Mix', 4, '2024-02-04 11:00:00', 11),
(12, 'Workout Mix', 4, '2024-02-04 11:00:00', 13),
(13, 'Road Trip', 5, '2024-02-05 12:00:00', 2),
(14, 'Road Trip', 5, '2024-02-05 12:00:00', 7),
(15, 'Road Trip', 5, '2024-02-05 12:00:00', 20),
(16, 'Indie Mix', 9, '2024-02-06 13:00:00', 8),
(17, 'Indie Mix', 9, '2024-02-06 13:00:00', 17),
(18, 'Metal Mayhem', 8, '2024-02-07 14:00:00', 5),
(19, 'Metal Mayhem', 8, '2024-02-07 14:00:00', 20),
(20, 'Electronic Dreams', 10, '2024-02-08 15:00:00', 10),
(21, 'Electronic Dreams', 10, '2024-02-08 15:00:00', 17),
(22, 'Hip Hop Essentials', 11, '2024-02-09 16:00:00', 11),
(23, 'Hip Hop Essentials', 11, '2024-02-09 16:00:00', 13),
(24, 'Jazz Night', 12, '2024-02-10 17:00:00', 14),
(25, 'Classical Masterpieces', 13, '2024-02-11 18:00:00', 15),
(26, 'Country Roads', 14, '2024-02-12 19:00:00', 16),
(27, 'Blues Collection', 15, '2024-02-13 20:00:00', 17),
(28, 'Disco Fever', 16, '2024-02-14 21:00:00', 18),
(29, 'Reggae Vibes', 17, '2024-02-15 22:00:00', 19),
(30, 'Punk Revolution', 18, '2024-02-15 23:00:00', 20),
(31, 'Folk Stories', 19, '2024-02-17 00:00:00', 1),
(32, 'World Journey', 20, '2024-02-18 01:00:00', 2),
(33, '90s Alternative', 6, '2024-02-19 02:00:00', 3),
(34, '80s Pop', 7, '2024-02-20 03:00:00', 4),
(35, '70s Rock', 1, '2024-02-21 04:00:00', 5),
(36, '00s Hits', 2, '2024-02-22 05:00:00', 6),
(37, '10s Chart Toppers', 3, '2024-02-23 06:00:00', 7),
(38, '2020s New Releases', 4, '2024-02-24 07:00:00', 8),
(39, 'Acoustic Sessions', 5, '2024-02-25 08:00:00', 9),
(40, 'Late Night Vibes', 6, '2024-02-26 09:00:00', 10),
(41, 'Morning Motivation', 7, '2024-02-27 10:00:00', 11),
(42, 'Study Focus', 8, '2024-02-28 11:00:00', 12),
(43, 'Party Starters', 9, '2024-02-29 12:00:00', 13),
(44, 'Romantic Evenings', 10, '2024-03-01 13:00:00', 14),
(45, 'Workout Energy', 11, '2024-03-02 14:00:00', 15),
(46, 'Relaxation', 12, '2024-03-03 15:00:00', 16),
(47, 'Summer Hits', 13, '2024-03-04 16:00:00', 17),
(48, 'Winter Moods', 14, '2024-03-05 17:00:00', 18),
(49, 'Autumn Melancholy', 15, '2024-03-06 18:00:00', 19),
(50, 'Spring Awakening', 16, '2024-03-07 19:00:00', 20);

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
(1, 'Come Together', 1, 1, 1, 1, 'songs/come_together.mp3', 'abbey_road.jpg', '2024-01-10 08:00:00'),
(2, 'Bohemian Rhapsody', 2, 2, 1, 2, 'songs/bohemian_rhapsody.mp3', 'night_at_opera.jpg', '2024-01-11 09:00:00'),
(3, 'Billie Jean', 3, 3, 2, 3, 'songs/billie_jean.mp3', 'thriller.jpg', '2024-01-12 10:00:00'),
(4, 'Like a Virgin', 4, 4, 2, 4, 'songs/like_a_virgin.mp3', 'like_a_virgin.jpg', '2024-01-13 11:00:00'),
(5, 'Stairway to Heaven', 5, 5, 1, 5, 'songs/stairway_to_heaven.mp3', 'led_zeppelin_iv.jpg', '2024-01-14 12:00:00'),
(6, 'Money', 6, 6, 1, 1, 'songs/money.mp3', 'dark_side.jpg', '2024-01-15 13:00:00'),
(7, 'Ziggy Stardust', 7, 7, 1, 2, 'songs/ziggy_stardust.mp3', 'ziggy.jpg', '2024-01-16 14:00:00'),
(8, 'Paranoid Android', 8, 8, 11, 3, 'songs/paranoid_android.mp3', 'ok_computer.jpg', '2024-01-17 15:00:00'),
(9, 'Yellow', 9, 9, 11, 4, 'songs/yellow.mp3', 'parachutes.jpg', '2024-01-18 16:00:00'),
(10, 'Get Lucky', 10, 10, 4, 5, 'songs/get_lucky.mp3', 'random_access.jpg', '2024-01-19 17:00:00'),
(11, 'Alright', 11, 11, 3, 1, 'songs/alright.mp3', 'pimp_butterfly.jpg', '2024-01-20 18:00:00'),
(12, 'Shake It Off', 12, 12, 2, 2, 'songs/shake_it_off.mp3', '1989.jpg', '2024-01-21 19:00:00'),
(13, 'bad guy', 13, 13, 2, 3, 'songs/bad_guy.mp3', 'when_we_all.jpg', '2024-01-22 20:00:00'),
(14, 'Blinding Lights', 14, 14, 7, 4, 'songs/blinding_lights.mp3', 'after_hours.jpg', '2024-01-23 21:00:00'),
(15, 'Rolling in the Deep', 15, 15, 2, 5, 'songs/rolling_in_deep.mp3', '21.jpg', '2024-01-23 22:00:00'),
(16, 'Do I Wanna Know?', 16, 16, 1, 6, 'songs/do_i_wanna_know.mp3', 'am.jpg', '2024-01-24 23:00:00'),
(17, 'The Less I Know the Better', 17, 17, 4, 7, 'songs/the_less_i_know.mp3', 'currents.jpg', '2024-01-26 00:00:00'),
(18, 'Video Games', 18, 18, 2, 8, 'songs/video_games.mp3', 'nfr.jpg', '2024-01-27 01:00:00'),
(19, 'Brown Sugar', 19, 19, 1, 9, 'songs/brown_sugar.mp3', 'sticky_fingers.jpg', '2024-01-28 02:00:00'),
(20, 'Back in Black', 20, 20, 1, 10, 'songs/back_in_black.mp3', 'back_in_black.jpg', '2024-01-29 03:00:00');

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
(1, 'john_doe', 'john@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-01 08:00:00'),
(2, 'jane_smith', 'jane@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-02 09:00:00'),
(3, 'music_lover', 'music@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-03 10:00:00'),
(4, 'dj_pro', 'dj@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-04 11:00:00'),
(5, 'song_writer', 'writer@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-05 12:00:00'),
(6, 'rock_fan', 'rock@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-06 13:00:00'),
(7, 'pop_queen', 'pop@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-07 14:00:00'),
(8, 'metal_head', 'metal@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-08 15:00:00'),
(9, 'indie_kid', 'indie@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-09 16:00:00'),
(10, 'electronic_guy', 'electronic@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-10 17:00:00'),
(11, 'hiphop_fan', 'hiphop@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-11 18:00:00'),
(12, 'jazz_lover', 'jazz@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-12 19:00:00'),
(13, 'classical_music', 'classical@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-13 20:00:00'),
(14, 'country_boy', 'country@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-14 21:00:00'),
(15, 'blues_man', 'blues@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-15 22:00:00'),
(16, 'disco_diva', 'disco@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-15 23:00:00'),
(17, 'reggae_fan', 'reggae@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-17 00:00:00'),
(18, 'punk_rocker', 'punk@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-18 01:00:00'),
(19, 'folk_singer', 'folk@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-19 02:00:00'),
(20, 'world_music', 'world@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2024-01-20 03:00:00');

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
  MODIFY `albumId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `artists`
--
ALTER TABLE `artists`
  MODIFY `artistId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `genreId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `playlists`
--
ALTER TABLE `playlists`
  MODIFY `plId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `songs`
--
ALTER TABLE `songs`
  MODIFY `songId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

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
