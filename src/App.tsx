import { useEffect } from "react";
import { ShopProvider, useShop } from "./Context/ShopContext";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import GlobalOverlays from "./Components/GlobalOverlays";

// Page components
import Home from "./Pages/Home";
import HomeCollection from "./Pages/HomeCollection";
import HomeMinimal from "./Pages/HomeMinimal";
import HomeModern from "./Pages/HomeModern";
import HomeParallax from "./Pages/HomeParallax";
import HomeStrong from "./Pages/HomeStrong";
import HomeStyle from "./Pages/HomeStyle";
import HomeUnique from "./Pages/HomeUnique";
import Shop from "./Pages/Shop";
import ShopDetails from "./Pages/ShopDetails";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Wishlist from "./Pages/Wishlist";
import Blog from "./Pages/Blog";
import BlogDetails from "./Pages/BlogDetails";
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import FAQ from "./Pages/FAQ";
import MyAccount from "./Pages/MyAccount";
import ForgotPassword from "./Pages/ForgotPassword";
import Admin from "./Pages/Admin";
import NotFound from "./Pages/NotFound";

import "./App.css";

function MainApp() {
  const { currentPage } = useShop();

  // 1. Tải các thư viện nền tảng lõi một lần duy nhất khi ứng dụng khởi chạy
  useEffect(() => {
    const baseScripts = [
      "/js/popper.min.js",
      "/js/jquery.min.js",
      "/js/bootstrap.min.js",
      "/js/slick.min.js",
      "/js/jquery.mmenu.all.min.js",
    ];

    const loadBase = async () => {
      for (const src of baseScripts) {
        if (!document.querySelector(`script[src="${src}"]`)) {
          await new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.async = false;
            script.onload = resolve;
            script.onerror = resolve;
            document.body.appendChild(script);
          });
        }
      }
    };
    loadBase();
  }, []);

  // 2. Kích hoạt và tải lại file hiệu ứng app.js mỗi khi người dùng chuyển trang
  useEffect(() => {
    // Xóa mã script cũ đã chạy để tránh lỗi xung đột vòng lặp sự kiện
    const oldAppScript = document.querySelector('script[src="/js/app.js"]');
    if (oldAppScript) oldAppScript.remove();

    // Trì hoãn 400ms để React dựng xong hoàn toàn DOM, cách ly tuyệt đối với quá trình Hydration
    const timer = setTimeout(() => {
      const script = document.createElement("script");
      script.src = "/js/app.js";
      script.async = true;
      document.body.appendChild(script);
    }, 400);

    return () => clearTimeout(timer);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "home-collection":
        return <HomeCollection />;
      case "home-minimal":
        return <HomeMinimal />;
      case "home-modern":
        return <HomeModern />;
      case "home-parallax":
        return <HomeParallax />;
      case "home-strong":
        return <HomeStrong />;
      case "home-style":
        return <HomeStyle />;
      case "home-unique":
        return <HomeUnique />;
      case "shop":
        return <Shop />;
      case "details":
        return <ShopDetails />;
      case "cart":
        return <Cart />;
      case "checkout":
        return <Checkout />;
      case "wishlist":
        return <Wishlist />;
      case "blog":
        return <Blog />;
      case "blog-details":
        return <BlogDetails />;
      case "about":
        return <AboutUs />;
      case "contact":
        return <Contact />;
      case "faq":
        return <FAQ />;
      case "account":
        return <MyAccount />;
      case "forgot-password":
        return <ForgotPassword />;
      case "admin":
        return <Admin />;
      default:
        return <NotFound />;
    }
  };

  return (
    // Bọc suppressHydrationWarning vào toàn bộ các thẻ lớn để vô hiệu hóa lỗi sập trang
    <div
      id="page"
      className="hfeed page-wrapper"
      suppressHydrationWarning={true}
    >
      <Header />
      <div suppressHydrationWarning={true}>{renderPage()}</div>
      <Footer />
      <GlobalOverlays />
    </div>
  );
}

function App() {
  return (
    <ShopProvider>
      <MainApp />
    </ShopProvider>
  );
}

export default App;
