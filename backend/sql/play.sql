-- phpMyAdmin SQL Dump
-- version 4.0.0-dev
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 01, 2014 at 06:18 AM
-- Server version: 5.5.16
-- PHP Version: 5.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `plist`
--

-- --------------------------------------------------------

--
-- Table structure for table `playlists`
--

CREATE TABLE IF NOT EXISTS `playlists` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `playlists`
--

INSERT INTO `playlists` (`id`, `title`, `user_id`, `created`, `modified`) VALUES
(1, 'moin', 1, '0000-00-00 00:00:00', '2014-04-29 20:25:43');

-- --------------------------------------------------------

--
-- Table structure for table `playlists_sounds`
--

CREATE TABLE IF NOT EXISTS `playlists_sounds` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `playlist_id` int(11) unsigned NOT NULL,
  `sound_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `playlists_sounds`
--

INSERT INTO `playlists_sounds` (`id`, `playlist_id`, `sound_id`) VALUES
(4, 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `sounds`
--

CREATE TABLE IF NOT EXISTS `sounds` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `key` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `sounds`
--

INSERT INTO `sounds` (`id`, `title`, `key`, `type`, `user_id`, `created`, `modified`) VALUES
(4, 'Aubrey Plaza flips off reporter', 'NOrOgeHJeVE', 'youtube', 0, '2014-04-29 20:39:33', '2014-04-29 20:39:33');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `key` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
