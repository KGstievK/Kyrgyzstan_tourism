interface User {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number;
  user_picture: string | null;
  from_user: string;
  cover_photo: string | null;
  birth_date: string;
}

interface ClientHotel {
  id: number
  first_name: string
  last_name: string
  user_picture: string
  from_user: string
}