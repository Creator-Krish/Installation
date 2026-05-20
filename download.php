<?php
// download.php - Place this in your project root
$file = 'your-app.apk';  // Path to your APK file

if (file_exists($file)) {
    header('Content-Type: application/vnd.android.package-archive');
    header('Content-Disposition: attachment; filename="'.basename($file).'"');
    header('Content-Length: ' . filesize($file));
    readfile($file);
    exit;
} else {
    echo "File not found. Make sure your APK is uploaded.";
}
?>
