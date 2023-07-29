/* 
add directly to supabase table with the following SQL:

INSERT INTO bookings (startdate, enddate, status, numguests, cabinprice, hasbreakfast, totalprice, ispaid, cabinid, guestid, observations)
VALUES
    ('2023-08-01T12:00:00', '2023-08-08T09:45:36', 'checked-in', 2, 540, true, 1080, false, 1, 2, 'I have a gluten allergy and would like to request a gluten-free breakfast.'),
    ('2023-07-10T12:00:00', '2023-07-20T09:45:36', 'checked-out', 1, 475, true, 950, true, 2, 3, ''),
    ('2023-09-15T12:00:00', '2023-09-22T09:45:36', 'confirmed', 2, 625, false, 1250, true, 3, 4, ''),
    ('2023-07-29T12:00:00', '2023-08-05T09:45:36', 'cancelled', 4, 195, true, 780, true, 4, 5, 'Reservation cancelled due to change of plans.'),
    ('2023-08-10T12:00:00', '2023-08-17T09:45:36', 'checked-in', 2, 460, true, 920, true, 5, 6, ''),
    ('2023-09-01T12:00:00', '2023-09-08T09:45:36', 'confirmed', 1, 525, true, 1050, false, 6, 7, 'Please arrange for early check-in.');

*/
