import { MongoClient, ObjectId } from 'mongodb'

async function handler(req, res) {

    const { invoiceId } = req.query;
    const client = await MongoClient.connect("mongodb+srv://noman20:cTLswRDdUebTqgPM@cluster0.jucwity.mongodb.net/invoice?retryWrites=true&w=majority",
        { useNewUrlParser: true }
    );

    const db = client.db();
    const collection = db.collection('allInvoices')
    if (req.method === 'PUT') {
        await collection.updateOne({ _id: new ObjectId(invoiceId) },
            {
                $set: {
                    status: 'paid'
                }
            })
        client.close()
    }
    // delete request
    if (req.method === 'DELETE') {
        await collection.deleteOne({ _id: new ObjectId(invoiceId) });
        res.status(200).json({ message: "Invoice deleted Successfully" })
        client.close();
    }
}

export default handler;