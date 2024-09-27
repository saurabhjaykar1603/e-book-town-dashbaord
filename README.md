Here’s a `README.md` template you can use to describe your dashboard for managing books via an API. This guide includes an explanation of the tech stack you're using, setup instructions, and usage details:

---

# Book Dashboard

This dashboard allows you to manage books via API, including functionalities to register/login users, fetch a list of books, create new books, update existing books, and view individual books. The project is built with **Vite**, **Tailwind CSS**, and **ShadCN UI components** for a sleek and modern interface.

## Features

- **User Authentication**: Register and login users with JWT-based authentication.
- **Manage Books**: 
  - View all books.
  - Create new books with file uploads.
  - Update existing books.
  - View details of individual books.
- **Built with Modern Technologies**:
  - **Vite**: Fast build tool for an optimized development experience.
  - **Tailwind CSS**: Utility-first CSS framework for responsive design.
  - **ShadCN UI**: Pre-built UI components for a beautiful interface.

## Tech Stack

- **Frontend**: React with Vite, Tailwind CSS for styling, and ShadCN UI components.
- **Backend**: Axios for making API requests to the backend server hosted on Render.
- **State Management**: Zustand for managing the authentication token across the application.
- **API**: The backend API is hosted on Render.

## Prerequisites

- **Node.js** (>= 14.x.x) and **npm** (or **yarn**)
- Backend API hosted at [e-book-town-server](https://e-book-town-server-1.onrender.com)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/book-dashboard.git
   cd book-dashboard
   ```

2. **Install dependencies**:

   Using npm:
   ```bash
   npm install
   ```

   Or using yarn:
   ```bash
   yarn install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root of the project and add the following:

   ```env
   VITE_API_BASE_URL=https://e-book-town-server-1.onrender.com
   ```

4. **Start the development server**:

   Using npm:
   ```bash
   npm run dev
   ```

   Or using yarn:
   ```bash
   yarn dev
   ```

   The app should be running on [http://localhost:3000](http://localhost:3000).

## API Endpoints

The application interacts with the following API endpoints:

- **POST** `/api/users/login`: Login user.
- **POST** `/api/users/register`: Register a new user.
- **GET** `/api/books`: Fetch all books.
- **POST** `/api/books/create`: Create a new book (multipart form-data).
- **PATCH** `/api/books/:id`: Update an existing book (multipart form-data).
- **GET** `/api/books/:id`: Get a specific book by its ID.

## Usage

### Authentication

- To interact with any of the book-related APIs, you need to be logged in.
- On successful login, the JWT token is stored in Zustand’s token store, and the Axios interceptor automatically includes it in API requests.

### Managing Books

1. **View Books**: 
   - After logging in, you can fetch and view all books by calling the `getBooks()` function, which sends a request to `/api/books`.
   
2. **Create a Book**: 
   - To create a new book, use the `createBook()` function and pass the `FormData` object containing the book details and file upload.
   
3. **Update a Book**: 
   - For updating an existing book, use the `updateBook()` function with the `FormData` and book ID.
   
4. **View a Book**: 
   - To get details of a specific book, call the `getBook()` function with the book’s ID.

### UI Components

The UI uses **ShadCN** pre-built components, styled with **Tailwind CSS**, making it fully responsive and easy to customize.

### Tailwind CSS

Tailwind CSS is already set up in this project. You can modify the styles in the `tailwind.config.js` file or directly use utility classes in your components.

### Zustand Store

State management for authentication is handled with Zustand. The `useTokenStore` hook provides access to the token throughout the app.

### Axios Interceptors

Axios interceptors are configured to automatically append the JWT token (if available) to the request headers.

## Deployment

1. **Build the project**:

   Using npm:
   ```bash
   npm run build
   ```

   Or using yarn:
   ```bash
   yarn build
   ```

   This will generate a `dist` folder with the optimized build.

2. **Deploy on Render**:
   - Follow the [Render Deployment Guide](https://render.com/docs/deploy-node-express-app) to deploy both the frontend and backend.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Acknowledgements

- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.dev/)
- [Zustand](https://github.com/pmndrs/zustand)

---

Feel free to customize the README with additional information about your project as needed!
