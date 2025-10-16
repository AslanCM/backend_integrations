INSERT INTO `user_types` (`id`, `name`) VALUES (1, 'operator'), (2, 'customer');

INSERT INTO `users` (`id`, `email`, `password_hash`, `user_type_id`) VALUES
(101, 'operator@b2b.com', '$2b$10$E9p9k5h9y1w3f8Z3q6n5Ue/L5R9g3a1A2B4C5D6E7F8G9H0I1J2K', 1),
(102, 'j.doe@acme.com', '$2b$10$E9p9k5h9y1w3f8Z3q6n5Ue/L5R9g3a1A2B4C5D6E7F8G9H0I1J2K', 2);

INSERT INTO `customers` (`id`, `name`, `email`, `phone`, `user_id`) VALUES
(1, 'ACME Corporation', 'ops@acme.com', '555-0101', 102),
(2, 'Stark Industries', 'contact@stark.com', '555-0102', NULL);

INSERT INTO `products` (`id`, `sku`, `name`, `price_cents`, `stock`) VALUES
(1, 'PROD-001', 'Widget Estándar', 15000, 100), -- 150.00
(2, 'PROD-002', 'Widget Premium', 35000, 50),  -- 350.00
(3, 'PROD-003', 'Accesorio Widget', 550, 200);   -- 5.50