"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// types
import { TopBarProps } from "@/types";

const TopBar: React.FC<TopBarProps> = ({ initialCity, initialUnits }) => {
  const [city, setCity] = useState(initialCity);
  const [units, setUnits] = useState(initialUnits);
  const searchParam = useSearchParams();
  const router = useRouter();

  // Merge search param to the current url
  const updateURL = (key: string, value: string) => {
    const currentParams = new URLSearchParams(searchParam.toString());

    if (value) {
      currentParams.set(key, value);
    } else {
      currentParams.delete(key);
    }

    router.push(`/?${currentParams.toString()}`);
  };
  const handleSearchBtnClick = () => {
    updateURL("city", city);
    setCity("");
  };

  const handleToggle = () => {
    const newUnits = units === "metric" ? "imperial" : "metric";
    updateURL("units", newUnits);
    setUnits(newUnits);
  };
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-2">
        <input
          className="input"
          placeholder="Search city ..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn" type="submit" onClick={handleSearchBtnClick}>
          Go
        </button>
      </div>
      <span
        className="tooltip tooltip-top"
        data-tooltip="Toggle temperature to Fahrenheit"
      >
        <input
          type="checkbox"
          className="switch"
          checked={units === "imperial"}
          onChange={handleToggle}
        />
      </span>
    </div>
  );
};

export default TopBar;
