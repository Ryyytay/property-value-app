# Property Valuation App — CLAUDE.md

## Project Goal
A web app where users search an address, get an estimated property value, see key property details, and browse nearby recent sales.

## Tech Stack
- **Frontend**: React (Vite) + TypeScript + Tailwind CSS
- **Backend**: Spring Boot 3 (Java 21) — REST API
- **Data**: [Domain API](https://developer.domain.com.au) or mock data for learning
- **Maps**: Leaflet.js + react-leaflet (free, no API key for basic use)
- **Build tools**: Maven (backend), npm (frontend)
- **Deployment**: Backend on Railway, Frontend on Vercel

## Project Layout
This is a **monorepo** with two separate apps:
```
property-value-app/
├── backend/    ← Spring Boot Java app
├── frontend/   ← React Vite app
└── CLAUDE.md
```
They run independently during development:
- Backend: `localhost:8080`
- Frontend: `localhost:5173` (calls backend via fetch)

---

## Learning Roadmap — Step by Step

Work through these phases in order. Each phase teaches a distinct concept in both the backend and frontend.

---

### Phase 1 — Project Scaffold
**What you'll learn**: How Spring Boot and React projects are structured, how the two apps talk to each other, and how to run them side by side.

**Backend tasks**:
1. Generate a Spring Boot project at [start.spring.io](https://start.spring.io) with:
   - Java 21, Maven, Spring Boot 3.x
   - Dependencies: **Spring Web**, **Spring Boot DevTools**
   - Group: `com.propertyapp`, Artifact: `backend`
2. Unzip into the `backend/` folder
3. Run `./mvnw spring-boot:run` — confirm `Started BackendApplication` in the terminal
4. Visit `localhost:8080` — you'll see a Whitelabel Error Page (that's fine, it means Spring is running)

**Frontend tasks**:
1. In the `frontend/` folder run: `npm create vite@latest . -- --template react-ts`
2. Run `npm install` then `npm run dev`
3. Visit `localhost:5173` — confirm the Vite + React default page loads
4. Delete the boilerplate in `src/App.tsx` and replace it with a heading: "Property Valuations"

**Done when**: Both servers run at the same time in separate terminals without errors.

---

### Phase 2 — First REST Endpoint (Backend)
**What you'll learn**: Spring Boot controllers, REST annotations, JSON responses, and how Java maps to JSON automatically.

**Tasks**:
1. Create `src/main/java/com/propertyapp/backend/controller/PropertyController.java`
2. Annotate it with `@RestController` and `@RequestMapping("/api")`
3. Add a `GET /api/property` endpoint that accepts `?address=` as a query parameter (`@RequestParam`)
4. For now return **hardcoded mock data** as a Java record or POJO — Spring will serialize it to JSON automatically
5. Mock data shape (create a `PropertyResponse` record):
   ```java
   record PropertyResponse(
       String address,
       long estimatedValue,
       int bedrooms,
       int bathrooms,
       int carSpaces,
       int landSize,
       String propertyType,
       long lastSoldPrice,
       String lastSoldDate
   ) {}
   ```
6. Enable CORS so the React frontend (port 5173) can call the backend (port 8080) — add `@CrossOrigin(origins = "http://localhost:5173")` to the controller
7. Test by visiting `localhost:8080/api/property?address=test` in the browser — you should see JSON

**Done when**: The browser shows a JSON response from Spring Boot.

---

### Phase 3 — Address Search UI (Frontend)
**What you'll learn**: React controlled inputs, form submission, `useState`, component composition, and Tailwind CSS styling.

**Tasks**:
1. Install Tailwind: follow [tailwindcss.com/docs/installation/using-vite](https://tailwindcss.com/docs/installation/using-vite)
2. Create `src/components/SearchBar.tsx` — a text input + submit button
3. Wire up `useState` to track the typed address
4. On submit, log the address to the console (no API call yet)
5. Style it: centered on the page, large input, prominent blue button

**Done when**: Typing an address and clicking Search logs it to the console.

---

### Phase 4 — Connect Frontend to Backend
**What you'll learn**: `fetch` API, async/await, loading and error states in React, and how the two apps communicate over HTTP.

**Tasks**:
1. Create `src/api/property.ts` — a typed fetch function:
   ```ts
   export async function fetchProperty(address: string): Promise<PropertyResponse> {
     const res = await fetch(`http://localhost:8080/api/property?address=${encodeURIComponent(address)}`);
     if (!res.ok) throw new Error("Not found");
     return res.json();
   }
   ```
2. Define the `PropertyResponse` TypeScript type to match the Java record
3. In `App.tsx`, call `fetchProperty` on form submit
4. Track three states: `loading`, `error`, `data`
5. Show a spinner while loading, an error message on failure, and the raw JSON stringified on success

**Done when**: Submitting the search form shows the mock JSON from Spring Boot on screen.

---

### Phase 5 — Valuation Card (Frontend)
**What you'll learn**: Props, component design, currency formatting, and visual hierarchy.

**Tasks**:
1. Create `src/components/ValuationCard.tsx` — accepts a `PropertyResponse` as a prop
2. Show the estimated value large and prominent: `$1,250,000`
3. Add a ±10% range below it: `$1,125,000 – $1,375,000`
4. Add a confidence badge (hardcode "High" for now)
5. Show all other fields (beds, baths, cars, land size, property type) in a grid
6. Format currency with `Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' })`

**Done when**: The valuation card renders with all fields and formatted numbers.

---

### Phase 6 — Nearby Sales (Backend + Frontend)
**What you'll learn**: Java lists, nested response objects, sorting in Java, and rendering lists in React.

**Backend tasks**:
1. Create a `NearbySale` record: `address`, `soldPrice`, `soldDate`, `bedrooms`, `distanceKm`
2. Add a `List<NearbySale> nearbySales` field to `PropertyResponse`
3. Return at least 5 hardcoded nearby sales from the controller, sorted by `soldDate` descending

**Frontend tasks**:
1. Create `src/components/NearbySalesList.tsx`
2. Render each sale as a row: address, price, date, beds, distance
3. Show "X months ago" using `Intl.RelativeTimeFormat`

**Done when**: At least 5 mock nearby sales display below the valuation card.

---

### Phase 7 — Map View (Frontend)
**What you'll learn**: Integrating third-party React libraries, rendering a map, and placing markers with popups.

**Tasks**:
1. `npm install leaflet react-leaflet` and `npm install -D @types/leaflet`
2. Add the Leaflet CSS import to `main.tsx`: `import 'leaflet/dist/leaflet.css'`
3. Fix the Leaflet default icon bug (known issue — copy the icon fix snippet from the Leaflet docs)
4. Create `src/components/PropertyMap.tsx`
5. Add lat/lng fields to `PropertyResponse` — hardcode them in the Spring Boot mock data for now
6. Center the map on the subject property, place a marker for it
7. Place markers for each nearby sale; clicking one shows address + price in a popup

**Done when**: A map renders with the subject property and nearby sales as clickable pins.

---

### Phase 8 — Service Layer & Application Logic (Backend)
**What you'll learn**: Spring Boot service classes, separation of concerns, and basic valuation logic.

**Tasks**:
1. Create `PropertyService.java` annotated with `@Service`
2. Move all mock data out of the controller into the service
3. Add a simple valuation algorithm in the service:
   - Base value = average of nearby sales prices
   - Adjust ±5% for each bed/bath difference from the average
4. Inject the service into the controller with `@Autowired` (or constructor injection)
5. The controller becomes thin — it just calls the service and returns the result

**Done when**: The valuation changes based on the nearby sales data, and the controller has no business logic.

---

### Phase 9 — Real API Integration (Domain API)
**What you'll learn**: Calling external REST APIs from Spring Boot using `RestClient`, reading API keys from config, and error handling.

**Tasks**:
1. Sign up at [developer.domain.com.au](https://developer.domain.com.au) (free tier)
2. Add to `backend/src/main/resources/application.properties`:
   ```
   domain.api.key=your_key_here
   ```
3. Inject it with `@Value("${domain.api.key}")`
4. Use Spring's `RestClient` (Spring Boot 3.2+) to call Domain's address search and listings endpoints
5. Map the API response to your existing `PropertyResponse` shape in the service
6. Handle API errors: return a clear error response rather than crashing
7. Add geocoding to get lat/lng for the map (Domain API includes coordinates)

**Done when**: A real Australian address returns real property data and nearby sales.

---

### Phase 10 — Polish & UX
**What you'll learn**: Responsive design, skeleton loaders, empty states, and page titles.

**Tasks**:
1. Add skeleton loaders (gray animated blocks) while data loads
2. Make the layout responsive — stacks on mobile, side-by-side on desktop
3. Add an empty/no-results state with a helpful message
4. Set the browser tab title dynamically based on the searched address
5. Add a "Search again" link back to the home state

**Done when**: The app looks professional on both desktop and mobile.

---

### Phase 11 — Deploy
**What you'll learn**: Packaging a Spring Boot JAR, environment variables in production, and deploying two separate apps.

**Backend — deploy to Railway**:
1. Add a `Procfile` or let Railway auto-detect Maven
2. Set `DOMAIN_API_KEY` as an environment variable in Railway
3. Note the deployed URL (e.g., `https://your-app.railway.app`)

**Frontend — deploy to Vercel**:
1. Create `frontend/.env.production` with `VITE_API_URL=https://your-app.railway.app`
2. Update all `fetch` calls to use `import.meta.env.VITE_API_URL` instead of `localhost:8080`
3. Push frontend to GitHub and connect to Vercel

**Done when**: Both apps are live and the frontend calls the deployed backend.

---

## File Structure (target end state)
```
property-value-app/
├── backend/
│   └── src/main/java/com/propertyapp/backend/
│       ├── BackendApplication.java
│       ├── controller/
│       │   └── PropertyController.java   ← HTTP layer only
│       ├── service/
│       │   └── PropertyService.java      ← business logic + API calls
│       └── model/
│           ├── PropertyResponse.java     ← response record
│           └── NearbySale.java           ← nested record
├── frontend/
│   └── src/
│       ├── App.tsx
│       ├── api/
│       │   └── property.ts              ← all fetch calls
│       └── components/
│           ├── SearchBar.tsx
│           ├── ValuationCard.tsx
│           ├── NearbySalesList.tsx
│           └── PropertyMap.tsx
└── CLAUDE.md
```

## Key Constraints
- Never commit `application.properties` with real API keys — use environment variables in production
- Keep all external API calls in the Spring Boot backend — the React app must never call Domain API directly (your key would be exposed)
- Use Java records for response objects (immutable, less boilerplate than classes)
- Enable CORS in development; lock it down to your Vercel URL in production

## Start Here
**Terminal 1 — generate the backend**:
1. Go to [start.spring.io](https://start.spring.io), configure as described in Phase 1, download and unzip into `backend/`
2. `cd backend && ./mvnw spring-boot:run`

**Terminal 2 — create the frontend**:
```bash
cd frontend
npm create vite@latest . -- --template react-ts
npm install
npm run dev
```

Then follow Phase 1 above.
