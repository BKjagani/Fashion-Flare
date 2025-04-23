import React from 'react';
// import './About.css'; // Import the custom CSS file for styling

function About() {
  return (
    <div className="about-container">
      <div className="about-header text-center">
        <h2 className="about-title">👗 About FashionFlare</h2>
        <p className="about-description">
          FashionFlare is a modern clothing store built with a passion for fashion and customer satisfaction. 
          Whether you're looking for everyday essentials or bold statement pieces, we’ve got something for everyone.
        </p>
      </div>

      <div className="about-content container">
        <div className="row">
          <div className="col-md-6">
            <img 
              src="https://www.azafashions.com/blog/wp-content/uploads/2024/12/Featured-image-Aza-Fashions-Surat.jpg" // Replace with your actual image URL
              alt="FashionFlare Collection" 
              className="about-image img-fluid rounded shadow-sm" 
            />
          </div>
          <div className="col-md-6">
            <p>
              Our mission is to provide high-quality fashion items at affordable prices, while offering a smooth and secure shopping experience. 
              We constantly update our collections to keep you on trend.
            </p>
            <p>
              We believe in the power of self-expression, and every collection we launch is carefully designed to make you feel confident and stylish.
            </p>
          </div>
        </div>
      </div>

      <h5 className="mt-4 text-center why-choose-title">🧵 Why Choose FashionFlare?</h5>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="feature-box">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTshAN5yNX84-ligq22hvKYl2goNvBNvoLtO4RcYk4VgX8uszu9u4wB6l4F-OulE1rAbBc&usqp=CAU"
                alt="Trendy Fashion"
                // className="feature-icon"
                style={{width : "100%", height : "200px"}} 
              />
              <h6 className='mt-3'>Latest Fashion Trends</h6>
              <p>Curated by experts to keep you ahead in the fashion game.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="feature-box">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbcPYMS4Atft7z6BpGoGO7keftEph1ffFb7Jytjunu7mJ85bYqwZgMSPLUgISRq7kUwJs&usqp=CAU" // Replace with your actual image URL
                alt="Affordable Fashion"
                // className="feature-icon" 
                style={{width : "100%", height : "200px"}} 
              />
              <h6 className='mt-3'>Affordable Pricing</h6>
              <p>Enjoy seasonal discounts and unbeatable prices.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="feature-box">
              <img 
                src="https://image.opencart.com/cache/56195745ab517-resize-710x380.jpg" // Replace with your actual image URL
                alt="Fast Checkout"
                // className="feature-icon" 
                style={{width : "100%", height : "200px"}} 
              />
              <h6 className='mt-3'>Fast Checkout</h6>
              <p>Quick and secure checkout experience for your convenience.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="feature-box">
              <img 
                src="https://drmcnatty.com/wp-content/uploads/2020/12/1-1-1024x577.png" // Replace with your actual image URL
                alt="Customer Support"
                // className="feature-icon" 
                style={{width : "100%", height : "200px"}} 
              />
              <h6 className='mt-3'>Dedicated Support</h6>
              <p>Always here to help with any questions or concerns.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
