import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContextProvider";

const SellerRoute = ({ children }) => {
  const { accData, accDataFetching, accDataLoading } = useContext(AuthContext);

  if (accDataFetching || accDataLoading || !accData) {
    return (
      <div>
        <span className="loading loading-dots loading-xs"></span>
        <span className="loading loading-dots loading-sm"></span>
        <span className="loading loading-dots loading-md"></span>
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
console.log({ accData, accDataFetching, accDataLoading });
  if (true) {
    if (true) {
      return children;
    } else if (accData?.sellerDisable === true) {
      return (
        <div>
          <p className="text-center text-4xl">
            Your seller account has been disabled
          </p>
        </div>
      );
    }
  }

  return (
    <div className="m-auto">
      <p className="text-4xl text-center">You are not a Seller!</p>
    </div>
  );
};

export default SellerRoute;
