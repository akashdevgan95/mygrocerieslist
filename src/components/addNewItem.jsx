"use client";

import React from "react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

const AddNewItem = ({ listId, sortedItems }) => {
  const router = useRouter();
  const [newItem, setNewItem] = useState("");
  const handleAddItem = async () => {
    try {
      const response = await fetch(`/api/grocery`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listId: listId,
          isPurchased: false,
          items: [...sortedItems, { name: newItem, id: uuidv4() }],
        }),
      });
      const data = await response.json();
      router.refresh();
      setNewItem("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newItem.trim() !== "") {
      handleAddItem();
    }
  };
  return (
    <div className="flex items-center justify-between mb-5 w-full client">
      <input
        onKeyDown={handleKeyPress}
        type="text"
        placeholder="Add Item"
        className="border border-gray-300 rounded-md p-2 w-full"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button
        onClick={handleAddItem}
        className="bg-black ml-5 text-white px-4 py-2 rounded-md w-[50px] text-center"
      >
        <Plus size={20} className="inline-block" />
      </button>
    </div>
  );
};

export default AddNewItem;
