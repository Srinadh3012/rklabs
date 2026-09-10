# Antigravity Developer Guide

## System Architecture

This project has been transformed from a Lovable-generated prototype into a clean, database-agnostic repository architecture.

It uses:
- **Frontend**: TanStack Start, React 19, Tailwind CSS 4
- **Backend APIs**: TanStack Server Functions (`src/lib/api/*`)
- **Data Layer**: Clean Repository Interfaces (`src/services/database/`) currently backed by a robust In-Memory Mock Store for development.
- **Authentication**: JWT-based server sessions (mocked auth via email/password during dev)

## Important Rules

<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project has been decoupled from Lovable. The Lovable connection is no longer active. You do not need to worry about preserving Lovable's sync state or git history requirements. You are free to rebase, amend, and restructure as needed.
<!-- LOVABLE:END -->

## Roadmap
When you are ready to attach a real database, implement the interfaces defined in `src/types/models.ts` and swap the implementation in `src/services/database/index.ts`.
