CREATE Database frametrap;

USE frametrap;

CREATE TABLE characters (
  Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  Name varchar(20),
  Health int NOT NULL,
  Stun int NOT NULL,
  F_Dash int NOT NULL,
  B_Dash int NOT NULL
);

CREATE TABLE attacks (
 Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
 Name varchar(20),
 Input varchar(20),
 Start_Up int,
 Active int,
 Recovery int,
 OBA int,
 OHA int,
 OCA int,
 Damage int,
 Stun int,
 KD_Normal int,
 KD_Quick int,
 KD_Back int
);