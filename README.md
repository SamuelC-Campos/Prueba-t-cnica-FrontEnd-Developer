# Pokémon Trainer Profile App

This is a web application built with Angular that allows users to create a Pokémon trainer profile and select their Pokémon team.

## Features

* **Trainer Profile Setup:**
    * Upload profile image.
    * Enter name and hobby.
    * Age validation determines required document type (DUI for 18+).
    * **DUI Input Mask:** The DUI field strictly accepts numbers only and automatically formats to `00000000-0` (8 digits, hyphen, 1 digit) in real-time. Invalid characters are blocked.
* **Pokémon Selection:**
    * Search and filter Pokémon.
    * Select a team of up to 3 Pokémon.
* **Profile & Team Summary:**
    * View a summary of the trainer's profile and selected Pokémon team.
    * Option to edit the trainer profile.

## Technologies Used

* Angular CLI
* Angular
* TypeScript
* HTML & CSS
* Material Icons
* PokeAPI (for Pokémon data)

## Prerequisites

Make sure you have these installed:

* **Node.js & npm:**
    * **Node.js version `v22.12.0` is required.** You can check your current version using `node --version`.
    * It's highly recommended to use a Node Version Manager (like `nvm`) to easily manage and switch between Node.js versions.
    * Download Node.js from [nodejs.org](https://nodejs.org/).
* **Angular CLI:** Install globally:
    ```bash
    npm install -g @angular/cli
    ```

## Setup and Run

Follow these steps to get the project running locally:

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/SamuelC-Campos/Prueba-t-cnica-FrontEnd-Developer.git](https://github.com/SamuelC-Campos/Prueba-t-cnica-FrontEnd-Developer.git)
    cd Prueba-t-cnica-FrontEnd-Developer
    ```

2.  **Install Dependencies:**
    In the project root, run:
    ```bash
    npm install
    ```

3.  **Start the Application:**
    ```bash
    ng serve
    ```
    This will compile the app and start a development server.

4.  **View in Browser:**
    Open your web browser and go to `http://localhost:4200/`. The app will auto-reload with any code changes.

## Build for Production (Optional)

To create a production-ready build of your application:

```bash
ng build