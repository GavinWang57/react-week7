import "../../assets/scss/Checkout.scss";
import * as bootstrap from "bootstrap";

import { useState, useEffect, useRef } from "react";
import { get, set, useForm } from "react-hook-form";
import axios from "axios";
import { ClockLoader } from "react-spinners";
import SingleProductModal from "../../components/SingleProductModal";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Checkout() {
  const [cartsData, setCartsData] = useState([]);
  const [finalTotal, setFinalTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const productModalRef = useRef(null);
  // 載入中狀態
  const [loadingCartId, setLoadingCartId] = useState(null);
  const [loadingProductId, setLoadingProductId] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const addCart = async (id, qty = parseInt(quantity, 10)) => {
    const data = { product_id: id, qty };
    setLoadingCartId(id);
    try {
      const response = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {
        data,
      });
    } catch (error) {
      console.error(error);
      console.log(`加入購物車失敗`, error.response.data);
    } finally {
      getCarts();
      setLoadingCartId(null);
    }
  };

  const getCarts = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);

      setFinalTotal(response.data.data.final_total);
      setCartsData(response.data.data.carts);
    } catch (error) {
      console.error(error);
    }
  };

  const updateCart = async (cartId, productId, qty = 1) => {
    const data = {
      product_id: productId,
      qty,
    };
    try {
      const response = await axios.put(
        `${API_BASE}/api/${API_PATH}/cart/${cartId}`,
        { data },
      );
      console.log(`更新購物車數量:`, response.data);
      getCarts();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCart = async (cartId) => {
    try {
      const response = await axios.delete(
        `${API_BASE}/api/${API_PATH}/cart/${cartId}`,
      );
      getCarts();
      alert("已從購物車刪除該項目");
    } catch (error) {
      console.error(error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await axios.delete(`${API_BASE}/api/${API_PATH}/carts`);
      getCarts();
    } catch (error) {
      console.error(error);
    }
  };

  // 送出訂單
  const onSubmit = async (formData) => {
    if (finalTotal === 0) {
      alert("購物車內沒有商品，無法送出訂單");
      return;
    }
    try {
      const data = {
        user: formData,
        message: formData.message,
      };
      console.log(`送出訂單資料完成`);
      const response = await axios.post(`${API_BASE}/api/${API_PATH}/order`, {
        data,
      });
      console.log(`送出訂單成功`);
      reset();
      getCarts();
    } catch (error) {
      console.error(error);
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/${API_PATH}/products/all`,
      );
      setProducts(response.data.products);
      getCarts();
    } catch (error) {
      console.error(error);
      alert("無法取得產品資料");
    }
  };

  // 產品 Modal
  const openModal = () => {
    productModalRef.current.show();
  };
  const closeModal = () => {
    productModalRef.current.hide();
  };

  const handleView = async (id) => {
    setLoadingProductId(id);
    try {
      const response = await axios.get(
        `${API_BASE}/api/${API_PATH}/product/${id}`,
      );
      setProduct(response.data.product);
    } catch (error) {
      console.error(error);
      alert("無法取得產品詳細資訊");
    } finally {
      setLoadingProductId(null);
    }

    openModal();
  };

  useEffect(() => {
    // 初始化 Bootstrap Modal 實例
    productModalRef.current = new bootstrap.Modal("#productModal", {
      keyboard: false,
    });
    // Modal 關閉時移除焦點
    const modalElement = document.getElementById("productModal");
    modalElement.addEventListener("hidden.bs.modal", () => {
      document.activeElement.blur();
    });

    getCarts();
    getProducts();
  }, []);

  return (
    <>
      <div className="product-table container py-5 lh-base">
        <div className="row g-4">
          {/* 產品列表 */}
          <table className="table table-hover table-striped mb-0 ">
            <thead className="table-secondary">
              <tr className="py-3">
                <th className="text-center table-td-img">圖片</th>
                <th>產品名稱</th>
                <th>原價</th>
                <th>售價</th>
                <th>庫存</th>
                <th>動作</th>
              </tr>
            </thead>
            <tbody>
              {products && products.length > 0 ? (
                products.map((product) => {
                  return product.id === undefined ? null : (
                    <tr key={product.id} className="align-middle py-3">
                      <td className="text-center table-td-img">
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="img-fluid"
                        />
                      </td>
                      <td className="fw-medium">{product.title}</td>
                      <td className="text-center">
                        ${product.origin_price.toLocaleString()}
                      </td>
                      <td>${product.price.toLocaleString()}</td>
                      <td>{product.stock}</td>
                      <td className="text-center">
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm loading-btn"
                            aria-current="page"
                            onClick={() => handleView(product.id)}
                            disabled={loadingProductId === product.id}
                          >
                            {loadingProductId === product.id ? (
                              <div className="d-flex align-items-center justify-content-center">
                                <ClockLoader
                                  className=""
                                  color="#4b4b4b"
                                  size={18}
                                />
                              </div>
                            ) : (
                              "查看更多"
                            )}
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm loading-btn"
                            onClick={() => addCart(product.id, 1)}
                            disabled={loadingCartId === product.id}
                          >
                            {loadingCartId === product.id ? (
                              <div className="d-flex align-items-center justify-content-center">
                                <ClockLoader
                                  className=""
                                  color="#4b4b4b"
                                  size={18}
                                />
                              </div>
                            ) : (
                              "加入購物車"
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    載入中...
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* 清空購物車按鈕 */}
          <div className="text-end">
            <button
              type="button"
              className="btn btn-outline-danger px-4 py-2"
              onClick={clearCart}
            >
              清空購物車
            </button>
          </div>

          {/* 購物車清單 */}
          <div className="peosuxrList col">
            <div className="shadow-sm rounded ">
              <div className="bg-primary text-white py-3 px-4 rounded-top mb-3">
                <h2 className="h4 mb-0">購物車清單</h2>
              </div>

              {/* 購物車列表 */}
              <table className="table table-hover table-striped mb-5">
                <thead className="table-secondary">
                  <tr className="py-3">
                    <th>項次</th>
                    <th>編輯</th>
                    <th>產品名稱</th>
                    <th>單價</th>
                    <th>數量/單位</th>
                    <th>小計</th>
                  </tr>
                </thead>
                <tbody>
                  {cartsData.length > 0 ? (
                    cartsData.map((item, index) => (
                      <tr key={item.id} className="align-middle py-3">
                        <td>{index + 1}</td>
                        <td>
                          <div className="btn-group">
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => deleteCart(item.id)}
                            >
                              刪除
                            </button>
                          </div>
                        </td>
                        <td className="fw-medium">{item.product.title}</td>
                        <td>${item.product.price}</td>
                        <td>
                          <div className="input-group mb-3">
                            <input
                              type="number"
                              className="form-control text-end"
                              aria-label=""
                              value={item.qty}
                              onChange={(e) =>
                                updateCart(
                                  item.id,
                                  item.product.id,
                                  Number(e.target.value),
                                )
                              }
                            />
                            <span className="input-group-text">
                              {item.product.unit}
                            </span>
                          </div>
                        </td>
                        <td>${item.total}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="h2 text-center py-5 text-secondary"
                      >
                        目前購物車沒有商品……
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  {cartsData.length > 0 && (
                    <tr className="table-secondary">
                      <td colSpan="3" className="text-end fw-bold">
                        總計：
                      </td>
                      <td colSpan="2" className="fw-bold">
                        ${finalTotal}
                      </td>
                    </tr>
                  )}
                </tfoot>
              </table>

              {/* 購物資訊表單 */}
              <form
                className="col-md-6 text-start"
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    {...register("email", {
                      required: "Email 是必填欄位",
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Email 格式不正確",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-danger mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* 姓名 */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    姓名
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="請輸入姓名"
                    {...register("name", {
                      required: "姓名 是必填欄位",
                      minLength: { value: 2, message: "姓名至少需要2個字" },
                    })}
                  />
                  {errors.name && (
                    <p className="text-danger mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* 電話 */}
                <div className="mb-3">
                  <label htmlFor="tel" className="form-label">
                    電話
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="tel"
                    placeholder="請輸入電話，例如: 0912345678 或 0-12345678"
                    {...register("tel", {
                      required: "電話 是必填欄位",
                      pattern: {
                        value: /^\d{8,}$/,
                        message: "請輸入至少 8 位數字",
                      },
                      minLength: { value: 8, message: "電話至少需要8個數字" },
                    })}
                  />
                  {errors.tel && (
                    <p className="text-danger mt-1">{errors.tel.message}</p>
                  )}
                </div>

                {/* 地址 */}
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    地址
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="請輸入地址"
                    {...register("address", {
                      required: "地址 是必填欄位",
                    })}
                  />
                  {errors.address && (
                    <p className="text-danger mt-1">{errors.address.message}</p>
                  )}
                </div>

                {/* 留言 */}
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    留言
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    placeholder="請輸入留言"
                    {...register("message")}
                  />
                </div>
                <button className="but but-primary" type="submit">
                  送出
                </button>
              </form>
            </div>
          </div>

          {/* 產品 Modal */}
          <SingleProductModal
            product={product}
            addCart={addCart}
            closeModal={closeModal}
          />
        </div>
      </div>
    </>
  );
}

export default Checkout;
