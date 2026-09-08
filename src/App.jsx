import React, { useState } from 'react';
import Navbar from './components/Navbar';
import NotificationToast from './components/NotificationToast';
import LandingPage from './pages/LandingPage';
import DonorDashboard from './pages/DonorDashboard';
import NgoDashboard from './pages/NgoDashboard';
import TrackingPage from './pages/TrackingPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DonateModal from './pages/DonateModal';

let evtCounter = 0;
const nextEvtId = () => `evt_${Date.now()}_${(evtCounter++).toString(36)}`;

// Monday-first weekday index for grouping the weekly donation-volume chart.
const weekdayIndex = (date = new Date()) => (date.getDay() + 6) % 7;

export default function App() {
  // Navigation & User State
  const [currentPage, setCurrentPage] = useState('landing');
  const [currentUser, setCurrentUser] = useState(null); // null = guest, not logged in
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [trackingDonationId, setTrackingDonationId] = useState(null);

  // Live Toast Notification
  const [notification, setNotification] = useState(null);

  // Live activity feed, newest first — powers the Admin "Live Feed" panel
  const [eventLog, setEventLog] = useState([
    { id: nextEvtId(), time: new Date(Date.now() - 1000 * 60 * 9), title: 'Food donation created', message: 'Artisan Bakery Bread & Bagels posted by Bread & Butter Co.', type: 'success' },
    { id: nextEvtId(), time: new Date(Date.now() - 1000 * 60 * 6), title: 'NGO matched', message: 'Hope Foundation matched with Vegetable Biryani & Salads', type: 'info' },
    { id: nextEvtId(), time: new Date(Date.now() - 1000 * 60 * 3), title: 'Donation claimed', message: 'St. Jude Youth Center reserved Artisan Bakery Bread & Bagels', type: 'status' },
    { id: nextEvtId(), time: new Date(Date.now() - 1000 * 60 * 1), title: 'Pickup completed', message: 'Artisan Bakery Bread & Bagels marked DELIVERED', type: 'success' },
  ]);

  const addEvent = (title, message, type = 'info') => {
    setEventLog(prev => [{ id: nextEvtId(), time: new Date(), title, message, type }, ...prev].slice(0, 40));
  };

  // Microservices Status (for the killer presentation failure demonstration)
  const [servicesHealth, setServicesHealth] = useState({
    apiGateway: true,
    userService: true,
    foodService: true,
    matchingService: true,
    notificationService: true,
    redis: true,
    mongodb: true
  });

  // Running counter of every donation ever created (survives deletion) so
  // the Admin "Total Donations" stat reflects lifetime activity, not just
  // what's currently in the list.
  const [totalDonationsEver, setTotalDonationsEver] = useState(1244);

  // Central Donations State
  const [donations, setDonations] = useState([
    {
      id: 'FL1024',
      name: 'Vegetable Biryani & Salads',
      quantity: 35,
      foodType: 'Vegetarian',
      location: 'Grand Ballroom, Midtown Center',
      distanceKm: 2.1,
      availableUntil: '08:30 PM',
      status: 'PICKUP',
      donorName: 'Chaitali\u2019s Banquet',
      claimedBy: 'Hope Foundation',
      matchedNgo: 'Hope Foundation',
      matchedKm: 2.4,
      createdAt: '12:41 PM',
      weekday: 4,
    },
    {
      id: 'FL1025',
      name: 'Fresh Sandwiches & Wraps',
      quantity: 20,
      foodType: 'Vegetarian',
      location: 'Tech Hub Cafeteria, Floor 4',
      distanceKm: 3.1,
      availableUntil: '09:00 PM',
      status: 'AVAILABLE',
      donorName: 'Tech Park Dining',
      claimedBy: null,
      matchedNgo: 'City Shelter Outreach',
      matchedKm: 1.8,
      createdAt: '01:15 PM',
      weekday: 1,
    },
    {
      id: 'FL1026',
      name: 'Steamed Basmati Rice & Lentils',
      quantity: 40,
      foodType: 'Vegetarian',
      location: 'Greenwood Community Hall',
      distanceKm: 4.5,
      availableUntil: '10:00 PM',
      status: 'AVAILABLE',
      donorName: 'Sunrise Events',
      claimedBy: null,
      matchedNgo: 'Hunger Relief Alliance',
      matchedKm: 2.9,
      createdAt: '01:45 PM',
      weekday: 2,
    },
    {
      id: 'FL1023',
      name: 'Artisan Bakery Bread & Bagels',
      quantity: 50,
      foodType: 'Vegetarian',
      location: 'Main Street Bakery',
      distanceKm: 1.2,
      availableUntil: '07:00 PM',
      status: 'DELIVERED',
      donorName: 'Bread & Butter Co.',
      claimedBy: 'St. Jude Youth Center',
      matchedNgo: 'St. Jude Youth Center',
      matchedKm: 1.1,
      createdAt: '11:20 AM',
      weekday: 0,
    }
  ]);

  // Handle new donation creation
  const handleCreateDonation = (newDonation) => {
    const withMeta = { weekday: weekdayIndex(), ...newDonation };
    setDonations(prev => [withMeta, ...prev]);
    setTotalDonationsEver(prev => prev + 1);
    addEvent('Food donation created', `${newDonation.quantity} meals of ${newDonation.name} posted by ${newDonation.donorName || 'a donor'}.`, 'success');

    if (servicesHealth.notificationService) {
      setNotification({
        title: 'New Food Donation Created! \ud83c\udf71',
        message: `${newDonation.quantity} meals of ${newDonation.name} posted. Matched with ${newDonation.matchedNgo}!`,
        type: 'success'
      });
    } else {
      console.warn('[Microservice Isolated] Notification Service is DOWN. Event queued in Redis, UI notification bypassed.');
    }
  };

  // Handle donor/admin deleting a donation
  const handleDeleteDonation = (donationId) => {
    const target = donations.find(d => d.id === donationId);
    setDonations(prev => prev.filter(item => item.id !== donationId));
    addEvent('Donation removed', `${target?.name || 'A donation'} (${donationId}) was deleted from the network.`, 'warning');
    setNotification({
      title: 'Donation Deleted',
      message: `${target?.name || 'The donation'} was removed from active listings.`,
      type: 'warning'
    });
  };

  // Handle NGO claiming food
  const handleClaimFood = (donationId) => {
    const target = donations.find(d => d.id === donationId);
    setDonations(prev => prev.map(item => {
      if (item.id === donationId) {
        return { ...item, status: 'CLAIMED', claimedBy: currentUser?.name || 'Hope Foundation' };
      }
      return item;
    }));

    addEvent('Donation claimed', `${currentUser?.name || 'An NGO'} reserved ${target?.name || `donation ${donationId}`} for pickup.`, 'status');

    if (servicesHealth.notificationService) {
      setNotification({
        title: 'Food Donation Claimed! \ud83e\udd1d',
        message: `Donation ${donationId} is now reserved for pickup.`,
        type: 'info'
      });
    }
  };

  // Step advancement in Live Tracking
  const handleAdvanceStatus = (donationId, nextStatus) => {
    const target = donations.find(d => d.id === donationId);
    setDonations(prev => prev.map(item => {
      if (item.id === donationId) {
        return { ...item, status: nextStatus };
      }
      return item;
    }));

    addEvent('Order updated', `${target?.name || `Donation ${donationId}`} moved to stage ${nextStatus}.`, 'status');

    if (servicesHealth.notificationService) {
      setNotification({
        title: `Order Updated: ${nextStatus} \ud83d\ude9a`,
        message: `Donation ${donationId} moved to stage ${nextStatus}.`,
        type: 'status'
      });
    }
  };

  // Toggle Microservice Health for the killer presentation demo
  const handleToggleService = (serviceKey) => {
    setServicesHealth(prev => {
      const updated = { ...prev, [serviceKey]: !prev[serviceKey] };
      const statusLabel = updated[serviceKey] ? 'RESTORED (Healthy)' : 'STOPPED / FAILED';
      addEvent('Service state changed', `${serviceKey} is now ${statusLabel}.`, updated[serviceKey] ? 'success' : 'warning');
      setNotification({
        title: `Service State Changed`,
        message: `${serviceKey} is now ${statusLabel}`,
        type: updated[serviceKey] ? 'success' : 'warning'
      });
      return updated;
    });
  };

  // ---- Auth flow ----
  const handleLogin = (role, name, email) => {
    setCurrentUser({ id: `usr_${Date.now()}`, name, email, role });
    addEvent('User signed in', `${name} logged in as ${role}.`, 'info');
    setNotification({ title: `Welcome back, ${name}!`, message: `Signed in as ${role}.`, type: 'success' });
    if (role === 'DONOR') setCurrentPage('donor');
    else if (role === 'NGO' || role === 'VOLUNTEER') setCurrentPage('ngo');
    else setCurrentPage('admin');
  };

  const handleSignup = (role, name, email) => {
    setCurrentUser({ id: `usr_${Date.now()}`, name, email, role });
    addEvent('Account created', `${name} joined FoodLink as ${role}.`, 'success');
    setNotification({ title: 'Account created!', message: `Welcome to FoodLink, ${name}.`, type: 'success' });
    if (role === 'DONOR') setCurrentPage('donor');
    else if (role === 'NGO' || role === 'VOLUNTEER') setCurrentPage('ngo');
    else setCurrentPage('admin');
  };

  const handleLogout = () => {
    addEvent('User signed out', `${currentUser?.name || 'A user'} logged out.`, 'info');
    setCurrentUser(null);
    setCurrentPage('landing');
  };

  // Gate role-specific pages behind login; guests get bounced to /login
  const goToPage = (key) => {
    const protectedPages = ['donor', 'ngo', 'admin'];
    if (protectedPages.includes(key) && !currentUser) {
      setNotification({ title: 'Please sign in', message: 'Create an account or log in to access this page.', type: 'warning' });
      setCurrentPage('login');
      return;
    }
    setCurrentPage(key);
  };

  const requireAuthThen = (action) => {
    if (!currentUser) {
      setNotification({ title: 'Please sign in', message: 'Log in or create an account to donate food.', type: 'warning' });
      setCurrentPage('login');
      return;
    }
    action();
  };

  // Full-screen auth pages render without the standard chrome
  if (currentPage === 'login') {
    return (
      <>
        {notification && <NotificationToast notification={notification} onClose={() => setNotification(null)} />}
        <LoginPage
          onLogin={handleLogin}
          onSwitchToSignup={() => setCurrentPage('signup')}
          onBackHome={() => setCurrentPage('landing')}
        />
      </>
    );
  }

  if (currentPage === 'signup') {
    return (
      <>
        {notification && <NotificationToast notification={notification} onClose={() => setNotification(null)} />}
        <SignUpPage
          onSignup={handleSignup}
          onSwitchToLogin={() => setCurrentPage('login')}
          onBackHome={() => setCurrentPage('landing')}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      {/* Dynamic Global Notification Toast */}
      {notification && (
        <NotificationToast
          notification={notification}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={goToPage}
        currentUser={currentUser}
        onLoginClick={() => setCurrentPage('login')}
        onSignupClick={() => setCurrentPage('signup')}
        onLogout={handleLogout}
        onOpenDonate={() => requireAuthThen(() => setIsDonateOpen(true))}
        servicesHealth={servicesHealth}
      />

      {/* Main Routed Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentPage === 'landing' && (
          <LandingPage
            onGetStarted={() => setCurrentPage(currentUser ? (currentUser.role === 'DONOR' ? 'donor' : currentUser.role === 'ADMIN' ? 'admin' : 'ngo') : 'signup')}
            onDonateClick={() => requireAuthThen(() => setIsDonateOpen(true))}
            onExploreFood={() => goToPage('ngo')}
            donations={donations}
          />
        )}

        {currentPage === 'donor' && currentUser && (
          <DonorDashboard
            currentUser={currentUser}
            donations={donations}
            onOpenDonate={() => setIsDonateOpen(true)}
            onDeleteDonation={handleDeleteDonation}
            onTrackDonation={(id) => {
              setTrackingDonationId(id);
              setCurrentPage('tracking');
            }}
          />
        )}

        {currentPage === 'ngo' && currentUser && (
          <NgoDashboard
            donations={donations}
            onClaimFood={handleClaimFood}
            onTrackDonation={(id) => {
              setTrackingDonationId(id);
              setCurrentPage('tracking');
            }}
          />
        )}

        {currentPage === 'tracking' && (
          <TrackingPage
            donation={donations.find(d => d.id === trackingDonationId) || donations[0]}
            onAdvanceStatus={handleAdvanceStatus}
            onBack={() => setCurrentPage(currentUser?.role === 'DONOR' ? 'donor' : currentUser ? 'ngo' : 'landing')}
          />
        )}

        {currentPage === 'admin' && currentUser && (
          <AdminDashboard
            donations={donations}
            servicesHealth={servicesHealth}
            onToggleService={handleToggleService}
            eventLog={eventLog}
            totalDonationsEver={totalDonationsEver}
            onDeleteDonation={handleDeleteDonation}
            onSimulateNewDonation={() => {
              const surplusMeals = ['Surplus Catering Buffet Boxes', 'Leftover Wedding Feast Trays', 'Bakery Closing-Time Bundle', 'Cafeteria Overflow Meal Boxes'];
              const surplusDonors = ['Convention Catering Ltd', 'Grandview Wedding Hall', 'Sunrise Bakery Co.', 'Skyline Corporate Cafeteria'];
              const idx = Math.floor(Math.random() * surplusMeals.length);
              handleCreateDonation({
                id: `FL${Math.floor(1000 + Math.random() * 9000)}`,
                name: surplusMeals[idx],
                quantity: 20 + Math.floor(Math.random() * 40),
                foodType: 'Vegetarian',
                location: 'City Convention Center',
                distanceKm: Math.round((1 + Math.random() * 4) * 10) / 10,
                availableUntil: '11:00 PM',
                status: 'AVAILABLE',
                donorName: surplusDonors[idx],
                claimedBy: null,
                matchedNgo: 'Hope Foundation',
                matchedKm: 1.5,
                createdAt: 'Just now',
              });
            }}
          />
        )}
      </main>

      {/* Global Modals */}
      {isDonateOpen && currentUser && (
        <DonateModal
          onClose={() => setIsDonateOpen(false)}
          onCreateDonation={handleCreateDonation}
          currentUser={currentUser}
          servicesHealth={servicesHealth}
          onNavigateToTracking={(id) => {
            setTrackingDonationId(id);
            setCurrentPage('tracking');
          }}
        />
      )}

      {/* Clean Footer with Watermarked Logo */}
      <footer className="border-t border-slate-200 bg-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">
              FoodLink Microservices Cloud Architecture Project • Google Cloud Run & Docker Ready
            </span>
          </div>
          <div className="flex items-center flex-wrap justify-center gap-x-4 gap-y-1 sm:gap-6 text-xs text-slate-400 font-medium">
            <span>FastAPI Gateway: 8000</span>
            <span>User: 8001</span>
            <span>Food: 8002</span>
            <span>Matching: 8003</span>
            <span>Notify: 8004</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
