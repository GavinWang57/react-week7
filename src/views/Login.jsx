import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import axios from "axios";
import Cookies from "js-cookie";

import "../assets/scss/style.css";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Login() {
  const [isAuth, setIsAuth] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { username: "", password: "" },
  });
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(`${API_BASE}/admin/signin`, formData);

      const { token, expired } = response.data;

      // 寫入 Cookie
      Cookies.set("hexToken", token, { expires: new Date(expired * 1000) });

      document.cookie = `hexToken=${token}; expires=${new Date(
        expired * 1000,
      ).toUTCString()}; path=/`;

      axios.defaults.headers.common["Authorization"] = token;

      setIsAuth(true);
      // alert("登入成功，將導向後台產品管理頁面");
      navigate("/admin/admin-products");
    } catch (error) {
      console.error("登入失敗:", error.response.data.message);
      setIsAuth(false);
    }
  };

  const checkLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE}/api/user/check`);
      setIsAuth(true);
    } catch (error) {
      console.log(
        "尚未登入或登入已過期",
        error.response?.data?.message || error.message,
      );

      
        if (error.response?.status === 401) {
              console.log("Token 已過期或無效");
              // 導向登入頁
              navigate("/login");
            }

      setIsAuth(false);
    }
  };

  useEffect(() => {
    // 讀取 Cookie
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      ?.split("=")[1];
    if (token) {

      


      axios.defaults.headers.common["Authorization"] = token;
      setIsAuth(true);
      // alert("已登入，將導向後台產品管理頁面");
      navigate("/admin/admin-products");
    }

    checkLogin();
  }, []);

  return (
    <>
      <div className="container login">
        <div className="login-card">
          <p>
            <i className="bi bi-person-circle text-primary display-4 mb-3"></i>
          </p>
          <h2 className="h3 fw-bold mb-4">管理者登入</h2>
          <form className="form-floating" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="username"
                name="username"
                placeholder="name@example.com"
                {...register("username", {
                  required: "請輸入帳號",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "請輸入有效的電子郵件地址",
                  },
                })}
                // value={formData.username}
                // onChange={handleInputChange}
              />
              {errors.username && (
                <div className="text-danger mt-1">
                  {errors.username.message}
                </div>
              )}
              <label htmlFor="username">
                <i className="bi bi-envelope me-2"></i>輸入帳號
              </label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                {...register("password", {
                  required: "請輸入密碼",
                  minLength: { 4: "密碼至少需要4個字元" },
                })}
              />

              <label htmlFor="password">
                <i className="bi bi-lock me-2"></i>輸入密碼
              </label>
            </div>
            {errors.password && (
              <div className="text-danger mt-1">{errors.password.message}</div>
            )}
            <button type="submit" className="btn btn-primary w-100 mt-2">
              登入
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
