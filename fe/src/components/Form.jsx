import { useState } from 'react';
import axios from 'axios';

function Form() {
    const [nama, setNama] = useState('');
    const [npm, setNpm] = useState('');
    const [kelas, setKelas] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nama", nama);
        formData.append("npm", npm);
        formData.append("kelas", kelas);

        try {
            await axios.post('http://localhost/pweb/pta-25-26/be/create.php', formData);
            setStatus('Data berhasil ditambah.');
            setNama('');
            setNpm('');
            setKelas('');
        } catch (error) {
            console.error('There was an error!', error);
            setStatus('Error sending message');
        }
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 text-center bg-[#f0f2e8]">
            <h3 className="text-xl sm:text-2xl md:text-3xl text-[#2e4034] font-serif mb-4 sm:mb-6 px-2">Form Input Mahasiswa</h3>
            <form onSubmit={handleSubmit} className="inline-block text-left p-4 sm:p-6 md:p-8 bg-white shadow-xl rounded-lg border-2 sm:border-4 border-[#9b7653] w-full max-w-md mx-auto">
                <div className="mb-4">
                    <label className="block text-[#2e4034] font-semibold text-sm sm:text-base">Nama:</label>
                    <input
                        type="text"
                        id="nama"
                        className="block mt-2 p-2 sm:p-3 w-full border-2 border-[#9b7653] focus:border-[#4c6a58] focus:ring-1 focus:ring-[#4c6a58] transition duration-300 text-sm sm:text-base"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        required/>
                </div>
                <div className="mb-4">
                    <label className="block text-[#2e4034] font-semibold text-sm sm:text-base">NPM:</label>
                    <input
                        type="text"
                        id="npm"
                        className="block mt-2 p-2 sm:p-3 w-full border-2 border-[#9b7653] focus:border-[#4c6a58] focus:ring-1 focus:ring-[#4c6a58] transition duration-300 text-sm sm:text-base"
                        value={npm}
                        onChange={(e) => setNpm(e.target.value)}
                        required/>
                </div>
                <div className="mb-4">
                    <label className="block text-[#2e4034] font-semibold text-sm sm:text-base">Kelas:</label>
                    <input
                        type="text"
                        id="kelas"
                        className="block mt-2 p-2 sm:p-3 w-full border-2 border-[#9b7653] focus:border-[#4c6a58] focus:ring-1 focus:ring-[#4c6a58] transition duration-300 text-sm sm:text-base"
                        value={kelas}
                        onChange={(e) => setKelas(e.target.value)}
                        required/>
                </div>
                <button
                    type="submit"
                    className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 mt-4 bg-[#9b7653] text-white border-none cursor-pointer hover:bg-[#7b5c40] transition duration-300 shadow-md text-sm sm:text-base">
                    Submit Data
                </button>
            </form>
        </div>
    );
}

export default Form;
