const templatePay = document.getElementById('template-cart').content;
const productRow = document.getElementById('cartToPay');
const fragment = document.createDocumentFragment();
let numberOfProducts = document.querySelector('#numberOfProducts');
const data = JSON.parse(localStorage.getItem('cart'));

const cart = []
if(data != null) {
    cart.push(...data);
}

const showNumberOfProducts = () =>{ numberOfProducts.innerText = cart.length;}

const showProductsToPay = () => {
    if ( cart.length != 0) {
        productRow.innerHTML = '';
        cart.forEach(product => {
            templatePay.querySelector('#imgCart').setAttribute("src", product.image),
            templatePay.querySelector('#nameProductToPay').textContent = product.title,
            templatePay.querySelector('#sizeProductToPay').textContent = product.size,
            templatePay.querySelector('#priceProductToPay').textContent = product.currency + product.price,
            templatePay.querySelector('.item-quantity').textContent = product.quantity,
            templatePay.querySelector('#subtotalProductToPay').textContent = product.currency + (product.quantity * product.price).toFixed(2),

            // buttons add and remove
            templatePay.querySelector('.subtractQuantity').dataset.id = product.id + ',' + product.size,
            templatePay.querySelector('.addQuantity').dataset.id = product.id + ',' + product.size,
            templatePay.querySelector('.remove').dataset.id = product.id + ',' + product.size,
            templatePay.querySelector('.delete').dataset.id = product.id + ',' + product.size

            const clone = templatePay.cloneNode(true);
            fragment.appendChild(clone);
        });
        productRow.appendChild(fragment);
    } else {
        const answer = document.createElement('tr');
        answer.classList.add('cartEmpty');
        answer.innerHTML = `
            <div id="empty">
                <span class="yourEmpty">Your cart is empty</span>
            </div>
        `
        productRow.appendChild(answer);
    }

    showNumberOfProducts();

    localStorage.setItem('cart', JSON.stringify(cart));
}

showProductsToPay(cart);

const btnQuantity = document.querySelector('#quantity');

productRow.addEventListener('click', e => {
    btnRemove(e);
    btnAction(e);
});

const btnRemove = e => {
    // Delete
    if(e.target.classList.contains('delete') || e.target.classList.contains('remove')) {
        const valueId = e.target.dataset.id;
        let separateId = valueId.split(',');
        if(cart.find(el => el.id == separateId[0] && el.size == separateId[1])) {
            let position = cart.indexOf(cart.find(el => el.id == separateId[0] && el.size == separateId[1]));
            cart.splice(position, 1);
        }
        showProductsToPay();
    }

    e.stopPropagation();
}


// buttons add and remove quantity
const btnAction = e => {
    //substract
    if (e.target.classList.contains('subtractQuantity')) {
        const valueId = e.target.dataset.id;
        let separateId = valueId.split(',');
        cart.find(el => el.id == separateId[0] && el.size == separateId[1]).quantity = cart.find(el => el.id == separateId[0] && el.size == separateId[1]).quantity - 1;
        if(cart.find(el => el.id == separateId[0] && el.size == separateId[1]).quantity === 0) {
            const positionSubstract = cart.indexOf(cart.find(el => el.id == separateId[0] && el.size == separateId[1]));
            cart.splice(positionSubstract, 1);
        }
        showProductsToPay();
        showTotalPrice();
    }

    //Add
    if (e.target.classList.contains('addQuantity')) {
        const valueId = e.target.dataset.id;
        let separateId = valueId.split(',');
        cart.find(el => el.id == separateId[0] && el.size == separateId[1]).quantity = cart.find(el => el.id == separateId[0] && el.size == separateId[1]).quantity + 1;
        showProductsToPay();
        showTotalPrice();
    }
}

// Total to Pay
const showTotalPrice = () => {
    let multiplicationPriceQuantity = cart.map( el => (el.price * el.quantity));
    let subtotal = (multiplicationPriceQuantity.reduce((acc, el) => acc + el, 0));
    let taxes = ((subtotal * 1.21) - subtotal);
    let total = subtotal + taxes;
    document.querySelector('.subtotalPay').innerText = '$' + (subtotal).toFixed(2);
    document.querySelector('.taxesPay').innerText = '$' + (taxes).toFixed(2);
    document.querySelector('.totalPay').innerText = '$' + (total).toFixed(2);
}

showTotalPrice();

// btn Pay
const btnReadyToPay = document.querySelector('.buyButton');

btnReadyToPay.addEventListener('click', () => {
    if(cart.length != 0) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Congratulations!',
            text: 'Your shipment is on its way. It will arrive in the next 24 hours',
            showConfirmButton: false,
            timer: 3500,
        })
        localStorage.clear();
        setInterval("location.reload()", 3500);
    }
})