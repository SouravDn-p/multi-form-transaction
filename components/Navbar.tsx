"use client";

import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { useLogoutMutation } from "@/redux/features/api/authApi";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, token } = useAppSelector((state) => state.auth);
  const [logout, { isLoading }] = useLogoutMutation();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="text-xl font-bold text-primary">
        <Link href="/">Multi-Form Transaction</Link>
      </div>

      <div className="flex items-center space-x-4">
        {token ? (
          <>
            <span className="text-gray-700">
              Welcome, {user?.nprenom || user?.fname || "User"}
            </span>
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors"
            >
              {isLoading ? "Logging out..." : "Logout"}
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md transition-colors"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
