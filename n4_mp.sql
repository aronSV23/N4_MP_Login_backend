-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 27, 2024 at 08:21 AM
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
-- Database: `n4_mp`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `create_date` datetime DEFAULT current_timestamp(),
  `profile_picture` varchar(250) DEFAULT 'defaultProfilePicture.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `bio`, `phone`, `email`, `password`, `create_date`, `profile_picture`) VALUES
(1, 'Jony English', 'Agent 008', '975-689-043', 'jony@gmail.com', '$2b$10$krLYOtmAYbXMmwDETDJSi.DZwoKHq4WpcboSaDfmdBJKpyaTM2Yz.', '2024-05-24 09:25:29', '1716563109507-Michi.png'),
(2, 'Testing test', 'test', '999-999-999', 'test@test.com', '$2b$10$Pux4pBhzM8HZoG7Z5oFaG..LBBvVtNc.IWPl9tAeGEVzSw1lt4LKq', '2024-05-24 10:05:48', '1716563873451-michi_wonito.jpg'),
(3, 'Jon Dou', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed', NULL, 'test2@test.com', '$2b$10$WzkkiWNzMNS7/2.Pyxu7x.D.fQYrjS3tAAm9D05.KvBzXIvEyCgbS', '2024-05-24 10:22:14', '1716786811797-download.jpg'),
(4, 'Testing', 'Testing test', '987612342', 'test3@test.com', '$2b$10$e2UBwb8cFcIosViBtKiZAu0Lpv/zryCoTEsB1JFus6cR0AZq1uYbm', '2024-05-26 23:23:10', '1716788214881-1710885789511-dog.jpeg'),
(5, NULL, NULL, NULL, 'test4@test.com', '$2b$10$dEKtm7uBEUB4ZWBP5uXUG.tPOhA05FqC95ZVxQAd37Dp/OuWpRFtm', '2024-05-26 23:34:14', 'defaultProfilePicture.jpg'),
(6, 'Juan', 'qwerterqweq', '123456789', 'test5@test.com', '$2b$10$8wz68ojU0u6hn2HwQTIWeex.ZiR2PWsRgU3lljG/i0IPncAvMBwAK', '2024-05-27 00:48:13', 'defaultProfilePicture.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
