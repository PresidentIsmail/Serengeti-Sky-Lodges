import { add } from "date-fns";
import { supabase } from "@/supabase/supabase";

function fromToday(numDays, withTime = false) {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
}

export const bookings = [
  // CABIN 001
  // Additional data (CABIN 001 - CABIN 008)
  // You can add more entries here as needed...

  // CABIN 001
  {
    created_at: fromToday(-11, true),
    startdate: fromToday(2),
    enddate: fromToday(5),
    cabinid: 1,
    guestid: 25,
    hasbreakfast: true,
    observation: "",
    ispaid: true,
    numguests: 1,
    status: "checked-in",
  },
  {
    created_at: fromToday(-10, true),
    startdate: fromToday(14),
    enddate: fromToday(20),
    cabinid: 1,
    guestid: 26,
    hasbreakfast: false,
    observation: "We prefer a room with a view of the lake.",
    ispaid: true,
    numguests: 2,
    status: "checked-in",
  },
  // ... (Add more entries)

  // CABIN 002
  {
    created_at: fromToday(-9, true),
    startdate: fromToday(25),
    enddate: fromToday(30),
    cabinid: 2,
    guestid: 27,
    hasbreakfast: true,
    observation: "We will be arriving late at night, around 11 PM.",
    ispaid: true,
    numguests: 3,
    status: "checked-in",
  },
  {
    created_at: fromToday(-8, true),
    startdate: fromToday(40),
    enddate: fromToday(45),
    cabinid: 2,
    guestid: 28,
    hasbreakfast: true,
    observation: "",
    ispaid: true,
    numguests: 1,
    status: "checked-in",
  },
  // ... (Add more entries)

  // CABIN 003
  {
    created_at: fromToday(-15, true),
    startdate: fromToday(60),
    enddate: fromToday(65),
    cabinid: 3,
    guestid: 29,
    hasbreakfast: false,
    observation: "",
    ispaid: false,
    numguests: 2,
    status: "unconfirmed",
  },
  {
    created_at: fromToday(-14, true),
    startdate: fromToday(75),
    enddate: fromToday(80),
    cabinid: 3,
    guestid: 30,
    hasbreakfast: true,
    observation: "",
    ispaid: true,
    numguests: 4,
    status: "checked-in",
  },
  // ... (Add more entries)

  // CABIN 004
  {
    created_at: fromToday(-5, true),
    startdate: fromToday(90),
    enddate: fromToday(95),
    cabinid: 4,
    guestid: 31,
    hasbreakfast: true,
    observation: "We will need an extra blanket for one of the guests.",
    ispaid: true,
    numguests: 3,
    status: "checked-in",
  },
  {
    created_at: fromToday(-4, true),
    startdate: fromToday(105),
    enddate: fromToday(110),
    cabinid: 4,
    guestid: 32,
    hasbreakfast: false,
    observation: "",
    ispaid: true,
    numguests: 2,
    status: "checked-in",
  },
  // ... (Add more entries)

  // CABIN 005
  {
    created_at: fromToday(-3, true),
    startdate: fromToday(120),
    enddate: fromToday(125),
    cabinid: 5,
    guestid: 33,
    hasbreakfast: true,
    observation: "",
    ispaid: true,
    numguests: 1,
    status: "checked-in",
  },
  {
    created_at: fromToday(-2, true),
    startdate: fromToday(140),
    enddate: fromToday(145),
    cabinid: 5,
    guestid: 34,
    hasbreakfast: true,
    observation: "We are celebrating our anniversary.",
    ispaid: true,
    numguests: 2,
    status: "checked-in",
  },
  // ... (Add more entries)

  // CABIN 006
  {
    created_at: fromToday(-1, true),
    startdate: fromToday(150),
    enddate: fromToday(155),
    cabinid: 6,
    guestid: 35,
    hasbreakfast: false,
    observation: "",
    ispaid: true,
    numguests: 4,
    status: "checked-in",
  },
  {
    created_at: fromToday(0, true),
    startdate: fromToday(170),
    enddate: fromToday(175),
    cabinid: 6,
    guestid: 36,
    hasbreakfast: true,
    observation: "",
    ispaid: true,
    numguests: 5,
    status: "checked-in",
  },
  // ... (Add more entries)

  // CABIN 007
  {
    created_at: fromToday(1, true),
    startdate: fromToday(180),
    enddate: fromToday(185),
    cabinid: 7,
    guestid: 37,
    hasbreakfast: true,
    observation: "We have a pet dog with us.",
    ispaid: true,
    numguests: 3,
    status: "checked-in",
  },
  {
    created_at: fromToday(2, true),
    startdate: fromToday(200),
    enddate: fromToday(205),
    cabinid: 7,
    guestid: 38,
    hasbreakfast: true,
    observation: "",
    ispaid: false,
    numguests: 4,
    status: "unconfirmed",
  },
  // ... (Add more entries)

  // CABIN 008
  {
    created_at: fromToday(3, true),
    startdate: fromToday(220),
    enddate: fromToday(225),
    cabinid: 8,
    guestid: 39,
    hasbreakfast: true,
    observation: "",
    ispaid: true,
    numguests: 2,
    status: "checked-in",
  },
  {
    created_at: fromToday(4, true),
    startdate: fromToday(240),
    enddate: fromToday(245),
    cabinid: 8,
    guestid: 40,
    hasbreakfast: false,
    observation: "",
    ispaid: true,
    numguests: 1,
    status: "checked-in",
  },
  // CABIN 001
  {
    created_at: fromToday(5, true),
    startdate: fromToday(260),
    enddate: fromToday(265),
    cabinid: 1,
    guestid: 41,
    hasbreakfast: true,
    observation: "We need a crib for our baby.",
    ispaid: true,
    numguests: 3,
    status: "checked-in",
  },
  {
    created_at: fromToday(6, true),
    startdate: fromToday(280),
    enddate: fromToday(285),
    cabinid: 1,
    guestid: 42,
    hasbreakfast: false,
    observation: "",
    ispaid: true,
    numguests: 1,
    status: "checked-in",
  },
  // ... (Add more entries)

  // CABIN 002
  {
    created_at: fromToday(7, true),
    startdate: fromToday(300),
    enddate: fromToday(305),
    cabinid: 2,
    guestid: 43,
    hasbreakfast: true,
    observation: "We have allergies, please ensure allergen-free bedding.",
    ispaid: true,
    numguests: 2,
    status: "checked-in",
  },
  {
    created_at: fromToday(8, true),
    startdate: fromToday(320),
    enddate: fromToday(325),
    cabinid: 2,
    guestid: 44,
    hasbreakfast: false,
    observation: "",
    ispaid: true,
    numguests: 4,
    status: "checked-in",
  },
  // ... (Add more entries)

  // CABIN 003
  {
    created_at: fromToday(9, true),
    startdate: fromToday(340),
    enddate: fromToday(345),
    cabinid: 3,
    guestid: 45,
    hasbreakfast: true,
    observation: "",
    ispaid: false,
    numguests: 2,
    status: "unconfirmed",
  },
  {
    created_at: fromToday(10, true),
    startdate: fromToday(360),
    enddate: fromToday(365),
    cabinid: 3,
    guestid: 46,
    hasbreakfast: true,
    observation: "",
    ispaid: true,
    numguests: 4,
    status: "checked-in",
  },
  // ... (Add more entries)

  // CABIN 004
  {
    created_at: fromToday(11, true),
    startdate: fromToday(380),
    enddate: fromToday(385),
    cabinid: 4,
    guestid: 47,
    hasbreakfast: true,
    observation: "We will be arriving early at 9 AM.",
    ispaid: true,
    numguests: 3,
    status: "checked-in",
  },
  {
    created_at: fromToday(12, true),
    startdate: fromToday(400),
    enddate: fromToday(405),
    cabinid: 4,
    guestid: 48,
    hasbreakfast: false,
    observation: "",
    ispaid: true,
    numguests: 2,
    status: "checked-in",
  },
  // ... (Add more entries)

  // CABIN 005
  {
    created_at: fromToday(13, true),
    startdate: fromToday(420),
    enddate: fromToday(425),
    cabinid: 5,
    guestid: 49,
    hasbreakfast: true,
    observation: "",
    ispaid: true,
    numguests: 1,
    status: "checked-in",
  },
  {
    created_at: fromToday(14, true),
    startdate: fromToday(440),
    enddate: fromToday(445),
    cabinid: 5,
    guestid: 50,
    hasbreakfast: true,
    observation: "We need an early check-in at 7 AM.",
    ispaid: true,
    numguests: 2,
    status: "checked-in",
  },
  // ... (Add more entries)

  // CABIN 006
  {
    created_at: fromToday(15, true),
    startdate: fromToday(460),
    enddate: fromToday(465),
    cabinid: 6,
    guestid: 51,
    hasbreakfast: false,
    observation: "",
    ispaid: true,
    numguests: 4,
    status: "checked-in",
  },
  {
    created_at: fromToday(16, true),
    startdate: fromToday(480),
    enddate: fromToday(485),
    cabinid: 6,
    guestid: 52,
    hasbreakfast: true,
    observation: "",
    ispaid: true,
    numguests: 5,
    status: "checked-in",
  },
  // ... (Add more entries)

  // CABIN 007
  {
    created_at: fromToday(17, true),
    startdate: fromToday(500),
    enddate: fromToday(505),
    cabinid: 7,
    guestid: 53,
    hasbreakfast: true,
    observation: "We have a large group with 8 adults and 2 children.",
    ispaid: true,
    numguests: 10,
    status: "checked-in",
  },
  {
    created_at: fromToday(18, true),
    startdate: fromToday(520),
    enddate: fromToday(525),
    cabinid: 7,
    guestid: 54,
    hasbreakfast: true,
    observation: "",
    ispaid: true,
    numguests: 3,
    status: "checked-in",
  },
  // ... (Add more entries)

  // CABIN 008
  {
    created_at: fromToday(19, true),
    startdate: fromToday(540),
    enddate: fromToday(545),
    cabinid: 8,
    guestid: 55,
    hasbreakfast: false,
    observation: "",
    ispaid: false,
    numguests: 1,
    status: "unconfirmed",
  },
  {
    created_at: fromToday(20, true),
    startdate: fromToday(560),
    enddate: fromToday(565),
    cabinid: 8,
    guestid: 56,
    hasbreakfast: true,
    observation: "",
    ispaid: true,
    numguests: 2,
    status: "checked-in",
  },
];


// Function to add all the sample data to the bookings table
export async function addSampleBookings() {
  try {
    for (const booking of bookings) {
      const { data, error } = await supabase.from("bookings").insert([
        {
          created_at: booking.created_at,
          startdate: booking.startdate,
          enddate: booking.enddate,
          status: booking.status,
          observation: booking.observation,
          totalprice: booking.totalprice,
          cabinid: booking.cabinid,
          guestid: booking.guestid,
        },
      ]);

      if (error) {
        console.error("Error inserting booking:", error);
      } else {
        console.log("Booking added successfully:", data);
      }
    }
  } catch (error) {
    console.error("Error adding sample bookings:", error);
  }
}

/* 
add directly to supabase table with the following SQL:

INSERT INTO bookings (startdate, enddate, status, numguests, cabinprice, hasbreakfast, totalprice, ispaid, cabinid, guestid, observation)
VALUES
    ('2023-08-01T12:00:00', '2023-08-08T09:45:36', 'checked-in', 2, 540, true, 1080, false, 1, 2, 'I have a gluten allergy and would like to request a gluten-free breakfast.'),
    ('2023-07-10T12:00:00', '2023-07-20T09:45:36', 'checked-out', 1, 475, true, 950, true, 2, 3, ''),
    ('2023-09-15T12:00:00', '2023-09-22T09:45:36', 'confirmed', 2, 625, false, 1250, true, 3, 4, ''),
    ('2023-07-29T12:00:00', '2023-08-05T09:45:36', 'cancelled', 4, 195, true, 780, true, 4, 5, 'Reservation cancelled due to change of plans.'),
    ('2023-08-10T12:00:00', '2023-08-17T09:45:36', 'checked-in', 2, 460, true, 920, true, 5, 6, ''),
    ('2023-09-01T12:00:00', '2023-09-08T09:45:36', 'confirmed', 1, 525, true, 1050, false, 6, 7, 'Please arrange for early check-in.');

*/
