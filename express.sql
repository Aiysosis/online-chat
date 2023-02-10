# Host: localhost  (Version: 5.7.26)
# Date: 2022-01-02 10:32:04
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "befriend"
#

DROP TABLE IF EXISTS `befriend`;
CREATE TABLE `befriend` (
  `uid_from` int(11) NOT NULL,
  `uid_to` int(11) NOT NULL,
  KEY `befriend_user_uid_fk` (`uid_from`),
  KEY `befriend_user_uid_fk_2` (`uid_to`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='好友申请';

#
# Data for table "befriend"
#

/*!40000 ALTER TABLE `befriend` DISABLE KEYS */;
/*!40000 ALTER TABLE `befriend` ENABLE KEYS */;

#
# Structure for table "friend_chat"
#

DROP TABLE IF EXISTS `friend_chat`;
CREATE TABLE `friend_chat` (
  `uid_from` int(11) NOT NULL,
  `uid_to` int(11) NOT NULL,
  `message` varchar(500) NOT NULL,
  `time` datetime NOT NULL,
  KEY `friend_chat_user_uid_uid_fk` (`uid_from`,`uid_to`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# Data for table "friend_chat"
#

/*!40000 ALTER TABLE `friend_chat` DISABLE KEYS */;
INSERT INTO `friend_chat` VALUES (1,2,'在吗','2021-12-16 12:27:22'),(2,1,'这下排序应该不会出问题了吧','2021-12-16 12:27:49'),(1,2,'希望吧','2021-12-16 12:27:57'),(2,1,'我下线重新打开试试','2021-12-16 12:28:08'),(1,2,'行','2021-12-16 12:28:11'),(1,2,'时间是没问题了，但是格式有点奇怪','2021-12-16 12:30:34'),(1,2,'可能需要在服务端再改一下','2021-12-16 12:30:50'),(2,1,'确实','2021-12-16 12:31:21'),(1,2,'这波应该ok了','2021-12-16 12:44:51'),(2,1,'确实','2021-12-16 12:45:05'),(2,1,'好耶','2021-12-16 12:45:10'),(1,2,'等等这个时间','2021-12-16 12:46:12'),(1,2,'。。。。','2021-12-16 12:54:55'),(1,2,'？？？？','2021-12-16 12:55:09'),(1,2,'。。','2021-12-16 12:55:39'),(2,1,'搞定了吗','2021-12-16 13:15:07'),(1,2,'终于算是搞定了','2021-12-16 13:15:22'),(2,1,'66666666','2021-12-16 13:16:58'),(2,1,'需要把秒给去掉','2021-12-16 13:20:13'),(1,2,'that\'s it','2021-12-16 13:20:26'),(1,2,'123','2021-12-17 02:56:54'),(1,2,'在吗','2021-12-17 03:13:17'),(1,2,'去群聊说话','2021-12-17 03:13:22'),(2,1,'ok','2021-12-17 03:13:28'),(1,3,'666666666','2021-12-17 03:22:17'),(3,1,'8888888','2021-12-17 03:22:24'),(1,2,'时间显示正常','2021-12-17 04:15:51'),(1,8,'嗨！你好！','2021-12-24 16:04:34'),(8,1,'你好呀，终于加上好友了','2021-12-24 16:07:10'),(1,8,'太棒了','2021-12-24 16:10:41'),(8,2,'哈哈哈','2021-12-24 16:15:14'),(2,8,'嘻嘻嘻','2021-12-24 16:15:21'),(2,8,'刚刚好像丢失了','2021-12-24 16:15:47'),(2,8,'什么鬼','2021-12-24 16:16:07'),(8,2,'？？？','2021-12-24 16:16:12'),(2,8,'？？？','2021-12-24 16:17:41'),(2,1,'在吗','2021-12-24 16:18:26'),(1,2,'在的，怎么了','2021-12-24 16:18:36'),(2,1,'没事了','2021-12-24 16:18:47'),(1,8,'在吗','2021-12-24 16:18:56'),(8,1,'在的','2021-12-24 16:19:15'),(1,8,'测试一下消息的发送','2021-12-24 16:19:27'),(1,8,'刚刚好像出了点问题','2021-12-24 16:19:36'),(8,1,'好像确实有点问题','2021-12-24 16:19:52'),(1,8,'奇怪了','2021-12-24 16:19:59'),(8,1,'再试试','2021-12-24 16:20:25'),(1,8,'ok','2021-12-24 16:20:29'),(1,8,'???','2021-12-24 16:21:33'),(1,8,'......','2021-12-24 16:21:54'),(8,1,'...','2021-12-24 16:22:24'),(8,1,'sdfsdfsdf','2021-12-24 16:22:44'),(1,8,'asdfsadfasdf','2021-12-24 16:22:48'),(1,8,'......','2021-12-24 16:23:28'),(8,1,'...','2021-12-24 16:23:47'),(1,8,'再试试','2021-12-24 16:25:24'),(8,1,'怎么说','2021-12-24 16:25:29'),(8,1,'我刷新一下','2021-12-24 16:25:35'),(8,1,'怎么说','2021-12-24 16:25:49'),(1,8,'好了','2021-12-24 16:25:52'),(1,8,'ok','2021-12-24 16:25:54'),(2,1,'123','2021-12-25 02:33:54'),(1,2,'456','2021-12-25 02:34:01'),(10,1,'3','2021-12-25 06:39:37'),(1,10,'4','2021-12-25 06:39:47'),(1,2,'123','2021-12-25 10:27:05'),(2,1,'456','2021-12-25 10:27:08'),(2,1,'666','2021-12-25 10:27:14'),(1,11,'？？？？？','2021-12-27 07:05:58'),(11,1,'？？？？？？','2021-12-27 07:06:04');
/*!40000 ALTER TABLE `friend_chat` ENABLE KEYS */;

#
# Structure for table "friends"
#

DROP TABLE IF EXISTS `friends`;
CREATE TABLE `friends` (
  `uid_a` int(11) DEFAULT NULL,
  `uid_b` int(11) DEFAULT NULL,
  KEY `friends_user_uid_fk` (`uid_a`),
  KEY `friends_user_uid_fk_2` (`uid_b`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='好友联系集';

#
# Data for table "friends"
#

/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
INSERT INTO `friends` VALUES (1,2),(11,1),(3,10),(8,2),(1,8),(3,1),(10,1);
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;

#
# Structure for table "group_chat"
#

DROP TABLE IF EXISTS `group_chat`;
CREATE TABLE `group_chat` (
  `group_id` int(11) NOT NULL,
  `uid_from` int(11) NOT NULL,
  `uid_to` int(11) DEFAULT NULL,
  `message` varchar(500) NOT NULL,
  `time` datetime NOT NULL,
  KEY `group_chat_groups_group_id_fk` (`group_id`),
  KEY `group_chat_user_uid_uid_fk` (`uid_from`,`uid_to`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# Data for table "group_chat"
#

/*!40000 ALTER TABLE `group_chat` DISABLE KEYS */;
INSERT INTO `group_chat` VALUES (7,1,NULL,'test','2021-12-16 22:01:25'),(9,2,NULL,'来了','2021-12-17 03:13:37'),(9,2,NULL,'？？？？','2021-12-17 03:14:12'),(9,2,NULL,'神魔鬼','2021-12-17 03:14:18'),(9,1,NULL,'我发不了消息了','2021-12-17 03:14:30'),(9,1,NULL,'应该好了','2021-12-17 03:15:41'),(9,1,NULL,'我傻了','2021-12-17 03:16:06'),(9,1,NULL,'兄弟，这波稳了','2021-12-17 03:17:07'),(9,1,NULL,'。。。。。。。','2021-12-17 03:17:51'),(9,1,NULL,'ok了','2021-12-17 03:19:17'),(9,2,NULL,'qs','2021-12-17 03:19:27'),(7,3,NULL,'怎么说','2021-12-17 03:19:56'),(7,2,NULL,'哦吼','2021-12-17 03:20:08'),(7,1,NULL,'妙啊','2021-12-17 03:20:26'),(7,1,NULL,'成功了xdm','2021-12-17 03:20:41'),(7,3,NULL,'66666666','2021-12-17 03:21:11'),(7,10,NULL,'大家好呀','2021-12-25 07:30:20'),(7,1,NULL,'nihao','2021-12-25 10:28:26'),(7,2,NULL,'hello','2021-12-25 10:28:35'),(7,1,NULL,'初めまして、よろしく','2021-12-25 10:29:11'),(11,10,NULL,'hai','2021-12-25 14:29:27'),(11,1,NULL,'okokokokokokokkokk','2021-12-25 14:29:34'),(8,3,NULL,'大家好','2021-12-27 07:03:29'),(8,3,NULL,'啊哈哈哈哈哈哈哈，鸡汤来喽','2021-12-27 07:03:42'),(12,11,NULL,'好耶','2021-12-27 07:07:10'),(12,1,NULL,'好耶','2021-12-27 07:07:19');
/*!40000 ALTER TABLE `group_chat` ENABLE KEYS */;

#
# Structure for table "group_invite"
#

DROP TABLE IF EXISTS `group_invite`;
CREATE TABLE `group_invite` (
  `uid_from` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `uid_to` int(11) NOT NULL,
  KEY `group_invite_groups_group_id_fk` (`group_id`),
  KEY `group_invite_user_uid_uid_fk` (`uid_from`,`uid_to`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# Data for table "group_invite"
#

/*!40000 ALTER TABLE `group_invite` DISABLE KEYS */;
/*!40000 ALTER TABLE `group_invite` ENABLE KEYS */;

#
# Structure for table "group_join"
#

DROP TABLE IF EXISTS `group_join`;
CREATE TABLE `group_join` (
  `uid_from` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  KEY `group_join_user_uid_fk` (`uid_from`),
  KEY `group_join_groups_group_id_fk` (`group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# Data for table "group_join"
#

/*!40000 ALTER TABLE `group_join` DISABLE KEYS */;
/*!40000 ALTER TABLE `group_join` ENABLE KEYS */;

#
# Structure for table "group_member"
#

DROP TABLE IF EXISTS `group_member`;
CREATE TABLE `group_member` (
  `group_id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  KEY `group_user_user_uid_fk` (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='群组联系集';

#
# Data for table "group_member"
#

/*!40000 ALTER TABLE `group_member` DISABLE KEYS */;
INSERT INTO `group_member` VALUES (7,3),(7,2),(8,2),(8,3),(9,1),(7,10),(8,10),(9,10),(11,10),(10,3),(10,2),(12,2),(12,3),(12,8),(12,10),(12,11);
/*!40000 ALTER TABLE `group_member` ENABLE KEYS */;

#
# Structure for table "groups"
#

DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  `group_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(20) NOT NULL,
  `creator_id` int(11) NOT NULL,
  PRIMARY KEY (`group_id`),
  UNIQUE KEY `groups_group_id_uindex` (`group_id`),
  KEY `groups_user_uid_fk` (`creator_id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='群组';

#
# Data for table "groups"
#

/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (7,'test1',1),(8,'test2',1),(9,'塑料姐妹花',2),(10,'114514',1),(11,'114515',1),(12,'变成光守护嘉然小姐',1);
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;

#
# Structure for table "user"
#

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `user_username_uindex` (`user_name`),
  UNIQUE KEY `user_uid_uindex` (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='用户表';

#
# Data for table "user"
#

/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','123456','Hi! This is admin'),(2,'user1','123456','Hi!I\'m user1.'),(3,'user2','123456','Hi!I\'m user2.'),(8,'user3','123456','this is user3'),(9,'哈哈哈','123456',''),(10,'admin2','123456',''),(11,'嘉然小姐的狗','123456','嘉然我真的好喜欢你啊');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
