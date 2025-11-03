# React Todos App with Supabase Authentication

This is a simple todos application built with React, Vite, and Tailwind CSS, featuring authentication powered by Supabase.

## Features

- User authentication (sign up, sign in, sign out)
- Create, read, update, and delete todos
- Real-time updates using Supabase subscriptions
- Responsive UI with Tailwind CSS

## Tech Stack

- React 19
- Vite
- Tailwind CSS v4
- Supabase (Authentication & Database)

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

3. Set up Supabase:
   - Create a Supabase project at https://supabase.com/
   - Update the `.env` file with your Supabase credentials
   - Follow the instructions in [SUPABASE_SETUP.md](SUPABASE_SETUP.md) to create the todos table

4. Run the development server:
   ```
   npm run dev
   ```

5. Visit `http://localhost:5175` in your browser

## Folder Structure

```
src/
  ├── components/
  │   ├── Login.jsx       # Authentication component
  │   ├── TodoList.jsx    # Main todo list component
  │   ├── AddTodo.jsx     # Component to add new todos
  │   └── TodoItem.jsx    # Individual todo item component
  ├── helper/
  │   └── helper.js       # Supabase client configuration
  ├── App.jsx             # Main application component
  └── main.jsx            # Application entry point
```

## How to Use

1. Sign up for a new account or log in with existing credentials
2. Add new todos using the input field
3. Mark todos as complete by checking the checkbox
4. Edit or delete todos using the action buttons
5. Log out when finished

## Supabase Setup

For detailed instructions on setting up the Supabase database, please refer to [SUPABASE_SETUP.md](SUPABASE_SETUP.md).

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the production-ready application
- `npm run preview` - Previews the production build locally
- `npm run lint` - Runs ESLint to check for code issues

## Learn More

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/)