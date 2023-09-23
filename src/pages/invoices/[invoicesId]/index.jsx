import React from 'react'
import { useRouter } from 'next/router';


const InvoiceDetails = () => {

    const router = useRouter();
    return (
        <>
            <div className="main_container">
                <div className="back_btn">
                    <h6 onClick={() => router.push('/')}>Go Back</h6>
                </div>

                {/*  ========== invoice details header =============== */}
                <div className="invoice_details-header">
                    <div className="details_status">
                        <p>Status</p>
                        <button className='pending_status'>
                            Pending
                        </button>
                    </div>
                    <div className="details_btn">
                        <button className="edit_btn">
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
                            <h4>RT580G</h4>
                            <p>Re-branding</p>
                        </div>
                        <div>
                            <p>Gulshan B - 13D</p>
                            <p>Karachi</p>
                            <p>76500</p>
                            <p>Pakistan</p>

                        </div>
                    </div>
                    <div className="details_box">
                        <div>
                            <div className="invoice_created-date">
                                <p>Invoice date</p>
                                <h4>29-07-2023</h4>
                            </div>
                            <div>
                                <p className="invoice_payment">
                                    Payment Due
                                </p>
                                <h4>29-07-2023</h4>
                            </div>
                        </div>
                        <div className="invoice_client-address">
                            <p>Bill to</p>
                            <h4>Noman Nasir</h4>
                            <div>
                                <p>Gulshan B - 13D</p>
                                <p>Karachi</p>
                                <p>76500</p>
                                <p>Pakistan</p>
                            </div>
                        </div>
                        <div>
                            <p>Send to</p>
                            <h4>m.noman.m.nasir@gmail.com</h4>
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

                            <li className="list_item">
                                <div className="item_name-box">
                                    <h5>travel Booking Website</h5>
                                </div>
                                <div className="list_item-box"><p>2</p></div>
                                <div className="list_item-box"><p>$225</p></div>
                                <div className="list_item-box"><h5>$450</h5></div>
                            </li>
                        </ul>
                    </div>
                    <div className="grand_total">
                        <h5>Grand Total</h5>
                        <h2>$450</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InvoiceDetails;