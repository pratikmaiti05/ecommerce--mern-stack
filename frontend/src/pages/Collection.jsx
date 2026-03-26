import { useEffect, useMemo, useState } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { loadProducts } from "../api/axios";

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [search, setSearch] = useState("");

  // 🔹 Fetch products ONCE
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await loadProducts();
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // 🔹 Toggle category
  const toggleCategory = (value) => {
    setCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  // 🔹 Toggle sub-category
  const toggleSubCategory = (value) => {
    setSubCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };
  const filteredProducts = useMemo(() => {
    let result = products;

    if (category.length > 0) {
      result = result.filter(p => category.includes(p.category));
    }

    if (subCategory.length > 0) {
      result = result.filter(p => subCategory.includes(p.subCategory));
    }

    if (search.trim()) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return result;
  }, [products, category, subCategory, search]);

  return (
    <div className="w-full min-h-screen flex flex-col py-5 px-4 md:px-10 gap-10">
      <div className="w-full border border-gray-200"></div>

      {/* Search */}
      <div className="w-full flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full sm:w-[60vw] md:w-[40vw] lg:w-[30vw] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="w-full flex flex-col md:flex-row gap-10 justify-center">
        {/* Filters */}
        <div className="flex flex-col gap-7 w-full md:w-[25vw]">
          <h1 className="text-2xl md:text-3xl">FILTERS</h1>

          <div className="border border-gray-300 py-3 px-5 rounded-lg">
            <h1 className="font-bold mb-2">CATEGORIES</h1>
            {["Men", "Women", "Kids"].map(item => (
              <label key={item} className="flex gap-2 text-gray-600">
                <input
                  type="checkbox"
                  value={item}
                  onChange={() => toggleCategory(item)}
                />
                {item}
              </label>
            ))}
          </div>

          <div className="border border-gray-300 py-3 px-5 rounded-lg">
            <h1 className="font-bold mb-2">TYPE</h1>
            {["Topwear", "Bottomwear", "Winterwear"].map(item => (
              <label key={item} className="flex gap-2 text-gray-600">
                <input
                  type="checkbox"
                  value={item}
                  onChange={() => toggleSubCategory(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="flex flex-col gap-7 w-full">
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl text-gray-500">ALL</h1>
            <h1 className="text-xl md:text-2xl font-medium text-gray-800">
              COLLECTIONS
            </h1>
            <span className="w-[10vw] md:w-[4vw] h-1 bg-gray-600"></span>
          </div>

          <div className="flex justify-center md:justify-start flex-wrap gap-6 md:gap-10">
            {filteredProducts.map(product => (
              <div
                key={product._id}
                className="h-[35vh] sm:h-[40vh] w-[80vw] sm:w-[45vw] md:w-[22vw] lg:w-[15vw]
                           flex flex-col hover:scale-105 transition"
              >
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    width="300"
                    height="400"
                    className="h-[25vh] sm:h-[30vh] md:h-[35vh] w-full object-contain rounded-lg"
                  />
                </Link>
                <h1 className="text-sm sm:text-base">{product.name}</h1>
                <span className="text-sm sm:text-base">
                  ${product.price.amount/100}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Collection;
