# Requirements Document

## Introduction

This document defines the requirements for restructuring the RythuMowa marketplace from a multi-app architecture into a unified monorepo with a single Next.js frontend, Medusa backend, and Stack Auth for authentication. The restructure aims to eliminate redundancy, remove deprecated authentication systems (Clerk), and establish a clean, maintainable codebase.

## Glossary

- **Frontend Application**: The Next.js application located in `rythumowas.shop/` that serves all user-facing portals
- **Farmer Portal**: The farmer-specific interface currently in `farmer-portal/` directory
- **Medusa Backend**: The e-commerce engine located in `medusa-backend/` that handles products, orders, and payments
- **Stack Auth**: The authentication system used for user management across all portals
- **Clerk**: The deprecated authentication system to be removed
- **Monorepo**: The workspace structure containing multiple related packages managed by pnpm
- **Route Group**: Next.js directory structure using parentheses for organization without affecting URL paths

## Requirements

### Requirement 1: Consolidate Frontend Applications

**User Story:** As a developer, I want a single Next.js application containing all portals, so that I can maintain consistent code and reduce deployment complexity

#### Acceptance Criteria

1. WHEN the farmer-portal directory exists, THE Frontend Application SHALL incorporate all farmer-portal routes under `/farmer/*` path prefix
2. WHEN farmer-portal components are migrated, THE Frontend Application SHALL organize them under `components/farmer/` directory
3. WHEN the migration is complete, THE Monorepo SHALL contain all farmer functionality within the Frontend Application directory
4. WHEN imports are updated, THE Frontend Application SHALL reference the new component locations without errors
5. WHERE farmer-specific layouts exist, THE Frontend Application SHALL preserve them under the `/farmer` route structure

### Requirement 2: Remove Deprecated Authentication System

**User Story:** As a developer, I want all Clerk references removed from the codebase, so that we use only Stack Auth and avoid authentication conflicts

#### Acceptance Criteria

1. THE Frontend Application SHALL use only Stack Auth packages for authentication imports
2. WHEN authentication is required, THE Frontend Application SHALL use Stack Auth exclusively
3. THE Monorepo SHALL contain only Stack Auth environment variables for authentication configuration
4. WHEN components require authentication state, THE Frontend Application SHALL use Stack Auth hooks and utilities
5. THE Frontend Application SHALL contain documentation files referencing only Stack Auth setup

### Requirement 3: Standardize Environment Configuration

**User Story:** As a developer, I want clean, well-documented environment files, so that I can configure the application correctly across environments

#### Acceptance Criteria

1. THE Frontend Application SHALL contain a `.env.example` file with all required Stack Auth variables
2. THE Medusa Backend SHALL contain a `.env.example` file with database and Redis configuration
3. THE Monorepo SHALL contain environment files only within package directories
4. WHEN environment variables are documented, THE Frontend Application SHALL include comments explaining each variable's purpose
5. THE Frontend Application SHALL require `NEXT_PUBLIC_MEDUSA_BACKEND_URL` for backend communication

### Requirement 4: Implement Proper Git Ignore Rules

**User Story:** As a developer, I want comprehensive .gitignore rules, so that sensitive and generated files are never committed

#### Acceptance Criteria

1. THE Monorepo SHALL ignore all `.env` files except `.env.example` files
2. THE Monorepo SHALL ignore all `node_modules/` directories at any depth
3. THE Monorepo SHALL ignore build output directories including `.next/`, `dist/`, and `.turbo/`
4. THE Monorepo SHALL ignore IDE-specific files and directories
5. THE Monorepo SHALL ignore log files with `*.log` pattern

### Requirement 5: Clean Up Temporary Documentation

**User Story:** As a developer, I want only essential documentation files, so that I can find relevant information quickly without clutter

#### Acceptance Criteria

1. THE Monorepo SHALL remove all files with names matching `*PUSH*.md` pattern
2. THE Monorepo SHALL remove all files with names matching `*FIX*.md` pattern
3. THE Monorepo SHALL remove all files with names matching `*VERCEL*.md` pattern
4. THE Monorepo SHALL maintain documentation only in `docs/` directory and essential root-level files
5. WHEN cleanup is complete, THE Monorepo SHALL contain fewer than 10 markdown files in the root directory

### Requirement 6: Restructure Application Routes

**User Story:** As a user, I want clear, logical URL paths for each portal, so that I can navigate the application intuitively

#### Acceptance Criteria

1. THE Frontend Application SHALL serve the landing page at `/` path
2. THE Frontend Application SHALL serve customer shopping interface at `/shop` path
3. THE Frontend Application SHALL serve farmer portal routes under `/farmer/*` path prefix
4. THE Frontend Application SHALL serve admin panel routes under `/admin/*` path prefix
5. THE Frontend Application SHALL use descriptive route group names that clarify application structure

### Requirement 7: Configure Monorepo Workspace

**User Story:** As a developer, I want proper monorepo configuration, so that I can run commands across packages efficiently

#### Acceptance Criteria

1. THE Monorepo SHALL define workspaces in `pnpm-workspace.yaml` including rythumowas.shop, medusa-backend, and packages/*
2. THE Monorepo SHALL provide npm scripts for running development servers for individual packages
3. THE Monorepo SHALL provide npm scripts for building all packages in dependency order
4. WHEN `pnpm dev` is executed, THE Monorepo SHALL start all development servers in parallel
5. THE Monorepo SHALL use pnpm as the package manager consistently across all packages

### Requirement 8: Integrate Authentication with Backend

**User Story:** As a developer, I want Medusa backend to recognize Stack Auth users, so that user context is available for authorization and personalization

#### Acceptance Criteria

1. WHEN a Frontend Application makes requests to Medusa Backend, THE Frontend Application SHALL include Stack Auth user ID in request headers
2. WHEN Medusa Backend receives authenticated requests, THE Medusa Backend SHALL extract user context from headers
3. THE Frontend Application SHALL provide a utility function for creating authenticated Medusa client instances
4. THE Medusa Backend SHALL provide middleware for validating Stack Auth context
5. WHEN user role is FARMER, THE Medusa Backend SHALL filter data access based on farmer ownership

### Requirement 9: Update Project Documentation

**User Story:** As a new developer, I want clear, accurate documentation, so that I can understand the architecture and get started quickly

#### Acceptance Criteria

1. THE Monorepo SHALL contain a root `README.md` describing the three-tier architecture
2. THE Monorepo SHALL maintain documentation in `docs/` directory covering setup, architecture, deployment, and API
3. WHEN documentation describes authentication, THE Monorepo SHALL reference only Stack Auth
4. THE Monorepo SHALL provide quick start instructions for running both frontend and backend
5. WHEN architecture is documented, THE Monorepo SHALL include diagrams showing data flow between components

### Requirement 10: Validate Build Success

**User Story:** As a developer, I want all packages to build successfully, so that I can deploy the application without errors

#### Acceptance Criteria

1. WHEN `pnpm build:shop` is executed, THE Frontend Application SHALL build without TypeScript errors
2. WHEN `pnpm build:backend` is executed, THE Medusa Backend SHALL build without compilation errors
3. THE Frontend Application SHALL reference only existing file paths after restructuring
4. THE Frontend Application SHALL import only from existing packages and directories
5. WHEN builds complete, THE Monorepo SHALL produce deployable artifacts for both frontend and backend
