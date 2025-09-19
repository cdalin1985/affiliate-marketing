/**
 * ProfitPilot Affiliate Marketing Application
 * Enhanced with modern JavaScript practices and improved UX
 */

// Application state management
class AppState {
    constructor() {
        this.currentView = 'onboarding';
        this.user = null;
    }
    
    setView(viewName) {
        this.currentView = viewName;
        this.hideAllSections();
        this.showSection(viewName);
    }
    
    hideAllSections() {
        const sections = ['onboarding', 'dashboard', 'campaigns'];
        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) {
                element.style.display = 'none';
            }
        });
    }
    
    showSection(sectionName) {
        const element = document.getElementById(sectionName);
        if (element) {
            element.style.display = 'block';
            element.style.opacity = '0';
            
            // Smooth fade-in animation
            setTimeout(() => {
                element.style.transition = 'opacity 0.3s ease-in-out';
                element.style.opacity = '1';
            }, 10);
        }
    }
}

// Toast notification system
class ToastNotification {
    static show(message, type = 'info') {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        toast.innerHTML = `
            <span class="toast-message">${message}</span>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `;
        
        document.body.appendChild(toast);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 5000);
    }
}

// Initialize application
const app = new AppState();

// Enhanced event handlers with error handling and validation
function startOnboarding() {
    try {
        app.setView('dashboard');
        ToastNotification.show('Onboarding complete! Welcome to your dashboard.', 'success');
        
        // Save user preference
        localStorage.setItem('profitpilot_onboarded', 'true');
    } catch (error) {
        console.error('Error during onboarding:', error);
        ToastNotification.show('An error occurred during onboarding. Please try again.', 'error');
    }
}

function viewCampaigns() {
    try {
        app.setView('campaigns');
        displayCampaigns();
        ToastNotification.show('Campaign management loaded successfully.', 'info');
    } catch (error) {
        console.error('Error loading campaigns:', error);
        ToastNotification.show('Failed to load campaigns. Please try again.', 'error');
    }
}

function backToDashboard() {
    try {
        app.setView('dashboard');
        updateDashboardStats();
    } catch (error) {
        console.error('Error returning to dashboard:', error);
        ToastNotification.show('Failed to return to dashboard. Please try again.', 'error');
    }
}

// DOM Content Loaded event listener
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Set up event listeners for better security
        const startBtn = document.getElementById('start-onboarding-btn');
        const viewCampaignsBtn = document.getElementById('view-campaigns-btn');
        const backBtn = document.getElementById('back-to-dashboard-btn');
        const createCampaignBtn = document.getElementById('create-campaign-btn');
        
        if (startBtn) {
            startBtn.addEventListener('click', startOnboarding);
        }
        
        if (viewCampaignsBtn) {
            viewCampaignsBtn.addEventListener('click', viewCampaigns);
        }
        
        if (backBtn) {
            backBtn.addEventListener('click', backToDashboard);
        }
        
        if (createCampaignBtn) {
            createCampaignBtn.addEventListener('click', createCampaign);
        }
        
        // Check if user has already completed onboarding
        if (localStorage.getItem('profitpilot_onboarded') === 'true') {
            app.setView('dashboard');
            updateDashboardStats();
        }
        
        // Initialize mock data if not exists
        initializeMockData();
        
        console.log('ProfitPilot application initialized successfully');
    } catch (error) {
        console.error('Error initializing application:', error);
        ToastNotification.show('Application failed to initialize properly.', 'error');
    }
});

// Mock data management
function initializeMockData() {
    if (!localStorage.getItem('profitpilot_campaigns')) {
        const mockCampaigns = [
            {
                id: 1,
                name: 'Tech Gadgets Promotion',
                status: 'active',
                revenue: 1250.00,
                conversions: 25,
                created: new Date().toISOString()
            },
            {
                id: 2,
                name: 'Health & Wellness',
                status: 'paused',
                revenue: 850.50,
                conversions: 17,
                created: new Date().toISOString()
            }
        ];
        localStorage.setItem('profitpilot_campaigns', JSON.stringify(mockCampaigns));
    }
}

// Dashboard functionality
function updateDashboardStats() {
    try {
        const campaigns = JSON.parse(localStorage.getItem('profitpilot_campaigns') || '[]');
        const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
        const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
        const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
        const conversionRate = totalConversions > 0 ? (totalConversions / 10).toFixed(1) : 0; // Assuming 10 visitors per conversion for demo
        
        // Update DOM elements with animation
        animateNumber('active-campaigns', activeCampaigns);
        animateNumber('total-revenue', totalRevenue, true);
        animateNumber('conversion-rate', conversionRate, false, true);
        
    } catch (error) {
        console.error('Error updating dashboard stats:', error);
    }
}

// Animate number changes
function animateNumber(elementId, targetValue, isCurrency = false, isPercentage = false) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const startValue = 0;
    const duration = 1000;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (targetValue - startValue) * easeOutCubic;
        
        let displayValue;
        if (isCurrency) {
            displayValue = '$' + currentValue.toFixed(2);
        } else if (isPercentage) {
            displayValue = currentValue.toFixed(1) + '%';
        } else {
            displayValue = Math.floor(currentValue).toString();
        }
        
        element.textContent = displayValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Campaign management functions
function createCampaign() {
    try {
        const campaignName = prompt('Enter campaign name:');
        if (!campaignName || campaignName.trim() === '') {
            ToastNotification.show('Campaign name is required.', 'error');
            return;
        }
        
        const campaigns = JSON.parse(localStorage.getItem('profitpilot_campaigns') || '[]');
        const newCampaign = {
            id: Date.now(),
            name: campaignName.trim(),
            status: 'active',
            revenue: 0,
            conversions: 0,
            created: new Date().toISOString()
        };
        
        campaigns.push(newCampaign);
        localStorage.setItem('profitpilot_campaigns', JSON.stringify(campaigns));
        
        ToastNotification.show(`Campaign "${campaignName}" created successfully!`, 'success');
        displayCampaigns();
        
    } catch (error) {
        console.error('Error creating campaign:', error);
        ToastNotification.show('Failed to create campaign. Please try again.', 'error');
    }
}

function displayCampaigns() {
    try {
        const campaigns = JSON.parse(localStorage.getItem('profitpilot_campaigns') || '[]');
        const container = document.getElementById('campaigns-container');
        
        if (campaigns.length === 0) {
            container.innerHTML = '<p class="empty-state">No campaigns yet. Create your first campaign to get started!</p>';
            return;
        }
        
        const campaignsHTML = campaigns.map(campaign => `
            <div class="campaign-card" data-campaign-id="${campaign.id}">
                <div class="campaign-header">
                    <h3>${escapeHtml(campaign.name)}</h3>
                    <span class="campaign-status status-${campaign.status}">${campaign.status}</span>
                </div>
                <div class="campaign-stats">
                    <div class="campaign-stat">
                        <span class="stat-label">Revenue:</span>
                        <span class="stat-value">$${campaign.revenue.toFixed(2)}</span>
                    </div>
                    <div class="campaign-stat">
                        <span class="stat-label">Conversions:</span>
                        <span class="stat-value">${campaign.conversions}</span>
                    </div>
                </div>
                <div class="campaign-actions">
                    <button class="tertiary-button" onclick="toggleCampaignStatus(${campaign.id})">
                        ${campaign.status === 'active' ? 'Pause' : 'Activate'}
                    </button>
                    <button class="secondary-button" onclick="deleteCampaign(${campaign.id})">
                        Delete
                    </button>
                </div>
            </div>
        `).join('');
        
        container.innerHTML = campaignsHTML;
        
    } catch (error) {
        console.error('Error displaying campaigns:', error);
        ToastNotification.show('Failed to load campaigns.', 'error');
    }
}

// Campaign management utilities
function toggleCampaignStatus(campaignId) {
    try {
        const campaigns = JSON.parse(localStorage.getItem('profitpilot_campaigns') || '[]');
        const campaign = campaigns.find(c => c.id === campaignId);
        
        if (campaign) {
            campaign.status = campaign.status === 'active' ? 'paused' : 'active';
            localStorage.setItem('profitpilot_campaigns', JSON.stringify(campaigns));
            
            ToastNotification.show(`Campaign ${campaign.status === 'active' ? 'activated' : 'paused'} successfully.`, 'success');
            displayCampaigns();
        }
    } catch (error) {
        console.error('Error toggling campaign status:', error);
        ToastNotification.show('Failed to update campaign status.', 'error');
    }
}

function deleteCampaign(campaignId) {
    try {
        if (!confirm('Are you sure you want to delete this campaign? This action cannot be undone.')) {
            return;
        }
        
        const campaigns = JSON.parse(localStorage.getItem('profitpilot_campaigns') || '[]');
        const filteredCampaigns = campaigns.filter(c => c.id !== campaignId);
        
        localStorage.setItem('profitpilot_campaigns', JSON.stringify(filteredCampaigns));
        
        ToastNotification.show('Campaign deleted successfully.', 'success');
        displayCampaigns();
        
    } catch (error) {
        console.error('Error deleting campaign:', error);
        ToastNotification.show('Failed to delete campaign.', 'error');
    }
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
