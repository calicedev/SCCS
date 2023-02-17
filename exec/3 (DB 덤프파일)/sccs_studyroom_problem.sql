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
-- Table structure for table `studyroom_problem`
--

DROP TABLE IF EXISTS `studyroom_problem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studyroom_problem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `problem_id` int NOT NULL,
  `studyroom_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studyroom_problem`
--

LOCK TABLES `studyroom_problem` WRITE;
/*!40000 ALTER TABLE `studyroom_problem` DISABLE KEYS */;
INSERT INTO `studyroom_problem` VALUES (1,44,1),(2,60,1),(3,37,2),(4,53,2),(5,4,3),(6,6,3),(7,25,4),(8,28,4),(9,5,5),(10,9,5),(11,3,6),(12,4,6),(13,59,7),(14,75,7),(15,51,8),(16,52,8),(17,4,9),(18,5,9),(19,5,10),(20,39,10),(21,10,11),(22,78,11),(23,16,12),(24,55,12),(25,4,13),(26,10,13),(27,2,14),(28,8,14),(29,30,15),(30,47,15),(31,3,16),(32,6,16),(33,8,17),(34,19,17),(35,7,18),(36,9,18),(37,4,19),(38,8,19),(39,6,20),(40,10,20),(41,3,21),(42,10,21),(43,35,22),(44,76,22),(45,3,23),(46,9,23),(47,5,24),(48,10,24),(49,5,25),(50,10,25),(51,3,26),(52,7,26),(53,5,27),(54,6,27),(55,17,28),(56,20,28),(57,6,29),(58,8,29),(59,7,30),(60,8,30),(61,1,31),(62,10,31),(63,6,32),(64,7,32),(65,33,33),(66,64,33),(67,5,34),(68,8,34),(69,2,35),(70,38,35),(71,2,36),(72,10,36),(73,2,37),(74,6,37),(75,39,38),(76,43,38),(77,6,39),(78,7,39),(79,9,40),(80,10,40),(81,26,41),(82,59,41),(83,8,42),(84,10,42),(85,9,43),(86,10,43),(87,2,44),(88,8,44),(89,2,45),(90,10,45),(91,2,46),(92,5,46),(93,2,47),(94,6,47),(95,35,48),(96,46,48),(97,1,49),(98,7,49),(99,4,50),(100,8,50);
/*!40000 ALTER TABLE `studyroom_problem` ENABLE KEYS */;
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
