"use client";

import React, { PropsWithChildren, useState } from "react";

import { TabMenu } from "primereact/tabmenu";
import { MenuItem } from "primereact/menuitem";

export default function Trackers() {
  const [activeIndex, setActiveIndex] = useState(3);
  return (
    <>
      <div className="card">
        <p>Trackers</p>
      </div>
    </>
  );
}
