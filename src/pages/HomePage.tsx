import { Hero } from "../components";
import HeroImage from "../images/koreanbeefmealprep-750x1000.webp";

const HomePage = () => {
  return (
    <>
      <Hero>
        <div className="container mx-auto max-w-screen-xl mt-24">
          <div className="md:grid grid-cols-2 flex flex-col">
            <div>
              <h2 className="md:text-7xl md:text-left md:mt-0 tracking-wide text-5xl font-bold text-center">
                Cerca!
              </h2>
              <h3 className="md:text-7xl md:text-left md:mt-0 tracking-wide text-5xl font-bold text-center mt-1">
                Cucina!!
              </h3>
              <h3 className="md:text-7xl md:text-left md:mt-0 tracking-wide text-5xl font-bold text-center mt-1">
                Gusta!!!!
              </h3>
              <div className="mt-8">
                <p className="md:w-1/2 leading-relaxed text-center">
                  Scorri in basso per <br /> cercare la tua ricetta preferita
                </p>
              </div>
            </div>
            <div className="md:grid w-full mt-5">
              <img
                src={HeroImage}
                alt="Hero Image"
                className="md:rounded-lg w-3/4 justify-self-end w-full"
              />
            </div>
          </div>
        </div>
      </Hero>
    </>
  );
};

export default HomePage;
