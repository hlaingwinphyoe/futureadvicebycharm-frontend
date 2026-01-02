import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import BlogIndex from "./Pages/Blogs/BlogIndex";
import NotFound from "./components/NotFound";
import BlogDetails from "./Pages/Blogs/BlogDetails";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthProvider } from "./context/AuthContext";
import PubliceRoute from "./components/routes/PubliceRoute";
import PrivateRoute from "./components/routes/PrivateRoute";
import PackageIndex from "./Pages/Packages/PackageIndex";
import CalendarSelection from "./Pages/Booking/CalendarSelection";
import Payment from "./Pages/Booking/Payment";
import BookedSlip from "./Pages/Booking/BookingSlip";
import BookingList from "./Pages/User/BookingList";
import Profile from "./Pages/User/Profile";
import MakeAppointment from "./Pages/Booking/MakeAppointment";
import LocalStorageManager from "./components/LocalStorageManager";
import Index from "./Pages/Contact/Index";
import SavedPosts from "./Pages/User/SavedPosts";
import SettingsPage from "./Pages/User/Settings";
import ServiceWorkerRegistration from "./components/ServiceWorkerRegistration";
import OfflineFallback from "./components/OfflineFallback";
import PWASettings from "./components/PWASettings";
import Zodiacs from "./Pages/Zodiacs";
import Privacy from "./Pages/Privacy";
import Terms from "./Pages/Terms";
import About from "./Pages/About";
import FeedbackIndex from "./Pages/Feedback/Index";

export default function App() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <ServiceWorkerRegistration />
            <OfflineFallback />
            <PWASettings />
            <LocalStorageManager />
            <Routes>
              {/* Public route with layout */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/packages" element={<PackageIndex />} />
                <Route path="/feedback" element={<FeedbackIndex />} />
                <Route path="/blogs" element={<BlogIndex />} />
                <Route path="/blogs/:slug" element={<BlogDetails />} />
                <Route path="/contact" element={<Index />} />
                <Route path="/zodiacs" element={<Zodiacs />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />

                {/* Private route with layout */}
                <Route
                  path="/appointment"
                  element={<PrivateRoute>{<CalendarSelection />}</PrivateRoute>}
                />
                <Route
                  path="/appointment/form"
                  element={<PrivateRoute>{<MakeAppointment />}</PrivateRoute>}
                />
                <Route
                  path="/appointment/:appointmentNo/payment"
                  element={<PrivateRoute>{<Payment />}</PrivateRoute>}
                />

                <Route
                  path="/appointment/:appointmentNo/booking/slip"
                  element={<PrivateRoute>{<BookedSlip />}</PrivateRoute>}
                />

                <Route
                  path="/user/bookings-list"
                  element={<PrivateRoute>{<BookingList />}</PrivateRoute>}
                />

                <Route
                  path="/user/profile"
                  element={<PrivateRoute>{<Profile />}</PrivateRoute>}
                />

                <Route
                  path="/user/saved-posts"
                  element={<PrivateRoute>{<SavedPosts />}</PrivateRoute>}
                />

                <Route
                  path="/user/settings"
                  element={<PrivateRoute>{<SettingsPage />}</PrivateRoute>}
                />

                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Public auth routes - redirect to home if authenticated */}
              <Route
                path="/login"
                element={
                  <PubliceRoute>
                    <Login />
                  </PubliceRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PubliceRoute>
                    <Register />
                  </PubliceRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    </HelmetProvider>
  );
}
