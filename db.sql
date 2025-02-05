-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Adatbázis: `hug`
--

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------
-- Felhasználók tábla
-- --------------------------------------------------------

CREATE TABLE `users` (
  `userId` INT(11) NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(255) NOT NULL UNIQUE,
  `userEmail` VARCHAR(255) NOT NULL UNIQUE,
  `userPassword` VARCHAR(255) NOT NULL,
  `userPp` VARCHAR(255) DEFAULT NULL,
  `userCreated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Zenék tábla
-- --------------------------------------------------------

CREATE TABLE `songs` (
  `songId` INT(11) NOT NULL AUTO_INCREMENT,
  `songName` VARCHAR(255) NOT NULL,
  `songArtist` VARCHAR(255) NOT NULL,
  `songAlbum` VARCHAR(255) DEFAULT NULL,
  `songGenre` VARCHAR(255) NOT NULL,
  `songInstrument` VARCHAR(255) DEFAULT NULL,
  `songPath` VARCHAR(255) NOT NULL,
  `songImage` VARCHAR(255) DEFAULT NULL,
  `songUploaderId` INT(11) NOT NULL,
  `songUploadedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`songId`),
  FOREIGN KEY (`songUploaderId`) REFERENCES `users`(`userId`),
  INDEX `idx_song_search` (`songArtist`, `songGenre`, `songInstrument`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Lejátszási listák tábla
-- --------------------------------------------------------

CREATE TABLE `playlists` (
  `plId` INT(11) NOT NULL AUTO_INCREMENT,
  `plName` VARCHAR(255) NOT NULL,
  `plOwnerId` INT(11) NOT NULL,
  `plCreated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`plId`),
  FOREIGN KEY (`plOwnerId`) REFERENCES `users`(`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Lejátszási lista és zenék kapcsolótábla
-- --------------------------------------------------------

CREATE TABLE `plsongs` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `plId` INT(11) NOT NULL,
  `songId` INT(11) NOT NULL,
  `addedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`plId`) REFERENCES `playlists`(`plId`),
  FOREIGN KEY (`songId`) REFERENCES `songs`(`songId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
