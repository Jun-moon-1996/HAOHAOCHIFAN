/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useAppStore } from './store';
import Login from './pages/Login';
import Preferences from './pages/Preferences';
import MainLayout from './pages/MainLayout';
import DishDetail from './pages/DishDetail';
import KitDetail from './pages/KitDetail';
import Orders from './pages/Orders';
import AddressList from './pages/AddressList';
import AddressEdit from './pages/AddressEdit';
import Favorites from './pages/Favorites';
import Coupons from './pages/Coupons';
import Settings from './pages/Settings';
import PersonalInfo from './pages/PersonalInfo';
import AccountSecurity from './pages/AccountSecurity';
import PaymentSettings from './pages/PaymentSettings';
import CustomerService from './pages/CustomerService';
import PrivacySettings from './pages/PrivacySettings';
import NotificationSettings from './pages/NotificationSettings';
import GeneralSettings from './pages/GeneralSettings';

function AppContent() {
  const { view } = useAppStore();

  return (
    <div className="w-full h-full sm:max-w-md mx-auto bg-white sm:shadow-2xl overflow-hidden relative">
      {view === 'login' && <Login />}
      {view === 'preferences' && <Preferences />}
      {view === 'main' && <MainLayout />}
      {view === 'dish-detail' && <DishDetail />}
      {view === 'kit-detail' && <KitDetail />}
      {view === 'orders' && <Orders />}
      {view === 'address-list' && <AddressList />}
      {view === 'address-edit' && <AddressEdit />}
      {view === 'favorites' && <Favorites />}
      {view === 'coupons' && <Coupons />}
      {view === 'settings' && <Settings />}
      {view === 'personal-info' && <PersonalInfo />}
      {view === 'account-security' && <AccountSecurity />}
      {view === 'payment-settings' && <PaymentSettings />}
      {view === 'customer-service' && <CustomerService />}
      {view === 'privacy-settings' && <PrivacySettings />}
      {view === 'notification-settings' && <NotificationSettings />}
      {view === 'general-settings' && <GeneralSettings />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-100 sm:flex sm:items-center sm:justify-center">
        <AppContent />
      </div>
    </AppProvider>
  );
}
