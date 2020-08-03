import React from "react";
import "./ToolbarButton.css";

export default function ToolbarButton({ icon, onClick = () => {} }) {
  return <i className={`toolbar-button ${icon}`} onClick={onClick} />;
}
