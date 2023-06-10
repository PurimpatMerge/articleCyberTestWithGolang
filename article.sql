-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 10, 2023 at 08:18 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `article`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `author` varchar(100) NOT NULL,
  `publishedAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `viewsCount` int(11) DEFAULT 0,
  `likesCount` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `content`, `author`, `publishedAt`, `updatedAt`, `category`, `tags`, `image`, `viewsCount`, `likesCount`, `created_at`, `deleted_at`, `updated_at`) VALUES
(19, 'Article 1', 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\'s De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:', 'Doe', '2023-05-31 18:21:53', '2023-05-31 18:21:53', 'Technology', 'programming, web development', 'https://contenthub-static.grammarly.com/blog/wp-content/uploads/2022/08/BMD-3398.png', 104, 50, '2023-06-08 11:43:27', NULL, '2023-06-09 03:19:30'),
(43, 'Article 2', 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\'s De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:', 'Min game', '2023-06-01 09:34:49', '2023-06-01 13:53:03', 'asfasf', '', 'http://res.cloudinary.com/dwwfqdl79/image/upload/v1685602384/upload/bzz82txiolegatltgytm.jpg', 1, 0, '2023-06-08 11:43:27', NULL, '2023-06-09 03:19:30'),
(44, 'Article 37', 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\'s De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:', 'John Smiths', '2023-06-01 09:36:34', '2023-06-01 13:41:45', 'Technology', 'programming, web development', 'https://contenthub-static.grammarly.com/blog/wp-content/uploads/2022/08/BMD-3398.png', 251, 150, '2023-06-08 11:43:27', NULL, '2023-06-09 03:19:30'),
(45, 'Article 12', 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\'s De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:', 'Emily Johnson', '2023-06-01 09:36:38', '2023-06-01 13:01:18', 'Health', 'fitness, nutrition', 'http://res.cloudinary.com/dwwfqdl79/image/upload/v1685599278/upload/v8b6nunvsrjssgj2wacb.jpg', 182, 90, '2023-06-08 11:43:27', NULL, '2023-06-09 03:19:30'),
(47, 'Article 4', 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\'s De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:', 'Sophia Davis', '2023-06-01 09:36:51', '2023-06-01 09:36:51', 'Science', 'astronomy, biology', 'https://contenthub-static.grammarly.com/blog/wp-content/uploads/2022/08/BMD-3398.png', 420, 280, '2023-06-08 11:43:27', NULL, '2023-06-09 03:19:30'),
(48, 'Article 5', 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\'s De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:', 'Michael Thompson', '2023-06-01 09:36:55', '2023-06-01 09:36:55', 'Sports', 'football, basketball', 'https://contenthub-static.grammarly.com/blog/wp-content/uploads/2022/08/BMD-3398.png', 801, 400, '2023-06-08 11:43:27', NULL, '2023-06-09 03:19:30'),
(49, 'Article 6', 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\'s De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:', 'Emma Roberts', '2023-06-01 09:37:04', '2023-06-01 09:37:04', 'Technology', 'artificial intelligence, data science', 'https://contenthub-static.grammarly.com/blog/wp-content/uploads/2022/08/BMD-3398.png', 150, 75, '2023-06-08 11:43:27', NULL, '2023-06-09 03:19:30'),
(50, 'Article 7', 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\'s De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:', 'Oliver Moore', '2023-06-01 09:37:09', '2023-06-01 09:37:09', 'Health', 'mental health, wellness', 'https://contenthub-static.grammarly.com/blog/wp-content/uploads/2022/08/BMD-3398.png', 250, 120, '2023-06-08 11:43:27', NULL, '2023-06-09 03:19:30'),
(51, 'Article 8', 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\'s De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:', 'Liam Wilson', '2023-06-01 09:37:13', '2023-06-01 09:37:13', 'Business', 'marketing, finance', 'https://contenthub-static.grammarly.com/blog/wp-content/uploads/2022/08/BMD-3398.png', 380, 240, '2023-06-08 11:43:27', NULL, '2023-06-09 03:19:30'),
(52, 'Article 9', 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\'s De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:', 'Ava Anderson', '2023-06-01 09:37:16', '2023-06-01 09:37:16', 'Science', 'physics, chemistry', 'https://contenthub-static.grammarly.com/blog/wp-content/uploads/2022/08/BMD-3398.png', 542, 320, '2023-06-08 11:43:27', NULL, '2023-06-09 03:19:53'),
(53, 'Article 10', 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\'s De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:', 'Sophia Davis', '2023-06-01 09:37:20', '2023-06-01 09:37:20', 'Sports', 'tennis, swimming', 'https://contenthub-static.grammarly.com/blog/wp-content/uploads/2022/08/BMD-3398.png', 670, 400, '2023-06-08 11:43:27', NULL, '2023-06-09 03:19:30'),
(56, 'Article 13', 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\'s De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:', 'potter', '2023-06-01 09:51:22', '2023-06-01 09:51:22', 'This add the picture', 'This add the picture', 'http://res.cloudinary.com/dwwfqdl79/image/upload/v1685587882/upload/zh4l1j3daelawexiv13a.jpg', 2, 0, '2023-06-08 11:43:27', NULL, '2023-06-09 03:19:30'),
(57, 'Article 14', 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\'s De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:', 'devin', '2023-06-01 09:56:30', '2023-06-01 09:56:30', 'Technology', 'programming, web development', 'http://res.cloudinary.com/dwwfqdl79/image/upload/v1685588189/upload/c6cyyo4f99eaeqhkhxxe.jpg', 1, 0, '2023-06-08 11:43:27', NULL, '2023-06-09 03:19:30'),
(58, 'Article 15', 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\'s De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:', 'gabay toner', '2023-06-01 10:08:58', '2023-06-01 10:08:58', 'Sports', 'football, basketball', 'https://contenthub-static.grammarly.com/blog/wp-content/uploads/2022/08/BMD-3398.png', 0, 0, '2023-06-08 11:43:27', NULL, '2023-06-09 03:19:30'),
(59, 'Article 16', 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\'s De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:', 'Marcite', '2023-06-01 10:09:47', '2023-06-01 13:57:11', 'Technology', 'programming, web development', 'http://res.cloudinary.com/dwwfqdl79/image/upload/v1685602632/upload/nhoovrbg2wsaolbwiccz.jpg', 0, 0, '2023-06-08 11:43:27', NULL, '2023-06-09 03:19:30'),
(60, 'Article 17', 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\'s De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:', 'Homb gave', '2023-06-01 10:11:05', '2023-06-01 10:11:05', 'Technology', 'cybersecurity, blockchain', 'http://res.cloudinary.com/dwwfqdl79/image/upload/v1685589065/upload/obfnjzorrzjco27copid.jpg', 1, 0, '2023-06-08 11:43:27', NULL, '2023-06-09 03:19:30'),
(61, 'Article 18', 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\'s De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:', 'Steab', '2023-06-01 10:33:05', '2023-06-01 10:33:05', 'Sports', 'football, basketball', 'http://res.cloudinary.com/dwwfqdl79/image/upload/v1685590384/upload/hzpvkksxclpjzdpxysqh.jpg', 0, 0, '2023-06-08 11:43:27', NULL, '2023-06-09 03:19:30');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `uemail` varchar(255) NOT NULL,
  `upassword` varchar(255) NOT NULL,
  `upicture` text NOT NULL,
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `fname`, `lname`, `username`, `uemail`, `upassword`, `upicture`, `updateAt`, `deleted_at`, `created_at`, `updated_at`) VALUES
(6, 'pruimpat', 'worakaicharuphak', 'miniheart', 'mergeofficial@hotmail.com', '$2a$10$JQV3mZiOX6RL.l.Gp3ZZqORjNE.7vw/AZTmIzPeg5grzOf/Ixo1V6', 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80', '2023-06-01 06:30:57', NULL, '2023-06-09 09:08:44', '2023-06-09 09:14:18'),
(8, 'kea', 'mattaya', 'Mergeonlife', 'mergeofficial2@hotmail.com', '$2a$10$cLUcWy62BUXQZ4LYL8Oqm.wptzVQ0Yr3FzyQbVMnB1gjSkVdBupm.', 'https://i.pinimg.com/474x/4c/3e/3b/4c3e3b91f05a5765aa544ac7557d6642.jpg', '2023-06-01 06:31:00', NULL, '2023-06-09 09:08:44', '2023-06-09 09:14:18'),
(11, 'shima', 'potter', 'grand', 'mdnj@hotmail.com', '$2a$10$fIOAPFZq/3yUiGOos6hosu0SLFsppfZPIQgcdGksrcMaLNYdHj2KG', 'http://res.cloudinary.com/dwwfqdl79/image/upload/v1685590102/upload/cigpmyu3da5wk5mryaa2.jpg', '2023-06-01 03:41:38', NULL, '2023-06-09 09:08:44', '2023-06-09 09:14:18'),
(12, '2', '2', 'admin', 'mdnjlovaae@hotmail.com', '$2a$10$3SNHlAhHU5wQ//c9ieN91OoosWevtrwr4g89M1LvEglINp1dYcJi2', 'https://contenthub-static.grammarly.com/blog/wp-content/uploads/2022/08/BMD-3398.png', '2023-06-01 01:29:06', NULL, '2023-06-09 09:08:44', '2023-06-09 09:14:18');

-- --------------------------------------------------------

--
-- Table structure for table `user_articles`
--

CREATE TABLE `user_articles` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `articleId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_articles`
--

INSERT INTO `user_articles` (`id`, `userId`, `articleId`) VALUES
(19, 11, 19),
(43, 8, 43),
(44, 11, 44),
(45, 8, 45),
(47, 11, 47),
(48, 6, 48),
(49, 8, 49),
(50, 8, 50),
(51, 11, 51),
(52, 6, 52),
(53, 8, 53),
(56, 11, 56),
(57, 8, 57),
(58, 11, 58),
(59, 8, 59),
(60, 6, 60),
(61, 11, 61);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `uemail` (`uemail`),
  ADD UNIQUE KEY `uemail_3` (`uemail`),
  ADD UNIQUE KEY `uemail_4` (`uemail`),
  ADD KEY `uemail_2` (`uemail`);

--
-- Indexes for table `user_articles`
--
ALTER TABLE `user_articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `articleId` (`articleId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `user_articles`
--
ALTER TABLE `user_articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_articles`
--
ALTER TABLE `user_articles`
  ADD CONSTRAINT `user_articles_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userid`),
  ADD CONSTRAINT `user_articles_ibfk_2` FOREIGN KEY (`articleId`) REFERENCES `articles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
