namespace AIRLINE {
  interface AirResponse {
    id: string;
    name: string;
    description: string;
    website: string;
    airline_tickets: {
      id: number;
      ticket: number;
      directions: string;
    }[];
  }
}
