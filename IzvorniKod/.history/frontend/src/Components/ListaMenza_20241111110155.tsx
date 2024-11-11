import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import "/src/styles/ListaMenza.css";

// Tipiziranje podataka o menzama
interface Menza {
  id: string;
  name: string;
  ulica: string;
  broj: string;
  startTime: string;
  endTime: string;
}

const ListaMenza = () => {
  const [menze, setMenze] = useState<Menza[]>([]);

  useEffect(() => {
    axios
      .get("/api/menze")
      .then((response) => {
        console.log("Full response:", response);
        console.log("response.data:", response.data);
        console.log("Dohvaćeni podaci:", response.data.menze);
        setMenze(response.data || []);
      })
      .catch((error) => {
        console.error("Greška prilikom dohvaćanja menzi:", error);
        setMenze([]);
      });
  }, []);

  return (
    <>
      <NavBar />
      <div className="card-container">
        {menze && menze.length > 0 ? (
          menze.map((menza) => (
            <div key={menza.id} className="card" style={{ width: "18rem" }}>
              <img
                src="/src/public/cvjetno.jpg"
                className="card-img-top"
                alt={`Slika menze ${menza.name}`}
              />
              <div className="card-body">
                <h5 className="card-title">{menza.name}</h5>
                <p className="card-text">
                  Radno vrijeme: {menza.startTime} - {menza.endTime}
                </p>
                <div className="button-container">
                  <a href="#" className="btn btn-primary">
                    pogledaj
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Nema dostupnih menzi. Odi na /admin/dodajMenzu i dodaj menzu.</p>
        )}
      </div>
    </>
  );
};

export default ListaMenza;
