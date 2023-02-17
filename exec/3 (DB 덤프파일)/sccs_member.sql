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
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `id` varchar(16) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(20) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `profile_image` varchar(1000) DEFAULT NULL,
  `score` int DEFAULT NULL,
  `join_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `salt` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES ('asdf1234','a472f79d1f25ffceeca811ce808abf914152b667ea79085c6c1f53a205596bce','ㅁㄴㅇㄹ','ㅁㄴㅇㄹ','asdf@asdf.com',NULL,0,'2023-02-16 13:35:44','arhhTn09XOhI/FNeZ/XaJw=='),('calicedev','d51a4ab9cc5d7c7e8431cdcae17f30b6a51b556487e26ae48ba4b36d5a35fd9b','임혜은','이사라','calicedev@gmail.com','https://holicmikubucket.s3.ap-northeast-2.amazonaws.com/sccs/images.jpg',0,'2023-02-16 04:14:46','HrbKyOPJDLmqyog26kbeRQ=='),('chan123','208817b5c5107b6398e337f404651a3f4a8a784608769c99912d01e3d5db98ba','이찬희','하도영','dojsfffff@naver.com','https://holicmikubucket.s3.ap-northeast-2.amazonaws.com/sccs/FleOSbBaEAErC8H.jpg',101000,'2023-02-16 03:44:21','+q7mxtCFejXGD8VxGLWQXA=='),('koshssafy3','ccaa120799caa43ea6a028294bbe3ed9675821e66258314eeae324200360e512','고성현','kosh','cavalier7@naver.com',NULL,0,'2023-02-16 04:27:05','3kqRmiRJpv3pJ+nXVWWzhQ=='),('moa2029','4e0b045726159dcddce7f7ccfb1a01ed6992afdaeacb37e6e8adc931b9b3e3ce','김성훈','문동은','zhxpdhkd20@naver.com','https://holicmikubucket.s3.ap-northeast-2.amazonaws.com/sccs/%EB%AC%B8%EB%8F%99%EC%9D%80.JPG',20,'2023-02-16 04:00:01','Eh6IuQpBd6auoMq170NCUg=='),('moa2030','c1bcc9bf01f1481cfea5a8c87457b3189893a7b5359504e8783bc3824a1e2366','김이박','오후','dafdsdw@naver.com',NULL,0,'2023-02-16 10:12:52','Izk0teXqWEeWUbiIjEjdVg=='),('moa2031','83cf71af34eabb25eb41a8414b534acdd3daee4bfe8beb9bdcdf3183a30002b1','모아','모아','asdfa@naver.com',NULL,0,'2023-02-16 10:24:50','KNfTc0UImPIs4r9Xa85VMQ=='),('qkr2713','686e77716e473faa9796f3440564770c3e35a825d9d96833bf0ba0b0724e0737','박균탁','박연진','qkr2713@naver.com','https://holicmikubucket.s3.ap-northeast-2.amazonaws.com/sccs/%EC%97%B0%EC%A7%841.png',100100,'2023-02-16 03:42:56','aE8PafJej0/cC/g3WrF3Wg=='),('qwerty123','15a29794f30a016b53cc3d18422ec301f8c8f5c5079430fa90994a069bc55b77','정해석','전재준','holicmiku.15@gmail.com','https://holicmikubucket.s3.ap-northeast-2.amazonaws.com/sccs/Image%20Pasted%20at%202023-2-17%2009-12.png',31000,'2023-02-16 04:14:13','hhS7wi1vX7T5HshCDufnuA=='),('showmaker','0144e25b608a4a8e6bf9d8a0091fc9b6e79ee4d32a47af9830b3739b15f68545','김허수','손명오','show@naver.com','https://holicmikubucket.s3.ap-northeast-2.amazonaws.com/sccs/%EC%86%90%EB%AA%85%EC%98%A4.jpg',70000,'2023-02-16 04:03:25','gE6NAHX2fG2RjMexJ5zbLw=='),('ssafy08','0e7af6f37ccdb6305e235999d117647830491b3634157d8683e8fa24f20d3c13','이병호','싸피8기','unlike96@gmail.com','https://holicmikubucket.s3.ap-northeast-2.amazonaws.com/sccs/KakaoTalk_20230110_151454729.png',20,'2023-02-16 07:11:25','dhRASKXL1z2ikHYcu7ST3g=='),('ssafy1','3180740711e805e3c563d2a16bdadd2868e1743d21c38441dd549f006b789ce5','김싸피','ssafy','ssafy@ssafy.com',NULL,0,'2023-02-16 13:24:07','3KhVpOFK+Tfqt5bP0oMMQw==');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
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
