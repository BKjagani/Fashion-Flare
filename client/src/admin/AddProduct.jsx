import React, { useState, useEffect } from 'react';
import { postProduct } from '../services/productApi';
import { getCategory } from '../services/categoryApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tag: '',
    price: '',
    discountPrice: '',
    gender: '',
    stock: '',
    videoUrl: '',
    imageUrl1: '',
    imageUrl2: ''
  });

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategory();
        setCategories(response);
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch categories');
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.dismiss();

    try {
      await postProduct(formData);
      toast.success('Product added successfully!');
      setFormData({
        title: '',
        description: '',
        category: '',
        tag: '',
        price: '',
        discountPrice: '',
        gender: '',
        stock: '',
        videoUrl: '',
        imageUrl1: '',
        imageUrl2: ''
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '800px' }}>
      <div className="card shadow" style={{ borderRadius: '12px', border: 'none' }}>
        <div
          className="card-header text-white"
          style={{ backgroundColor: '#843b62', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
        >
          <h4 className="mb-0">Add Product</h4>
        </div>
        <div className="card-body" style={{ backgroundColor: '#fdf6f9' }}>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Title</label>
                <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Tag</label>
                <input type="text" name="tag" className="form-control" value={formData.tag} onChange={handleChange} required />
              </div>
              <div className="col-md-12 mb-3">
                <label className="form-label">Description</label>
                <textarea name="description" className="form-control" value={formData.description} onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Category</label>
                <select name="category" className="form-control" value={formData.category} onChange={handleChange} required>
                  <option value="">Select Category</option>
                  {categories && categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Gender</label>
                <select name="gender" className="form-control" value={formData.gender} onChange={handleChange} required>
                  <option value="">Select Gender</option>
                  <option value="man">Man</option>
                  <option value="woman">Woman</option>
                  <option value="kids">Kids</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Price</label>
                <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Discount Price</label>
                <input type="number" name="discountPrice" className="form-control" value={formData.discountPrice} onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Stock</label>
                <input type="number" name="stock" className="form-control" value={formData.stock} onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Video URL</label>
                <input type="text" name="videoUrl" className="form-control" value={formData.videoUrl} onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Image URL 1</label>
                <input type="text" name="imageUrl1" className="form-control" value={formData.imageUrl1} onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Image URL 2</label>
                <input type="text" name="imageUrl2" className="form-control" value={formData.imageUrl2} onChange={handleChange} />
              </div>
            </div>
            <button
              type="submit"
              className="btn mt-2"
              style={{ backgroundColor: '#b57ba6', color: 'white' }}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
