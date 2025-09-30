/**
 * ProfitPilot - Modern Affiliate Marketing Platform
 * Modernized with ES6+, event listeners, and component-based architecture
 */

// Application State Management
const AppState = {
  currentView: 'onboarding',
  views: {
    ONBOARDING: 'onboarding',
    DASHBOARD: 'dashboard',
    CAMPAIGNS: 'campaigns'
  }
};

// Toast Notification System (replaces alert())
class ToastNotification {
  static show(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

// View Navigation Controller
class NavigationController {
  static navigateTo(viewName) {
    // Hide all sections
    Object.values(AppState.views).forEach(view => {
      const section = document.getElementById(view);
      if (section) {
        section.classList.remove('active');
        section.setAttribute('aria-hidden', 'true');
      }
    });
    
    // Show target section with animation
    const targetSection = document.getElementById(viewName);
    if (targetSection) {
      targetSection.classList.add('active');
      targetSection.setAttribute('aria-hidden', 'false');
      AppState.currentView = viewName;
    }
  }
}

// Event Handlers (using modern arrow functions)
const handleStartOnboarding = () => {
  NavigationController.navigateTo(AppState.views.DASHBOARD);
  ToastNotification.show('🎉 Onboarding complete! Welcome to your dashboard.', 'success');
};

const handleViewCampaigns = () => {
  NavigationController.navigateTo(AppState.views.CAMPAIGNS);
  ToastNotification.show('📊 Loading campaigns...', 'info');
};

const handleBackToDashboard = () => {
  NavigationController.navigateTo(AppState.views.DASHBOARD);
};

// Initialize Application
const initializeApp = () => {
  // Setup event listeners (no more inline onclick!)
  const onboardingBtn = document.querySelector('#onboarding button');
  const viewCampaignsBtn = document.querySelector('#dashboard button');
  const backBtn = document.querySelector('#campaigns button');
  
  if (onboardingBtn) {
    onboardingBtn.addEventListener('click', handleStartOnboarding);
  }
  
  if (viewCampaignsBtn) {
    viewCampaignsBtn.addEventListener('click', handleViewCampaigns);
  }
  
  if (backBtn) {
    backBtn.addEventListener('click', handleBackToDashboard);
  }
  
  // Set initial view
  NavigationController.navigateTo(AppState.views.ONBOARDING);
  
  console.log('✅ ProfitPilot initialized successfully');
};

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
