"use client";

import styles from "./inventory_page_stylesheet.css";
import Toolbar from "@/components/toolbar/top_toolbar";
import Inventory from "@/components/inventory/inventory";


export default function InventoryPage() {


  return (
    <div className="inventory-page-container">
      <div><Toolbar /></div>
      <div className="inventory-main-container">
        <div><Inventory /></div>
      </div>
    </div>
  );
}