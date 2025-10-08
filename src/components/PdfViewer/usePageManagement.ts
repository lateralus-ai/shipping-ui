import { useState, useCallback } from "react";

export const usePageManagement = (initialTotalPages: number = 0) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(initialTotalPages);

  const actions = {
    nextPage: useCallback(() => {
      setCurrentPage((prev) => {
        return prev < totalPages ? prev + 1 : prev;
      });
    }, [totalPages]),
    prevPage: useCallback(() => {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    }, []),
    goToPage: useCallback(
      (page: number) => {
        setCurrentPage(() => Math.max(1, Math.min(page, totalPages)));
      },
      [totalPages],
    ),
    setTotalPages: useCallback((pages: number) => {
      setTotalPages(pages);
      setCurrentPage((prev) => Math.min(prev, pages));
    }, []),
  };

  return [{ currentPage, totalPages }, actions] as const;
};
