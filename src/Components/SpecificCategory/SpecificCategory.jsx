import axios from "axios";
import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { ThreeDots } from "react-loader-spinner";

export default function SpecificCategory() {
  const { categoryId } = useParams();

  const getCategory = useCallback(() => {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`
    );
  }, [categoryId]);

  const { isLoading, isError, data } = useQuery(
    ["category", categoryId],
    getCategory
  );

  return (
    <div>
      {isLoading ? (
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
      ) : isError ? (
        <div className="text-center text-danger">Error loading category.</div>
      ) : (
        <div>
          <h1>{data?.data.name}</h1>
          <img src={data?.data.image} alt={`${data?.data.slug} category`} />
          <p>{data?.data.description}</p>
        </div>
      )}
    </div>
  );
}
