import axios from "axios";
import React, { useCallback } from "react";
import { Helmet } from "react-helmet";
import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "react-query";

export default function Brands() {
  const getBrands = useCallback(() => {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }, []);

  const { data, isLoading, isError } = useQuery("GetBrands", getBrands, {
    staleTime: 300000, // 5 minutes
    cacheTime: 600000, // 10 minutes
  });

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <meta name="keywords" content="HTML5 CSS3 Bootstrap JS React" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>Brands</title>
      </Helmet>
      {isLoading ? (
        <div className="d-flex justify-content-center align-content-center m-0 p-0 min-vh-100">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </div>
      ) : isError ? (
        <div>Error loading brands.</div>
      ) : (
        <div className="container py-3">
          <div className="row">
            <span className="brands-title text-center fs-1">All Brands</span>
            {data?.data.data.map((brand) => (
              <div key={brand._id} className="col-md-3 py-4">
                <div className="brands cursor-pointer px-2 py-4 rounded">
                  <img
                    className="w-100"
                    src={brand.image}
                    alt={`${brand.name} logo`}
                  />
                  <p className="text-center">{brand.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
