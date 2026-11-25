// ===============================
// CART
// ===============================

// LocalStorage se cart nikalo
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ===============================
// CAKES JSON LOAD
// ===============================

fetch("cakes.json")
    .then(function(response) {
        return response.json();
    })

    .then(function(cakes) {

        let cakeList = document.getElementById("cakeList");

        // Agar current page par cakeList nahi hai
        if (!cakeList) {
            return;
        }

        cakeList.innerHTML = "";

        // ===============================
        // INDEX PAGE
        // Sirf 6 cakes
        // ===============================

        if (window.location.pathname.toLowerCase().includes("index.html") ||
            window.location.pathname.endsWith("/")) {

            cakes = cakes.slice(0, 6);
        }

        // ===============================
        // CAKES PAGE
        // Saare 9 cakes
        // ===============================

        cakes.forEach(function(cake) {

            cakeList.innerHTML += `

                <div class="col-md-4 mb-5">

                    <div class="cake-card">

                        <img src="${cake.image}"
                             alt="${cake.name}">

                    </div>

                    <div class="cake-price">
                        $${cake.price}
                    </div>

                    <h2>
                        ${cake.name}
                    </h2>

                    <p>
                        Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit.
                    </p>

                    <button
                        class="btn btn-danger"
                        onclick="addToCart(
                            ${cake.id},
                            '${cake.name}',
                            ${cake.price},
                            '${cake.image}'
                        )">

                        Add to Cart

                    </button>

                </div>

            `;
        });

    })

    .catch(function(error) {

        console.log("Cake data load nahi hua:", error);

    });


// ===============================
// ADD TO CART
// ===============================

function addToCart(id, name, price, image) {

    // Check karo cake already cart me hai ya nahi
    let existingProduct = cart.find(function(item) {

        return item.id === id;

    });


    if (existingProduct) {

        // Already hai
        // quantity increase karo
        existingProduct.quantity++;

    }

    else {

        // Naya cake cart me add karo
        cart.push({

            id: id,
            name: name,
            price: price,
            image: image,
            quantity: 1

        });

    }


    // LocalStorage me save
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    // Navbar cart update
    updateCart();

}


// ===============================
// UPDATE CART
// ===============================

function updateCart() {

    let cartCount = document.getElementById("cartCount");

    let cartTotal = document.getElementById("cartTotal");

    let cartItems = document.getElementById("cartItems");

    let cartSubtotal = document.getElementById("cartSubtotal");


    let totalQuantity = 0;

    let totalPrice = 0;


    // Total quantity aur price
    cart.forEach(function(item) {

        totalQuantity =
            totalQuantity + item.quantity;

        totalPrice =
            totalPrice + (item.price * item.quantity);

    });


    // ===============================
    // NAVBAR CART
    // ===============================

    if (cartCount) {

        cartCount.innerText = totalQuantity;

    }


    if (cartTotal) {

        cartTotal.innerText =
            "$" + totalPrice.toFixed(2);

    }


    // ===============================
    // OFFCANVAS SUBTOTAL
    // ===============================

    if (cartSubtotal) {

        cartSubtotal.innerText =
            "$" + totalPrice.toFixed(2);

    }


    // ===============================
    // CART ITEMS
    // ===============================

    if (!cartItems) {

        return;

    }


    // Cart empty
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p>Your cart is empty</p>
        `;

        return;

    }


    // Pehle empty karo
    cartItems.innerHTML = "";


    // Cart ke products show karo
    cart.forEach(function(item) {

        cartItems.innerHTML += `

            <div class="d-flex
                        align-items-center
                        justify-content-between
                        border-bottom
                        pb-3
                        mb-3">

                <div class="d-flex
                            align-items-center">

                    <img src="${item.image}"
                         width="70"
                         height="70"
                         style="object-fit:contain;">

                    <div class="ms-3">

                        <h6 class="mb-1">
                            ${item.name}
                        </h6>

                        <p class="mb-0">
                            $${item.price} × ${item.quantity}
                        </p>

                    </div>

                </div>


                <div>

                    <strong>
                        $${(
                            item.price *
                            item.quantity
                        ).toFixed(2)}
                    </strong>

                    <button
                        class="btn btn-sm btn-danger ms-2"
                        onclick="removeFromCart(${item.id})">

                        ×

                    </button>

                </div>

            </div>

        `;

    });

}


// ===============================
// REMOVE FROM CART
// ===============================

function removeFromCart(id) {

    cart = cart.filter(function(item) {

        return item.id !== id;

    });


    // LocalStorage update
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    // Cart update
    updateCart();

}


// ===============================
// CHECKOUT
// ===============================

function goToCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty");

        return;

    }


    window.location.href = "checkout.html";

}


// ===============================
// PAGE LOAD
// ===============================

updateCart();



// ===============================
// CART PAGE
// ===============================

function showCartPage() {

    let cartPageItems = document.getElementById("cartPageItems");

    let pageSubtotal = document.getElementById("pageSubtotal");

    let pageTotal = document.getElementById("pageTotal");


    // Agar cart page nahi hai
    if (!cartPageItems) {
        return;
    }


    // Cart empty hai
    if (cart.length === 0) {

        cartPageItems.innerHTML = `

            <div class="empty-cart">

                <h2>Your cart is empty</h2>

                <a href="Cakes.html">
                    Continue Shopping
                </a>

            </div>

        `;

        pageSubtotal.innerText = "$0.00";

        pageTotal.innerText = "$0.00";

        return;
    }


    cartPageItems.innerHTML = "";


    let total = 0;


    cart.forEach(function(item) {

        let itemTotal = item.price * item.quantity;

        total = total + itemTotal;


        cartPageItems.innerHTML += `

            <div class="cart-product">

                <!-- PRODUCT -->

                <div class="product-info">

                    <img src="${item.image}">

                    <div>

                        <div class="product-name">
                            ${item.name}
                        </div>

                        <button
                            class="remove-product"
                            onclick="removeFromCart(${item.id})">

                            × Remove

                        </button>

                    </div>

                </div>


                <!-- PRICE -->

                <div>

                    $${item.price.toFixed(2)}

                </div>


                <!-- QUANTITY -->

                <div class="quantity-box">

                    <button
                        onclick="decreaseQuantity(${item.id})">

                        −

                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${item.id})">

                        +

                    </button>

                </div>


                <!-- SUBTOTAL -->

                <div>

                    $${itemTotal.toFixed(2)}

                </div>

            </div>

        `;

    });


    pageSubtotal.innerText =
        "$" + total.toFixed(2);


    pageTotal.innerText =
        "$" + total.toFixed(2);

}


// ===============================
// INCREASE
// ===============================

function increaseQuantity(id) {

    let product = cart.find(function(item) {

        return item.id === id;

    });


    if (product) {

        product.quantity++;

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCart();

    showCartPage();

}


// ===============================
// DECREASE
// ===============================

function decreaseQuantity(id) {

    let product = cart.find(function(item) {

        return item.id === id;

    });


    if (product) {

        product.quantity--;


        if (product.quantity <= 0) {

            cart = cart.filter(function(item) {

                return item.id !== id;

            });

        }

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCart();

    showCartPage();

}


// ===============================
// PAGE LOAD
// ===============================

showCartPage();



// ===============================
// CHECKOUT PAGE
// ===============================

function showCheckoutPage() {

    let checkoutItems =
        document.getElementById("checkoutItems");

    let checkoutSubtotal =
        document.getElementById("checkoutSubtotal");

    let checkoutTotal =
        document.getElementById("checkoutTotal");


    // Agar checkout page nahi hai
    if (!checkoutItems) {
        return;
    }


    // Cart empty hai
    if (cart.length === 0) {

        checkoutItems.innerHTML = `

            <p>
                Your cart is empty.
            </p>

            <a href="Cakes.html">
                Continue Shopping
            </a>

        `;

        checkoutSubtotal.innerText = "$0.00";

        checkoutTotal.innerText = "$0.00";

        return;
    }


    checkoutItems.innerHTML = "";


    let total = 0;


    cart.forEach(function(item) {

        let itemTotal =
            item.price * item.quantity;


        total = total + itemTotal;


        checkoutItems.innerHTML += `

            <div class="checkout-product">

                <div class="checkout-product-left">

                    <img src="${item.image}">

                    <div>

                        <div class="checkout-product-name">

                            ${item.name}

                        </div>

                        <div class="checkout-product-quantity">

                            Quantity: ${item.quantity}

                        </div>

                    </div>

                </div>


                <strong>

                    $${itemTotal.toFixed(2)}

                </strong>

            </div>

        `;

    });


    checkoutSubtotal.innerText =
        "$" + total.toFixed(2);


    checkoutTotal.innerText =
        "$" + total.toFixed(2);

}


// ===============================
// CHECKOUT BUTTON
// ===============================

function goToCheckout() {

    window.location.href =
        "checkout.html";

}


// ===============================
// PLACE ORDER
// ===============================

let checkoutForm =
    document.getElementById("checkoutForm");


if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            alert("Order placed successfully!");

            localStorage.removeItem("cart");

            cart = [];

            window.location.href =
                "index.html";

        }
    );

}


// ===============================
// LOAD CHECKOUT
// ===============================

showCheckoutPage();