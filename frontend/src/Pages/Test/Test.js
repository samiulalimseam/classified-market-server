import React from "react";
import product from "./product.json";
import "./test.css";

const Test = () => {
  const currentPageProduct = product;
  const options = currentPageProduct?.options;

  const variants = [];
  currentPageProduct?.options?.forEach((option,index)=>{
    const opt = {}
    opt.name = option
    opt.value =    currentPageProduct?.variants?.filter(vrnt=>{
        return vrnt?.options.includes(option)
    })
    variants.push(opt)
  
  })
  console.log(variants);
    
  return (
    <div className="m-10 flex gap-2 ">
      {options?.map((option, i) => {
        return <div key={i}>Choose {option}
        
        </div>;
      })}
    </div>
  );
};

export default Test;
