# FoodLink — Cloud-Based Food Rescue Platform

A cloud-native, microservices-based food rescue platform connecting donors (restaurants, hostels, event organizers) with NGOs/volunteers.

## Project Structure

```
foodlink/
├── vercel.json
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── src/                     # React frontend (deploy this to Vercel)
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── components/
│   └── pages/
├── services/                # Python/FastAPI microservices (Docker)
│   ├── api-gateway/
│   ├── user-service/
│   ├── food-service/
│   ├── matching-service/
│   └── notification-service/
└── docker-compose.yml
```

## Running the Frontend Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Running the Full Microservices Stack (Docker)

```bash
docker compose up --build
```

This starts:
- API Gateway → `:8000`
- User Service → `:8001`
- Food Service → `:8002`
- Matching Service → `:8003`
- Notification Service → `:8004`
- MongoDB → `:27017`
- Redis → `:6379`

Note: the frontend in this repo runs as a self-contained simulation (all microservice
behavior — matching, notifications, service health — is mocked in React state) so it
can be deployed standalone to Vercel without needing the backend online. The FastAPI
services are provided separately for your Docker/Cloud demo and grading requirements.

## Deploying to Vercel

See the "Vercel Deployment Guide" section below.

### Steps

1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → **Add New → Project**.
3. Import your GitHub repo.
4. Framework Preset: **Vite**.
5. Root Directory: `.` (the repo root — where `package.json` lives).
6. Build Command: `npm run build` (auto-detected).
7. Output Directory: `dist` (auto-detected).
8. Click **Deploy**.

Your live app will be available at `https://<your-project-name>.vercel.app`.

## Teacher Presentation Script

**1. The Opening Hook**

"Imagine a hotel or convention center has 50 freshly cooked meals left over after an
event. Typically, this surplus goes to waste. FoodLink connects that restaurant with
verified local NGOs and volunteers who can immediately collect and distribute it."

**2. The Cloud Architecture Pitch**

"FoodLink is built as five independently containerized microservices: an API Gateway,
a User Service, a Food Service, a Matching Service (computes NGO proximity and
capacity), and a Notification Service (consumes events asynchronously via Redis)."

**3. The Live Walkthrough**

- Show the Landing Page with the FoodLink logo and layout.
- Open the Donor Hub → click **Donate Food** → fill in 35 meals of Vegetable Biryani → **Create Donation**.
- Point out the animated matching sequence (Matching Service finds Hope Foundation, 2.4 km away).
- Switch to NGO / Volunteer Hub → click **Claim Food**.
- Open Live Tracking → show the stepper: CREATED → MATCHED → CLAIMED → PICKUP → DELIVERED.

**4. The Money Moment (Fault Tolerance Demo)**

- Open **Admin / System Health** — all 7 components green.
- Click **🔴 Stop Notification Service**.
- Say: *"Notice that although the Notification Service has been stopped, our Food and
  Matching Services continue to accept donations and match NGOs seamlessly."*
- Click **Simulate New Event** to prove the platform keeps functioning.
- Click **🟢 Restart Notification Service** to bring it back to green.
- Conclude: *"This demonstrates the core advantages of microservices: fault isolation,
  independent scalability, and high availability in cloud environments."*
