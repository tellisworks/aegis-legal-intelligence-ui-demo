# Replit.md

## Overview

Aegis Legal Intelligence is a UI-only demo application designed to simulate an AI-powered legal analysis system. The application demonstrates a workflow for analyzing legal documents to identify contradictions, misconduct patterns, and alienation behaviors in family law cases. It provides a polished user interface that mimics real legal document analysis without requiring actual AI processing capabilities.

The system follows a tabbed workflow: Upload documents → Analyze → Review Results → Generate Report. All analysis results are mocked using predefined data to showcase the intended user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Lessons Learned

- The invitation system works perfectly - unlimited duplicate emails for testing
- Professional email templates are ready with Tom Ellis signature and business messaging
- Sometimes improving working features leads to frustrating loops - focus on what works
- Demo shows comprehensive legal document analysis with realistic file types and analysis results
- Avoid endless technical refinements when core functionality serves business needs

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React hooks with local component state
- **Routing**: Wouter for client-side routing
- **Animations**: Framer Motion for smooth transitions and loading states
- **Data Fetching**: TanStack Query for API state management

### Component Structure
- **Layout**: Tabbed interface using Radix UI primitives
- **Pages**: Single-page application with modal overlays for different views
- **UI Components**: Comprehensive shadcn/ui component system with consistent design tokens
- **Custom Components**: Specialized components for upload, analysis, results, and report generation

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Development**: Vite for hot module replacement and development server
- **Build System**: ESBuild for production bundling
- **Mock Data**: Static JSON endpoints serving predefined legal analysis results

### Database Schema
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: Minimal user authentication schema (users table with id, username, password)
- **Storage**: In-memory storage implementation for demo purposes with interface for potential database integration

### Authentication and Authorization
- **Strategy**: Basic session-based authentication structure in place
- **Implementation**: Currently uses in-memory storage, designed to be easily replaceable with PostgreSQL
- **Security**: Placeholder implementation for demo environment

### Build and Development
- **Development Mode**: Vite dev server with HMR and React Fast Refresh
- **Production Build**: Client assets built to dist/public, server bundled with ESBuild
- **TypeScript**: Strict configuration with path mapping for clean imports
- **Linting**: ESNext modules with modern JavaScript features

## External Dependencies

### UI and Styling
- **Radix UI**: Complete primitive component library for accessible UI elements
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **shadcn/ui**: Pre-built component library with consistent theming
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Vite**: Development server and build tool with React plugin
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer
- **TypeScript**: Type safety and enhanced developer experience

### Database and ORM
- **Drizzle ORM**: Type-safe database toolkit
- **Neon Database**: Serverless PostgreSQL (configured but not required for demo)
- **Drizzle Kit**: Database migration and schema management tools

### State Management
- **TanStack Query**: Server state synchronization and caching
- **React Hook Form**: Form state management with validation
- **Hookform Resolvers**: Integration with validation libraries

### Animation and Interaction
- **Framer Motion**: Animation library for smooth transitions
- **Embla Carousel**: Touch-friendly carousel component
- **React Day Picker**: Date selection components

The application is designed as a demonstration tool that can be easily extended with real AI analysis capabilities while maintaining the polished user experience shown in the demo interface.