-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Дек 21 2021 г., 12:35
-- Версия сервера: 8.0.24
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `product_list`
--

-- --------------------------------------------------------

--
-- Структура таблицы `book`
--

CREATE TABLE `book` (
  `sku` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `weight` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `book`
--

INSERT INTO `book` (`sku`, `weight`) VALUES
('RFE156374', 0.25),
('FEW235525', 0.4),
('OGO949685', 0.7),
('OGR064986', 0.5),
('OFJ039584', 0.2),
('PGJ958476', 0.4);

-- --------------------------------------------------------

--
-- Структура таблицы `dvd`
--

CREATE TABLE `dvd` (
  `sku` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `size` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `dvd`
--

INSERT INTO `dvd` (`sku`, `size`) VALUES
('PFE858375', 1024),
('PHK069483', 512);

-- --------------------------------------------------------

--
-- Структура таблицы `furniture`
--

CREATE TABLE `furniture` (
  `sku` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `height` float NOT NULL,
  `width` float NOT NULL,
  `length` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `furniture`
--

INSERT INTO `furniture` (`sku`, `height`, `width`, `length`) VALUES
('PGK906984', 215, 150, 60),
('PFO923682', 100, 160, 210),
('IRI2984828', 100, 100, 100);

-- --------------------------------------------------------

--
-- Структура таблицы `product_list`
--

CREATE TABLE `product_list` (
  `sku` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `price` float NOT NULL,
  `type` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `product_list`
--

INSERT INTO `product_list` (`sku`, `name`, `price`, `type`) VALUES
('PFE858375', 'CD-R (main)', 5, 'DVD'),
('FEW235525', 'Biology science', 48.9, 'Book'),
('PFO923682', 'Bedrum bed', 998.99, 'Furniture'),
('PHK069483', 'Milky Way', 50, 'DVD'),
('RFE156374', 'Slime', 30.9, 'Book'),
('OGO949685', 'Human', 60.5, 'Book'),
('PGK906984', 'Closet', 200, 'Furniture'),
('IRI2984828', 'Box', 1550, 'Furniture'),
('OGR064986', 'Fire', 50, 'Book'),
('OFJ039584', 'Potato', 17, 'Book'),
('PGJ958476', 'Molecules', 35, 'Book');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `book`
--
ALTER TABLE `book`
  ADD UNIQUE KEY `sku` (`sku`);

--
-- Индексы таблицы `dvd`
--
ALTER TABLE `dvd`
  ADD UNIQUE KEY `sku` (`sku`);

--
-- Индексы таблицы `furniture`
--
ALTER TABLE `furniture`
  ADD UNIQUE KEY `sku` (`sku`);

--
-- Индексы таблицы `product_list`
--
ALTER TABLE `product_list`
  ADD UNIQUE KEY `sku` (`sku`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
