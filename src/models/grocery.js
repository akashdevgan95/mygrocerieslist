import mongoose from "mongoose";
// schema will contain
const grocerySchema = new mongoose.Schema({
    listId: {
        type: String,
        required: true,
    },
    items: {
        type: Array,
        required: true,
    },
});

const Grocery = mongoose.models.Grocery || mongoose.model("Grocery", grocerySchema);

export default Grocery;
