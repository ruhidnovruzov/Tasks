import "./App.css";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import pause from "./assets/pause.svg";
import plus from "./assets/plus.svg";
import like from "./assets/like.svg";
import sound from "./assets/sound.svg";
import back from "./assets/back.svg";
import next from "./assets/next.svg";
import trailer from "./assets/trailer.mp4";
import bg from "./assets/bg-image.png";
import Footer from "./components/Footer";

type Item = {
  title: string;
  description: string;
  big_image: string;
  genre: string;
};

function App() {
  const [data, setData] = useState<Item[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [genreIndex, setGenreIndex] = useState(0);
  const visibleGenres = 5;
  const visibleMovies = 5;
  const [movieIndex, setMovieIndex] = useState(0);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
  };

  const showVideo = () => {
    setIsVideoVisible(true);
  };

  const hideVideo = () => {
    setIsVideoVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.npoint.io/a33d3efc86ff97868a0c"
        );
        if (!response.ok) {
          throw new Error("Error");
        }
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const handleGenreNext = () => {
    setGenreIndex(
      (prevIndex) => (prevIndex + 1) % Math.ceil(data.length / visibleGenres)
    );
  };

  const handleGenreBack = () => {
    setGenreIndex(
      (prevIndex) =>
        (prevIndex - 1 + Math.ceil(data.length / visibleGenres)) %
        Math.ceil(data.length / visibleGenres)
    );
  };

  const handleMovieNext = () => {
    setMovieIndex(
      (prevIndex) => (prevIndex + 1) % Math.ceil(data.length / visibleMovies)
    );
  };

  const handleMovieBack = () => {
    setMovieIndex(
      (prevIndex) =>
        (prevIndex - 1 + Math.ceil(data.length / visibleMovies)) %
        Math.ceil(data.length / visibleMovies)
    );
  };

  return (
    <div>
      <Navbar />

      {data.length > 0 && (
        <div className=" relative">
          <div className="text-white">
            {isVideoVisible && (
              <video
                autoPlay
                className="bottom-0 w-full absolute top-0"
                muted={isMuted}
                loop
                src={trailer}
              />
            )}
            <img
              src={data[currentIndex].big_image}
              alt={data[currentIndex].title}
              className="h-[700px] w-full"
            />
            <div className="absolute-flex-center">
              <h1 className="text-center text-[38px] font-bold">
                {data[currentIndex].title}
              </h1>
              <p className="text-center w-2/4 text-[#999999]">
                {data[currentIndex].description}
              </p>
              <div className="flex mt-10 gap-3">
                <button
                  className="bg-[#E50000] text-white flex px-6 py-3 rounded-lg gap-1"
                  onMouseEnter={showVideo}
                  onClick={hideVideo}
                >
                  <img src={pause} alt="" /> Play Now
                </button>
                <div className="flex gap-3">
                  <img
                    src={plus}
                    alt=""
                    className="bg-[#0F0F0F] p-3 rounded-lg"
                  />
                  <img
                    src={like}
                    alt=""
                    className="bg-[#0F0F0F] p-3 rounded-lg"
                  />
                  <button onClick={toggleMute}>
                    <img
                      src={sound}
                      alt=""
                      className="bg-[#0F0F0F] p-3 rounded-lg"
                    />
                  </button>
                </div>
              </div>

              <div className="flex px-12 w-full justify-between absolute bottom-6">
                <button onClick={handleBack} className="">
                  <img src={back} alt="" />
                </button>
                <button onClick={handleNext} className="">
                  <img src={next} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative border border-[#262626] rounded-xl p-12 mt-28">
        <div className="absolute top-[-20px] bg-[#E50000] text-white px-6 py-2 rounded-lg">
          Movies
        </div>
        <div className="flex">
          <h2 className="text-[38px] font-bold text-nowrap text-white">
            Our Genres
          </h2>
          <div className="w-full justify-end flex mb-12">
            <div className="flex gap-10 p-4 bg-[#0F0F0F] border border-[#1f1f1f] rounded-xl">
              <button onClick={handleGenreBack} disabled={genreIndex === 0}>
                <img src={back} alt="" />
              </button>
              <button
                onClick={handleGenreNext}
                disabled={(genreIndex + 1) * visibleGenres >= data.length}
              >
                <img src={next} alt="" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {data
            .slice(genreIndex * visibleGenres, (genreIndex + 1) * visibleGenres)
            .map((item, index) => (
              <div
                key={index}
                className="relative p-7 text-white w-[20%] h-[342px] bg-[#1A1A1A] border border-[#1A1A1A] rounded-xl"
              >
                <div className="card_gradient"></div>
                <p className="absolute bottom-7 text-sm left-7 text-wrap">
                  {item.genre}
                </p>
                <div className="flex flex-wrap gap-1 justify-center items-center">
                  {data
                    .filter((d) => d.genre === item.genre)
                    .slice(0, 4)
                    .map((i, ind) => (
                      <img
                        key={ind}
                        src={i.big_image}
                        alt={i.title}
                        className="w-[48%] h-[123px] object-cover rounded-lg border border-white"
                      />
                    ))}
                  {data
                    .filter((d) => d.genre === item.genre)
                    .slice(0, 4)
                    .map((i, ind) => (
                      <img
                        key={ind}
                        src={i.big_image}
                        alt={i.title}
                        className="w-[48%] h-[123px] object-cover rounded-lg border border-white"
                      />
                    ))}
                  {data
                    .filter((d) => d.genre === item.genre)
                    .slice(0, 4)
                    .map((i, ind) => (
                      <img
                        key={ind}
                        src={i.big_image}
                        alt={i.title}
                        className="w-[48%] h-[123px] object-cover rounded-lg border border-white"
                      />
                    ))}
                  {data
                    .filter((d) => d.genre === item.genre)
                    .slice(0, 4)
                    .map((i, ind) => (
                      <img
                        key={ind}
                        src={i.big_image}
                        alt={i.title}
                        className="w-[48%] h-[123px] object-cover rounded-lg border border-white"
                      />
                    ))}
                </div>
              </div>
            ))}
        </div>

        <div className="flex mt-28">
          <h2 className="text-[38px] font-bold text-nowrap text-white">
            Popular Top 10 In Genres
          </h2>
          <div className="w-full justify-end flex mb-12">
            <div className="flex gap-10 p-4 bg-[#0F0F0F] border border-[#1f1f1f] rounded-xl">
              <button onClick={handleGenreBack} disabled={genreIndex === 0}>
                <img src={back} alt="" />
              </button>
              <button
                onClick={handleGenreNext}
                disabled={(genreIndex + 1) * visibleGenres >= data.length}
              >
                <img src={next} alt="" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-8">
          {data
            .slice(genreIndex * visibleGenres, (genreIndex + 1) * visibleGenres)
            .map((item, index) => (
              <div
                key={index}
                className="relative p-7 text-white w-[20%] h-[342px] bg-[#1A1A1A] border border-[#1A1A1A] rounded-xl"
              >
                <div className="card_gradient"></div>
                <p className="absolute bottom-7 text-sm left-7 text-wrap">
                  {item.genre}
                </p>
                <div className="flex flex-wrap gap-1 justify-center items-center">
                  {data
                    .filter((d) => d.genre === item.genre)
                    .slice(0, 4)
                    .map((i, ind) => (
                      <img
                        key={ind}
                        src={i.big_image}
                        alt={i.title}
                        className="w-[48%] h-[123px] object-cover rounded-lg border border-white"
                      />
                    ))}
                  {data
                    .filter((d) => d.genre === item.genre)
                    .slice(0, 4)
                    .map((i, ind) => (
                      <img
                        key={ind}
                        src={i.big_image}
                        alt={i.title}
                        className="w-[48%] h-[123px] object-cover rounded-lg border border-white"
                      />
                    ))}
                  {data
                    .filter((d) => d.genre === item.genre)
                    .slice(0, 4)
                    .map((i, ind) => (
                      <img
                        key={ind}
                        src={i.big_image}
                        alt={i.title}
                        className="w-[48%] h-[123px] object-cover rounded-lg border border-white"
                      />
                    ))}
                  {data
                    .filter((d) => d.genre === item.genre)
                    .slice(0, 4)
                    .map((i, ind) => (
                      <img
                        key={ind}
                        src={i.big_image}
                        alt={i.title}
                        className="w-[48%] h-[123px] object-cover rounded-lg border border-white"
                      />
                    ))}
                </div>
              </div>
            ))}
        </div>

        <div className="flex mt-28">
          <h2 className="text-[38px] font-bold text-nowrap text-white">
            Trending Now
          </h2>
          <div className="w-full justify-end flex mb-12">
            <div className="flex gap-10 p-4 bg-[#0F0F0F] border border-[#1f1f1f] rounded-xl">
              <button onClick={handleMovieBack} disabled={movieIndex === 0}>
                <img src={back} alt="" />
              </button>
              <button
                onClick={handleMovieNext}
                disabled={(movieIndex + 1) * visibleMovies >= data.length}
              >
                <img src={next} alt="" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          {data
            .slice(movieIndex * visibleMovies, (movieIndex + 1) * visibleMovies)
            .map((item, index) => (
              <div
                key={index}
                className="relative p-7 text-white w-[20%] h-[342px] bg-[#1A1A1A] border border-[#1A1A1A] rounded-xl"
              >
                <div className="card_gradient"></div>
                <img src={item.big_image} alt="" />
                <p className="text-white absolute lef-0 bottom-3 text-sm ">
                  {item.title}
                </p>
              </div>
            ))}
        </div>

        <div className="flex mt-28">
          <h2 className="text-[38px] font-bold text-nowrap text-white">
            Must - Watch Movies
          </h2>
          <div className="w-full justify-end flex mb-12">
            <div className="flex gap-10 p-4 bg-[#0F0F0F] border border-[#1f1f1f] rounded-xl">
              <button onClick={handleMovieBack} disabled={movieIndex === 0}>
                <img src={back} alt="" />
              </button>
              <button
                onClick={handleMovieNext}
                disabled={(movieIndex + 1) * visibleMovies >= data.length}
              >
                <img src={next} alt="" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          {data
            .slice(movieIndex * visibleMovies, (movieIndex + 1) * visibleMovies)
            .map((item, index) => (
              <div
                key={index}
                className="relative p-7 text-white w-[20%] h-[342px] bg-[#1A1A1A] border border-[#1A1A1A] rounded-xl"
              >
                <div className="card_gradient"></div>
                <img src={item.big_image} alt="" />
                <p className="text-white absolute lef-0 bottom-3 text-sm ">
                  {item.title}
                </p>
              </div>
            ))}
        </div>
      </div>

      <div className="relative border border-[#262626] rounded-xl p-12 mt-28">
        <div className="absolute top-[-20px] bg-[#E50000] text-white px-6 py-2 rounded-lg">
          Shows
        </div>
        <div className="flex">
          <h2 className="text-[38px] font-bold text-nowrap text-white">
            Our Genres
          </h2>
          <div className="w-full justify-end flex mb-12">
            <div className="flex gap-10 p-4 bg-[#0F0F0F] border border-[#1f1f1f] rounded-xl">
              <button onClick={handleGenreBack} disabled={genreIndex === 0}>
                <img src={back} alt="" />
              </button>
              <button
                onClick={handleGenreNext}
                disabled={(genreIndex + 1) * visibleGenres >= data.length}
              >
                <img src={next} alt="" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {data
            .slice(genreIndex * visibleGenres, (genreIndex + 1) * visibleGenres)
            .map((item, index) => (
              <div
                key={index}
                className="relative p-7 text-white w-[20%] h-[342px] bg-[#1A1A1A] border border-[#1A1A1A] rounded-xl"
              >
                <div className="card_gradient"></div>
                <p className="absolute bottom-7 text-sm left-7 text-wrap">
                  {item.genre}
                </p>
                <div className="flex flex-wrap gap-1 justify-center items-center">
                  {data
                    .filter((d) => d.genre === item.genre)
                    .slice(0, 4)
                    .map((i, ind) => (
                      <img
                        key={ind}
                        src={i.big_image}
                        alt={i.title}
                        className="w-[48%] h-[123px] object-cover rounded-lg border border-white"
                      />
                    ))}
                  {data
                    .filter((d) => d.genre === item.genre)
                    .slice(0, 4)
                    .map((i, ind) => (
                      <img
                        key={ind}
                        src={i.big_image}
                        alt={i.title}
                        className="w-[48%] h-[123px] object-cover rounded-lg border border-white"
                      />
                    ))}
                  {data
                    .filter((d) => d.genre === item.genre)
                    .slice(0, 4)
                    .map((i, ind) => (
                      <img
                        key={ind}
                        src={i.big_image}
                        alt={i.title}
                        className="w-[48%] h-[123px] object-cover rounded-lg border border-white"
                      />
                    ))}
                  {data
                    .filter((d) => d.genre === item.genre)
                    .slice(0, 4)
                    .map((i, ind) => (
                      <img
                        key={ind}
                        src={i.big_image}
                        alt={i.title}
                        className="w-[48%] h-[123px] object-cover rounded-lg border border-white"
                      />
                    ))}
                </div>
              </div>
            ))}
        </div>

        <div className="flex mt-28">
          <h2 className="text-[38px] font-bold text-nowrap text-white">
            Popular Top 10 In Genres
          </h2>
          <div className="w-full justify-end flex mb-12">
            <div className="flex gap-10 p-4 bg-[#0F0F0F] border border-[#1f1f1f] rounded-xl">
              <button onClick={handleGenreBack} disabled={genreIndex === 0}>
                <img src={back} alt="" />
              </button>
              <button
                onClick={handleGenreNext}
                disabled={(genreIndex + 1) * visibleGenres >= data.length}
              >
                <img src={next} alt="" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-8">
          {data
            .slice(genreIndex * visibleGenres, (genreIndex + 1) * visibleGenres)
            .map((item, index) => (
              <div
                key={index}
                className="relative p-7 text-white w-[20%] h-[342px] bg-[#1A1A1A] border border-[#1A1A1A] rounded-xl"
              >
                <div className="card_gradient"></div>
                <p className="absolute bottom-7 text-sm left-7 text-wrap">
                  {item.genre}
                </p>
                <div className="flex flex-wrap gap-1 justify-center items-center">
                  {data
                    .filter((d) => d.genre === item.genre)
                    .slice(0, 4)
                    .map((i, ind) => (
                      <img
                        key={ind}
                        src={i.big_image}
                        alt={i.title}
                        className="w-[48%] h-[123px] object-cover rounded-lg border border-white"
                      />
                    ))}
                  {data
                    .filter((d) => d.genre === item.genre)
                    .slice(0, 4)
                    .map((i, ind) => (
                      <img
                        key={ind}
                        src={i.big_image}
                        alt={i.title}
                        className="w-[48%] h-[123px] object-cover rounded-lg border border-white"
                      />
                    ))}
                  {data
                    .filter((d) => d.genre === item.genre)
                    .slice(0, 4)
                    .map((i, ind) => (
                      <img
                        key={ind}
                        src={i.big_image}
                        alt={i.title}
                        className="w-[48%] h-[123px] object-cover rounded-lg border border-white"
                      />
                    ))}
                  {data
                    .filter((d) => d.genre === item.genre)
                    .slice(0, 4)
                    .map((i, ind) => (
                      <img
                        key={ind}
                        src={i.big_image}
                        alt={i.title}
                        className="w-[48%] h-[123px] object-cover rounded-lg border border-white"
                      />
                    ))}
                </div>
              </div>
            ))}
        </div>

        <div className="flex mt-28">
          <h2 className="text-[38px] font-bold text-nowrap text-white">
            Trending Shows Now
          </h2>
          <div className="w-full justify-end flex mb-12">
            <div className="flex gap-10 p-4 bg-[#0F0F0F] border border-[#1f1f1f] rounded-xl">
              <button onClick={handleMovieBack} disabled={movieIndex === 0}>
                <img src={back} alt="" />
              </button>
              <button
                onClick={handleMovieNext}
                disabled={(movieIndex + 1) * visibleMovies >= data.length}
              >
                <img src={next} alt="" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          {data
            .slice(movieIndex * visibleMovies, (movieIndex + 1) * visibleMovies)
            .map((item, index) => (
              <div
                key={index}
                className="relative p-7 text-white w-[20%] h-[342px] bg-[#1A1A1A] border border-[#1A1A1A] rounded-xl"
              >
                <div className="card_gradient"></div>
                <img src={item.big_image} alt="" />
                <p className="text-white absolute lef-0 bottom-3 text-sm ">
                  {item.title}
                </p>
              </div>
            ))}
        </div>

        <div className="flex mt-28">
          <h2 className="text-[38px] font-bold text-nowrap text-white">
            Must - Watch Shows
          </h2>
          <div className="w-full justify-end flex mb-12">
            <div className="flex gap-10 p-4 bg-[#0F0F0F] border border-[#1f1f1f] rounded-xl">
              <button onClick={handleMovieBack} disabled={movieIndex === 0}>
                <img src={back} alt="" />
              </button>
              <button
                onClick={handleMovieNext}
                disabled={(movieIndex + 1) * visibleMovies >= data.length}
              >
                <img src={next} alt="" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          {data
            .slice(movieIndex * visibleMovies, (movieIndex + 1) * visibleMovies)
            .map((item, index) => (
              <div
                key={index}
                className="relative p-7 text-white w-[20%] h-[342px] bg-[#1A1A1A] border border-[#1A1A1A] rounded-xl"
              >
                <div className="card_gradient"></div>
                <img src={item.big_image} alt="" />
                <p className="text-white absolute lef-0 bottom-3 text-sm ">
                  {item.title}
                </p>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-36 relative">
        <img src={bg} alt="" className="rounded-xl border border-[#262626]" />
        <div className="absolute w-full top-24 left-20 flex items-center">
          <div>
            <h1 className="text-[48px] font-bold text-white">
              Start your free trial today!
            </h1>
            <p className="text-[#999999]">
              This is a clear and concise call to action that encourages users
              to sign up for a free trial of StreamVibe.
            </p>
          </div>
          <button className="px-6 py-4 absolute right-40 rounded-lg bg-[#E50000] text-white">
            Start a Free Trail
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
