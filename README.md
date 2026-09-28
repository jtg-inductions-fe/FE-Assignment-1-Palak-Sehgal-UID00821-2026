## Getting Started

### Prerequisites

-   **Node.js**: Version 20+. You can download and install it from https://nodejs.org/en
-   **npm**: Node.js package manager, which comes bundled with Node.js.

### Installing

To set up the project on your local environment, follow these steps:

1. **Clone the Repository**

    First, you need to clone the repository.
    HTTPS: https://github.com/jtg-inductions-fe/FE-Assignment-1-Palak-Sehgal-UID00821-2026.git
    SSH: git@github.com:jtg-inductions-fe/FE-Assignment-1-Palak-Sehgal-UID00821-2026.git

2. **nvm (Node Version Manager)**: If the required Node version 20+ is already installed and active, you can skip this step else you can use nvm (Node Version Manager). Here's how to use it:

    - **Switch Node Version**: If the required Node version is already installed, run:

    ```bash
    nvm use
    ```

    - **Install Node Version**: If the required Node version isn’t installed, you can install it by running:

    ```bash
    nvm install
    ```

    > **_Tip:_** If you don't have nvm installed, you can install it by following the instructions on [nvm-sh/nvm](https://github.com/nvm-sh/nvm).

    Alternatively, you can update Node.js directly by downloading the latest version from the official website: nodejs.org.

3. **Install the necessary dependencies using npm**

    ```bash
    npm install
    ```

4. **Environment Variables Setup**

    Create `.env.development` and `.env.production` files in the root directory if they don't exist.

    **For Development (`.env.development`)**:
    ```env
    VITE_PORT=3000
    ```

    **For Production (`.env.production`)**:
    ```env
    VITE_PORT=8080
    ```


5. **Run the Development Server**

    ```bash
    npm run dev
    ```

    The app will typically be available at `http://localhost:3000`, but check the terminal output for the exact URL.

    > **_NOTE:_** The preferred way to change the development server's port number is by setting `VITE_PORT` in your environment file (`.env.development`):
    >
    > ```env
    > VITE_PORT=<New Port>
    > ```
    >
    > Alternatively, you can modify the server options directly in **vite.config.dev.js** at the root level of the project:
    >
    > ```js
    > server: {
    >   port: <New Port>,
    > }
    > ```

6. **Build the Project**

    ```bash
    npm run build
    ```

    This command will generate the optimized files in the dist directory.

7. **Lint the Code**

    ```bash
    npm run lint
    ```
    This command will scan the project and check for any lint errors.
    

8. **Fix Linting Errors**

    ```bash
    npm run lint:fix
    ```

    This command will automatically fix ESLint errors across the project.

9. **Code Formatting (Prettier)**

   ```bash
    npm run prettier
    ```

   This command will automatically format all files using Prettier.

10. **Preview Production Build**

    ```bash
    npm run preview
    ```

    This command will preview the built application locally (after running npm run build) run this.

## Updating IcoMoon Icons

To maintain consistency and ensure the icon fonts, CSS, and selection data stay in sync, follow these steps when adding or modifying icons:

1. Go to the [IcoMoon App](https://icomoon.io/app/).
2. Click on **Import Icons** and upload the existing `src/styles/vendors/selection.json` file to load the current icon set.
3. Add or remove the icons as needed.
4. Click **Generate Font** at the bottom right of the screen.
5. Download the generated `.zip` file and extract it.
6. Replace the following files in the project to keep everything synchronized:
    - Replace the font files (`.ttf`, `.woff`, etc.) in your `public/assets/typography/` directory.
    - Replace the `icomoon.css` file in the `src/styles/vendors/` directory.
    - Replace the `selection.json` file in the `src/styles/vendors/` directory with the new one from the downloaded zip.
