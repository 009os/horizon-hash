# 🏗️ Horizon Hash - Professional Architecture

## 📁 Directory Structure

```
src/
├── core/                    # Core infrastructure
│   ├── api/                 # API client abstraction
│   │   └── client.ts        # Main API client (easy to replace with HTTP calls)
│   ├── config/              # Configuration
│   │   └── env.ts           # Environment variables with validation
│   ├── errors/              # Custom error classes
│   │   └── app-error.ts     # Application error types
│   ├── types/               # Type definitions
│   │   └── database.ts      # Database response types
│   └── utils/               # Utilities
│       └── logger.ts        # Centralized logging
│
├── data/                     # Data Access Layer
│   └── repositories/         # Repository pattern
│       ├── post-repository.ts    # Post data access
│       └── view-repository.ts    # View count data access
│
├── services/                 # Business Logic Layer
│   ├── post.service.ts      # Post business logic
│   └── view.service.ts      # View tracking logic
│
├── lib/                      # Utilities & Client Configurations
│   ├── constants.ts         # App constants
│   ├── markdownToHtml.ts    # Markdown processing
│   ├── readingTime.ts       # Reading time calculation
│   ├── redis.ts             # Redis client
│   └── supabase.ts          # Supabase client
│
├── interfaces/              # TypeScript interfaces
│   ├── author.ts
│   └── post.ts
│
└── app/                      # Next.js App Router
    ├── _components/          # React components
    ├── api/                  # API routes
    └── [pages]/              # Page components
```
