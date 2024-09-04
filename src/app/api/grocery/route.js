import connectMongo from "../../../config/db";
import Grocery from "../../../models/grocery";
import { NextResponse } from "next/server";

// create a new grocery list
export async function POST(req) {
    try {
        await connectMongo();
        let listId = Math.random().toString(36).substring(2, 15);
        let grocery = await Grocery.findOne({ listId });

        while (grocery) {
            listId = Math.random().toString(36).substring(2, 15);
            grocery = await Grocery.findOne({ listId });
        }

        const newGrocery = new Grocery({ listId, items: [] });
        console.log('newGrocery ', newGrocery);
        const result = await newGrocery.save();
        console.log('result ', result);
        return NextResponse.json({ resp: newGrocery.listId });
    } catch (error) {
        console.log('error ', error);
        return NextResponse.json({ error: error.message });
    }
}

// update a grocery list by listId
export async function PUT(req) {
    try {
        const { listId, items } = await req.json();
        await connectMongo();
        // check if listId exists
        const grocery = await Grocery.findOne({ listId });
        if (!grocery) {
            return NextResponse.json({ error: 'Grocery list not found' });
        }
        await Grocery.findOneAndUpdate({ listId }, { 
            items
        });

        const updatedGrocery = await Grocery.findOne({ listId });
        return NextResponse.json({ resp: updatedGrocery });
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}
