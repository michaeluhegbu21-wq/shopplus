
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
        const addressModal = document.getElementById('addressModal');
        const closeAddress = document.getElementById('closeAddress');
        const submitAddressBtn = document.getElementById('submitAddress');
        const addressSuccess = document.getElementById('addressSuccess');
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
            
            // Mobile menu toggle
            mobileMenuBtn.addEventListener('click', function() {
                navMenu.classList.toggle('active');
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
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                });
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                    navMenu.classList.remove('active');
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
            
            // Checkout button - Now shows address form
            checkoutBtn.addEventListener('click', function() {
                if (cart.length > 0) {
                    cartModal.classList.remove('active');
                    addressModal.classList.add('active');
                }
            });
            
            // Close address modal
            closeAddress.addEventListener('click', function() {
                addressModal.classList.remove('active');
            });
            
            // Submit address form
            submitAddressBtn.addEventListener('click', function() {
                const firstName = document.getElementById('firstName').value;
                const lastName = document.getElementById('lastName').value;
                const phone = document.getElementById('phoneNumber').value;
                const email = document.getElementById('emailAddress').value;
                const state = document.getElementById('state').value;
                const postalCode = document.getElementById('postalCode').value;
                const address = document.getElementById('address').value;
                
                if (!firstName || !lastName || !phone || !email || !state || !postalCode || !address) {
                    alert('Please fill in all required fields.');
                    return;
                }
                
                // Validate email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address.');
                    return;
                }
                
                // Validate phone (basic)
                if (phone.length < 10) {
                    alert('Please enter a valid phone number.');
                    return;
                }
                
                // Show success message
                addressSuccess.classList.add('active');
                
                // Clear cart and form after successful submission
                setTimeout(function() {
                    addressSuccess.classList.remove('active');
                    addressModal.classList.remove('active');
                    
                    // Reset form
                    document.getElementById('firstName').value = '';
                    document.getElementById('lastName').value = '';
                    document.getElementById('phoneNumber').value = '';
                    document.getElementById('emailAddress').value = '';
                    document.getElementById('state').value = '';
                    document.getElementById('postalCode').value = '';
                    document.getElementById('address').value = '';
                    document.getElementById('additionalNotes').value = '';
                    
                    // Clear cart
                    cart = [];
                    cartCount = 0;
                    cartTotal = 0;
                    updateCartDisplay();
                    
                    // Show order confirmation
                    alert(`Thank you ${firstName}! Your order has been placed successfully.\nWe'll contact you at ${phone} for delivery updates.`);
                }, 3000);
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
                
                reviewSuccess.classList.add('active');
                document.getElementById('reviewName').value = '';
                document.getElementById('reviewRating').value = '3';
                document.getElementById('reviewText').value = '';
                
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
                
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address.');
                    return;
                }
                
                contactSuccess.classList.add('active');
                document.getElementById('contactName').value = '';
                document.getElementById('contactEmail').value = '';
                document.getElementById('contactMessage').value = '';
                
                setTimeout(function() {
                    contactSuccess.classList.remove('active');
                }, 5000);
            });
            
            // FAQ accordion functionality
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                question.addEventListener('click', function() {
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
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
 