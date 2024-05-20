import Footer from "../../components/Footer"
import Header from "../../components/Header"
import './Divulgation.css'

function Divulgation() {
    return (
        <>
         <Header/>
                <section className='container'>
                    <div className='apresentação'>
                        <p>
                            para quebrar<br/>linha
                            <span> colorindo </span>
                        </p>
                        <button className='btn'> Edital </button>
                    </div>
                    <figure>
                        <img className='img-edraV' src='/edraV.svg' alt='logo edraV' />
                    </figure>
                </section>
            
            <Footer />
        </>
    )
}

export default Divulgation
