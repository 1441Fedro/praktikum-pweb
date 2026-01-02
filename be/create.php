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

// Inisialisasi array respons
$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Menghubungkan ke database
    require('connection.php');

    // Mengambil data dari permintaan
    $npm = $_POST['npm'];
    $nama = $_POST['nama'];
    $kelas = $_POST['kelas'];

    // Query SQL untuk memasukkan data
    $sql = "INSERT INTO users (npm, nama, kelas) VALUES ('$npm', '$nama', '$kelas')";

    // Menjalankan query dan memeriksa keberhasilan
    if (mysqli_query($koneksi, $sql)) {
        $response['status'] = 'success';
        $response['message'] = 'Data berhasil ditambahkan';
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Error: ' . $sql . '<br>' . mysqli_error($koneksi);
    }

    // Menutup koneksi ke database
    mysqli_close($koneksi);
}

// Mengirimkan respons dalam format JSON
echo json_encode($response);
?>
