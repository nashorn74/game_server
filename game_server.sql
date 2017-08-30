create database game_server;

use game_server;

create table user (
	id integer primary key auto_increment,
	name text not null,
	email text not null,
	password text not null,
	created_at datetime not null default current_timestamp
) default charset=utf8;

create table user_login (
	id integer primary key auto_increment,
	user_id integer not null UNIQUE,
	token text not null,
	created_at datetime not null default current_timestamp,
    foreign key (`user_id`) references `user` (`id`)
) default charset=utf8;

create table user_purchase (
	id integer primary key auto_increment,
	user_id integer not null,
	money integer not null,
	description text not null,
	receipt_code text not null,
	created_at datetime not null default current_timestamp,
    foreign key (`user_id`) references `user` (`id`)
) default charset=utf8;

create table user_character (
	id integer primary key auto_increment,
	user_id integer not null UNIQUE,
	race integer not null,
	gold integer not null default 0,
	hp integer not null default 0,
	mp integer not null default 0,
	exp integer not null default 0,
	level integer not null default 0,
	attack_point integer not null default 0,
	defence_point integer not null default 0,
	attack_item_id integer not null,
	defence_item1_id integer not null,
	defence_item2_id integer not null,
	defence_item3_id integer not null,
	defence_item4_id integer not null,
	defence_item5_id integer not null,
	created_at datetime not null default current_timestamp,
    foreign key (`user_id`) references `user` (`id`)
) default charset=utf8;

create table item (
	id integer primary key auto_increment,
	name text not null,
	type integer not null default 0,
	price integer not null default 0,
	attack integer not null default 0,
	defence integer not null default 0,
	mp_spend integer not null default 0,
	hp_recovery integer not null default 0,
	mp_recovery integer not null default 0,
	temp_attack integer not null default 0,
	temp_defence integer not null default 0,
	created_at datetime not null default current_timestamp
) default charset=utf8;

create table user_item (
	id integer primary key auto_increment,
	user_id integer not null,
	item_id integer not null,
	created_at datetime not null default current_timestamp,
    foreign key (`user_id`) references `user` (`id`),
    foreign key (`item_id`) references `item` (`id`)
) default charset=utf8;

create table notice (
	id integer primary key auto_increment,
	title text not null,
	content text not null,
	created_at datetime not null default current_timestamp
) default charset=utf8;

create table version (
	id integer primary key auto_increment,
	os text not null,
	major integer not null default 0,
	minor integer not null default 0,
	build integer not null default 0,
	created_at datetime not null default current_timestamp
) default charset=utf8;
    
insert into notice(title, content) values('테스트1','테스트1입니다.');
insert into notice(title, content) values('테스트2','테스트2입니다.');
insert into notice(title, content) values('테스트3','테스트3입니다.');
insert into notice(title, content) values('테스트4','테스트4입니다.');
insert into notice(title, content) values('테스트5','테스트5입니다.');

insert into version(os, major, minor, build) values('Android', 0, 0, 1);
insert into version(os, major, minor, build) values('Android', 0, 0, 2);
insert into version(os, major, minor, build) values('iOS', 0, 1, 0);
insert into version(os, major, minor, build) values('iOS', 0, 1, 2);
