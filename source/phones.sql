-- MySQL dump 10.13  Distrib 5.6.27, for Linux (x86_64)
--
-- Host: localhost    Database: phones
-- ------------------------------------------------------
-- Server version	5.6.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `data`
--

DROP TABLE IF EXISTS `data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `data` (
  `phoneid` int(10) NOT NULL,
  `company` varchar(45) DEFAULT NULL,
  `model` varchar(45) DEFAULT NULL,
  `screen_size` varchar(45) DEFAULT NULL,
  `price` int(10) DEFAULT NULL,
  `color` varchar(15) DEFAULT NULL,
  `camera` int(11) DEFAULT NULL,
  PRIMARY KEY (`phoneid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `data`
--

LOCK TABLES `data` WRITE;
/*!40000 ALTER TABLE `data` DISABLE KEYS */;
INSERT INTO `data` VALUES (1,'Samsung','Galaxy E7','6',19000,'black',7),(2,'Motorola','Moto G','5',13000,'black',10),(3,'Sony','Xperia Z1','5',16000,'white',10),(4,'Meizu','MX5','5',20000,'blue',13),(5,'Gionee','Elife S7','5',20000,'white',15),(6,'Gionee','HTC Desire 820s','5',20000,'black',13),(7,'Asus','Zenfone 2 ZE550ML','6',16000,'red',10),(8,'Lenovo','Vibe X2','5',15000,'red',4),(9,'Apple','Iphone6','5',40000,'white',4),(10,'Samsung','Galaxy Note 5','6',52000,'black',8),(11,'Apple','Iphone 6s','5',62000,'pink',15),(12,'Sony','Xperia Z3+','5',41000,'red',8),(13,'Samsung','Galaxy S6','5',34000,'pink',8),(14,'HTC','One M9 Plus','5',40000,'black',13),(15,'Google','Nexus 6','6',30000,'black',13),(16,'Nokia','Lumia 520','6',8000,'blue',7),(17,'Spice','Smart Flo 508','6',3000,'pink',3),(18,'Spice','Sony Ericsson','5',8000,'pink',4),(19,'Samsung','Rex 80','5',5000,'white',4),(20,'Samsung','Duos C3312','5',4000,'red',8),(21,'Samsung','Galaxy Grand Neo','5',8000,'grey',15),(22,'Samsung','Galaxy Ee7','6',19000,'blue',8),(23,'Samsung','Galaxy Ee7','6',19000,'white',7);
/*!40000 ALTER TABLE `data` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-11-13 16:19:41
