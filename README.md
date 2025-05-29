# nextjs-job-board

## Prerequisites

- **Node.js**: v22.15.0 (see [.nvmrc](.nvmrc))
- **nvm**: Node Version Manager (install via [nvm-sh/nvm](https://github.com/nvm-sh/nvm))
- **pnpm**: Latest version (install via `npm install -g pnpm` or see [pnpm.io](https://pnpm.io/installation))
- **Supabase account**: [Sign up for free](https://supabase.com/) and create a project

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

4. Install dependencies

   ```sh
   pnpm install
   ```

5. Copy the environment variables file:

   ```sh
   cp .env.sample .env.local
   ```

6. Start the development server

   ```sh
   pnpm dev
   ```

## License

Copyright (c) 2025 Jonathan Christianto

This code is provided solely for the purpose of evaluating my technical skills as part of a job application process with Konexi. It may not be used, copied, distributed, or disclosed for any other purpose without my explicit written permission.
