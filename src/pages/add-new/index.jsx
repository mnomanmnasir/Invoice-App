import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const addNew = () => {


    const router = useRouter();
    const [items, setItems] = useState([])

    const senderSheet = useRef('')
    const senderCity = useRef('')
    const senderPostalCode = useRef('')
    const senderCountry = useRef('')
    const clientName = useRef('')
    const clientEmail = useRef('')
    const clientStreet = useRef('')
    const clientCity = useRef('')
    const clientPostalCode = useRef('')
    const clientCountry = useRef('')
    const description = useRef('')
    const createdAt = useRef('')
    const paymentTerms = useRef('')

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

    // total amount of all product items
    const totalAmount = items.reduce((acc, curr) => (acc + curr.total), 0);

    // submit data to the database

    const createInvoice = async status => {
        try {
            const res = await fetch('/api/add-new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    senderSheet: senderSheet.current.value,
                    senderCity: senderCity.current.value,
                    senderPostalCode: senderPostalCode.current.value,
                    senderCountry: senderCountry.current.value,
                    clientName: clientName.current.value,
                    clientEmail: clientEmail.current.value,
                    clientStreet: clientStreet.current.value,
                    clientCity: clientStreet.current.value,
                    clientPostalCode: clientStreet.current.value,
                    clientCountry: clientStreet.current.value,
                    description: description.current.value,
                    createdAt: createdAt.current.value,
                    paymentDue: createdAt.current.value,
                    paymentTerms: paymentTerms.current.value,
                    status: status,
                    items: items,
                    total: totalAmount
                }),

            })
            const data = await res.json()
            toast.success(data.message)
            router.push('/')
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    return (
        <>
            <div className="main_container">
                <div className="new_invoice">
                    <div className="new_invoice-header">
                        <h3>New Invoice</h3>
                    </div>
                    {/*  ========== new invoice ============== */}
                    <div className="new_invoice-form">
                        <div className="bill_form">
                            <p className="bill_title">
                                Bill Form
                            </p>
                            <div className="form_group">
                                <p>Street Address</p>
                                <input type="text" ref={senderSheet} />
                            </div>
                            <div className="form_group inline_form-group">
                                <div className="form_group">
                                    <p>City</p>
                                    <input type="text" ref={senderCity} />
                                </div>
                                <div className="form_group">
                                    <p>Postal Code</p>
                                    <input type="text" ref={senderPostalCode} />
                                </div>
                                <div className="form_group">
                                    <p>Country</p>
                                    <input type="text" ref={senderCountry} />
                                </div>
                            </div>
                        </div>
                        <div className="bill_to">
                            <p className="bill_title">
                                Bill To
                            </p>
                            <div className="form_group">
                                <p>Client Name</p>
                                <input type="text" ref={clientName} />
                            </div>

                            <div className="form_group">
                                <p>Client Email</p>
                                <input type="email" ref={clientEmail} />
                            </div>
                            <div className="form_group">
                                <p>Street Address</p>
                                <input type="text" ref={clientStreet} />
                            </div>
                            <div className="form_group inline_form-group">
                                <div className="form_group">
                                    <p>City</p>
                                    <input type="text" ref={clientCity} />
                                </div>
                                <div className="form_group">
                                    <p>Postal Code</p>
                                    <input type="text" ref={clientPostalCode} />
                                </div>
                                <div className="form_group">
                                    <p>Country</p>
                                    <input type="text" ref={clientCountry} />
                                </div>
                            </div>
                            <div className="form_group inline_form-group">
                                <div className="inline_group">
                                    <p>Invoice Data</p>
                                    <input type="date" ref={createdAt} />
                                </div>
                                <div className="inline_group">
                                    <p>Payment Terms</p>
                                    <input type="text" ref={paymentTerms} />
                                </div>
                            </div>

                            <div className="form_group">
                                <p>Project Description</p>
                                <input type="text" ref={description} />
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

                        <div className="new_invoice-btns">
                            <button className="edit_btn" onClick={() => router.push('/')}>
                                Discard
                            </button>
                            <div>
                                <button className="draft_btn" onClick={() => createInvoice("draft")}>
                                    Save as draft
                                </button>
                                <button className="mark_as-btn" onClick={() => createInvoice("pending")}>
                                    Send & Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default addNew;