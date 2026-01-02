import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Popup from './Popup';

function Table({ data, columns, serverSearchTerm, clientSearchTerm, onServerSearchChange, onClientSearchChange, totalData, serverDataCount, isLoading }) {
    const navigate = useNavigate();
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const handleRowClick = (id) => {
        navigate(`/detail/${id}`);
    };

    const handleEditClick = (rowData) => {
        setEditData(rowData);
        setEditModalOpen(true);
    };

    const handleSave = async () => {
    try {
        const response = await fetch(`http://localhost/pweb/pta-25-26/be/update.php/${editData.id}`, {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nama: editData.nama,
                npm: editData.npm,
                kelas: editData.kelas
            }),
        });

        const result = await response.json();

        if (response.ok && result.status === 'success') {
            console.log('Data updated successfully:', result.message);
            setEditModalOpen(false);
            window.location.reload(); 
        } else {
            console.error('Failed to update data:', result.message);
            alert('Gagal update: ' + (result.message || 'Terjadi kesalahan'));
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

    const handleCancel = () => {
        setEditModalOpen(false);
        setEditData(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id); // Simpan ID yang dipilih
        setDeleteModalOpen(true); // Buka modal
    };

    const confirmDelete = async () => {
        try {
            // Mengirim request DELETE dengan ID di akhir URL sesuai logic delete.php
            const response = await fetch(`http://localhost/pweb/pta-25-26/be/delete.php/${deleteId}`, {
                method: 'DELETE',
            });

            const result = await response.json();

            if (response.ok && result.status === 'success') {
                setDeleteModalOpen(false);
                window.location.reload(); // Refresh untuk melihat perubahan
            } else {
                alert("Gagal menghapus: " + result.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="pt-4 px-2 sm:px-4 md:px-6 lg:px-10 pb-4 sm:pb-6 md:pb-8 lg:pb-10 bg-[#f0f2e8]">
            <h3 className="text-xl sm:text-2xl md:text-3xl text-[#2e4034] font-serif mb-3 sm:mb-4 text-center px-2">Data Mahasiswa</h3>
            
            {/* Server-Side Search Bar */}
            <div className="mb-4 sm:mb-6 px-2">
                <div className="max-w-md mx-auto">
                    <label className="block text-xs sm:text-sm text-[#4c6a58] mb-2 font-semibold text-center">
                        Pencarian dari Database (Server-Side)
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Masukkan Nama, NPM, Kelas, atau ID untuk mencari di database..."
                            value={serverSearchTerm || ''}
                            onChange={onServerSearchChange}
                            disabled={isLoading}
                            className="w-full p-2 sm:p-3 pl-10 sm:pl-12 md:pl-14 lg:pl-16 pr-4 border-2 border-[#9b7653] rounded-lg focus:border-[#4c6a58] focus:ring-2 focus:ring-[#4c6a58] transition duration-300 text-sm sm:text-base bg-white text-[#2e4034] placeholder:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                        {isLoading ? (
                            <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2">
                                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-[#4c6a58] border-t-transparent"></div>
                            </div>
                        ) : (
                            <svg 
                                className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#4c6a58] pointer-events-none" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        )}
                    </div>
                    {serverSearchTerm && (
                        <p className="text-xs sm:text-sm text-[#4c6a58] mt-2 text-center">
                            Ditemukan {serverDataCount} hasil dari database
                        </p>
                    )}
                    {!serverSearchTerm && totalData > 0 && (
                        <p className="text-xs sm:text-sm text-[#4c6a58] mt-2 text-center">
                            Menampilkan semua {totalData} data
                        </p>
                    )}
                </div>
            </div>

            {/* Client-Side Search Bar (muncul setelah ada data dari server) */}
            {serverDataCount > 0 && (
                <div className="mb-4 sm:mb-6 px-2">
                    <div className="max-w-md mx-auto">
                        <label className="block text-xs sm:text-sm text-[#4c6a58] mb-2 font-semibold text-center">
                            Filter Hasil (Client-Side)
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Filter hasil yang sudah ditampilkan..."
                                value={clientSearchTerm || ''}
                                onChange={onClientSearchChange}
                                className="w-full p-2 sm:p-3 pl-10 sm:pl-12 md:pl-14 lg:pl-16 pr-4 border-2 border-[#7b5c40] rounded-lg focus:border-[#4c6a58] focus:ring-2 focus:ring-[#4c6a58] transition duration-300 text-sm sm:text-base bg-white text-[#2e4034] placeholder:text-gray-400"
                            />
                            <svg 
                                className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#7b5c40] pointer-events-none" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                        </div>
                        {clientSearchTerm && (
                            <p className="text-xs sm:text-sm text-[#4c6a58] mt-2 text-center">
                                Menampilkan {data.length} dari {serverDataCount} hasil
                            </p>
                        )}
                    </div>
                </div>
            )}

            <div className="overflow-x-auto -mx-2 sm:mx-0">
                <table className="w-full border-collapse border-2 sm:border-4 border-[#9b7653] shadow-lg min-w-[600px]">
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index} className="border border-[#9b7653] px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left bg-[#2e4034] text-white font-serif uppercase tracking-wider text-xs sm:text-sm md:text-base">
                                    {column}
                                </th>
                            ))}
                            <th className="border border-[#9b7653] px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left bg-[#2e4034] text-white font-serif uppercase tracking-wider text-xs sm:text-sm md:text-base">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((data, index) => (
                            <tr 
                                key={index}
                                onClick={() => handleRowClick(data.id)}
                                className="odd:bg-white even:bg-[#e6e8e0] transition duration-300 cursor-pointer hover:bg-[#c4d6a6]"
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c4d6a6'} // Warna daun saat hover
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'rgb(255, 255, 255)' : '#e6e8e0'}>
                                    <td className="border border-[#d1c1ad] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-left text-[#4c6a58] text-xs sm:text-sm md:text-base">
                                        {index + 1}
                                    </td>
                                    <td className="border border-[#d1c1ad] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-left text-[#4c6a58] text-xs sm:text-sm md:text-base">
                                        {data.id}
                                    </td>
                                    <td className="border border-[#d1c1ad] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-left text-[#4c6a58] text-xs sm:text-sm md:text-base">
                                        {data.nama}
                                    </td>
                                    <td className="border border-[#d1c1ad] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-left text-[#4c6a58] text-xs sm:text-sm md:text-base">
                                        {data.npm}
                                    </td>
                                    <td className="border border-[#d1c1ad] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-left text-[#4c6a58] text-xs sm:text-sm md:text-base">
                                        {data.kelas}
                                    </td>
                                    <td className="border border-[#d1c1ad] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-left text-[#4c6a58] text-xs sm:text-sm md:text-base">
                                        <button 
                                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditClick(data);
                                            }}>
                                            Edit
                                        </button>
                                        <button 
                                            className="bg-red-500 text-white px-2 py-1 ml-2 rounded hover:bg-red-600 transition duration-300"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteClick(data.id);
                                            }}>
                                            Delete
                                        </button>
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isEditModalOpen && (
                <Popup isOpen={isEditModalOpen} onClose={handleCancel}>
                    <h2 className="text-lg font-semibold mb-4">Edit Data</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Nama:</label>
                        <input
                            type="text"
                            name="nama"
                            value={editData.nama || ''}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">NPM:</label>
                        <input
                            type="text"
                            name="npm"
                            value={editData.npm || ''}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Kelas:</label>
                        <input
                            type="text"
                            name="kelas"
                            value={editData.kelas || ''}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                            onClick={handleCancel}>
                            Cancel
                        </button>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded"
                            onClick={handleSave}>
                            Save
                        </button>
                    </div>
                </Popup>
            )}

            {isDeleteModalOpen && (
                <Popup isOpen={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
                    <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
                    <p className="mb-4">Apakah Anda yakin ingin menghapus data dengan ID {deleteId}?</p>
                    <div className="flex justify-end">
                        <button
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                            onClick={() => setDeleteModalOpen(false)}>
                            Cancel
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded"
                            onClick={confirmDelete}>
                            Delete
                        </button>
                    </div>
                </Popup>
            )}
        </div>
    );
}

// Menambahkan PropTypes untuk validasi
Table.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    serverSearchTerm: PropTypes.string,
    clientSearchTerm: PropTypes.string,
    onServerSearchChange: PropTypes.func,
    onClientSearchChange: PropTypes.func,
    totalData: PropTypes.number,
    serverDataCount: PropTypes.number,
    isLoading: PropTypes.bool,
};

export default Table;
