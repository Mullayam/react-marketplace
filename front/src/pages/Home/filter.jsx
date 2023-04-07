import React from "react";
import CategoryFilter from "./categoryFilter";
import AgeFilter from "./ageFilter";

export default function FilterSidebarComponent({
  showFilters,
  setShowFilter,
  filters,
  setFilters,
}) {
  return (
    <div className="w-80">
      <div className="flex justify-between">
        <h1 className="text-2xl text-black-500">Filters</h1>
        {showFilters && (
          <i
            className="ri-close-fill text-3xl text-black-600  cursor-pointer"
            onClick={() => setShowFilter(!showFilters)}
          />
        )}
      </div>
      <div className="ml-2">
        <div className="flex flex-col gap-1">
          <CategoryFilter filters={filters} setFilters={setFilters} />
        </div>
        <div className="flex flex-col gap-1">
          <AgeFilter filters={filters} setFilters={setFilters} />
        </div>
      </div>
    </div>
  );
}
