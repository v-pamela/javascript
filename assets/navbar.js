const items = document.getElementById('items');
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
let numberOfProducts = document.querySelector('#numberOfProducts');
const cartShowContainer = document.getElementById('shoppingCart');
const templateCart = document.getElementById('template-shopping-cart').content;
const fragment = document.createDocumentFragment();
const data = JSON.parse(localStorage.getItem('cart'));

const cart = [...data];

numberOfProducts.innerText = cart.length;

items.addEventListener('click', e => {
    btnAction(e);
    btnRemove(e);
});

// NavBar Start
//Menu Mobile
if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

const setCart = Object => {
    let product = {
        id: Object.querySelector('#btnAddToCart').dataset.id,
        title: Object.querySelector('h4').textContent,
        image: Object.querySelector('img').attributes[0].nodeValue,
        price: Object.querySelector('#priceModal').textContent,
        currency: Object.querySelector('#currencyModal').textContent,
        quantity: Object.querySelector('span').textContent,
        size: Object.querySelector('select').value,
        idSizeValue: 0
    }

    product.idSizeValue = product.id + product.size;

    cart.find(el => el.id == product.id && el.size == product.size) ? cart.find(el => el.id == product.id && el.size == product.size).quantity++ : cart.push({ ...product });

    if(cart.some(el => el.size == "Select Size")){
        if(cart.find(el => el.size == "Select Size")) {
            const substractSelectSize = cart.indexOf(cart.find( el => el.size == "Select Size"));
            cart.splice(substractSelectSize, 1);
        }
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Oops...',
            text: 'Choose your size, please!',
            confirmButtonText: 'Retry'
        });
    } else {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your product has been added to cart',
            showConfirmButton: false,
            timer: 1500,
        })
    }

    showCart();
}

const showTotalPrice = () => {
    const totalContainer = document.getElementById('totalContainer');
    totalContainer.innerHTML = "";

    if(cart.length === 0) {
        totalContainer.innerHTML = '<span id="totalCart" class="main-color-text">$0.00</span>'
    }

    const totalPriceShow = Object.values(cart).reduce((acc, {quantity, price}) => acc + Number(quantity) * Number(price), 0).toFixed (2);

    const quantityPrice = Object.values(cart).reduce((acc, {quantity}) => acc + quantity, 0);

    if(cart.length != 0) {
        totalContainer.innerHTML = `<span class="lighter-text">Total:</span>
        <span id="totalCart" class="main-color-text">$${totalPriceShow}</span>`
    }

}

const showCart = () => {
    items.innerHTML = '';
    cart.forEach(product => {
        templateCart.querySelector('h6').textContent = product.title,
        templateCart.querySelector('.item-quantity').textContent = product.quantity,
        templateCart.querySelector('.principalProduct').setAttribute("src", product.image),
        templateCart.querySelector('#cartCurrency').textContent = product.currency,
        templateCart.querySelector('#cartPrice').textContent = (product.price * product.quantity).toFixed(2),
        templateCart.querySelector('#cartSize').textContent = 'Size: ' + product.size,

        // buttons add and remove
        templateCart.querySelector('.subtractQuantity').dataset.id = product.id + ',' + product.size,
        templateCart.querySelector('.addQuantity').dataset.id = product.id + ',' + product.size,
        templateCart.querySelector('.remove').dataset.id = product.id + ',' + product.size,
        templateCart.querySelector('.delete').dataset.id = product.id + ',' + product.size,
        templateCart.querySelector('#cartSize').dataset.id = product.idSizeValue

        const clone = templateCart.cloneNode(true);
        fragment.appendChild(clone);
    });

    if (cart.length === 0) {
        items.innerHTML = '';
        const cartEmpty = document.createElement('span')
        cartEmpty.innerText = `Your cart is empty`;
        items.appendChild(cartEmpty);
    }

    showTotalPrice();

    const numberOfProducts = document.getElementById('numberOfProducts').innerText = cart.length;
    items.appendChild(fragment);
    numberOfProducts;

    localStorage.setItem('cart', JSON.stringify(cart));
}

showCart();

// Cart Open Start
const containerBag = document.querySelector('#cartContainer');
containerBag.style.display = 'none';

const openBag = () => {
    if(containerBag.style.display === 'none') {
        containerBag.style.display = 'flex';
    } else {
        containerBag.style.display = 'none';
    }
}

const closeBag = () => {
    containerBag.style.display = 'none';
}

// buttons add and remove quantity
const btnAction = e => {
    //substract
    if (e.target.classList.contains('subtractQuantity')) {
        const valueId = e.target.dataset.id;
        let separateId = valueId.split(',');
        cart.find(el => el.id == separateId[0] && el.size == separateId[1]).quantity = (cart.find(el => el.id == separateId[0] && el.size == separateId[1]).quantity - 1);
        if(cart.find(el => el.id == separateId[0] && el.size == separateId[1]).quantity === 0) {
            let position = cart.indexOf(cart.find(el => el.id == separateId[0] && el.size == separateId[1]));
            cart.splice(position, 1);
        }
        showCart();
    }

    //Add
    if (e.target.classList.contains('addQuantity')) {
        const valueId = e.target.dataset.id;
        let separateId = valueId.split(',');
        cart.find(el => el.id == separateId[0] && el.size == separateId[1]).quantity = (cart.find(el => el.id == separateId[0] && el.size == separateId[1]).quantity + 1);
        showCart();
    }
}

const btnRemove = e => {
    // Delete
    if(e.target.classList.contains('remove') || e.target.classList.contains('delete')) {
        const valueId = e.target.dataset.id;
        let separateId = valueId.split(',');
        if(cart.find(el => el.id == separateId[0] && el.size == separateId[1])) {
            let position = cart.indexOf(cart.find(el => el.id == separateId[0] && el.size == separateId[1]));
            cart.splice(position, 1);
        }
        showCart();
    }

    e.stopPropagation();
}

const quantityModal = e => {
    if (e.target.dataset.id != undefined) {
        const containerModalId = modalVariation.find(el => el.id == e.target.dataset.id);
        let containerModalQuantity = containerModalId.quantity;
        let quantityNumber = containerModalQuantity;
        const btnSubstract = document.querySelector('.subtractQuantityModal');
        quantityNumber <= 1 ? btnSubstract.setAttribute("disabled", "") : btnSubstract.removeAttribute("disabled", "");

        //substract
        if (e.target.classList.contains('subtractQuantityModal')) {
            modalVariation.find(el => el.id == e.target.dataset.id).quantity = (modalVariation.find(el => el.id == e.target.dataset.id).quantity - 1);
            let itemSetModalSubstract = document.querySelector('.itemQuantityModal');
            if (modalVariation.find(el => el.id == e.target.dataset.id).quantity === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'The quantity is not defined. Remember that the value cannot be less than 0. Please, try again!',
                    confirmButtonText: 'Retry'
                })
            }
            itemSetModalSubstract.innerText = modalVariation.find(el => el.id == e.target.dataset.id).quantity;
        }
        // //Add
        if (e.target.classList.contains('addQuantityModal')) {
            modalVariation.find(el => el.id == e.target.dataset.id).quantity = (modalVariation.find(el => el.id == e.target.dataset.id).quantity) + 1;
            let itemSetModalAdd = document.querySelector('.itemQuantityModal');
            itemSetModalAdd.innerText = modalVariation.find(el => el.id == e.target.dataset.id).quantity;
        }

        e.stopPropagation();
    }
}