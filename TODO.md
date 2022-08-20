TODO:

- [x] url intput
- [x] basic BE validation
- [x] Prisma

- [ ] Implement shortening algo
- [ ] Redis to cache?
- [ ] Implement USERS/Auth users table so user can retrieve their own thing
- [ ] TRPC?? try it out

Hashing strategies:

- MD5/SHA/Base62 -> can be prone to collisions. It is not a "prod" approach but could work for WIP.
- Counter approach short/1...short/2 etc, which just increments based on ID. Downside that user can check all other shorts and they are not obfuscated
- Counter inside the system, keep the counter but internally and use it for salt
- Hash table that is pre-generated, pluck from it and use it. More complex approach but may be more "right" approach.
- ???
