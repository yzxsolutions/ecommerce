# Supermarket Frontend

A modern e-commerce platform frontend built with Next.js 14, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Redux Toolkit
- **Server State**: React Query
- **Forms**: React Hook Form
- **Code Quality**: ESLint, Prettier

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── layout/         # Layout components
│   └── forms/          # Form components
├── hooks/              # Custom React hooks
│   ├── api/           # API-related hooks
│   └── auth/          # Authentication hooks
├── lib/               # Library configurations
│   ├── api/           # API client setup
│   └── auth/          # Auth configuration
├── store/             # Redux store
│   └── slices/        # Redux slices
├── types/             # TypeScript type definitions
│   ├── api/           # API types
│   └── auth/          # Auth types
└── utils/             # Utility functions
    ├── validation/    # Validation utilities
    └── formatting/    # Formatting utilities
```

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up environment variables**:

   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` with your configuration.

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## Design System

The project uses a custom design system built with Tailwind CSS featuring:

- **Colors**: Primary (green), secondary (amber), and comprehensive gray scale
- **Typography**: Inter font family with display variant
- **Spacing**: Extended spacing scale
- **Components**: Consistent design tokens for shadows, borders, and layouts

## Development Guidelines

1. **Code Style**: Follow Prettier configuration for consistent formatting
2. **Type Safety**: Use TypeScript for all components and utilities
3. **Component Structure**: Organize components by feature and reusability
4. **State Management**: Use Redux for global state, React Query for server state
5. **Accessibility**: Follow WCAG 2.1 AA guidelines

## Next Steps

This is the initial project setup. The next tasks in the implementation plan include:

- Design system implementation
- Authentication system
- Product catalog
- Shopping cart and checkout
- Admin dashboard
- Performance optimization
- Testing implementation
