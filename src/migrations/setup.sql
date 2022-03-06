CREATE TABLE books(
isbn  VARCHAR(13) NOT NULL,
title VARCHAR(200) NOT NULL,
author VARCHAR(150) NOT NULL,
overview VARCHAR(1500),
picture BYTEA,
read_count INT DEFAULT 1,
UNIQUE(isbn)
);

INSERT INTO books(isbn,title,author,overview,picture,read_count) VALUES('81-1065','L\Insoutenable Légèreté des êtres','Louis-Ferdinand Céline','Bardamu raconte son expérience de la Première Guerre mondiale,
 du colonialisme','picture 2',7);