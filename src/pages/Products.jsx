import { useEffect, useState } from "react";
import API from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [category, setCategory] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const [stockStatus, setStockStatus] = useState("");
  const [sortPrice, setSortPrice] = useState("");

  const fetchProducts = async () => {
    try {
      let response;

      if (search.trim() !== "") {
        response = await API.get(
          `/products/name/${encodeURIComponent(search)}`
        );
      } 
      else if (category !== "") {
        response = await API.get(
          `/products/category/${encodeURIComponent(category)}`
        );
      } 
      else if (stockStatus === "in-stock") {
        response = await API.get("/products/in-stock");
      } 
      else if (stockStatus === "out-stock") {
        response = await API.get("/products/out-stock");
      } 
      else if (stockStatus === "low-stock") {
        response = await API.get("/products/low-stock");
      } 
      else if (sortPrice !== "") {
        response = await API.get(
          `/products/sort/price?order=${sortPrice}`
        );
      } 
      else {
        response = await API.get(
          `/products/pagination?page=${page}&limit=${limit}`
        );
      }

      const productData = Array.isArray(response.data)
        ? response.data
        : response.data.products || [];

      setProducts(productData);

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category, stockStatus, sortPrice, page]);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/products/${editingProduct.id}`, {
        name: editingProduct.name,
        category: editingProduct.category,
        price: Number(editingProduct.price),
        quantity: Number(editingProduct.quantity),
      });

      alert("Product updated successfully");

      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to update product");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`);

      alert("Product deleted successfully");

      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  return (
    <div>
      <h1>Products</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search product by name"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <br />
      <br />

      {/* Category Filter */}
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setPage(1);
        }}
      >
        <option value="">All Categories</option>
        <option value="Electronic">Electronic</option>
        <option value="Food">Food</option>
        <option value="Clothing">Clothing</option>
      </select>

      <br />
      <br />

      {/* Stock Filter */}
      <select
        value={stockStatus}
        onChange={(e) => {
          setStockStatus(e.target.value);
          setPage(1);
        }}
      >
        <option value="">All Stock</option>
        <option value="in-stock">In Stock</option>
        <option value="out-stock">Out of Stock</option>
        <option value="low-stock">Low Stock</option>
      </select>

      <br />
      <br />

      {/* Price Sorting */}
      <select
        value={sortPrice}
        onChange={(e) => {
          setSortPrice(e.target.value);
          setPage(1);
        }}
      >
        <option value="">Sort by Price</option>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>

      <br />
      <br />

      {/* Products Table */}
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>₹{product.price}</td>
                <td>{product.quantity}</td>

                <td>
                  <button
                    type="button"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>

                  {" "}

                  <button
                    type="button"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      {search.trim() === "" &&
        category === "" &&
        stockStatus === "" &&
        sortPrice === "" && (
          <div>
            <br />

            <button
              type="button"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>

            {" "}

            <span>Page {page}</span>

            {" "}

            <button
              type="button"
              onClick={() => setPage(page + 1)}
              disabled={products.length < limit}
            >
              Next
            </button>
          </div>
        )}

      {/* Edit Product */}
      {editingProduct && (
        <div>
          <h2>Edit Product</h2>

          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  name: e.target.value,
                })
              }
            />

            <br />
            <br />

            <input
              type="text"
              value={editingProduct.category}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  category: e.target.value,
                })
              }
            />

            <br />
            <br />

            <input
              type="number"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  price: e.target.value,
                })
              }
            />

            <br />
            <br />

            <input
              type="number"
              value={editingProduct.quantity}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  quantity: e.target.value,
                })
              }
            />

            <br />
            <br />

            <button type="submit">Update Product</button>

            {" "}

            <button
              type="button"
              onClick={() => setEditingProduct(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Products;