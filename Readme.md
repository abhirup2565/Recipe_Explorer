# 🍳 Recipe Ideas

### General Overview

Taylor, a busy professional, often finds it hard to decide what to cook after work. Time, mood, and available ingredients all affect that decision — but browsing multiple sites to find something suitable takes too long.
**Recipe Ideas** solves this by providing an easy, intuitive, and responsive interface to explore recipes from *TheMealDB API*. It helps users search dishes, filter by cuisine or category, discover random meals, and save favorites or ingredients for later — all in one place.

---

## 🧰 Tech Stack

* **Frontend:** React.js
* **HTTP Client:** Axios
* **State Management:** Context API
* **API Source:** [TheMealDB API](https://www.themealdb.com/api.php)

---

## ✨ Features and Their Rationale

### ⭐ Favorites

Acts as a personal *bookmark system* for busy users. Taylor can save recipes he likes or plans to cook later.
All favorites are stored in **localStorage**, ensuring they persist across sessions without needing authentication.

### 🛒 Ingredient Cart

Serves as a quick *ingredient list* for each recipe. Taylor can add ingredients directly from recipes and use the list while shopping or planning meals — effectively turning the app into a lightweight shopping planner.

### 🔍 Smart Search with Debouncing

The search bar allows users to find dishes by name or ingredient.
To avoid excessive API calls and improve performance, a **debounce** mechanism delays requests until the user stops typing — making the experience smoother and reducing server load.

### 🍱 Filter by Cuisine or Category

When Taylor knows his mood but not the exact dish, filters help him quickly narrow options — whether he’s craving Italian pasta or a healthy salad.
Filters enhance usability by providing structured exploration instead of random browsing.

### 🎲 Surprise Me

Adds a fun element to the experience by fetching a *random recipe*.
Perfect for when Taylor doesn’t want to decide and just wants to try something new.

---

## 🧩 Architectural Design Decisions

### 🧱 LocalStorage for Persistence

Since there’s no user authentication yet, **localStorage** was chosen to persist cart and favorite data.
It provides offline access, quick setup, and continuity between sessions — essential for busy users who may revisit the site later.

### 🌐 Axios + Centralized API Layer

All API endpoints are defined under `network/api.js`, and calls are made through a `fetchSafe` wrapper (Axios instance).
This centralization:

* Simplifies API management
* Reduces typos and duplication
* Makes switching or updating APIs effortless
* Adds consistent error handling and timeout logic

### ⚙️ Debounce Logic

Implemented manually without external libraries for finer control and reduced dependencies.
It improves both **performance** and **user experience**, ensuring efficient API usage while maintaining snappy interactions.

### 🧠 Context API for State Management

Context API maintains shared state (like favorites, cart, and display view) across pages.
It eliminates the need for prop drilling and ensures state continuity — for example, when using the back button to return to a filtered grid view without losing previous data.

---

## 🚀 Setup and Run

1. Clone the repository

   ```bash
   git clone https://github.com/abhirup2565/Recipe_Explorer
   ```

2. Move into the project folder

   ```bash
   cd recipe_explorer
   ```

3. Install dependencies

   ```bash
   npm install
   ```

4. Start the development server

   ```bash
   npm run dev
   ```

5. Open in your browser at
   [http://localhost:5173](http://localhost:5173)


