# ProfitPay Investment Platform

A modern investment platform built with React, TypeScript, and Supabase. Features user dashboard, admin panel, and cryptocurrency deposit system.

## 🚀 Features

### User Features
- **User Dashboard** - View account balance and portfolio
- **Deposit System** - Cryptocurrency deposits with Solana support
- **Real-time Balance Updates** - Live balance tracking
- **Responsive Design** - Mobile-friendly interface

### Admin Features
- **Admin Panel** - Secure admin access via hidden URL
- **User Management** - View and manage all users
- **Balance Management** - Credit/debit user balances
- **Deposit Processing** - Approve/reject user deposits
- **Real-time Updates** - Live admin dashboard

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: Shadcn/ui, Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: React Query
- **Routing**: React Router DOM

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Glibifytech/broker-profitpay.git
   cd broker-profitpay
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Copy `example.env` to `.env` and update with your Supabase credentials:
   ```env
   VITE_SUPABASE_PROJECT_ID="your_project_id"
   VITE_SUPABASE_PUBLISHABLE_KEY="your_publishable_key"
   VITE_SUPABASE_URL="your_supabase_url"
   ```

4. **Database Setup**
   
   Run the SQL commands in Supabase SQL Editor:
   ```sql
   -- Run the migrations in supabase/migrations/ folder
   -- Also run create_deposits_table.sql for deposit functionality
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Render Deployment (Recommended)

1. **Choose "New Static Site"** on Render
2. **Connect GitHub repository**
3. **Build Settings**:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
4. **Environment Variables**: Add your Supabase credentials
5. **Deploy**

## 🔐 Admin Access

### Development
- URL: `http://localhost:5173/admin`
- Create admin user via: `http://localhost:5173/admin-setup`

### Production
- URL: `https://yourdomain.com/secure-admin-panel-2024`
- Use SQL to create admin users in `admins` table

## 📱 User Flow

### Deposit Process
1. **User clicks "Deposit"** → Payment method selection
2. **Select Cryptocurrency** → Choose Solana
3. **Enter amount** → Get wallet address: `4VMixhmNThQDU9gSNRwFishcFPFsHDYLBWjsaRo5yPpx`
4. **Submit payment** → Shows "Processing" status
5. **Admin approval** → Balance automatically updated

### Admin Process
1. **Login to admin panel**
2. **View pending deposits** in Deposits section
3. **Approve/Reject** deposits
4. **Manage user balances** directly

## 🗃️ Database Schema

### Main Tables
- `profiles` - User accounts and balances
- `admins` - Admin login credentials
- `deposits` - Deposit transactions
- `user_roles` - User role management

## 🔒 Security Features

- **Row Level Security (RLS)** on all tables
- **Admin-only routes** with hidden URLs
- **Secure admin authentication**
- **Environment variable protection**

## 🎨 UI Components

Built with Shadcn/ui components:
- Cards, Tables, Buttons
- Forms, Inputs, Dialogs
- Navigation, Sidebars
- Toasts, Badges, Loading states

## 📞 Support

For support and questions:
- Email: richygabriel001@gmail.com
- GitHub: [@Glibifytech](https://github.com/Glibifytech)

## 📄 License

This project is private and proprietary.

---

**ProfitPay Investment Platform** - Built with ❤️ by Glibifytech