import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Menza.css";

//test data
const initialRestaurantData = {
  idMenza: "1",
  imeMenze: "Default Restaurant",
  lokacija: "Default Location",
  radnaVremena: [
    { dan: "Monday", pocekat: "08:00", kraj: "20:00" },
    { dan: "Tuesday", pocekat: "08:00", kraj: "20:00" },
    { dan: "Wednesday", pocekat: "08:00", kraj: "20:00" },
    { dan: "Thursday", pocekat: "08:00", kraj: "20:00" },
    { dan: "Friday", pocekat: "08:00", kraj: "20:00" },
    { dan: "Saturday", pocekat: "08:00", kraj: "20:00" },
  ],
};

function Menza() {
  const [loading, setLoading] = useState(true);
  interface RestaurantData {
    idMenza: string;
    imeMenze: string;
    lokacija: string;
    radnaVremena: { dan: string; pocekat: string; kraj: string }[];
  }

  const [restaurantData, setRestaurantData] = useState<RestaurantData>(
    initialRestaurantData
  );

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await axios.get("/api/menza/{id}");
        setRestaurantData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurant data", error);
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <NavBar />
      <div className="main-content">
        <div className="restaurant-info">
          <img
            src={`../../public/slika_menza_${restaurantData.idMenza}.jpg`}
            alt={`Slika menze ${restaurantData.imeMenze}`}
          />
          <h1>{restaurantData.imeMenze}</h1>
          <p>Location: {restaurantData.lokacija}</p>
          <div className="working-hours">
            <h2>Working Hours</h2>
            <ul>
              {restaurantData.radnaVremena.map((time, index) => (
                <li key={index}>
                  {time.dan}: {time.pocekat} - {time.kraj}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menza;
