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
-- Table structure for table `studyroom_algo`
--

DROP TABLE IF EXISTS `studyroom_algo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studyroom_algo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `algo_id` int NOT NULL,
  `studyroom_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studyroom_algo`
--

LOCK TABLES `studyroom_algo` WRITE;
/*!40000 ALTER TABLE `studyroom_algo` DISABLE KEYS */;
INSERT INTO `studyroom_algo` VALUES (1,6,1),(2,5,1),(3,4,2),(4,5,2),(5,1,3),(6,3,4),(7,1,5),(8,1,6),(9,7,7),(10,6,7),(11,5,8),(12,1,9),(13,1,10),(14,4,10),(15,1,11),(16,7,11),(17,2,12),(18,6,12),(19,1,13),(20,1,14),(21,3,15),(22,5,15),(23,1,16),(24,1,17),(25,2,17),(26,1,18),(27,1,19),(28,1,20),(29,1,21),(30,7,22),(31,4,22),(32,1,23),(33,1,24),(34,1,25),(35,1,26),(36,1,27),(37,2,28),(38,1,29),(39,1,30),(40,1,31),(41,1,32),(42,6,33),(43,4,33),(44,1,34),(45,1,35),(46,4,35),(47,1,36),(48,1,37),(49,4,38),(50,5,38),(51,1,39),(52,1,40),(53,3,41),(54,6,41),(55,1,42),(56,1,43),(57,1,44),(58,1,45),(59,1,46),(60,1,47),(61,4,48),(62,5,48),(63,1,49),(64,1,50);
/*!40000 ALTER TABLE `studyroom_algo` ENABLE KEYS */;
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
