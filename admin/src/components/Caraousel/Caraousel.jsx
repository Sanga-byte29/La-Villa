import { useEffect, useState } from "react";
import "./caraousel.styles.scss";


const Caraousel = ({data = []}) => {
    const [currentIndex, setCurrentIndex] = useState(1);
    console.log("xxxxx");

    useEffect(() => {
        if (data.length === 0) return;


        const interval = setInterval(() => {
            setCurrentIndex((prevState) => {
                if(prevState === data.length - 1){
                    return (prevState = 0);
                } else{
                    return prevState + 1;
                }
            });
            return()=>{
                clearInterval(interval);
            }
        },8000);
    },[data]);
    if (data.length === 0) {
        return <div className="carousel-wrapper">No images available</div>;
    }
  return (
    <div className="carousel-wrapper">
      {data[currentIndex] && <img src={data[currentIndex]} alt="" />}
    </div>
  )
}

export default Caraousel;