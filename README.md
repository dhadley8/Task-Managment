
# Task Management Application

A robust, TypeScript-powered task management application built with React, featuring Auth0 authentication, comprehensive state management, and a modern user interface.

## 🚀 Features

### Core Functionality
- **Task CRUD Operations**: Create, read, update, and delete tasks with ease
- **Task Dashboard**: Comprehensive dashboard with statistics and task overview
- **Task Categories**: Organize tasks by custom categories
- **Priority Management**: Set task priorities (Low, Medium, High, Urgent)
- **Due Date Tracking**: Set and track task due dates with overdue notifications
- **Status Management**: Track task progress (Pending, In Progress, Completed, Cancelled)
- **Tag System**: Add custom tags to tasks for better organization

### Authentication & Security
- **Auth0 Integration**: Secure authentication and user management
- **Protected Routes**: Route-level authentication protection
- **User Profiles**: Display user information and avatars

### State Management & Data
- **Context API**: Global state management with TypeScript
- **Local Storage**: Persistent data storage
- **Real-time Updates**: Immediate UI updates on data changes
- **Error Handling**: Comprehensive error handling and user feedback

### User Experience
- **Responsive Design**: Mobile-first responsive design
- **Search & Filter**: Advanced filtering and search capabilities
- **Sorting Options**: Sort tasks by title, date, priority
- **Loading States**: Smooth loading indicators
- **Form Validation**: Real-time form validation with Zod

### TypeScript Integration
- **Type Safety**: Full TypeScript implementation
- **Interface Definitions**: Comprehensive type definitions
- **Runtime Validation**: Schema validation with Zod
- **Developer Experience**: Enhanced IDE support and error catching

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe JavaScript for better development experience
- **Vite**: Fast build tool and development server
- **React Router DOM**: Client-side routing
- **React Hook Form**: Efficient form handling
- **Zod**: TypeScript-first schema validation

### Authentication & State
- **Auth0**: Industry-standard authentication service
- **React Context API**: Global state management
- **Local Storage**: Client-side data persistence

### UI & Styling
- **CSS Modules**: Scoped styling
- **Lucide React**: Modern icon library
- **Custom CSS**: Responsive design system
- **CSS Grid & Flexbox**: Modern layout techniques

### Development Tools
- **ESLint**: Code linting and quality
- **TypeScript Compiler**: Type checking
- **Vite HMR**: Hot module replacement

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Auth0 Account** (for authentication setup)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd task-management-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your Auth0 credentials:

```env
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
```

### 4. Auth0 Setup

1. Create an Auth0 account at [auth0.com](https://auth0.com)
2. Create a new Single Page Application
3. Configure the following settings:
   - **Allowed Callback URLs**: `http://localhost:5173`
   - **Allowed Logout URLs**: `http://localhost:5173`
   - **Allowed Web Origins**: `http://localhost:5173`
4. Copy your Domain and Client ID to the `.env` file

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorBoundary/   # Error boundary component
│   ├── Header/          # Navigation header
│   ├── Loading/         # Loading indicators
│   ├── ProtectedRoute/  # Route protection
│   ├── TaskCard/        # Task display component
│   └── TaskForm/        # Task creation/editing form
├── context/             # React Context providers
│   ├── AuthContext.tsx  # Authentication context
│   └── TaskContext.tsx  # Task management context
├── hooks/               # Custom React hooks
│   ├── useAuth.ts       # Authentication hook
│   └── useTasks.ts      # Task management hook
├── pages/               # Page components
│   ├── Dashboard/       # Main dashboard page
│   └── Home/            # Landing page
├── types/               # TypeScript type definitions
│   └── index.ts         # Core type definitions
├── utils/               # Utility functions
│   ├── taskUtils.ts     # Task-related utilities
│   └── validation.ts    # Form validation schemas
├── App.tsx              # Main application component
├── App.css              # Global styles
└── main.tsx             # Application entry point
```

## 🎯 Usage Guide

### Getting Started

1. **Sign Up/Login**: Use the Auth0 authentication to create an account or sign in
2. **Dashboard Access**: Navigate to the dashboard to view your tasks
3. **Create Tasks**: Click "New Task" to create your first task

### Task Management

#### Creating Tasks
1. Click the "New Task" button
2. Fill in the task details:
   - **Title**: Required task name
   - **Description**: Optional detailed description
   - **Status**: Current task status
   - **Priority**: Task priority level
   - **Category**: Task category (e.g., Work, Personal)
   - **Due Date**: Optional deadline
   - **Tags**: Custom tags for organization

#### Managing Tasks
- **Edit**: Click the edit icon on any task card
- **Delete**: Click the trash icon (requires confirmation)
- **Status Update**: Use the status dropdown on task cards
- **Search**: Use the search bar to find specific tasks
- **Filter**: Filter tasks by status, priority, or category

### Dashboard Features

#### Statistics Overview
- Total tasks count
- Tasks by status (Pending, In Progress, Completed)
- Overdue tasks alert

#### Filtering & Search
- **Search**: Find tasks by title, description, or tags
- **Status Filter**: Filter by task status
- **Clear Filters**: Reset all applied filters

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Development Guidelines

#### TypeScript Best Practices
- Use strict type checking
- Define interfaces for all data structures
- Implement proper error handling
- Use type guards for runtime validation

#### Component Guidelines
- Use functional components with hooks
- Implement proper prop types
- Follow the single responsibility principle
- Use custom hooks for reusable logic

#### State Management
- Use Context API for global state
- Implement proper error boundaries
- Handle loading states consistently
- Provide user feedback for all actions

## 🚀 Deployment

### Building for Production

```bash
npm run build
```

### Environment Variables for Production

Ensure you have the following environment variables set:

```env
VITE_AUTH0_DOMAIN=your-production-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-production-client-id
```

### Deployment Platforms

This application can be deployed to:
- **Vercel**: Zero-config deployment for Vite apps
- **Netlify**: Static site hosting with continuous deployment
- **GitHub Pages**: Free hosting for static sites
- **AWS S3 + CloudFront**: Scalable cloud hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup for Contributors

1. Follow the installation steps above
2. Create a new branch for your feature
3. Make your changes following the coding guidelines
4. Test your changes thoroughly
5. Submit a pull request with a clear description

## 🐛 Troubleshooting

### Common Issues

#### Auth0 Configuration Issues
- Verify your domain and client ID in `.env`
- Check Auth0 dashboard settings for allowed URLs
- Ensure callback URLs match your development/production URLs

#### Build Issues
- Clear node_modules and reinstall dependencies
- Check for TypeScript errors in the console
- Verify all required environment variables are set

#### Runtime Errors
- Check the browser console for detailed error messages
- Verify network connectivity for Auth0 authentication
- Clear local storage if experiencing data issues

### Getting Help

- Check the [Issues](link-to-issues) section for common problems
- Create a new issue with detailed reproduction steps
- Join our community discussions for support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Auth0** for providing robust authentication services
- **React Team** for the excellent framework
- **TypeScript Team** for type safety
- **Vite Team** for the fast build tool
- **Lucide** for the beautiful icons


