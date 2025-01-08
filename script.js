document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.fa-bars');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', () => {
        // Cambia la visibilidad del menú
        if (menu.style.display === 'flex') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'flex';
        }
    });
});

// Función para mostrar u ocultar más información al hacer clic en "Leer más"
function toggleMoreInfo(id) {
    const element = document.getElementById(id);
    // Alterna entre mostrar y ocultar el contenido
    if (element.style.display === "none" || element.style.display === "") {
        element.style.display = "block";  // Mostrar el contenido
    } else {
        element.style.display = "none";  // Ocultar el contenido
    }
}

// Función para mostrar u ocultar más información al hacer clic en "Leer más" o "X"
function toggleMoreInfo(id) {
    const element = document.getElementById(id);
    if (element.style.display === "none" || element.style.display === "") {
        element.style.display = "block";  // Mostrar el contenido
    } else {
        element.style.display = "none";  // Ocultar el contenido
    }
}









        let products = {
            desayunos: [
                { id: 1, name: "", price: 0, stars: 1, image: null, discount: 0, oldPrice: 0 },
            ],
            bebidas: [
            { id: 1, name: "", price: 0, stars: 1, image: null, discount: 0, oldPrice: 0 },
            ],
            postres: [
                { id: 1, name: "", price: 0, stars: 1, image: null, discount: 0, oldPrice: 0 },
                ],
            dulces: [
            { id: 1, name: "", price: 0, stars: 1, image: null, discount: 0, oldPrice: 0 },
                ],
        };

        function renderProducts() {
            Object.entries(products).forEach(([category, productList]) => {
                const grid = document.getElementById(`${category}-grid`);
                grid.innerHTML = '';
                productList.forEach(product => {
                    const productElement = createProductElement(product, category);
                    grid.appendChild(productElement);
                });
            });
        }

        function createProductElement(product, category) {
            const div = document.createElement('div');
            div.className = 'product-card';
            div.innerHTML = `
                <img src="${product.image ? URL.createObjectURL(product.image) : '/api/placeholder/250/200'}" alt="${product.name}" class="product-image">
                <h3 class="product-title">${product.name}</h3>
                <div class="stars">${'★'.repeat(product.stars)}${'☆'.repeat(5-product.stars)}</div>
                <p class="product-price">$${product.price.toFixed(2)}
                    ${product.discount ? `<span class="product-discount">$${product.oldPrice.toFixed(2)}</span>` : ''}
                </p>
                ${product.discount ? `<span class="discount-badge">-${product.discount}%</span>` : ''}
                <button class="edit-button" onclick="showEditModal('${category}', ${product.id})">Editar</button>
                <button class="delete-button" onclick="deleteProduct('${category}', ${product.id})">Eliminar</button>
            `;
            return div;
        }

        function showEditModal(category, productId) {
            const product = products[category].find(p => p.id === productId);
            if (product) {
                document.getElementById('modalTitle').textContent = 'Editar Producto';
                document.getElementById('productName').value = product.name;
                document.getElementById('productPrice').value = product.price;
                document.getElementById('productStars').value = product.stars;
                document.getElementById('productDiscount').value = product.discount || '';
                document.getElementById('productOldPrice').value = product.oldPrice || '';
                
                const imagePreview = document.getElementById('imagePreview');
                if (product.image) {
                    imagePreview.src = URL.createObjectURL(product.image);
                    imagePreview.style.display = 'block';
                } else {
                    imagePreview.style.display = 'none';
                }
                
                document.getElementById('productForm').onsubmit = function(e) {
                    e.preventDefault();
                    updateProduct(category, productId);
                };
                
                openModal();
            }
        }

        function showAddModal(category) {
            document.getElementById('modalTitle').textContent = 'Agregar Nuevo Producto';
            document.getElementById('productForm').reset();
            document.getElementById('imagePreview').style.display = 'none';
            
            document.getElementById('productForm').onsubmit = function(e) {
                e.preventDefault();
                addNewProduct(category);
            };
            
            openModal();
        }

        function updateProduct(category, productId) {
            const product = products[category].find(p => p.id === productId);
            if (product) {
                const imageFile = document.getElementById('productImage').files[0];
                if (imageFile) {
                    product.image = imageFile;
                }
                product.name = document.getElementById('productName').value;
                product.price = parseFloat(document.getElementById('productPrice').value);
                product.stars = parseInt(document.getElementById('productStars').value);
                product.discount = parseInt(document.getElementById('productDiscount').value) || 0;
                product.oldPrice = parseFloat(document.getElementById('productOldPrice').value) || product.price;
                
                renderProducts();
                closeModal();
            }
        }

        function addNewProduct(category) {
            const imageFile = document.getElementById('productImage').files[0];
            const newProduct = {
                id: Date.now(),
                image: imageFile,
                name: document.getElementById('productName').value,
                price: parseFloat(document.getElementById('productPrice').value),
                stars: parseInt(document.getElementById('productStars').value),
                discount: parseInt(document.getElementById('productDiscount').value) || 0,
                oldPrice: parseFloat(document.getElementById('productOldPrice').value) || 0
            };
            
            products[category].push(newProduct);
            renderProducts();
            closeModal();
        }

        function deleteProduct(category, productId) {
            if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                products[category] = products[category].filter(p => p.id !== productId);
                renderProducts();
            }
        }

        function openModal() {
            document.getElementById('productModal').style.display = 'block';
        }

        function closeModal() {
            document.getElementById('productModal').style.display = 'none';
        }

        document.querySelector('.close').onclick = closeModal;
        window.onclick = function(event) {
            if (event.target == document.getElementById('productModal')) {
                closeModal();
            }
        }

        document.getElementById('productImage').addEventListener('change', function(e) {
            const file = e.target.files[0];
            const imagePreview = document.getElementById('imagePreview');
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                }
                reader.readAsDataURL(file);
            } else {
                imagePreview.style.display = 'none';
            }
        });

        renderProducts();



        document.addEventListener('DOMContentLoaded', function() {
            const menuToggle = document.querySelector('.menu-toggle');
            const navbar = document.querySelector('.navbar');
            const closeMenu = document.querySelector('.close-menu');

            menuToggle.addEventListener('click', function() {
                navbar.classList.toggle('active');
            });

            closeMenu.addEventListener('click', function() {
                navbar.classList.remove('active');
            });

            // Cerrar el menú al hacer clic en un enlace (opcional)
            const navLinks = document.querySelectorAll('.navbar ul li a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navbar.classList.remove('active');
                });
            });
        });