create database pesto;

use pesto;

create table city(
    cId int(2) primary key,
    cityName varchar(20),
    stateName varchar(20)
);

create table warehouse(
    wId int(2) primary key,
    wName varchar(20),
    location varchar(20),
    extra JSON,
    cityId int(2),
    foreign key (cityId) references city (cId)
);


create table store(
    sId int(2) primary key,
    sName varchar(20),
    wId int(2),
    foreign key (wId) references warehouse(wId)
);

create table customer(
    cNo int(2) primary key,
    cName varchar(20),
    cAddress varchar(20),
    city varchar(20)
);

create table orders(
    oId int(2) primary key,
    oDate date,
    cNo int(2),
    foreign key (cNo) references customer(cNo)
);

create table items(
    itemNo int(2) primary key,
    itemDescription varchar(255),
    itemWeight decimal(5,2),
    cost decimal(5,2)
);


create table orderItem(
    itemNo int(2),
    oId int(2),
    quantity int(2),
    foreign key (oId) references orders(oId),
    foreign key (itemNo) references items(itemNo)
);

create table storeItem(
    itemNo int(2),
    sId int(2),
    quantity int(2),
    foreign key (sId) references store(sId),
    foreign key (itemNo) references items(itemNo)
); 

insert into city values(1,'Bhubaneswar','Odisha'),(2,'Delhi','Delhi'),(3,'Pune','Maharashtra'),(4,'Jaipur','Rajasthan'),(5,'Patna','Bihar');

insert into warehouse values
(1,'w1','gothapatna','{"extra":"something"}',1),
(2,'w2','patia','{"extra":"something"}',1),
(3,'w1','ncr','{"extra":"something"}',2),
(4,'w2','chandi chowk','{"extra":"something"}',2),
(5,'w1','hinjewadi','{"extra":"something"}',3),
(6,'w2','saucer','{"extra":"something"}',3),
(7,'w1','hawa mahal','{"extra":"something"}',4),
(8,'w2','seesh mahal','{"extra":"something"}',4),
(9,'w1','saloon','{"extra":"something"}',5),
(10,'w2','ram mandir','{"extra":"something"}',5);

insert into store values 
(1,'ek',1),
(2,'do',1),
(3,'teen',2),
(4,'char',2),
(5,'panch',3),
(6,'che',3),
(7,'sath',4),
(8,'aath',4),
(9,'naw',5),
(10,'dus',6),
(11,'gyara',7),
(12,'bara',8),
(13,'tera',8),
(14,'chowda',9),
(15,'pandra',10),
(16,'Sola',8);

insert into customer values
(1,'Mr. Patil','Andheri','Mumbai'),
(2,'Mr. Rahul','Patia','Bhubaneswar'),
(3,'Ms. Neha','ncr','Delhi'),
(4,'Mr. Modi','gandhi nagar','Amhedabad'),
(5,'Mr. Shah','saucer','Pune'),
(6,'Ms. Gandhi','ghar','Porbandar'),
(7,'Mr. Nehru','barkas','Hyderabad');

insert into orders values
(2,'22,05,01',2),
(1,'12.12.12',1),
(3,'22,05,02',1),
(4,'22,05,03',2),
(5,'22,05,04',1),
(6,'22,06,01',3),
(7,'22,06,01',4),
(8,'22,06,01',4),
(9,'22,06,01',5),
(10,'22,06,01',5),
(11,'22,06,02',6),
(12,'22,06,03',6),
(13,'22,07,20',6),
(14,'22,07,21',7),
(15,'22,07,21',6),
(16,'22,08,01',3),
(17,'22,08,01',2),
(18,'22,08,02',1),
(19,'22,08,03',1),
(20,'22,08,04',4),
(21,'22,08,05',5);

insert into items values
(1,'Sneakers',700.00,499.00),
(2,'Perfume',150.00,99.00),
(3,'Silver-Braclet',5.50,999.00),
(4,'Shirt',350.00,399.00),
(5,'Belt',500.00,199.00),
(6,'Silver-Ring',3.75,599.50);

insert into orderItem(oId,itemNo,quantity) values
(2,1,1),
(3,2,2),
(4,3,3),
(5,4,4),
(6,5,1),
(8,6,2),
(8,1,3),
(9,1,4),
(6,2,1),
(7,3,2),
(8,4,3),
(9,5,4),
(10,2,1),
(11,3,2),
(12,4,3),
(13,5,4),
(14,1,1),
(15,6,2),
(16,5,5),
(17,4,4),
(18,1,1),
(19,6,2),
(16,5,3),
(17,4,5),
(20,5,3),
(21,4,4),
(1,5,2),
(21,2,4),
(19,3,2);


insert into storeItem values
(1,1,1),
(2,2,2),
(3,3,3),
(4,4,4),
(5,5,5),
(6,5,6),
(5,6,5),
(6,6,1),
(1,7,2),
(2,8,3),
(3,9,4),
(4,10,5),
(5,11,1),
(6,12,2),
(1,13,3),
(2,14,4),
(3,15,5),
(4,15,10);