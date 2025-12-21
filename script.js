
// Sample product data
const products = [
    { id: 1, name: "Smartphone X Pro", price: 899.99, image: "📱" },
    { id: 2, name: "Wireless Earbuds", price: 129.99, image: "🎧" },
    { id: 3, name: "4K Ultra HD Tablet", price: 549.99, image: "📱" },
    { id: 4, name: "Smart Watch Series 5", price: 299.99, image: "⌚" },
    { id: 5, name: "Gaming Laptop", price: 1299.99, image: "💻" },
    { id: 6, name: "Bluetooth Speaker", price: 89.99, image: "🔈" },
    { id: 7, name: "VR Headset", price: 399.99, image: "👓" },
    { id: 8, name: "Drone with Camera", price: 599.99, image: "🚁" },
    { id: 9, name: "Smart Home Hub", price: 199.99, image: "🏠" },
    { id: 10, name: "Fitness Tracker", price: 149.99, image: "❤️" },
    { id: 11, name: "Noise Cancelling Headphones", price: 249.99, image: "🎧" },
    { id: 12, name: "Portable Power Bank", price: 49.99, image: "🔋" },
    { id: 13, name: "Smartphone Gimbal", price: 99.99, image: "📹" },
    { id: 14, name: "E-Reader", price: 179.99, image: "📖" },
    { id: 15, name: "Wireless Charger", price: 39.99, image: "⚡" },
    { id: 16, name: "Action Camera", price: 349.99, image: "📷" },
    { id: 17, name: "Smart Thermostat", price: 199.99, image: "🌡️" },
    { id: 18, name: "Robot Vacuum", price: 399.99, image: "🤖" },
    { id: 19, name: "Gaming Console", price: 499.99, image: "🎮" },
    { id: 20, name: "Smart Light Bulbs", price: 69.99, image: "💡" }
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
const paymentModal = document.getElementById('paymentModal');
const closePayment = document.getElementById('closePayment');
const paymentMethods = document.querySelectorAll('.payment-method');
const completePaymentBtn = document.getElementById('completePayment');
const paymentSuccess = document.getElementById('paymentSuccess');
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
    
    // Close payment modal
    closePayment.addEventListener('click', function() {
        paymentModal.classList.remove('active');
    });
    
    // Payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Complete payment
    completePaymentBtn.addEventListener('click', function() {
        // Show success message
        paymentSuccess.classList.add('active');
        
        // Clear cart after successful payment
        setTimeout(function() {
            cart = [];
            cartCount = 0;
            cartTotal = 0;
            updateCartDisplay();
            paymentSuccess.classList.remove('active');
            paymentModal.classList.remove('active');
            
            // Show thank you alert
            alert('Thank you for your purchase! Your order has been placed successfully.');
        }, 2000);
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
