import React, { useState, useEffect } from "react";
import { CiTrash } from "react-icons/ci";
import { RiPencilLine } from "react-icons/ri";
import api from "../Auth/api";
import toast, {ToastContainer} from "react-toastify";

const ListProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState({
    productId: "",
    productName: "",
  });

  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(
          `api/Products/getAllProducts?page=${currentPage}&limit=${productsPerPage}`
        );
        setProducts(response.data.product);
        setTotalPages(response.data.totalPages);
        toast.success("Products fetched successfully");
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error fetching products");
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`api/Products/deleteProduct/${productId}`);
        setProducts(
          products.filter((product) => product.productId !== productId)
        );
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Error deleting product");
      }
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditedProduct(product);
  };

  const handleEditField = (field, value) => {
    setEditedProduct({ ...editedProduct, [field]: value });
  };

  const handleUpdate = async () => {
    try {
      await api.put(
        `api/Products/updateProduct/${selectedProduct.productId}`,
        editedProduct
      );
      setSelectedProduct(null);
      setEditedProduct({});
      toast.success("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product");
    }
  };

  return (
    <div className="flex flex-col items-center pt-40">
      <ToastContainer />
      <div className="flex mb-4 space-x-4 text-slate-800">
        <input
          type="text"
          name="productId"
          placeholder="Filter by Product ID"
          value={filter.productId}
          onChange={handleFilterChange}
          className="border rounded-lg px-2 py-1"
        />
        <input
          type="text"
          name="productName"
          placeholder="Filter by Product Name"
          value={filter.productName}
          onChange={handleFilterChange}
          className="border rounded-lg px-2 py-1"
        />
      </div>
      <table className="table-auto w-full rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left">
            <th className="px-3 py-2 font-medium tracking-wider">Product ID</th>
            <th className="px-3 py-2 font-medium tracking-wider">
              Product Name
            </th>
            <th className="px-3 py-2 font-medium tracking-wider">
              Description
            </th>
            <th className="px-3 py-2 font-medium tracking-wider">Price</th>
            <th className="px-3 py-2 font-medium tracking-wider">Category</th>
            <th className="px-3 py-2 font-medium tracking-wider">Stock</th>
            <th className="px-3 py-2 font-medium tracking-wider">Actions</th>
            <th className="px-3 py-2 font-medium tracking-wider">Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.productId}
              className={index % 2 === 0 ? "bg-slate-800" : ""}
            >
              <td className="px-3 py-2">{product.productId}</td>
              <td className="px-3 py-2">{product.productName}</td>
              <td className="px-3 py-2">{product.productDescription}</td>
              <td className="px-3 py-2">{product.productPrice}</td>
              <td className="px-3 py-2">{product.productCategory}</td>
              <td className="px-3 py-2">{product.productStock}</td>
              <td className="px-3 py-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleEdit(product)}
                >
                  <RiPencilLine />
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(product.productId)}
                >
                  <CiTrash />
                </button>
              </td>
              {/* <td>
                  <img src={product.productImage}/>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`mx-1 px-3 py-1 rounded-lg ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-slate-600"
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      {selectedProduct && (
        <div className="absolute bottom-0 right-0 p-4">
          {Object.keys(editedProduct).map((field) => (
            <div key={field} className="mb-2">
              <label className="block mb-1 text-sm font-medium ">{field}</label>
              <input
                type="text"
                value={editedProduct[field]}
                onChange={(e) => handleEditField(field, e.target.value)}
                className="border rounded-lg px-2 py-1 w-full text-slate-700"
              />
            </div>
          ))}
          <button
            className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
            onClick={handleUpdate}
          >
            Update Product
          </button>
        </div>
      )}
    </div>
  );
};

export default ListProducts;
