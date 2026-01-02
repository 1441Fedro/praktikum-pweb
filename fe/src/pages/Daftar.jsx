import { useEffect, useState, useRef } from 'react';
import Table from '../components/Table';
import axios from 'axios';
import MainLayout from '../layouts/MainLayout'; // Sesuaikan path

function Daftar() {
    const [serverData, setServerData] = useState([]); // Data dari server-side search
    const [filteredData, setFilteredData] = useState([]); // Data setelah client-side filtering
    const [serverSearchTerm, setServerSearchTerm] = useState(''); // Search term untuk server-side
    const [clientSearchTerm, setClientSearchTerm] = useState(''); // Search term untuk client-side
    const [isLoading, setIsLoading] = useState(false);
    const [totalData, setTotalData] = useState(0); // Total data sebelum server-side search
    const columns = ['No', 'ID', 'Nama', 'NPM', 'Kelas'];
    const debounceTimer = useRef(null);

    // Server-side search dengan debounce
    useEffect(() => {
        // Clear timer sebelumnya
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        setIsLoading(true);

        // Debounce: tunggu 500ms setelah user berhenti mengetik
        debounceTimer.current = setTimeout(() => {
            const searchQuery = serverSearchTerm.trim();
            const url = searchQuery 
                ? `http://localhost/pweb/pta-25-26/be/read_by_id.php?q=${encodeURIComponent(searchQuery)}`
                : 'http://localhost/pweb/pta-25-26/be/read.php';

            axios.get(url)
                .then(response => {
                    console.log('Server response:', response.data);
                    if (response.data && response.data.status === 'Success' && response.data.data) {
                        const data = Array.isArray(response.data.data) 
                            ? response.data.data 
                            : [response.data.data]; // Handle jika read_by_id.php return single object
                        
                        setServerData(data);
                        setFilteredData(data); // Set filteredData sama dengan serverData untuk client-side filtering
                        
                        // Simpan total data jika search kosong (untuk menampilkan total)
                        if (!searchQuery) {
                            setTotalData(data.length);
                        }
                    } else {
                        console.warn('Tidak ada data atau format response tidak valid:', response.data);
                        setServerData([]);
                        setFilteredData([]);
                    }
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                    setServerData([]);
                    setFilteredData([]);
                    setIsLoading(false);
                });
        }, 500); // Debounce 500ms

        // Cleanup function
        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, [serverSearchTerm]);

    // Client-side filtering (filter dari hasil server-side search)
    useEffect(() => {
        if (clientSearchTerm === '') {
            setFilteredData(serverData);
        } else {
            const filtered = serverData.filter(item => {
                const searchLower = clientSearchTerm.toLowerCase();
                return (
                    item.nama?.toLowerCase().includes(searchLower) ||
                    item.npm?.toLowerCase().includes(searchLower) ||
                    item.kelas?.toLowerCase().includes(searchLower) ||
                    item.id?.toString().includes(clientSearchTerm)
                );
            });
            setFilteredData(filtered);
        }
    }, [clientSearchTerm, serverData]);

    const handleServerSearchChange = (e) => {
        setServerSearchTerm(e.target.value);
        // Reset client search ketika server search berubah
        setClientSearchTerm('');
    };

    const handleClientSearchChange = (e) => {
        setClientSearchTerm(e.target.value);
    };

    return (
        // Membungkus konten dengan MainLayout
        <MainLayout>
            <div className="pt-2 px-2 sm:px-4 md:px-6 pb-4 sm:pb-6">
                {/* <h2 className="text-3xl font-bold mb-6 text-[#2e4034] font-serif text-center">Daftar Mahasiswa</h2> */}
                <Table 
                    data={filteredData} 
                    columns={columns} 
                    serverSearchTerm={serverSearchTerm}
                    clientSearchTerm={clientSearchTerm}
                    onServerSearchChange={handleServerSearchChange}
                    onClientSearchChange={handleClientSearchChange}
                    totalData={totalData}
                    serverDataCount={serverData.length}
                    isLoading={isLoading}
                />
            </div>
        </MainLayout>
    );
}

export default Daftar;