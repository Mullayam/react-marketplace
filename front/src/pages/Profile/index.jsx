import React from "react";
import { Tabs } from "antd";
import Products from "./components/Products";
import UserBids from "./components/UserBids";
export default function index() {
  const items = [
    {
      key: "1",
      label: `Buy/Sell`,
      children: <Products />,
    },
    {
      key: "2",
      label: `My Bids`,
      children: <UserBids />,
    },
  ];
  return (
    <div>
      <Tabs items={items}></Tabs>
    </div>
  );
}
