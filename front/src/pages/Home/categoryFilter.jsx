import React from "react";
const Categories = [
  { name: "Electronics", value: "Electronics" },
  { name: "Home", value: "Fashion" },
  { name: "Fashion", value: "Fashion" },
  { name: "Sports", value: "Sports" },
  { name: "Appliances", value: "Appliances" },
  { name: "Peripherals", value: "Peripherals" },
  { name: "Accessories", value: "Accessories" },
  { name: "Books", value: "Books" },
];
export default function CategoryFilter({ filters, setFilters }) {
  return (
    <div className="mt-5">
      <h1 className=" text-2xl">Categories</h1>
      {Categories.map((category, i) => {
        return (
          <div key={i} className="flex items-center gap-2">
            <input
              name="category"
              className="max-width"
              checked={filters.category.includes(category.value)}
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setFilters({
                    ...filters,
                    category: [...filters.category, category.value],
                  });
                } else {
                  setFilters({
                    ...filters,
                    category: filters.category.filter(
                      (item) => item !== category.value
                    ),
                  });
                }
              }}
            />
            <label htmlFor="category">{category.name}</label>
          </div>
        );
      })}
    </div>
  );
}
