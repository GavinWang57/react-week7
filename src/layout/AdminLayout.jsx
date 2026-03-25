import { Outlet, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();
  return (
    <>
      <header className="">
        <div className="container p-3">
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                React Coffee Shop
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/"
                    >
                      首頁
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to="/product"
                    >
                      產品列表
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/cart">
                      購物車
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to="/checkout"
                    >
                      結帳
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/login">
                      登入
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to="/admin/admin-products"
                    >
                      後台產品管理
                    </Link>
                  </li>
                  <li className="nav-item me-5">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to="/admin/admin-orders"
                    >
                      後台訂單管理
                    </Link>
                  </li>

                  <li className="nav-item">
                    <button
                      className="btn btn-link nav-link px-4 py-2 btn-logout"
                      onClick={() => {
                        // 清除 Cookie
                        document.cookie =
                          "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        // 清除 Axios 預設的 Authorization 標頭
                        delete axios.defaults.headers.common["Authorization"];
                        alert("已登出，將導向首頁");
                        navigate("/");
                      }}
                    >
                      登出
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AdminLayout;
