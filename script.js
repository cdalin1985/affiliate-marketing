// Handles the onboarding process
function startOnboarding() {
    document.getElementById('onboarding').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    alert('Onboarding complete! Welcome to your dashboard.');
}

// Displays the campaign management section
function viewCampaigns() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('campaigns').style.display = 'block';
}

// Returns to the dashboard from the campaign section
function backToDashboard() {
    document.getElementById('campaigns').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
}
