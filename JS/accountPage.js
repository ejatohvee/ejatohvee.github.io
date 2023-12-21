function updateBalance(amount) {
    // Получаем текущий баланс из localStorage (если есть)
    let currentBalance = parseInt(localStorage.getItem('userBalance')) || 0;

    // Увеличиваем баланс на указанную сумму
    currentBalance += amount;

    // Сохраняем обновленный баланс в localStorage
    localStorage.setItem('userBalance', currentBalance);

    // Обновляем отображение баланса на странице
    document.getElementById('balance').innerText = currentBalance;
}

function resetBalance() {
    // Устанавливаем баланс в ноль
    localStorage.setItem('userBalance', 0);

    // Обновляем отображение баланса на странице
    document.getElementById('balance').innerText = 0;
}

document.addEventListener('DOMContentLoaded', function() {
    // Получаем баланс из localStorage
    let storedBalance = parseInt(localStorage.getItem('userBalance')) || 0;

    // Отображаем баланс на странице
    document.getElementById('balance').innerText = storedBalance;
});