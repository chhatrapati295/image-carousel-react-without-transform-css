import { useEffect, useRef, useState } from "react";
import data from "./data.json";
const App = () => {
  const [index, setIndex] = useState<number>(0);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleNext = () => {
    setIndex((prevIndex) => {
      if (prevIndex == data?.length - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  };

  const handlePrev = () => {
    setIndex((prevIndex) => {
      if (prevIndex == 0) {
        return data.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  };

  console.log(index + " outer");

  useEffect(() => {
    ref.current = setInterval(() => {
      handleNext();
    }, 2000);

    return () => {
      if (ref.current) clearInterval(ref.current);
    };
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold text-center">Image Carousel</h1>
      {data?.length > 0 && (
        <div
          className="relative m-4 rounded-lg"
          onMouseEnter={() => {
            if (ref.current) clearInterval(ref.current);
          }}
          onMouseLeave={() => {
            if (ref.current) clearInterval(ref.current);
            ref.current = setInterval(() => {
              handleNext();
            }, 2000);
          }}
        >
          <button
            onClick={handlePrev}
            className="absolute top-1/2 -translate-y-1/2 left-2 h-8 w-8 rounded-full bg-white"
          >
            &larr;
          </button>
          <img src={data[index]?.download_url} className="rounded-lg" alt="" />
          <button
            onClick={handleNext}
            className="absolute top-1/2 -translate-y-1/2 right-2 h-8 w-8 rounded-full bg-white"
          >
            &rarr;
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
