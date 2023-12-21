let cart = [];

function increment(button) {
    let productContainer = button.closest('.product');
    let quantityInput = productContainer.querySelector('.quantity-bar');
    quantityInput.value = parseInt(quantityInput.value) + 1;
}

function decrement(button) {
    let productContainer = button.closest('.product');
    let quantityInput = productContainer.querySelector('.quantity-bar');
    if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}

function addToCart(button) {
    let productContainer = button.closest('.product');
    let productId = productContainer.getAttribute('data-product-id');

    let productName = productContainer.querySelector('.product-title').innerText;
    let productImage = productContainer.querySelector('.product-image').src;
    let productDescription = productContainer.querySelector('.product-description').innerText;
    let productQuantity = parseInt(productContainer.querySelector('.quantity-bar').value);

    // Проверяем, что количество не отрицательное и не является строкой
    if (!isNaN(productQuantity) && productQuantity > 0) {
        let priceElement = productContainer.querySelector('.product-price');
        let priceText = priceElement.innerText;
        let productPrice = parseFloat(priceText.replace(/[^\d.]/g, ''));

        let product = {
            id: productId,
            name: productName,
            image: productImage,
            description: productDescription,
            quantity: productQuantity,
            price: productPrice
        };

        addToCartArray(product);

        productContainer.querySelector('.quantity-bar').value = 1;

        console.log("Cart contents:", cart);
    } else {
        alert('Пожалуйста, введите корректное количество товара.');
    }
}

function addToCartArray(product) {
    let existingProduct = cart.find(p => p.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += product.quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

function showCart() {
    let storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log("Cart contents:", storedCart);
}
