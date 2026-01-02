import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Popup from './Popup';

function Table({ 
    data, columns, serverSearchTerm, clientSearchTerm, 
    onServerSearchChange, onClientSearchChange, 
    onSearchClick, totalData, serverDataCount, 
    isLoading, hasSearched }) 
    {
    
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
            
            {/* Server-Side Search Bar dengan Tombol Search */}
            <div className="mb-6 px-2">
                <div className="max-w-md mx-auto">
                    <div className="flex gap-2"> {/* Menambahkan Flex untuk tombol */}
                        <div className="relative grow">
                            <input
                                type="text"
                                placeholder="Cari di database (Nama, NPM, ID)..."
                                value={serverSearchTerm || ''}
                                onChange={onServerSearchChange}
                                className="w-full p-2 pl-10 border-2 border-[#9b7653] rounded-lg focus:border-[#4c6a58] transition duration-300"
                            />
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4c6a58]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <button 
                            onClick={onSearchClick}
                            disabled={isLoading}
                            className="bg-[#2e4034] text-white px-4 py-2 rounded-lg hover:bg-[#4c6a58] transition duration-300 disabled:bg-gray-400"
                        >
                            {isLoading ? '...' : 'Search'}
                        </button>
                    </div>
                </div>
            </div>

            {/* KONDISI 1: Belum Melakukan Pencarian */}
            {!hasSearched ? (
                <div className="text-center py-10 text-[#4c6a58] italic bg-white rounded-lg border-2 border-dashed border-[#9b7653]">
                    Silakan masukkan kata kunci dan klik tombol Search untuk menampilkan data.
                </div>
            ) : isLoading ? (
                /* KONDISI 2: Sedang Loading */
                <div className="text-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2e4034] mx-auto"></div>
                    <p className="mt-2 text-[#4c6a58]">Mengambil data...</p>
                </div>
            ) : (
                /* KONDISI 3: Hasil Pencarian Muncul */
                <>
                    {/* Client-Side Filter hanya muncul jika ada data */}
                    {serverDataCount > 0 && (
                        <div className="mb-4 max-w-md mx-auto">
                            <input
                                type="text"
                                placeholder="Filter hasil yang tampil..."
                                value={clientSearchTerm || ''}
                                onChange={onClientSearchChange}
                                className="w-full p-2 border-2 border-[#7b5c40] rounded-lg text-sm"
                            />
                        </div>
                    )}

                    <div className="overflow-x-auto">
                        <p className="text-sm text-center mb-2">
                            Total data ditemukan: {totalData}
                        </p>
                        {data.length > 0 ? (
                            <table className="w-full border-collapse border-4 border-[#9b7653] shadow-lg">
                                {/* ... <thead> dan <tbody> Anda sudah benar ... */}
                                <thead>
                                    <tr>
                                        {columns.map((col, i) => <th key={i} className="border border-[#9b7653] p-2 bg-[#2e4034] text-white">{col}</th>)}
                                        <th className="border border-[#9b7653] p-2 bg-[#2e4034] text-white">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index} className="bg-white hover:bg-[#c4d6a6] cursor-pointer" onClick={() => handleRowClick(item.id)}>
                                            <td className="border p-2">{index + 1}</td>
                                            <td className="border p-2">{item.id}</td>
                                            <td className="border p-2">{item.nama}</td>
                                            <td className="border p-2">{item.npm}</td>
                                            <td className="border p-2">{item.kelas}</td>
                                            <td className="border p-2" onClick={(e) => e.stopPropagation()}>
                                                <button onClick={() => handleEditClick(item)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                                <button onClick={() => handleDeleteClick(item.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center py-10 bg-white border-2 border-[#9b7653]">
                                Data tidak ditemukan.
                            </div>
                        )}
                    </div>
                </>
            )}

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
};

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
