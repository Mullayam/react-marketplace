import React from "react";

const ages = [
  { name: "0-2 Years Old", value: "0-2" },
  { name: "2-6 Years Old", value: "2-6" },
  { name: "6-12 Years Old", value: "6-12" },
  { name: "12-20 Years Old", value: "12-20" },
  { name: "20-26 Years Old", value: "20-26" },
  { name: "30 & Above", value: "30" },
];
export default function ageFilter({ filters, setFilters }) {
  return (
    <div className="mt -5">
      <hr />
      <h1 className="mt-2 text-2xl">Ages</h1>
      {ages.map((age, i) => {
        return (
          <div key={i} className="flex items-center gap-2">
            <input
              name="age"
              className="max-width"
              checked={filters.age.includes(age.value)}
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setFilters({
                    ...filters,
                    age: [...filters.age, age.value],
                  });
                } else {
                  setFilters({
                    ...filters,
                    age: filters.age.filter((item) => item !== age.value),
                  });
                }
              }}
            />
            <label htmlFor="age">{age.name}</label>
          </div>
        );
      })}
    </div>
  );
}
