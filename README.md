# CLIXORA

## Overview

**CLIXORA** is an advanced AI-powered thumbnail generator and editor specifically engineered for creators and YouTubers. It streamlines the design workflow by converting simple text inputs—style, color palette, description, and video title—into high-converting, click-ready thumbnails.

With an integrated dynamic HTML5 canvas and built-in AI analysis, CLIXORA helps creators skip complex graphic design software entirely while optimizing their Click-Through Rate (CTR).

When a user submits a prompt, the system immediately:
* Generates a high-quality background visual matching the user's conceptual style.
* Automatically layers and overlays text based on the video title.
* Provides an interactive canvas editor to manually customize elements.
* Scores the visual asset for audience engagement and CTR potential using AI.

This project combines **Generative AI + Advanced Image Manipulation + Full Stack Development** into a unified creator workspace.

---

## Key Features

* 🎨 **AI Image Generation:** Instantly creates custom background images from style and color descriptions.
* 🖼️ **Interactive Canvas Editor:** Fully functional drag-and-drop workspace to modify text, fonts, and layouts using Fabric.js.
* 🎛️ **Advanced Image Filters:** Fine-tune brightness, contrast, saturation, and exposure directly in the browser.
* 🤖 **AI CTR Scoring:** Evaluates thumbnail performance and visual impact using advanced Gemini AI analysis.
* 🔐 **Google OAuth Integration:** Quick and secure creator login to save and manage ongoing projects.
* 💾 **Cloud Storage & Exports:** Safely saves thumbnails to a personal dashboard or exports directly to the desktop in high resolution.

---

## Tech Stack

### Frontend
* React.js
* HTML5 Canvas & Fabric.js (for drag-and-drop layer editing)
* Tailwind CSS / CSS3

### Backend
* Node.js
* Express.js
* MongoDB (Database)

### Media & AI Services
* **Cloudflare Workers AI:** Powers the core image generation pipeline.
* **Gemini API:** Performs visual analysis to generate predictive CTR scores and design tips.
* **Cloudinary:** Cloud-based media management for storing and rendering generated thumbnails.

### Authentication
* Google OAuth 2.0 & JWT (JSON Web Tokens)

---

## System Architecture

1. User enters style, color, description, and title into the dashboard.
2. Cloudflare AI generates the primary background asset based on the description.
3. The image is passed to a **Fabric.js** canvas web view where the video title text is overlaid.
4. The user refines layout elements, applies filters (brightness/saturation), and tweaks properties on the canvas.
5. **Gemini API** reviews the final layout matrix to provide a conversion and predictive CTR score.
6. The thumbnail is finalized, backed up to **Cloudinary**, saved to the MongoDB dashboard tracker, and downloaded to the user's desktop.

---

## 🔄 Workflow

<p align="center">
  <img width="1024" height="280" alt="image" src="https://github.com/user-attachments/assets/e2043e92-89f6-461b-9744-f8007198ce16" />
</p>

---

## 📸 Output

Live link 🖇️ - https://clixora-omega.vercel.app/

---

## 🔧 Canvas Editor Capabilities (Fabric.js)

- Move, scale, and rotate text or graphical assets seamlessly.
- Real-time image adjustment sliders (Brightness, Saturation, Contrast).
- Font family, typography color, and styling manipulation.
- Single-click local export to your desktop at 1280x720 (YouTube Standard HD).
---
## Project Structure
```
CLIXORA/
│
├── frontend/ (React Workspace + Fabric.js Engine)
├── backend/ (Node + Express Core API)
├── models/ (MongoDB User & Thumbnail Schemas)
├── routes/ (Authentication, Generation, & Storage Routes)
├── controllers/ (Gemini Scoring & Cloudflare Handlers)
└── README.md
```
## Installation & Setup

### Frontend

```bash
cd frontend
npm install
npm start
```
### Backend

```bash
cd backend
npm install
npm run dev
```
### Environment Variables (.env)
Create a .env file in your backend directory and include the following structure

```
PORT=8000
MONGO_URI=mongodb+srv://sakshi_kadu:clixora@cluster0.2li2pex.mongodb.net/?appName=Cluster0
GEMINI_API_KEY=AQ.Ab8RN6JNmIYyAJ7jfEhM3RYMYsaKdF1YAkqogZz4g-C_JGeR6Q
JWT_SECRET=your_jwt_secret_signing_key

# Cloudinary Credentials (Media Storage)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Cloudflare Credentials (Image Generation)
CF_ACCOUNT_ID=your_cloudflare_account_id

CF_API_TOKEN=your_cloudflare_api_token

# Authentication
GOOGLE_CLIENT_SECRET=your_google_client_secret
---
```
## 🤝 Contributing & Support

We welcome contributions to make CLIXORA even better! If you want to contribute, follow these simple steps:

1. **Fork** the Repository.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a **Pull Request**.

---

## ⚡ Show Your Support

If you find this project useful or learned something from it, please consider giving it a star! It helps visibility and motivates further development.

⭐️ **Star this repository** to support the project!  
🍴 **Fork this repository** to build your own version!

---

Developed with ❤️ as part of a dedicated developer sprint focused on **Next-Generation Creator Tools**.
