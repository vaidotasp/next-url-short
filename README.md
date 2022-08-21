## URL shortener demo

### Stack:

- Next.js -> API/Middleware/UI
- Prisma -> ORM
- PostgreSQL -> DB
- Tailwind -> Styling

---

Super simple proof of concept for URL shortening service built on Next.js. Using Prisma for interacting with DB/creating users and short URLs. It does not handle hash collisions, user management, stale hash invalidations or any other fancy features.

To spin this up, you'll need `.env` file that points to your PG DB (e.g. DATABASE_URL="postgresql://postgres:dbdetailsgohere")
