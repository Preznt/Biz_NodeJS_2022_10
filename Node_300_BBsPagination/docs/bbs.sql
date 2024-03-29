USE bbsDbv2;

/*
	작성일자, 작성시각 : 최초 insert 를 할때 자동으로 추가되는 항목
     b_update : 테이블의 데이터가 insert, update 될때 timestamp 를 자동으로 갱신
*/
CREATE TABLE tbl_bbs(
b_seq	bigint	PRIMARY	KEY auto_increment,
b_pseq	bigint	,	
b_date	varchar(10)	DEFAULT (date_format(now(),'%Y-%m-%d'))	,
b_time	varchar(10)	DEFAULT (date_format(now(),'%H:%i:%S')),	
b_username	varchar(125)	,	
b_nickname	varchar(125)	,	
b_subject	varchar(125)	,	
b_content	text,		
b_count	int	,	
b_update	datetime	DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP	


);

DESC tbl_bbs;

SELECT COUNT(*) FROM tbl_bbs;
SELECT * FROM tbl_bbs LIMIT 30, 10;

USE mybooks2;
Desc tbl_books;

CREATE TABLE IF NOT EXISTS tbl_books(
isbn	varchar(13)	PRIMARY KEY,
title	varchar(125),	
link	varchar(255),	
image	varchar(255),	
author	varchar(125),	
discount	int	,
publisher	varchar(125)	,
description	text,	
pubdate	varchar(20)	,
price	int
);

CREATE DATABASE mybooks2;