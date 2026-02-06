import { useState, useEffect, useRef } from 'react';

export interface UseImageLoadingOptions {
  /** Whether to use intersection observer for lazy loading */
  enableIntersectionObserver?: boolean;
  /** Intersection observer threshold (0-1) */
  threshold?: number;
  /** Placeholder image data URL */
  placeholder?: string;
}

export interface UseImageLoadingReturn {
  /** Whether the image has loaded */
  isLoaded: boolean;
  /** Whether to show the image (based on intersection) */
  isInView: boolean;
  /** Whether an error occurred */
  hasError: boolean;
  /** Ref to attach to the image container */
  ref: React.RefObject<HTMLDivElement | null>;
  /** Handler for image load event */
  handleLoad: () => void;
  /** Handler for image error event */
  handleError: () => void;
}

/**
 * Custom hook for managing image loading states with intersection observer
 * Provides loading state, error handling, and progressive reveal
 * 
 * @param options - Configuration options
 * @returns Image loading state and handlers
 */
export function useImageLoading(
  options: UseImageLoadingOptions = {}
): UseImageLoadingReturn {
  const {
    enableIntersectionObserver = true,
    threshold = 0.1,
  } = options;

  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!enableIntersectionObserver);
  const [hasError, setHasError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enableIntersectionObserver || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [enableIntersectionObserver, threshold]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  return {
    isLoaded,
    isInView,
    hasError,
    ref,
    handleLoad,
    handleError,
  };
}
