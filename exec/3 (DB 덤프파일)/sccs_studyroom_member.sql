-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: i8a301.p.ssafy.io    Database: sccs
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `studyroom_member`
--

DROP TABLE IF EXISTS `studyroom_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studyroom_member` (
  `id` int NOT NULL AUTO_INCREMENT,
  `studyroom_id` int NOT NULL,
  `member_id` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studyroom_member`
--

LOCK TABLES `studyroom_member` WRITE;
/*!40000 ALTER TABLE `studyroom_member` DISABLE KEYS */;
INSERT INTO `studyroom_member` VALUES (1,1,'qkr2713'),(2,2,'chan123'),(3,5,'moa2029'),(4,6,'moa2029'),(5,9,'moa2029'),(6,8,'calicedev'),(7,10,'calicedev'),(8,12,'chan123'),(9,13,'ssafy08'),(10,14,'ssafy08'),(11,16,'qkr2713'),(12,16,'moa2029'),(13,16,'qkr2713'),(14,16,'moa2029'),(15,17,'qkr2713'),(16,31,'moa2029'),(17,32,'moa2029'),(18,33,'qwerty123'),(19,33,'qkr2713'),(20,33,'chan123'),(21,33,'calicedev'),(22,33,'showmaker'),(23,33,'moa2029'),(24,34,'qwerty123'),(25,34,'chan123'),(26,34,'moa2029'),(27,35,'qwerty123'),(28,35,'chan123'),(29,35,'qkr2713'),(30,35,'calicedev'),(31,35,'showmaker'),(32,35,'moa2029'),(33,36,'moa2029'),(34,37,'showmaker'),(35,37,'chan123'),(36,37,'calicedev'),(37,37,'moa2029'),(38,38,'qwerty123'),(39,38,'chan123'),(40,38,'showmaker'),(41,38,'moa2029'),(42,39,'qwerty123'),(43,39,'showmaker'),(44,39,'moa2029'),(45,40,'qkr2713'),(46,40,'calicedev'),(47,40,'qwerty123'),(48,40,'chan123'),(49,40,'showmaker'),(50,40,'moa2029'),(51,41,'chan123'),(52,41,'calicedev'),(53,41,'showmaker'),(54,41,'qwerty123'),(55,41,'qkr2713'),(56,41,'moa2029'),(57,42,'chan123'),(58,42,'qwerty123'),(59,42,'showmaker'),(60,42,'moa2029'),(61,43,'showmaker'),(62,44,'calicedev'),(63,46,'qwerty123'),(64,46,'qkr2713'),(65,46,'moa2029'),(66,46,'chan123'),(67,46,'showmaker'),(68,46,'calicedev'),(69,47,'calicedev'),(70,47,'qkr2713'),(71,47,'showmaker'),(72,47,'qwerty123'),(73,47,'chan123'),(74,47,'moa2029'),(75,50,'moa2029');
/*!40000 ALTER TABLE `studyroom_member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17 10:33:55
