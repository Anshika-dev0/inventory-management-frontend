import { useEffect, useState } from "react";
import API from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [category, setCategory] = useState("");

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
    } else {
      response = await API.get("/products");
    }

    setProducts(response.data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

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

      <input
        type="text"
        placeholder="Search product by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="">All Categories</option>
  <option value="Electronic">Electronic</option>
  <option value="Food">Food</option>
  <option value="Clothing">Clothing</option>
</select>

<br />
<br />

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