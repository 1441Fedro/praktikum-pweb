import MainLayout from '../layouts/MainLayout'; // Sesuaikan path jika MainLayout berada di folder lain

function Home() {
    return (
        // Membungkus konten dengan MainLayout
        <MainLayout>
            <div className="p-4 sm:p-6 text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-[#2e4034] font-serif px-2">Welcome to the Forest Path</h1>
                <p className="text-base sm:text-lg text-[#4c6a58] px-2">Explore the content of our amazing wilderness website.</p>
                {/* Anda dapat menambahkan komponen Header atau MainContent di sini jika diinginkan */}
            </div>
        </MainLayout>
    );
}

export default Home;