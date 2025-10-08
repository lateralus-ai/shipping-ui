import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import SearchModal from "../components/SearchModal";
import type { SearchItem } from "../components/SearchModal";
import { Icon } from "@iconify/react";

const meta: Meta<typeof SearchModal> = {
  title: "Design System/SearchModal",
  component: SearchModal,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof SearchModal>;

const mockItems: SearchItem[] = [
  {
    id: "1",
    title: "Engine maintenance report",
    subtitle: "Created by John Doe on January 15, 2025",
    icon: <Icon icon="lucide:users" />,
  },
  {
    id: "2",
    title: "Navigation system update",
    subtitle: "Updated yesterday at 3:45 PM",
    icon: <Icon icon="lucide:message-circle" />,
  },
  {
    id: "3",
    title: "Crew training schedule",
    subtitle: "Due date: February 1, 2025",
    icon: <Icon icon="lucide:file" />,
  },
  {
    id: "4",
    title: "Fuel consumption analysis",
    subtitle: "Last reviewed 3 days ago",
    icon: <Icon icon="lucide:file-lock" />,
  },
  {
    id: "5",
    title: "Weather routing optimization",
    subtitle: "Active route to Singapore",
    icon: <Icon icon="lucide:file-lock" />,
  },
];

const SearchModalWrapper = (args: any) => {
  const [open, setOpen] = useState(true);
  const [items, setItems] = useState(mockItems);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleSearch = (query: string) => {
    setLoading(true);
    setTimeout(() => {
      const filtered = mockItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle?.toLowerCase().includes(query.toLowerCase()),
      );
      setItems(filtered);
      setLoading(false);
    }, 300);
  };

  const handleSelect = (item: SearchItem) => {
    console.log("Selected item:", item);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Open Search
      </button>
      <SearchModal
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        items={items}
        loading={loading}
        onSearch={handleSearch}
        onSelect={handleSelect}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />
    </>
  );
};

export const Default: Story = {
  render: (args) => <SearchModalWrapper {...args} />,
  args: {
    placeholder: "Search reports, chats, or issues…",
    recentlyViewedLabel: "Recently viewed",
    noResultsText: "No results found.",
  },
};

export const WithFilters: Story = {
  render: (args) => <SearchModalWrapper {...args} />,
  args: {
    placeholder: "Search reports, chats, or issues…",
    filterOptions: ["All", "Chats", "Issues", "Resolved"],
    recentlyViewedLabel: "Recently viewed",
    noResultsText: "No results found.",
  },
};

export const Loading: Story = {
  args: {
    open: true,
    loading: true,
    onClose: () => console.log("Closed"),
  },
};

export const Empty: Story = {
  args: {
    open: true,
    items: [],
    onClose: () => console.log("Closed"),
    placeholder: "Search for something...",
    noResultsText: "No items found. Try a different search.",
  },
};
