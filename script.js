function saveMaterial() {
    const name = document.getElementById('materialName').value;
    const quantity = document.getElementById('materialQuantity').value;
    const unit = document.getElementById('materialUnit').value;

    if (name && quantity && unit) {
        const material = { name, quantity, unit };
        let materials = JSON.parse(localStorage.getItem('materials')) || [];
        materials.push(material);
        localStorage.setItem('materials', JSON.stringify(materials));
        document.getElementById('statusMessage').innerText = 'Materia Prima guardada correctamente.';
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

function saveProduction() {
    const task = document.getElementById('productionTask').value;
    const status = document.getElementById('productionStatus').value;

    if (task && status) {
        const production = { task, status };
        let productions = JSON.parse(localStorage.getItem('productions')) || [];
        productions.push(production);
        localStorage.setItem('productions', JSON.stringify(productions));
        document.getElementById('statusMessage').innerText = 'Producción guardada correctamente.';
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

function saveFinishedGoods() {
    const name = document.getElementById('finishedProductName').value;
    const quantity = document.getElementById('finishedProductQuantity').value;

    if (name && quantity) {
        const finishedGoods = { name, quantity };
        let finishedGoodsList = JSON.parse(localStorage.getItem('finishedGoods')) || [];
        finishedGoodsList.push(finishedGoods);
        localStorage.setItem('finishedGoods', JSON.stringify(finishedGoodsList));
        document.getElementById('statusMessage').innerText = 'Producto Terminado guardado correctamente.';
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

function saveOrder() {
    const customer = document.getElementById('orderCustomer').value;
    const product = document.getElementById('orderProduct').value;
    const status = document.getElementById('orderStatus').value;

    if (customer && product && status) {
        const order = { customer, product, status, date: new Date().toISOString().split('T')[0] }; // Agregamos la fecha actual
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        document.getElementById('statusMessage').innerText = 'Pedido guardado correctamente.';
    } else {
        alert('Por favor, complete todos los campos.');
    }
}







