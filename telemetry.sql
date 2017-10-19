-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.19-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win32
-- HeidiSQL Version:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for telemetry
CREATE DATABASE IF NOT EXISTS `telemetry` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `telemetry`;


-- Dumping structure for table telemetry.player_errors
CREATE TABLE IF NOT EXISTS `player_errors` (
  `id` int(11) NOT NULL,
  `stream_id` varchar(50) NOT NULL,
  `error_id` varchar(50) NOT NULL,
  `time` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table telemetry.player_errors: ~0 rows (approximately)
DELETE FROM `player_errors`;
/*!40000 ALTER TABLE `player_errors` DISABLE KEYS */;
/*!40000 ALTER TABLE `player_errors` ENABLE KEYS */;


-- Dumping structure for table telemetry.player_events
CREATE TABLE IF NOT EXISTS `player_events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `streamId` varchar(50) NOT NULL,
  `eventType` varchar(50) NOT NULL,
  `time` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=latin1;

-- Dumping data for table telemetry.player_events: ~134 rows (approximately)
DELETE FROM `player_events`;
/*!40000 ALTER TABLE `player_events` DISABLE KEYS */;
INSERT INTO `player_events` (`id`, `streamId`, `eventType`, `time`) VALUES
	(1, 'test', 'play', '1500040616254'),
	(2, 'test', 'pause', '1500042257168'),
	(3, 'test', 'ended', '1500042257168'),
	(4, 'test', 'play', '1500042264822'),
	(5, 'test', 'pause', '1500042268389'),
	(6, 'test', 'play', '1500042269598'),
	(7, 'test', 'pause', '1500042270360'),
	(8, 'test', 'play', '1500042270454'),
	(9, 'test', 'pause', '1500042257168'),
	(10, 'test', 'ended', '1500042257168'),
	(11, 'test', 'play', '1500042264822'),
	(12, 'test', 'pause', '1500042268389'),
	(13, 'test', 'play', '1500042269598'),
	(14, 'test', 'pause', '1500042270360'),
	(15, 'test', 'play', '1500042270454'),
	(16, 'test', 'pause', '1500042257168'),
	(17, 'test', 'ended', '1500042257168'),
	(18, 'test', 'play', '1500042264822'),
	(19, 'test', 'pause', '1500042268389'),
	(20, 'test', 'play', '1500042269598'),
	(21, 'test', 'pause', '1500042270360'),
	(22, 'test', 'play', '1500042270454'),
	(23, 'test', 'pause', '1500042257168'),
	(24, 'test', 'ended', '1500042257168'),
	(25, 'test', 'play', '1500042264822'),
	(26, 'test', 'pause', '1500042268389'),
	(27, 'test', 'play', '1500042269598'),
	(28, 'test', 'pause', '1500042270360'),
	(29, 'test', 'play', '1500042270454'),
	(30, 'test', 'pause', '1500042257168'),
	(31, 'test', 'ended', '1500042257168'),
	(32, 'test', 'play', '1500042264822'),
	(33, 'test', 'pause', '1500042268389'),
	(34, 'test', 'play', '1500042269598'),
	(35, 'test', 'pause', '1500042270360'),
	(36, 'test', 'play', '1500042270454'),
	(37, 'test', 'pause', '1500042257168'),
	(38, 'test', 'ended', '1500042257168'),
	(39, 'test', 'play', '1500042264822'),
	(40, 'test', 'pause', '1500042268389'),
	(41, 'test', 'play', '1500042269598'),
	(42, 'test', 'pause', '1500042270360'),
	(43, 'test', 'play', '1500042270454'),
	(44, 'test', 'pause', '1500042257168'),
	(45, 'test', 'ended', '1500042257168'),
	(46, 'test', 'play', '1500042264822'),
	(47, 'test', 'pause', '1500042268389'),
	(48, 'test', 'play', '1500042269598'),
	(49, 'test', 'pause', '1500042270360'),
	(50, 'test', 'play', '1500042270454'),
	(51, 'test', 'pause', '1500042257168'),
	(52, 'test', 'ended', '1500042257168'),
	(53, 'test', 'play', '1500042264822'),
	(54, 'test', 'pause', '1500042268389'),
	(55, 'test', 'play', '1500042269598'),
	(56, 'test', 'pause', '1500042270360'),
	(57, 'test', 'play', '1500042270454'),
	(58, 'test', 'pause', '1500042257168'),
	(59, 'test', 'ended', '1500042257168'),
	(60, 'test', 'play', '1500042264822'),
	(61, 'test', 'pause', '1500042268389'),
	(62, 'test', 'play', '1500042269598'),
	(63, 'test', 'pause', '1500042270360'),
	(64, 'test', 'play', '1500042270454'),
	(65, 'test', 'pause', '1500042257168'),
	(66, 'test', 'ended', '1500042257168'),
	(67, 'test', 'play', '1500042264822'),
	(68, 'test', 'pause', '1500042268389'),
	(69, 'test', 'play', '1500042269598'),
	(70, 'test', 'pause', '1500042270360'),
	(71, 'test', 'play', '1500042270454'),
	(72, 'test', 'pause', '1500042257168'),
	(73, 'test', 'ended', '1500042257168'),
	(74, 'test', 'play', '1500042264822'),
	(75, 'test', 'pause', '1500042268389'),
	(76, 'test', 'play', '1500042269598'),
	(77, 'test', 'pause', '1500042270360'),
	(78, 'test', 'play', '1500042270454'),
	(79, 'test', 'pause', '1500042257168'),
	(80, 'test', 'ended', '1500042257168'),
	(81, 'test', 'play', '1500042264822'),
	(82, 'test', 'pause', '1500042268389'),
	(83, 'test', 'play', '1500042269598'),
	(84, 'test', 'pause', '1500042270360'),
	(85, 'test', 'play', '1500042270454'),
	(86, 'test', 'pause', '1500042257168'),
	(87, 'test', 'ended', '1500042257168'),
	(88, 'test', 'play', '1500042264822'),
	(89, 'test', 'pause', '1500042268389'),
	(90, 'test', 'play', '1500042269598'),
	(91, 'test', 'pause', '1500042270360'),
	(92, 'test', 'play', '1500042270454'),
	(93, 'test', 'pause', '1500042257168'),
	(94, 'test', 'ended', '1500042257168'),
	(95, 'test', 'play', '1500042264822'),
	(96, 'test', 'pause', '1500042268389'),
	(97, 'test', 'play', '1500042269598'),
	(98, 'test', 'pause', '1500042270360'),
	(99, 'test', 'play', '1500042270454'),
	(100, 'test', 'pause', '1500042257168'),
	(101, 'test', 'ended', '1500042257168'),
	(102, 'test', 'play', '1500042264822'),
	(103, 'test', 'pause', '1500042268389'),
	(104, 'test', 'play', '1500042269598'),
	(105, 'test', 'pause', '1500042270360'),
	(106, 'test', 'play', '1500042270454'),
	(107, 'test', 'pause', '1500042257168'),
	(108, 'test', 'ended', '1500042257168'),
	(109, 'test', 'play', '1500042264822'),
	(110, 'test', 'pause', '1500042268389'),
	(111, 'test', 'play', '1500042269598'),
	(112, 'test', 'pause', '1500042270360'),
	(113, 'test', 'play', '1500042270454'),
	(114, 'test', 'pause', '1500042257168'),
	(115, 'test', 'ended', '1500042257168'),
	(116, 'test', 'play', '1500042264822'),
	(117, 'test', 'pause', '1500042268389'),
	(118, 'test', 'play', '1500042269598'),
	(119, 'test', 'pause', '1500042270360'),
	(120, 'test', 'play', '1500042270454'),
	(121, 'test', 'pause', '1500042257168'),
	(122, 'test', 'ended', '1500042257168'),
	(123, 'test', 'play', '1500042264822'),
	(124, 'test', 'pause', '1500042268389'),
	(125, 'test', 'play', '1500042269598'),
	(126, 'test', 'pause', '1500042270360'),
	(127, 'test', 'play', '1500042270454'),
	(128, 'test', 'pause', '1500042257168'),
	(129, 'test', 'ended', '1500042257168'),
	(130, 'test', 'play', '1500042264822'),
	(131, 'test', 'pause', '1500042268389'),
	(132, 'test', 'play', '1500042269598'),
	(133, 'test', 'pause', '1500042270360'),
	(134, 'test', 'play', '1500042270454');
/*!40000 ALTER TABLE `player_events` ENABLE KEYS */;


-- Dumping structure for table telemetry.stream_history
CREATE TABLE IF NOT EXISTS `stream_history` (
  `id` int(11) NOT NULL,
  `stream_id` varchar(50) NOT NULL,
  `bitrate` int(10) NOT NULL,
  `bitrate_type` varchar(50) NOT NULL,
  `downloaded_fragments` int(10) NOT NULL,
  `failed_fragments` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `video_bitrate_switch_time` varchar(50) NOT NULL,
  `audio_bitrate_switch_time` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table telemetry.stream_history: ~0 rows (approximately)
DELETE FROM `stream_history`;
/*!40000 ALTER TABLE `stream_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `stream_history` ENABLE KEYS */;


-- Dumping structure for table telemetry.stream_info
CREATE TABLE IF NOT EXISTS `stream_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `manifestUrl` longtext NOT NULL,
  `protocol` varchar(50) NOT NULL,
  `availableVidBitrates` longtext NOT NULL,
  `availableAudBitrates` varchar(50) NOT NULL,
  `availableSubs` varchar(50) NOT NULL,
  `isLive` varchar(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table telemetry.stream_info: ~4 rows (approximately)
DELETE FROM `stream_info`;
/*!40000 ALTER TABLE `stream_info` DISABLE KEYS */;
INSERT INTO `stream_info` (`id`, `manifestUrl`, `protocol`, `availableVidBitrates`, `availableAudBitrates`, `availableSubs`, `isLive`) VALUES
	(2, 'https://amssamples.streaming.mediaservices.windows', 'application/dash+xml', '393546, 180, 320;642832, 360, 640;991868, 360, 640', '125615,53620', '', 'vod'),
	(3, 'https://amssamples.streaming.mediaservices.windows', 'application/dash+xml', '393546, 180, 320;642832, 360, 640;991868, 360, 640', '125615,53620', '', 'vod'),
	(4, 'https://amssamples.streaming.mediaservices.windows.net/91492735-c523-432b-ba01-faba6c2206a2/AzureMediaServicesPromo.ism/manifest(format=mpd-time-csf)', 'application/dash+xml', '393546, 180, 320;642832, 360, 640;991868, 360, 640;1490441, 540, 960;2238364, 540, 960;3385171, 720, 1280;4681440, 1080, 1920;5977913, 1080, 1920;', '125615,53620', '', 'vod'),
	(5, 'https://amssamples.streaming.mediaservices.windows.net/91492735-c523-432b-ba01-faba6c2206a2/AzureMediaServicesPromo.ism/manifest(format=mpd-time-csf)', 'application/dash+xml', 'bitrate:393546, h:180, w:320;bitrate:642832, h:360, w:640;bitrate:991868, h:360, w:640;bitrate:1490441, h:540, w:960;bitrate:2238364, h:540, w:960;bitrate:3385171, h:720, w:1280;bitrate:4681440, h:1080, w:1920;bitrate:5977913, h:1080, w:1920;', '125615,53620', '', 'vod');
/*!40000 ALTER TABLE `stream_info` ENABLE KEYS */;


-- Dumping structure for table telemetry.test
CREATE TABLE IF NOT EXISTS `test` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `address` int(11) NOT NULL,
  `phone` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table telemetry.test: ~5 rows (approximately)
DELETE FROM `test`;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
INSERT INTO `test` (`id`, `name`, `address`, `phone`) VALUES
	(1, 'Person 1', 310, 821),
	(2, 'Person 2', 311, 852),
	(3, 'Person 3', 312, 853),
	(4, 'Person 4', 313, 854),
	(5, 'Person 5', 314, 855);
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
