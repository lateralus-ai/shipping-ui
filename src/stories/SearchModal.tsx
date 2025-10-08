import { useState } from "react";
import { SearchModal } from "../components/SearchModal";

const mockResults = [
  {
    id: "1",
    title: "Create React App",
    description: "Set up a modern web app by running one command",
    category: "Documentation",
  },
  {
    id: "2",
    title: "React Router",
    description: "Declarative routing for React apps at any scale",
    category: "Library",
  },
  {
    id: "3",
    title: "Redux Toolkit",
    description:
      "The official, opinionated, batteries-included toolset for efficient Redux development",
    category: "State Management",
  },
  {
    id: "4",
    title: "Material Tailwind",
    description:
      "React components library that implements Google's Material Design",
    category: "UI Library",
  },
  {
    id: "5",
    title: "Tailwind CSS",
    description: "A utility-first CSS framework for rapid UI development",
    category: "Styling",
  },
];

export const SearchModals = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("");

  const filteredResults = mockResults.filter((result) => {
    const matchesQuery = result.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = !activeFilter || result.category === activeFilter;
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="p-8">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Open Search Modal
      </button>

      <SearchModal
        open={open}
        onClose={() => setOpen(false)}
        results={searchQuery ? filteredResults : []}
        onSearch={setSearchQuery}
        onResultClick={(result) => {
          console.log("Selected:", result);
          alert(`Selected: ${result.title}`);
        }}
        filters={[
          "Documentation",
          "Library",
          "State Management",
          "UI Library",
          "Styling",
        ]}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
    </div>
  );
};
