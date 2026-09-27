CREATE TABLE `guests` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`whatsapp` text NOT NULL,
	`attendants` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL
);
