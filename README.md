# P2P File Transfer

A **peer-to-peer (P2P)** file sharing web app built with **Rust (Axum)** for the backend and **Next.js** for the frontend.  
Secure, direct, and fast file sharing via WebSocket without server storage!

---

## Features

- Real-time file sharing via WebSockets
- Fast chunked file transfer (5MB per chunk)
- Peer-to-peer architecture (no file uploads to server)
- Responsive, modern UI
- Automatic reconnection attempts
- Lightweight Rust backend server

---

## Tech Stack

| Part | Technology |
|:---|:---|
| Frontend | Next.js 14 (App Router), TailwindCSS, TypeScript |
| Backend | Rust, Axum, Tokio, WebSocket (broadcast + mpsc channels) |
| Protocol | WebSocket (wss://) |
| Deployment | Vercel (Frontend), Railway/Fly.io (Backend) |

---

## Project Structure

```bash
p2pfiletransfer/
    backend/       # Rust WebSocket server (Axum)
    frontend/      # Next.js frontend (Send and Receive pages)
README.md
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/p2pfiletransfer.git
cd p2pfiletransfer
```

### 2. Start the Backend Server (Rust)

```bash
cd backend
cargo run
```

Backend will run on `http://localhost:8000`.

### 3. Start the Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`.

✅ Make sure your frontend connects to backend at correct WebSocket URL.

---

## Deployment

| Platform | Link | Notes |
|:---|:---|:---|
| Frontend (Next.js) | [Vercel](https://vercel.com) | Auto-detects Next.js |
| Backend (Rust) | [Railway](https://railway.app) / [Fly.io](https://fly.io) | Simple Rust hosting |

Make sure to update the WebSocket URL to production in your frontend:

```ts
const ws = new WebSocket("wss://your-backend-url/ws");
```

---

### 🎬 Live Demo

![Live Demo](https://i.ibb.co/WvZQNnhf/p2pdemo.gif)

---

### 🖼 Screenshots

| Cover | Link Sharing |
|-------|--------------|
| ![Cover](https://i.ibb.co/DPzHBGKX/Coverp2p.png) | ![Link](https://i.ibb.co/21Mm49dT/linkp2p.png) |

| Transfer in Progress | Completed Transfer |
|----------------------|--------------------|
| ![Progress](https://i.ibb.co/278VwFyy/processp2p.png) | ![Done](https://i.ibb.co/8nHMN5Xr/p2p-Trasnfer-Complete.png) |

---

## Future Improvements (TODO)

- Password protected file transfers
- QR code sharing
- Multiple file transfers
- Upload progress and speed estimation

---

## Acknowledgements

- [Axum WebSocket Guide](https://docs.rs/axum/latest/axum/)
- [Next.js Documentation](https://nextjs.org/docs)
- Open Source Libraries and Inspirations

---
