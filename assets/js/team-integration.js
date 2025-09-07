/**
 * Team Integration Script
 * This script fetches team member data from the API and dynamically populates the team page
 */

/**
 * Shows skeleton loading for team members
 * @param {HTMLElement} container - Container element
 * @param {number} count - Number of skeleton items to show
 */
function showTeamSkeletonLoading(container, count = 8) {
    if (!container) return;
    
    // Clear existing content
    container.innerHTML = '';
    
    // Create skeleton items
    for (let i = 0; i < count; i++) {
        const skeletonItem = document.createElement('div');
        skeletonItem.className = 'col-xl-3 col-lg-4 col-md-6 mb-4';
        skeletonItem.innerHTML = `
            <div class="skeleton-item">
                <div class="skeleton-image skeleton-circle"></div>
                <div class="p-3 text-center">
                    <div class="skeleton-title"></div>
                    <div class="skeleton-text"></div>
                </div>
            </div>
        `;
        container.appendChild(skeletonItem);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Get the container where team member items will be displayed
    const teamContainer = document.querySelector('.team-items');
    
    if (!teamContainer) {
        console.error('Team container not found');
        return;
    }
    
    // Show skeleton loading for team members
    showTeamSkeletonLoading(teamContainer, 8);
    
    // Fetch team data
    ApiService.getTeam()
        .then(response => {
            if (response.success && response.data && response.data.length > 0) {
                // Clear loading message
                teamContainer.innerHTML = '';
                
                // Populate team members
                response.data.forEach(member => {
                    const teamMemberItem = createTeamMemberItem(member);
                    teamContainer.appendChild(teamMemberItem);
                });
            } else {
                teamContainer.innerHTML = '<div class="col-12 text-center"><p>No team members found</p></div>';
            }
        })
        .catch(error => {
            console.error('Error fetching team members:', error);
            teamContainer.innerHTML = '<div class="col-12 text-center"><p>Failed to load team members</p></div>';
        });
});

/**
 * Creates a team member item element
 * @param {Object} member - The team member data
 * @returns {HTMLElement} - The team member item element
 */
function createTeamMemberItem(member) {
    const teamMemberItem = document.createElement('div');
    teamMemberItem.className = 'col-xl-3 col-lg-4 col-md-6';
    
    teamMemberItem.innerHTML = `
        <div class="team-item">
            <div class="team-img">
                <img src="${member.image}" style="height:400px; width:100%;" alt="${member.name}">
                <div class="team-social">
                    <a href="mailto:${member.email}" title="Email"><i class="far fa-envelope"></i></a>
                    <a href="tel:${member.phone}" title="Phone"><i class="far fa-phone"></i></a>
                    <a href="https://wa.me/${member.whatsapp.replace(/[^0-9]/g, '')}" title="WhatsApp" target="_blank"><i class="fab fa-whatsapp"></i></a>
                </div>
            </div>
            <div class="team-content">
                <h5><a href="javascript:void(0);">${member.name}</a></h5>
                <span>${member.position}</span>
            </div>
        </div>
    `;
    
    return teamMemberItem;
}