CREATE DATABASE  IF NOT EXISTS `soezawaungca2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `soezawaungca2`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: soezawaungca2
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `galleonschecker`
--

DROP TABLE IF EXISTS `galleonschecker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `galleonschecker` (
  `history_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `total_galleons` int DEFAULT NULL,
  PRIMARY KEY (`history_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  KEY `galleontracker_ibfk_1_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `galleonschecker`
--

LOCK TABLES `galleonschecker` WRITE;
/*!40000 ALTER TABLE `galleonschecker` DISABLE KEYS */;
INSERT INTO `galleonschecker` VALUES (44,1,769),(46,2,503),(52,6,273),(58,4,580),(61,5,176),(62,3,100),(67,14,68);
/*!40000 ALTER TABLE `galleonschecker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `luckydrawrecords`
--

DROP TABLE IF EXISTS `luckydrawrecords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `luckydrawrecords` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `result` text NOT NULL,
  `item_id` int DEFAULT NULL,
  `drawn_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id fk _idx` (`user_id`),
  CONSTRAINT `user_id fk ` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `luckydrawrecords`
--

LOCK TABLES `luckydrawrecords` WRITE;
/*!40000 ALTER TABLE `luckydrawrecords` DISABLE KEYS */;
INSERT INTO `luckydrawrecords` VALUES (1,1,'YES',4,'2024-02-03 15:07:01'),(2,2,'NO',NULL,'2024-02-03 15:07:37'),(3,6,'YES',9,'2024-02-03 15:07:54');
/*!40000 ALTER TABLE `luckydrawrecords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message_text` text NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_idx` (`user_id`),
  CONSTRAINT `fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'Hi, pure bloods and muggles! I am the Chosen One.',1,'2024-01-30 02:42:02'),(2,'Who cares? You are more afraid of me than VoVo himself.',2,'2024-01-30 02:42:02'),(3,'Really? Wait! Tell me your secret, you filthy mudblood.',6,'2024-01-30 02:42:02'),(4,'Well. Well. I have a nose.',2,'2024-01-30 02:42:02'),(5,'Avada Kedavra',6,'2024-01-30 02:52:04'),(6,'That\'s unfortunate for Ms.Granger because I know exactly a spell that will regrow your nose, Vovo.',10,'2024-01-30 02:58:03'),(7,'My Lord! It\'s hilarious you got mocked by Lockhart.',5,'2024-01-30 03:36:31'),(8,'At least I do not get dumped by a filthy mudblood like you, Severus.?Don\'t forget I kill your parents, Harry.',6,'2024-01-30 03:38:14'),(9,'Anyway, see you all at the end of the school year. Let me see how powerful you guys have become.',6,'2024-01-30 03:39:32'),(10,'Haha. Have ya ever heard a line \"Dumbledore\'s got style\".?',7,'2024-01-30 04:22:43'),(11,'so yeah. I am so damn afraid.',6,'2024-01-30 12:19:52'),(12,'Vovo, you must be ashamed of yourself for being beaten by a 17-year old school boy who only knew two spells: Expelliarumus and Stupify. ?',1,'2024-01-30 12:29:51'),(13,'Dumbledore please stop copying my iconic line.',12,'2024-01-30 12:33:01'),(14,'That is people. I am reporting to the Minister himself. You all are going to Azkaban.! ?',13,'2024-01-30 12:39:54'),(15,'Haha. Tell the minister to bring all the aurors because even with them, I can easily escape.',7,'2024-01-30 12:41:18'),(16,'Agree, Dummby.',6,'2024-01-30 12:41:18'),(17,'You all are so meann. ?',13,'2024-01-30 12:42:08'),(18,'Potter! You have lost me my servant. You deserve to die!',14,'2024-01-31 12:33:04');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating` (
  `rating_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `item_id` int NOT NULL,
  `rating` decimal(3,2) NOT NULL,
  `feedback` text,
  PRIMARY KEY (`rating_id`),
  KEY `item_id_fk_idx` (`item_id`),
  KEY `user_id_fk_idx` (`user_id`),
  CONSTRAINT `item_id_fk` FOREIGN KEY (`item_id`) REFERENCES `wizardingessentials` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
INSERT INTO `rating` VALUES (1,1,1,1.00,''),(2,1,2,5.00,'best'),(3,2,1,4.00,''),(4,2,5,1.00,''),(5,2,2,1.00,''),(6,7,1,2.00,''),(7,7,6,5.00,''),(8,7,7,4.00,''),(9,1,7,5.00,''),(10,1,4,5.00,''),(13,1,10,3.00,'hi');
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `task_id` int NOT NULL AUTO_INCREMENT,
  `title` text,
  `description` text,
  `points` int DEFAULT NULL,
  `image_path` text,
  PRIMARY KEY (`task_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (1,'Plant a Tree','Plant a tree in your neighbourhood or a designated green area.',50,'task_id1.png'),(2,'Use Public Transportation','Use public transportation or carpool instead of driving alone. ',30,'task_id2.png'),(3,'Reduce Plastic Usage','Commit to using reusable bags and containers.',40,'task_id3.png'),(4,'Energy Conservation','Turn off lights and appliances when not in use.',25,'task_id4.png'),(5,'Composting','Start composting kitchen scraps to create natural fertilizer.',35,'task_id5.png'),(6,'Plant Two Trees','Plant two trees in your neighborhood or a designated green area.',145,'task_id6.png'),(7,'Buy preloved items','Instead of buying brand new items, purchase second hand items on the facebook market.',300,'task_id7.png'),(8,'Quit smoking','Quit your smoking and not only save your lives but those around you.',125,'task_id8.png');
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taskprogress`
--

DROP TABLE IF EXISTS `taskprogress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taskprogress` (
  `progress_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `task_id` int NOT NULL,
  `completion_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `notes` text,
  PRIMARY KEY (`progress_id`),
  KEY `tb_user_id_user_user_id_idx` (`user_id`),
  KEY `tb_task_id_task_task_id_idx` (`task_id`),
  CONSTRAINT `tb_task_id_task_task_id` FOREIGN KEY (`task_id`) REFERENCES `task` (`task_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tb_user_id_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taskprogress`
--

LOCK TABLES `taskprogress` WRITE;
/*!40000 ALTER TABLE `taskprogress` DISABLE KEYS */;
INSERT INTO `taskprogress` VALUES (40,1,7,'2020-03-26 19:20:01',NULL),(41,1,7,'2020-03-26 19:20:01',NULL),(42,2,7,'2020-03-26 19:20:01',NULL),(43,2,7,'2020-03-26 19:20:01',NULL),(44,2,7,'2020-03-26 19:20:01',NULL),(45,2,1,'2020-03-26 19:20:01',NULL),(46,2,6,'2020-03-26 19:20:01',NULL),(47,2,8,'2020-03-26 19:20:01',NULL),(48,6,8,'2020-03-26 19:20:01',NULL),(49,6,8,'2020-03-26 19:20:01',NULL),(50,6,8,'2020-03-26 19:20:01',NULL),(51,6,8,'2020-03-26 19:20:01',NULL),(53,6,7,'2020-03-26 19:20:01',NULL),(54,6,7,'2020-03-26 19:20:01',NULL),(55,4,7,'2020-03-26 19:20:01',NULL),(56,4,7,'2020-03-26 19:20:01',NULL),(57,4,8,'2020-03-26 19:20:01',NULL),(58,5,7,'2020-03-26 19:20:01',NULL),(59,3,8,'2020-03-26 19:20:01',NULL),(60,1,8,'2024-01-30 16:00:00','stop smoking for a week.'),(61,1,7,'2024-01-30 16:00:00','I thrifed a suit.'),(62,1,3,'2024-01-30 16:00:00','I bought a metal water bottle and refill water at campus.'),(63,1,2,'2024-01-30 16:00:00','I stop using my own broomstick and take MRT.'),(64,14,5,'2024-01-30 16:00:00','I started using natural fertilzier.'),(65,14,1,'2024-01-30 16:00:00','mango tree'),(68,5,3,'2024-01-31 16:00:00',''),(69,2,8,'2024-02-02 01:49:43','I never smoke anything lah'),(70,2,4,'2024-02-02 01:54:34',''),(71,2,7,'2024-02-02 16:00:00','used my sistser clothes.');
/*!40000 ALTER TABLE `taskprogress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` text NOT NULL,
  `email` text NOT NULL,
  `password` varchar(255) NOT NULL,
  `last_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image_link` text,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Harry Potter','harry_potter@hp.com','$2b$11$/XiQzrYE.XoZOHZgsqqv2edlTJ3ewLXo7TWjb.LNFadse3IOMxme2','2024-02-03 15:06:50','https://images.ctfassets.net/usf1vwtuqyxm/6fjvdemYmo7kJ2V5P5Xqhc/1fc2b0b396123f891e858069e00d0d2b/hp-f6-harry-at-great-hall-table-web-fact-file-image.jpg?h=416&w=600&fit=pad'),(2,'Hermione Granger','hermionegranger@hp.com','$2b$11$uQB03xVpRkKSvyBPlEzAaubeoDmBqhenpND5YMtWuctZlKzBfdJB.','2024-02-03 15:07:31','https://images.ctfassets.net/usf1vwtuqyxm/4tNCXEveHBZWp1AgccZg52/39c30ab4bc67842362b78ca5ab8e0eef/HP-F4-goblet-of-fire-hermione-great-hall-smiling-book-web-landscape'),(3,'Ginny Weasley','ginnyweasley@hp.com','$2b$11$BiFzm0Gw7yNUvDxFQr9Zr.fcWwpedw1.Wa46PvPrM9i.Rzmjs1mVS','2024-01-23 13:59:47','https://4.bp.blogspot.com/-epZhd3N1zAY/UXkG-esuwlI/AAAAAAAAACo/-vzY7VW1S7w/s1600/Bonnie-Wright-001-1600x1200.jpg'),(4,'Sirius Black','siriusblack@hp.com','$2b$11$39djhUZtr6yA9JtEFrZ17et2oWJpp3luXGRIiTG8smMVmcc6dPyG.','2024-01-23 14:00:26','https://pyxis.nymag.com/v1/imgs/35f/ae2/f7fdd91310d96e0caf53f422b8168609b1-garysirius.rsquare.w330.png'),(5,'Severus Snape','severussnape@hp.com','$2b$11$UwLqx7Zesd9jpIITN7Tm5eN5/VaoTXiEOY2VqW9a.UWRcF8aZ4UgK','2024-02-01 09:15:46','https://i.insider.com/5f47e7c9cd2fec00296a497a?width=1000&format=jpeg&auto=webp'),(6,'Tom Marvolo Riddle','voldemort@gg.com','$2b$11$SgKcGAfqQpCmAuNwKN9qJ.ykKWNwCzERTc1XqcVUHGZpc1wDVlWS6','2024-02-03 15:07:49','https://external-preview.redd.it/oRxHKTGvFq8OZA17AiVbQTY-K6I8AikjV2liPti7j1w.png?auto=webp&s=508946d126ad0c3615ce36249a4c1b7ea34fc28b'),(7,'Albus Dumbledore','albusdumbledore@hp.com','$2b$11$bpT4dpRQuTF5WRgZCD3qNuuIp19gDfmz6Toqn6A.cBH3m60136shm','2024-02-02 03:55:15','https://sm.ign.com/t/ign_latam/screenshot/default/dumbledore_xptx.1280.jpg'),(8,'Fred & George Weasley','fred&george@hp.com','$2b$11$HWfoml7secxKMxRQ490HTOVhMeXf2s7qEj4rvG7nOnCXswSblxsuO','2024-01-25 16:38:56','https://images.ctfassets.net/usf1vwtuqyxm/4gSBE2zLl87JyPCERHGi3o/9997b2f06db1a9fe67c58e073ae7168b/WB_HP4_Goblet_of_Fire_Fred_and_George_twins.jpg?fm=jpg&q=70&w=2560'),(9,'Minerva McGonagall','minervamcgonagall@hp.com','$2b$11$JZjNW56KXneifx3Wv3jSQ.jJ95/2TXwRq0/x.TgOgXOOkQDF8Uu/i','2024-01-25 16:42:40','https://www.media4.hw-static.com/media/2016/05/maggie-smith-harry-potter-warner-bros-052516.jpg'),(10,'Gilderoy Lockhart','gilderoylockhart@hp.com','$2b$11$d0rr3FBe8PNnWQRHRrxFG.nBkCRv.B./BqQRvW/wwIW5V00VmoOFO','2024-01-30 12:37:24','https://i.pinimg.com/736x/56/b3/d8/56b3d8241eb798496fd43a2a54e319bf.jpg'),(11,'Filius Flitwick','filiusflitwick@hp.com','$2b$11$Vq.9.p3T2/Xi9IQblZqnrePz4X.rl1lZAqRgY4iBLkwPwddXilTT6','2024-01-30 08:59:43','https://images.ctfassets.net/usf1vwtuqyxm/7zwF0icg0kQW2ejGM7mqw2/29f2491ad063a317fb55a6f6c69aecce/flitwich-quiz-image.jpg?fm=jpg&q=70&w=2560'),(12,'Kingsley Shacklebolt','kingsleyshacklebolt@hp.com','$2b$11$nrZYI76zYbl9br2zFnHVPepzpR0dP5N.M3YbzPO0T4LUur8D9OXTe','2024-01-30 12:31:53','https://images.ctfassets.net/usf1vwtuqyxm/58gkjv9a8vemVcsZtG9lzY/2a6a80343126a14aa2987e0435c2ee62/kingsley-shacklebolt_1_1800x1248.png'),(13,'Dolores Umbridge','doloresumbridge@hp.com','$2b$11$kgnWSbLvJWYLr71JqMejZey6PG4mL4yUU8ZtXpIDdLXko/CEAkxku','2024-01-30 12:38:34','https://miro.medium.com/v2/resize:fit:1358/1*4eCDXXbJbkiXAXeJAvu8yw.jpeg'),(14,'Lucius Malfoy','luciusmalfoy@hp.com','$2b$11$IfTmCf5o.C5pOJ1RDo8Kje0i6L3XoUcsdkJWipl7s0fAWumwJsSB6','2024-01-31 12:22:45','https://44.media.tumblr.com/af1f629ce98f3b9bdd2c3726b826f90e/173f4648a9f4e3d3-77/s540x810_f1/6098df9f3a1e18f4b7db94b73e3018202928e435.gif');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wizardingessentials`
--

DROP TABLE IF EXISTS `wizardingessentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wizardingessentials` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(64) NOT NULL,
  `description_of_the_items` varchar(1000) NOT NULL,
  `sustainable_Lifestyle_Usage` varchar(550) NOT NULL,
  `galleons` int NOT NULL,
  `image_path` text,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wizardingessentials`
--

LOCK TABLES `wizardingessentials` WRITE;
/*!40000 ALTER TABLE `wizardingessentials` DISABLE KEYS */;
INSERT INTO `wizardingessentials` VALUES (1,'magic wand','A wand is the object through which a witch or wizard channels his or her magic. It is made from wood and has a magical substance at its core. Wands made by Ollivander have cores of phoenix feather, unicorn hair or dragon heartstring, and are of varying woods, lengths, and flexibilities.(Harry Potter Wiki - Fandom).','Once, you have become proficient in spells, you can automate some of your sustainability project by employing the power of pure magic using your own wand. Is that not cool?',7,'item_id1.png'),(2,'normal broomstick','  Broomstick is used by wizards as a form of transportation as well as to play in Quidditch which is a popular sport in wizarding world. ','In our less exciting Muggle World, we can use broomstick instead of our vehicles which emits carbon dioxide which in turns leading to the destruction of the ozone layer. ',100,'item_id2.webp'),(3,'Nimbus 2000','A very  fast and popular broomstick. Harry Potter also used it as his Quidditch broom as he was gifted by his Transfiguration professor McGonagall','Just like normal broomstick, you can live more eco-friendly by utilizing this broomstick as your primary transportation method. Do keep in mind that the speed of this broomstick may frighten and even give heart attack to some of the muggles.',500,'item_id3.jpg'),(4,'Firebolt','The Firebolt was a world-class broomstick. It was the fastest at the time of its production, and was released in 1993.(Harry Potter Wiki-Fandom)','Just like normal broomstick, you can live more eco-friendly by utilizing this broomstick as your primary transportation method. Do keep in mind that the speed of this broomstick may frighten and even give heart attack to some of the muggles.',750,'item_id4.png'),(5,'Invisibility Cloak','By wearing it, it make the user invisible to everyone else. This tool is great for sneaking out of class or doing forbidden things...The possibilites are endless. It is also worth noting that it is one of the deathly hollows.','You can use the Invisibility Cloak to protect the plants you have been caring for diligently. This will help prevent others from damaging to them or allow you to escape from enemies who may interfere and jeopardize your dream of leading a sustainable life.',10000,'item_id5.jpg'),(6,'Owl','Owls are very common pet and highly favored by many wizarding families. Within the wizarding world, they are mainly used as postal workers. ','You can lead to a more sustainable life by utilizing them for your delivery services instead of relying on your own vehicles or ordinary delivery services.',250,'item_id6.jpg'),(7,'Enchanted Plant','Plants from the wizarding world are far superior to the ones in our world as they are proven to be useful in numerous use cases,  from breathing under the water to curing the deathly attack of Basilisk.','You can customize and purchase plants that can assist you in your sustainable journey such as air-purifying or self-watering plant . You can also train your plant to remind you of unnoticed waste of resources such as usage of electricity without purpose.',89,'item_id7.jpg'),(8,'Deluminator','The main use of the Deluminator was to take, or release light. There was a button on it, and when pressed, would absorb the nearest light source and a light ball would fly towards the Deluminator.(Harry Potter Wiki - Fandom)','The Deluminator is incredibly useful at reducing your electricity consumption and living an eco-friendly lifestyle. It can also be used to discover unknown locations and find direction to your desired destination.',6000,'item_id8.jpg'),(9,'Polyjuice Potion','Polyjuice Potion transforms the person(or)object who drinks it into the physical form of another person(or)object for up to an hour.(-Sideshow). ','An example use-case, if you have planted a tree and want to protect it from destructive insects, you can transform ordinary objects like rocks into bats. As bats are natural predators of insects, they will help keep the insects away from your beloved trees. ',250,'item_id9.webp'),(10,'FELIX FELICIS','More commonly known as Liquid Luck. It bring luck to the person who drinks it in their missions.','You may consider drinking the potion while performing your important tasks towards the more sustainable journey to ensure a smoother process and increase the chance of success. You can also use the potion to accelerate your tree growth.',435,'item_id10.png');
/*!40000 ALTER TABLE `wizardingessentials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wizardingtransactions`
--

DROP TABLE IF EXISTS `wizardingtransactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wizardingtransactions` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `item_id` int NOT NULL,
  `purchase_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transaction_id`),
  KEY `user_id` (`user_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `wizardingtransactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `wizardingtransactions_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `wizardingessentials` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wizardingtransactions`
--

LOCK TABLES `wizardingtransactions` WRITE;
/*!40000 ALTER TABLE `wizardingtransactions` DISABLE KEYS */;
INSERT INTO `wizardingtransactions` VALUES (5,6,1,'2024-01-24 13:34:38'),(6,6,2,'2024-01-24 13:34:43'),(7,6,3,'2024-01-24 13:34:45'),(8,1,2,'2024-02-01 06:30:08'),(9,1,1,'2024-02-01 06:36:53'),(10,2,7,'2024-02-01 06:48:50'),(11,2,1,'2024-02-01 06:59:37'),(12,2,6,'2024-02-01 07:00:51'),(13,2,2,'2024-02-01 07:01:51'),(15,5,1,'2024-02-01 09:17:47'),(16,5,7,'2024-02-01 09:19:45'),(17,2,9,'2024-02-01 11:03:43'),(21,1,4,'2024-02-03 15:07:01'),(22,6,9,'2024-02-03 15:07:54');
/*!40000 ALTER TABLE `wizardingtransactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'soezawaungca2'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-03 23:08:27
