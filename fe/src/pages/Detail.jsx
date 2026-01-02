import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainLayout from '../layouts/MainLayout';

function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            // Menggunakan read_by_id.php dengan format URL path
            axios.get(`http://localhost/pweb/pta-25-26/be/read_by_id.php/${id}`)
                .then(response => {
                    console.log('Detail response:', response.data);
                    if (response.data && response.data.status === 'success' && response.data.data) {
                        setData(response.data.data);
                        setError(null);
                    } else {
                        setError(response.data?.message || 'Data tidak ditemukan');
                        setData(null);
                    }
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching detail:", error);
                    setError('Terjadi kesalahan saat mengambil data');
                    setData(null);
                    setIsLoading(false);
                });
        }
    }, [id]);

    const handleBack = () => {
        navigate('/daftar');
    };

    return (
        <MainLayout>
            <div className="pt-2 px-2 sm:px-4 md:px-6 pb-4 sm:pb-6">
                <div className="max-w-2xl mx-auto">
                    {/* Tombol Kembali */}
                    <button
                        onClick={handleBack}
                        className="mb-4 px-4 py-2 bg-[#7b5c40] text-white rounded-lg hover:bg-[#9b7653] transition duration-300 flex items-center gap-2 text-sm sm:text-base"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali ke Daftar Mahasiswa
                    </button>

                    {/* Loading State */}
                    {isLoading && (
                        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#4c6a58] border-t-transparent mx-auto mb-4"></div>
                            <p className="text-[#4c6a58]">Memuat data...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !isLoading && (
                        <div className="bg-white rounded-lg shadow-lg p-8 text-center border-2 border-red-300">
                            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-xl font-bold text-red-600 mb-2">Error</h3>
                            <p className="text-gray-600 mb-4">{error}</p>
                            <button
                                onClick={handleBack}
                                className="px-6 py-2 bg-[#7b5c40] text-white rounded-lg hover:bg-[#9b7653] transition duration-300"
                            >
                                Kembali
                            </button>
                        </div>
                    )}

                    {/* Data Display */}
                    {data && !isLoading && (
                        <div className="bg-white rounded-lg shadow-lg border-4 border-[#9b7653] overflow-hidden">
                            {/* Header */}
                            <div className="bg-[#2e4034] text-white p-4 sm:p-6">
                                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center">
                                    Detail Mahasiswa
                                </h2>
                            </div>

                            {/* Content */}
                            <div className="p-4 sm:p-6 md:p-8">
                                <div className="space-y-4 sm:space-y-6">
                                    {/* ID */}
                                    <div className="border-b-2 border-[#9b7653] pb-3">
                                        <label className="block text-xs sm:text-sm font-semibold text-[#4c6a58] mb-2 uppercase tracking-wider">
                                            ID
                                        </label>
                                        <p className="text-lg sm:text-xl text-[#2e4034] font-serif">
                                            {data.id}
                                        </p>
                                    </div>

                                    {/* Nama */}
                                    <div className="border-b-2 border-[#9b7653] pb-3">
                                        <label className="block text-xs sm:text-sm font-semibold text-[#4c6a58] mb-2 uppercase tracking-wider">
                                            Nama
                                        </label>
                                        <p className="text-lg sm:text-xl text-[#2e4034] font-serif">
                                            {data.nama}
                                        </p>
                                    </div>

                                    {/* NPM */}
                                    <div className="border-b-2 border-[#9b7653] pb-3">
                                        <label className="block text-xs sm:text-sm font-semibold text-[#4c6a58] mb-2 uppercase tracking-wider">
                                            NPM
                                        </label>
                                        <p className="text-lg sm:text-xl text-[#2e4034] font-serif">
                                            {data.npm}
                                        </p>
                                    </div>

                                    {/* Kelas */}
                                    <div className="border-b-2 border-[#9b7653] pb-3">
                                        <label className="block text-xs sm:text-sm font-semibold text-[#4c6a58] mb-2 uppercase tracking-wider">
                                            Kelas
                                        </label>
                                        <p className="text-lg sm:text-xl text-[#2e4034] font-serif">
                                            {data.kelas}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}

export default Detail;

