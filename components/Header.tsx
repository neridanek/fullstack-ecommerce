import Logo from "./Logo";
import React from "react";
import { useCart } from "../context/cartContext";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useToken } from "../context/tokenContext";
import { useMutation } from "react-query";
import { logout } from "../api/users";
const Header = () => {
  const {
    dispatch,
    state: { products },
  } = useCart();
  const openCheckout = () => dispatch({ type: "openMenu" });
  const router = useRouter();
  const {
    state: { token },
  } = useToken();
  const { mutate: handleLogout } = useMutation((token) => logout(token), {
    onSuccess: () => router.push("/login"),
  });
  return (
    <header className="relative bg-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <Logo />

          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <div>
              <span className="absolute top-0  bg-yellow-400 h-6 w-5 text-center rounded-full text-black font-bold sm:top-4">
                {products.length}
              </span>
              <ShoppingCartIcon
                onClick={openCheckout}
                className="h-10  focus:outline-none "
              />
            </div>

            <button
              onClick={() => handleLogout(token)}
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              LOG OUT
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
