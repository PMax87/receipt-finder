import { ReactElement, ReactNode } from "react";

type HeroComponentsProps = {
  children: ReactNode;
};

const Hero = ({ children }: HeroComponentsProps): ReactElement => {
  return <div className="w-[100%] md:px-8 px-4">{children}</div>;
};

export default Hero;
