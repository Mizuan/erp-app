import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Main components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Module routes
import PostsIndex from "../modules/posts/pages/PostsIndex";
import PostDetail from "../modules/posts/pages/PostDetail";

// Booking Types
import BookingTypeIndex from "../modules/booking-types/pages/BookingTypeIndex";

const AppRoutes = () => (
  <Router>
    <Navbar />
    <div className="min-h-screen w-full mx-auto flex flex-col max-w-7xl px-4 lg:px-6 py-6">
      <Routes>
        {/* Posts routes */}
        <Route path="/" element={<PostsIndex />} />
        <Route path="/posts/:id" element={<PostDetail />} />

        {/* Booking Types */}
        <Route path="/booking-types" element={<BookingTypeIndex />} />
      </Routes>
    </div>
    <Footer />
  </Router>
);

export default AppRoutes;
