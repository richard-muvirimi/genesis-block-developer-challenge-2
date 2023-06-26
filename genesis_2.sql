-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 26, 2023 at 08:07 AM
-- Server version: 8.0.33
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `genesis_2`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(166, '2023_06_24_190235_create_permission_tables', 1),
(172, '2014_10_12_000000_create_users_table', 2),
(173, '2014_10_12_100000_create_password_reset_tokens_table', 2),
(174, '2019_08_19_000000_create_failed_jobs_table', 2),
(175, '2019_12_14_000001_create_personal_access_tokens_table', 2),
(176, '2023_06_24_172819_create_todos_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'edit todo', 'api', '2023-06-25 07:04:16', '2023-06-25 07:04:16'),
(2, 'edit account', 'api', '2023-06-25 07:04:16', '2023-06-25 07:04:16'),
(3, 'edit others todo', 'api', '2023-06-25 07:04:16', '2023-06-25 07:04:16'),
(4, 'edit others account', 'api', '2023-06-25 07:04:16', '2023-06-25 07:04:16'),
(5, 'create todo', 'api', '2023-06-25 07:04:16', '2023-06-25 07:04:16'),
(6, 'create account', 'api', '2023-06-25 07:04:16', '2023-06-25 07:04:16'),
(7, 'create others todo', 'api', '2023-06-25 07:04:16', '2023-06-25 07:04:16'),
(8, 'create others account', 'api', '2023-06-25 07:04:16', '2023-06-25 07:04:16'),
(9, 'delete todo', 'api', '2023-06-25 07:04:16', '2023-06-25 07:04:16'),
(10, 'delete account', 'api', '2023-06-25 07:04:16', '2023-06-25 07:04:16'),
(11, 'delete others todo', 'api', '2023-06-25 07:04:16', '2023-06-25 07:04:16'),
(12, 'delete others account', 'api', '2023-06-25 07:04:16', '2023-06-25 07:04:16'),
(13, 'view todo', 'api', '2023-06-25 07:04:16', '2023-06-25 07:04:16'),
(14, 'view account', 'api', '2023-06-25 07:04:16', '2023-06-25 07:04:16'),
(15, 'view others todo', 'api', '2023-06-25 07:04:16', '2023-06-25 07:04:16'),
(16, 'view others account', 'api', '2023-06-25 07:04:16', '2023-06-25 07:04:16');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(12, 'App\\Models\\User', 1, 'token', '511de7cab902783dcc901209141224eafd0239e958cf70a13527538be99b7ac4', '[\"view:todo\",\"create:todo\",\"delete:todo\",\"update:todo\",\"view:account\",\"create:account\",\"delete:account\",\"update:account\"]', '2023-06-26 02:20:22', NULL, '2023-06-26 02:04:50', '2023-06-26 02:20:22');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'administrator', 'api', '2023-06-25 07:04:16', '2023-06-25 07:04:16'),
(2, 'user', 'api', '2023-06-25 07:04:16', '2023-06-25 07:04:16');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(16, 1),
(1, 2),
(2, 2),
(5, 2),
(6, 2),
(9, 2),
(10, 2),
(13, 2),
(14, 2);

-- --------------------------------------------------------

--
-- Table structure for table `todos`
--

CREATE TABLE `todos` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `title` tinytext COLLATE utf8mb4_unicode_ci NOT NULL,
  `memo` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `completed_at` timestamp NULL DEFAULT NULL,
  `remind_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `todos`
--

INSERT INTO `todos` (`id`, `user_id`, `title`, `memo`, `completed_at`, `remind_at`, `created_at`, `updated_at`) VALUES
(1, 1, 'Harum et quis.', 'Don\'t let me hear the Rabbit in a large fan in the sea. The master was an old Crab took the hookah into its face was quite a conversation of it altogether; but after a fashion, and this was his.', NULL, '2023-08-20 12:59:45', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(2, 1, 'Reprehenderit.', 'Hatter hurriedly left the court, without even looking round. \'I\'ll fetch the executioner myself,\' said the King. Here one of them.\' In another moment that it led into a pig,\' Alice quietly said.', NULL, '2024-05-17 13:56:37', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(3, 1, 'Non velit est.', 'I to do?\' said Alice. \'Exactly so,\' said the Gryphon. \'They can\'t have anything to put his shoes on. \'--and just take his head sadly. \'Do I look like it?\' he said. \'Fifteenth,\' said the Queen.', NULL, '2024-06-19 13:05:04', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(4, 2, 'Quasi ex aliquam.', 'Alice, who was a very good height indeed!\' said the young man said, \'And your hair has become very white; And yet I don\'t care which happens!\' She ate a little bottle that stood near the entrance of.', NULL, '2024-03-19 01:32:27', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(5, 2, 'Aspernatur.', 'I can listen all day about it!\' and he went on all the same, shedding gallons of tears, until there was no longer to be lost, as she heard one of the deepest contempt. \'I\'ve seen hatters before,\'.', NULL, '2024-04-28 22:31:29', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(6, 2, 'Nihil sint autem.', 'Wonderland of long ago: and how she would have appeared to them she heard something like it,\' said the sage, as he found it advisable--\"\' \'Found WHAT?\' said the Dodo, \'the best way to hear it say.', NULL, '2024-06-11 06:43:08', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(7, 3, 'Vitae eos et.', 'No, I\'ve made up my mind about it; if I\'m Mabel, I\'ll stay down here! It\'ll be no use in knocking,\' said the cook. The King looked anxiously round, to make personal remarks,\' Alice said to herself.', NULL, '2023-07-21 00:05:52', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(8, 3, 'Totam eius ea.', 'She gave me a pair of gloves and a large canvas bag, which tied up at the proposal. \'Then the eleventh day must have been changed in the distance would take the place where it had come to the.', NULL, '2023-12-15 15:22:01', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(9, 3, 'Tempore tenetur.', 'Hatter, it woke up again with a sudden leap out of the jury asked. \'That I can\'t get out of its mouth and began an account of the teacups as the door and went stamping about, and crept a little.', NULL, '2023-12-07 11:13:00', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(10, 4, 'Aspernatur ex hic.', 'The Duchess took her choice, and was delighted to find any. And yet I wish I could not stand, and she ran out of a well?\' \'Take some more bread-and-butter--\' \'But what did the Dormouse crossed the.', NULL, '2023-07-04 05:40:40', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(11, 4, 'Provident eum.', 'Arithmetic--Ambition, Distraction, Uglification, and Derision.\' \'I never said I could let you out, you know.\' He was an old crab, HE was.\' \'I never said I didn\'t!\' interrupted Alice. \'You did,\' said.', NULL, '2023-09-16 03:07:45', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(12, 4, 'Non repudiandae.', 'Mouse to tell you--all I know I do!\' said Alice thoughtfully: \'but then--I shouldn\'t be hungry for it, you know--\' \'But, it goes on \"THEY ALL RETURNED FROM HIM TO YOU,\"\' said Alice. \'I mean what I.', NULL, '2024-03-28 10:53:21', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(13, 5, 'Natus sapiente quas.', 'Mock Turtle to the other side, the puppy made another rush at the window.\' \'THAT you won\'t\' thought Alice, \'shall I NEVER get any older than I am to see if he were trying to invent something!\'.', NULL, '2023-07-14 20:03:42', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(14, 5, 'Nihil quia.', 'ONE.\' \'One, indeed!\' said the Duchess, the Duchess! Oh! won\'t she be savage if I\'ve kept her waiting!\' Alice felt that it ought to eat her up in such a puzzled expression that she ran off at once.', NULL, '2024-05-31 20:36:33', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(15, 5, 'Deserunt velit.', 'Alice, swallowing down her flamingo, and began staring at the bottom of the suppressed guinea-pigs, filled the air, I\'m afraid, but you might knock, and I could shut up like a mouse, That he met in.', NULL, '2023-07-10 12:57:28', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(16, 6, 'Quis consequatur.', 'Why, I wouldn\'t say anything about it, you may SIT down,\' the King very decidedly, and there was a most extraordinary noise going on within--a constant howling and sneezing, and every now and then.', NULL, '2023-11-08 20:42:55', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(17, 6, 'Voluptas aut nisi.', 'Caterpillar The Caterpillar and Alice looked all round her, calling out in a hurry that she tipped over the list, feeling very curious to see the earth takes twenty-four hours to turn into a tidy.', NULL, '2023-08-12 02:57:31', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(18, 6, 'Laborum eaque.', 'She soon got it out again, and made a snatch in the air. This time Alice waited patiently until it chose to speak first, \'why your cat grins like that?\' \'It\'s a pun!\' the King had said that day. \'A.', NULL, '2024-05-12 15:12:16', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(19, 7, 'Adipisci numquam.', 'Queen, and Alice, were in custody and under sentence of execution.\' \'What for?\' said Alice. \'Come on, then,\' said Alice, always ready to sink into the darkness as hard as she spoke--fancy CURTSEYING.', NULL, '2024-02-22 04:01:44', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(20, 7, 'Deserunt sequi.', 'I\'m going to do such a dreadful time.\' So Alice began to feel a little timidly, \'why you are very dull!\' \'You ought to be talking in a bit.\' \'Perhaps it doesn\'t matter much,\' thought Alice, \'they\'re.', NULL, '2024-05-05 19:34:33', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(21, 7, 'Explicabo deserunt.', 'For he can thoroughly enjoy The pepper when he finds out who was sitting on the second thing is to France-- Then turn not pale, beloved snail, but come and join the dance. Will you, won\'t you, will.', NULL, '2024-02-28 15:30:46', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(22, 8, 'Impedit molestias.', 'I should think it so quickly that the Gryphon replied rather impatiently: \'any shrimp could have told you butter wouldn\'t suit the works!\' he added in a sorrowful tone; \'at least there\'s no meaning.', NULL, '2023-09-25 23:26:54', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(23, 8, 'Blanditiis tenetur.', 'Beautiful, beauti--FUL SOUP!\' \'Chorus again!\' cried the Mouse, getting up and went on for some way, and the White Rabbit, who was gently brushing away some dead leaves that lay far below her. \'What.', NULL, '2023-06-30 00:12:38', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(24, 8, 'Sunt molestiae.', 'I know who I am! But I\'d better take him his fan and gloves, and, as there was a little of the right-hand bit to try the experiment?\' \'HE might bite,\' Alice cautiously replied: \'but I haven\'t been.', NULL, '2023-12-23 15:15:49', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(25, 9, 'Et sint qui.', 'I can guess that,\' she added in an offended tone, and everybody else. \'Leave off that!\' screamed the Queen. \'Never!\' said the March Hare moved into the garden, where Alice could not help bursting.', NULL, '2023-10-07 03:39:16', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(26, 9, 'Quia nulla.', 'Queen, \'Really, my dear, YOU must cross-examine the next witness.\' And he got up very sulkily and crossed over to herself, \'after such a new idea to Alice, flinging the baby joined):-- \'Wow! wow!.', NULL, '2024-02-26 07:08:53', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(27, 9, 'Qui velit similique.', 'After a while she remembered trying to find that she looked up eagerly, half hoping that the pebbles were all shaped like the right words,\' said poor Alice, that she was talking. \'How CAN I have.', NULL, '2024-04-19 06:22:05', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(28, 10, 'Et dolores aut est.', 'Alice dear!\' said her sister; \'Why, what are they made of?\' \'Pepper, mostly,\' said the King. Here one of them can explain it,\' said the Cat, and vanished. Alice was more hopeless than ever: she sat.', NULL, '2023-08-29 13:04:15', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(29, 10, 'Quae omnis et.', 'First, however, she waited patiently. \'Once,\' said the one who got any advantage from the sky! Ugh, Serpent!\' \'But I\'m NOT a serpent, I tell you!\' said Alice. \'Nothing WHATEVER?\' persisted the King.', NULL, '2024-04-28 21:18:49', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(30, 10, 'Voluptate rerum ab.', 'Gryphon, and the Queen, but she saw in my time, but never ONE with such a hurry that she still held the pieces of mushroom in her brother\'s Latin Grammar, \'A mouse--of a mouse--to a mouse--a.', NULL, '2024-02-16 21:07:09', '2023-06-25 07:23:09', '2023-06-25 07:23:09');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('administrator','user') COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Bruce Erdman', 'fgibson@example.com', 'user', '2023-06-25 07:23:07', '$2y$10$0NvGB2mNaQZBIzLRbqt8Mu4Z1OoU95KsPGNlAGpL7isJ.qCyO9mwu', 'elk6tlj1Su', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(2, 'Elian Pollich', 'dariana68@example.org', 'administrator', '2023-06-25 07:23:08', '$2y$10$43mZZgdiyAqjfDdxujJ2Y.tJc6w1cDUnuRv/HgSnipgoAckXuzrP.', 'PDa1bQK3tS', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(3, 'Janice O\'Reilly', 'tharris@example.com', 'user', '2023-06-25 07:23:08', '$2y$10$OMH.bSGpl./aIcv6LRqe6eFiAVI3lEHSmH0PwF0w33IB9XBztgFNm', 'GgormLBq7g', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(4, 'Mrs. Audreanne Aufderhar II', 'lula31@example.org', 'administrator', '2023-06-25 07:23:08', '$2y$10$BXyYizWr8Ry4us8BYLz7XeSXGN8VhqZC/n1EAJL2ke.Uwla6Oi24O', '4SgoRiA4tL', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(5, 'Talia Legros', 'dmacejkovic@example.net', 'administrator', '2023-06-25 07:23:08', '$2y$10$zaZvviYemGarhyYZSrEGteULykHZtd1iSCYjcWF22EcJaw.azCGRa', 'J8DTdF8b7n', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(6, 'Prof. Myriam Johnston', 'hsmith@example.org', 'administrator', '2023-06-25 07:23:08', '$2y$10$RTmZ3qykP8upOJKS3ZFAbeYXxPw49laktJ0K96ksLmqpv7pg/U.2q', 's5GrEgphyc', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(7, 'Prof. Erich VonRueden', 'everette.heathcote@example.org', 'user', '2023-06-25 07:23:08', '$2y$10$X7ZL1vXGrIIBLZhcCs3cruoA232SuD/8IMtRLXD7KcRZFFl4D2qS.', 'qlmcl5X4pD', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(8, 'Prof. Arnold O\'Connell DDS', 'rodrick54@example.net', 'user', '2023-06-25 07:23:08', '$2y$10$FslZepoXlUyvicNobU9Df.p.V.znzr8pslOdLwd4FAbQPtXEC2TIO', 'YxoNxPP42g', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(9, 'Miss Idell Durgan II', 'ffunk@example.org', 'administrator', '2023-06-25 07:23:09', '$2y$10$Dpg2U9fVQqqvoBz91cpv9Ogl.zLlMYktIrVicf/ZG5LdBhxiyzQ7W', 'U77CNwRUOY', '2023-06-25 07:23:09', '2023-06-25 07:23:09'),
(10, 'Anastasia Heidenreich', 'lind.andreane@example.org', 'user', '2023-06-25 07:23:09', '$2y$10$8cW3sR7/AC.DWXSvK.03SuRObIGIr/bQcRUArr8yW0bI57ebjBSJu', 'eGwR3mhOZU', '2023-06-25 07:23:09', '2023-06-25 07:23:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `todos`
--
ALTER TABLE `todos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `todos_user_id_foreign` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=177;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `todos`
--
ALTER TABLE `todos`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `todos`
--
ALTER TABLE `todos`
  ADD CONSTRAINT `todos_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
