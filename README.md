# e-Likita Frontend

A modern, responsive medical consultation platform built with Next.js 15, React 19, and TypeScript. This frontend provides an intuitive user interface for the e-Likita medical consultation system, featuring a guided 5-step consultation process with dark mode support and mobile-first design.

## 🏥 Overview

e-Likita Frontend is the user-facing application for the e-Likita medical consultation platform. It provides a seamless, accessible interface for patients to complete guided medical consultations, manage their profiles, and access consultation history. The application emphasizes user experience with smooth animations, responsive design, and comprehensive accessibility features.

## ✨ Features

### Core Functionality
- **5-Step Consultation Process**: Guided medical consultation workflow
- **User Authentication**: Secure login/registration with JWT tokens
- **Patient Management**: Comprehensive patient profile management
- **Symptom Assessment**: Interactive symptom selection and severity rating
- **Dynamic Follow-ups**: Context-aware follow-up questions based on symptoms
- **Risk Assessment**: Real-time risk evaluation and recommendations
- **Consultation History**: Access to past consultations and results
- **PDF Generation**: Download consultation summaries as PDFs

### User Experience
- **Dark Mode Support**: Automatic theme switching with system preference detection
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **Progress Tracking**: Visual step indicators and progress persistence
- **Form Validation**: Real-time validation with Formik and Yup
- **Accessibility**: WCAG compliant with keyboard navigation support


### Technical Features
- **Server-Side Rendering**: Next.js App Router with SSR/SSG
- **Type Safety**: Full TypeScript implementation
- **State Management**: React Context for global state
- **Form Handling**: Formik with Yup validation
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React icon library
- **Theme Management**: next-themes for dark/light mode

## 🛠️ Tech Stack

- **Framework**: Next.js 15.x with App Router
- **UI Library**: React 19.x
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **Animations**: Framer Motion 12.x
- **Forms**: Formik 2.x with Yup validation
- **Icons**: Lucide React
- **Theme**: next-themes
- **PDF Generation**: jsPDF
- **HTTP Client**: Built-in fetch with custom hooks

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── consultation/        # Consultation pages
│   ├── darkmode/          # Dark mode testing
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── favicon.ico        # App icon
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   ├── AuthModal.tsx      # Authentication modal
│   ├── ThemeToggle.tsx    # Dark/light mode toggle
│   ├── StepIndicator.tsx  # Consultation progress
│   ├── Step1Intro.tsx     # Introduction step
│   ├── Step1PatientForm.tsx # Patient information
│   ├── Step2SymptomsForm.tsx # Symptom selection
│   ├── Step3Followups.tsx # Follow-up questions
│   ├── Step5Summary.tsx  # Consultation summary
│   └── DarkMode.tsx      # Dark mode utilities
├── context/               # React Context providers
│   ├── AuthContext.tsx    # Authentication state
│   └── ConsultationContext.tsx # Consultation state
├── hooks/                 # Custom React hooks
│   └── useApi.ts          # API integration hook
└── lib/                   # Utility libraries
    └── api.ts             # API client configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Backend API running (see backend README)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-likita-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=https://e-likita-backend.onrender.com/api
   
   # Optional: Analytics, etc.
   NEXT_PUBLIC_APP_NAME=e-Likita
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

Open [https://e-likita-frontend.vercel.app/](https://e-likita-frontend.vercel.app/) in your browser to see the application.

## 🎨 Design System

### Color Palette
- **Primary**: Blue shades (`blue-600`, `blue-700`, `blue-800`)
- **Secondary**: Gray shades for backgrounds and text
- **Success**: Green for positive states
- **Warning**: Orange for important notices
- **Error**: Red for errors and alerts

### Typography
- **Font Family**: Geist Sans (primary), Geist Mono (code)
- **Headings**: Bold weights with gradient text effects
- **Body**: Regular weight with good contrast ratios

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Multiple variants (primary, secondary, ghost)
- **Forms**: Clean inputs with validation states
- **Modals**: Centered overlays with backdrop blur

## 📱 Pages & Features

### Home Page (`/`)
- Hero section with consultation CTA
- Feature overview with 5-step process
- Privacy and security highlights
- Responsive design showcase

### Consultation Flow (`/consultation`)
- **Step 1**: Introduction and overview
- **Step 2**: Patient information collection
- **Step 3**: Symptom assessment and severity
- **Step 4**: Dynamic follow-up questions
- **Step 5**: Summary and recommendations

### Authentication
- Modal-based login/registration
- Form validation with error handling
- JWT token management
- User profile management

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server with Turbopack
npm run build            # Build for production with Turbopack
npm run start            # Start production server
npm run lint             # Run ESLint

# Build Analysis
npm run build            # Analyze bundle size
```

### Key Development Features

#### Turbopack Integration
The project uses Next.js Turbopack for faster development builds:
```bash
npm run dev              # Uses --turbopack flag
npm run build            # Uses --turbopack flag
```

#### TypeScript Configuration
- Strict type checking enabled
- Path mapping for clean imports (`@/components`, `@/context`)
- Next.js specific type definitions

#### Tailwind CSS Setup
- Custom configuration with dark mode support
- Responsive breakpoints
- Custom color palette
- Component-based styling approach

## 🎯 User Experience Features

### Consultation Flow
1. **Introduction**: Welcome message and process overview
2. **Patient Info**: Personal details and medical history
3. **Symptoms**: Interactive symptom selection with severity ratings
4. **Follow-ups**: Dynamic questions based on selected symptoms
5. **Summary**: Comprehensive consultation results with recommendations

### State Management
- **Local Storage**: Progress persistence across browser sessions
- **Context API**: Global state for authentication and consultation
- **Form State**: Formik for complex form management
- **Theme State**: next-themes for dark/light mode persistence

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliant color ratios
- **Focus Management**: Visible focus indicators

## 🔒 Security & Privacy

### Data Protection
- **Client-side Validation**: Form validation before API calls
- **Secure Storage**: JWT tokens in httpOnly cookies (recommended)
- **HTTPS Ready**: Production-ready security headers
- **Privacy Notice**: Clear data usage information

### Authentication Flow
```typescript
// Example authentication context usage
const { user, login, logout, isLoading } = useAuth();

// Login with email/password
await login(email, password);

// Access user data
console.log(user.profile.firstName);
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

### Mobile-First Approach
- Touch-friendly interface elements
- Optimized form inputs for mobile
- Responsive navigation with mobile menu
- Swipe gestures for consultation flow

## 🚀 Deployment

### Environment Variables

Production environment variables:
```env
NEXT_PUBLIC_API_URL=https://e-likita-backend.onrender.com/api
NEXT_PUBLIC_APP_NAME=e-Likita
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### Build for Production

```bash
npm run build
npm run start
```



## 🧪 Testing

### Manual Testing Checklist
- [ ] Consultation flow completion
- [ ] Authentication (login/register/logout)
- [ ] Dark/light mode switching
- [ ] Mobile responsiveness
- [ ] Form validation
- [ ] PDF generation
- [ ] Progress persistence



