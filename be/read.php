<?php
// Mengatur header untuk mengindikasikan bahwa respons adalah JSON
header('Content-Type: application/json'); 
// Mengizinkan permintaan dari semua origin (untuk development)
header('Access-Control-Allow-Origin: *'); 
// Mengatur metode HTTP yang diizinkan
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'); 
// Pastikan metode OPTIONS mendapatkan respons yang benar
header('Access-Control-Allow-Headers: Content-Type'); 

// header("Access-Control-Allow-Origin: http://localhost:3000");
// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { 
    http_response_code(200);
    exit;
}

// Mengatur header untuk mengindikasikan bahwa respons adalah JSON
header('Content-Type: application/json'); 
require('connection.php'); 
$response = array(); 
// Inisialisasi array respons
if ($_SERVER['REQUEST_METHOD'] === 'GET') { 
    $sql = "SELECT * FROM users"; 
    $result = mysqli_query($koneksi, $sql);
    if (mysqli_num_rows($result)) { 
        $data = array();
        while ($row = mysqli_fetch_assoc($result)) { 
            $item = array(
                "id" => $row['id'],
                "npm" => $row['npm'],
                "nama" => $row['nama'],
                "kelas" => $row['kelas']
            );
            $data[] = $item;
        }
        $response['status'] = 'Success';
        $response['data'] = $data;
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Tidak ada data dalam tabel users.';
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Metode HTTP tidak valid.';
}

mysqli_close($koneksi);

echo json_encode($response); // Mengirimkan respons dalam format JSON
?>
