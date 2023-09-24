import React from 'react'
import { useRouter } from 'next/router';
import { MongoClient, ObjectId } from 'mongodb'

const InvoiceDetails = (props) => {

    const router = useRouter();

    const { data } = props;

    // Handle navigation back to the home page
    const navigateToHomePage = () => {
        router.push('/');
    };

    return (
        <>
            <div className="main_container">
                <div className="back_btn">
                    <button className="btn" onClick={navigateToHomePage}>
                        Go Back
                    </button>
                </div>

                {/*  ========== invoice details header =============== */}
                <div className="invoice_details-header">
                    <div className="details_status">
                        <p>Status</p>
                        <button className='pending_status'>
                            {data.status}
                        </button>
                    </div>
                    <div className="details_btn">
                        <button className="edit_btn" onClick={() => router.push(`/edit/${data.id}`)}>
                            Edit
                        </button>
                        <button className="delete_btn">
                            Delete
                        </button>
                        <button className="mark_as-btn">
                            Mark as Paid
                        </button>
                    </div>
                </div>

                {/*  ========== invoice details ================ */}
                <div className="invoice_details">
                    <div className="details_box">
                        <div>
                            <h4>{data.id.substr(0, 6).toUpperCase()}</h4>
                            <p>{data.description}</p>
                        </div>
                        <div>
                            <p>{data.senderAddress.street}</p>
                            <p>{data.senderAddress.city}</p>
                            <p>{data.senderAddress.postalCode}</p>
                            <p>{data.senderAddress.country}</p>

                        </div>
                    </div>
                    <div className="details_box">
                        <div>
                            <div className="invoice_created-date">
                                <p>Invoice date</p>
                                <h4>{data.createdAt}</h4>
                            </div>
                            <div>
                                <p className="invoice_payment">
                                    Payment Due
                                </p>
                                <h4>{data.paymentDue}</h4>
                            </div>
                        </div>
                        <div className="invoice_client-address">
                            <p>Bill to</p>
                            <h4>{data.clientName}</h4>
                            <div>
                                <p>{data.clientAddress.street}</p>
                                <p>{data.clientAddress.city}</p>
                                <p>{data.clientAddress.postalCode}</p>
                                <p>{data.clientAddress.country}</p>
                            </div>
                        </div>
                        <div>
                            <p>Send to</p>
                            <h4>{data.clientEmail}</h4>
                        </div>

                    </div>

                    {/*  ======== invoice items */}
                    <div className="invoice_item-box">
                        <ul className="list">
                            <li className="list_item">
                                <p className="item_name-box">Item Name</p>
                                <p className="list_item-box">Qty</p>
                                <p className="list_item-box">Price</p>
                                <p className="list_item-box">Total</p>
                            </li>

                            {
                                data.items?.map((item, index) => (
                                    <li className="list_item" key={index}>
                                        <div className="item_name-box">
                                            <h5>{item.name}</h5>
                                        </div>
                                        <div className="list_item-box"><p>{item.quantity}</p></div>
                                        <div className="list_item-box"><p>${item.price}</p></div>
                                        <div className="list_item-box"><h5>${item.total}</h5></div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="grand_total">
                        <h5>Grand Total</h5>
                        <h2>${data.total}</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InvoiceDetails;


export async function getStaticPaths() {
    const client = await MongoClient.connect("mongodb+srv://noman20:cTLswRDdUebTqgPM@cluster0.jucwity.mongodb.net/invoice?retryWrites=true&w=majority",
        { useNewUrlParser: true }
    );

    const db = client.db();
    const collection = db.collection('allInvoices')
    const invoices = await collection.find({}, { _id: 1 }).toArray()


    return {
        fallback: 'blocking',
        paths: invoices.map(invoice => ({
            params: {
                invoiceId: invoice._id.toString()
            }
        }))
    }
}

export async function getStaticProps(context) {

    const { invoiceId } = context.params;
    const client = await MongoClient.connect("mongodb+srv://noman20:cTLswRDdUebTqgPM@cluster0.jucwity.mongodb.net/invoice?retryWrites=true&w=majority",
        { useNewUrlParser: true }
    );

    const db = client.db();
    const collection = db.collection('allInvoices')
    const invoice = await collection.findOne({ _id: new ObjectId(invoiceId) })

    return {
        props: {
            data: {
                id: invoice._id.toString(),
                senderAddress: invoice.senderAddress,
                clientAddress: invoice.clientAddress,
                clientName: invoice.clientName,
                clientEmail: invoice.clientEmail,
                description: invoice.description,
                createdAt: invoice.createdAt,
                paymentDue: invoice.paymentDue,
                items: invoice.items,
                total: invoice.total,
                status: invoice.status
            }
        },
        revalidate: 1
    }
} 