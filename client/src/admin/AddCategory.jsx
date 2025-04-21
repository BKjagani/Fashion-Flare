import React, { useState } from 'react';
import { postCategory } from '../services/categoryApi';
import { toast } from 'react-toastify';  // Import toast
import 'react-toastify/dist/ReactToastify.css';  // Import the styles

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.dismiss()
    try {
      await postCategory({ categoryName });

      // If the response is successful, clear the input and show success toast
      setCategoryName(''); 
      toast.success('Category added successfully!');
    } catch (error) {
      console.error(error);

      // Check if error response contains the specific message
      if (error.response && error.response.data && error.response.data.message === 'Category is already exists') {
        toast.error('Category already exists! Please choose another name.');
      } else {
        toast.error('Failed to add category. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <div className="card shadow" style={{ borderRadius: '12px', border: 'none' }}>
        <div
          className="card-header text-white"
          style={{ backgroundColor: '#843b62', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
        >
          <h4 className="mb-0">Add Category</h4>
        </div>
        <div className="card-body" style={{ backgroundColor: '#fdf6f9' }}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="categoryName" className="form-label">
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                name="categoryName"
                className="form-control"
                value={categoryName}
                onChange={handleChange}
                placeholder="Enter category name"
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn" 
              style={{ backgroundColor: '#b57ba6', color: 'white' }}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Category'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
