# Fiscality - Financial Transparency Platform

## Overview

Fiscality is a web-based financial transparency platform built as a hackathon project. The application provides user authentication and appears to be designed for financial data visualization and transparency features. The platform uses a simple client-server architecture with Firebase for authentication and is built to be deployed on cloud platforms.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Single Page Application (SPA)**: Built with vanilla HTML, CSS, and JavaScript
- **Styling Framework**: Tailwind CSS for responsive design and modern UI components
- **Component Structure**: Modular approach with separate pages (login, dashboard) managed through JavaScript visibility controls
- **User Interface**: Features gradient backgrounds, card-based layouts, and popup modals for user interactions

### Backend Architecture
- **Server Framework**: Express.js for serving static files and API endpoints
- **Static File Serving**: Express serves HTML, CSS, and JavaScript files directly
- **Configuration Management**: Server-side environment variable injection for Firebase configuration
- **API Design**: RESTful endpoint structure for configuration and potential future data endpoints

### Authentication System
- **Provider**: Firebase Authentication v12
- **Methods**: Email/password authentication with email verification
- **Security Features**: Built-in Firebase security rules and email verification workflow
- **Integration**: Client-side Firebase SDK with server-side configuration injection

### Data Architecture
- **Current State**: No database implementation detected in codebase
- **Future Considerations**: Architecture suggests potential integration with financial data sources and visualization tools
- **Configuration**: Server manages Firebase configuration through environment variables

### Deployment Architecture
- **Platform Agnostic**: Designed to run on any Node.js hosting platform
- **Environment Configuration**: Uses environment variables for sensitive configuration data
- **Port Management**: Configurable port with fallback to 5000 for local development

## External Dependencies

### Authentication Services
- **Firebase Authentication**: Google's authentication service for user management
  - Email/password authentication
  - Email verification services
  - User session management

### Frontend Libraries
- **Tailwind CSS**: Utility-first CSS framework delivered via CDN
- **Firebase SDK**: Version 12 JavaScript SDK for client-side Firebase integration

### Backend Dependencies
- **Express.js**: Web application framework for Node.js
- **Node.js Runtime**: Minimum version 14.0.0 required

### Development Tools
- **Semgrep**: Security scanning configuration for code quality and vulnerability detection
- **NPM**: Package management for Node.js dependencies

### Potential Integrations
- **Financial Data APIs**: Architecture suggests future integration with financial data sources
- **Visualization Tools**: Code references suggest planned integration with chart libraries or business intelligence tools
- **Cloud Storage**: Firebase Storage bucket configured for potential file management