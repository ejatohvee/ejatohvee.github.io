document.addEventListener('DOMContentLoaded', function() {
    let storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContainer = document.getElementById('cartContainer');
    let totalPrice = 0;

    storedCart.forEach(product => {
        let cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        let cartItemInfo = document.createElement('div');
        cartItemInfo.classList.add('cart-item-info');

        let image = document.createElement('img');
        image.src = product.image; // Замените на реальный путь к изображению
        image.alt = product.name;

        let name = document.createElement('p');
        name.classList.add('cart-item-name');
        name.innerText = product.name;
        cartItemInfo.appendChild(name);

        let price = document.createElement('p');
        price.innerText = 'Цена: ' + product.price * product.quantity + ' руб.';
        cartItemInfo.appendChild(price);

        let quantity = document.createElement('p');
        quantity.innerText = 'Количество: ' + product.quantity;
        cartItemInfo.appendChild(quantity);

        let productPrice = product.price * product.quantity;
        totalPrice += productPrice;

        cartItem.appendChild(image);
        cartItem.appendChild(cartItemInfo);

        cartContainer.appendChild(cartItem);
    });

    let totalCostElement = document.createElement('p');
    totalCostElement.classList.add('total-cost');
    totalCostElement.innerText = 'Итоговая стоимость: ' + totalPrice + ' руб.';
    document.body.appendChild(totalCostElement);

    // Элементы для отображения информации о заказе
    let orderInfoElement = document.createElement('div');
    orderInfoElement.classList.add('order-info');
    document.body.appendChild(orderInfoElement);

    let balanceElement = document.createElement('p');
    balanceElement.classList.add('balance');
    orderInfoElement.appendChild(balanceElement);

    let insufficientFundsElement = document.createElement('p');
    insufficientFundsElement.classList.add('insufficient-funds');
    orderInfoElement.appendChild(insufficientFundsElement);

    let successfulOrderElement = document.createElement('p');
    successfulOrderElement.classList.add('successful-order');
    orderInfoElement.appendChild(successfulOrderElement);

    let clearCartButton = document.createElement('button');
    clearCartButton.classList.add('clear-cart-button');
    clearCartButton.innerText = 'Очистить корзину';
    clearCartButton.addEventListener('click', function() {
        localStorage.removeItem('cart');
        location.reload();
    });
    document.body.appendChild(clearCartButton);

    // Функция для размещения заказа
    function placeOrder() {
        // Получаем текущий баланс с помощью функции updateBalance
        let currentBalance = parseInt(localStorage.getItem('userBalance')) || 0;

        let orderAmount = totalPrice;

        if (orderAmount === 0) {
            insufficientFundsElement.innerText = '';
        }
        if (currentBalance >= orderAmount) {
            document.querySelector('.balance').innerText = 'Ваш баланс: ' + currentBalance + ' руб.';
            totalCostElement.innerText = 'Итоговая стоимость: ' + totalPrice + ' руб.';
            if (orderAmount !== 0) {
                successfulOrderElement.innerText = 'Вы можете успешно оформить заказ';
            }
            insufficientFundsElement.innerText = '';
            currentBalance -= orderAmount;
        } else {
            document.querySelector('.balance').innerText = 'Ваш баланс: ' + currentBalance + ' руб.';
            insufficientFundsElement.innerText = 'Вам не хватает ' + (orderAmount - currentBalance) + ' руб. на счету';
            successfulOrderElement.innerText = '';
        }
    }


    // Вызов функции placeOrder
    placeOrder();
});
