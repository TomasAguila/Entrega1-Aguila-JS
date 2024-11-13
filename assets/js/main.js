class Producto {
    constructor(nombre, cantidad) {
        this.nombre = nombre.toUpperCase();
        this.cantidad = parseInt(cantidad);
    }
}

const inventory = [
    new Producto("manzana", 5),
    new Producto("pera", 3),
    new Producto("cafe", 1)
];

function updateInventoryDisplay() {
    const inventoryDisplay = document.getElementById("inventoryDisplay");

    if (inventory.length === 0) {
        inventoryDisplay.textContent = "El inventario está vacío.";
    } else {
        const inventoryList = inventory.map(function(item) {
            return item.nombre + " (Cantidad: " + item.cantidad + ")";
        }).join(", ");
        inventoryDisplay.textContent = "Inventario: " + inventoryList;
    }
}

function manageInventory() {
    let userOption;
    do {
        userOption = prompt(
            "Selecciona una opción:\n" +
            "1. Añadir producto\n" +
            "2. Remover producto\n" +
            "3. Ver inventario\n" +
            "4. Buscar producto\n" +
            "5. Salir"
        );
        switch (userOption) {
            case '1':
                addProduct();
                break;
            case '2':
                removeProduct();
                break;
            case '3':
                viewInventory();
                break;
            case '4':
                searchProduct();
                break;
            case '5':
                alert("Has salido del sistema.");
                break;
            default:
                alert("Opción no válida, intenta de nuevo.");
        }
    } while (userOption !== '5');
    
    updateInventoryDisplay(); 
}

function addProduct() {
    const productName = prompt("Ingresa el nombre del producto:");
    const productQuantity = parseInt(prompt("Ingresa la cantidad del producto:"));

    const existingProduct = inventory.find(function(item) {
        return item.nombre.toLowerCase() === productName.toLowerCase();
    });
    if (existingProduct) {
        existingProduct.cantidad += productQuantity;
        alert("Producto actualizado: " + existingProduct.nombre + ", Nueva cantidad: " + existingProduct.cantidad);
    } else {
        const newProduct = new Producto(productName, productQuantity);
        inventory.push(newProduct);
        alert("Producto añadido: " + newProduct.nombre + ", Cantidad: " + newProduct.cantidad);
    }
    updateInventoryDisplay(); 
}

function removeProduct() {
    const productName = prompt("Ingresa el nombre del producto que deseas eliminar:");
    const product = inventory.find(function(item) { return item.nombre.toLowerCase() === productName.toLowerCase(); });
    if (product) {
        const removeQuantity = parseInt(prompt("¿Cuántos " + product.nombre + " deseas remover?"));        
        if (removeQuantity <= product.cantidad) {
            product.cantidad -= removeQuantity;
            if (product.cantidad === 0) {
                const index = inventory.indexOf(product);
                inventory.splice(index, 1);
                alert("Producto eliminado: " + product.nombre);
            } else {
                alert("Cantidad actualizada: " + product.nombre + ", Cantidad restante: " + product.cantidad);
            }
        } else {
            alert("La cantidad a remover es mayor que la cantidad disponible.");
        }
    } else {
        alert("Producto no encontrado en el inventario.");
    }
    updateInventoryDisplay(); 
}

function viewInventory() {
    updateInventoryDisplay(); 
}

function searchProduct() {
    const productName = prompt("Ingresa el nombre del producto que deseas buscar:");
    const productFound = inventory.find(function(item) { return item.nombre.toLowerCase() === productName.toLowerCase(); });

    if (productFound) {
        alert("Producto encontrado: " + productFound.nombre + ", Cantidad: " + productFound.cantidad);
    } else {
        alert("Producto no encontrado en el inventario.");
    }
}

window.onload = manageInventory;

