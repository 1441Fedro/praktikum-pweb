import { useState } from 'react';
import Table from '../components/Table';
import axios from 'axios';
import MainLayout from '../layouts/MainLayout';

function Daftar() {
    const [serverData, setServerData] = useState([]);
    const [serverSearchTerm, setServerSearchTerm] = useState('');
    const [clientSearchTerm, setClientSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [totalData, setTotalData] = useState(0);
    const [hasSearched, setHasSearched] = useState(false); // Melacak apakah user sudah klik search
    // const [filteredData, setFilteredData] = useState([]);

    const columns = ['No', 'ID', 'Nama', 'NPM', 'Kelas'];

    // --- PERBAIKAN 1: Pindahkan Fetch ke Fungsi Manual (Bukan Effect) ---
    const fetchData = () => {
    setIsLoading(true);
    const searchQuery = serverSearchTerm.trim();
    
    // Pastikan URL mengarah ke search.php
    const url = `http://localhost/pweb/pta-25-26/be/search.php?q=${encodeURIComponent(searchQuery)}`;

    axios.get(url)
        .then(response => {
            if (response.data && response.data.status === 'Success') {
                setServerData(response.data.data);
                // setFilteredData(response.data.data);
                setTotalData(response.data.data.length);
            }
            setIsLoading(false);
            // Tambahkan state untuk menandai pencarian sudah dilakukan
            setHasSearched(true); 
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        });
};

    // --- PERBAIKAN 2: Gunakan Derived State (Hapus useEffect filteredData) ---
    // Variabel ini akan dihitung ulang setiap kali serverData atau clientSearchTerm berubah
    const filteredData = clientSearchTerm === '' 
        ? serverData 
        : serverData.filter(item => {
            const searchLower = clientSearchTerm.toLowerCase();
            return (
                item.nama?.toLowerCase().includes(searchLower) ||
                item.npm?.toLowerCase().includes(searchLower) ||
                item.kelas?.toLowerCase().includes(searchLower) ||
                item.id?.toString().includes(clientSearchTerm)
            );
        });

    const handleServerSearchChange = (e) => {
        setServerSearchTerm(e.target.value);
        setClientSearchTerm('');
    };

    return (
        <MainLayout>
            <div className="pt-2 px-2 sm:px-4 md:px-6 pb-4 sm:pb-6">
                <Table 
                    data={filteredData} 
                    columns={columns} 
                    serverSearchTerm={serverSearchTerm}
                    clientSearchTerm={clientSearchTerm}
                    onServerSearchChange={handleServerSearchChange}
                    onClientSearchChange={(e) => setClientSearchTerm(e.target.value)}
                    onSearchClick={fetchData} // Trigger fetch saat tombol diklik
                    totalData={totalData}
                    serverDataCount={serverData.length}
                    isLoading={isLoading}
                    hasSearched={hasSearched}
                />
            </div>
        </MainLayout>
    );
}

export default Daftar;