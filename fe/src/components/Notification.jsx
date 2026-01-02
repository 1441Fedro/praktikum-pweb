import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Notification({ message, isError }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
            // Memperbarui halaman setelah pesan muncul selama 2 detik
            window.location.reload();
        }, 2000);
        }
    }, [message]);

    // Warna: Hijau Hutan untuk sukses, Merah Tanah untuk error
    const notificationClass = isError ? "bg-[#b33939] shadow-xl" : "bg-[#2e4034] shadow-xl";

    return (
        <div>
        {isVisible && (
            <div
            className={`text-white z-50 fixed top-0 right-0 mt-20 mr-24 w-64 p-4 rounded-lg font-bold text-center border-2 border-white ${notificationClass}`}
            >
            {message}
            </div>
        )}
        </div>
    );
}

Notification.propTypes = {
    message: PropTypes.string.isRequired, // Diubah menjadi string karena biasanya pesan notifikasi adalah string
    isError: PropTypes.bool.isRequired, // Diubah menjadi boolean untuk menentukan warna
};

export default Notification;