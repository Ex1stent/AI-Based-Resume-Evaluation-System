from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.controllers.auth_controller import router as auth_router
from app.controllers.candidate_controller import router as candidate_router
from app.controllers.dashboard_controller import router as dashboard_router
from app.controllers.job_controller import router as job_router
from app.controllers.matching_controller import router as matching_router
from app.core.database import Base, SessionLocal, engine
from app.services.auth_service import AuthService
from app.core.config import settings

# Ensure model metadata is loaded before create_all.
from app import models  # noqa: F401


app = FastAPI(title="AI Resume & Candidate Evaluation Tool")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        AuthService(db).ensure_seed_users()
    finally:
        db.close()


app.include_router(auth_router)
app.include_router(candidate_router)
app.include_router(job_router)
app.include_router(matching_router)
app.include_router(dashboard_router)


@app.get("/")
def health():
    return {"status": "ok", "message": "AI Resume Tool API running"}
