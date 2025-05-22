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
    displayCampaigns(); // Ensure campaigns are displayed when viewing the section
}

// Returns to the dashboard from the campaign section
function backToDashboard() {
    document.getElementById('campaigns').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
}

// Handles the creation of a new campaign
function handleCreateCampaign() {
    const campaignName = document.getElementById('campaignName').value;
    const productPromoted = document.getElementById('productPromoted').value;
    const affiliateLink = document.getElementById('affiliateLink').value;
    const campaignStartDate = document.getElementById('campaignStartDate').value;

    if (!campaignName || !productPromoted || !affiliateLink || !campaignStartDate) {
        alert("All fields are required!");
        return;
    }

    const campaign = {
        id: Date.now(),
        name: campaignName,
        product: productPromoted,
        link: affiliateLink,
        startDate: campaignStartDate
    };

    let campaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
    campaigns.push(campaign);
    localStorage.setItem('campaigns', JSON.stringify(campaigns));

    displayCampaigns();

    // Clear form fields
    document.getElementById('createCampaignForm').reset();
}

// Displays campaigns in the UI
function displayCampaigns() {
    const campaignListContainer = document.getElementById('campaignListContainer');
    const campaigns = JSON.parse(localStorage.getItem('campaigns')) || [];

    campaignListContainer.innerHTML = ''; // Clear previous content

    if (campaigns.length === 0) {
        campaignListContainer.innerHTML = '<p>No campaigns created yet.</p>';
        return;
    }

    const ul = document.createElement('ul');
    campaigns.forEach(campaign => {
        const li = document.createElement('li');
        li.style.border = "1px solid #ccc";
        li.style.padding = "10px";
        li.style.marginBottom = "10px";

        const nameEl = document.createElement('h4');
        nameEl.textContent = campaign.name;

        const productEl = document.createElement('p');
        productEl.textContent = `Product: ${campaign.product}`;

        const linkEl = document.createElement('p');
        const a = document.createElement('a');
        a.href = campaign.link;
        a.textContent = campaign.link;
        a.target = "_blank"; // Open link in new tab
        linkEl.appendChild(document.createTextNode('Link: '));
        linkEl.appendChild(a);

        const startDateEl = document.createElement('p');
        startDateEl.textContent = `Start Date: ${campaign.startDate}`;

        li.appendChild(nameEl);
        li.appendChild(productEl);
        li.appendChild(linkEl);
        li.appendChild(startDateEl);
        ul.appendChild(li);
    });
    campaignListContainer.appendChild(ul);
}
