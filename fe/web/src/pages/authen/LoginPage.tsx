import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import bgImage from "@/assets/images/background.jpg";
import axios from "axios";
import { API_URL } from "../../services/api";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!username || !password) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }
  setLoading(true);
  try {
    const res = await axios.post(`${API_URL}/authen`, { username, password });
    alert(`Đăng nhập thành công! Chào mừng ${res.data.username} đến với SmartVerify!`);
    window.location.href = "/";
  } catch (error: any) {
    console.error("Login error:", error);
    const message = error?.response?.data?.detail || "Đăng nhập không thành công.";
    alert(`Lỗi: ${message}`);
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row items-center justify-center py-10 px-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="md:w-1/2 max-w-3xl min-h-[960px] flex flex-col justify-center bg-slate-500 bg-opacity-80 p-12 animate-fadeIn text-white">
        <h2 className="text-5xl font-extrabold mb-6 leading-tight">
          Chào mừng đến với <span className="text-yellow-200">SmartVerify</span>
        </h2>
        <p className="text-lg mb-6">
          Nền tảng tiên tiến giúp kiểm tra nguồn gốc sản phẩm, phát hiện hàng giả và bảo vệ quyền lợi người tiêu dùng.
        </p>
        <p className="text-lg mb-6">
          SmartVerify mang đến giải pháp minh bạch, tạo niềm tin và nâng cao giá trị thương hiệu cho doanh nghiệp.
        </p>
        <p className="text-md">
          Chưa có tài khoản?{" "}
          <Link to="/authen/register" className="text-white underline font-bold hover:text-yellow-100">
            Đăng ký ngay
          </Link>
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="md:w-1/2 max-w-3xl min-h-[960px] bg-slate-500 bg-opacity-75 p-12 animate-fadeIn flex flex-col justify-center"
      >
        <h3 className="text-6xl font-bold text-gray-900 text-center mb-10">Đăng nhập</h3>

        <div className="space-y-8">
          <div>
            <label htmlFor="username" className="block text-lg font-semibold text-gray-800 mb-2">
              Tên đăng nhập
            </label>
            <input
              id="username"
              type="username"
              required
              placeholder="Nhập username của bạn"
              className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-semibold text-gray-800 mb-2">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              required
              placeholder="Nhập mật khẩu"
              className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 text-blue-600" disabled={loading} />
              Ghi nhớ tôi
            </label>
            <Link to="/forgot-password" className="hover:text-blue-600 font-medium">
              Quên mật khẩu?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-10 w-full py-4 text-lg text-white font-semibold rounded-lg shadow-lg transition-colors 
            ${
            loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        <div className="my-8 flex items-center gap-4">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-500 text-md">hoặc</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex justify-center gap-6 text-3xl">
          <button
            type="button"
            aria-label="Đăng nhập với Google"
            className="p-3 rounded-full hover:bg-gray-100 transition"
            onClick={() => alert("Google login")}
            disabled={loading}
          >
            <FcGoogle />
          </button>
          <button
            type="button"
            aria-label="Đăng nhập với Facebook"
            className="p-3 rounded-full hover:bg-gray-100 transition text-blue-600"
            onClick={() => alert("Facebook login")}
            disabled={loading}
          >
            <FaFacebookF />
          </button>
        </div>
      </form>

      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.6s ease forwards;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
