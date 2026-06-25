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

  // Tự động nạp lại hiệu ứng template (Slider, Menu, Dropdown) mỗi khi chuyển trang
  useEffect(() => {
    const scripts = [
      "/js/popper.min.js",
      "/js/jquery.min.js",
      "/js/bootstrap.min.js",
      "/js/slick.min.js",
      "/js/jquery.mmenu.all.min.js",
      "/js/app.js", // File chứa logic hiệu ứng của template đặt cuối cùng
    ];

    const loadScripts = async () => {
      // Xóa các script cũ đã chạy trước đó để tránh trùng lặp và xung đột cấu trúc
      scripts.forEach((src) => {
        const oldScript = document.querySelector(`script[src="${src}"]`);
        if (oldScript) oldScript.remove();
      });

      // Tải tuần tự lại từ đầu để các thẻ HTML mới của trang vừa chuyển nhận được hiệu ứng jQuery
      for (const src of scripts) {
        await new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.async = false;
          script.onload = resolve;
          script.onerror = resolve;
          document.body.appendChild(script);
        });
      }
    };

    // Hoãn 150ms để React dựng xong hoàn toàn giao diện của trang mới rồi mới cho jQuery quét qua
    const timer = setTimeout(() => {
      loadScripts();
    }, 150);

    return () => clearTimeout(timer);
  }, [currentPage]); // Chạy lại logic này bất cứ khi nào biến currentPage thay đổi trang

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
    // Bọc và chặn hoàn toàn lỗi Hydration/Extension can thiệp vào React bằng thuộc tính chống lỗi dưới đây
    <div
      id="page"
      className="hfeed page-wrapper"
      suppressHydrationWarning={true}
    >
      <Header />
      {renderPage()}
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
