-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mer. 29 jan. 2025 à 18:26
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `agilflow_mvp`
--

-- --------------------------------------------------------

--
-- Structure de la table `User`
--

CREATE TABLE `User` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL COMMENT 'Name of the user',
  `email` varchar(255) NOT NULL COMMENT 'Unique email address of the user',
  `password` varchar(255) NOT NULL COMMENT 'Password of the user',
  `role` enum('developer','product owner','tester','teammate','scrum master','administrator') NOT NULL COMMENT 'Role of the user (e.g., developer, product owner)',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `UserStories`
--

CREATE TABLE `UserStories` (
  `id` int(11) NOT NULL,
  `action` varchar(255) NOT NULL COMMENT 'What the user wants to do',
  `need` varchar(255) NOT NULL COMMENT 'Reason or benefit for the action',
  `status` enum('todo','doing','done') NOT NULL DEFAULT 'todo' COMMENT 'Current status of the User Story',
  `priority` enum('low','medium','high') NOT NULL DEFAULT 'medium' COMMENT 'Priority level of the User Story',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL COMMENT 'Role of the user related to the user story'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Represents a User Story in the Agile workflow';

-- --------------------------------------------------------

--
-- Structure de la table `UserUserStories`
--

CREATE TABLE `UserUserStories` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `userStoryId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `UserStories`
--
ALTER TABLE `UserStories`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `UserUserStories`
--
ALTER TABLE `UserUserStories`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `User`
--
ALTER TABLE `User`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `UserStories`
--
ALTER TABLE `UserStories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `UserUserStories`
--
ALTER TABLE `UserUserStories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
