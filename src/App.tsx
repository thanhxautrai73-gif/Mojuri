
import { ShopProvider, useShop } from './Context/ShopContext';
import Header from './Components/Header';
import Footer from './Components/Footer';
import GlobalOverlays from './Components/GlobalOverlays';

// Page components
import Home from './Pages/Home';
import HomeCollection from './Pages/HomeCollection';
import HomeMinimal from './Pages/HomeMinimal';
import HomeModern from './Pages/HomeModern';
import HomeParallax from './Pages/HomeParallax';
import HomeStrong from './Pages/HomeStrong';
import HomeStyle from './Pages/HomeStyle';
import HomeUnique from './Pages/HomeUnique';
import Shop from './Pages/Shop';
import ShopDetails from './Pages/ShopDetails';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Wishlist from './Pages/Wishlist';
import Blog from './Pages/Blog';
import BlogDetails from './Pages/BlogDetails';
import AboutUs from './Pages/AboutUs';
import Contact from './Pages/Contact';
import FAQ from './Pages/FAQ';
import MyAccount from './Pages/MyAccount';
import ForgotPassword from './Pages/ForgotPassword';
import Admin from './Pages/Admin';
import NotFound from './Pages/NotFound';

import './App.css';

function MainApp() {
  const { currentPage } = useShop();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'home-collection':
        return <HomeCollection />;
      case 'home-minimal':
        return <HomeMinimal />;
      case 'home-modern':
        return <HomeModern />;
      case 'home-parallax':
        return <HomeParallax />;
      case 'home-strong':
        return <HomeStrong />;
      case 'home-style':
        return <HomeStyle />;
      case 'home-unique':
        return <HomeUnique />;
      case 'shop':
        return <Shop />;
      case 'details':
        return <ShopDetails />;
      case 'cart':
        return <Cart />;
      case 'checkout':
        return <Checkout />;
      case 'wishlist':
        return <Wishlist />;
      case 'blog':
        return <Blog />;
      case 'blog-details':
        return <BlogDetails />;
      case 'about':
        return <AboutUs />;
      case 'contact':
        return <Contact />;
      case 'faq':
        return <FAQ />;
      case 'account':
        return <MyAccount />;
      case 'forgot-password':
        return <ForgotPassword />;
      case 'admin':
        return <Admin />;
      default:
        return <NotFound />;
    }
  };

  return (
    <div id="page" className="hfeed page-wrapper">
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
