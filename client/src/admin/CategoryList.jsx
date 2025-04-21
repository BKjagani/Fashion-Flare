import React, { useEffect, useState } from "react";
import {
  getCategory,
  deleteCategory,
  updateCategory,
} from "../services/categoryApi";
import { toast } from "react-toastify";


const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({});
  const fetchCategories = async () => {
    try {
      const data = await getCategory();
      setCategories(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch categories");
    }
  };

  const handleDelete = async (name) => {
    if (window.confirm(`Are you sure to delete '${name}' category?`)) {
      try {
        await deleteCategory(name);
        toast.success("Category deleted");
        fetchCategories();
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete category");
      }
    }
  };

  function handleEdit(cat) {
    setShowModal(true);
    setCurrentCategory({ ...cat });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      await updateCategory(currentCategory._id, {
        newCategoryName: currentCategory.categoryName,
      });
      toast.success("Category updated");
      fetchCategories();
      setShowModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update category");
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentCategory({});
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container mt-4" style={{ maxWidth: "800px" }}>
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
          <h4 className="mb-0">Category List</h4>
        </div>
        <div className="card-body" style={{ backgroundColor: "#fdf6f9" }}>
          {categories?.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: "10%" }}>#</th>
                    <th style={{ width: "50%" }}>Category Name</th>
                    <th style={{ width: "40%" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat, index) => (
                    <tr key={cat._id}>
                      <td>{index + 1}</td>
                      <td className="text-capitalize">{cat.categoryName}</td>
                      <td>
                        <button
                          className="btn btn-sm me-2"
                          style={{ backgroundColor: "#ffc107", color: "#fff" }}
                          onClick={() => handleEdit(cat)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-sm"
                          style={{ backgroundColor: "#dc3545", color: "#fff" }}
                          onClick={() => handleDelete(cat.categoryName)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center mb-0">No categories found.</p>
          )}
        </div>
      </div>
      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div
                  className="modal-header"
                  style={{ backgroundColor: "#843b62" }}
                >
                  <h5 className="modal-title text-white">Update Category</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                      <label htmlFor="categoryName" className="form-label">
                        Category Name
                      </label>
                      <input
                        type="text"
                        id="categoryName"
                        className="form-control"
                        value={currentCategory.categoryName || ""}
                        onChange={(e) =>
                          setCurrentCategory({
                            ...currentCategory,
                            categoryName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show"
            onClick={handleCloseModal}
          ></div>
        </>
      )}
    </div>
  );
};

export default CategoryList;
