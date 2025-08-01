# Copilot Instructions for Task Management Application

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a TypeScript React Task Management Application with the following key features:

## Project Architecture
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Authentication**: Auth0
- **Routing**: React Router DOM
- **State Management**: React Context API with TypeScript
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Custom components with Lucide React icons
- **Styling**: CSS Modules or styled-components

## TypeScript Guidelines
- Use strict TypeScript configuration
- Define interfaces for all data shapes (Task, User, etc.)
- Use typed React hooks (useState, useContext, etc.)
- Implement proper error handling with TypeScript types
- Use type guards for runtime type checking

## Code Patterns
- Use functional components with React hooks
- Implement custom hooks for reusable logic
- Use Context API for global state management
- Follow React best practices for component composition
- Implement proper error boundaries and loading states

## Authentication
- Integrate Auth0 for user authentication and authorization
- Use typed user data from Auth0
- Implement protected routes
- Handle authentication errors gracefully

## Task Management Features
- Task CRUD operations (Create, Read, Update, Delete)
- Task categorization and filtering
- Task status management (pending, in-progress, completed)
- Due date handling with date-fns
- Task search and sorting functionality

## File Organization
- Components in `/src/components/`
- Pages in `/src/pages/`
- Context and state management in `/src/context/`
- Types and interfaces in `/src/types/`
- Utilities and helpers in `/src/utils/`
- Hooks in `/src/hooks/`

Please ensure all code follows TypeScript best practices and maintains type safety throughout the application.
