"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Suspense,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

interface LoadingProviderProps {
  children: React.ReactNode;
}

// Separate component that uses useSearchParams, wrapped in Suspense
function LoadingProviderInner({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Stop loading when the route changes
    setIsLoading(false);
  }, [pathname, searchParams]);

  const value = {
    isLoading,
    setIsLoading,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      <LoadingOverlay />
    </LoadingContext.Provider>
  );
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  return (
    <Suspense fallback={<div>{children}</div>}>
      <LoadingProviderInner>{children}</LoadingProviderInner>
    </Suspense>
  );
}

function LoadingOverlay() {
  const { isLoading } = useLoading();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-sm flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center space-y-4 border border-gray-200"
          >
            {/* Loading Spinner */}
            <div className="relative">
              <motion.div
                className="w-12 h-12 border-4 border-blue-200 rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute inset-0 w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>

            {/* Loading Text */}
            <div className="text-center">
              <motion.h3
                className="text-lg font-semibold text-gray-900 mb-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Loading...
              </motion.h3>
              <motion.p
                className="text-sm text-gray-600"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Please wait while we prepare your page
              </motion.p>
            </div>

            {/* Loading Animation Dots */}
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-blue-600 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
