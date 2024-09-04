"use client";
import { useEffect } from "react";
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import { Trash, Check, CircleX } from "lucide-react";

import React from "react";

const ListItemAction = ({ itemDetails, listId, items, id }) => {

  const router = useRouter();
  const updateItem = async (items) => {
    const response = await fetch(`/api/grocery`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listId,
        items,
      }),
    });

    const data = await response.json();
    router.refresh();
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

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (e.key === "c") {
  //       const elements = document.querySelectorAll(".client");
  //       elements.forEach((element) => {
  //         element.style.border = "2px solid red";
  //       });
  //     } else if (e.key === "r") {
  //       const elements = document.querySelectorAll(".client");
  //       elements.forEach((element) => {
  //         element.style.border = "none";
  //       });
  //     }
  //   };
  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, []);

  return (
    <div className="flex items-center justify-between gap-5 client">
      <button
        onClick={handleCheckItem}
        className={`text-black transition-all duration-300 hover:text-green-500 ${
          itemDetails.isPurchased ? "text-green-500" : ""
        }`}
      >
        {itemDetails.isPurchased ? <CircleX size={18} /> : <Check size={18} />}
      </button>
      <button
        onClick={handleDeleteItem}
        className=" text-black transition-all duration-300 hover:text-red-500"
      >
        <Trash size={18} />
      </button>
    </div>
  );
};

export default ListItemAction;
