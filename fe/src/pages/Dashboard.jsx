import MainLayout from '../layouts/MainLayout';
import MainContent from '../components/MainContent';

function Dashboard() {
    return (
        // Membungkus konten dengan MainLayout
        <MainLayout>
            <MainContent></MainContent>
        </MainLayout>
    );
}

export default Dashboard;