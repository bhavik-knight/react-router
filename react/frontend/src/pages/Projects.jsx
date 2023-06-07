import axios from "axios";
import { nanoid } from "nanoid";
import { useState, useEffect, useRef } from "react";
import "./Projects.css";


function Projects() {
  const cardWidth = 600;

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
  // console.log(`data #: ${numData}, ${currentProduct}`)

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

  function showButtons(active, siblings = 2) {
    if (numData < siblings * 2 + 1) {
      return [...Array(numData).keys()]
    }

    if (active < siblings) {
      active = siblings
    } else if (active >= numData - siblings) {
      active = numData - siblings - 1
    }

    let newArray = [...Array(siblings * 2 + 1).keys()].map(i => i - siblings + active)
    // console.log(currentProduct, active, newArray)
    return newArray
  }


  // autoplay of carousel cards
  const timeRef = useRef(0)
  useEffect(() => {
    if (timeRef.current) {
      clearTimeout(timeRef.current)
    }

    timeRef.current = setTimeout(() => handleNextClick(), 4000)

    return () => clearTimeout(timeRef.current)
  }, [handleNextClick])

  // arrow styles
  const getArrowStyles = (direction) => ({
    cursor: "pointer",
    alignSelf: "center"
  })

  console.log(getArrowStyles("left"))

  return (
    <>
      {/* number of products */}
      <div>
        {currentProduct + 1} of {numData}
      </div>


      {/* left arrow */}
      <div style={{ display: "flex" }}>
        <div onClick={handlePrevClick} style={getArrowStyles("left")}>❰</div>
        {/*galaxy_hd carousel data*/}
        <div style={{
          overflow: "hidden",
          width: cardWidth,
        }}>
          <div
            className="cards-container"
            style={{
              display: "flex",
              transition: `transform ease-out 0.5s`,
              width: (cardWidth + 10) * numData,
              transform: `translate(${-(currentProduct * cardWidth)}px)`
            }}
          >
            {transformedData.map((_, index) => {
              return (
                <div
                  key={nanoid()}
                  style={{ width: `${cardWidth}px` }}
                >
                  {transformedData[index]}
                </div>
              )
            })}
          </div >
        </div>
        {/* right arrow */}
        <div onClick={handleNextClick} style={getArrowStyles("right")}>❱</div>
      </div>

      {/* carousel buttons (controlled?) */}
      {/* buttons at the bottom */}

      <div className="dotsArea" >
        {numData > 5 && <button onClick={() => handleDotClick(0)} style={{ justifyContent: "flex-start", marginRight: "auto" }}>first</button>}
        {
          showButtons(currentProduct).map(b => {
            return (
              <button key={nanoid()} className="dots" onClick={() => handleDotClick(b)}>
                {b + 1}
              </button>
            )
          })
        }
        {numData > 5 && <button onClick={() => handleDotClick(numData - 1)} style={{ justifyContent: "flex-end", marginLeft: "auto" }}>last</button>}
      </div >
    </>
  )
}

export { Projects };


// reference: array creation - https://www.techiedelight.com/create-array-from-1-n-javascript/
// reference: pagination button limits - https://stackoverflow.com/questions/65857993/how-to-limit-pagination-buttons-in-vue
// reference: custom pagination in react - https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/

// reference: custom carousel tutorial for react - https://www.youtube.com/watch?v=SK9AlIbexOE
// reference: advance carousel tutorial for react - https://www.youtube.com/watch?v=hUTwhn4BIyM
