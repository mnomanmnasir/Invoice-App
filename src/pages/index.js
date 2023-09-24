import Link from "next/link"
import { useRouter } from "next/router"
import { MongoClient } from 'mongodb'



export default function Home(props) {

  const router = useRouter();
  const navigatePages = () => router.push('/add-new')

  const { data } = props;

  return (
    <>
      <div className="main_container">
        <div className="invoice_header">
          <div className="invoice_header-logo">
            <h3>Invoices</h3>
            <p>There are total {data.length} invoices</p>
          </div>
          <button className="btn" onClick={navigatePages}>
            Add new
          </button>
        </div>
        <div className="invoice_container">

          {
            data?.map(invoice => (
              <Link href={`/invoices/${invoice.id}`} passRef key={invoice.id} >
                <div className="invoice_item">
                  <div className="invoice_id">
                    {invoice.id.substr(0, 6).toUpperCase()}
                  </div>
                  <div className="invoice_client">
                    {invoice.clientName}
                  </div>
                  <div className="invoice_created">
                    {invoice.createdAt}
                  </div>
                  <div className="invoice_total">
                    ${invoice.total}
                  </div>
                  <div>
                    <button className={`${invoice.status === 'paid'
                      ? 'paid_status'
                      : invoice.status === 'pending'
                        ? 'pending_status' : 'draft_status'}`}>{invoice.status}</button>
                  </div>
                </div>

              </Link>
            ))
          }

        </div>
      </div>
    </>
  )
}


export async function getStaticProps() {
  const client = await MongoClient.connect("mongodb+srv://noman20:cTLswRDdUebTqgPM@cluster0.jucwity.mongodb.net/invoice?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );

  const db = client.db();
  const collection = db.collection('allInvoices')
  const invoices = await collection.find({}).toArray()

  return {

    props: {
      data: invoices.map(invoice => {
        return {
          id: invoice._id.toString(),
          clientName: invoice.clientName,
          createdAt: invoice.createdAt,
          total: invoice.total,
          status: invoice.status
        }
      })

    },
    revalidate: 1
  }
}