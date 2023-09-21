import Link from "next/link"

import { useRouter } from "next/router"


export default function Home() {


  const router = useRouter();
  const navigatePages = () => router.push('/add-new')

  return (
    <>
      <div className="main_container">
        <div className="invoice_header">
          <div className="invoice_header-logo">
            <h3>Invoices</h3>
            <p>There are total 7 invoices</p>
          </div>
          <button className="btn" onClick={navigatePages}>
            Add new
          </button>
        </div>
        <div className="invoice_container">
          <Link href={`/invoices/id`}>
            <div className="invoice_item">
              <div className="invoice_id">
                RT59F0
              </div>
              <div className="invoice_client">
                Noman Nasir
              </div>
              <div className="invoice_created">
                25/09/2023
              </div>
              <div className="invoice_total">
                $590
              </div>
              <div>
                <button className="pending_status">Pending</button>
              </div>
            </div>

          </Link>
        </div>
      </div>
    </>
  )
}
