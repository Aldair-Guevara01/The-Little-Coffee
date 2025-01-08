<?php
// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = ""; // Contraseña por defecto en XAMPP es vacía
$dbname = "little_coffee"; // Cambia esto por el nombre de tu base de datos

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos del producto
$name = $_POST['name'];
$price = $_POST['price'];
$stars = $_POST['stars'];
$discount = $_POST['discount'];
$oldPrice = $_POST['oldPrice'];

// Manejo de la imagen
$image = null;
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $image = 'uploads/' . basename($_FILES['image']['name']);
    move_uploaded_file($_FILES['image']['tmp_name'], $image);
}

// Preparar la consulta SQL
$sql = "INSERT INTO products (name, price, stars, discount, oldPrice, image) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sdidis", $name, $price, $stars, $discount, $oldPrice, $image);

if ($stmt->execute()) {
    echo "Producto guardado con éxito.";
} else {
    echo "Error al guardar el producto: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
