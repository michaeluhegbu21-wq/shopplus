
// Sample product data
const products = [
    { id: 1, name: "hp premium 14 stream celeron 4120 cpu 16gb RAM 64gb EMMC Webcam UHD 709524", price: 899.99, image: "<img src='laptop.jpg'>" },
    { id: 2, name: "Wireless Earbuds", price: 50, image: "<img src='earbuds.jpg'>" },
    { id: 3, name: "Infinix Note 40 Pro", price: 300, image: "<img src='infinix note 40 pro.jpg'>" },
    { id: 4, name: "Oriamo Earbuds", price: 60, image: "<img src='earbuds 2.jpg'>" },
    { id: 5, name: "Tecno Camon 40", price : 600, image: "<img src='tecno camon 40.png'>" },
    { id: 6, name: "Lenovo Think Pad", price: 89.99, image: "<img src='laptop2.jpg'>" },
    { id: 7, name: "Hp Premium 4500 CPU 16GB RAM 64GB", price: 950, image: "<img src='hp.png'>" },
    { id: 8, name: "JBL Headphone", price: 25, image: "<img src='headphone.jpg'>" },
    { id: 9, name: "Oraimo Earpiece", price: 199.99, image: "<img src='earpiece.png'>" },
    { id: 10, name: "Huwaie Sreen Touch Ultra", price: 15000, image: "<img src='huwaei.jpg'>" },
    { id: 11, name: "Iphone 17 ", price: 249.99, image: "<img src='iphone17.jpg'>" },
    { id: 12, name: "Samsung s25 Ultra", price: 1500, image: "<img src='samsung.jpg'>" },
    { id: 13, name: "Power Bank", price: 10, image: "<img src='powerbank 1.jpg'>" },
    { id: 14, name: "E-Reader", price: 10, image: "<img src='laptop2.jpg'>" },
    { id: 15, name: "Itel solar power bank", price: 120, image: "<img src='powerbank2.jpg'>" },
    { id: 16, name: "Redmi Note 15", price: 349.99, image: "<img src='redmi note 15.jpg'>" },
   
];

// Cart state
let cart = [];
let cartCount = 0;
let cartTotal = 0;

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartIcon = document.getElementById('cartIcon');
const cartCountElement = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const emptyCartMessage = document.getElementById('emptyCartMessage');
const cartTotalElement = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
// Add these to your existing DOM elements list
const customerInfoModal = document.getElementById('customerInfoModal');
const closeCustomerInfo = document.getElementById('closeCustomerInfo');
const submitCustomerInfoBtn = document.getElementById('submitCustomerInfo');
const customerInfoSuccess = document.getElementById('customerInfoSuccess');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const submitReviewBtn = document.getElementById('submitReview');
const reviewSuccess = document.getElementById('reviewSuccess');
const submitContactBtn = document.getElementById('submitContact');
const contactSuccess = document.getElementById('contactSuccess');
const faqItems = document.querySelectorAll('.faq-item');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartDisplay();
    
    // Mobile menu toggle - FIXED VERSION
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        // Change icon based on menu state
        const icon = mobileMenuBtn.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            // Reset icon to bars
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            navMenu.classList.remove('active');
            // Reset icon to bars
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Cart icon click
    cartIcon.addEventListener('click', function() {
        cartModal.classList.add('active');
    });
    
    // Close cart
    closeCart.addEventListener('click', function() {
        cartModal.classList.remove('active');
    });
    
    // Checkout button
    checkoutBtn.addEventListener('click', function() {
        if (cart.length > 0) {
            cartModal.classList.remove('active');
            paymentModal.classList.add('active');
        }
    });
    
   // Checkout button - CHANGED
checkoutBtn.addEventListener('click', function() {
    if (cart.length > 0) {
        cartModal.classList.remove('active');
        // Show customer info modal instead of payment modal
        customerInfoModal.classList.add('active');
    }
});

    // Submit review
    submitReviewBtn.addEventListener('click', function() {
        const name = document.getElementById('reviewName').value;
        const rating = document.getElementById('reviewRating').value;
        const reviewText = document.getElementById('reviewText').value;
        
        if (!name || !reviewText) {
            alert('Please fill in all fields before submitting your review.');
            return;
        }
        
        // Show success message
        reviewSuccess.classList.add('active');
        
        // Clear form
        document.getElementById('reviewName').value = '';
        document.getElementById('reviewRating').value = '3';
        document.getElementById('reviewText').value = '';
        
        // Hide success message after 5 seconds
        setTimeout(function() {
            reviewSuccess.classList.remove('active');
        }, 5000);
    });
    
    // Submit contact form
    submitContactBtn.addEventListener('click', function() {
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all fields before sending your message.');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show success message
        contactSuccess.classList.add('active');
        
        // Clear form
        document.getElementById('contactName').value = '';
        document.getElementById('contactEmail').value = '';
        document.getElementById('contactMessage').value = '';
        
        // Hide success message after 5 seconds
        setTimeout(function() {
            contactSuccess.classList.remove('active');
        }, 5000);
    });
    
    // FAQ accordion functionality
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            item.classList.toggle('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
// Submit customer info
submitCustomerInfoBtn.addEventListener('click', function() {
    // Get all form values
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const email = document.getElementById('customerEmail').value;
    
    // Validate required fields
    if (!name || !phone || !email) {
        alert('Please fill in all required fields (Name, Phone, Email)');
        return;
    }
    
    // Show success message
    customerInfoSuccess.classList.add('active');
    
    // After 2 seconds, you can either:
    // Option A: Show a success message and clear cart
    // Option B: Redirect to a "thank you" page
    // Option C: Show a simple payment confirmation
    
    setTimeout(function() {
        customerInfoSuccess.classList.remove('active');
        customerInfoModal.classList.remove('active');
        
        // Show order confirmation
        alert(`Thank you ${name}! Your order has been received.\nWe'll contact you at ${phone} for delivery details.`);
        
        // Clear the cart
        cart = [];
        cartCount = 0;
        cartTotal = 0;
        updateCartDisplay();
    }, 2000);
});



// Render products to the page
function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-img">
                ${product.image}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    // Update cart count and total
    cartCount++;
    cartTotal += product.price;
    
    updateCartDisplay();
    
    // Show confirmation
    alert(`${product.name} has been added to your cart!`);
}

// Update cart display
function updateCartDisplay() {
    // Update cart count
    cartCountElement.textContent = cartCount;
    
    // Update cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
    } else {
        emptyCartMessage.style.display = 'none';
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-img">
                    ${item.image}
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            cartItems.appendChild(cartItem);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                removeFromCart(productId);
            });
        });
    }
    
    // Update cart total
    cartTotalElement.textContent = cartTotal.toFixed(2);
}

// Remove item from cart
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        const item = cart[itemIndex];
        cartCount -= item.quantity;
        cartTotal -= item.price * item.quantity;
        cart.splice(itemIndex, 1);
        
        updateCartDisplay();
    }
}
