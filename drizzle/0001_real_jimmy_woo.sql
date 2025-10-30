ALTER TABLE `attendance` RENAME TO `check_in`;--> statement-breakpoint
CREATE TABLE `attendance_session` (
	`id` text PRIMARY KEY NOT NULL,
	`creatorId` text NOT NULL,
	`groupId` text,
	`code` text NOT NULL,
	`description` text DEFAULT '',
	`isActive` integer DEFAULT true NOT NULL,
	`focusPoint` text DEFAULT 'null',
	`radiusInMeters` integer,
	`maximumAttendees` integer DEFAULT 100 NOT NULL,
	`startsAt` integer NOT NULL,
	`endsAt` integer,
	`createdAt` integer DEFAULT (strftime('%s','now')) NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s','now')) NOT NULL,
	FOREIGN KEY (`creatorId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`groupId`) REFERENCES `group`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `attendance_session_code_unique` ON `attendance_session` (`code`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_check_in` (
	`id` text PRIMARY KEY NOT NULL,
	`groupId` text,
	`memberId` text,
	`createdAt` integer DEFAULT (strftime('%s','now')) NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s','now')) NOT NULL,
	FOREIGN KEY (`groupId`) REFERENCES `group`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`memberId`) REFERENCES `group_member`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_check_in`("id", "groupId", "memberId", "createdAt", "updatedAt") SELECT "id", "groupId", "memberId", "createdAt", "updatedAt" FROM `check_in`;--> statement-breakpoint
DROP TABLE `check_in`;--> statement-breakpoint
ALTER TABLE `__new_check_in` RENAME TO `check_in`;--> statement-breakpoint
PRAGMA foreign_keys=ON;