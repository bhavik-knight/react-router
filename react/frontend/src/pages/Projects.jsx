import axios from "axios";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "./Projects.css";

function Projects() {
  const [data, setData] = useState([]);
  const transformedData = data.map((p) => {
    return (
      <div
        key={nanoid()}
        style={{ border: "1px solid", borderRadius: "1em", margin: "2em", width: "70%", padding: "2em" }}
      >
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        <img src={p.thumbnail} />
      </div>
    );
  });

  useEffect(() => {
    async function getData() {
      const response = await axios.get("https://dummyjson.com/products/");
      setData(response.data.products);
    }
    getData();
  }, []);

  return (
    <div>
      {transformedData}
    </div>
  )
}

export { Projects };
