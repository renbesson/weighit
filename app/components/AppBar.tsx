import Image from "next/image";
import Link from "next/link";

export default async function AppBar() {
  const MainMenuOption = ({ text, link }: { text: string; link: string }) => (
    <li>
      <Link
        href={link}
        className="block py-2 pl-3 pr-4 rounded md:bg-transparent md:hover:text-secondary"
        aria-current="page"
      >
        {text}
      </Link>
    </li>
  );

  return (
    <div className="navbar bg-primary mb-8">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <MainMenuOption text="Ingredients" link="/ingredients" />
            <MainMenuOption text="Recipes" link="/recipes" />
            <MainMenuOption text="Contact Us" link="/contactus" />
          </ul>
        </div>
        <Link className="btn btn-ghost normal-case text-xl" href={"/"}>
          daisyUI
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <MainMenuOption text="Ingredients" link="/ingredients" />
          <MainMenuOption text="Recipes" link="/recipes" />
          <MainMenuOption text="Contact Us" link="/contactus" />
        </ul>
      </div>
    </div>
  );
}
