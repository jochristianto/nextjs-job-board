# nextjs-job-board

## Approach

This project is a modern job board built with [Next.js](https://nextjs.org/) (using the App Router), [Supabase](https://supabase.com/) for authentication and database, and [Radix UI](https://www.radix-ui.com/) for accessible UI components. The goal is to provide a clean, maintainable, and scalable codebase that demonstrates best practices in full-stack TypeScript development, including authentication, CRUD operations, and a responsive, accessible UI.

**Key principles:**

- **Type safety:** End-to-end TypeScript, with Zod schemas for validation.
- **Separation of concerns:** Clear boundaries between UI, business logic, and data access.
- **Server-first:** Uses Next.js server components and actions for data fetching and mutations.
- **Accessible UI:** Built with Radix UI primitives and custom components for accessibility.
- **Developer Experience:** Uses React Hook Form, Zod, and Drizzle ORM for robust forms and database access.

## Architecture

- **Next.js App Router:**  
  Routing, layouts, and server components are organized under `/app`, with protected routes under `/app/protected`.

- **Authentication:**  
  Supabase Auth is integrated via middleware and server/client helpers. Middleware in `/lib/supabase/middleware.ts` ensures protected routes are only accessible to authenticated users.

- **Database Access:**  
  The app uses Supabase Postgres as the database, accessed via Drizzle ORM. All database queries and mutations are defined in `/app/actions.ts` and use Zod schemas for validation and type safety.

- **UI Components:**  
  UI is built with Radix UI, shadcn/ui, and custom components. Forms use React Hook Form and Zod for validation. Rich text editing is handled by Quill (with an SSR-safe wrapper).

- **State Management:**  
  Local state is managed with React hooks. Form state is managed by React Hook Form. No global state management library is used, as the app is primarily CRUD-focused.

- **Code Organization:**
  - `/app`: Next.js pages and routes.
  - `/components`: Reusable UI components.
  - `/lib`: Utilities, database, and Supabase helpers.
  - `/db`: Database schema and Zod validation schemas.
  - `/types`: Shared TypeScript types.

- **Security:**
  - All mutations (create, update, delete) are protected by authentication checks.
  - User input is sanitized before being stored in the database.

- **Deployment:**
  - Designed for deployment on Vercel, with environment variables and Supabase integration.

## Tech Stack

This project is built with a modern, full-stack TypeScript ecosystem and leverages the following major technologies and libraries:

- **Next.js (App Router):** React framework for server components, routing, and SSR/SSG.
- **Supabase:** Authentication and Postgres database as a backend-as-a-service.
- **Drizzle ORM:** Type-safe database access and migrations.
- **Zod:** Schema validation for both frontend and backend.
- **React Hook Form:** Form state management and validation.
- **shadcn/ui:** Headless, accessible UI components built on top of Radix UI primitives.
- **Radix UI:** Low-level, accessible UI primitives.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
- **Lucide Icons:** Icon set for modern interfaces.
- **Quill (with SSR-safe wrapper):** Rich text editor for job descriptions.
- **date-fns:** Date formatting and time-ago utilities.
- **Sonner:** Toast notifications for user feedback.

This stack is chosen to maximize developer productivity, maintainability, and accessibility, while providing a great user experience.

## Prerequisites

- **Node.js:** v22.15.0 (see [.nvmrc](.nvmrc))
- **nvm:** Node Version Manager ([nvm-sh/nvm](https://github.com/nvm-sh/nvm))
- **pnpm:** Latest version (`npm install -g pnpm` or see [pnpm.io](https://pnpm.io/installation))
- **Supabase account:** [Sign up for free](https://supabase.com/) and create a project

## Installation

1. Make sure **nvm** is installed. If not, install it from [nvm-sh/nvm](https://github.com/nvm-sh/nvm).

2. Select Node.js version 22.15.0:

   ```sh
   nvm install 22.15.0
   nvm use 22.15.0
   ```

3. Install pnpm if you haven't already:

   ```sh
   npm install -g pnpm
   ```

4. Install dependencies:

   ```sh
   pnpm install
   ```

5. Copy the environment variables file and add your Supabase credentials:

   ```sh
   cp .env.sample .env.local
   ```

6. Start the development server:

   ```sh
   pnpm dev
   ```

## What would you improve if given more time?

- **Automated Testing:** Add comprehensive unit, integration, and end-to-end tests using tools like Jest, React Testing Library, and Playwright/Cypress to ensure reliability and catch regressions early.
- **Accessibility (a11y):** Perform a full accessibility audit and improve keyboard navigation, ARIA labeling, and screen reader support to meet WCAG standards.
- **Performance Optimization:** Profile and optimize bundle size, lazy-load non-critical components, and implement caching strategies for faster load times.
- **CI/CD Pipeline:** Set up continuous integration and deployment workflows (e.g., GitHub Actions) for automated testing, linting, and deployment.
- **User Roles & Permissions:** Implement more granular user roles (e.g., admin, recruiter, applicant) and permissions for better access control.
- **Notifications & Email:** Add real-time notifications and transactional email (e.g., job application status updates) using Supabase functions or third-party services.
- **Job Application Workflow:** Allow users to apply for jobs, track application status, and manage resumes/CVs.
- **Admin Dashboard:** Build an admin dashboard for managing users, jobs, and site analytics.
- **Mobile Responsiveness:** Further refine the mobile experience and test on a wider range of devices.
- **Internationalization (i18n):** Add support for multiple languages and locales.
- **Improved Error Handling:** Provide more user-friendly error messages and fallback UI for network or server errors.
- **Documentation:** Expand developer and user documentation for easier onboarding and maintenance.
- **Pagination:** Implement server-side or cursor-based pagination for job listings to efficiently handle large datasets, improve performance, and enhance user experience when browsing many jobs.

## License

Copyright (c) 2025 Jonathan Christianto

This code is provided solely for the purpose of evaluating my technical skills. It may not be used, copied, distributed, or disclosed for any other purpose without my explicit written permission.
