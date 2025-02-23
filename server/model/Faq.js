import mongoose from 'mongoose'

const faqSchema = new mongoose.Schema({
    id: Number ,
    question: String,
    answer: String,
    embedding: [Number] // Store Sentence-BERT embeddings
});
const FAQ = mongoose.model("FAQ", faqSchema);
export default FAQ;
