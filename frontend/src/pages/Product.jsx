import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Product = () => {
  const [items, setItems] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  /* ---------------- FETCH PRODUCT ---------------- */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/getProduct/${id}`);
        setItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [id]);

  /* ---------------- CHECK LOGIN ---------------- */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        await axios.get(`/auth/me`);
        setLoggedIn(true);
      } catch (error) {
        toast.error("Login first to access");
        setTimeout(() => navigate("/"), 1000);
        setLoggedIn(false);
        console.log(error);
      }
    };
    fetchUser();
  }, [navigate]);

  /* ---------------- ADD TO CART ---------------- */
  const cartHandler = async () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    try {
      await axios.post(`/auth/cart/${id}`, {
        size: selectedSize,
      });
      toast.success("Added to cart");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add to cart");
    }
  };

  /* ---------------- BUY NOW ---------------- */
  const buyNowHandler = async () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    try {
      await axios.post(`/auth/cart/${id}`, {
        size: selectedSize,
      });

      navigate("/orders-checkout", {
        state: {
          product: items,
          size: selectedSize,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loggedIn && (
        <div className="flex flex-col gap-10 px-4 md:px-10 lg:px-20 pb-10">
          <div className="w-full border border-gray-200"></div>

          {/* PRODUCT SECTION */}
          <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-20">
            {/* IMAGE */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src={items.image}
                alt={items.name}
                width="96"
                height="96"
                className="h-[40vh] sm:h-[50vh] lg:h-[55vh] w-full sm:w-[60%] lg:w-[25vw] object-contain"
              />
            </div>

            {/* DETAILS */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <h1 className="text-2xl sm:text-3xl font-medium">
                {items.name}
              </h1>
              <h1 className="text-xl sm:text-2xl font-bold">
                ${items.price.amount/100}
              </h1>
              <p className="text-gray-500 text-sm sm:text-base">
                {items.description}
              </p>

              {/* SIZE SELECTION */}
              <div className="flex flex-col gap-2">
                <p className="font-medium">Select Size</p>
                <div className="flex gap-3 flex-wrap">
                  {items.size?.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-2 border rounded-md text-sm
                        ${
                          selectedSize === sz
                            ? "bg-black text-white border-black"
                            : "border-gray-400 hover:border-black"
                        }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>

                {!selectedSize && (
                  <p className="text-sm text-red-500">
                    Please select a size
                  </p>
                )}
              </div>

              {/* BUTTONS */}
              <button
                disabled={!selectedSize}
                onClick={buyNowHandler}
                className={`px-4 py-2 rounded-lg font-medium text-base
                  ${
                    selectedSize
                      ? "border border-black hover:bg-black hover:text-white"
                      : "border border-gray-300 text-gray-400 cursor-not-allowed"
                  }`}
              >
                Buy Now
              </button>
              
              <button
                disabled={!selectedSize}
                onClick={cartHandler}
                className={`px-4 py-2 rounded-lg font-medium text-base
                  ${
                    selectedSize
                      ? "border border-black hover:bg-black hover:text-white"
                      : "border border-gray-300 text-gray-400 cursor-not-allowed"
                  }`}
              >
                Add to Cart
              </button>

              <div className="w-full border border-gray-200"></div>

              {/* INFO */}
              <ul className="flex flex-col gap-2 text-sm sm:text-base">
                <li className="text-gray-500">100% Original product.</li>
                <li className="text-gray-500">
                  Cash on delivery available.
                </li>
                <li className="text-gray-500">
                  Easy return within 7 days.
                </li>
              </ul>
            </div>
          </div>

          <Footer />
        </div>
      )}

      <ToastContainer />
    </>
  );
};
export default Product;
