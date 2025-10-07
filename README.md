# Aegis Legal Intelligence - UI Demo

> **⚠️ IMPORTANT: This is a UI demonstration only**  
> This repository contains a user interface mockup for the Aegis Legal Intelligence platform. It uses simulated data and does not perform actual AI-powered legal analysis.

## About This Demo

Aegis Legal Intelligence is designed to demonstrate an AI-powered legal document analysis system for family law cases. This UI demo showcases:

- Document upload interface for legal files (affidavits, court orders, emails, text messages)
- Simulated AI analysis workflow with progress indicators
- Mock results showing contradictions, patterns, and behavioral analysis
- Professional report generation interface
- Invitation-based access control system

**All analysis results are pre-programmed mock data** - no actual AI processing or legal analysis occurs in this demonstration.

## Purpose

This demonstration is intended to:
- Show potential clients and stakeholders the proposed user experience
- Visualize the workflow of legal document analysis
- Demonstrate the interface design and user interactions
- Serve as a prototype for future development

## Technology Stack

### Frontend
- React with TypeScript
- Tailwind CSS + shadcn/ui components
- Framer Motion for animations
- Wouter for routing
- TanStack Query for state management

### Backend
- Express.js with TypeScript
- Session-based authentication
- In-memory storage for demo purposes
- Drizzle ORM (configured for future database integration)

## Key Features

1. **Invitation System**: Controlled access via unique invitation codes
2. **Document Upload**: Interface for uploading various legal document types
3. **Analysis Workflow**: Tabbed interface guiding users through the process
4. **Mock Results**: Pre-generated analysis showing contradictions and patterns
5. **Report Generation**: Professional PDF-ready report interface
6. **Admin Interface**: Dashboard for creating and managing invitation codes

## Running Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

The application runs on port 5000 by default.

## Access

The demo uses an invitation-based access system:
- Admin access: Use code `admin-access-2025`
- Client invitations: Generated through the admin interface

## Disclaimer

This is a demonstration interface only. It does not:
- Perform actual AI analysis
- Process real legal documents
- Provide legal advice or professional opinions
- Store sensitive or confidential information

For actual legal AI capabilities, please contact Aegis Legal Intelligence for information about the production system.

## License

Proprietary - Demo/Prototype Only

## Contact

For more information about Aegis Legal Intelligence, please reach out to the development team.
