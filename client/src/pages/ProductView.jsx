import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneProduct } from "../services/productApi";
import defaultImage from "../static/images/default.jpg";
import { useUser } from "@clerk/clerk-react";
import { postCart } from "../services/cartApi";
import { useNavigate } from "react-router-dom";
function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate()
  useEffect(() => {
    async function fetchData() {
      const response = await getOneProduct(id);
      setProduct(response);
    }
    fetchData();
  }, [id]);

  async function handleClick(id) {
    const email = user.primaryEmailAddress.emailAddress;
    await postCart({userEmail : email, product : id, quantity : 1})
    navigate('/cart')
  }

  if (!isLoaded) return <h1>Lodding...</h1>;

  if (!isSignedIn) return <h1>Please Signin</h1>;

  return (
    <div>
      {product._id ? (
        <>
          {
            <div className="container">
              <div className="row product-view-row">
                <div className="col-6">
                  <div className="card p-2">
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
                            >
                              <source src={product.videoUrl} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <img
                              src={product.imageUrl1 || defaultImage}
                              className="d-block w-100"
                              alt="Fallback Image"
                            />
                          )}
                        </div>

                        <div className="carousel-item">
                          <img
                            src={product.imageUrl2 || defaultImage}
                            className="d-block w-100"
                            alt="Product Image 2"
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
                    </div>
                    {/* slider end */}
                  </div>
                </div>
                <div className="col-md-6 product-details d-flex flex-column justify-content-center">
                  <h5 className="text-uppercase text-secondary fw-bold">
                    {product.category?.categoryName || "Category"}
                  </h5>
                  <h2 className="product-title mb-2">{product.title}</h2>
                  <h4 className="text-muted">{product.tag}</h4>
                  <span className="badge bg-info text-dark w-25 mb-3">
                    {product.gender}
                  </span>
                  <p className="text-secondary">{product.description}</p>

                  <div className="d-flex align-items-center gap-3 mt-4">
                    <span className="price-old">₹{product.price}</span>
                    <span className="price-new">₹{product.discountPrice}</span>
                  </div>

                  <button
                    className="btn btn-dark mt-4 w-50"
                    onClick={() => handleClick(product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          }
        </>
      ) : (
        <h1>Can not get product</h1>
      )}
    </div>
  );
}

export default ProductView;
