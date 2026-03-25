import "bootstrap-icons/font/bootstrap-icons.css";
import "../assets/scss/SingleProductModal.scss";
import { useState } from "react";

function SingleProductModal({ product, addCart, closeModal }) {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleSubmit = (id, quantity) => {
    addCart(id, quantity);
    closeModal();
  };

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="productModal"
        tabIndex="-1"
        aria-labelledby="productModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-l">
          <div className="modal-content">
            <div className="modal-header text-white bg-dark">
              <h2 className="modal-title fs-5 fw-bold" id="productModalLabel">
                {product.title}
              </h2>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body bg-secondary bg-opacity-10 p-4">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="img-fluid modal-img"
              />

              <div>
                <h3 className="fs-4 fw-bold mt-3">{product.title}</h3>
                <p className="fs-5 text-danger fw-bold mt-2">
                  <span className="text-decoration-line-through">
                    NT$ {product.origin_price}
                  </span>
                  /NT$ {product.price}
                </p>
                <p className="fs-6 text-secondary mt-3">
                  {product.description}
                </p>
                <p className="fs-5 text-secondary mt-3 text-start">
                  {product.content}
                </p>
              </div>

              {/* 數量控制 */}
              <div className="py-2">
                <div className="d-flex align-items-center justify-content-center w-100">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={handleDecrease}
                    disabled={quantity <= 1}
                  >
                    <i className="bi bi-dash fs-5"></i>
                  </button>
                  <input
                    type="number"
                    className="form-control text-center mx-2 number-input"
                    value={quantity}
                    onChange={handleChange}
                    min="1"
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={handleIncrease}
                  >
                    <i className="bi bi-plus fs-5"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <div className="row w-100 g-1">
                <div className="col">
                  <button
                    className="btn btn-secondary w-100 p-2 fs-5"
                    data-bs-dismiss="modal"
                  >
                    關閉
                  </button>
                </div>
                <div className="col">
                  <button
                    className="btn btn-primary w-100 p-2 fs-5"
                    onClick={() => handleSubmit(product.id, quantity)}
                  >
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProductModal;
