# Simple REST API with Docker 🐳

This is a **school exercise project**:  
A tiny REST API built with **Express (Node.js)** that does a basic **CRUD** (Create, Read, Update, Delete).  

It runs with Docker using two containers:  
- **API container** → runs the Express server (port **8080**)  
- **Database container** → stores the data  

---

## ✨ What it does
- `GET /items` → list all items  
- `GET /items/:id` → get one item  
- `POST /items` → add a new item  
- `PUT /items/:id` → update an item  
- `DELETE /items/:id` → remove an item  

---

## 🚀 How to run

Make sure you have:  
- [Docker](https://docs.docker.com/get-docker/)  
- [Docker Compose](https://docs.docker.com/compose/)  

Then:

```bash
# clone the repo
git clone https://github.com/your-username/your-repo.git
cd your-repo

# start containers
docker-compose up --build
````

By default:

* API runs on **[http://localhost:8080](http://localhost:8080)**
* Database runs inside the Docker network

---

## ⚙️ Stopping & Rebuilding

```bash
# stop everything
docker-compose down

# rebuild after making changes
docker-compose up --build
```

---

## 📂 Structure

```
├── src/
│   ├── routes/       # API routes (CRUD)
│   ├── controllers/  # Functions that handle logic
│   └── server.js     # Express app entry
├── docker-compose.yml
├── Dockerfile
└── README.md
```

---

## 🎓 Note

This is just a **practice project**, not meant for production.
It’s only here to learn how to combine **Express + Docker + Database**. UwU

```
