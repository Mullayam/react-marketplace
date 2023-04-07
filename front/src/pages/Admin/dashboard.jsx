import React from "react";

import { Tabs } from "antd";
import UserInfo from "../../helpers/UserInfo";
import Products from "./products";
import Users from "./user";
export default function Admin() {
  const items = [
    {
      key: "1",
      label: `User`,
      children: <Users />,
    },
    {
      key: "2",
      label: `Products`,
      children: <Products />,
    },
  ];
  return (
    <div>
      <Tabs items={items} />
    </div>
  );
}
