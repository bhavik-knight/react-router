import axios from "axios";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import "./Projects.css";

function Projects() {

  // book-keeping to store the data
  const [data, setData] = useState([]);

  // create a react component from the data
  const transformedData = data.map((p) => {
    return (
      <div
        key={nanoid()}
        className="productCard"
      >
        <h3>{p.title}</h3>
        <div className="productImgContainer" style={{ backgroundImage: `url(${p.thumbnail})` }} />
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

  // to keep track of the carousel card
  const [currentProduct, setCurrentProduct] = useState(0)
  const numData = transformedData.length
  console.log(`data #: ${numData}, ${currentProduct}`)

  function handlePrevClick() {
    currentProduct < 1 && setCurrentProduct(currentProduct => currentProduct + numData)
    setCurrentProduct(currentProduct => (currentProduct - 1) % numData)
  }

  function handleNextClick() {
    setCurrentProduct(currentProduct => (currentProduct + 1) % numData)
  }

  function handleDotClick(index) {
    setCurrentProduct(index)
  }

  function showButtons(active, siblings = 1) {
    if (active < siblings) {
      active = siblings
    } else if (active >= numData - siblings) {
      active = numData - siblings - 1
    }

    let newArray = [...Array(siblings * 2 + 1).keys()].map(i => i - siblings + active)
    console.log(currentProduct, active, newArray)
    return newArray
  }

  return (
    <>
      <div style={{ display: "flex" }}>

        {/* carousel data*/}
        {transformedData[currentProduct]}
        {/* carousel buttons (controlled?) */}

      </div>


      {/* buttons at the bottom */}
      <div className="dotsArea">

        {/* left arrow */}
        <button onClick={handlePrevClick}>{`<`}</button>

        {
          showButtons(currentProduct).map(b => {
            return (
              <button key={nanoid()} className="dots" onClick={() => handleDotClick(b)}>
                {b + 1}
              </button>
            )
          })
        }

        {/* right arrow */}
        <button onClick={handleNextClick}>{`>`}</button>
      </div>
      <div>
        {currentProduct + 1} of {numData}
      </div>



      <div>
        {data.map((p, index) => {
          return (
            <p key={nanoid()}>{index + 1}: {p.title}</p>
          )
        })}
      </div>
    </>
  )
}

export { Projects };


// reference: array creation - https://www.techiedelight.com/create-array-from-1-n-javascript/
// reference: pagination button limits - https://stackoverflow.com/questions/65857993/how-to-limit-pagination-buttons-in-vue
