import React, { useEffect, useState } from "react";
import {
  getProduct,
  deleteProduct,
  updateProduct,
} from "../services/productApi";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { getCategory } from "../services/categoryApi";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const fetchProducts = async () => {
    const data = await getProduct();
    if (data) setProducts(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted");
        fetchProducts();
      } catch (error) {
        toast.error("Failed to delete");
        console.log(error);
      }
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setCurrentProduct({
      ...currentProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(currentProduct._id, currentProduct);
      toast.success("Product updated");
      setShowModal(false);
      fetchProducts();
    } catch (error) {
      toast.error("Update failed");
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategory();
      if (data) setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);
  return (
    <div
      className="container mt-4"
      style={{ maxWidth: "100%", marginLeft: "120px" }}
    >
      <div
        className="card shadow"
        style={{ borderRadius: "12px", border: "none" }}
      >
        <div
          className="card-header text-white"
          style={{
            backgroundColor: "#843b62",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        >
          <h4 className="mb-0">Product List</h4>
        </div>
        <div className="card-body" style={{ backgroundColor: "#fdf6f9" }}>
          {products?.length > 0 ? (
            <div className="table-responsive">
              <Table striped bordered hover responsive className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Stock</th>
                    <th>Gender</th>
                    {/* <th>Video</th> */}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product._id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={product.imageUrl1}
                          alt="product"
                          width="60"
                          height="60"
                          style={{ objectFit: "cover", borderRadius: "8px" }}
                        />
                      </td>
                      <td>{product.title}</td>
                      <td>{product.description}</td>
                      <td>{product.category.categoryName}</td>
                      <td>₹{product.price}</td>
                      <td>₹{product.discountPrice}</td>
                      <td>{product.stock}</td>
                      <td>{product.gender}</td>

                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <p className="text-center mb-0">No products found.</p>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                value={currentProduct?.title || ""}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                value={currentProduct?.description || ""}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={currentProduct?.category?._id || ""}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    category: categories.find(
                      (cat) => cat._id === e.target.value
                    ),
                  })
                }
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.categoryName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Tag</Form.Label>
              <Form.Control
                name="tag"
                value={currentProduct?.tag || ""}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={currentProduct?.gender || ""}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="man">Man</option>
                <option value="woman">Woman</option>
                <option value="kid">Kid</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                type="number"
                value={currentProduct?.price || ""}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Discount Price</Form.Label>
              <Form.Control
                name="discountPrice"
                type="number"
                value={currentProduct?.discountPrice || ""}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                name="stock"
                type="number"
                value={currentProduct?.stock || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Image URL 1</Form.Label>
              <Form.Control
                name="imageUrl1"
                value={currentProduct?.imageUrl1 || ""}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Image URL 2</Form.Label>
              <Form.Control
                name="imageUrl2"
                value={currentProduct?.imageUrl2 || ""}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Video URL</Form.Label>
              <Form.Control
                name="videoUrl"
                value={currentProduct?.videoUrl || ""}
                onChange={handleInputChange}
              />
            </Form.Group>

            <div className="mt-4 text-end">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>{" "}
              <Button type="submit" variant="primary">
                Update
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default ProductList;
