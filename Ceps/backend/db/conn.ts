import mongoose from "mongoose";

async function main() {
    await mongoose.connect('mongodb://0.0.0.0:27017/cep')
} 

main().catch((err) => console.log(err));

export default mongoose;