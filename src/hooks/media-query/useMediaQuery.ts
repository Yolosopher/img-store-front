import { useEffect, useState } from "react";

type MediaQueryProps = number;

const useMediaQuery = (resolution: MediaQueryProps, max: boolean = false) => {
  const [matches, setMatches] = useState<boolean>(
    window.matchMedia(`(${max ? "max" : "min"}-width: ${resolution}px)`).matches
  );
  useEffect(() => {
    const matchQueryList = window.matchMedia(
      `(${max ? "max" : "min"}-width: ${resolution}px)`
    );
    function handleChange(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }
    matchQueryList.addEventListener("change", handleChange);
    return () => {
      matchQueryList.removeEventListener("change", handleChange);
    };
  }, [resolution, max]);
  return matches;
};

export default useMediaQuery;
