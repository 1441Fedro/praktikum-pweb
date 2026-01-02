<?php
// Mengatur header untuk mengindikasikan bahwa respons adalah JSON
header('Content-Type: application/json'); 
// Mengizinkan permintaan dari semua origin (untuk development)
header('Access-Control-Allow-Origin: *'); 
// Mengatur metode HTTP yang diizinkan
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'); 
// Pastikan metode OPTIONS mendapatkan respons yang benar
header('Access-Control-Allow-Headers: Content-Type'); 

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { 
    http_response_code(200);
    exit;
}

// Menghubungkan ke database
require('connection.php'); 
$response = array(); 

if ($_SERVER['REQUEST_METHOD'] === 'GET') { 
    // Mengambil parameter search dari query string
    $searchTerm = isset($_GET['q']) ? trim($_GET['q']) : '';
    
    // Jika search term kosong, kembalikan semua data
    if (empty($searchTerm)) {
        $sql = "SELECT * FROM users"; 
    } else {
        // Escape string untuk mencegah SQL injection
        $searchTerm = mysqli_real_escape_string($koneksi, $searchTerm);
        
        // Jika search term adalah angka (kemungkinan ID), cari berdasarkan ID
        if (is_numeric($searchTerm)) {
            $sql = "SELECT * FROM users WHERE id = '$searchTerm' OR 
                    nama LIKE '%$searchTerm%' OR 
                    npm LIKE '%$searchTerm%' OR 
                    kelas LIKE '%$searchTerm%'";
        } else {
            // Jika bukan angka, cari berdasarkan nama, npm, atau kelas
            $sql = "SELECT * FROM users WHERE 
                    nama LIKE '%$searchTerm%' OR 
                    npm LIKE '%$searchTerm%' OR 
                    kelas LIKE '%$searchTerm%'";
        }
    }
    
    $result = mysqli_query($koneksi, $sql);
    
    if ($result && mysqli_num_rows($result) > 0) { 
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
        $response['status'] = 'Success';
        $response['data'] = array(); // Return empty array jika tidak ada hasil
        $response['message'] = 'Tidak ada data yang ditemukan.';
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Metode HTTP tidak valid.';
}

mysqli_close($koneksi);

echo json_encode($response); // Mengirimkan respons dalam format JSON
?>

