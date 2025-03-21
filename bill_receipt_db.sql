-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2025 at 06:19 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bill_receipt_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `contact_details` varchar(255) DEFAULT NULL,
  `items` text NOT NULL,
  `discount` decimal(10,2) DEFAULT 0.00,
  `total_amount` decimal(10,2) NOT NULL,
  `purchase_date` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bills`
--

INSERT INTO `bills` (`id`, `customer_name`, `contact_details`, `items`, `discount`, `total_amount`, `purchase_date`, `user_id`) VALUES
(19, 'John Doe', 'john@example.com', '[{\"name\":\"Laptop\",\"price\":1000,\"quantity\":1,\"total\":1000},{\"name\":\"Phone\",\"price\":500,\"quantity\":2,\"total\":1000}]', '10.00', '1990.00', '2025-03-17 15:30:00', 2),
(20, 'th ii', 'john@example.com', '[{\"name\":\"Laptop\",\"price\":1000,\"quantity\":1,\"total\":1000},{\"name\":\"Phone\",\"price\":500,\"quantity\":2,\"total\":1000}]', '10.00', '1000.00', '2025-03-17 15:30:00', 2),
(21, 'th ii', 'john@example.com', '[{\"name\":\"Laptop\",\"price\":1000,\"quantity\":1,\"total\":1000},{\"name\":\"Phone\",\"price\":500,\"quantity\":2,\"total\":1000}]', '10.00', '1000.00', '2025-02-17 15:30:00', 2),
(22, 'K.M.A. Sumith Kondasingha', 'thiwankaarunalu20@gmail.com', '[{\"name\":\"gun\",\"price\":500,\"quantity\":2,\"total\":1000},{\"name\":\"lap\",\"price\":1120,\"quantity\":1,\"total\":1120}]', '20.00', '2100.00', '2025-03-17 00:00:00', 2),
(23, 'Rohana123', 'rohana123@gmail.com', '[{\"name\":\"soap\",\"price\":10,\"quantity\":2,\"total\":20}]', '1.00', '19.00', '2025-03-20 00:00:00', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(2, 'Thiwanka Arunalu', 'thiwankaarunalu20@gmail.com', '$2b$10$5973Uct.a2dTJJjBqqqDkOK2eME7uQ.w4ZjdIWOCUzUIyzypirNCO', '2025-03-16 09:30:48'),
(3, 'John Doe', 'johndoe@example.com', '$2b$10$z9YzL3RYSmUIj3fD5oQ.G.oQows85vDmH9M.W8LQ6TxWCOdriauFe', '2025-03-18 10:10:50'),
(4, 'Rohana', 'rohana20@gmail.com', '$2b$10$lxHdsDXbMKcgKdYkN9N9ju3XD795gI1psJZ6mkHgPRr/8B/dP7ZQO', '2025-03-18 10:23:29'),
(6, 'rohana12', 'rohana12@gmail.com', '$2b$10$uGRealUFYcRs0ao2pl7PE.IKqKx4w3XFhQnuO93ZU5rVwxdGkjoP2', '2025-03-20 12:56:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

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
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bills`
--
ALTER TABLE `bills`
  ADD CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
