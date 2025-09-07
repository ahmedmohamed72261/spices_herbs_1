// Static content updater for Kingdom Spices Herbs - Team Page
document.addEventListener('DOMContentLoaded', function() {
    // Update team description
    const teamDescriptions = document.querySelectorAll('.team-content p, .team-section p');
    
    teamDescriptions.forEach(element => {
        element.textContent = 'From soil scientists to QA managers and export documentation leads, our people are trained to anticipate risk and deliver repeatable excellence—every shipment, every time.';
    });
});