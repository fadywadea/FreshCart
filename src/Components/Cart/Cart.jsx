/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import { ThreeDots } from "react-loader-spinner";

function Cart() {
  const {
    getLoggedUserCart,
    removeCartItem,
    updateProductQuantity,
    clearAllItems,
  } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateCount = useCallback(
    async (id, count) => {
      if (count < 1) {
        await removeItem(id);
        return;
      }
      try {
        const { data } = await updateProductQuantity(id, count);
        setCartDetails(data);
      } catch {
        setError("Failed to update product quantity.");
      }
    },
    [updateProductQuantity]
  );

  const removeItem = useCallback(
    async (id) => {
      try {
        const { data } = await removeCartItem(id);
        setCartDetails(data);
      } catch {
        setError("Failed to remove item.");
      }
    },
    [removeCartItem]
  );

  const clearItems = useCallback(async () => {
    try {
      await clearAllItems();
      setCartDetails(null);
    } catch {
      setError("Failed to clear items.");
    }
  }, [clearAllItems]);

  const getCart = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getLoggedUserCart();
      setCartDetails(data);
      setError(null);
    } catch {
      setError("Failed to fetch cart details.");
    } finally {
      setLoading(false);
    }
  }, [getLoggedUserCart]);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getCart();
    } else {
      setError("User not authenticated. Please sign in.");
      setLoading(false);
    }
  }, [getCart]);

  if (loading) {
    return (
      <section className="d-flex justify-content-center align-items-center m-0 p-0">
        <ThreeDots
          height="100vh"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      </section>
    );
  }

  if (error) {
    return (
      <section className="container text-center">
        <p className="text-danger">{error}</p>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <meta name="description" content="Web site created using create-react-app" />
        <meta name="keywords" content="HTML5 CSS3 Bootstrap JS React" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>Cart</title>
      </Helmet>
      <section className="container w-75 my-4 mx-auto py-3 bg-main-light">
        <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
          <div>
            <h3 className="h2 mb-4 fw-bolder">Shopping Cart</h3>
            <h4 className="h6 fw-bolder">
              Total items:{" "}
              <span className="color-numbers fw-bold">
                {cartDetails?.numOfCartItems}
              </span>
            </h4>
          </div>
          <div>
            <button className="btn btn-primary btn-lg mb-4">Check Out</button>
            <h5 className="h6 fw-bolder">
              Total Cart Price:{" "}
              <span className="color-numbers fw-bold">
                {cartDetails?.data.totalCartPrice}
              </span>{" "}
              EGP
            </h5>
          </div>
        </div>
        {cartDetails?.data.products?.map((product) => (
          <div
            className="align-items-center row border-bottom py-2 px-2"
            key={product.product.id}
          >
            <div className="col-md-2 px-0">
              <img
                className="w-100"
                src={product.product.imageCover}
                alt={`${product.product.title} cover`}
              />
            </div>
            <div className="col-md-10">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="h6">
                    {product.product.title.split(" ").slice(0, 3).join(" ")}
                  </h3>
                  <h4 className="h6 text-main">Price: {product.price}</h4>
                </div>
                <div>
                  <button
                    onClick={() =>
                      updateCount(product.product.id, product.count + 1)
                    }
                    className="btn btn-outline-success"
                  >
                    +
                  </button>
                  <span className="mx-2">{product.count}</span>
                  <button
                    onClick={() =>
                      updateCount(product.product.id, product.count - 1)
                    }
                    className="btn btn-outline-danger"
                  >
                    -
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeItem(product.product.id)}
                className="btn btn-outline-danger font-sm p-1"
              >
                <i className="fas fa-trash-can"></i> Remove
              </button>
            </div>
          </div>
        ))}
        {cartDetails?.numOfCartItems ? (
          <button
            onClick={clearItems}
            className="btn mt-4 btn-danger justify-content-center"
          >
            Clear Items
          </button>
        ) : (
          <p className="mt-4 text-center">empty of items</p>
        )}
      </section>
    </>
  );
}

export default React.memo(Cart);
