import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByCategory } from "../services/productApi";
import defaultImage from "../static/images/default.jpg";
import { useNavigate } from "react-router-dom";
function ProductByCategory() {
  const { categoryName } = useParams();
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    async function fetchData() {
      const response = await getProductByCategory(categoryName);
      setProductList(response);
    }
    fetchData();
  }, [categoryName]);

  return (
    <>
      <h1 className="text-center" style={{ color: "#8b0f39" }}>
        {categoryName.toUpperCase()}
      </h1>
      <div className="container-fluid">
        <div className="row my-3 py-3" style={{ backgroundColor: "#e0ba9a" }}>
          {productList.length !== 0 ? (
            <>
              {productList.map((product) => (
                <div className="col-3" key={product._id}>
                  <div className="card p-2">
                    {/* slider start */}
                    <div
                      id={`carousel-${product._id}`}
                      className="carousel slide"
                      data-bs-ride="carousel"
                      style={{cursor : "pointer"}}
                    >
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                          <img
                            src={product.imageUrl1 || defaultImage}
                            className="d-block w-100"
                            alt="Product Image 1"
                            onClick={() => navigate(`/productview/${product._id}`)}
                          />
                        </div>

                        <div className="carousel-item">
                          {product.videoUrl ? (
                            <video
                              width="600"
                              className="d-block w-100"
                              autoPlay
                              muted
                              loop
                              playsInline
                              onClick={() => navigate(`/productview/${product._id}`)}
                            >
                              <source src={product.videoUrl} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <img
                              src={product.imageUrl1 || defaultImage}
                              className="d-block w-100"
                              alt="Fallback Image"
                              onClick={() => navigate(`/productview/${product._id}`)}
                            />
                          )}
                        </div>

                        <div className="carousel-item">
                          <img
                            src={product.imageUrl2 || defaultImage}
                            className="d-block w-100"
                            alt="Product Image 2"
                            onClick={() => navigate(`/productview/${product._id}`)}
                          />
                        </div>
                      </div>

                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target={`#carousel-${product._id}`}
                        data-bs-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target={`#carousel-${product._id}`}
                        data-bs-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                      <p>{product.tag.toUpperCase()}</p>
                    </div>
                    {/* slider end */}
                  </div>
                </div>
              ))}{" "}
            </>
          ) : (
            <h1>No products found in this category.</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductByCategory;
