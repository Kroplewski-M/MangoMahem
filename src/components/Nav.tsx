import { Logo } from "../assets/SVG/Logo";

export const Nav = () => {
  return (
    <nav className="w-full h-[70px] bg-secondary flex">
      <div className="self-center flex pl-[10px] hover:cursor-pointer">
        <Logo width={50} height={50} />
        <p className="font-bold self-center pl-2">Mango Mahem</p>
      </div>
    </nav>
  );
};
