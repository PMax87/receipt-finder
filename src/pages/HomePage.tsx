import { Hero } from "../components";
import HeroImage from "../images/koreanbeefmealprep-750x1000.webp";

const HomePage = () => {
  return (
    <div className="w-[100%] md:px-8 px-4">
      <Hero>
      <div className="container mx-auto max-w-screen-xl mt-24">
      <div className="grid grid-cols-2">
        <div>
          <h2 className="text-7xl font-bold tracking-wide">Cerca!</h2>
          <h3 className="text-7xl font-bold tracking-wide mt-2">Cucina!!</h3>
          <h3 className="text-7xl font-bold tracking-wide mt-2">Gusta!!!!</h3>
          <div className="mt-8">
            <p className="w-1/2 leading-relaxed">
              Scorri in basso per <br /> cercare la tua ricetta preferita
            </p>
          </div>
        </div>
        <div className="grid">
          <img
            src={HeroImage}
            alt="Hero Image"
            className="rounded-lg w-3/4 justify-self-end"
          />
        </div>
      </div>
        </Hero>;
    </div>
  );
};

export default HomePage;
