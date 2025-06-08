import { Link } from "react-router-dom";


const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md text-center bg-white p-8 rounded-2xl shadow-lg">
      
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You do not have permission to view this page. Please check your role or login with the correct account.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 text-white bg-red-500 hover:bg-red-600 rounded-full transition"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
