// archivo: factura.js

// Precios base para materiales y productos (estos valores pueden ser ajustados según necesidad)
const precios = {
    'algodón': 5.00,  // Precio por kilogramo
    'poliéster': 3.00,
    'lana': 8.00,
    'camisa': 20.00,  // Precio por unidad
    'pantalones': 25.00,
    'abrigo': 50.00
};

// Función para calcular el precio basado en cantidad y material/producto
function calcularPrecio(tipo, cantidad) {
    const precioUnitario = precios[tipo.toLowerCase()];
    return precioUnitario ? precioUnitario * cantidad : 0;
}

// Función para generar factura del día
function generarFacturaDiaria() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const today = new Date().toISOString().split('T')[0];
    const todayOrders = orders.filter(order => order.date.startsWith(today));
    
    let factura = `
        <html>
        <head>
            <title>Factura del Día (${today})</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; text-align: center; }
                .container { width: 80%; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 5px; }
                h1, h2 { color: #333; }
                .details { margin: 20px 0; }
                .details span { display: block; margin: 5px 0; }
                button { margin-top: 20px; padding: 10px; font-size: 16px; cursor: pointer; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Factura del Día (${today})</h1>
                <div class="details">
                    <span><strong>Nombre de la Empresa:</strong> TextilSmart S.A.</span>
                    <span><strong>Dirección:</strong> Calle Ficticia 123, Ciudad, País</span>
                    <span><strong>Fecha:</strong> ${today}</span>
                    <span><strong>Nombre del Vendedor:</strong> Juan Pérez</span>
                    <span><strong>Nombre del Comprador:</strong> Cliente Ejemplo</span>
                    <span><strong>Tiempo de Entrega:</strong> 7 días hábiles</span>
                    <span><strong>Productos Vendidos:</strong></span>
                </div>
                <ul>
    `;
    let total = 0;
    todayOrders.forEach(order => {
        const precio = calcularPrecio(order.product, order.quantity);
        total += precio;
        factura += `
            <li>Producto: ${order.product}, Cantidad: ${order.quantity}, Precio Unitario: $${precios[order.product.toLowerCase()]}, Total: $${precio.toFixed(2)}</li>
        `;
    });
    factura += `
                </ul>
                <div class="details">
                    <span><strong>Total:</strong> $${total.toFixed(2)}</span>
                </div>
                <p>Gracias por su compra. Esperamos verlo pronto.</p>
                <button onclick="window.print()">Imprimir</button>
                <button onclick="window.history.back()">Regresar</button>
            </div>
        </body>
        </html>
    `;

    let facturaWindow = window.open('', '_blank');
    facturaWindow.document.open();
    facturaWindow.document.write(factura);
    facturaWindow.document.close();
}

// Función para generar factura del mes
function generarFacturaMensual() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const month = new Date().toISOString().slice(0, 7);
    const monthlyOrders = orders.filter(order => order.date.startsWith(month));
    
    let factura = `
        <html>
        <head>
            <title>Factura del Mes (${month})</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; text-align: center; }
                .container { width: 80%; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 5px; }
                h1, h2 { color: #333; }
                .details { margin: 20px 0; }
                .details span { display: block; margin: 5px 0; }
                button { margin-top: 20px; padding: 10px; font-size: 16px; cursor: pointer; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Factura del Mes (${month})</h1>
                <div class="details">
                    <span><strong>Nombre de la Empresa:</strong> TextilSmart S.A.</span>
                    <span><strong>Dirección:</strong> Calle Ficticia 123, Ciudad, País</span>
                    <span><strong>Mes:</strong> ${month}</span>
                    <span><strong>Nombre del Vendedor:</strong> Juan Pérez</span>
                    <span><strong>Nombre del Comprador:</strong> Cliente Ejemplo</span>
                    <span><strong>Tiempo de Entrega:</strong> 7 días hábiles</span>
                    <span><strong>Productos Vendidos:</strong></span>
                </div>
                <ul>
    `;
    let total = 0;
    monthlyOrders.forEach(order => {
        const precio = calcularPrecio(order.product, order.quantity);
        total += precio;
        factura += `
            <li>Producto: ${order.product}, Cantidad: ${order.quantity}, Precio Unitario: $${precios[order.product.toLowerCase()]}, Total: $${precio.toFixed(2)}</li>
        `;
    });
    factura += `
                </ul>
                <div class="details">
                    <span><strong>Total:</strong> $${total.toFixed(2)}</span>
                </div>
                <p>Gracias por su compra. Esperamos verlo pronto.</p>
                <button onclick="window.print()">Imprimir</button>
                <button onclick="window.history.back()">Regresar</button>
            </div>
        </body>
        </html>
    `;

    let facturaWindow = window.open('', '_blank');
    facturaWindow.document.open();
    facturaWindow.document.write(factura);
    facturaWindow.document.close();
}

// Función para generar factura de la semana
function generarFacturaSemanal() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const weekOrders = orders.filter(order => {
        const orderDate = new Date(order.date);
        return orderDate >= firstDayOfWeek;
    });
    
    let factura = `
        <html>
        <head>
            <title>Factura de la Semana</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; text-align: center; }
                .container { width: 80%; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 5px; }
                h1, h2 { color: #333; }
                .details { margin: 20px 0; }
                .details span { display: block; margin: 5px 0; }
                button { margin-top: 20px; padding: 10px; font-size: 16px; cursor: pointer; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Factura de la Semana</h1>
                <div class="details">
                    <span><strong>Nombre de la Empresa:</strong> TextilSmart S.A.</span>
                    <span><strong>Dirección:</strong> Calle Ficticia 123, Ciudad, País</span>
                    <span><strong>Semana:</strong> Del ${firstDayOfWeek.toISOString().split('T')[0]} al ${new Date().toISOString().split('T')[0]}</span>
                    <span><strong>Nombre del Vendedor:</strong> Juan Pérez</span>
                    <span><strong>Nombre del Comprador:</strong> Cliente Ejemplo</span>
                    <span><strong>Tiempo de Entrega:</strong> 7 días hábiles</span>
                    <span><strong>Productos Vendidos:</strong></span>
                </div>
                <ul>
    `;
    let total = 0;
    weekOrders.forEach(order => {
        const precio = calcularPrecio(order.product, order.quantity);
        total += precio;
        factura += `
            <li>Producto: ${order.product}, Cantidad: ${order.quantity}, Precio Unitario: $${precios[order.product.toLowerCase()]}, Total: $${precio.toFixed(2)}</li>
        `;
    });
    factura += `
                </ul>
                <div class="details">
                    <span><strong>Total:</strong> $${total.toFixed(2)}</span>
                </div>
                <p>Gracias por su compra. Esperamos verlo pronto.</p>
                <button onclick="window.print()">Imprimir</button>
                <button onclick="window.history.back()">Regresar</button>
            </div>
        </body>
        </html>
    `;

    let facturaWindow = window.open('', '_blank');
    facturaWindow.document.open();
    facturaWindow.document.write(factura);
    facturaWindow.document.close();
}
