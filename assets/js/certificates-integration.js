/**
 * Certificates Integration Script
 * This script fetches certificate data from the API and dynamically populates the certificates page
 */

/**
 * Shows skeleton loading for certificates
 * @param {HTMLElement} container - Container element
 * @param {number} count - Number of skeleton items to show
 */
function showCertificatesSkeletonLoading(container, count = 6) {
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
                </div>
            </div>
        `;
        container.appendChild(skeletonItem);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Get the container where certificate items will be displayed
    const certificatesContainer = document.querySelector('.case-items');
    
    if (!certificatesContainer) {
        console.error('Certificates container not found');
        return;
    }
    
    // Show skeleton loading for certificates
    showCertificatesSkeletonLoading(certificatesContainer, 6);
    
    // Fetch certificates data
    ApiService.getCertificates()
        .then(response => {
            if (response.success && response.data && response.data.length > 0) {
                // Clear loading message
                certificatesContainer.innerHTML = '';
                
                // Populate certificates
                response.data.forEach(certificate => {
                    const certificateItem = createCertificateItem(certificate);
                    certificatesContainer.appendChild(certificateItem);
                });
                
                // Initialize Magnific Popup for certificate images
                initializeMagnificPopup();
            } else {
                certificatesContainer.innerHTML = '<div class="col-12 text-center"><p>No certificates found</p></div>';
            }
        })
        .catch(error => {
            console.error('Error fetching certificates:', error);
            certificatesContainer.innerHTML = '<div class="col-12 text-center"><p>Failed to load certificates</p></div>';
        });
});

/**
 * Creates a certificate item element
 * @param {Object} certificate - The certificate data
 * @returns {HTMLElement} - The certificate item element
 */
function createCertificateItem(certificate) {
    const certificateItem = document.createElement('div');
    certificateItem.className = 'col-xl-4 col-lg-6';
    
    certificateItem.innerHTML = `
        <div class="case-item  w-100 h-100 p-0">
            <div class="case-img w-100 d-flex position-relative" style="height:500px;">
                <img src="${certificate.image}" class="w-100 h-100" alt="${certificate.name}">
            </div>
            <div class="case-content">
                <div class="case-content-info">
                    <span>${certificate.category || 'Certificate'}</span>
                    <h5><a href="javascript:void(0);">${certificate.name}</a></h5>
                </div>
                <div class="case-details-btn">
                    <a href="javascript:void(0);" class="theme-btn" onclick="showCertificateDetails('${certificate._id}')">Details <i class="far fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
    `;
    
    return certificateItem;
}

/**
 * Initializes Magnific Popup for certificate images
 */
function initializeMagnificPopup() {
    if ($.magnificPopup) {
        $('.popup-img').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }
}

/**
 * Shows certificate details in a modal
 * @param {string} certificateId - The ID of the certificate to show details for
 */
function showCertificateDetails(certificateId) {
    // Find the certificate in the data
    ApiService.getCertificates()
        .then(response => {
            if (response.success && response.data) {
                const certificate = response.data.find(cert => cert._id === certificateId);
                
                if (certificate) {
                    // Create modal content
                    const modalContent = `
                        <div class="modal fade" id="certificateModal" tabindex="-1" aria-labelledby="certificateModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="certificateModalLabel">${certificate.name}</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <img src="${certificate.image}" alt="${certificate.name}" class="img-fluid">
                                            </div>
                                            <div class="col-md-6">
                                                <h5>Description</h5>
                                                <p>${certificate.description}</p>
                                                <p><strong>Category:</strong> ${certificate.category || 'N/A'}</p>
                                                <p><strong>Date:</strong> ${new Date(certificate.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    // Remove existing modal if any
                    const existingModal = document.getElementById('certificateModal');
                    if (existingModal) {
                        existingModal.remove();
                    }
                    
                    // Append modal to body
                    document.body.insertAdjacentHTML('beforeend', modalContent);
                    
                    // Show modal
                    const modal = new bootstrap.Modal(document.getElementById('certificateModal'));
                    modal.show();
                } else {
                    console.error('Certificate not found');
                }
            }
        })
        .catch(error => {
            console.error('Error fetching certificate details:', error);
        });
}