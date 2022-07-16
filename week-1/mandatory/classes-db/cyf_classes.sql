create table mentors(
id serial primary key,
name varchar(30) not null,
yearsInGlasgow int not null,
address varchar(120) not null,
favLanguage varchar(15) not null
);

insert into mentors (name, yearsInGlasgow, address, favLanguage) values ('Mark Renton', 33, '25 Abercromby St.', 'ruby');
insert into mentors (name, yearsInGlasgow, address, favLanguage) values ('Francis Begbie', 42, '3 Cardross St.', 'python');
insert into mentors (name, yearsInGlasgow, address, favLanguage) values ('Mike Forrester', 38, '12 Balshagray St.', 'C++');
insert into mentors (name, yearsInGlasgow, address, favLanguage) values ('Simon Williamson', 32, '20 Aikenhead Rd.', 'Java');
insert into mentors (name, yearsInGlasgow, address, favLanguage) values ('Daniel Murphy', 33, '4 Belvidere Av.', 'Javascript');

select * from mentors;

create table students(
id serial primary key,
name varchar(30) not null,
address varchar(120) not null,
cyfGraduate bool not null
);

insert into students (name, address, cyfGraduate) values ('Ewan Cardiff', '2 Elizabeth St.', true);
insert into students (name, address, cyfGraduate) values ('Oscar Tranquil', '32 Waterloo Av.', false);
insert into students (name, address, cyfGraduate) values ('Peter Trelawny', '12 Westborough Pass', true);
insert into students (name, address, cyfGraduate) values ('Diane Sutton', '2 Belvidere St.', true);
insert into students (name, address, cyfGraduate) values ('Victor Pike', '17 Georgetown St.', false);
insert into students (name, address, cyfGraduate) values ('Emmanuel Grisham', '20 Elizabeth St.', true);
insert into students (name, address, cyfGraduate) values ('Ronald Granger', '2 Abbey Rd.', false);
insert into students (name, address, cyfGraduate) values ('Benedict Cucumberhatch', '2 Georgetown St.', false);
insert into students (name, address, cyfGraduate) values ('William Smith', '28 Bloomfield Dr.', true);
insert into students (name, address, cyfGraduate) values ('Thom Yorke', '45 Wallace Rd.', false);

select * from students
select * from mentors;

create table classes(
id 					serial primary key,
leading_mentor		varchar(30),
topic				varchar(15),
class_date			date not null,
class_location		varchar(120)
);

select * from classes
INSERT INTO classes (leading_mentor , topic, class_date, class_location) VALUES ('Mark Renton', 'python', '2022/04/01', 'CS Lab 001');
INSERT INTO classes (leading_mentor , topic, class_date, class_location) VALUES ('Mark Renton', 'javascript', '2022/01/15', 'CS Lab 001');
INSERT INTO classes (leading_mentor , topic, class_date, class_location) VALUES ('Daniel Murphy', 'javascript', '2022/04/01', 'CS Lab 002');
INSERT INTO classes (leading_mentor , topic, class_date, class_location) VALUES ('Francis Begbie', 'python', '2022/01/15', 'CS Lab 002');
INSERT INTO classes (leading_mentor , topic, class_date, class_location) VALUES ('Simon Williamson', 'Java', '2022/07/01', 'CS Lab 001');