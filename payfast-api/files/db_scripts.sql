CREATE DATABASE payfast;

CREATE TABLE `payments` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`payment_method` varchar(255) NOT NULL,
`amount` decimal(10,2) NOT NULL,
`currency` varchar(3) NOT NULL,
`status` varchar(255) NOT NULL,
`payment_date` DATE,
`description` text,
PRIMARY KEY (id)
);