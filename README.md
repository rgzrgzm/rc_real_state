# 🏠 RC Real Estate - Property Management System

A modern, full-stack real estate property management application built with React.js and Supabase. Designed for real estate agencies to efficiently manage property listings, search inventory, and export data.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-purple)
![Responsive](https://img.shields.io/badge/Design-Responsive-orange)

## 🚀 Live Demo
...

## 📋 Features

### 🔐 Authentication & Security
- **User Authentication** with Supabase Auth
- **Row Level Security** (RLS) for data protection
- **Role-based access control**

### 🏢 Property Management
- **Add New Properties** with detailed information (price, location, bedrooms, etc.)
- **Advanced Search & Filtering** by location, price range, property type, and features
- **Real-time Updates** with Supabase subscriptions
- **Property Status Tracking** (Available, Reserved, Sold/Rented)

### 📊 Data Management
- **CSV Export** for all property data
- **Responsive Design** works on desktop and mobile
- **Glassmorphism UI** with modern design patterns

### 🛠️ Technical Features
- **Real-time Database** with Supabase PostgreSQL
- **Optimized Performance** with proper indexing
- **Error Handling** and user feedback
- **Environment Configuration** for secure deployment

## 🛠️ Tech Stack

**Frontend:**
- React.js 19.2.0
- TailwindCSS for styling
- Context API for state management

**Backend & Database:**
- Supabase (PostgreSQL)
- Row Level Security (RLS)
- Real-time subscriptions
- File storage ready

**Development:**
- Git Flow for version control
- Environment variables configuration
- Responsive design principles

## 📸 Screenshots
...
<!-- ![Dashboard](screenshots/dashboard.png) -->
<!-- ![Property Form](screenshots/property-form.png) -->
<!-- ![Search Interface](screenshots/search.png) -->

## 🏗️ Project Structure

| Directory | Purpose | Key Files |
|-----------|---------|-----------|
| `src/components/` | Reusable UI components | `PropertyForm.jsx`, `PropertyCard.jsx`, `SearchFilters.jsx` |
| `src/hooks/` | Custom React hooks | `useSupabase.js`, `useAuth.js` |
| `src/styles/` | Global styles & CSS | `globals.css` |
| Root | Main application files | `App.jsx`, `index.js` |

### Component Responsibilities:
- **PropertyForm**: Add/edit properties with validation and real-time saving  
- **PropertyCard**: Display property details with responsive design  
- **SearchFilters**: Filter by price, location, bedrooms, etc.  
- **useSupabase**: Database operations & real-time events  
- **useAuth**: Auth flow & session handling



👨‍💻 Author

rgzrgzm

GitHub: @rgzrgzm

LinkedIn: ...

Portfolio: ...