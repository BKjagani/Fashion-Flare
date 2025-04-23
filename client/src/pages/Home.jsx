import React, { useEffect, useState } from "react";
import { getProduct } from "../services/productApi";
import { getCategory } from "../services/categoryApi";
import defaultImage from "../static/images/default.jpg";
import { Link, useNavigate } from "react-router-dom";
import About from "../components/About";
// import "./Home.css";

function Home() {
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const products = await getProduct();
        const categories = await getCategory();

        if (products) setProductList(products);
        if (categories) setCategoryList(categories);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const getFeaturedByCategory = () => {
    return categoryList
      .map((category) => {
        const product = productList.find(
          (p) => p.category?._id === category._id
        );
        return { category, product };
      })
      .filter((item) => item.product);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center justify-content-center text-center">
        <div className="hero-content">
          <h1 className="display-4 fw-bold">Unleash Your Style</h1>
          <p className="lead">
            Discover timeless fashion and new trends at FashionFlare
          </p>
          <Link to="/categories" className="btn btn-light px-4 py-2 mt-3">
            Explore Collection
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">🌟 One Pick from Every Category</h2>
        <div className="row">
          {getFeaturedByCategory().map(({ product, category }) => (
            <div className="col-md-4 mb-4" key={product._id}>
              <div
                className="card home-featured-card"
                onClick={() => navigate(`/categories/${category.categoryName}`)}
              >
                <img
                  src={product.imageUrl1 || defaultImage}
                  className="card-img-top featured-img home-images"
                  alt={product.productName}
                  style={{cursor : "pointer"}}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.productName}</h5>
                  <span className="badge bg-secondary">
                    {category.categoryName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Small About Section */}
      <div className="container-fluid about-section text-white py-5">
        <div className="container text-center">
          <h2 className="mb-4">About FashionFlare</h2>
          <p>
            At FashionFlare, we believe style is a way to say who you are
            without speaking. Our store brings you elegant, edgy, and modern
            pieces to help express your individuality. With curated collections,
            seamless service, and a growing community of fashion lovers, we're
            redefining how style is experienced.
          </p>
          <Link className="btn btn-outline-light mt-3" to="/about">
            Learn More
          </Link>
        </div>
      </div>

      {/* Services Section */}
      <div className="container-fluid services-section py-5">
        <div className="container text-center">
          <h2 className="mb-5 text-white">Why Shop With Us?</h2>
          <div className="row g-4">
            <div className="col-md-3">
              <div className="service-box p-4 text-white bg-dark rounded-4">
                <i className="bi bi-truck fs-1 mb-3"></i>
                <h5>Fast Delivery</h5>
                <p>Get your orders at lightning speed nationwide.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="service-box p-4 text-white bg-dark rounded-4">
                <i className="bi bi-credit-card fs-1 mb-3"></i>
                <h5>Secure Payments</h5>
                <p>We ensure your transactions are safe and secure.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="service-box p-4 text-white bg-dark rounded-4">
                <i className="bi bi-stars fs-1 mb-3"></i>
                <h5>Exclusive Collections</h5>
                <p>Fresh drops and fashion-forward pieces weekly.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="service-box p-4 text-white bg-dark rounded-4">
                <i className="bi bi-people fs-1 mb-3"></i>
                <h5>20k+ Customers</h5>
                <p>Loved by fashionistas all over the country.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
