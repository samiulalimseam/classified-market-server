import React from "react";
import product from "./product.json";
import "./test.css";

const Test = () => {
  const currentPageProduct = product;
  const options = currentPageProduct?.options;

  const variants = [];
  currentPageProduct?.options?.forEach((option, index) => {
    const opt = {};
    opt.name = option;
    opt.values = []
    currentPageProduct.variants.map((vrnt) => {
      const d = vrnt.options.indexOf([`option${index + 1}`]);
      opt.values.push(d);
    });
    variants.push(opt);
  });
  console.log(variants);

  return (
    <div className="m-10 flex gap-2 ">
      {options?.map((option, i) => {
        return <div key={i}>Choose {option}</div>;
      })}
    </div>
  );
};

export default Test;
