/**
 * Utility functions for product rendering and manipulation
 */

const ProductUtils = {
    /**
     * Render featured products in the index page
     * @param {Array} products - Array of products to display
     * @param {number} limit - Maximum number of products to display
     */
    renderFeaturedProducts: function(products, limit = 6) {
        const container = document.querySelector('.case-slider');
        if (!container) return;
        
        // Clear existing content
        container.innerHTML = '';
        
        // Get limited products
        const displayProducts = products.slice(0, limit);
        
        // Create HTML for each product
        displayProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'case-item';
            productElement.innerHTML = `
                <div class="case-img">
                    <img class="img-fluid" src="${product.image}" alt="${product.name}">
                    <a class="popup-img case-link" href="${product.image}"> <i class="far fa-plus"></i></a>
                </div>
                <div class="case-content">
                    <div class="case-content-info">
                        <small>${product.category.name}</small>
                        <h4><a href="product-details.html?id=${product._id}">${product.name}</a></h4>
                    </div>
                    <a href="product-details.html?id=${product._id}" class="case-arrow"><i class="far fa-arrow-right"></i></a>
                </div>
            `;
            container.appendChild(productElement);
        });
        
        // Initialize owl carousel
        $(container).owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: true,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });
    },
    
    /**
     * Add "View All Products" button after featured products
     */
    addViewAllProductsButton: function() {
        const container = document.querySelector('.case-area .container');
        if (!container) return;
        
        const buttonRow = document.createElement('div');
        buttonRow.className = 'row mt-5';
        buttonRow.innerHTML = `
            <div class="col-12 text-center">
                <a href="products.html" class="theme-btn">View All Products <i class="far fa-arrow-right"></i></a>
            </div>
        `;
        container.appendChild(buttonRow);
    },
    
    /**
     * Show skeleton loading for products
     * @param {HTMLElement} container - Container element
     * @param {number} count - Number of skeleton items to show
     */
    showProductsSkeletonLoading: function(container, count = 6) {
        if (!container) return;
        
        // Clear existing content
        container.innerHTML = '';
        
        // Create skeleton items
        for (let i = 0; i < count; i++) {
            const skeletonItem = document.createElement('div');
            skeletonItem.className = 'col-xl-4 col-lg-6 mb-4';
            skeletonItem.innerHTML = `
                <div class="skeleton-item">
                    <div class="skeleton-image"></div>
                    <div class="p-3">
                        <div class="skeleton-text"></div>
                        <div class="skeleton-title"></div>
                    </div>
                </div>
            `;
            container.appendChild(skeletonItem);
        }
    },
    
    /**
     * Render products in the products page
     * @param {Array} products - Array of products to display
     */
    renderProducts: function(products) {
        const container = document.querySelector('.case-area .container .row:not(.filter-row)');
        if (!container) return;
        
        // Clear existing content
        container.innerHTML = '';
        
        if (products.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center">
                    <h3>No products found</h3>
                </div>
            `;
            return;
        }
        
        // Create HTML for each product
        products.forEach(product => {
            const productCol = document.createElement('div');
            productCol.className = 'col-md-6 col-lg-4';
            productCol.innerHTML = `
                <div class="case-item">
                    <div class="case-img">
                        <img class="img-fluid" src="${product.image}" alt="${product.name}">
                        <a class="popup-img case-link" href="${product.image}"> <i class="far fa-plus"></i></a>
                    </div>
                    <div class="case-content">
                        <div class="case-content-info">
                            <small>${product.category.name}</small>
                            <h4><a href="product-details.html?id=${product._id}">${product.name}</a></h4>
                        </div>
                        <a href="product-details.html?id=${product._id}" class="case-arrow"><i class="far fa-arrow-right"></i></a>
                    </div>
                </div>
            `;
            container.appendChild(productCol);
        });
    },
    
    /**
     * Render category filters in the products page
     * @param {Array} categories - Array of categories
     * @param {Function} filterCallback - Callback function when filter is clicked
     */
    renderCategoryFilters: function(categories, filterCallback) {
        const container = document.querySelector('.case-area .container');
        if (!container) return;
        
        // Create filter row
        const filterRow = document.createElement('div');
        filterRow.className = 'row filter-row mb-5';
        
        // Create filter container
        const filterContainer = document.createElement('div');
        filterContainer.className = 'col-12 text-center';
        
        // Create filter buttons
        let filterHTML = `<button class="theme-btn mb-2 me-2 filter-btn active" data-category="all">All</button>`;
        
        categories.forEach(category => {
            filterHTML += `
                <button class="theme-btn mb-2 me-2 filter-btn" data-category="${category._id}">
                    ${category.name} (${category.productCount})
                </button>
            `;
        });
        
        filterContainer.innerHTML = filterHTML;
        filterRow.appendChild(filterContainer);
        
        // Insert filter row at the beginning of the container
        container.insertBefore(filterRow, container.firstChild);
        
        // Add event listeners to filter buttons
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Call filter callback
                const categoryId = this.getAttribute('data-category');
                filterCallback(categoryId);
            });
        });
    },
    
    /**
     * Render product details in the product details page
     * @param {Object} product - Product object
     */
    renderProductDetails: function(product) {
        if (!product) {
            document.querySelector('.case-single-area').innerHTML = `
                <div class="container">
                    <div class="row">
                        <div class="col-12 text-center">
                            <h3>Product not found</h3>
                            <a href="products.html" class="theme-btn mt-4">Back to Products</a>
                        </div>
                    </div>
                </div>
            `;
            return;
        }
        
        // Update breadcrumb title
        const breadcrumbTitle = document.querySelector('.breadcrumb-title');
        if (breadcrumbTitle) {
            breadcrumbTitle.textContent = product.name;
        }
        
        // Update breadcrumb menu
        const breadcrumbMenu = document.querySelector('.breadcrumb-menu');
        if (breadcrumbMenu) {
            breadcrumbMenu.innerHTML = `
                <li><a href="index.html">Home</a></li>
                <li><a href="products.html">Products</a></li>
                <li class="active">${product.name}</li>
            `;
        }
        
        // Update sidebar content
        const sidebarContent = document.querySelector('.case-sidebar-content ul');
        if (sidebarContent) {
            sidebarContent.innerHTML = `
                <li>
                    Category <span>${product.category.name}</span>
                </li>
                <li>
                    Date <span>${ApiService.formatDate(product.createdAt)}</span>
                </li>
            `;
        }
        
        // Update main content
        const caseDetailsImg = document.querySelector('.case-details-img');
        if (caseDetailsImg) {
            caseDetailsImg.innerHTML = `<img src="${product.image}" alt="${product.name}">`;
        }
        
        // Update title and description
        const caseDetails = document.querySelector('.case-details');
        if (caseDetails) {
            const titleElement = caseDetails.querySelector('h3');
            if (titleElement) {
                titleElement.textContent = product.name;
            }
            
            const paragraphs = caseDetails.querySelectorAll('p');
            if (paragraphs.length > 0) {
                paragraphs[0].innerHTML = product.description.replace(/\r\n/g, '<br>');
                
                // Add share button after the first paragraph
                const shareButton = document.createElement('div');
                shareButton.className = 'share-button mt-4 mb-4';
                shareButton.innerHTML = `
                    <button class="theme-btn" id="share-button">
                        <i class="far fa-share-alt"></i> Share Product
                    </button>
                `;
                paragraphs[0].after(shareButton);
                
                // Add event listener to share button
                document.getElementById('share-button').addEventListener('click', function() {
                    const url = window.location.href;
                    navigator.clipboard.writeText(url).then(() => {
                        alert('Product link copied to clipboard!');
                    }).catch(err => {
                        console.error('Could not copy text: ', err);
                    });
                });
            }
        }
    }
};