import React from "react";
// import UserInfo from "../../helpers/UserInfo";
import { Input, message } from "antd";
import { GetAllProducts } from "../../services/products";
import ProductCard from "./ProductCard";
import Filter from "./filter";
const Home = () => {
  const [showFilters, setShowFilter] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const [filters, setFilters] = React.useState({
    status: "approved",
    category: [],
    age: [],
  });

  // const user = UserInfo();
  async function AllProducts() {
    try {
      const resposne = await GetAllProducts(filters);
      if (resposne.success) {
        setProducts(resposne.data);
      } else {
        throw new Error(resposne.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  }
  React.useEffect(() => {
    AllProducts();
  }, []);
  React.useEffect(() => {
    AllProducts();
  }, [filters]);
  return (
    <div className="flex gap-5">
      {showFilters && (
        <Filter
          filters={filters}
          setFilters={setFilters}
          showFilters={showFilters}
          setShowFilter={setShowFilter}
        />
      )}

      <div className="flex flex-col gap-5">
        <div className="flex gap-5 items-center">
          {!showFilters && (
            <i
              class="ri-filter-3-fill text-3xl text-semibold"
              onClick={() => setShowFilter(true)}
            />
          )}
          <Input
            type="search"
            placeholder="Search for products here..."
            className=" border border-gray-300 rounded border-solid w-full p-2 h-14"
          />
        </div>
        <div
          className={`grid gap-5  ${
            showFilters ? "grid-cols-4" : "grid-cols-5"
          }`}
        >
          {products.length
            ? products.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })
            : "<h1>Bo Products to Display</h1>"}
        </div>
      </div>
    </div>
  );
};

export default Home;
