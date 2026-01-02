
<?php
// Mengatur header untuk mengindikasikan bahwa respons adalah JSON
header('Content-Type: application/json');

// Mengizinkan permintaan dari semua origin (untuk development)
header('Access-Control-Allow-Origin: *');

// Mengizinkan metode HTTP yang diizinkan
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');

// Mengizinkan header tambahan
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Jika metode OPTIONS, berikan respons yang benar
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Menghubungkan ke database
require('connection.php');

// Inisialisasi array respons
$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Mengambil ID dari parameter URL
    $url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $parts = explode('/', $url);
    $id = end($parts);

    // Pastikan ID adalah angka (lakukan validasi jika perlu)
    if (is_numeric($id)) {
        $sql = "DELETE FROM users WHERE id='$id'";
        
        // Menjalankan query dan memeriksa hasilnya
        if (mysqli_query($koneksi, $sql)) {
            $response['status'] = 'success';
            $response['message'] = 'Data dengan ID ' . $id . ' berhasil dihapus.';
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Error: ' . $sql . '<br>' . mysqli_error($koneksi);
        }
    } else {
        $response['status'] = 'error';
        $response['message'] = 'ID tidak valid.';
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Metode HTTP tidak valid.';
}

// Menutup koneksi ke database
mysqli_close($koneksi);

// Mengirimkan respons dalam format JSON
echo json_encode($response);
?>
