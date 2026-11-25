// ===============================
// CART
// ===============================

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

        // Agar page par cakeList nahi hai
        if (!cakeList) {
            return;
        }

        cakeList.innerHTML = "";


        // ===============================
        // CHECK CURRENT PAGE
        // ===============================

        let isIndexPage =
            window.location.pathname.toLowerCase().includes("index.html") ||
            window.location.pathname.endsWith("/");


        // ===============================
        // INDEX PAGE
        // 8 CAKES
        // ===============================

        if (isIndexPage) {

            cakes = cakes.slice(0, 8);

        }


        // ===============================
        // COLUMN SIZE
        // ===============================

        let columnClass;

        if (isIndexPage) {

            // 4 cakes in one row
            columnClass = "col-md-3";

        } else {

            // 3 cakes in one row
            columnClass = "col-md-4";

        }


        // ===============================
        // DISPLAY CAKES
        // ===============================

        cakes.forEach(function(cake) {

            cakeList.innerHTML += `

                <div class="${columnClass} mb-5">

                    <div class="cake-card">

                        <img src="${cake.image}"
                             alt="${cake.name}">


                        <!-- CART ICON -->

                        <button
                            class="image-cart-btn"
                            onclick="addToCart(
                                ${cake.id},
                                '${cake.name}',
                                ${cake.price},
                                '${cake.image}'
                            )"
                            title="Add to Cart">

                            <i class="bi bi-basket"></i>

                        </button>

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

                </div>

            `;

        });

    })

    .catch(function(error) {

        console.log(
            "Cake data load nahi hua:",
            error
        );

    });


// ===============================
// ADD TO CART
// ===============================

function addToCart(id, name, price, image) {

    let existingProduct = cart.find(function(item) {

        return item.id === id;

    });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            id: id,
            name: name,
            price: price,
            image: image,
            quantity: 1

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCart();

}


// ===============================
// UPDATE CART
// ===============================

function updateCart() {

    let cartCount =
        document.getElementById("cartCount");

    let cartTotal =
        document.getElementById("cartTotal");

    let cartItems =
        document.getElementById("cartItems");

    let cartSubtotal =
        document.getElementById("cartSubtotal");


    let totalQuantity = 0;
    let totalPrice = 0;


    // ===============================
    // CALCULATE TOTAL
    // ===============================

    cart.forEach(function(item) {

        totalQuantity =
            totalQuantity + item.quantity;

        totalPrice =
            totalPrice +
            (item.price * item.quantity);

    });


    // ===============================
    // NAVBAR CART COUNT
    // ===============================

    if (cartCount) {

        cartCount.innerText =
            totalQuantity;

    }


    // ===============================
    // NAVBAR CART TOTAL
    // ===============================

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


    if (cart.length === 0) {

        cartItems.innerHTML =
            `<p>Your cart is empty</p>`;

        return;

    }


    cartItems.innerHTML = "";


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


                    <img
                        src="${item.image}"
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


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCart();

    showCartPage();

}


// ===============================
// CHECKOUT
// ===============================

function goToCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty");

        return;

    }


    window.location.href =
        "checkout.html";

}


// ===============================
// PAGE LOAD
// ===============================

updateCart();


// ===============================
// CART PAGE
// ===============================

function showCartPage() {

    let cartPageItems =
        document.getElementById("cartPageItems");

    let pageSubtotal =
        document.getElementById("pageSubtotal");

    let pageTotal =
        document.getElementById("pageTotal");


    if (!cartPageItems) {

        return;

    }


    // ===============================
    // EMPTY CART
    // ===============================

    if (cart.length === 0) {

        cartPageItems.innerHTML = `

            <div class="empty-cart">

                <h2>
                    Your cart is empty
                </h2>


                <a href="Cakes.html">
                    Continue Shopping
                </a>

            </div>

        `;


        pageSubtotal.innerText =
            "$0.00";


        pageTotal.innerText =
            "$0.00";


        return;

    }


    cartPageItems.innerHTML = "";


    let total = 0;


    // ===============================
    // CART PRODUCTS
    // ===============================

    cart.forEach(function(item) {

        let itemTotal =
            item.price * item.quantity;


        total =
            total + itemTotal;


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
// INCREASE QUANTITY
// ===============================

function increaseQuantity(id) {

    let product =
        cart.find(function(item) {

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
// DECREASE QUANTITY
// ===============================

function decreaseQuantity(id) {

    let product =
        cart.find(function(item) {

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
// CART PAGE LOAD
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


    // Checkout page nahi hai
    if (!checkoutItems) {

        return;

    }


    // ===============================
    // EMPTY CART
    // ===============================

    if (cart.length === 0) {

        checkoutItems.innerHTML = `

            <p>
                Your cart is empty.
            </p>


            <a href="Cakes.html">
                Continue Shopping
            </a>

        `;


        checkoutSubtotal.innerText =
            "$0.00";


        checkoutTotal.innerText =
            "$0.00";


        return;

    }


    checkoutItems.innerHTML = "";


    let total = 0;


    // ===============================
    // CHECKOUT PRODUCTS
    // ===============================

    cart.forEach(function(item) {

        let itemTotal =
            item.price * item.quantity;


        total =
            total + itemTotal;


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
// PLACE ORDER
// ===============================

let checkoutForm =
    document.getElementById("checkoutForm");


if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            alert(
                "Order placed successfully!"
            );


            localStorage.removeItem("cart");


            cart = [];


            window.location.href =
                "index.html";

        }
    );

}


// ===============================
// CHECKOUT PAGE LOAD
// ===============================

showCheckoutPage();