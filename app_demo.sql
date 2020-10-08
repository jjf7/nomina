-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-09-2020 a las 17:32:04
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `app_demo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargos`
--

CREATE TABLE `cargos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `sueldo` decimal(20,2) NOT NULL,
  `sueldovar` decimal(20,2) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cargos`
--

INSERT INTO `cargos` (`id`, `nombre`, `sueldo`, `sueldovar`, `descripcion`) VALUES
(1, 'ADMINISTRADORA', '100.00', '100.00', 'ADMINISTRADORA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamentos`
--

CREATE TABLE `departamentos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `departamentos`
--

INSERT INTO `departamentos` (`id`, `nombre`, `created_at`) VALUES
(1, 'DEPARTAMENTO A&amp;B', '2020-09-18 16:48:38'),
(2, 'DEPARTAMENTO AMA DE LLAVES', '2020-09-18 16:49:11'),
(3, 'DEPARTAMENTO ADMINISTRACION', '2020-09-18 16:49:35'),
(4, 'DEPARTAMENTO DE RECEPCION', '2020-09-18 16:49:51'),
(5, 'DEPARTAMENTO MANTENIMIENTO', '2020-09-18 16:50:02'),
(6, 'GERENCIA GENERAL', '2020-09-18 16:50:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_civil`
--

CREATE TABLE `estado_civil` (
  `id` int(11) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `estado_civil`
--

INSERT INTO `estado_civil` (`id`, `nombre`, `created_at`) VALUES
(1, 'Soltero', '2020-09-18 18:13:24'),
(2, 'Divorciado', '2020-09-18 18:13:24'),
(3, 'Casado', '2020-09-18 18:13:34'),
(4, 'Viudo', '2020-09-18 18:13:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo_sanguineo`
--

CREATE TABLE `grupo_sanguineo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `grupo_sanguineo`
--

INSERT INTO `grupo_sanguineo` (`id`, `nombre`, `created_at`) VALUES
(1, 'O RH+', '2020-09-18 16:51:29'),
(2, 'A RH+', '2020-09-18 16:51:40'),
(3, 'AB RH-', '2020-09-18 16:51:51'),
(4, 'AB RH+', '2020-09-18 16:52:03'),
(5, 'B RH-', '2020-09-18 16:52:13'),
(6, 'B RH+', '2020-09-18 16:52:27'),
(7, 'O RH-', '2020-09-18 16:52:38'),
(8, 'O RH+', '2020-09-18 16:52:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

CREATE TABLE `permisos` (
  `id` int(11) NOT NULL,
  `permiso` varchar(120) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `permisos`
--

INSERT INTO `permisos` (`id`, `permiso`, `created_at`) VALUES
(1, 'cargos', '2020-09-18 16:19:30'),
(2, 'usuarios', '2020-09-18 16:22:39'),
(3, 'permisos', '2020-09-18 16:26:40'),
(4, 'grupo_sanguineo', '2020-09-18 16:34:09'),
(5, 'departamentos', '2020-09-18 16:34:09'),
(6, 'empleados', '2020-09-18 16:34:18'),
(7, 'estado_civil', '2020-09-18 16:34:38'),
(8, 'tipos_nominas', '2020-09-18 16:34:38'),
(9, 'sexo', '2020-09-18 16:34:49');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos_usuarios`
--

CREATE TABLE `permisos_usuarios` (
  `id` int(11) NOT NULL,
  `id_permiso` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `permisos_usuarios`
--

INSERT INTO `permisos_usuarios` (`id`, `id_permiso`, `id_usuario`, `created_at`) VALUES
(1, 1, 1, '2020-09-18 16:19:41'),
(2, 2, 1, '2020-09-18 16:22:49'),
(3, 3, 1, '2020-09-18 16:26:50'),
(4, 4, 1, '2020-09-18 16:35:38'),
(5, 5, 1, '2020-09-18 16:35:38'),
(6, 6, 1, '2020-09-18 16:35:38'),
(7, 7, 1, '2020-09-18 16:35:38'),
(8, 8, 1, '2020-09-18 16:35:38'),
(9, 9, 1, '2020-09-18 16:35:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos_usuarios_do`
--

CREATE TABLE `permisos_usuarios_do` (
  `id` int(11) NOT NULL,
  `id_permisos_usuarios` int(11) NOT NULL,
  `doit` enum('get','post','put','delete') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `permisos_usuarios_do`
--

INSERT INTO `permisos_usuarios_do` (`id`, `id_permisos_usuarios`, `doit`, `created_at`) VALUES
(1, 1, 'get', '2020-09-18 16:19:52'),
(2, 2, 'get', '2020-09-18 16:23:08'),
(3, 2, 'post', '2020-09-18 16:23:08'),
(4, 2, 'put', '2020-09-18 16:23:38'),
(5, 2, 'delete', '2020-09-18 16:23:38'),
(6, 3, 'get', '2020-09-18 16:27:10'),
(7, 3, 'post', '2020-09-18 16:27:10'),
(8, 3, 'put', '2020-09-18 16:27:20'),
(9, 3, 'delete', '2020-09-18 16:27:20'),
(10, 1, 'post', '2020-09-18 16:27:41'),
(11, 1, 'put', '2020-09-18 16:27:43'),
(12, 1, 'delete', '2020-09-18 16:27:45'),
(13, 9, 'get', '2020-09-18 16:35:46'),
(14, 9, 'post', '2020-09-18 16:35:47'),
(15, 9, 'put', '2020-09-18 16:35:48'),
(16, 9, 'delete', '2020-09-18 16:35:49'),
(17, 8, 'delete', '2020-09-18 16:35:50'),
(18, 8, 'put', '2020-09-18 16:35:51'),
(19, 8, 'post', '2020-09-18 16:35:51'),
(20, 8, 'get', '2020-09-18 16:35:52'),
(21, 7, 'get', '2020-09-18 16:35:53'),
(22, 7, 'post', '2020-09-18 16:35:54'),
(23, 7, 'put', '2020-09-18 16:35:55'),
(24, 7, 'delete', '2020-09-18 16:35:56'),
(25, 6, 'delete', '2020-09-18 16:35:57'),
(26, 6, 'put', '2020-09-18 16:35:59'),
(27, 6, 'post', '2020-09-18 16:35:59'),
(28, 6, 'get', '2020-09-18 16:36:00'),
(29, 5, 'delete', '2020-09-18 16:36:02'),
(30, 5, 'put', '2020-09-18 16:36:03'),
(31, 5, 'post', '2020-09-18 16:36:04'),
(32, 5, 'get', '2020-09-18 16:36:04'),
(33, 4, 'get', '2020-09-18 16:36:05'),
(34, 4, 'post', '2020-09-18 16:36:06'),
(35, 4, 'put', '2020-09-18 16:36:07'),
(36, 4, 'delete', '2020-09-18 16:36:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sexo`
--

CREATE TABLE `sexo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sexo`
--

INSERT INTO `sexo` (`id`, `nombre`, `created_at`) VALUES
(1, 'Masculino', '2020-09-18 16:50:53'),
(2, 'Femenino', '2020-09-18 16:50:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_nominas`
--

CREATE TABLE `tipos_nominas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipos_nominas`
--

INSERT INTO `tipos_nominas` (`id`, `nombre`, `created_at`) VALUES
(1, 'Quincenal', '2020-09-18 16:45:21'),
(2, 'Mensual', '2020-09-18 16:45:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(120) NOT NULL,
  `password` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `created_at`) VALUES
(1, 'jfsistemas.contacto@gmail.com', '$2b$10$2siSMwHOSa0IjbuHNl700OkeQ8ZNsXjdI7S3u7Zy0iO8wR./omydO', '2020-07-04 17:48:55');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cargos`
--
ALTER TABLE `cargos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `departamentos`
--
ALTER TABLE `departamentos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estado_civil`
--
ALTER TABLE `estado_civil`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `grupo_sanguineo`
--
ALTER TABLE `grupo_sanguineo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `permisos_usuarios`
--
ALTER TABLE `permisos_usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `permisos_usuarios_do`
--
ALTER TABLE `permisos_usuarios_do`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sexo`
--
ALTER TABLE `sexo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipos_nominas`
--
ALTER TABLE `tipos_nominas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cargos`
--
ALTER TABLE `cargos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `departamentos`
--
ALTER TABLE `departamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `estado_civil`
--
ALTER TABLE `estado_civil`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `grupo_sanguineo`
--
ALTER TABLE `grupo_sanguineo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `permisos`
--
ALTER TABLE `permisos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `permisos_usuarios`
--
ALTER TABLE `permisos_usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `permisos_usuarios_do`
--
ALTER TABLE `permisos_usuarios_do`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `sexo`
--
ALTER TABLE `sexo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipos_nominas`
--
ALTER TABLE `tipos_nominas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
