import { useState } from 'react';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const [currentPath] = useState(() => {
        // Mendapatkan path URL saat ini
        const path = window.location.pathname;
        
        // Membersihkan path
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;

        return cleanPath === '' ? 'dashboard' : cleanPath;
    });
    
    // Definisikan kelas dasar untuk tautan
    const baseClass = "font-medium no-underline transition duration-300 px-3 py-1 rounded block";
    
    // Definisikan kelas aktif (highlight)
    const activeClass = "bg-[#7b5c40] text-white shadow-md"; 
    
    // Definisikan kelas non-aktif
    const inactiveClass = "text-[#f0f2e8] hover:bg-[#43594e] hover:text-[#c4d6a6]";

    // Fungsi helper untuk menentukan kelas
    const getLinkClass = (linkName) => {
        return `${baseClass} ${currentPath === linkName ? activeClass : inactiveClass}`;
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="flex flex-col md:flex-row justify-between items-center p-2.5 bg-[#4c6a58] text-[#f0f2e8] w-full shadow-lg z-50 relative">
            <div className="flex justify-between items-center w-full md:w-auto">
                <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-wider ml-2 sm:ml-4">PWEB</h1>
                <button 
                    onClick={toggleMenu}
                    className="md:hidden text-[#f0f2e8] mr-2 sm:mr-4 focus:outline-none"
                    aria-label="Toggle menu">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>
            <ul className={`list-none flex flex-col md:flex-row gap-2 mr-2 sm:mr-4 w-full md:w-auto ${isMenuOpen ? 'block' : 'hidden md:flex'}`}>
                {/* PERBAIKAN: href="/" untuk navigasi ke root. Menggunakan 'dashboard' sebagai penanda aktif */}
                <li><a href="/" className={getLinkClass('dashboard')} onClick={() => setIsMenuOpen(false)}>Dashboard</a></li> 
                
                {/* Home menggunakan 'home' sebagai penanda aktif dan href="home" */}
                <li><a href="home" className={getLinkClass('home')} onClick={() => setIsMenuOpen(false)}>Home</a></li>
                
                {/* Daftar Mahasiswa menggunakan 'daftar' sebagai penanda aktif */}
                <li><a href="daftar" className={getLinkClass('daftar')} onClick={() => setIsMenuOpen(false)}>Daftar Mahasiswa</a></li>
                
                {/* Form Input menggunakan 'formulir' sebagai penanda aktif */}
                <li><a href="formulir" className={getLinkClass('formulir')} onClick={() => setIsMenuOpen(false)}>Form Input</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;