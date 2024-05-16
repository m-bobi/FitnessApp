import React from "react";
import DashboardNavigation from "../../components/shared/Navbar/AdminDashboard";
import ListOffers from "../../components/OffersCrud/ListOffers";
import AddOffers from "../../components/OffersCrud/AddOffers";

const Offers = () => {
  return (
    <div className="flex">
      <DashboardNavigation />
      <div className="flex-1 ml-64 p-8">
        <ListOffers />
        <AddOffers />
      </div>
    </div>
  );
};

export default Offers;
