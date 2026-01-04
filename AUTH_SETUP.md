# Authentication Setup Guide

## Overview
This application now includes a complete authentication system with JWT-based sessions, user registration, and login functionality.

## Database Setup

### 1. Create Users Table
Run the SQL in `supabase-schema.sql` to create the `users` table. The table includes:
- `userid` (TEXT, PRIMARY KEY) - Unique user identifier
- `username` (TEXT) - Display name set by user
- `email` (TEXT, UNIQUE) - User email (prevents duplicates)
- `password` (TEXT) - Hashed password using bcrypt
- `last_login` (TIMESTAMP) - Tracks last login for session expiry
- `created_at` and `updated_at` (TIMESTAMP) - Audit fields

### 2. Environment Variables
Add the following to your `.env.local` file (optional, will fallback to Supabase anon key):
```
JWT_SECRET=your-secret-key-here
```

**Note**: If `JWT_SECRET` is not set, the system will use `NEXT_PUBLIC_SUPABASE_ANON_KEY` as a fallback.

## Features Implemented

### ✅ Authentication
- **Signup**: Users can create accounts with userid, username, email, and password
- **Login**: Users can login with userid and password
- **JWT Tokens**: Secure JWT-based authentication with 15-day expiry
- **Session Management**: Automatic session validation and expiry
- **Email Uniqueness**: Prevents duplicate email addresses during signup

### ✅ User Interface
- **Homepage**: Shows Login/Signup form if not authenticated
- **Explore Blogs**: Only visible after successful login
- **Profile Section**: Displays username in header (left side) when logged in
- **Sign Out**: Available in profile dropdown menu

### ✅ Session Management
- **15-Day Expiry**: Sessions expire after 15 days of inactivity
- **Automatic Logout**: Expired sessions automatically log users out
- **Manual Signout**: Users can sign out from profile menu
- **Session Persistence**: Sessions persist across page refreshes using HTTP-only cookies

## API Endpoints

### POST `/api/auth/signup`
Creates a new user account.
- **Body**: `{ userid, username, email, password }`
- **Response**: `{ success, user, token }`

### POST `/api/auth/login`
Authenticates a user.
- **Body**: `{ userid, password }`
- **Response**: `{ success, user, token }`

### POST `/api/auth/logout`
Logs out the current user.
- **Response**: `{ success, message }`

### GET `/api/auth/session`
Checks current session status.
- **Response**: `{ authenticated, user? }`

## Security Features

1. **Password Hashing**: Passwords are hashed using bcrypt (10 rounds)
2. **HTTP-Only Cookies**: JWT tokens stored in secure, HTTP-only cookies
3. **Session Expiry**: Automatic expiry after 15 days
4. **Email Validation**: Prevents duplicate email addresses
5. **User ID Validation**: Prevents duplicate user IDs

## Usage Flow

1. **New User**:
   - Visits homepage → Sees Login/Signup form
   - Clicks "Sign Up" tab
   - Enters userid, username, email, password
   - After successful signup → Redirected to homepage with Explore Blogs visible

2. **Existing User**:
   - Visits homepage → Sees Login/Signup form
   - Enters userid and password
   - After successful login → Redirected to homepage with Explore Blogs visible

3. **Logged In User**:
   - Sees Explore Blogs on homepage
   - Username displayed in header (left side, under Profile section)
   - Can access all blog pages
   - Can sign out from profile dropdown

4. **Session Expiry**:
   - If user hasn't logged in for 15 days → Session expires
   - User must login again to access Explore Blogs

## Database Schema

```sql
CREATE TABLE users (
  userid TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Next Steps

1. Run the SQL schema to create the users table in Supabase
2. (Optional) Set `JWT_SECRET` environment variable for enhanced security
3. Test the signup and login flows
4. Verify session persistence and expiry

