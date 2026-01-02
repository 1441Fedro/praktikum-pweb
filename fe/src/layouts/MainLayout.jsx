import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';

/**
 * MainLayout Component
 * Digunakan sebagai wrapper untuk semua halaman.
 * Menerapkan Sticky Footer (Footer selalu di bawah).
 * * @param {object} props - Properti komponen.
 * @param {React.ReactNode} props.children - Konten halaman yang akan ditempatkan di antara Navbar dan Footer.
 */
function MainLayout({ children }) {
    return (
        // Menggunakan Flexbox (flex flex-col) dan min-h-screen untuk Sticky Footer
        <div className="flex flex-col min-h-screen font-sans bg-[#f0f2e8]">
            
            {/* 1. Navbar (fixed top) dan header */}
            <Navbar />
            <Header />

            {/* 2. Main Content (Wrapper) */}
            {/* flex-grow memastikan konten ini mengambil semua ruang yang tersisa, 
                mendorong Footer ke bawah. */}
            <main className="grow"> 
                {children}
            </main>

            {/* 3. Footer */}
            <Footer />
        </div>
    );
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainLayout;