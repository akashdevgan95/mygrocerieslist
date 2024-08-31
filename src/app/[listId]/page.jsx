"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Plus, Share2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

//utils
import { sortItems } from "../../utils/helpers";

//component
import ListItem from "../../components/listItem";

export default function GroceryListPage() {
  const { listId } = useParams();
  const [groceryList, setGroceryList] = useState(null);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    const fetchGroceryList = async () => {
      try {
        const response = await fetch(`/api/grocery?listId=${listId}`);
        const data = await response.json();
        const sortedItems = sortItems(data.grocery.items);
        setGroceryList({ ...data.grocery, items: sortedItems });
      } catch (error) {
        console.error("Error fetching grocery list:", error);
      }
    };

    fetchGroceryList();
  }, [listId]);

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
          items: [...groceryList.items, { name: newItem, id: uuidv4() }],
        }),
      });
      const data = await response.json();
      const sortedItems = sortItems(data.resp.items);
      setGroceryList({ ...data.resp, items: sortedItems });
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

  const handleShareList = () => {
    const shareUrl = `${window.location.origin}/${listId}`;
    if (navigator?.share) {
      navigator.share({
        title: "My Groceries List",
        text: "Check out my groceries list",
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("List URL copied to clipboard");
    }
  };

  return (
    <main className="flex h-screen items-center justify-center w-[90%] mx-auto ">
      <div className="border border-gray-300 rounded-md  max-h-[80vh] overflow-y-auto">
        {/* when sticky add shadow */}
        <h1
          className={`text-3xl font-bold text-center sticky top-0 bg-white z-10 px-5 sm:px-10 py-8 ${
            groceryList?.items?.length > 0 ? "border-b border-gray-300" : ""
          }`}
        >
          My Groceries List
        </h1>
        {!groceryList ? (
          <p className="text-center text-gray-500 py-10 text-xl">Loading...</p>
        ) : (
          <div className="py-10 px-5 sm:px-10">
            <div className="flex items-center justify-between mb-5 w-full">
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
            <div>
              {groceryList.items.map((item) => (
                <ListItem
                  key={item.id}
                  itemDetails={item}
                  listId={listId}
                  items={groceryList.items}
                  setGroceryList={setGroceryList}
                />
              ))}
            </div>
            <div className="flex items-center justify-center">
              <button
                onClick={handleShareList}
                className="bg-black text-white px-4 py-2 rounded-md w-full mt-5 flex items-center justify-center"
              >
                <Share2 className="mr-2" size={16} /> Share List
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
