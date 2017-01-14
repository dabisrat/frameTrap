-- command line  mysql.server {start|stop|restart|reload|force-reload|status}
-- mysql -u root -p or mysql -u root -p < filePath 
-- show databases, describe tableName, drop database databaseName, source filePath

CREATE Database frametrap;

USE frametrap;

CREATE TABLE characters (
  Id int NOT NULL AUTO_INCREMENT,
  Character_Name varchar(20) Unique,
  Health int,
  Stun int,
  F_Dash int,
  B_Dash int,
  PRIMARY KEY (Id)
);

CREATE TABLE attacks (
 Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
 Character_Name varchar(20),
 Attack_Name varchar(50),
 Input varchar(50),
 Start_Up int,
 Active varchar(25),
 Recovery int,
 OBA int,
 OHA int,
 OCA int,
 Damage varchar(25),
 Stun varchar(25),
 KD_Normal int,
 KD_Quick int,
 KD_Back int,
 Foreign Key (Character_Name) REFERENCES characters(Character_Name) 
);