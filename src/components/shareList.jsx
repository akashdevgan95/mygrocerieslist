"use client";

import React from "react";
import { Share2 } from "lucide-react";

const shareList = ({ listId }) => {
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
    <div className="flex items-center justify-center mt-5 client">
      <button
        onClick={handleShareList}
        className="bg-black text-white px-4 py-2 rounded-md w-full flex items-center justify-center"
      >
        <Share2 className="mr-2" size={16} /> Share List
      </button>
    </div>
  );
};

export default shareList;
