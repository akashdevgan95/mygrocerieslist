"use client";

import { Trash, Check, CircleX } from "lucide-react";

//utils
import { sortItems } from "../utils/helpers";

const ListItem = ({ itemDetails, listId, items, setGroceryList }) => {
  const { name, id } = itemDetails;

  const updateItem = async (items) => {
    const response = await fetch(
      `/api/grocery`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listId,
          items,
        }),
      }
    );

    const data = await response.json();
    const sortedItems = sortItems(data.resp.items);
    setGroceryList({ ...data.resp, items: sortedItems });
  };

  const handleDeleteItem = async () => {
    const updatedItems = items.filter((item) => item.id !== id);
    await updateItem(updatedItems);
  };

  const handleCheckItem = async () => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, isPurchased: !item.isPurchased } : item
    );
    await updateItem(updatedItems);
  };
  

  return (
    <div
      className={`flex items-center justify-between border border-gray-300 py-2 px-4 rounded-md mb-4 ${
        itemDetails.isPurchased ? "bg-gray-100" : ""
      }`}
    >
      <h2
        className={`text-lg font-medium ${
          itemDetails.isPurchased ? "line-through text-gray-500" : ""
        }`}
      >
        {name}
      </h2>
      <div className="flex items-center justify-between gap-5">
        <button
          onClick={handleCheckItem}
          className={`text-black transition-all duration-300 hover:text-green-500 ${
            itemDetails.isPurchased ? "text-green-500" : ""
          }`}
        >
          {itemDetails.isPurchased ? (
            <CircleX size={18} />
          ) : (
            <Check size={18} />
          )}
        </button>
        <button
          onClick={handleDeleteItem}
          className=" text-black transition-all duration-300 hover:text-red-500"
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
};

export default ListItem;
