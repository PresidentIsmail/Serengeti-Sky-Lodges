import { supabase } from "@/supabase/supabase";

// Search for: 'jo', 'fa', 'mar', 'emm', 'ah'

export const guests = [
  {
    fullname: "Jonas Schmedtmann",
    email: "hello@jonas.io",
    nationality: "Portugal",
    nationalid: "3525436345",
    countryflag: "https://flagcdn.com/pt.svg",
  },
  {
    fullname: "Jonathan Smith",
    email: "johnsmith@test.eu",
    nationality: "Great Britain",
    nationalid: "4534593454",
    countryflag: "https://flagcdn.com/gb.svg",
  },
  {
    fullname: "Jonatan Johansson",
    email: "jonatan@example.com",
    nationality: "Finland",
    nationalid: "9374074454",
    countryflag: "https://flagcdn.com/fi.svg",
  },
  {
    fullname: "Jonas Mueller",
    email: "jonas@example.eu",
    nationality: "Germany",
    nationalid: "1233212288",
    countryflag: "https://flagcdn.com/de.svg",
  },
  {
    fullname: "Jonas Anderson",
    email: "anderson@example.com",
    nationality: "Bolivia (Plurinational State of)",
    nationalid: "0988520146",
    countryflag: "https://flagcdn.com/bo.svg",
  },
  {
    fullname: "Jonathan Williams",
    email: "jowi@gmail.com",
    nationality: "United States of America",
    nationalid: "633678543",
    countryflag: "https://flagcdn.com/us.svg",
  },

  // GPT
  {
    fullname: "Emma Watson",
    email: "emma@gmail.com",
    nationality: "United Kingdom",
    nationalid: "1234578901",
    countryflag: "https://flagcdn.com/gb.svg",
  },
  {
    fullname: "Mohammed Ali",
    email: "mohammedali@yahoo.com",
    nationality: "Egypt",
    nationalid: "987543210",
    countryflag: "https://flagcdn.com/eg.svg",
  },
  {
    fullname: "Maria Rodriguez",
    email: "maria@gmail.com",
    nationality: "Spain",
    nationalid: "1098765321",
    countryflag: "https://flagcdn.com/es.svg",
  },
  {
    fullname: "Li Mei",
    email: "li.mei@hotmail.com",
    nationality: "China",
    nationalid: "102934756",
    countryflag: "https://flagcdn.com/cn.svg",
  },
  {
    fullname: "Khadija Ahmed",
    email: "khadija@gmail.com",
    nationality: "Sudan",
    nationalid: "1023457890",
    countryflag: "https://flagcdn.com/sd.svg",
  },
  {
    fullname: "Gabriel Silva",
    email: "gabriel@gmail.com",
    nationality: "Brazil",
    nationalid: "109283465",
    countryflag: "https://flagcdn.com/br.svg",
  },
  {
    fullname: "Maria Gomez",
    email: "maria@example.com",
    nationality: "Mexico",
    nationalid: "108765421",
    countryflag: "https://flagcdn.com/mx.svg",
  },
  {
    fullname: "Ahmed Hassan",
    email: "ahmed@gmail.com",
    nationality: "Egypt",
    nationalid: "1077777777",
    countryflag: "https://flagcdn.com/eg.svg",
  },
  {
    fullname: "John Doe",
    email: "johndoe@gmail.com",
    nationality: "United States",
    nationalid: "3245908744",
    countryflag: "https://flagcdn.com/us.svg",
  },
  {
    fullname: "Fatima Ahmed",
    email: "fatima@example.com",
    nationality: "Pakistan",
    nationalid: "1089999363",
    countryflag: "https://flagcdn.com/pk.svg",
  },
  {
    fullname: "David Smith",
    email: "david@gmail.com",
    nationality: "Australia",
    nationalid: "44450960283",
    countryflag: "https://flagcdn.com/au.svg",
  },
  {
    fullname: "Marie Dupont",
    email: "marie@gmail.com",
    nationality: "France",
    nationalid: "06934233728",
    countryflag: "https://flagcdn.com/fr.svg",
  },
  {
    fullname: "Ramesh Patel",
    email: "ramesh@gmail.com",
    nationality: "India",
    nationalid: "9875412303",
    countryflag: "https://flagcdn.com/in.svg",
  },
  {
    fullname: "Fatimah Al-Sayed",
    email: "fatimah@gmail.com",
    nationality: "Kuwait",
    nationalid: "0123456789",
    countryflag: "https://flagcdn.com/kw.svg",
  },
  {
    fullname: "Nina Williams",
    email: "nina@hotmail.com",
    nationality: "South Africa",
    nationalid: "2345678901",
    countryflag: "https://flagcdn.com/za.svg",
  },
  {
    fullname: "Taro Tanaka",
    email: "taro@gmail.com",
    nationality: "Japan",
    nationalid: "3456789012",
    countryflag: "https://flagcdn.com/jp.svg",
  },
  {
    fullname: "Abdul Rahman",
    email: "abdul@gmail.com",
    nationality: "Saudi Arabia",
    nationalid: "4567890123",
    countryflag: "https://flagcdn.com/sa.svg",
  },
  {
    fullname: "Julie Nguyen",
    email: "julie@gmail.com",
    nationality: "Vietnam",
    nationalid: "5678901234",
    countryflag: "https://flagcdn.com/vn.svg",
  },
  {
    fullname: "Sara Lee",
    email: "sara@gmail.com",
    nationality: "South Korea",
    nationalid: "6789012345",
    countryflag: "https://flagcdn.com/kr.svg",
  },
  {
    fullname: "Carlos Gomez",
    email: "carlos@yahoo.com",
    nationality: "Colombia",
    nationalid: "7890123456",
    countryflag: "https://flagcdn.com/co.svg",
  },
  {
    fullname: "Emma Brown",
    email: "emma@gmail.com",
    nationality: "Canada",
    nationalid: "8901234567",
    countryflag: "https://flagcdn.com/ca.svg",
  },
  {
    fullname: "Juan Hernandez",
    email: "juan@yahoo.com",
    nationality: "Argentina",
    nationalid: "4343433333",
    countryflag: "https://flagcdn.com/ar.svg",
  },
  {
    fullname: "Ibrahim Ahmed",
    email: "ibrahim@yahoo.com",
    nationality: "Nigeria",
    nationalid: "2345678009",
    countryflag: "https://flagcdn.com/ng.svg",
  },
  {
    fullname: "Mei Chen",
    email: "mei@gmail.com",
    nationality: "Taiwan",
    nationalid: "3456117890",
    countryflag: "https://flagcdn.com/tw.svg",
  },
];

// Function to add all the sample data to the guests_test table
export async function addSampleGuests() {
  try {
    for (const guest of guests) {
      const { data, error } = await supabase.from("guests").insert([
        {
          fullname: guest.fullname,
          email: guest.email,
          nationality: guest.nationality,
          nationalid: guest.nationalid,
          countryflag: guest.countryflag,
        },
      ]);

      if (error) {
        console.error("Error inserting guest:", error);
      } else {
        console.log("Guest added successfully:", data);
      }
    }
  } catch (error) {
    console.error("Error adding sample guests:", error);
  }
}
