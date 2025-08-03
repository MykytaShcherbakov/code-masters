import { useEffect, useState } from "react";

export default function useSkeletonLoader(delay) {
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLocalLoading(false);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return localLoading;
}