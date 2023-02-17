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
-- Table structure for table `studyroom_language`
--

DROP TABLE IF EXISTS `studyroom_language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studyroom_language` (
  `id` int NOT NULL AUTO_INCREMENT,
  `studyroom_id` int NOT NULL,
  `language_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studyroom_language`
--

LOCK TABLES `studyroom_language` WRITE;
/*!40000 ALTER TABLE `studyroom_language` DISABLE KEYS */;
INSERT INTO `studyroom_language` VALUES (1,1,1),(2,1,2),(3,2,1),(4,2,2),(5,3,1),(6,4,2),(7,5,2),(8,6,1),(9,6,2),(10,7,1),(11,7,2),(12,8,2),(13,8,1),(14,9,1),(15,10,2),(16,11,2),(17,12,2),(18,13,1),(19,14,2),(20,15,1),(21,15,2),(22,16,1),(23,17,1),(24,17,2),(25,18,1),(26,19,1),(27,20,1),(28,21,1),(29,21,2),(30,22,1),(31,22,2),(32,23,1),(33,24,1),(34,24,2),(35,25,1),(36,25,2),(37,26,1),(38,26,2),(39,27,1),(40,27,2),(41,28,1),(42,28,2),(43,29,2),(44,30,1),(45,31,2),(46,32,2),(47,33,1),(48,33,2),(49,34,2),(50,35,2),(51,35,1),(52,36,1),(53,37,1),(54,37,2),(55,38,1),(56,38,2),(57,39,1),(58,39,2),(59,40,1),(60,41,1),(61,41,2),(62,42,1),(63,42,2),(64,43,1),(65,44,1),(66,44,2),(67,45,2),(68,45,1),(69,46,2),(70,46,1),(71,47,1),(72,47,2),(73,48,1),(74,48,2),(75,49,1),(76,49,2),(77,50,2);
/*!40000 ALTER TABLE `studyroom_language` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17 10:33:54
