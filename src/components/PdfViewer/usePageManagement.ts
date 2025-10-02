import { useState } from "react";

export const usePageManagement = (totalPages: number = 1) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const actions = {
    nextPage: () => setCurrentPage(prev => Math.min(prev + 1, totalPages)),
    prevPage: () => setCurrentPage(prev => Math.max(prev - 1, 1)),
    goToPage: (page: number) => setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  };

  return [currentPage, actions] as const;
};