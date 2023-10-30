import React from "react";
import { Route, Routes } from "react-router-dom";

import TopBar from "../common/util/TopBar";
import CreateOrUpdateBook from "../admin/CreateOrUpdateBook";
import Home from "../admin/Home";
import SearchBook from "../admin/SearchBook";

export default function Admin() {
  return (
    <div>
      <TopBar />
      <Routes>
        <Route path="/book/:type" element={<CreateOrUpdateBook />} />
        <Route path="/home" element={<Home />} />
        <Route path="/book/search" element={<SearchBook />} />
      </Routes>
    </div>
  );
}
