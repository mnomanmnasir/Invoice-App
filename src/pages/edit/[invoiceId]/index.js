import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router';

const EditItem = () => {


    const router = useRouter();
    const [items, setItems] = useState([])

    // add product items
    const addItems = () => {
        setItems([...items, { name: '', quantity: 0, price: 0, total: 0 }])
    }

    // handle change
    const handleChange = (event, i) => {
        const { name, value } = event.target
        const list = [...items];
        list[i][name] = value;
        list[i]['total'] = list[i]['quantity'] * list[i]['price']
        setItems(list)
    }

    const deleteItem = (i) => {
        const inputData = [...items];
        inputData.splice(i, 1)
        setItems(inputData)
    }
    return (
        <>
            <div className="main_container">
                <div className="new_invoice">
                    <div className="new_invoice-header">
                        <h3>Edit #RT5840</h3>
                    </div>
                    {/*  ========== new invoice ============== */}
                    <div className="new_invoice-form">
                        <div className="bill_form">
                            <p className="bill_title">
                                Bill Form
                            </p>
                            <div className="form_group">
                                <p>Street Address</p>
                                <input type="text" />
                            </div>
                            <div className="form_group inline_form-group">
                                <div className="form_group">
                                    <p>City</p>
                                    <input type="text" />
                                </div>
                                <div className="form_group">
                                    <p>Postal Code</p>
                                    <input type="text" />
                                </div>
                                <div className="form_group">
                                    <p>Country</p>
                                    <input type="text" />
                                </div>
                            </div>
                        </div>
                        <div className="bill_to">
                            <p className="bill_title">
                                Bill To
                            </p>
                            <div className="form_group">
                                <p>Client Name</p>
                                <input type="text" />
                            </div>

                            <div className="form_group">
                                <p>Client Email</p>
                                <input type="email" />
                            </div>
                            <div className="form_group">
                                <p>Street Address</p>
                                <input type="text" />
                            </div>
                            <div className="form_group inline_form-group">
                                <div className="form_group">
                                    <p>City</p>
                                    <input type="text" />
                                </div>
                                <div className="form_group">
                                    <p>Postal Code</p>
                                    <input type="text" />
                                </div>
                                <div className="form_group">
                                    <p>Country</p>
                                    <input type="text" />
                                </div>
                            </div>
                            <div className="form_group inline_form-group">
                                <div className="inline_group">
                                    <p>Invoice Data</p>
                                    <input type="date" />
                                </div>
                                <div className="inline_group">
                                    <p>Payment Terms</p>
                                    <input type="text" />
                                </div>
                            </div>

                            <div className="form_group">
                                <p>Project Description</p>
                                <input type="text" />
                            </div>
                        </div>
                        {/* ========= invoice product items ========== */}

                        <div className="invoice_items">
                            <h3>Item List</h3>
                            {
                                items?.map((item, i) => (
                                    <div className='item' key={i}>
                                        <div className="form_group inline_form-group">
                                            <div>
                                                <p>Item Name</p>
                                                <input type="text" name='name' onChange={(e) => handleChange(e, i)} />
                                            </div>
                                            <div>
                                                <p>Qty</p>
                                                <input type="number" name='quantity' onChange={(e) => handleChange(e, i)} />
                                            </div>
                                            <div>
                                                <p>Price</p>
                                                <input type="number" name='price' onChange={(e) => handleChange(e, i)} />
                                            </div>
                                            <div>
                                                <p>Total</p>
                                                <h4>{item.total}</h4>
                                            </div>
                                            <button className='edit_btn' onClick={() => deleteItem(i)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <button className="add_item-btn" onClick={addItems}>
                            Add New Item
                        </button>
                        <div className="new_invoice-btns" style={{justifyContent: 'end'}}>
                            <div>
                                <button className="draft_btn" onClick={`/invoices/id`}>
                               Cancel
                                </button>
                                <button className="mark_as-btn">
                               Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditItem;