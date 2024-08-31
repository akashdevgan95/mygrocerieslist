"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const createNewGroceryList = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/grocery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      const data = await response.json();
      const listId = data.resp;
  
      router.push(`/${listId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="border border-gray-300 rounded-md p-4">
        <button 
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          onClick={createNewGroceryList}
          >
            {isLoading ? 'Creating...' : 'Create New Grocery List'}
          </button>
      </div>
    </main>
  );
}
