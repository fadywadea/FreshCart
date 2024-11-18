import React, { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext.js";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const getProductDetails = async (id) => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  };

  const { data, isLoading, isError } = useQuery(
    ["productDetails", id],
    () => getProductDetails(id),
    {
      staleTime: 300000, // 5 minutes
      cacheTime: 600000, // 10 minutes
    }
  );

  const addProductToCart = async (id) => {
    const response = await addToCart(id);
    if (response.data?.status === "success") {
      toast.success(response.data?.message.split(" ").slice(0, 3).join(" "), {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error(response.data?.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const sliderSettings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2500,
      pauseOnHover: false,
      arrows: false,
    }),
    []
  );

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading product details.</div>;
  }

  const product = data?.data.data;

  return (
    <>
      {product && (
        <div className="row align-items-center">
          <Helmet>
            <meta
              name="description"
              content={`${product.title} - ${product.description}`}
            />
            <meta name="keywords" content="HTML5 CSS3 Bootstrap JS React" />
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="theme-color" content="#000000" />
            <title>{product.title}</title>
          </Helmet>
          <div className="col-md-3 p-4">
            <Slider {...sliderSettings}>
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  style={{ height: "200px" }}
                  className="w-100"
                  src={img}
                  alt={product.title}
                  loading="lazy"
                />
              ))}
            </Slider>
          </div>
          <div className="col-md-8 p-3">
            <h2 className="h4">{product.title}</h2>
            <p>{product.description}</p>
            <h6 className="text-main">{product.category?.name}</h6>
            <h6 className="text-main">Price: {product.price} EGP</h6>
            <div className="d-flex justify-content-between">
              <span>Ratings Quantity: {product.ratingsQuantity}</span>
              <span>
                <i className="fas fa-star rating-color"></i>
                {product.ratingsAverage}
              </span>
            </div>
            <button
              onClick={() => addProductToCart(product.id)}
              className="btn w-75 mx-auto bg-main mt-3 text-white"
            >
              + Add
            </button>
          </div>
        </div>
      )}
    </>
  );
}
