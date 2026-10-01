# 🎬 BookMyScreen

A full-stack movie ticket booking platform with **real-time seat locking, secure authentication, Razorpay payments, MongoDB transactions, and automated show management**.

BookMyScreen simulates the core workflow of a production movie-ticket booking system where multiple users can browse shows, select seats, temporarily lock them, make payments, and confirm bookings.

---

## 🚀 Key Features

- 🎥 Browse movies, theatres, and shows
- 💺 Real-time seat selection and locking
- ⚡ Redis-based temporary seat locks with TTL
- 🔄 Real-time seat updates using Socket.IO
- 💳 Razorpay payment integration
- 🔐 OTP-based authentication
- 🍪 JWT authentication using HTTP-only cookies
- ♻️ Automatic JWT refresh
- 📋 Booking history
- 🗄️ MongoDB transactions for booking consistency
- ⏰ Automated show creation and cleanup using cron jobs
- 📧 OTP delivery through email
- 🔒 Protected APIs
- 📱 Responsive frontend

---

# 🏗️ System Architecture

```mermaid
flowchart LR
    B[Browser / React Frontend]
    A[Express REST API]
    S[Socket.IO Server]
    R[(Redis)]
    M[(MongoDB)]
    P[Razorpay]
    G[Gmail SMTP]

    B -->|REST API| A
    B -->|WebSocket| S
    A --> M
    A --> P
    A --> G
    S --> R
    A --> R
    A -->|API Response| B
    S -->|Real-time Events| B
```

### Main Components

| Component | Responsibility |
|---|---|
| React | Frontend UI and application state |
| Express.js | REST API and business logic |
| MongoDB | Users, movies, shows and bookings |
| Redis | Temporary seat locking |
| Socket.IO | Real-time seat synchronization |
| Razorpay | Payment processing |
| JWT | Authentication |
| Nodemailer | OTP email delivery |
| Node-Cron | Automated show maintenance |

---

# 🎟️ Booking Flow

The booking process uses **Redis for temporary seat locking** and **MongoDB transactions for final booking**.

```mermaid
sequenceDiagram
    autonumber
    participant B as Browser
    participant S as Socket.IO Handler
    participant R as Redis
    participant A as Express API
    participant P as Razorpay
    participant M as MongoDB

    B->>A: GET /shows/:id
    A->>M: Show.findById().populate()
    M-->>A: Show + seatLayout
    A-->>B: 200 Show details

    B->>S: join-show(showId)
    S->>S: socket.join(showId)
    S->>R: SMEMBERS locked-seats:showId

    loop Each locked seat
        S->>R: EXISTS seat-lock:showId:seat
        R-->>S: 1 or 0
    end

    S-->>B: locked-seats-initials
    B->>S: lock-seats(showId, seatIds, userId)

    loop Each selected seat
        S->>R: SET seat-lock NX EX 300
        R-->>S: OK or null
    end

    S->>R: SADD locked-seats:showId
    S-->>B: ack success=true
    S-->>B: seat-locked event

    B->>B: Navigate to checkout
    B->>B: Start 300 second timer

    B->>A: POST /payment/create-order
    A->>A: Authenticate user
    A->>P: orders.create()
    P-->>A: Order details
    A-->>B: Order JSON

    B->>P: Open Razorpay
    P-->>B: paymentId + signature

    par Payment verification
        B->>A: POST /payment/verify-payment
        A->>A: HMAC-SHA256 verification
        A-->>B: Payment verified
    and Booking request
        B->>A: POST /book
        A->>A: Authenticate user
        A->>M: Start transaction
        A->>M: Check confirmed booking overlap
        M-->>A: No conflict
        A->>P: payments.fetch(paymentId)
        P-->>A: captured
        A->>M: Create booking
        A->>M: Mark seats BOOKED
        A->>M: Commit transaction
        A-->>B: 201 Booking successful
    end

    B->>S: unlock-seats()
    S->>R: DEL seat-lock keys
    S->>R: SREM locked-seats
    S-->>B: seat-unlocked event
    B->>B: Navigate to bookings
```

---

# 🔒 Redis Seat Locking

Temporary seat locking prevents multiple users from selecting the same seat during checkout.

Each seat receives a Redis key:

```text
seat-lock:<showId>:<seatId>
```

The lock is created using:

```text
SET key userId EX 300 NX
```

### Why `NX`?

`NX` ensures that the key is created **only if it does not already exist**.

```mermaid
sequenceDiagram
    participant U1 as User 1
    participant U2 as User 2
    participant R as Redis

    par Same time
        U1->>R: SET seat-lock:s1:E5 u1 EX 300 NX
        U2->>R: SET seat-lock:s1:E5 u2 EX 300 NX
    end

    R-->>U1: OK
    R-->>U2: null

    Note over R: Only one user obtains the temporary lock
```

The lock automatically expires after **300 seconds**, preventing abandoned checkouts from permanently blocking seats.

---

# 👥 Concurrent Seat Booking

Redis provides the first layer of protection against two users selecting the same seat.

```mermaid
sequenceDiagram
    participant U1 as User 1
    participant U2 as User 2
    participant S as Socket.IO
    participant R as Redis

    par Same instant
        U1->>S: lock-seats(E5)
        S->>R: SET seat-lock:s1:E5 u1 EX 300 NX
    and
        U2->>S: lock-seats(E5)
        S->>R: SET seat-lock:s1:E5 u2 EX 300 NX
    end

    R-->>S: OK for U1
    R-->>S: null for U2
    S-->>U1: ack success=true
    S-->>U2: ack success=false
    S-->>U2: seat-locked-failed
```

MongoDB provides an additional safety layer during final booking.

---

# ⚡ Real-Time Seat Updates

Socket.IO keeps users inside the same show synchronized.

```mermaid
sequenceDiagram
    participant B1 as User 1
    participant S as Socket.IO
    participant R as Redis
    participant B2 as User 2

    B1->>S: lock-seats(showId, E5)
    S->>R: SET seat-lock NX EX 300
    R-->>S: OK
    S-->>B1: ack success=true
    S-->>B1: seat-locked
    S-->>B2: seat-locked(E5)

    Note over B2: E5 becomes unavailable
```

---

# 💳 Payment Flow

```mermaid
sequenceDiagram
    autonumber
    participant B as Browser
    participant A as Express API
    participant P as Razorpay

    B->>A: POST /payment/create-order
    A->>P: orders.create()
    P-->>A: Order ID
    A-->>B: Order details

    B->>P: User completes payment
    P-->>B: Payment ID + Signature
    B->>A: POST /payment/verify-payment
    A->>A: Generate HMAC-SHA256
    A->>A: Compare generated signature

    alt Signature valid
        A-->>B: Payment verified
    else Signature invalid
        A-->>B: Invalid payment
    end
```

The backend also checks the payment status with Razorpay before creating the final booking.

---

# 🔐 Authentication

BookMyScreen uses an OTP-based authentication system.

```mermaid
sequenceDiagram
    autonumber
    participant B as Browser
    participant A as Express API
    participant G as Gmail SMTP
    participant M as MongoDB

    B->>A: POST /auth/send-otp
    A->>A: Validate email
    A->>A: Generate OTP
    A->>A: Generate HMAC hash
    A->>G: Send OTP email
    G-->>A: Message ID
    A-->>B: Hash + expiry

    B->>A: POST /auth/verify-otp
    A->>A: Check expiry
    A->>A: Recompute HMAC

    alt Invalid OTP
        A-->>B: 401 Invalid OTP
    else Valid OTP
        A->>M: Find user
        alt User does not exist
            A->>M: Create user
        end
        M-->>A: User
        A->>A: Generate accessToken
        A->>A: Generate refreshToken
        A->>M: Store refresh token
        A-->>B: HTTP-only cookies
    end
```

### Token Strategy

| Token | Lifetime | Purpose |
|---|---:|---|
| Access Token | 1 hour | Authenticate API requests |
| Refresh Token | 7 days | Generate new access token |

---

# ♻️ JWT Silent Refresh

```mermaid
sequenceDiagram
    autonumber
    participant B as Browser
    participant A as Express API
    participant M as MongoDB

    B->>A: GET /users/me
    A->>A: Read accessToken cookie
    A->>A: jwt.verify()

    alt Access token valid
        A->>M: Get user
        M-->>A: User
        A-->>B: Normal response
    else Access token expired
        A-->>B: 401 Unauthorized
        B->>A: GET /auth/refresh-token
        A->>A: Verify refresh JWT
        A->>M: Find refresh token
        alt Refresh token invalid
            A-->>B: 401 Please login again
        else Refresh token valid
            A->>A: Generate new token pair
            A->>M: Update refresh token
            A-->>B: New HTTP-only cookies
            B->>A: Retry original request
            A-->>B: Normal response
        end
    end
```

---

# 🚪 Logout

```mermaid
sequenceDiagram
    participant B as Browser
    participant A as Express API
    participant M as MongoDB

    B->>A: POST /auth/logout
    A->>M: Find and delete refresh token
    A-->>B: Clear accessToken cookie
    A-->>B: Clear refreshToken cookie
    A-->>B: Logged out
    B->>B: Update auth state
    B->>B: Redirect to home
```

> **Note:** The existing access token can remain valid until its expiration because JWT access tokens are stateless.

---

# 🔌 Socket.IO Lifecycle

```mermaid
sequenceDiagram
    participant B as Browser
    participant S as Socket.IO Server
    participant R as Redis
    participant O as Other Users

    B->>S: connect
    S-->>B: connection + socket ID
    B->>S: join-show(showId)
    S->>S: socket.join(showId)
    S->>R: Get locked seats
    S-->>B: locked-seats-initials
    B->>S: lock-seats
    S->>R: SET lock
    S-->>O: seat-locked
    B->>S: unlock-seats
    S->>R: Delete lock
    S-->>O: seat-unlocked

    Note over R: TTL expires after 300 seconds
    Note over R,O: Redis deletes key automatically
```

---

# ⏰ Show Maintenance

```mermaid
sequenceDiagram
    participant SV as Server
    participant C as Node-Cron
    participant M as MongoDB

    SV->>SV: Connect to database
    SV->>M: Run show maintenance
    SV->>SV: Start server

    C->>M: Run maintenance at midnight
    M-->>C: Load shows
    C->>M: Delete shows before today

    loop Next 7 days
        C->>M: Check shows for date
        alt No shows exist
            C->>M: Create shows
        end
    end
```

---

# 🗄️ Transactional Booking

```mermaid
flowchart TD
    A[Start Transaction]
    B[Check Already Booked Seats]
    C[Verify Razorpay Payment]
    D[Create Booking]
    E[Mark Seats as BOOKED]
    F[Commit Transaction]
    G[Abort Transaction]

    A --> B
    B -->|Available| C
    B -->|Already booked| G
    C -->|Payment captured| D
    C -->|Payment failed| G
    D --> E
    E --> F
    D -.->|Unexpected error| G
    E -.->|Unexpected error| G
```

---

# 🔄 Complete Booking Architecture

```mermaid
flowchart TD
    A[User selects seats]
    B[Redis temporary lock]
    C[Razorpay payment]
    D[Payment verification]
    E[MongoDB transaction]
    F[Create booking]
    G[Mark seats BOOKED]
    H[Release Redis locks]
    I[Booking history]

    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H --> I
```

| Concern | Technology |
|---|---|
| Temporary seat lock | Redis |
| Real-time synchronization | Socket.IO |
| Payment | Razorpay |
| Permanent booking | MongoDB |
| Authentication | JWT |
| OTP delivery | Nodemailer |
| Scheduled maintenance | Node-Cron |

---

# ⚠️ Known Limitations

## 1. Redis TTL Expiry Is Silent

When a seat lock expires after 300 seconds, Redis automatically removes the key, but the current implementation does not emit a Socket.IO event.

**Possible improvement:** Redis keyspace notifications or a dedicated expiration/reconciliation mechanism.

## 2. Socket.IO Reconnection

After a network disconnect, Socket.IO can reconnect using a new socket, but the current client does not automatically rejoin the previous show room.

**Possible improvement:** Store the active `showId` and re-emit `join-show(showId)` after reconnection.

## 3. Payment Succeeds but Booking Fails

A payment can be captured while the subsequent booking transaction fails. The current implementation does not have an automated refund or reconciliation workflow.

```mermaid
flowchart TD
    A[Payment Captured]
    B[Create Booking]
    C{Booking Successful?}
    D[Confirm Booking]
    E[Refund Payment]
    F[Reconciliation Queue]

    A --> B
    B --> C
    C -->|Yes| D
    C -->|No| E
    E --> F
```

## 4. Logout and Access Token Lifetime

Logout invalidates the refresh token and clears cookies, but an already-issued access token can remain valid until expiry.

## 5. Payment Verification Error Handling

The current implementation has a missing `return` after a failed payment verification response, which can result in:

```text
Error: Cannot set headers after they are sent to the client
```

---

# 🛠️ Tech Stack

## Frontend
- React
- Vite
- Tailwind CSS
- Axios
- Socket.IO Client

## Backend
- Node.js
- Express.js
- Socket.IO
- JWT
- Nodemailer

## Database & Infrastructure
- MongoDB
- Redis
- Docker

## Payment
- Razorpay

## Development Tools
- Git
- GitHub
- Postman
- Docker
- VS Code

---

# ⚙️ Local Setup

## 1. Clone the Repository

```bash
git clone <repository-url>
cd BookMyScreen
```

## 2. Install Dependencies

```bash
cd client
npm install

cd ../server
npm install
```

## 3. Configure Environment Variables

### Backend

```env
MONGO_URI=
DB_NAME=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
REDIS_URL=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
```

### Frontend

```env
VITE_API_URL=
VITE_SOCKET_URL=
VITE_RAZORPAY_API_KEY=
```

## 4. Start the Application

```bash
# Backend
cd server
npm run dev

# Frontend
cd client
npm run dev
```

---

# 🐳 Docker

```bash
docker compose up --build
```

---

# 🧠 Core Engineering Concepts

- REST API design
- Authentication & authorization
- OTP authentication
- JWT access/refresh token architecture
- HTTP-only cookies
- Redis distributed locking
- TTL-based resource reservation
- WebSocket communication
- Socket.IO rooms
- Payment gateway integration
- HMAC signature verification
- MongoDB transactions
- Race-condition handling
- Database consistency
- Background jobs
- Error handling middleware
- Docker-based development

---

# 🔮 Future Improvements

- [ ] Automatic seat-unlock events after Redis TTL expiration
- [ ] Automatic Socket.IO room rejoin after reconnection
- [ ] Razorpay webhook integration
- [ ] Automatic payment refund/reconciliation
- [ ] Idempotency for payment and booking APIs
- [ ] Improved distributed booking guarantees
- [ ] Centralized logging and monitoring
- [ ] Rate limiting for authentication and payment APIs
- [ ] Redis adapter for horizontally scaled Socket.IO servers
- [ ] Automated integration tests
- [ ] End-to-end booking tests
- [ ] CI/CD pipeline

---

# 🎯 Engineering Objective

BookMyScreen demonstrates how a real-world booking system handles:

```text
Concurrency
     ↓
Temporary Resource Locking
     ↓
Payment Processing
     ↓
Payment Verification
     ↓
Transactional Persistence
     ↓
Real-Time Synchronization
     ↓
Confirmed Booking
```

# 👨‍💻 Developer
**Vansh Gupta**
---

⭐ If you find the project useful, consider giving the repository a star.
