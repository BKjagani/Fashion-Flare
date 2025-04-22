import React, { useEffect, useState } from "react";
import { getProduct } from "../services/productApi";
import { getCategory } from "../services/categoryApi";
import defaultImage from "../static/images/default.jpg";
import { Link, useNavigate } from "react-router-dom";
function Home() {
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const products = await getProduct();
        if (products) setProductList(products);

        const categories = await getCategory();
        if (categories) setCategoryList(categories);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  if (categoryList.length === 0 || productList.length === 0) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <div className="container-fluid">
      {categoryList.map((category) => {
        const filteredProducts = productList.filter(
          (product) => product.category?._id === category._id
        );

        return (
          <div key={category._id} className="mb-4 home-category-sections">
            <h3
              className="text-uppercase home-category-title"
              style={{ cursor: "pointer" }}
            >
              <Link
                className="home-category-title"
                to={`/categories/${category.categoryName}`}
              >
                {" "}
                {category.categoryName}{" "}
              </Link>
            </h3>
            <div className="row">
              {filteredProducts.length === 0 ? (
                <div className="col-12">
                  <p className="text-muted">
                    No products found in this category.
                  </p>
                </div>
              ) : (
                filteredProducts.slice(0, 4).map((product) => (
                  <div className="col-3" key={product._id}>
                    <div
                      className="card p-2"
                      style={{ cursor: "pointer" }}
                      
                    >
                      {/* slider start */}
                      <div
                        id={`carousel-${product._id}`}
                        className="carousel slide"
                        data-bs-ride="carousel"
                        
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
                                <source
                                  src={product.videoUrl}
                                  type="video/mp4"
                                />
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
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
