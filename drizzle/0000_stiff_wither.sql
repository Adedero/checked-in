CREATE TABLE `attendance` (
	`id` text PRIMARY KEY NOT NULL,
	`groupId` text,
	`memberId` text,
	`createdAt` integer DEFAULT (strftime('%s','now')) NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s','now')) NOT NULL,
	FOREIGN KEY (`groupId`) REFERENCES `group`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`memberId`) REFERENCES `group_member`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `group_member` (
	`id` text PRIMARY KEY NOT NULL,
	`groupId` text NOT NULL,
	`userId` text NOT NULL,
	`data` text,
	`createdAt` integer DEFAULT (strftime('%s','now')) NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s','now')) NOT NULL,
	FOREIGN KEY (`groupId`) REFERENCES `group`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `group_id_user_id_unique` ON `group_member` (`groupId`,`userId`);--> statement-breakpoint
CREATE TABLE `group` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`image` text,
	`maxMembers` integer DEFAULT 10000 NOT NULL,
	`requiresApproval` integer DEFAULT false NOT NULL,
	`data` text,
	`creatorId` text NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s','now')) NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s','now')) NOT NULL,
	FOREIGN KEY (`creatorId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `account` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`accountId` text NOT NULL,
	`providerId` text NOT NULL,
	`accessToken` text,
	`refreshToken` text,
	`accessTokenExpiresAt` integer,
	`refreshTokenExpiresAt` integer,
	`scope` text,
	`idToken` text,
	`password` text,
	`createdAt` integer DEFAULT (strftime('%s','now')) NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s','now')) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`token` text NOT NULL,
	`expiresAt` integer NOT NULL,
	`ipAddress` text,
	`userAgent` text,
	`createdAt` integer DEFAULT (strftime('%s','now')) NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s','now')) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`emailVerified` integer DEFAULT false NOT NULL,
	`image` text,
	`role` text DEFAULT 'user' NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s','now')) NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s','now')) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expiresAt` integer NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s','now')) NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s','now')) NOT NULL
);
