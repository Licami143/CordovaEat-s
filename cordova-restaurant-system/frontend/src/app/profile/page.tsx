'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Camera, Mail, ShieldCheck, ShieldAlert, Calendar, User, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/lib/toast-context';
import { api, ApiClientError } from '@/lib/api';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

function formatDate(dateStr?: string | null) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getInitials(name?: string | null) {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : parts[0][0].toUpperCase();
}

function splitName(fullName?: string | null): { first: string; last: string } {
  if (!fullName) return { first: '', last: '' };
  const idx = fullName.indexOf(' ');
  if (idx === -1) return { first: fullName, last: '' };
  return { first: fullName.slice(0, idx), last: fullName.slice(idx + 1) };
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

function ProfileContent() {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();

  const nameParts = splitName(user?.full_name);
  const [firstName, setFirstName] = useState(nameParts.first);
  const [lastName, setLastName] = useState(nameParts.last);
  const [phone, setPhone] = useState(user?.phone || '');
  const [profileSaving, setProfileSaving] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [pwErrors, setPwErrors] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) {
      showToast('First name is required.', 'error');
      return;
    }
    setProfileSaving(true);
    try {
      await updateProfile({
        fullName: `${firstName.trim()} ${lastName.trim()}`.trim(),
        phone: phone || undefined,
      });
      showToast('Profile updated successfully!', 'success');
    } catch (err) {
      if (err instanceof ApiClientError) showToast(err.message, 'error');
      else showToast('Failed to update profile.', 'error');
    } finally {
      setProfileSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image must be under 5 MB.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);
    try {
      const res = await api.post<any>('/api/auth/avatar', formData, { isFormData: true });
      if (res?.data?.user) {
        await updateProfile({ avatarUrl: res.data.user.avatar_url });
      }
      showToast('Profile picture updated!', 'success');
    } catch (err) {
      if (err instanceof ApiClientError) showToast(err.message, 'error');
      else showToast('Failed to upload avatar.', 'error');
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!currentPassword) errs.currentPassword = 'Current password is required.';
    if (!newPassword || newPassword.length < 8) errs.newPassword = 'New password must be at least 8 characters.';
    if (newPassword !== confirmPassword) errs.confirmPassword = 'Passwords do not match.';
    setPwErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setPasswordSaving(true);
    try {
      await api.post('/api/auth/change-password', { currentPassword, newPassword });
      showToast('Password changed. Please log in again with your new password.', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      if (err instanceof ApiClientError) showToast(err.message, 'error');
      else showToast('Failed to change password.', 'error');
    } finally {
      setPasswordSaving(false);
    }
  };

  const provider = user?.google_id ? 'Google' : user?.facebook_id ? 'Facebook' : 'Email';
  const isOAuthOnly = user?.has_password === false || (!user?.has_password && !!(user?.google_id || user?.facebook_id));

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white mb-8">My Profile</h1>

      {/* Avatar + Account Overview */}
      <div className="bg-white dark:bg-[#1a211c] rounded-2xl border border-stone-200 dark:border-stone-800 shadow p-6 sm:p-8 mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar */}
        <div className="relative shrink-0">
          {user?.avatar_url ? (
            <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-stone-200 dark:border-stone-700">
              <Image src={user.avatar_url} alt={user.full_name || ''} fill className="object-cover" />
            </div>
          ) : (
            <div className="h-24 w-24 rounded-full bg-cordova-green flex items-center justify-center text-white text-2xl font-bold border-2 border-stone-200 dark:border-stone-700">
              {getInitials(user?.full_name)}
            </div>
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-1 -right-1 bg-cordova-gold hover:bg-cordova-goldHover text-white rounded-full p-1.5 shadow-md transition-colors"
            title="Change profile picture"
          >
            <Camera size={14} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleAvatarUpload}
          />
        </div>

        {/* Meta Info */}
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white truncate">
            {user?.full_name || 'CordovaEats Member'}
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">{user?.email}</p>

          <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4 text-xs text-stone-500 dark:text-stone-400">
            <span className="flex items-center gap-1.5">
              <User size={13} className="text-cordova-green" />
              <span className="capitalize">{user?.role} Account</span>
            </span>
            <span className="flex items-center gap-1.5">
              {user?.email_verified ? (
                <ShieldCheck size={13} className="text-emerald-500" />
              ) : (
                <ShieldAlert size={13} className="text-amber-500" />
              )}
              <span>{user?.email_verified ? 'Email Verified' : 'Email Unverified'}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={13} className="text-cordova-gold" />
              <span>via {provider}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              <span>Joined {formatDate(user?.created_at)}</span>
            </span>
          </div>

          {!user?.email_verified && (
            <p className="mt-3 text-xs text-amber-600 dark:text-amber-400 font-medium">
              ⚠️ Your email is not verified.{' '}
              <a href="/verify-email-required" className="underline hover:text-amber-700">
                Verify now
              </a>
            </p>
          )}
        </div>
      </div>

      {/* Edit Profile Info */}
      <div className="bg-white dark:bg-[#1a211c] rounded-2xl border border-stone-200 dark:border-stone-800 shadow p-6 sm:p-8 mb-6">
        <h3 className="text-base font-bold text-stone-900 dark:text-white mb-5 flex items-center gap-2">
          <User size={16} className="text-cordova-green" />
          Personal Information
        </h3>
        <form onSubmit={handleProfileSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
              required
            />
            <Input
              label="Last name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
            />
          </div>
          <Input
            label="Email address"
            type="email"
            value={user?.email || ''}
            disabled
            className="opacity-60 cursor-not-allowed"
          />
          <Input
            label="Phone number (optional)"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            placeholder="+63 9XX XXX XXXX"
          />
          <Button
            type="submit"
            className="bg-cordova-green hover:bg-cordova-greenHover text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider"
            loading={profileSaving}
          >
            Save Changes
          </Button>
        </form>
      </div>

      {/* Change Password — only for email/password accounts */}
      {!isOAuthOnly && (
        <div className="bg-white dark:bg-[#1a211c] rounded-2xl border border-stone-200 dark:border-stone-800 shadow p-6 sm:p-8">
          <h3 className="text-base font-bold text-stone-900 dark:text-white mb-5 flex items-center gap-2">
            <Lock size={16} className="text-cordova-gold" />
            Change Password
          </h3>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            {/* Current Password */}
            <div>
              <label className="label text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                Current password
              </label>
              <div className="relative mt-1">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="Your current password"
                  className={`input pr-10 ${pwErrors.currentPassword ? 'ring-2 ring-red-400' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showCurrent ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {pwErrors.currentPassword && (
                <p className="mt-1 text-sm text-red-500">{pwErrors.currentPassword}</p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label className="label text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                New password
              </label>
              <div className="relative mt-1">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  className={`input pr-10 ${pwErrors.newPassword ? 'ring-2 ring-red-400' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowNew((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showNew ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {pwErrors.newPassword && <p className="mt-1 text-sm text-red-500">{pwErrors.newPassword}</p>}
            </div>

            <Input
              label="Confirm new password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={pwErrors.confirmPassword}
              autoComplete="new-password"
              placeholder="Re-enter new password"
            />

            <Button
              type="submit"
              className="bg-cordova-gold hover:bg-cordova-goldHover text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider"
              loading={passwordSaving}
            >
              Change Password
            </Button>
          </form>
        </div>
      )}

      {isOAuthOnly && (
        <div className="bg-white dark:bg-[#1a211c] rounded-2xl border border-stone-200 dark:border-stone-800 shadow p-6 sm:p-8">
          <h3 className="text-base font-bold text-stone-900 dark:text-white mb-2 flex items-center gap-2">
            <Lock size={16} className="text-stone-400" />
            Password
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            You signed in with {provider}. Password management is handled by your {provider} account.
          </p>
        </div>
      )}
    </div>
  );
}
