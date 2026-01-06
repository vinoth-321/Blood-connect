import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import CompleteProfile from "./pages/CompleteProfile";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import HospitalList from "./pages/HospitalList";
import HospitalCreate from "./pages/HospitalCreate";
import HospitalProfile from "./pages/HospitalProfile";
import DonorList from "./pages/DonorList";
import DonorProfile from "./pages/DonorProfile";
import HospitalLogin from "./pages/HospitalLogin";
import HospitalDashboard from "./pages/HospitalDashboard";
import HospitalPersonalProfile from "./pages/HospitalPersonalProfile";
import HospitalBloodStock from "./pages/HospitalBloodStock";
import HospitalCreateRequest from "./pages/HospitalCreateRequest";
import HospitalRequests from "./pages/HospitalRequests";
import VerifyOtp from "./pages/VerifyOtp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/register" element={<Register />} />
       <Route path="/login" element={<Login />} />
       <Route path="/" element={<LandingPage/>}/>
       <Route path="/complete-profile" element={<CompleteProfile/>}/>
       <Route path="/profile/:id" element={<UserProfile />} />
       <Route path="/profile/edit/:id" element={<EditProfile />} />
       <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/hospitals" element={<HospitalList />} />
        <Route path="/admin/hospitals/create" element={<HospitalCreate />} />
        <Route path="/admin/hospitals/:id" element={<HospitalProfile />} /> 
        <Route path="/admin/Donors" element={<DonorList />} />
        <Route path="/admin/Donors/:id" element={<DonorProfile />} />
        <Route path="/hospital/login" element={<HospitalLogin />} />
        <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
        <Route path="/hospital/profile" element={<HospitalPersonalProfile />} />
        <Route path="/hospital/stock" element={<HospitalBloodStock />} />
        <Route path="/hospital/requests" element={<HospitalRequests />} />
        <Route path="/hospital/requests/create" element={<HospitalCreateRequest />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />




      </Routes>
    </BrowserRouter>
    
  
  

  );
}

export default App;
