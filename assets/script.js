const cards = document.getElementById('cards');
const items = document.getElementById('items');
const total = document.getElementById('total');
const cartShowContainer = document.getElementById('shoppingCart');
const shoppingCartOutsideClick = document.getElementById('cartContainer');
const modalShow = document.getElementById('modalAdd');
const buttonAddToCart = document.getElementById('btnSetModal');
const cardsArrivals = document.getElementById('cardsArrivals');
const templateCard = document.getElementById('template-card').content;
const templateModal = document.getElementById('template-modal').content;
const templateCart = document.getElementById('template-shopping-cart').content;
const fragment = document.createDocumentFragment();
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
const baseUrl = "https://raw.githubusercontent.com/Nelav99/Malmo-Clothes-Valentin-Farias/main"
let cart = [];
let modalObject = [];
let modalVariation = [];

cards.addEventListener('click', e => {
    showProductModal(e);
});

modalShow.addEventListener('click', e => {
    addToCart(e);
    clickOutside(e);
    quantityModal(e);
});

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

const fetchData = async () => {
    fetch('../assets/data.json')
        .then(res => res.json())
        .then(data => {
            showProduct(data);
        })
        .catch((error => {
            console.error(error);
        }));
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    if(localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        showCart();
    }
});

const showProduct = data => {
    const products = data;
    products.forEach(product => {
        templateCard.querySelector('span').textContent = product.create;
        templateCard.querySelector('h5').textContent = product.name;
        templateCard.querySelector('#currencyFeatures').textContent = product.currency;
        templateCard.querySelector('#priceFeatures').textContent = product.price;
        templateCard.querySelector('img').setAttribute("src", `${baseUrl}${product.image}`);
        templateCard.querySelector('#btnSetModal').dataset.id = product.id;
        templateCard.querySelector('h6').textContent = product.category;

        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });
    cards.appendChild(fragment);
}

// Show Modal
const showProductModal = e => {
    if(e.target.classList.contains('viewDetails')) {
        setModal(e.target.parentElement)
    }
    e.stopPropagation();
}

const setModal = Object => {
    const productModal = {
        id: Object.querySelector('#btnSetModal').dataset.id,
        title: Object.querySelector('h5').textContent,
        image: Object.querySelector('img').attributes[0].nodeValue,
        price: Object.querySelector('#priceFeatures').textContent,
        currency: Object.querySelector('#currencyFeatures').textContent,
        quantity: 1,
        category: Object.querySelector('h6').textContent,
    }
    if(modalObject.hasOwnProperty(productModal.id)) {
        productModal.quantity = productModal.quantity + 1;
    }

    modalObject.push(productModal.id = {...productModal});
    showModals();
}

const showModals = () => {
    modalShow.innerHTML = '';
    modalObject.forEach(productModal => {
        templateModal.querySelector('h6').textContent = 'Home / ' + productModal.category;
        templateModal.querySelector('h4').textContent = productModal.title;
        templateModal.querySelector('#currencyModal').textContent = productModal.currency;
        templateModal.querySelector('#priceModal').textContent = productModal.price;
        templateModal.querySelector('img').setAttribute("src", `${productModal.image}`);
        templateModal.querySelector('#btnAddToCart').dataset.id = productModal.id;

        // buttons add and remove
        templateModal.querySelector('.subtractQuantityModal').dataset.id = productModal.id,
        templateModal.querySelector('.addQuantityModal').dataset.id = productModal.id,

        valueIdModificate = productModal.id;
        const clone = templateModal.cloneNode(true);
        fragment.appendChild(clone);
    });

    modalShow.appendChild(fragment);
    modalVariation.push(modalObject.find(el => el.id == valueIdModificate));
    modalObject = [];
}

// show Cart
const addToCart = e => {
    if(e.target.classList.contains('addToCart')) {
        setCart(e.target.parentElement);
    }

    e.stopPropagation();
}

let productOut;
const setCart = Object => {
    let product = {
        id: Object.querySelector('#btnAddToCart').dataset.id,
        title: Object.querySelector('h4').textContent,
        image: Object.querySelector('img').attributes[0].nodeValue,
        price: Object.querySelector('#priceModal').textContent,
        currency: Object.querySelector('#currencyModal').textContent,
        quantity: parseFloat(Object.querySelector('span').textContent),
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

const showCart = () => {
    items.innerHTML = '';
    cart.forEach(product => {
        templateCart.querySelector('h6').textContent = product.title,
        templateCart.querySelector('.item-quantity').textContent = product.quantity,
        templateCart.querySelector('#imgCart').setAttribute("src", product.image),
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

// PopUp Start
const modalAdd = document.querySelector('#btnSetModal');
const containerModal = document.querySelector('#modalAdd');

const openModal = () => {
    containerModal.style.display = 'flex';
}

const closeModal = () => {
    containerModal.style.display = 'none';
}

function clickOutside(e){
    containerModal.addEventListener('click', e => {
        e.target.classList.contains('modal') || e.target.classList.contains('closeModal') ? containerModal.style.display = 'none' : containerModal.style.display = 'flex';
    });
}
// PopUp End

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

//Cart Open End

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