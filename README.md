# 🌐 Portfolio Frontend

This is the **frontend application** for my personal portfolio — a dynamic and interactive platform showcasing my **projects**, **blogs**, **technical skills** and **personal information**.  
The system integrates with the backend API to enable **CRUD operations**, **authentication**, and **content management** with a smooth and responsive UI.

---

## 🚀 Project Overview

The portfolio allows the admin (owner) to manage and display content effortlessly through a role-based dashboard. It includes public pages for visitors to explore blogs, projects, and personal info, and private admin routes for managing portfolio data.

---

## ⚙️ Features

### 🌍 Public Pages
- **Home Page** – Interactive hero section with introduction and highlights  
- **About Page** – Displays biography, education, and technical skills  
- **Projects Page** – Showcases all projects with live and GitHub links  
- **Blogs Page** – Displays rich-text formatted blogs

### 🔐 Admin Dashboard
- **Authentication**
  - Admin-only login (NextAuth + JWT)
- **Projects Management**
  - Create, update, delete, and view all projects
  - Add necessary information & Upload thumbnails using Cloudinary
- **Blogs Management**
  - Create, edit, and delete blog posts
  - Rich text editor (React Quill) with image upload
- **User Info Management**
  - Update personal details, technical skills, and education background
- **Dynamic Rendering Optimization**
  - ISR (Incremental Static Regeneration) implemented for Blogs and Projects to improve performance and reduce rebuild time.
  - SSG (Static Site Generation) used for the About Page for faster load and better SEO.
- **Rich Text Editor** 
  - Blog and Project content/descriptions are created using React Quill, supporting formatted text, lists, and code snippets.
- **Form Validation**
  - All forms are integrated with React Hook Form and Zod for client-side schema validation and smooth user experience.
- **Feedback System**
  - Real-time success or error notifications using Sonner (React Toast) for user actions.
- **SEO Friendly Metadata**
  - Each dynamic page includes appropriate metadata for improved search visibility.
- **Loading States**
  - Optimized loading with skeleton components for better UX during data fetching.

---

## 🧠 Tech Stack

- **Next.js 14** — App Router structure  
- **TypeScript** — Strongly typed development  
- **Tailwind CSS** — Styling and responsive design  
- **ShadCN/UI** — Modern and accessible UI components  
- **Lucide Icons** — Icon system  
- **React Hook Form + Zod** — Form validation  
- **React Quill New** — Rich text editor for blogs  
- **NextAuth.js** — Secure authentication  
- **Cloudinary** — Image storage and optimization  
- **Sonner** — Toast notifications  
- **Framer Motion** — Subtle animations for better UX  

---

## 🧰 Setup & Installation

```bash
git clone https://github.com/nusrat-xahan05/Porfolio-Client.git
cd Porfolio-Client
npm install
npm run dev
```

---

## 🔧 Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
ADMIN_EMAIL=your_admin_email
AUTH_SECRET=your_auth_secret
```

---

### Live Link:
 - https://porfolio-client-chi.vercel.app

---

## 💡 Author

**Nusrat Jahan**  
Full Stack Developer | Passionate about creating efficient and scalable web applications.

