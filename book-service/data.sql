INSERT INTO publishers (name) VALUES
  ('VIZ, Inc.'),
  ('Kodansha Comics USA'),
  ('Yen Press');

INSERT INTO authors (name) VALUES
  ('Tatsuya Endo'),
  ('Muneyuki Kaneshiro'),
  ('Yusuke Nomura'),
  ('Fuka Mizutani');

INSERT INTO books (isbn13, title, edition, publisher_id, publication_date, cover) VALUES
  ('9781974715466', 'Spy x Family, Vol. 1', NULL, 1, '2020-06-02', 'https://dw9to29mmj727.cloudfront.net/products/1974715469.jpg'),
  ('9781974717248', 'Spy x Family, Vol. 2', NULL, 1, '2020-09-01', 'https://dw9to29mmj727.cloudfront.net/products/1974717240.jpg'),
  ('9781974718160', 'Spy x Family, Vol. 3', NULL, 1, '2020-12-01', 'https://dw9to29mmj727.cloudfront.net/products/1974718166.jpg'),
  ('9781974721030', 'Spy x Family, Vol. 4', NULL, 1, '2021-03-02', 'https://dw9to29mmj727.cloudfront.net/products/1974721035.jpg'),
  ('9781974722945', 'Spy x Family, Vol. 5', NULL, 1, '2021-06-08', 'https://dw9to29mmj727.cloudfront.net/products/1974722945.jpg'),
  ('9781974725137', 'Spy x Family, Vol. 6', NULL, 1, '2021-10-05', 'https://dw9to29mmj727.cloudfront.net/products/1974725138.jpg'),
  ('9781974728480', 'Spy x Family, Vol. 7', NULL, 1, '2022-04-05', 'https://dw9to29mmj727.cloudfront.net/products/197472848X.jpg'),
  ('9781974734276', 'Spy x Family, Vol. 8', NULL, 1, '2022-09-20', 'https://dw9to29mmj727.cloudfront.net/products/1974734277.jpg'),
  ('9781974736287', 'Spy x Family, Vol. 9', NULL, 1, '2023-03-21', 'https://dw9to29mmj727.cloudfront.net/products/1974736288.jpg'),
  
  ('9781646516544', 'Blue Lock, Volume 1', NULL, 2, '2022-06-21', 'https://kodansha.us/wp-content/uploads/2021/03/blue_lock_vol_01-683x1024.jpg'),
  ('9781646516551', 'Blue Lock, Volume 2', NULL, 2, '2022-08-30', 'https://kodansha.us/wp-content/uploads/2021/03/blue_lock_vol_02-683x1024.jpg'),

  ('9780316298773', 'Love at Fourteen, Vol. 1', NULL, 3, '2014-12-16', 'https://yenpress-us.imgix.net/covers/9780316298773.jpg?auto=format&w=840&dpr=1&q=100'),
  ('9780316298759', 'Love at Fourteen, Vol. 2', NULL, 3, '2015-03-24', 'https://yenpress-us.imgix.net/covers/9780316298759.JPG?auto=format&w=840&dpr=1&q=100'),
  ('9780316298797', 'Love at Fourteen, Vol. 3', NULL, 3, '2015-06-23', 'https://yenpress-us.imgix.net/covers/9780316298797.jpg?auto=format&w=840&dpr=1&q=100'),
  ('9780316348768', 'Love at Fourteen, Vol. 4', NULL, 3, '2015-09-22', 'https://yenpress-us.imgix.net/covers/9780316348768.JPG?auto=format&w=840&dpr=1&q=100'),
  ('9780316390545', 'Love at Fourteen, Vol. 5', NULL, 3, '2016-02-23', 'https://yenpress-us.imgix.net/covers/9780316390545.JPG?auto=format&w=840&dpr=1&q=100'),
  ('9780316469289', 'Love at Fourteen, Vol. 6', NULL, 3, '2017-03-21', 'https://yenpress-us.imgix.net/covers/9780316469289.jpg?auto=format&w=840&dpr=1&q=100'),
  ('9781975300081', 'Love at Fourteen, Vol. 7', NULL, 3, '2018-10-04', 'https://yenpress-us.imgix.net/covers/9781975300081.JPG?auto=format&w=840&dpr=1&q=100'),
  ('9781975328122', 'Love at Fourteen, Vol. 8', NULL, 3, '2018-11-13', 'https://yenpress-us.imgix.net/covers/9781975328122.jpg?auto=format&w=840&dpr=1&q=100'),
  ('9781975332198', 'Love at Fourteen, Vol. 9', NULL, 3, '2019-09-24', 'https://yenpress-us.imgix.net/covers/9781975332198.JPG?auto=format&w=840&dpr=1&q=100'),
  ('9781975316853', 'Love at Fourteen, Vol. 10', NULL, 3, '2021-06-29', 'https://yenpress-us.imgix.net/covers/9781975316853.jpg?auto=format&w=840&dpr=1&q=100'),
  ('9781975338244', 'Love at Fourteen, Vol. 11', NULL, 3, '2022-02-22', 'https://yenpress-us.imgix.net/covers/9781975338244.jpg?auto=format&w=840&dpr=1&q=100'),
  ('9781975349424', 'Love at Fourteen, Vol. 12', NULL, 3, '2022-12-13', 'https://yenpress-us.imgix.net/covers/9781975349424.jpg?auto=format&w=840&dpr=1&q=100');

INSERT INTO series (name, length, status) VALUES
  ('Spy x Family', 8, 'ongoing'),
  ('Blue Lock', 2, 'ongoing'),
  ('Love at Fourteen', 12, 'complete');

INSERT INTO book_series (book_id, series_id) VALUES
  (1, 1),
  (2, 1),
  (3, 1),
  (4, 1),
  (5, 1),
  (6, 1),
  (7, 1),
  (8, 1),
  (9, 1),

  (10, 2),
  (11, 2),
  
  (12, 3),
  (13, 3),
  (14, 3),
  (15, 3),
  (16, 3),
  (17, 3),
  (18, 3),
  (19, 3),
  (20, 3),
  (21, 3),
  (22, 3),
  (23, 3);

INSERT INTO book_authors (book_id, author_id) VALUES
  (1, 1),
  (2, 1),
  (3, 1),
  (4, 1),
  (5, 1),
  (6, 1),
  (7, 1),
  (8, 1),
  (9, 1),

  (10, 2),
  (10, 3),
  (11, 2),
  (11, 3),
  
  (12, 4),
  (13, 4),
  (14, 4),
  (15, 4),
  (16, 4),
  (17, 4),
  (18, 4),
  (19, 4),
  (20, 4),
  (21, 4),
  (22, 4),
  (23, 4);
