import Form from '../components/Form.jsx';
import MainLayout from '../layouts/MainLayout'; // Sesuaikan path

function Formulir() {
    return (
        // Membungkus konten dengan MainLayout
        <MainLayout>
            {/* Form sudah memiliki padding yang cukup dari layoutnya */}
            <Form />
        </MainLayout>
    );
}

export default Formulir;