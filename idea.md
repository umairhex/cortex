# Cortex DB

## Core Idea

### Problem

Developers building content-driven applications (websites, mobile apps, dashboards) need a content management backend, but existing headless CMS tools lock them into a single database provider, require complex self-hosting, or charge premium prices for basic schema management. Teams with existing databases in MongoDB, PostgreSQL, or Supabase cannot easily layer a visual content management interface over their current data without migrating to a new system. There is no lightweight, open-source headless CMS that lets developers bring their own database and manage content through a modern admin panel.

### Solution

Cortex DB is an open-source headless CMS with a "bring your own database" philosophy. It provides a visual admin panel (Vue/React SPA) backed by an Express API where users define content schemas ("collections"), manage entries through dynamic forms, upload media, and connect external databases (MongoDB, Supabase, PostgreSQL). The system stores collection definitions and user data internally while proxying content CRUD operations to whichever external database the user connects. Database introspection allows users to point Cortex at an existing database and automatically discover its schemas, bridging legacy data with a modern CMS interface.

### Value

Cortex DB eliminates the database lock-in problem that plagues most headless CMS tools. Developers keep their existing database infrastructure and gain a visual management layer without data migration. The adapter pattern means adding support for new database providers is straightforward. Public read-only API endpoints enable frontend consumption without authentication, supporting JAMstack and static-site-generation workflows. The separation of frontend (SPA) and backend (API) allows independent scaling and deployment.

### User Outcome

A developer signs in, connects their existing MongoDB or PostgreSQL database, introspects its schemas, and immediately begins managing content through a visual admin panel. New content types can be defined with a drag-and-drop field builder. Content entries are created and edited through dynamic forms that mirror the schema. Frontend applications consume the data through public API endpoints or authenticated routes. The entire system runs self-hosted with no vendor dependency.

---

## Tech Stack

- **Frontend**: React, Vite, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, Lucide React, Sonner, UIW Markdown Editor
- **Data Fetching**: TanStack Query, TanStack Table
- **Client Routing**: React Router
- **Data Visualization**: Recharts
- **Animations**: Framer Motion, GSAP
- **Drag & Drop**: DND Kit
- **Form Validation**: Zod, React Hook Form
- **Smooth Scrolling**: Lenis
- **Architecture**: Client-side single-page application
- **Libraries**: Axios, React Top Loading Bar, React Syntax Highlighter

---

## Key Features

### Collection Types Builder

#### Purpose

Enable visual definition of content schemas without writing code or database migrations.

#### Capabilities

- Define "collection" types (multi-item lists) or "single" types (singleton pages like About or Settings)
- Add fields from a categorized picker with 12+ field types across 8 groups
- Field types include: short text, long text, rich text, markdown, date, single image, multiple images, boolean, integer, decimal, email, URL, and color
- Configure field labels, requirements, and validation
- Drag-and-drop field reordering via dnd-kit
- Fields drive both the builder UI and content editing forms at runtime

#### User Benefit

Content schemas are defined visually in minutes, and changes take effect immediately — no code changes, no migrations, no deployment needed.

---

### Content Manager

#### Purpose

Provide CRUD interfaces for creating and managing content entries within defined collections.

#### Capabilities

- Dynamic form generation matching collection schema definitions
- Create, read, update, and delete content entries
- Form validation based on field requirements and types
- Support for rich content fields (markdown editor) and media embedding
- Inline editing with immediate feedback
- TanStack Table-powered data views for large collections

#### User Benefit

Content editors work with intuitive forms that mirror the schema structure, requiring no technical knowledge to manage entries effectively.

---

### External Database Integration

#### Purpose

Allow users to connect and manage existing databases through the Cortex interface without data migration.

#### Capabilities

- Connect external MongoDB, PostgreSQL, and Supabase databases
- Test connections before committing
- Introspect connected databases to discover existing tables and collections
- Infer schemas from existing data for automatic collection definition
- Storage adapter pattern (MongoAdapter, PostgresAdapter) routing CRUD operations to the appropriate database
- Manage content in external databases through the same visual interface used for internal collections

#### User Benefit

Developers layer a CMS admin panel over their existing database infrastructure without migrating data, changing schemas, or modifying their application code.

---

### Media Library and Public API

#### Purpose

Handle file uploads and provide unauthenticated API endpoints for frontend content consumption.

#### Capabilities

- Upload single or multiple files with MIME type filtering (images, PDF, text)
- Browse, copy URLs, and delete uploaded media
- File metadata stored in MongoDB with physical files on disk or /tmp for serverless
- Public read-only API endpoints for collections and items (unauthenticated, rate-limited at 100 requests per minute)
- Separate authenticated API for full CRUD operations

#### User Benefit

Frontend applications and static site generators consume content without authentication overhead, while the admin interface maintains full access control for content management.

---

## System Structure

### User Interface

The frontend is a single-page application with a marketing landing page (hero, features, supported databases, FAQ) and an authenticated dashboard. The dashboard includes a statistics overview (total collections, types breakdown, recent activity), the Collection Types Builder, the Content Manager, the Media Library, an integrations management page, and a documentation viewer. Dark and light themes are supported with system-aware detection.

### Data Layer

The system uses a dual-database architecture. MongoDB serves as the internal database for users, collection definitions (schemas), integration configurations, and file metadata. External databases (MongoDB, PostgreSQL, Supabase) store actual content items, accessed through the storage adapter pattern. This separation means Cortex manages schemas and access control internally while proxying content operations to user-owned storage.

### Access Model

Authentication uses cookie-based JWT with automatic silent refresh. Access tokens (15-minute expiry) and refresh tokens (7-day expiry) are stored in httpOnly cookies. An Axios interceptor handles automatic token rotation by queuing failed requests during refresh. Role-based authorization distinguishes between admin (schema management, integrations) and user (content management) roles. The first user to sign up automatically becomes admin. Public API endpoints provide unauthenticated read access with separate rate limits.

### Persistence

Internal data (users, schemas, integrations, files) persists in MongoDB. Content data persists in whichever external database the user connects. The serverless-ready architecture supports Vercel deployment with connection caching and /tmp file storage. Refresh tokens are hashed with bcrypt before database storage for security. Password reset uses cryptographically random tokens with expiry.

---

## User Workflow

### Entry

Users sign up with email and password. The first registered user automatically becomes the admin. The dashboard provides an immediate overview of collections, types, and recent activity.

### Creation

Admins define collection schemas using the visual builder — naming the collection, choosing its type (collection or single), adding and reordering fields. Users then create content entries through dynamic forms generated from the schema. Media files are uploaded through the library interface.

### Organization

Collections organize content by type (blog posts, products, pages, settings). Fields within collections define the structure. External database integrations separate content by data source. The dashboard provides a centralized view of all content types and their entry counts.

### Retrieval

The Content Manager provides table views for browsing entries within collections. Public API endpoints serve content to frontend applications. Media URLs are copyable for embedding in content. The integration introspection feature discovers existing data in connected databases.

### Reuse

Collection schemas serve as reusable templates for content structure. Public API endpoints enable multiple frontends to consume the same content. External database connections allow Cortex to manage content that other applications also access directly.

---

## Documentation / Support Layer

### Purpose

Guide developers through system setup, schema design, database integration, and API consumption.

### Contents

- Getting started with self-hosted deployment
- Collection and field type reference
- External database connection and introspection guide
- Public API endpoint documentation for frontend consumption
- Authentication and role management
- Media library usage and file type support

### User Benefit

Developers understand how to set up the system, design schemas, connect databases, and consume content via API — covering both the admin panel workflow and the developer integration workflow.

---

## Product Positioning

### Category

Open-source headless CMS — vendor-agnostic content management system with visual schema builder.

### Scope

Focuses on visual content schema design, entry management, media handling, and database integration. Intentionally avoids becoming a page builder, frontend framework, or deployment platform. The product is the management and API layer between content editors and the databases that store their content.

### Primary Users

Developers and small teams who need a self-hosted, open-source headless CMS that works with their existing databases — particularly those building JAMstack sites, mobile app backends, or content-driven applications who want visual content management without database lock-in.

### Core Value Proposition

An open-source headless CMS with a "bring your own database" architecture — connecting to existing MongoDB, PostgreSQL, and Supabase instances with schema introspection, visual content management, and public API endpoints, all without requiring data migration or vendor lock-in.
