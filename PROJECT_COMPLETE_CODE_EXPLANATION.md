# Complete Project Code Explanation (In-Depth)

This document explains the project in two levels:
1. **Architecture and folder/file purpose** (why each part exists).
2. **Line-by-line explanation** for each included source/config file.

## Scope
Included: backend Python source, backend runtime configs/schema, frontend Angular source, and key frontend configs.
Excluded: generated dependency artifacts (`node_modules`, `dist`, `.venv`, `package-lock.json`), binaries, and temporary files.

## High-Level Folder Purpose
- `backend/`: FastAPI REST server with MVC layering and PostgreSQL integration.
- `backend/app/controllers/`: API route handlers (Controller layer).
- `backend/app/services/`: Business logic and AI/matching workflows (Service layer).
- `backend/app/repositories/`: Database data-access operations (Repository layer).
- `backend/app/models/`: SQLAlchemy ORM entity definitions (DB tables in code).
- `backend/app/schemas/`: Pydantic request/response validation contracts.
- `backend/app/core/`: Shared infrastructure (config, DB session, security, dependencies).
- `frontend/`: Angular 18 client application.
- `frontend/src/app/core/`: Frontend cross-cutting services (API, auth, guards, models).
- `frontend/src/app/pages/`: Feature pages/components (login, dashboard, CRUD views, matching).
- `frontend/src/app/app.routes.ts`: Route map and route protection setup.
- `frontend/src/app/app.config.ts`: Angular providers setup (router + HTTP interceptor).

## MVC Flow (Backend)
1. **Controller** receives request, validates via schema, and calls service.
2. **Service** applies business rules (auth, parsing, matching, summaries).
3. **Repository** reads/writes persistent data in PostgreSQL.
4. Response flows back through controller using schema-safe output.

## File-Level Purpose Summary
- `backend/.env.example`: Environment variable template for backend runtime.
- `backend/app/__init__.py`: Project file supporting application behavior/configuration.
- `backend/app/controllers/__init__.py`: API endpoints for a feature area.
- `backend/app/controllers/auth_controller.py`: API endpoints for a feature area.
- `backend/app/controllers/candidate_controller.py`: API endpoints for a feature area.
- `backend/app/controllers/dashboard_controller.py`: API endpoints for a feature area.
- `backend/app/controllers/job_controller.py`: API endpoints for a feature area.
- `backend/app/controllers/matching_controller.py`: API endpoints for a feature area.
- `backend/app/core/__init__.py`: Framework/shared infrastructure.
- `backend/app/core/config.py`: Framework/shared infrastructure.
- `backend/app/core/database.py`: Framework/shared infrastructure.
- `backend/app/core/deps.py`: Framework/shared infrastructure.
- `backend/app/core/security.py`: Framework/shared infrastructure.
- `backend/app/main.py`: Project file supporting application behavior/configuration.
- `backend/app/models/__init__.py`: ORM model mapping to DB tables.
- `backend/app/models/ai_data.py`: ORM model mapping to DB tables.
- `backend/app/models/candidate.py`: ORM model mapping to DB tables.
- `backend/app/models/job.py`: ORM model mapping to DB tables.
- `backend/app/models/match.py`: ORM model mapping to DB tables.
- `backend/app/models/resume.py`: ORM model mapping to DB tables.
- `backend/app/models/user.py`: ORM model mapping to DB tables.
- `backend/app/repositories/__init__.py`: DB access abstraction.
- `backend/app/repositories/ai_data_repository.py`: DB access abstraction.
- `backend/app/repositories/candidate_repository.py`: DB access abstraction.
- `backend/app/repositories/job_repository.py`: DB access abstraction.
- `backend/app/repositories/match_repository.py`: DB access abstraction.
- `backend/app/repositories/user_repository.py`: DB access abstraction.
- `backend/app/schemas/__init__.py`: Request/response contract definitions.
- `backend/app/schemas/auth_schema.py`: Request/response contract definitions.
- `backend/app/schemas/candidate_schema.py`: Request/response contract definitions.
- `backend/app/schemas/common_schema.py`: Request/response contract definitions.
- `backend/app/schemas/dashboard_schema.py`: Request/response contract definitions.
- `backend/app/schemas/job_schema.py`: Request/response contract definitions.
- `backend/app/schemas/match_schema.py`: Request/response contract definitions.
- `backend/app/services/__init__.py`: Business logic implementation.
- `backend/app/services/ai_service.py`: Business logic implementation.
- `backend/app/services/auth_service.py`: Business logic implementation.
- `backend/app/services/candidate_service.py`: Business logic implementation.
- `backend/app/services/dashboard_service.py`: Business logic implementation.
- `backend/app/services/job_service.py`: Business logic implementation.
- `backend/app/services/matching_service.py`: Business logic implementation.
- `backend/main.py`: Backend run entrypoint importing FastAPI app.
- `backend/requirements.txt`: Python dependency pin list.
- `backend/schema.sql`: Raw SQL schema for DB structure.
- `frontend/angular.json`: Angular CLI workspace/build configuration.
- `frontend/package.json`: Node scripts + dependency metadata.
- `frontend/src/app/app.component.css`: Project file supporting application behavior/configuration.
- `frontend/src/app/app.component.spec.ts`: Project file supporting application behavior/configuration.
- `frontend/src/app/app.component.ts`: Project file supporting application behavior/configuration.
- `frontend/src/app/app.config.ts`: Frontend provider bootstrap configuration.
- `frontend/src/app/app.routes.ts`: Frontend route map + protection rules.
- `frontend/src/app/core/api.config.ts`: Framework/shared infrastructure.
- `frontend/src/app/core/auth.guard.ts`: Framework/shared infrastructure.
- `frontend/src/app/core/auth.interceptor.ts`: Framework/shared infrastructure.
- `frontend/src/app/core/auth.service.ts`: Framework/shared infrastructure.
- `frontend/src/app/core/candidate.service.ts`: Framework/shared infrastructure.
- `frontend/src/app/core/dashboard.service.ts`: Framework/shared infrastructure.
- `frontend/src/app/core/job.service.ts`: Framework/shared infrastructure.
- `frontend/src/app/core/matching.service.ts`: Framework/shared infrastructure.
- `frontend/src/app/core/models.ts`: Framework/shared infrastructure.
- `frontend/src/app/core/role.guard.ts`: Framework/shared infrastructure.
- `frontend/src/app/pages/candidates/candidates.component.ts`: Feature UI page component.
- `frontend/src/app/pages/dashboard/dashboard.component.ts`: Feature UI page component.
- `frontend/src/app/pages/jobs/jobs.component.ts`: Feature UI page component.
- `frontend/src/app/pages/layout/layout.component.ts`: Feature UI page component.
- `frontend/src/app/pages/login/login.component.ts`: Feature UI page component.
- `frontend/src/app/pages/matches/matches.component.ts`: Feature UI page component.
- `frontend/src/index.html`: Root HTML host page for Angular app.
- `frontend/src/main.ts`: Angular bootstrap entrypoint.
- `frontend/src/styles.css`: Global stylesheet scope.
- `frontend/tsconfig.app.json`: TypeScript compiler options for app/test builds.
- `frontend/tsconfig.json`: TypeScript compiler options for app/test builds.
- `frontend/tsconfig.spec.json`: TypeScript compiler options for app/test builds.

## Line-by-Line Explanation
Format used below:
- `L<line-number> | <code>`
- `Why:` detailed intent of that specific line.


### File: `backend/.env.example`

- `L1 | DATABASE_URL=postgresql+psycopg://postgres:1234@localhost:5432/ai_resume`
  Why: Configuration variable assignment consumed by the application.
- `L2 | JWT_SECRET_KEY=secretkey`
  Why: Configuration variable assignment consumed by the application.
- `L3 | JWT_ALGORITHM=HS256`
  Why: Configuration variable assignment consumed by the application.
- `L4 | ACCESS_TOKEN_EXPIRE_MINUTES=120`
  Why: Configuration variable assignment consumed by the application.

### File: `backend/app/__init__.py`

- `L1 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/controllers/__init__.py`

This file is empty. It exists to mark package/module boundaries or reserve structure.

### File: `backend/app/controllers/auth_controller.py`

- `L1 | from fastapi import APIRouter, Depends`
  Why: Imports selected symbols from another module.
- `L2 | from sqlalchemy.orm import Session`
  Why: Imports selected symbols from another module.
- `L3 | `
  Why: Blank line for readability and logical separation.
- `L4 | from app.core.database import get_db`
  Why: Imports selected symbols from another module.
- `L5 | from app.schemas.auth_schema import LoginRequest, TokenResponse`
  Why: Imports selected symbols from another module.
- `L6 | from app.services.auth_service import AuthService`
  Why: Imports selected symbols from another module.
- `L7 | `
  Why: Blank line for readability and logical separation.
- `L8 | `
  Why: Blank line for readability and logical separation.
- `L9 | router = APIRouter(prefix="/api/auth", tags=["Auth"])`
  Why: Creates a FastAPI router grouping related API endpoints.
- `L10 | `
  Why: Blank line for readability and logical separation.
- `L11 | `
  Why: Blank line for readability and logical separation.
- `L12 | @router.post("/login", response_model=TokenResponse)`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L13 | def login(payload: LoginRequest, db: Session = Depends(get_db)):`
  Why: Defines a function/method with reusable behavior.
- `L14 |     service = AuthService(db)`
  Why: Implementation line supporting this file's behavior or structure.
- `L15 |     data = service.login(payload.username, payload.password)`
  Why: Implementation line supporting this file's behavior or structure.
- `L16 |     return TokenResponse(access_token=data["access_token"], role=data["role"], username=data["username"])`
  Why: Returns a value/result from this function.
- `L17 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/controllers/candidate_controller.py`

- `L1 | from fastapi import APIRouter, Depends, File, Query, UploadFile`
  Why: Imports selected symbols from another module.
- `L2 | from sqlalchemy.orm import Session`
  Why: Imports selected symbols from another module.
- `L3 | `
  Why: Blank line for readability and logical separation.
- `L4 | from app.core.database import get_db`
  Why: Imports selected symbols from another module.
- `L5 | from app.core.deps import get_current_user, require_roles`
  Why: Imports selected symbols from another module.
- `L6 | from app.schemas.candidate_schema import CandidateCreate, CandidateDetailResponse, CandidateResponse`
  Why: Imports selected symbols from another module.
- `L7 | from app.schemas.common_schema import MessageResponse`
  Why: Imports selected symbols from another module.
- `L8 | from app.services.candidate_service import CandidateService`
  Why: Imports selected symbols from another module.
- `L9 | `
  Why: Blank line for readability and logical separation.
- `L10 | `
  Why: Blank line for readability and logical separation.
- `L11 | router = APIRouter(prefix="/api/candidates", tags=["Candidates"])`
  Why: Creates a FastAPI router grouping related API endpoints.
- `L12 | `
  Why: Blank line for readability and logical separation.
- `L13 | `
  Why: Blank line for readability and logical separation.
- `L14 | def to_candidate_response(candidate) -> CandidateResponse:`
  Why: Defines a function/method with reusable behavior.
- `L15 |     return CandidateResponse(`
  Why: Returns a value/result from this function.
- `L16 |         id=candidate.id,`
  Why: Implementation line supporting this file's behavior or structure.
- `L17 |         name=candidate.name,`
  Why: Implementation line supporting this file's behavior or structure.
- `L18 |         email=candidate.email,`
  Why: Implementation line supporting this file's behavior or structure.
- `L19 |         phone=candidate.phone,`
  Why: Implementation line supporting this file's behavior or structure.
- `L20 |         skills=[s.strip() for s in (candidate.skills_text or "").split(",") if s.strip()],`
  Why: Implementation line supporting this file's behavior or structure.
- `L21 |         experience_years=candidate.experience_years,`
  Why: Implementation line supporting this file's behavior or structure.
- `L22 |         education=candidate.education,`
  Why: Implementation line supporting this file's behavior or structure.
- `L23 |         summary=candidate.summary,`
  Why: Implementation line supporting this file's behavior or structure.
- `L24 |         created_at=candidate.created_at,`
  Why: Implementation line supporting this file's behavior or structure.
- `L25 |     )`
  Why: Closes a previously opened block/object/array/function scope.
- `L26 | `
  Why: Blank line for readability and logical separation.
- `L27 | `
  Why: Blank line for readability and logical separation.
- `L28 | @router.post("", response_model=CandidateResponse, dependencies=[Depends(require_roles("Admin", "HR"))])`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L29 | def create_candidate(payload: CandidateCreate, db: Session = Depends(get_db), _=Depends(get_current_user)):`
  Why: Defines a function/method with reusable behavior.
- `L30 |     candidate = CandidateService(db).create_candidate(payload)`
  Why: Implementation line supporting this file's behavior or structure.
- `L31 |     return to_candidate_response(candidate)`
  Why: Returns a value/result from this function.
- `L32 | `
  Why: Blank line for readability and logical separation.
- `L33 | `
  Why: Blank line for readability and logical separation.
- `L34 | @router.get("", response_model=list[CandidateResponse], dependencies=[Depends(require_roles("Admin", "HR"))])`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L35 | def list_candidates(`
  Why: Defines a function/method with reusable behavior.
- `L36 |     db: Session = Depends(get_db),`
  Why: Declares dependency injection for auth/db/request context.
- `L37 |     skills: str | None = Query(default=None, description="Comma separated skills"),`
  Why: Implementation line supporting this file's behavior or structure.
- `L38 |     min_experience: float | None = Query(default=None, ge=0),`
  Why: Implementation line supporting this file's behavior or structure.
- `L39 |     _=Depends(get_current_user),`
  Why: Declares dependency injection for auth/db/request context.
- `L40 | ):`
  Why: Implementation line supporting this file's behavior or structure.
- `L41 |     parsed_skills = [s.strip() for s in skills.split(",")] if skills else None`
  Why: Implementation line supporting this file's behavior or structure.
- `L42 |     rows = CandidateService(db).list_candidates(parsed_skills, min_experience)`
  Why: Implementation line supporting this file's behavior or structure.
- `L43 |     return [to_candidate_response(row) for row in rows]`
  Why: Returns a value/result from this function.
- `L44 | `
  Why: Blank line for readability and logical separation.
- `L45 | `
  Why: Blank line for readability and logical separation.
- `L46 | @router.get("/{candidate_id}", response_model=CandidateDetailResponse, dependencies=[Depends(require_roles("Admin", "HR"))])`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L47 | def candidate_detail(candidate_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):`
  Why: Defines a function/method with reusable behavior.
- `L48 |     row = CandidateService(db).get_candidate_detail(candidate_id)`
  Why: Implementation line supporting this file's behavior or structure.
- `L49 |     return CandidateDetailResponse(`
  Why: Returns a value/result from this function.
- `L50 |         **to_candidate_response(row).model_dump(),`
  Why: Implementation line supporting this file's behavior or structure.
- `L51 |         resumes=[{"id": r.id, "file_path": r.file_path, "uploaded_at": r.uploaded_at.isoformat()} for r in row.resumes],`
  Why: Implementation line supporting this file's behavior or structure.
- `L52 |     )`
  Why: Closes a previously opened block/object/array/function scope.
- `L53 | `
  Why: Blank line for readability and logical separation.
- `L54 | `
  Why: Blank line for readability and logical separation.
- `L55 | @router.post(`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L56 |     "/{candidate_id}/resume",`
  Why: Implementation line supporting this file's behavior or structure.
- `L57 |     response_model=MessageResponse,`
  Why: Specifies response schema for validation and OpenAPI docs.
- `L58 |     dependencies=[Depends(require_roles("Admin", "HR"))],`
  Why: Declares dependency injection for auth/db/request context.
- `L59 | )`
  Why: Closes a previously opened block/object/array/function scope.
- `L60 | def upload_resume(`
  Why: Defines a function/method with reusable behavior.
- `L61 |     candidate_id: int,`
  Why: Implementation line supporting this file's behavior or structure.
- `L62 |     resume_file: UploadFile = File(...),`
  Why: Implementation line supporting this file's behavior or structure.
- `L63 |     db: Session = Depends(get_db),`
  Why: Declares dependency injection for auth/db/request context.
- `L64 |     _=Depends(get_current_user),`
  Why: Declares dependency injection for auth/db/request context.
- `L65 | ):`
  Why: Implementation line supporting this file's behavior or structure.
- `L66 |     CandidateService(db).upload_resume(candidate_id, resume_file)`
  Why: Implementation line supporting this file's behavior or structure.
- `L67 |     return MessageResponse(message="Resume uploaded and parsed successfully")`
  Why: Returns a value/result from this function.
- `L68 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/controllers/dashboard_controller.py`

- `L1 | from fastapi import APIRouter, Depends`
  Why: Imports selected symbols from another module.
- `L2 | from sqlalchemy.orm import Session`
  Why: Imports selected symbols from another module.
- `L3 | `
  Why: Blank line for readability and logical separation.
- `L4 | from app.core.database import get_db`
  Why: Imports selected symbols from another module.
- `L5 | from app.core.deps import get_current_user, require_roles`
  Why: Imports selected symbols from another module.
- `L6 | from app.schemas.dashboard_schema import DashboardResponse`
  Why: Imports selected symbols from another module.
- `L7 | from app.services.dashboard_service import DashboardService`
  Why: Imports selected symbols from another module.
- `L8 | `
  Why: Blank line for readability and logical separation.
- `L9 | `
  Why: Blank line for readability and logical separation.
- `L10 | router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])`
  Why: Creates a FastAPI router grouping related API endpoints.
- `L11 | `
  Why: Blank line for readability and logical separation.
- `L12 | `
  Why: Blank line for readability and logical separation.
- `L13 | @router.get("", response_model=DashboardResponse, dependencies=[Depends(require_roles("Admin", "HR"))])`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L14 | def get_dashboard(db: Session = Depends(get_db), _=Depends(get_current_user)):`
  Why: Defines a function/method with reusable behavior.
- `L15 |     return DashboardService(db).get_dashboard_data()`
  Why: Returns a value/result from this function.
- `L16 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/controllers/job_controller.py`

- `L1 | from fastapi import APIRouter, Depends`
  Why: Imports selected symbols from another module.
- `L2 | from sqlalchemy.orm import Session`
  Why: Imports selected symbols from another module.
- `L3 | `
  Why: Blank line for readability and logical separation.
- `L4 | from app.core.database import get_db`
  Why: Imports selected symbols from another module.
- `L5 | from app.core.deps import get_current_user, require_roles`
  Why: Imports selected symbols from another module.
- `L6 | from app.schemas.common_schema import MessageResponse`
  Why: Imports selected symbols from another module.
- `L7 | from app.schemas.job_schema import JobCreate, JobResponse, JobUpdate`
  Why: Imports selected symbols from another module.
- `L8 | from app.services.job_service import JobService`
  Why: Imports selected symbols from another module.
- `L9 | `
  Why: Blank line for readability and logical separation.
- `L10 | `
  Why: Blank line for readability and logical separation.
- `L11 | router = APIRouter(prefix="/api/jobs", tags=["Jobs"])`
  Why: Creates a FastAPI router grouping related API endpoints.
- `L12 | `
  Why: Blank line for readability and logical separation.
- `L13 | `
  Why: Blank line for readability and logical separation.
- `L14 | def to_job_response(job) -> JobResponse:`
  Why: Defines a function/method with reusable behavior.
- `L15 |     return JobResponse(`
  Why: Returns a value/result from this function.
- `L16 |         id=job.id,`
  Why: Implementation line supporting this file's behavior or structure.
- `L17 |         title=job.title,`
  Why: Implementation line supporting this file's behavior or structure.
- `L18 |         department=job.department,`
  Why: Implementation line supporting this file's behavior or structure.
- `L19 |         skills=[s.strip() for s in (job.skills_text or "").split(",") if s.strip()],`
  Why: Implementation line supporting this file's behavior or structure.
- `L20 |         experience_required=job.experience_required,`
  Why: Implementation line supporting this file's behavior or structure.
- `L21 |         description=job.description,`
  Why: Implementation line supporting this file's behavior or structure.
- `L22 |         improved_description=job.improved_description,`
  Why: Implementation line supporting this file's behavior or structure.
- `L23 |         created_at=job.created_at,`
  Why: Implementation line supporting this file's behavior or structure.
- `L24 |         updated_at=job.updated_at,`
  Why: Implementation line supporting this file's behavior or structure.
- `L25 |     )`
  Why: Closes a previously opened block/object/array/function scope.
- `L26 | `
  Why: Blank line for readability and logical separation.
- `L27 | `
  Why: Blank line for readability and logical separation.
- `L28 | @router.post("", response_model=JobResponse, dependencies=[Depends(require_roles("Admin", "HR"))])`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L29 | def create_job(payload: JobCreate, db: Session = Depends(get_db), _=Depends(get_current_user)):`
  Why: Defines a function/method with reusable behavior.
- `L30 |     return to_job_response(JobService(db).create_job(payload))`
  Why: Returns a value/result from this function.
- `L31 | `
  Why: Blank line for readability and logical separation.
- `L32 | `
  Why: Blank line for readability and logical separation.
- `L33 | @router.get("", response_model=list[JobResponse], dependencies=[Depends(require_roles("Admin", "HR"))])`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L34 | def list_jobs(db: Session = Depends(get_db), _=Depends(get_current_user)):`
  Why: Defines a function/method with reusable behavior.
- `L35 |     return [to_job_response(job) for job in JobService(db).list_jobs()]`
  Why: Returns a value/result from this function.
- `L36 | `
  Why: Blank line for readability and logical separation.
- `L37 | `
  Why: Blank line for readability and logical separation.
- `L38 | @router.put("/{job_id}", response_model=JobResponse, dependencies=[Depends(require_roles("Admin", "HR"))])`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L39 | def update_job(job_id: int, payload: JobUpdate, db: Session = Depends(get_db), _=Depends(get_current_user)):`
  Why: Defines a function/method with reusable behavior.
- `L40 |     return to_job_response(JobService(db).update_job(job_id, payload))`
  Why: Returns a value/result from this function.
- `L41 | `
  Why: Blank line for readability and logical separation.
- `L42 | `
  Why: Blank line for readability and logical separation.
- `L43 | @router.delete("/{job_id}", response_model=MessageResponse, dependencies=[Depends(require_roles("Admin"))])`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L44 | def delete_job(job_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):`
  Why: Defines a function/method with reusable behavior.
- `L45 |     JobService(db).delete_job(job_id)`
  Why: Implementation line supporting this file's behavior or structure.
- `L46 |     return MessageResponse(message="Job deleted successfully")`
  Why: Returns a value/result from this function.
- `L47 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/controllers/matching_controller.py`

- `L1 | from fastapi import APIRouter, Depends, Query`
  Why: Imports selected symbols from another module.
- `L2 | from sqlalchemy.orm import Session`
  Why: Imports selected symbols from another module.
- `L3 | `
  Why: Blank line for readability and logical separation.
- `L4 | from app.core.database import get_db`
  Why: Imports selected symbols from another module.
- `L5 | from app.core.deps import get_current_user, require_roles`
  Why: Imports selected symbols from another module.
- `L6 | from app.schemas.match_schema import CandidateMatchView, JobMatchView, MatchResponse`
  Why: Imports selected symbols from another module.
- `L7 | from app.services.matching_service import MatchingService`
  Why: Imports selected symbols from another module.
- `L8 | `
  Why: Blank line for readability and logical separation.
- `L9 | `
  Why: Blank line for readability and logical separation.
- `L10 | router = APIRouter(prefix="/api/matches", tags=["Matches"])`
  Why: Creates a FastAPI router grouping related API endpoints.
- `L11 | `
  Why: Blank line for readability and logical separation.
- `L12 | `
  Why: Blank line for readability and logical separation.
- `L13 | def to_match_response(match) -> MatchResponse:`
  Why: Defines a function/method with reusable behavior.
- `L14 |     return MatchResponse(`
  Why: Returns a value/result from this function.
- `L15 |         id=match.id,`
  Why: Implementation line supporting this file's behavior or structure.
- `L16 |         candidate_id=match.candidate_id,`
  Why: Implementation line supporting this file's behavior or structure.
- `L17 |         job_id=match.job_id,`
  Why: Implementation line supporting this file's behavior or structure.
- `L18 |         skill_match_pct=match.skill_match_pct,`
  Why: Implementation line supporting this file's behavior or structure.
- `L19 |         experience_match_pct=match.experience_match_pct,`
  Why: Implementation line supporting this file's behavior or structure.
- `L20 |         overall_score=match.overall_score,`
  Why: Implementation line supporting this file's behavior or structure.
- `L21 |         explanation=match.explanation,`
  Why: Implementation line supporting this file's behavior or structure.
- `L22 |         created_at=match.created_at,`
  Why: Implementation line supporting this file's behavior or structure.
- `L23 |     )`
  Why: Closes a previously opened block/object/array/function scope.
- `L24 | `
  Why: Blank line for readability and logical separation.
- `L25 | `
  Why: Blank line for readability and logical separation.
- `L26 | @router.post("/run", response_model=list[MatchResponse], dependencies=[Depends(require_roles("Admin", "HR"))])`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L27 | def run_matching(`
  Why: Defines a function/method with reusable behavior.
- `L28 |     candidate_id: int | None = Query(default=None),`
  Why: Implementation line supporting this file's behavior or structure.
- `L29 |     job_id: int | None = Query(default=None),`
  Why: Implementation line supporting this file's behavior or structure.
- `L30 |     db: Session = Depends(get_db),`
  Why: Declares dependency injection for auth/db/request context.
- `L31 |     _=Depends(get_current_user),`
  Why: Declares dependency injection for auth/db/request context.
- `L32 | ):`
  Why: Implementation line supporting this file's behavior or structure.
- `L33 |     rows = MatchingService(db).run_matching(candidate_id=candidate_id, job_id=job_id)`
  Why: Implementation line supporting this file's behavior or structure.
- `L34 |     return [to_match_response(row) for row in rows]`
  Why: Returns a value/result from this function.
- `L35 | `
  Why: Blank line for readability and logical separation.
- `L36 | `
  Why: Blank line for readability and logical separation.
- `L37 | @router.get("/candidate/{candidate_id}", response_model=list[CandidateMatchView], dependencies=[Depends(require_roles("Admin", "HR"))])`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L38 | def candidate_view(candidate_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):`
  Why: Defines a function/method with reusable behavior.
- `L39 |     rows = MatchingService(db).candidate_view(candidate_id)`
  Why: Implementation line supporting this file's behavior or structure.
- `L40 |     return [`
  Why: Returns a value/result from this function.
- `L41 |         CandidateMatchView(`
  Why: Implementation line supporting this file's behavior or structure.
- `L42 |             candidate_id=row.candidate_id,`
  Why: Implementation line supporting this file's behavior or structure.
- `L43 |             candidate_name=row.candidate.name,`
  Why: Implementation line supporting this file's behavior or structure.
- `L44 |             job_id=row.job_id,`
  Why: Implementation line supporting this file's behavior or structure.
- `L45 |             job_title=row.job.title,`
  Why: Implementation line supporting this file's behavior or structure.
- `L46 |             skill_match_pct=row.skill_match_pct,`
  Why: Implementation line supporting this file's behavior or structure.
- `L47 |             experience_match_pct=row.experience_match_pct,`
  Why: Implementation line supporting this file's behavior or structure.
- `L48 |             overall_score=row.overall_score,`
  Why: Implementation line supporting this file's behavior or structure.
- `L49 |             explanation=row.explanation,`
  Why: Implementation line supporting this file's behavior or structure.
- `L50 |         )`
  Why: Closes a previously opened block/object/array/function scope.
- `L51 |         for row in rows`
  Why: Loop over a collection/iterator to process items one by one.
- `L52 |     ]`
  Why: Closes a previously opened block/object/array/function scope.
- `L53 | `
  Why: Blank line for readability and logical separation.
- `L54 | `
  Why: Blank line for readability and logical separation.
- `L55 | @router.get("/job/{job_id}", response_model=list[JobMatchView], dependencies=[Depends(require_roles("Admin", "HR"))])`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L56 | def job_view(job_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):`
  Why: Defines a function/method with reusable behavior.
- `L57 |     rows = MatchingService(db).job_view(job_id)`
  Why: Implementation line supporting this file's behavior or structure.
- `L58 |     return [`
  Why: Returns a value/result from this function.
- `L59 |         JobMatchView(`
  Why: Implementation line supporting this file's behavior or structure.
- `L60 |             job_id=row.job_id,`
  Why: Implementation line supporting this file's behavior or structure.
- `L61 |             job_title=row.job.title,`
  Why: Implementation line supporting this file's behavior or structure.
- `L62 |             candidate_id=row.candidate_id,`
  Why: Implementation line supporting this file's behavior or structure.
- `L63 |             candidate_name=row.candidate.name,`
  Why: Implementation line supporting this file's behavior or structure.
- `L64 |             overall_score=row.overall_score,`
  Why: Implementation line supporting this file's behavior or structure.
- `L65 |             skill_match_pct=row.skill_match_pct,`
  Why: Implementation line supporting this file's behavior or structure.
- `L66 |             experience_match_pct=row.experience_match_pct,`
  Why: Implementation line supporting this file's behavior or structure.
- `L67 |             explanation=row.explanation,`
  Why: Implementation line supporting this file's behavior or structure.
- `L68 |         )`
  Why: Closes a previously opened block/object/array/function scope.
- `L69 |         for row in rows`
  Why: Loop over a collection/iterator to process items one by one.
- `L70 |     ]`
  Why: Closes a previously opened block/object/array/function scope.
- `L71 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/core/__init__.py`

This file is empty. It exists to mark package/module boundaries or reserve structure.

### File: `backend/app/core/config.py`

- `L1 | from pydantic_settings import BaseSettings, SettingsConfigDict`
  Why: Imports selected symbols from another module.
- `L2 | `
  Why: Blank line for readability and logical separation.
- `L3 | `
  Why: Blank line for readability and logical separation.
- `L4 | class Settings(BaseSettings):`
  Why: Defines a class to group related data or behavior.
- `L5 |     model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")`
  Why: Implementation line supporting this file's behavior or structure.
- `L6 | `
  Why: Blank line for readability and logical separation.
- `L7 |     database_url: str = "postgresql+psycopg://postgres:1234@localhost:5432/ai_resume"`
  Why: Implementation line supporting this file's behavior or structure.
- `L8 |     jwt_secret_key: str = "change_this_secret"`
  Why: Implementation line supporting this file's behavior or structure.
- `L9 |     jwt_algorithm: str = "HS256"`
  Why: Implementation line supporting this file's behavior or structure.
- `L10 |     access_token_expire_minutes: int = 120`
  Why: Implementation line supporting this file's behavior or structure.
- `L11 |     upload_dir: str = "uploads"`
  Why: Implementation line supporting this file's behavior or structure.
- `L12 | `
  Why: Blank line for readability and logical separation.
- `L13 | `
  Why: Blank line for readability and logical separation.
- `L14 | settings = Settings()`
  Why: Implementation line supporting this file's behavior or structure.

### File: `backend/app/core/database.py`

- `L1 | from sqlalchemy import create_engine`
  Why: Imports selected symbols from another module.
- `L2 | from sqlalchemy.orm import declarative_base, sessionmaker`
  Why: Imports selected symbols from another module.
- `L3 | `
  Why: Blank line for readability and logical separation.
- `L4 | from app.core.config import settings`
  Why: Imports selected symbols from another module.
- `L5 | `
  Why: Blank line for readability and logical separation.
- `L6 | `
  Why: Blank line for readability and logical separation.
- `L7 | engine = create_engine(settings.database_url, future=True)`
  Why: Creates SQLAlchemy DB engine using configured connection URL.
- `L8 | SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)`
  Why: Builds DB session factory used per request.
- `L9 | Base = declarative_base()`
  Why: Implementation line supporting this file's behavior or structure.
- `L10 | `
  Why: Blank line for readability and logical separation.
- `L11 | `
  Why: Blank line for readability and logical separation.
- `L12 | def get_db():`
  Why: Defines a function/method with reusable behavior.
- `L13 |     db = SessionLocal()`
  Why: Implementation line supporting this file's behavior or structure.
- `L14 |     try:`
  Why: Starts guarded execution block for exception handling.
- `L15 |         yield db`
  Why: Implementation line supporting this file's behavior or structure.
- `L16 |     finally:`
  Why: Cleanup block that runs regardless of success/failure.
- `L17 |         db.close()`
  Why: Implementation line supporting this file's behavior or structure.
- `L18 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/core/deps.py`

- `L1 | from fastapi import Depends, HTTPException, status`
  Why: Imports selected symbols from another module.
- `L2 | from fastapi.security import OAuth2PasswordBearer`
  Why: Imports selected symbols from another module.
- `L3 | from sqlalchemy.orm import Session`
  Why: Imports selected symbols from another module.
- `L4 | `
  Why: Blank line for readability and logical separation.
- `L5 | from app.core.database import get_db`
  Why: Imports selected symbols from another module.
- `L6 | from app.core.security import decode_access_token`
  Why: Imports selected symbols from another module.
- `L7 | from app.repositories.user_repository import UserRepository`
  Why: Imports selected symbols from another module.
- `L8 | `
  Why: Blank line for readability and logical separation.
- `L9 | `
  Why: Blank line for readability and logical separation.
- `L10 | oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")`
  Why: Implementation line supporting this file's behavior or structure.
- `L11 | `
  Why: Blank line for readability and logical separation.
- `L12 | `
  Why: Blank line for readability and logical separation.
- `L13 | def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):`
  Why: Defines a function/method with reusable behavior.
- `L14 |     username = decode_access_token(token)`
  Why: Implementation line supporting this file's behavior or structure.
- `L15 |     if not username:`
  Why: Conditional branch; runs only when the condition is true.
- `L16 |         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")`
  Why: Raises an exception/error to signal invalid state or failure.
- `L17 |     user = UserRepository(db).get_by_username(username)`
  Why: Implementation line supporting this file's behavior or structure.
- `L18 |     if not user:`
  Why: Conditional branch; runs only when the condition is true.
- `L19 |         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")`
  Why: Raises an exception/error to signal invalid state or failure.
- `L20 |     return user`
  Why: Returns a value/result from this function.
- `L21 | `
  Why: Blank line for readability and logical separation.
- `L22 | `
  Why: Blank line for readability and logical separation.
- `L23 | def require_roles(*roles: str):`
  Why: Defines a function/method with reusable behavior.
- `L24 |     def role_checker(user=Depends(get_current_user)):`
  Why: Defines a function/method with reusable behavior.
- `L25 |         if user.role not in roles:`
  Why: Conditional branch; runs only when the condition is true.
- `L26 |             raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")`
  Why: Raises an exception/error to signal invalid state or failure.
- `L27 |         return user`
  Why: Returns a value/result from this function.
- `L28 | `
  Why: Blank line for readability and logical separation.
- `L29 |     return role_checker`
  Why: Returns a value/result from this function.
- `L30 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/core/security.py`

- `L1 | from datetime import datetime, timedelta, timezone`
  Why: Imports selected symbols from another module.
- `L2 | import base64`
  Why: Imports a module dependency used later in this file.
- `L3 | import hashlib`
  Why: Imports a module dependency used later in this file.
- `L4 | import hmac`
  Why: Imports a module dependency used later in this file.
- `L5 | import os`
  Why: Imports a module dependency used later in this file.
- `L6 | `
  Why: Blank line for readability and logical separation.
- `L7 | from jose import JWTError, jwt`
  Why: Imports selected symbols from another module.
- `L8 | `
  Why: Blank line for readability and logical separation.
- `L9 | from app.core.config import settings`
  Why: Imports selected symbols from another module.
- `L10 | `
  Why: Blank line for readability and logical separation.
- `L11 | def verify_password(plain_password: str, hashed_password: str) -> bool:`
  Why: Defines a function/method with reusable behavior.
- `L12 |     try:`
  Why: Starts guarded execution block for exception handling.
- `L13 |         # Format: pbkdf2_sha256$iterations$salt_b64$hash_b64`
  Why: Comment line documenting intent or context.
- `L14 |         scheme, iterations, salt_b64, hash_b64 = hashed_password.split("$", 3)`
  Why: Implementation line supporting this file's behavior or structure.
- `L15 |         if scheme != "pbkdf2_sha256":`
  Why: Conditional branch; runs only when the condition is true.
- `L16 |             return False`
  Why: Returns a value/result from this function.
- `L17 |         salt = base64.b64decode(salt_b64.encode("utf-8"))`
  Why: Implementation line supporting this file's behavior or structure.
- `L18 |         expected = base64.b64decode(hash_b64.encode("utf-8"))`
  Why: Implementation line supporting this file's behavior or structure.
- `L19 |         derived = hashlib.pbkdf2_hmac("sha256", plain_password.encode("utf-8"), salt, int(iterations))`
  Why: Implementation line supporting this file's behavior or structure.
- `L20 |         return hmac.compare_digest(derived, expected)`
  Why: Returns a value/result from this function.
- `L21 |     except Exception:`
  Why: Handles exceptions raised in the paired try block.
- `L22 |         return False`
  Why: Returns a value/result from this function.
- `L23 | `
  Why: Blank line for readability and logical separation.
- `L24 | `
  Why: Blank line for readability and logical separation.
- `L25 | def hash_password(password: str) -> str:`
  Why: Defines a function/method with reusable behavior.
- `L26 |     iterations = 100_000`
  Why: Implementation line supporting this file's behavior or structure.
- `L27 |     salt = os.urandom(16)`
  Why: Implementation line supporting this file's behavior or structure.
- `L28 |     digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, iterations)`
  Why: Implementation line supporting this file's behavior or structure.
- `L29 |     salt_b64 = base64.b64encode(salt).decode("utf-8")`
  Why: Implementation line supporting this file's behavior or structure.
- `L30 |     hash_b64 = base64.b64encode(digest).decode("utf-8")`
  Why: Implementation line supporting this file's behavior or structure.
- `L31 |     return f"pbkdf2_sha256${iterations}${salt_b64}${hash_b64}"`
  Why: Returns a value/result from this function.
- `L32 | `
  Why: Blank line for readability and logical separation.
- `L33 | `
  Why: Blank line for readability and logical separation.
- `L34 | def create_access_token(subject: str) -> str:`
  Why: Defines a function/method with reusable behavior.
- `L35 |     expire = datetime.now(timezone.utc) + timedelta(minutes=settings.access_token_expire_minutes)`
  Why: Implementation line supporting this file's behavior or structure.
- `L36 |     payload = {"sub": subject, "exp": expire}`
  Why: Implementation line supporting this file's behavior or structure.
- `L37 |     return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)`
  Why: Returns a value/result from this function.
- `L38 | `
  Why: Blank line for readability and logical separation.
- `L39 | `
  Why: Blank line for readability and logical separation.
- `L40 | def decode_access_token(token: str) -> str | None:`
  Why: Defines a function/method with reusable behavior.
- `L41 |     try:`
  Why: Starts guarded execution block for exception handling.
- `L42 |         payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])`
  Why: Decodes/verifies JWT token signature and payload.
- `L43 |         return payload.get("sub")`
  Why: Returns a value/result from this function.
- `L44 |     except JWTError:`
  Why: Handles exceptions raised in the paired try block.
- `L45 |         return None`
  Why: Returns a value/result from this function.

### File: `backend/app/main.py`

- `L1 | from fastapi import FastAPI`
  Why: Imports selected symbols from another module.
- `L2 | from fastapi.middleware.cors import CORSMiddleware`
  Why: Imports selected symbols from another module.
- `L3 | `
  Why: Blank line for readability and logical separation.
- `L4 | from app.controllers.auth_controller import router as auth_router`
  Why: Imports selected symbols from another module.
- `L5 | from app.controllers.candidate_controller import router as candidate_router`
  Why: Imports selected symbols from another module.
- `L6 | from app.controllers.dashboard_controller import router as dashboard_router`
  Why: Imports selected symbols from another module.
- `L7 | from app.controllers.job_controller import router as job_router`
  Why: Imports selected symbols from another module.
- `L8 | from app.controllers.matching_controller import router as matching_router`
  Why: Imports selected symbols from another module.
- `L9 | from app.core.database import Base, SessionLocal, engine`
  Why: Imports selected symbols from another module.
- `L10 | from app.services.auth_service import AuthService`
  Why: Imports selected symbols from another module.
- `L11 | `
  Why: Blank line for readability and logical separation.
- `L12 | # Ensure model metadata is loaded before create_all.`
  Why: Comment line documenting intent or context.
- `L13 | from app import models  # noqa: F401`
  Why: Imports selected symbols from another module.
- `L14 | `
  Why: Blank line for readability and logical separation.
- `L15 | `
  Why: Blank line for readability and logical separation.
- `L16 | app = FastAPI(title="AI Resume & Candidate Evaluation Tool")`
  Why: Implementation line supporting this file's behavior or structure.
- `L17 | `
  Why: Blank line for readability and logical separation.
- `L18 | app.add_middleware(`
  Why: Implementation line supporting this file's behavior or structure.
- `L19 |     CORSMiddleware,`
  Why: Implementation line supporting this file's behavior or structure.
- `L20 |     allow_origins=["http://localhost:4200", "http://127.0.0.1:4200"],`
  Why: Implementation line supporting this file's behavior or structure.
- `L21 |     allow_credentials=True,`
  Why: Implementation line supporting this file's behavior or structure.
- `L22 |     allow_methods=["*"],`
  Why: Implementation line supporting this file's behavior or structure.
- `L23 |     allow_headers=["*"],`
  Why: Implementation line supporting this file's behavior or structure.
- `L24 | )`
  Why: Closes a previously opened block/object/array/function scope.
- `L25 | `
  Why: Blank line for readability and logical separation.
- `L26 | `
  Why: Blank line for readability and logical separation.
- `L27 | @app.on_event("startup")`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L28 | def startup_event():`
  Why: Defines a function/method with reusable behavior.
- `L29 |     Base.metadata.create_all(bind=engine)`
  Why: Creates database tables from SQLAlchemy metadata if missing.
- `L30 |     db = SessionLocal()`
  Why: Implementation line supporting this file's behavior or structure.
- `L31 |     try:`
  Why: Starts guarded execution block for exception handling.
- `L32 |         AuthService(db).ensure_seed_users()`
  Why: Implementation line supporting this file's behavior or structure.
- `L33 |     finally:`
  Why: Cleanup block that runs regardless of success/failure.
- `L34 |         db.close()`
  Why: Implementation line supporting this file's behavior or structure.
- `L35 | `
  Why: Blank line for readability and logical separation.
- `L36 | `
  Why: Blank line for readability and logical separation.
- `L37 | app.include_router(auth_router)`
  Why: Implementation line supporting this file's behavior or structure.
- `L38 | app.include_router(candidate_router)`
  Why: Implementation line supporting this file's behavior or structure.
- `L39 | app.include_router(job_router)`
  Why: Implementation line supporting this file's behavior or structure.
- `L40 | app.include_router(matching_router)`
  Why: Implementation line supporting this file's behavior or structure.
- `L41 | app.include_router(dashboard_router)`
  Why: Implementation line supporting this file's behavior or structure.
- `L42 | `
  Why: Blank line for readability and logical separation.
- `L43 | `
  Why: Blank line for readability and logical separation.
- `L44 | @app.get("/")`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L45 | def health():`
  Why: Defines a function/method with reusable behavior.
- `L46 |     return {"status": "ok", "message": "AI Resume Tool API running"}`
  Why: Returns a value/result from this function.

### File: `backend/app/models/__init__.py`

- `L1 | from app.models.ai_data import AIData`
  Why: Imports selected symbols from another module.
- `L2 | from app.models.candidate import Candidate`
  Why: Imports selected symbols from another module.
- `L3 | from app.models.job import Job`
  Why: Imports selected symbols from another module.
- `L4 | from app.models.match import Match`
  Why: Imports selected symbols from another module.
- `L5 | from app.models.resume import Resume`
  Why: Imports selected symbols from another module.
- `L6 | from app.models.user import User`
  Why: Imports selected symbols from another module.
- `L7 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/models/ai_data.py`

- `L1 | from datetime import datetime`
  Why: Imports selected symbols from another module.
- `L2 | `
  Why: Blank line for readability and logical separation.
- `L3 | from sqlalchemy import DateTime, Integer, String, Text`
  Why: Imports selected symbols from another module.
- `L4 | from sqlalchemy.orm import Mapped, mapped_column`
  Why: Imports selected symbols from another module.
- `L5 | `
  Why: Blank line for readability and logical separation.
- `L6 | from app.core.database import Base`
  Why: Imports selected symbols from another module.
- `L7 | `
  Why: Blank line for readability and logical separation.
- `L8 | `
  Why: Blank line for readability and logical separation.
- `L9 | class AIData(Base):`
  Why: Defines a class to group related data or behavior.
- `L10 |     __tablename__ = "ai_data"`
  Why: Implementation line supporting this file's behavior or structure.
- `L11 | `
  Why: Blank line for readability and logical separation.
- `L12 |     id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L13 |     entity_type: Mapped[str] = mapped_column(String(50), nullable=False, index=True)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L14 |     entity_id: Mapped[int] = mapped_column(Integer, nullable=False, index=True)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L15 |     data_type: Mapped[str] = mapped_column(String(100), nullable=False)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L16 |     content: Mapped[str] = mapped_column(Text, nullable=False)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L17 |     created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L18 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/models/candidate.py`

- `L1 | from datetime import datetime`
  Why: Imports selected symbols from another module.
- `L2 | `
  Why: Blank line for readability and logical separation.
- `L3 | from sqlalchemy import DateTime, Float, Integer, String, Text`
  Why: Imports selected symbols from another module.
- `L4 | from sqlalchemy.orm import Mapped, mapped_column, relationship`
  Why: Imports selected symbols from another module.
- `L5 | `
  Why: Blank line for readability and logical separation.
- `L6 | from app.core.database import Base`
  Why: Imports selected symbols from another module.
- `L7 | `
  Why: Blank line for readability and logical separation.
- `L8 | `
  Why: Blank line for readability and logical separation.
- `L9 | class Candidate(Base):`
  Why: Defines a class to group related data or behavior.
- `L10 |     __tablename__ = "candidates"`
  Why: Implementation line supporting this file's behavior or structure.
- `L11 | `
  Why: Blank line for readability and logical separation.
- `L12 |     id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L13 |     name: Mapped[str] = mapped_column(String(200), nullable=False, index=True)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L14 |     email: Mapped[str] = mapped_column(String(200), unique=True, nullable=False, index=True)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L15 |     phone: Mapped[str | None] = mapped_column(String(50), nullable=True)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L16 |     skills_text: Mapped[str | None] = mapped_column(Text, nullable=True)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L17 |     experience_years: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L18 |     education: Mapped[str | None] = mapped_column(Text, nullable=True)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L19 |     summary: Mapped[str | None] = mapped_column(Text, nullable=True)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L20 |     created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L21 | `
  Why: Blank line for readability and logical separation.
- `L22 |     resumes = relationship("Resume", back_populates="candidate", cascade="all, delete-orphan")`
  Why: Defines ORM relationship between database tables/models.
- `L23 |     matches = relationship("Match", back_populates="candidate", cascade="all, delete-orphan")`
  Why: Defines ORM relationship between database tables/models.
- `L24 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/models/job.py`

- `L1 | from datetime import datetime`
  Why: Imports selected symbols from another module.
- `L2 | `
  Why: Blank line for readability and logical separation.
- `L3 | from sqlalchemy import DateTime, Float, Integer, String, Text`
  Why: Imports selected symbols from another module.
- `L4 | from sqlalchemy.orm import Mapped, mapped_column, relationship`
  Why: Imports selected symbols from another module.
- `L5 | `
  Why: Blank line for readability and logical separation.
- `L6 | from app.core.database import Base`
  Why: Imports selected symbols from another module.
- `L7 | `
  Why: Blank line for readability and logical separation.
- `L8 | `
  Why: Blank line for readability and logical separation.
- `L9 | class Job(Base):`
  Why: Defines a class to group related data or behavior.
- `L10 |     __tablename__ = "jobs"`
  Why: Implementation line supporting this file's behavior or structure.
- `L11 | `
  Why: Blank line for readability and logical separation.
- `L12 |     id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L13 |     title: Mapped[str] = mapped_column(String(200), nullable=False, index=True)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L14 |     department: Mapped[str] = mapped_column(String(120), nullable=False, index=True)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L15 |     skills_text: Mapped[str] = mapped_column(Text, nullable=False)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L16 |     experience_required: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L17 |     description: Mapped[str] = mapped_column(Text, nullable=False)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L18 |     improved_description: Mapped[str | None] = mapped_column(Text, nullable=True)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L19 |     created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L20 |     updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L21 | `
  Why: Blank line for readability and logical separation.
- `L22 |     matches = relationship("Match", back_populates="job", cascade="all, delete-orphan")`
  Why: Defines ORM relationship between database tables/models.
- `L23 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/models/match.py`

- `L1 | from datetime import datetime`
  Why: Imports selected symbols from another module.
- `L2 | `
  Why: Blank line for readability and logical separation.
- `L3 | from sqlalchemy import DateTime, Float, ForeignKey, Integer, Text, UniqueConstraint`
  Why: Imports selected symbols from another module.
- `L4 | from sqlalchemy.orm import Mapped, mapped_column, relationship`
  Why: Imports selected symbols from another module.
- `L5 | `
  Why: Blank line for readability and logical separation.
- `L6 | from app.core.database import Base`
  Why: Imports selected symbols from another module.
- `L7 | `
  Why: Blank line for readability and logical separation.
- `L8 | `
  Why: Blank line for readability and logical separation.
- `L9 | class Match(Base):`
  Why: Defines a class to group related data or behavior.
- `L10 |     __tablename__ = "matches"`
  Why: Implementation line supporting this file's behavior or structure.
- `L11 |     __table_args__ = (UniqueConstraint("candidate_id", "job_id", name="uq_candidate_job"),)`
  Why: Implementation line supporting this file's behavior or structure.
- `L12 | `
  Why: Blank line for readability and logical separation.
- `L13 |     id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L14 |     candidate_id: Mapped[int] = mapped_column(ForeignKey("candidates.id", ondelete="CASCADE"), nullable=False, index=True)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L15 |     job_id: Mapped[int] = mapped_column(ForeignKey("jobs.id", ondelete="CASCADE"), nullable=False, index=True)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L16 |     skill_match_pct: Mapped[float] = mapped_column(Float, nullable=False)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L17 |     experience_match_pct: Mapped[float] = mapped_column(Float, nullable=False)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L18 |     overall_score: Mapped[float] = mapped_column(Float, nullable=False)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L19 |     explanation: Mapped[str | None] = mapped_column(Text, nullable=True)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L20 |     created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L21 | `
  Why: Blank line for readability and logical separation.
- `L22 |     candidate = relationship("Candidate", back_populates="matches")`
  Why: Defines ORM relationship between database tables/models.
- `L23 |     job = relationship("Job", back_populates="matches")`
  Why: Defines ORM relationship between database tables/models.
- `L24 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/models/resume.py`

- `L1 | from datetime import datetime`
  Why: Imports selected symbols from another module.
- `L2 | `
  Why: Blank line for readability and logical separation.
- `L3 | from sqlalchemy import DateTime, ForeignKey, Integer, String, Text`
  Why: Imports selected symbols from another module.
- `L4 | from sqlalchemy.orm import Mapped, mapped_column, relationship`
  Why: Imports selected symbols from another module.
- `L5 | `
  Why: Blank line for readability and logical separation.
- `L6 | from app.core.database import Base`
  Why: Imports selected symbols from another module.
- `L7 | `
  Why: Blank line for readability and logical separation.
- `L8 | `
  Why: Blank line for readability and logical separation.
- `L9 | class Resume(Base):`
  Why: Defines a class to group related data or behavior.
- `L10 |     __tablename__ = "resumes"`
  Why: Implementation line supporting this file's behavior or structure.
- `L11 | `
  Why: Blank line for readability and logical separation.
- `L12 |     id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L13 |     candidate_id: Mapped[int] = mapped_column(ForeignKey("candidates.id", ondelete="CASCADE"), nullable=False, index=True)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L14 |     file_path: Mapped[str] = mapped_column(String(500), nullable=False)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L15 |     raw_text: Mapped[str | None] = mapped_column(Text, nullable=True)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L16 |     uploaded_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L17 | `
  Why: Blank line for readability and logical separation.
- `L18 |     candidate = relationship("Candidate", back_populates="resumes")`
  Why: Defines ORM relationship between database tables/models.
- `L19 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/models/user.py`

- `L1 | from datetime import datetime`
  Why: Imports selected symbols from another module.
- `L2 | `
  Why: Blank line for readability and logical separation.
- `L3 | from sqlalchemy import DateTime, Integer, String`
  Why: Imports selected symbols from another module.
- `L4 | from sqlalchemy.orm import Mapped, mapped_column`
  Why: Imports selected symbols from another module.
- `L5 | `
  Why: Blank line for readability and logical separation.
- `L6 | from app.core.database import Base`
  Why: Imports selected symbols from another module.
- `L7 | `
  Why: Blank line for readability and logical separation.
- `L8 | `
  Why: Blank line for readability and logical separation.
- `L9 | class User(Base):`
  Why: Defines a class to group related data or behavior.
- `L10 |     __tablename__ = "users"`
  Why: Implementation line supporting this file's behavior or structure.
- `L11 | `
  Why: Blank line for readability and logical separation.
- `L12 |     id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L13 |     username: Mapped[str] = mapped_column(String(100), unique=True, nullable=False, index=True)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L14 |     password_hash: Mapped[str] = mapped_column(String(255), nullable=False)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L15 |     role: Mapped[str] = mapped_column(String(20), nullable=False)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L16 |     created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)`
  Why: Defines SQLAlchemy column metadata for a model field.
- `L17 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/repositories/__init__.py`

This file is empty. It exists to mark package/module boundaries or reserve structure.

### File: `backend/app/repositories/ai_data_repository.py`

- `L1 | from sqlalchemy.orm import Session`
  Why: Imports selected symbols from another module.
- `L2 | `
  Why: Blank line for readability and logical separation.
- `L3 | from app.models.ai_data import AIData`
  Why: Imports selected symbols from another module.
- `L4 | `
  Why: Blank line for readability and logical separation.
- `L5 | `
  Why: Blank line for readability and logical separation.
- `L6 | class AIDataRepository:`
  Why: Defines a class to group related data or behavior.
- `L7 |     def __init__(self, db: Session):`
  Why: Defines a function/method with reusable behavior.
- `L8 |         self.db = db`
  Why: Implementation line supporting this file's behavior or structure.
- `L9 | `
  Why: Blank line for readability and logical separation.
- `L10 |     def create(self, entity_type: str, entity_id: int, data_type: str, content: str) -> AIData:`
  Why: Defines a function/method with reusable behavior.
- `L11 |         row = AIData(entity_type=entity_type, entity_id=entity_id, data_type=data_type, content=content)`
  Why: Implementation line supporting this file's behavior or structure.
- `L12 |         self.db.add(row)`
  Why: Implementation line supporting this file's behavior or structure.
- `L13 |         self.db.commit()`
  Why: Implementation line supporting this file's behavior or structure.
- `L14 |         self.db.refresh(row)`
  Why: Implementation line supporting this file's behavior or structure.
- `L15 |         return row`
  Why: Returns a value/result from this function.
- `L16 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/repositories/candidate_repository.py`

- `L1 | from sqlalchemy import desc`
  Why: Imports selected symbols from another module.
- `L2 | from sqlalchemy.orm import Session`
  Why: Imports selected symbols from another module.
- `L3 | `
  Why: Blank line for readability and logical separation.
- `L4 | from app.models.candidate import Candidate`
  Why: Imports selected symbols from another module.
- `L5 | from app.models.resume import Resume`
  Why: Imports selected symbols from another module.
- `L6 | `
  Why: Blank line for readability and logical separation.
- `L7 | `
  Why: Blank line for readability and logical separation.
- `L8 | class CandidateRepository:`
  Why: Defines a class to group related data or behavior.
- `L9 |     def __init__(self, db: Session):`
  Why: Defines a function/method with reusable behavior.
- `L10 |         self.db = db`
  Why: Implementation line supporting this file's behavior or structure.
- `L11 | `
  Why: Blank line for readability and logical separation.
- `L12 |     def create(self, candidate: Candidate) -> Candidate:`
  Why: Defines a function/method with reusable behavior.
- `L13 |         self.db.add(candidate)`
  Why: Implementation line supporting this file's behavior or structure.
- `L14 |         self.db.commit()`
  Why: Implementation line supporting this file's behavior or structure.
- `L15 |         self.db.refresh(candidate)`
  Why: Implementation line supporting this file's behavior or structure.
- `L16 |         return candidate`
  Why: Returns a value/result from this function.
- `L17 | `
  Why: Blank line for readability and logical separation.
- `L18 |     def get_by_id(self, candidate_id: int) -> Candidate | None:`
  Why: Defines a function/method with reusable behavior.
- `L19 |         return self.db.query(Candidate).filter(Candidate.id == candidate_id).first()`
  Why: Returns a value/result from this function.
- `L20 | `
  Why: Blank line for readability and logical separation.
- `L21 |     def get_by_email(self, email: str) -> Candidate | None:`
  Why: Defines a function/method with reusable behavior.
- `L22 |         return self.db.query(Candidate).filter(Candidate.email == email).first()`
  Why: Returns a value/result from this function.
- `L23 | `
  Why: Blank line for readability and logical separation.
- `L24 |     def list_all(self, skills: list[str] | None = None, min_experience: float | None = None) -> list[Candidate]:`
  Why: Defines a function/method with reusable behavior.
- `L25 |         query = self.db.query(Candidate)`
  Why: Implementation line supporting this file's behavior or structure.
- `L26 |         if min_experience is not None:`
  Why: Conditional branch; runs only when the condition is true.
- `L27 |             query = query.filter(Candidate.experience_years >= min_experience)`
  Why: Implementation line supporting this file's behavior or structure.
- `L28 |         rows = query.order_by(desc(Candidate.created_at)).all()`
  Why: Implementation line supporting this file's behavior or structure.
- `L29 |         if not skills:`
  Why: Conditional branch; runs only when the condition is true.
- `L30 |             return rows`
  Why: Returns a value/result from this function.
- `L31 |         normalized = {s.strip().lower() for s in skills if s.strip()}`
  Why: Implementation line supporting this file's behavior or structure.
- `L32 |         filtered = []`
  Why: Implementation line supporting this file's behavior or structure.
- `L33 |         for row in rows:`
  Why: Loop over a collection/iterator to process items one by one.
- `L34 |             row_skills = {s.strip().lower() for s in (row.skills_text or "").split(",") if s.strip()}`
  Why: Implementation line supporting this file's behavior or structure.
- `L35 |             if normalized.issubset(row_skills):`
  Why: Conditional branch; runs only when the condition is true.
- `L36 |                 filtered.append(row)`
  Why: Implementation line supporting this file's behavior or structure.
- `L37 |         return filtered`
  Why: Returns a value/result from this function.
- `L38 | `
  Why: Blank line for readability and logical separation.
- `L39 |     def save_resume(self, resume: Resume) -> Resume:`
  Why: Defines a function/method with reusable behavior.
- `L40 |         self.db.add(resume)`
  Why: Implementation line supporting this file's behavior or structure.
- `L41 |         self.db.commit()`
  Why: Implementation line supporting this file's behavior or structure.
- `L42 |         self.db.refresh(resume)`
  Why: Implementation line supporting this file's behavior or structure.
- `L43 |         return resume`
  Why: Returns a value/result from this function.
- `L44 | `
  Why: Blank line for readability and logical separation.
- `L45 |     def update(self, candidate: Candidate) -> Candidate:`
  Why: Defines a function/method with reusable behavior.
- `L46 |         self.db.add(candidate)`
  Why: Implementation line supporting this file's behavior or structure.
- `L47 |         self.db.commit()`
  Why: Implementation line supporting this file's behavior or structure.
- `L48 |         self.db.refresh(candidate)`
  Why: Implementation line supporting this file's behavior or structure.
- `L49 |         return candidate`
  Why: Returns a value/result from this function.
- `L50 | `
  Why: Blank line for readability and logical separation.
- `L51 |     def recent(self, limit: int = 5) -> list[Candidate]:`
  Why: Defines a function/method with reusable behavior.
- `L52 |         return self.db.query(Candidate).order_by(desc(Candidate.created_at)).limit(limit).all()`
  Why: Returns a value/result from this function.
- `L53 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/repositories/job_repository.py`

- `L1 | from sqlalchemy import desc`
  Why: Imports selected symbols from another module.
- `L2 | from sqlalchemy.orm import Session`
  Why: Imports selected symbols from another module.
- `L3 | `
  Why: Blank line for readability and logical separation.
- `L4 | from app.models.job import Job`
  Why: Imports selected symbols from another module.
- `L5 | `
  Why: Blank line for readability and logical separation.
- `L6 | `
  Why: Blank line for readability and logical separation.
- `L7 | class JobRepository:`
  Why: Defines a class to group related data or behavior.
- `L8 |     def __init__(self, db: Session):`
  Why: Defines a function/method with reusable behavior.
- `L9 |         self.db = db`
  Why: Implementation line supporting this file's behavior or structure.
- `L10 | `
  Why: Blank line for readability and logical separation.
- `L11 |     def create(self, job: Job) -> Job:`
  Why: Defines a function/method with reusable behavior.
- `L12 |         self.db.add(job)`
  Why: Implementation line supporting this file's behavior or structure.
- `L13 |         self.db.commit()`
  Why: Implementation line supporting this file's behavior or structure.
- `L14 |         self.db.refresh(job)`
  Why: Implementation line supporting this file's behavior or structure.
- `L15 |         return job`
  Why: Returns a value/result from this function.
- `L16 | `
  Why: Blank line for readability and logical separation.
- `L17 |     def get_by_id(self, job_id: int) -> Job | None:`
  Why: Defines a function/method with reusable behavior.
- `L18 |         return self.db.query(Job).filter(Job.id == job_id).first()`
  Why: Returns a value/result from this function.
- `L19 | `
  Why: Blank line for readability and logical separation.
- `L20 |     def list_all(self) -> list[Job]:`
  Why: Defines a function/method with reusable behavior.
- `L21 |         return self.db.query(Job).order_by(desc(Job.created_at)).all()`
  Why: Returns a value/result from this function.
- `L22 | `
  Why: Blank line for readability and logical separation.
- `L23 |     def update(self, job: Job) -> Job:`
  Why: Defines a function/method with reusable behavior.
- `L24 |         self.db.add(job)`
  Why: Implementation line supporting this file's behavior or structure.
- `L25 |         self.db.commit()`
  Why: Implementation line supporting this file's behavior or structure.
- `L26 |         self.db.refresh(job)`
  Why: Implementation line supporting this file's behavior or structure.
- `L27 |         return job`
  Why: Returns a value/result from this function.
- `L28 | `
  Why: Blank line for readability and logical separation.
- `L29 |     def delete(self, job: Job) -> None:`
  Why: Defines a function/method with reusable behavior.
- `L30 |         self.db.delete(job)`
  Why: Implementation line supporting this file's behavior or structure.
- `L31 |         self.db.commit()`
  Why: Implementation line supporting this file's behavior or structure.
- `L32 | `
  Why: Blank line for readability and logical separation.
- `L33 |     def recent(self, limit: int = 5) -> list[Job]:`
  Why: Defines a function/method with reusable behavior.
- `L34 |         return self.db.query(Job).order_by(desc(Job.created_at)).limit(limit).all()`
  Why: Returns a value/result from this function.
- `L35 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/repositories/match_repository.py`

- `L1 | from sqlalchemy import desc`
  Why: Imports selected symbols from another module.
- `L2 | from sqlalchemy.orm import Session`
  Why: Imports selected symbols from another module.
- `L3 | `
  Why: Blank line for readability and logical separation.
- `L4 | from app.models.match import Match`
  Why: Imports selected symbols from another module.
- `L5 | `
  Why: Blank line for readability and logical separation.
- `L6 | `
  Why: Blank line for readability and logical separation.
- `L7 | class MatchRepository:`
  Why: Defines a class to group related data or behavior.
- `L8 |     def __init__(self, db: Session):`
  Why: Defines a function/method with reusable behavior.
- `L9 |         self.db = db`
  Why: Implementation line supporting this file's behavior or structure.
- `L10 | `
  Why: Blank line for readability and logical separation.
- `L11 |     def upsert(self, payload: Match) -> Match:`
  Why: Defines a function/method with reusable behavior.
- `L12 |         existing = (`
  Why: Implementation line supporting this file's behavior or structure.
- `L13 |             self.db.query(Match)`
  Why: Implementation line supporting this file's behavior or structure.
- `L14 |             .filter(Match.candidate_id == payload.candidate_id, Match.job_id == payload.job_id)`
  Why: Implementation line supporting this file's behavior or structure.
- `L15 |             .first()`
  Why: Implementation line supporting this file's behavior or structure.
- `L16 |         )`
  Why: Closes a previously opened block/object/array/function scope.
- `L17 |         if existing:`
  Why: Conditional branch; runs only when the condition is true.
- `L18 |             existing.skill_match_pct = payload.skill_match_pct`
  Why: Implementation line supporting this file's behavior or structure.
- `L19 |             existing.experience_match_pct = payload.experience_match_pct`
  Why: Implementation line supporting this file's behavior or structure.
- `L20 |             existing.overall_score = payload.overall_score`
  Why: Implementation line supporting this file's behavior or structure.
- `L21 |             existing.explanation = payload.explanation`
  Why: Implementation line supporting this file's behavior or structure.
- `L22 |             self.db.add(existing)`
  Why: Implementation line supporting this file's behavior or structure.
- `L23 |             self.db.commit()`
  Why: Implementation line supporting this file's behavior or structure.
- `L24 |             self.db.refresh(existing)`
  Why: Implementation line supporting this file's behavior or structure.
- `L25 |             return existing`
  Why: Returns a value/result from this function.
- `L26 |         self.db.add(payload)`
  Why: Implementation line supporting this file's behavior or structure.
- `L27 |         self.db.commit()`
  Why: Implementation line supporting this file's behavior or structure.
- `L28 |         self.db.refresh(payload)`
  Why: Implementation line supporting this file's behavior or structure.
- `L29 |         return payload`
  Why: Returns a value/result from this function.
- `L30 | `
  Why: Blank line for readability and logical separation.
- `L31 |     def list_by_candidate(self, candidate_id: int) -> list[Match]:`
  Why: Defines a function/method with reusable behavior.
- `L32 |         return (`
  Why: Returns a value/result from this function.
- `L33 |             self.db.query(Match)`
  Why: Implementation line supporting this file's behavior or structure.
- `L34 |             .filter(Match.candidate_id == candidate_id)`
  Why: Implementation line supporting this file's behavior or structure.
- `L35 |             .order_by(desc(Match.overall_score))`
  Why: Implementation line supporting this file's behavior or structure.
- `L36 |             .all()`
  Why: Implementation line supporting this file's behavior or structure.
- `L37 |         )`
  Why: Closes a previously opened block/object/array/function scope.
- `L38 | `
  Why: Blank line for readability and logical separation.
- `L39 |     def list_by_job(self, job_id: int) -> list[Match]:`
  Why: Defines a function/method with reusable behavior.
- `L40 |         return self.db.query(Match).filter(Match.job_id == job_id).order_by(desc(Match.overall_score)).all()`
  Why: Returns a value/result from this function.
- `L41 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/repositories/user_repository.py`

- `L1 | from sqlalchemy.orm import Session`
  Why: Imports selected symbols from another module.
- `L2 | `
  Why: Blank line for readability and logical separation.
- `L3 | from app.models.user import User`
  Why: Imports selected symbols from another module.
- `L4 | `
  Why: Blank line for readability and logical separation.
- `L5 | `
  Why: Blank line for readability and logical separation.
- `L6 | class UserRepository:`
  Why: Defines a class to group related data or behavior.
- `L7 |     def __init__(self, db: Session):`
  Why: Defines a function/method with reusable behavior.
- `L8 |         self.db = db`
  Why: Implementation line supporting this file's behavior or structure.
- `L9 | `
  Why: Blank line for readability and logical separation.
- `L10 |     def get_by_username(self, username: str) -> User | None:`
  Why: Defines a function/method with reusable behavior.
- `L11 |         return self.db.query(User).filter(User.username == username).first()`
  Why: Returns a value/result from this function.
- `L12 | `
  Why: Blank line for readability and logical separation.
- `L13 |     def create_user(self, username: str, password_hash: str, role: str) -> User:`
  Why: Defines a function/method with reusable behavior.
- `L14 |         user = User(username=username, password_hash=password_hash, role=role)`
  Why: Implementation line supporting this file's behavior or structure.
- `L15 |         self.db.add(user)`
  Why: Implementation line supporting this file's behavior or structure.
- `L16 |         self.db.commit()`
  Why: Implementation line supporting this file's behavior or structure.
- `L17 |         self.db.refresh(user)`
  Why: Implementation line supporting this file's behavior or structure.
- `L18 |         return user`
  Why: Returns a value/result from this function.
- `L19 | `
  Why: Blank line for readability and logical separation.
- `L20 |     def update_user(self, user: User) -> User:`
  Why: Defines a function/method with reusable behavior.
- `L21 |         self.db.add(user)`
  Why: Implementation line supporting this file's behavior or structure.
- `L22 |         self.db.commit()`
  Why: Implementation line supporting this file's behavior or structure.
- `L23 |         self.db.refresh(user)`
  Why: Implementation line supporting this file's behavior or structure.
- `L24 |         return user`
  Why: Returns a value/result from this function.

### File: `backend/app/schemas/__init__.py`

This file is empty. It exists to mark package/module boundaries or reserve structure.

### File: `backend/app/schemas/auth_schema.py`

- `L1 | from pydantic import BaseModel, Field`
  Why: Imports selected symbols from another module.
- `L2 | `
  Why: Blank line for readability and logical separation.
- `L3 | `
  Why: Blank line for readability and logical separation.
- `L4 | class LoginRequest(BaseModel):`
  Why: Defines a class to group related data or behavior.
- `L5 |     username: str = Field(min_length=2, max_length=100)`
  Why: Implementation line supporting this file's behavior or structure.
- `L6 |     password: str = Field(min_length=3, max_length=100)`
  Why: Implementation line supporting this file's behavior or structure.
- `L7 | `
  Why: Blank line for readability and logical separation.
- `L8 | `
  Why: Blank line for readability and logical separation.
- `L9 | class TokenResponse(BaseModel):`
  Why: Defines a class to group related data or behavior.
- `L10 |     access_token: str`
  Why: Implementation line supporting this file's behavior or structure.
- `L11 |     token_type: str = "bearer"`
  Why: Implementation line supporting this file's behavior or structure.
- `L12 |     role: str`
  Why: Implementation line supporting this file's behavior or structure.
- `L13 |     username: str`
  Why: Implementation line supporting this file's behavior or structure.

### File: `backend/app/schemas/candidate_schema.py`

- `L1 | from datetime import datetime`
  Why: Imports selected symbols from another module.
- `L2 | `
  Why: Blank line for readability and logical separation.
- `L3 | from pydantic import BaseModel, ConfigDict, EmailStr, Field`
  Why: Imports selected symbols from another module.
- `L4 | `
  Why: Blank line for readability and logical separation.
- `L5 | `
  Why: Blank line for readability and logical separation.
- `L6 | class CandidateBase(BaseModel):`
  Why: Defines a class to group related data or behavior.
- `L7 |     name: str = Field(min_length=2, max_length=200)`
  Why: Implementation line supporting this file's behavior or structure.
- `L8 |     email: EmailStr`
  Why: Implementation line supporting this file's behavior or structure.
- `L9 |     phone: str | None = Field(default=None, max_length=50)`
  Why: Implementation line supporting this file's behavior or structure.
- `L10 | `
  Why: Blank line for readability and logical separation.
- `L11 | `
  Why: Blank line for readability and logical separation.
- `L12 | class CandidateCreate(CandidateBase):`
  Why: Defines a class to group related data or behavior.
- `L13 |     pass`
  Why: Implementation line supporting this file's behavior or structure.
- `L14 | `
  Why: Blank line for readability and logical separation.
- `L15 | `
  Why: Blank line for readability and logical separation.
- `L16 | class CandidateResponse(CandidateBase):`
  Why: Defines a class to group related data or behavior.
- `L17 |     model_config = ConfigDict(from_attributes=True)`
  Why: Implementation line supporting this file's behavior or structure.
- `L18 | `
  Why: Blank line for readability and logical separation.
- `L19 |     id: int`
  Why: Implementation line supporting this file's behavior or structure.
- `L20 |     skills: list[str] = []`
  Why: Implementation line supporting this file's behavior or structure.
- `L21 |     experience_years: float = 0.0`
  Why: Implementation line supporting this file's behavior or structure.
- `L22 |     education: str | None = None`
  Why: Implementation line supporting this file's behavior or structure.
- `L23 |     summary: str | None = None`
  Why: Implementation line supporting this file's behavior or structure.
- `L24 |     created_at: datetime`
  Why: Implementation line supporting this file's behavior or structure.
- `L25 | `
  Why: Blank line for readability and logical separation.
- `L26 | `
  Why: Blank line for readability and logical separation.
- `L27 | class CandidateDetailResponse(CandidateResponse):`
  Why: Defines a class to group related data or behavior.
- `L28 |     resumes: list[dict] = []`
  Why: Implementation line supporting this file's behavior or structure.
- `L29 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/schemas/common_schema.py`

- `L1 | from pydantic import BaseModel`
  Why: Imports selected symbols from another module.
- `L2 | `
  Why: Blank line for readability and logical separation.
- `L3 | `
  Why: Blank line for readability and logical separation.
- `L4 | class MessageResponse(BaseModel):`
  Why: Defines a class to group related data or behavior.
- `L5 |     message: str`
  Why: Implementation line supporting this file's behavior or structure.
- `L6 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/schemas/dashboard_schema.py`

- `L1 | from pydantic import BaseModel`
  Why: Imports selected symbols from another module.
- `L2 | `
  Why: Blank line for readability and logical separation.
- `L3 | `
  Why: Blank line for readability and logical separation.
- `L4 | class DashboardResponse(BaseModel):`
  Why: Defines a class to group related data or behavior.
- `L5 |     total_candidates: int`
  Why: Implementation line supporting this file's behavior or structure.
- `L6 |     total_jobs: int`
  Why: Implementation line supporting this file's behavior or structure.
- `L7 |     recent_candidates: list[dict]`
  Why: Implementation line supporting this file's behavior or structure.
- `L8 |     recent_jobs: list[dict]`
  Why: Implementation line supporting this file's behavior or structure.
- `L9 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/schemas/job_schema.py`

- `L1 | from datetime import datetime`
  Why: Imports selected symbols from another module.
- `L2 | `
  Why: Blank line for readability and logical separation.
- `L3 | from pydantic import BaseModel, ConfigDict, Field`
  Why: Imports selected symbols from another module.
- `L4 | `
  Why: Blank line for readability and logical separation.
- `L5 | `
  Why: Blank line for readability and logical separation.
- `L6 | class JobBase(BaseModel):`
  Why: Defines a class to group related data or behavior.
- `L7 |     title: str = Field(min_length=2, max_length=200)`
  Why: Implementation line supporting this file's behavior or structure.
- `L8 |     department: str = Field(min_length=2, max_length=120)`
  Why: Implementation line supporting this file's behavior or structure.
- `L9 |     skills: list[str] = Field(min_length=1)`
  Why: Implementation line supporting this file's behavior or structure.
- `L10 |     experience_required: float = Field(ge=0)`
  Why: Implementation line supporting this file's behavior or structure.
- `L11 |     description: str = Field(min_length=5)`
  Why: Implementation line supporting this file's behavior or structure.
- `L12 | `
  Why: Blank line for readability and logical separation.
- `L13 | `
  Why: Blank line for readability and logical separation.
- `L14 | class JobCreate(JobBase):`
  Why: Defines a class to group related data or behavior.
- `L15 |     pass`
  Why: Implementation line supporting this file's behavior or structure.
- `L16 | `
  Why: Blank line for readability and logical separation.
- `L17 | `
  Why: Blank line for readability and logical separation.
- `L18 | class JobUpdate(JobBase):`
  Why: Defines a class to group related data or behavior.
- `L19 |     pass`
  Why: Implementation line supporting this file's behavior or structure.
- `L20 | `
  Why: Blank line for readability and logical separation.
- `L21 | `
  Why: Blank line for readability and logical separation.
- `L22 | class JobResponse(JobBase):`
  Why: Defines a class to group related data or behavior.
- `L23 |     model_config = ConfigDict(from_attributes=True)`
  Why: Implementation line supporting this file's behavior or structure.
- `L24 | `
  Why: Blank line for readability and logical separation.
- `L25 |     id: int`
  Why: Implementation line supporting this file's behavior or structure.
- `L26 |     improved_description: str | None = None`
  Why: Implementation line supporting this file's behavior or structure.
- `L27 |     created_at: datetime`
  Why: Implementation line supporting this file's behavior or structure.
- `L28 |     updated_at: datetime`
  Why: Implementation line supporting this file's behavior or structure.
- `L29 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/schemas/match_schema.py`

- `L1 | from datetime import datetime`
  Why: Imports selected symbols from another module.
- `L2 | `
  Why: Blank line for readability and logical separation.
- `L3 | from pydantic import BaseModel`
  Why: Imports selected symbols from another module.
- `L4 | `
  Why: Blank line for readability and logical separation.
- `L5 | `
  Why: Blank line for readability and logical separation.
- `L6 | class MatchResponse(BaseModel):`
  Why: Defines a class to group related data or behavior.
- `L7 |     id: int`
  Why: Implementation line supporting this file's behavior or structure.
- `L8 |     candidate_id: int`
  Why: Implementation line supporting this file's behavior or structure.
- `L9 |     job_id: int`
  Why: Implementation line supporting this file's behavior or structure.
- `L10 |     skill_match_pct: float`
  Why: Implementation line supporting this file's behavior or structure.
- `L11 |     experience_match_pct: float`
  Why: Implementation line supporting this file's behavior or structure.
- `L12 |     overall_score: float`
  Why: Implementation line supporting this file's behavior or structure.
- `L13 |     explanation: str | None`
  Why: Implementation line supporting this file's behavior or structure.
- `L14 |     created_at: datetime`
  Why: Implementation line supporting this file's behavior or structure.
- `L15 | `
  Why: Blank line for readability and logical separation.
- `L16 | `
  Why: Blank line for readability and logical separation.
- `L17 | class CandidateMatchView(BaseModel):`
  Why: Defines a class to group related data or behavior.
- `L18 |     candidate_id: int`
  Why: Implementation line supporting this file's behavior or structure.
- `L19 |     candidate_name: str`
  Why: Implementation line supporting this file's behavior or structure.
- `L20 |     job_id: int`
  Why: Implementation line supporting this file's behavior or structure.
- `L21 |     job_title: str`
  Why: Implementation line supporting this file's behavior or structure.
- `L22 |     skill_match_pct: float`
  Why: Implementation line supporting this file's behavior or structure.
- `L23 |     experience_match_pct: float`
  Why: Implementation line supporting this file's behavior or structure.
- `L24 |     overall_score: float`
  Why: Implementation line supporting this file's behavior or structure.
- `L25 |     explanation: str | None`
  Why: Implementation line supporting this file's behavior or structure.
- `L26 | `
  Why: Blank line for readability and logical separation.
- `L27 | `
  Why: Blank line for readability and logical separation.
- `L28 | class JobMatchView(BaseModel):`
  Why: Defines a class to group related data or behavior.
- `L29 |     job_id: int`
  Why: Implementation line supporting this file's behavior or structure.
- `L30 |     job_title: str`
  Why: Implementation line supporting this file's behavior or structure.
- `L31 |     candidate_id: int`
  Why: Implementation line supporting this file's behavior or structure.
- `L32 |     candidate_name: str`
  Why: Implementation line supporting this file's behavior or structure.
- `L33 |     overall_score: float`
  Why: Implementation line supporting this file's behavior or structure.
- `L34 |     skill_match_pct: float`
  Why: Implementation line supporting this file's behavior or structure.
- `L35 |     experience_match_pct: float`
  Why: Implementation line supporting this file's behavior or structure.
- `L36 |     explanation: str | None`
  Why: Implementation line supporting this file's behavior or structure.
- `L37 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/services/__init__.py`

This file is empty. It exists to mark package/module boundaries or reserve structure.

### File: `backend/app/services/ai_service.py`

- `L1 | import re`
  Why: Imports a module dependency used later in this file.
- `L2 | `
  Why: Blank line for readability and logical separation.
- `L3 | `
  Why: Blank line for readability and logical separation.
- `L4 | class AIService:`
  Why: Defines a class to group related data or behavior.
- `L5 |     KNOWN_SKILLS = {`
  Why: Implementation line supporting this file's behavior or structure.
- `L6 |         "python",`
  Why: Implementation line supporting this file's behavior or structure.
- `L7 |         "java",`
  Why: Implementation line supporting this file's behavior or structure.
- `L8 |         "javascript",`
  Why: Implementation line supporting this file's behavior or structure.
- `L9 |         "typescript",`
  Why: Implementation line supporting this file's behavior or structure.
- `L10 |         "angular",`
  Why: Implementation line supporting this file's behavior or structure.
- `L11 |         "react",`
  Why: Implementation line supporting this file's behavior or structure.
- `L12 |         "node",`
  Why: Implementation line supporting this file's behavior or structure.
- `L13 |         "fastapi",`
  Why: Implementation line supporting this file's behavior or structure.
- `L14 |         "django",`
  Why: Implementation line supporting this file's behavior or structure.
- `L15 |         "sql",`
  Why: Implementation line supporting this file's behavior or structure.
- `L16 |         "postgresql",`
  Why: Implementation line supporting this file's behavior or structure.
- `L17 |         "mysql",`
  Why: Implementation line supporting this file's behavior or structure.
- `L18 |         "aws",`
  Why: Implementation line supporting this file's behavior or structure.
- `L19 |         "docker",`
  Why: Implementation line supporting this file's behavior or structure.
- `L20 |         "kubernetes",`
  Why: Implementation line supporting this file's behavior or structure.
- `L21 |         "git",`
  Why: Implementation line supporting this file's behavior or structure.
- `L22 |         "html",`
  Why: Implementation line supporting this file's behavior or structure.
- `L23 |         "css",`
  Why: Implementation line supporting this file's behavior or structure.
- `L24 |     }`
  Why: Closes a previously opened block/object/array/function scope.
- `L25 | `
  Why: Blank line for readability and logical separation.
- `L26 |     def parse_resume(self, text: str) -> dict:`
  Why: Defines a function/method with reusable behavior.
- `L27 |         lowered = text.lower()`
  Why: Implementation line supporting this file's behavior or structure.
- `L28 |         skills = sorted([skill for skill in self.KNOWN_SKILLS if re.search(rf"\b{re.escape(skill)}\b", lowered)])`
  Why: Implementation line supporting this file's behavior or structure.
- `L29 |         experience_years = self._extract_experience_years(lowered)`
  Why: Implementation line supporting this file's behavior or structure.
- `L30 |         education = self._extract_education(text)`
  Why: Implementation line supporting this file's behavior or structure.
- `L31 |         return {`
  Why: Returns a value/result from this function.
- `L32 |             "skills": skills,`
  Why: Implementation line supporting this file's behavior or structure.
- `L33 |             "experience_years": experience_years,`
  Why: Implementation line supporting this file's behavior or structure.
- `L34 |             "education": education,`
  Why: Implementation line supporting this file's behavior or structure.
- `L35 |         }`
  Why: Closes a previously opened block/object/array/function scope.
- `L36 | `
  Why: Blank line for readability and logical separation.
- `L37 |     def generate_candidate_summary(self, candidate_name: str, skills: list[str], experience_years: float, education: str | None) -> str:`
  Why: Defines a function/method with reusable behavior.
- `L38 |         top_skills = ", ".join(skills[:6]) if skills else "general software development"`
  Why: Implementation line supporting this file's behavior or structure.
- `L39 |         edu = education or "education details not clearly listed"`
  Why: Implementation line supporting this file's behavior or structure.
- `L40 |         lines = [`
  Why: Implementation line supporting this file's behavior or structure.
- `L41 |             f"{candidate_name} appears to be a strong candidate for technical roles.",`
  Why: Implementation line supporting this file's behavior or structure.
- `L42 |             f"Key skill areas include {top_skills}.",`
  Why: Implementation line supporting this file's behavior or structure.
- `L43 |             f"Estimated hands-on experience is around {experience_years:.1f} years.",`
  Why: Implementation line supporting this file's behavior or structure.
- `L44 |             "Profile indicates practical exposure to real-world project delivery.",`
  Why: Implementation line supporting this file's behavior or structure.
- `L45 |             f"Education background: {edu}.",`
  Why: Implementation line supporting this file's behavior or structure.
- `L46 |             "Candidate may be a good fit for teams needing quick onboarding.",`
  Why: Implementation line supporting this file's behavior or structure.
- `L47 |         ]`
  Why: Closes a previously opened block/object/array/function scope.
- `L48 |         return " ".join(lines)`
  Why: Returns a value/result from this function.
- `L49 | `
  Why: Blank line for readability and logical separation.
- `L50 |     def improve_job_description(self, title: str, department: str, description: str, skills: list[str], experience_required: float) -> str:`
  Why: Defines a function/method with reusable behavior.
- `L51 |         skills_line = ", ".join(skills)`
  Why: Implementation line supporting this file's behavior or structure.
- `L52 |         return (`
  Why: Returns a value/result from this function.
- `L53 |             f"We are hiring a {title} for the {department} team. "`
  Why: Implementation line supporting this file's behavior or structure.
- `L54 |             f"The role requires approximately {experience_required:.1f}+ years of relevant experience. "`
  Why: Implementation line supporting this file's behavior or structure.
- `L55 |             f"Core technical skills: {skills_line}. "`
  Why: Implementation line supporting this file's behavior or structure.
- `L56 |             "The selected candidate will collaborate across teams, build reliable solutions, "`
  Why: Implementation line supporting this file's behavior or structure.
- `L57 |             "and contribute to continuous improvement in delivery quality. "`
  Why: Implementation line supporting this file's behavior or structure.
- `L58 |             f"Role context: {description}"`
  Why: Implementation line supporting this file's behavior or structure.
- `L59 |         )`
  Why: Closes a previously opened block/object/array/function scope.
- `L60 | `
  Why: Blank line for readability and logical separation.
- `L61 |     def generate_match_explanation(`
  Why: Defines a function/method with reusable behavior.
- `L62 |         self,`
  Why: Implementation line supporting this file's behavior or structure.
- `L63 |         candidate_name: str,`
  Why: Implementation line supporting this file's behavior or structure.
- `L64 |         job_title: str,`
  Why: Implementation line supporting this file's behavior or structure.
- `L65 |         matching_skills: list[str],`
  Why: Implementation line supporting this file's behavior or structure.
- `L66 |         missing_skills: list[str],`
  Why: Implementation line supporting this file's behavior or structure.
- `L67 |         experience_match_pct: float,`
  Why: Implementation line supporting this file's behavior or structure.
- `L68 |     ) -> str:`
  Why: Implementation line supporting this file's behavior or structure.
- `L69 |         matched = ", ".join(matching_skills) if matching_skills else "no direct skill overlap yet"`
  Why: Implementation line supporting this file's behavior or structure.
- `L70 |         missing = ", ".join(missing_skills) if missing_skills else "no major skill gaps"`
  Why: Implementation line supporting this file's behavior or structure.
- `L71 |         return (`
  Why: Returns a value/result from this function.
- `L72 |             f"{candidate_name} vs {job_title}: matched skills include {matched}. "`
  Why: Implementation line supporting this file's behavior or structure.
- `L73 |             f"Potential gaps: {missing}. Experience alignment is {experience_match_pct:.2f}%. "`
  Why: Implementation line supporting this file's behavior or structure.
- `L74 |             "Overall this score reflects current fit based on available structured data."`
  Why: Implementation line supporting this file's behavior or structure.
- `L75 |         )`
  Why: Closes a previously opened block/object/array/function scope.
- `L76 | `
  Why: Blank line for readability and logical separation.
- `L77 |     def _extract_experience_years(self, text: str) -> float:`
  Why: Defines a function/method with reusable behavior.
- `L78 |         years_patterns = [`
  Why: Implementation line supporting this file's behavior or structure.
- `L79 |             r"(\d+(?:\.\d+)?)\s*\+?\s*years?",`
  Why: Implementation line supporting this file's behavior or structure.
- `L80 |             r"experience\s*[:\-]?\s*(\d+(?:\.\d+)?)",`
  Why: Implementation line supporting this file's behavior or structure.
- `L81 |         ]`
  Why: Closes a previously opened block/object/array/function scope.
- `L82 |         for pattern in years_patterns:`
  Why: Loop over a collection/iterator to process items one by one.
- `L83 |             match = re.search(pattern, text)`
  Why: Implementation line supporting this file's behavior or structure.
- `L84 |             if match:`
  Why: Conditional branch; runs only when the condition is true.
- `L85 |                 return float(match.group(1))`
  Why: Returns a value/result from this function.
- `L86 |         return 0.0`
  Why: Returns a value/result from this function.
- `L87 | `
  Why: Blank line for readability and logical separation.
- `L88 |     def _extract_education(self, text: str) -> str:`
  Why: Defines a function/method with reusable behavior.
- `L89 |         lines = [line.strip() for line in text.splitlines() if line.strip()]`
  Why: Implementation line supporting this file's behavior or structure.
- `L90 |         for line in lines:`
  Why: Loop over a collection/iterator to process items one by one.
- `L91 |             lowered = line.lower()`
  Why: Implementation line supporting this file's behavior or structure.
- `L92 |             if any(x in lowered for x in ["b.tech", "bachelor", "master", "mca", "bca", "phd", "degree"]):`
  Why: Conditional branch; runs only when the condition is true.
- `L93 |                 return line`
  Why: Returns a value/result from this function.
- `L94 |         return "Not specified"`
  Why: Returns a value/result from this function.
- `L95 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/services/auth_service.py`

- `L1 | from fastapi import HTTPException, status`
  Why: Imports selected symbols from another module.
- `L2 | from sqlalchemy.orm import Session`
  Why: Imports selected symbols from another module.
- `L3 | `
  Why: Blank line for readability and logical separation.
- `L4 | from app.core.security import create_access_token, hash_password, verify_password`
  Why: Imports selected symbols from another module.
- `L5 | from app.repositories.user_repository import UserRepository`
  Why: Imports selected symbols from another module.
- `L6 | `
  Why: Blank line for readability and logical separation.
- `L7 | `
  Why: Blank line for readability and logical separation.
- `L8 | class AuthService:`
  Why: Defines a class to group related data or behavior.
- `L9 |     def __init__(self, db: Session):`
  Why: Defines a function/method with reusable behavior.
- `L10 |         self.user_repository = UserRepository(db)`
  Why: Implementation line supporting this file's behavior or structure.
- `L11 | `
  Why: Blank line for readability and logical separation.
- `L12 |     def login(self, username: str, password: str) -> dict:`
  Why: Defines a function/method with reusable behavior.
- `L13 |         user = self.user_repository.get_by_username(username)`
  Why: Implementation line supporting this file's behavior or structure.
- `L14 |         if not user or not verify_password(password, user.password_hash):`
  Why: Conditional branch; runs only when the condition is true.
- `L15 |             raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")`
  Why: Raises an exception/error to signal invalid state or failure.
- `L16 |         token = create_access_token(subject=user.username)`
  Why: Implementation line supporting this file's behavior or structure.
- `L17 |         return {"access_token": token, "role": user.role, "username": user.username}`
  Why: Returns a value/result from this function.
- `L18 | `
  Why: Blank line for readability and logical separation.
- `L19 |     def ensure_seed_users(self) -> None:`
  Why: Defines a function/method with reusable behavior.
- `L20 |         seed_users = [`
  Why: Implementation line supporting this file's behavior or structure.
- `L21 |             ("admin", "admin123", "Admin"),`
  Why: Implementation line supporting this file's behavior or structure.
- `L22 |             ("hr", "hr123", "HR"),`
  Why: Implementation line supporting this file's behavior or structure.
- `L23 |         ]`
  Why: Closes a previously opened block/object/array/function scope.
- `L24 |         for username, password, role in seed_users:`
  Why: Loop over a collection/iterator to process items one by one.
- `L25 |             existing = self.user_repository.get_by_username(username)`
  Why: Implementation line supporting this file's behavior or structure.
- `L26 |             if not existing:`
  Why: Conditional branch; runs only when the condition is true.
- `L27 |                 self.user_repository.create_user(username=username, password_hash=hash_password(password), role=role)`
  Why: Implementation line supporting this file's behavior or structure.
- `L28 |                 continue`
  Why: Implementation line supporting this file's behavior or structure.
- `L29 |             if not (existing.password_hash or "").startswith("pbkdf2_sha256$"):`
  Why: Conditional branch; runs only when the condition is true.
- `L30 |                 existing.password_hash = hash_password(password)`
  Why: Implementation line supporting this file's behavior or structure.
- `L31 |                 existing.role = role`
  Why: Implementation line supporting this file's behavior or structure.
- `L32 |                 self.user_repository.update_user(existing)`
  Why: Implementation line supporting this file's behavior or structure.

### File: `backend/app/services/candidate_service.py`

- `L1 | import os`
  Why: Imports a module dependency used later in this file.
- `L2 | import uuid`
  Why: Imports a module dependency used later in this file.
- `L3 | `
  Why: Blank line for readability and logical separation.
- `L4 | from fastapi import HTTPException, UploadFile, status`
  Why: Imports selected symbols from another module.
- `L5 | from sqlalchemy.orm import Session`
  Why: Imports selected symbols from another module.
- `L6 | `
  Why: Blank line for readability and logical separation.
- `L7 | from app.core.config import settings`
  Why: Imports selected symbols from another module.
- `L8 | from app.models.candidate import Candidate`
  Why: Imports selected symbols from another module.
- `L9 | from app.models.resume import Resume`
  Why: Imports selected symbols from another module.
- `L10 | from app.repositories.ai_data_repository import AIDataRepository`
  Why: Imports selected symbols from another module.
- `L11 | from app.repositories.candidate_repository import CandidateRepository`
  Why: Imports selected symbols from another module.
- `L12 | from app.schemas.candidate_schema import CandidateCreate`
  Why: Imports selected symbols from another module.
- `L13 | from app.services.ai_service import AIService`
  Why: Imports selected symbols from another module.
- `L14 | `
  Why: Blank line for readability and logical separation.
- `L15 | `
  Why: Blank line for readability and logical separation.
- `L16 | class CandidateService:`
  Why: Defines a class to group related data or behavior.
- `L17 |     def __init__(self, db: Session):`
  Why: Defines a function/method with reusable behavior.
- `L18 |         self.candidate_repository = CandidateRepository(db)`
  Why: Implementation line supporting this file's behavior or structure.
- `L19 |         self.ai_data_repository = AIDataRepository(db)`
  Why: Implementation line supporting this file's behavior or structure.
- `L20 |         self.ai_service = AIService()`
  Why: Implementation line supporting this file's behavior or structure.
- `L21 | `
  Why: Blank line for readability and logical separation.
- `L22 |     def create_candidate(self, payload: CandidateCreate) -> Candidate:`
  Why: Defines a function/method with reusable behavior.
- `L23 |         if self.candidate_repository.get_by_email(payload.email):`
  Why: Conditional branch; runs only when the condition is true.
- `L24 |             raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Candidate email already exists")`
  Why: Raises an exception/error to signal invalid state or failure.
- `L25 |         candidate = Candidate(name=payload.name, email=payload.email, phone=payload.phone)`
  Why: Implementation line supporting this file's behavior or structure.
- `L26 |         return self.candidate_repository.create(candidate)`
  Why: Returns a value/result from this function.
- `L27 | `
  Why: Blank line for readability and logical separation.
- `L28 |     def list_candidates(self, skills: list[str] | None, min_experience: float | None) -> list[Candidate]:`
  Why: Defines a function/method with reusable behavior.
- `L29 |         return self.candidate_repository.list_all(skills=skills, min_experience=min_experience)`
  Why: Returns a value/result from this function.
- `L30 | `
  Why: Blank line for readability and logical separation.
- `L31 |     def get_candidate_detail(self, candidate_id: int) -> Candidate:`
  Why: Defines a function/method with reusable behavior.
- `L32 |         candidate = self.candidate_repository.get_by_id(candidate_id)`
  Why: Implementation line supporting this file's behavior or structure.
- `L33 |         if not candidate:`
  Why: Conditional branch; runs only when the condition is true.
- `L34 |             raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Candidate not found")`
  Why: Raises an exception/error to signal invalid state or failure.
- `L35 |         return candidate`
  Why: Returns a value/result from this function.
- `L36 | `
  Why: Blank line for readability and logical separation.
- `L37 |     def upload_resume(self, candidate_id: int, resume_file: UploadFile) -> Resume:`
  Why: Defines a function/method with reusable behavior.
- `L38 |         candidate = self.get_candidate_detail(candidate_id)`
  Why: Implementation line supporting this file's behavior or structure.
- `L39 |         os.makedirs(settings.upload_dir, exist_ok=True)`
  Why: Implementation line supporting this file's behavior or structure.
- `L40 | `
  Why: Blank line for readability and logical separation.
- `L41 |         ext = os.path.splitext(resume_file.filename or "")[1] or ".txt"`
  Why: Implementation line supporting this file's behavior or structure.
- `L42 |         filename = f"{candidate_id}_{uuid.uuid4().hex}{ext}"`
  Why: Implementation line supporting this file's behavior or structure.
- `L43 |         path = os.path.join(settings.upload_dir, filename)`
  Why: Implementation line supporting this file's behavior or structure.
- `L44 | `
  Why: Blank line for readability and logical separation.
- `L45 |         raw_bytes = resume_file.file.read()`
  Why: Implementation line supporting this file's behavior or structure.
- `L46 |         with open(path, "wb") as output:`
  Why: Implementation line supporting this file's behavior or structure.
- `L47 |             output.write(raw_bytes)`
  Why: Implementation line supporting this file's behavior or structure.
- `L48 | `
  Why: Blank line for readability and logical separation.
- `L49 |         raw_text = self._extract_text(raw_bytes)`
  Why: Implementation line supporting this file's behavior or structure.
- `L50 |         resume = self.candidate_repository.save_resume(Resume(candidate_id=candidate_id, file_path=path, raw_text=raw_text))`
  Why: Implementation line supporting this file's behavior or structure.
- `L51 | `
  Why: Blank line for readability and logical separation.
- `L52 |         parsed = self.ai_service.parse_resume(raw_text)`
  Why: Implementation line supporting this file's behavior or structure.
- `L53 |         candidate.skills_text = ", ".join(parsed["skills"])`
  Why: Implementation line supporting this file's behavior or structure.
- `L54 |         candidate.experience_years = parsed["experience_years"]`
  Why: Implementation line supporting this file's behavior or structure.
- `L55 |         candidate.education = parsed["education"]`
  Why: Implementation line supporting this file's behavior or structure.
- `L56 |         candidate.summary = self.ai_service.generate_candidate_summary(`
  Why: Implementation line supporting this file's behavior or structure.
- `L57 |             candidate_name=candidate.name,`
  Why: Implementation line supporting this file's behavior or structure.
- `L58 |             skills=parsed["skills"],`
  Why: Implementation line supporting this file's behavior or structure.
- `L59 |             experience_years=parsed["experience_years"],`
  Why: Implementation line supporting this file's behavior or structure.
- `L60 |             education=parsed["education"],`
  Why: Implementation line supporting this file's behavior or structure.
- `L61 |         )`
  Why: Closes a previously opened block/object/array/function scope.
- `L62 |         self.candidate_repository.update(candidate)`
  Why: Implementation line supporting this file's behavior or structure.
- `L63 | `
  Why: Blank line for readability and logical separation.
- `L64 |         self.ai_data_repository.create("candidate", candidate.id, "resume_parse", str(parsed))`
  Why: Implementation line supporting this file's behavior or structure.
- `L65 |         self.ai_data_repository.create("candidate", candidate.id, "summary", candidate.summary or "")`
  Why: Implementation line supporting this file's behavior or structure.
- `L66 |         return resume`
  Why: Returns a value/result from this function.
- `L67 | `
  Why: Blank line for readability and logical separation.
- `L68 |     def _extract_text(self, raw_bytes: bytes) -> str:`
  Why: Defines a function/method with reusable behavior.
- `L69 |         try:`
  Why: Starts guarded execution block for exception handling.
- `L70 |             return raw_bytes.decode("utf-8")`
  Why: Returns a value/result from this function.
- `L71 |         except UnicodeDecodeError:`
  Why: Handles exceptions raised in the paired try block.
- `L72 |             return raw_bytes.decode("latin-1", errors="ignore")`
  Why: Returns a value/result from this function.
- `L73 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/services/dashboard_service.py`

- `L1 | from sqlalchemy.orm import Session`
  Why: Imports selected symbols from another module.
- `L2 | `
  Why: Blank line for readability and logical separation.
- `L3 | from app.models.candidate import Candidate`
  Why: Imports selected symbols from another module.
- `L4 | from app.models.job import Job`
  Why: Imports selected symbols from another module.
- `L5 | from app.repositories.candidate_repository import CandidateRepository`
  Why: Imports selected symbols from another module.
- `L6 | from app.repositories.job_repository import JobRepository`
  Why: Imports selected symbols from another module.
- `L7 | `
  Why: Blank line for readability and logical separation.
- `L8 | `
  Why: Blank line for readability and logical separation.
- `L9 | class DashboardService:`
  Why: Defines a class to group related data or behavior.
- `L10 |     def __init__(self, db: Session):`
  Why: Defines a function/method with reusable behavior.
- `L11 |         self.db = db`
  Why: Implementation line supporting this file's behavior or structure.
- `L12 |         self.candidate_repository = CandidateRepository(db)`
  Why: Implementation line supporting this file's behavior or structure.
- `L13 |         self.job_repository = JobRepository(db)`
  Why: Implementation line supporting this file's behavior or structure.
- `L14 | `
  Why: Blank line for readability and logical separation.
- `L15 |     def get_dashboard_data(self) -> dict:`
  Why: Defines a function/method with reusable behavior.
- `L16 |         total_candidates = self.db.query(Candidate).count()`
  Why: Implementation line supporting this file's behavior or structure.
- `L17 |         total_jobs = self.db.query(Job).count()`
  Why: Implementation line supporting this file's behavior or structure.
- `L18 |         recent_candidates = [`
  Why: Implementation line supporting this file's behavior or structure.
- `L19 |             {"id": c.id, "name": c.name, "created_at": c.created_at.isoformat()} for c in self.candidate_repository.recent()`
  Why: Implementation line supporting this file's behavior or structure.
- `L20 |         ]`
  Why: Closes a previously opened block/object/array/function scope.
- `L21 |         recent_jobs = [{"id": j.id, "title": j.title, "created_at": j.created_at.isoformat()} for j in self.job_repository.recent()]`
  Why: Implementation line supporting this file's behavior or structure.
- `L22 | `
  Why: Blank line for readability and logical separation.
- `L23 |         return {`
  Why: Returns a value/result from this function.
- `L24 |             "total_candidates": total_candidates,`
  Why: Implementation line supporting this file's behavior or structure.
- `L25 |             "total_jobs": total_jobs,`
  Why: Implementation line supporting this file's behavior or structure.
- `L26 |             "recent_candidates": recent_candidates,`
  Why: Implementation line supporting this file's behavior or structure.
- `L27 |             "recent_jobs": recent_jobs,`
  Why: Implementation line supporting this file's behavior or structure.
- `L28 |         }`
  Why: Closes a previously opened block/object/array/function scope.
- `L29 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/services/job_service.py`

- `L1 | from fastapi import HTTPException, status`
  Why: Imports selected symbols from another module.
- `L2 | from sqlalchemy.orm import Session`
  Why: Imports selected symbols from another module.
- `L3 | `
  Why: Blank line for readability and logical separation.
- `L4 | from app.models.job import Job`
  Why: Imports selected symbols from another module.
- `L5 | from app.repositories.ai_data_repository import AIDataRepository`
  Why: Imports selected symbols from another module.
- `L6 | from app.repositories.job_repository import JobRepository`
  Why: Imports selected symbols from another module.
- `L7 | from app.schemas.job_schema import JobCreate, JobUpdate`
  Why: Imports selected symbols from another module.
- `L8 | from app.services.ai_service import AIService`
  Why: Imports selected symbols from another module.
- `L9 | `
  Why: Blank line for readability and logical separation.
- `L10 | `
  Why: Blank line for readability and logical separation.
- `L11 | class JobService:`
  Why: Defines a class to group related data or behavior.
- `L12 |     def __init__(self, db: Session):`
  Why: Defines a function/method with reusable behavior.
- `L13 |         self.job_repository = JobRepository(db)`
  Why: Implementation line supporting this file's behavior or structure.
- `L14 |         self.ai_repository = AIDataRepository(db)`
  Why: Implementation line supporting this file's behavior or structure.
- `L15 |         self.ai_service = AIService()`
  Why: Implementation line supporting this file's behavior or structure.
- `L16 | `
  Why: Blank line for readability and logical separation.
- `L17 |     def create_job(self, payload: JobCreate) -> Job:`
  Why: Defines a function/method with reusable behavior.
- `L18 |         improved = self.ai_service.improve_job_description(`
  Why: Implementation line supporting this file's behavior or structure.
- `L19 |             title=payload.title,`
  Why: Implementation line supporting this file's behavior or structure.
- `L20 |             department=payload.department,`
  Why: Implementation line supporting this file's behavior or structure.
- `L21 |             description=payload.description,`
  Why: Implementation line supporting this file's behavior or structure.
- `L22 |             skills=payload.skills,`
  Why: Implementation line supporting this file's behavior or structure.
- `L23 |             experience_required=payload.experience_required,`
  Why: Implementation line supporting this file's behavior or structure.
- `L24 |         )`
  Why: Closes a previously opened block/object/array/function scope.
- `L25 |         job = Job(`
  Why: Implementation line supporting this file's behavior or structure.
- `L26 |             title=payload.title,`
  Why: Implementation line supporting this file's behavior or structure.
- `L27 |             department=payload.department,`
  Why: Implementation line supporting this file's behavior or structure.
- `L28 |             skills_text=", ".join(payload.skills),`
  Why: Implementation line supporting this file's behavior or structure.
- `L29 |             experience_required=payload.experience_required,`
  Why: Implementation line supporting this file's behavior or structure.
- `L30 |             description=payload.description,`
  Why: Implementation line supporting this file's behavior or structure.
- `L31 |             improved_description=improved,`
  Why: Implementation line supporting this file's behavior or structure.
- `L32 |         )`
  Why: Closes a previously opened block/object/array/function scope.
- `L33 |         created = self.job_repository.create(job)`
  Why: Implementation line supporting this file's behavior or structure.
- `L34 |         self.ai_repository.create("job", created.id, "improved_description", improved)`
  Why: Implementation line supporting this file's behavior or structure.
- `L35 |         return created`
  Why: Returns a value/result from this function.
- `L36 | `
  Why: Blank line for readability and logical separation.
- `L37 |     def list_jobs(self) -> list[Job]:`
  Why: Defines a function/method with reusable behavior.
- `L38 |         return self.job_repository.list_all()`
  Why: Returns a value/result from this function.
- `L39 | `
  Why: Blank line for readability and logical separation.
- `L40 |     def get_job(self, job_id: int) -> Job:`
  Why: Defines a function/method with reusable behavior.
- `L41 |         job = self.job_repository.get_by_id(job_id)`
  Why: Implementation line supporting this file's behavior or structure.
- `L42 |         if not job:`
  Why: Conditional branch; runs only when the condition is true.
- `L43 |             raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")`
  Why: Raises an exception/error to signal invalid state or failure.
- `L44 |         return job`
  Why: Returns a value/result from this function.
- `L45 | `
  Why: Blank line for readability and logical separation.
- `L46 |     def update_job(self, job_id: int, payload: JobUpdate) -> Job:`
  Why: Defines a function/method with reusable behavior.
- `L47 |         job = self.get_job(job_id)`
  Why: Implementation line supporting this file's behavior or structure.
- `L48 |         job.title = payload.title`
  Why: Implementation line supporting this file's behavior or structure.
- `L49 |         job.department = payload.department`
  Why: Implementation line supporting this file's behavior or structure.
- `L50 |         job.skills_text = ", ".join(payload.skills)`
  Why: Implementation line supporting this file's behavior or structure.
- `L51 |         job.experience_required = payload.experience_required`
  Why: Implementation line supporting this file's behavior or structure.
- `L52 |         job.description = payload.description`
  Why: Implementation line supporting this file's behavior or structure.
- `L53 |         job.improved_description = self.ai_service.improve_job_description(`
  Why: Implementation line supporting this file's behavior or structure.
- `L54 |             title=payload.title,`
  Why: Implementation line supporting this file's behavior or structure.
- `L55 |             department=payload.department,`
  Why: Implementation line supporting this file's behavior or structure.
- `L56 |             description=payload.description,`
  Why: Implementation line supporting this file's behavior or structure.
- `L57 |             skills=payload.skills,`
  Why: Implementation line supporting this file's behavior or structure.
- `L58 |             experience_required=payload.experience_required,`
  Why: Implementation line supporting this file's behavior or structure.
- `L59 |         )`
  Why: Closes a previously opened block/object/array/function scope.
- `L60 |         updated = self.job_repository.update(job)`
  Why: Implementation line supporting this file's behavior or structure.
- `L61 |         self.ai_repository.create("job", updated.id, "improved_description", updated.improved_description or "")`
  Why: Implementation line supporting this file's behavior or structure.
- `L62 |         return updated`
  Why: Returns a value/result from this function.
- `L63 | `
  Why: Blank line for readability and logical separation.
- `L64 |     def delete_job(self, job_id: int) -> None:`
  Why: Defines a function/method with reusable behavior.
- `L65 |         job = self.get_job(job_id)`
  Why: Implementation line supporting this file's behavior or structure.
- `L66 |         self.job_repository.delete(job)`
  Why: Implementation line supporting this file's behavior or structure.
- `L67 | `
  Why: Blank line for readability and logical separation.

### File: `backend/app/services/matching_service.py`

- `L1 | from sqlalchemy.orm import Session`
  Why: Imports selected symbols from another module.
- `L2 | `
  Why: Blank line for readability and logical separation.
- `L3 | from app.models.match import Match`
  Why: Imports selected symbols from another module.
- `L4 | from app.repositories.candidate_repository import CandidateRepository`
  Why: Imports selected symbols from another module.
- `L5 | from app.repositories.job_repository import JobRepository`
  Why: Imports selected symbols from another module.
- `L6 | from app.repositories.match_repository import MatchRepository`
  Why: Imports selected symbols from another module.
- `L7 | from app.services.ai_service import AIService`
  Why: Imports selected symbols from another module.
- `L8 | `
  Why: Blank line for readability and logical separation.
- `L9 | `
  Why: Blank line for readability and logical separation.
- `L10 | class MatchingService:`
  Why: Defines a class to group related data or behavior.
- `L11 |     def __init__(self, db: Session):`
  Why: Defines a function/method with reusable behavior.
- `L12 |         self.candidate_repository = CandidateRepository(db)`
  Why: Implementation line supporting this file's behavior or structure.
- `L13 |         self.job_repository = JobRepository(db)`
  Why: Implementation line supporting this file's behavior or structure.
- `L14 |         self.match_repository = MatchRepository(db)`
  Why: Implementation line supporting this file's behavior or structure.
- `L15 |         self.ai_service = AIService()`
  Why: Implementation line supporting this file's behavior or structure.
- `L16 | `
  Why: Blank line for readability and logical separation.
- `L17 |     def run_matching(self, candidate_id: int | None = None, job_id: int | None = None) -> list[Match]:`
  Why: Defines a function/method with reusable behavior.
- `L18 |         candidates = [self.candidate_repository.get_by_id(candidate_id)] if candidate_id else self.candidate_repository.list_all()`
  Why: Implementation line supporting this file's behavior or structure.
- `L19 |         jobs = [self.job_repository.get_by_id(job_id)] if job_id else self.job_repository.list_all()`
  Why: Implementation line supporting this file's behavior or structure.
- `L20 |         candidates = [c for c in candidates if c is not None]`
  Why: Implementation line supporting this file's behavior or structure.
- `L21 |         jobs = [j for j in jobs if j is not None]`
  Why: Implementation line supporting this file's behavior or structure.
- `L22 | `
  Why: Blank line for readability and logical separation.
- `L23 |         results: list[Match] = []`
  Why: Implementation line supporting this file's behavior or structure.
- `L24 |         for candidate in candidates:`
  Why: Loop over a collection/iterator to process items one by one.
- `L25 |             candidate_skills = self._skills_to_set(candidate.skills_text)`
  Why: Implementation line supporting this file's behavior or structure.
- `L26 |             for job in jobs:`
  Why: Loop over a collection/iterator to process items one by one.
- `L27 |                 required_skills = self._skills_to_set(job.skills_text)`
  Why: Implementation line supporting this file's behavior or structure.
- `L28 |                 if not required_skills:`
  Why: Conditional branch; runs only when the condition is true.
- `L29 |                     skill_match_pct = 0.0`
  Why: Implementation line supporting this file's behavior or structure.
- `L30 |                 else:`
  Why: Fallback branch when previous conditions are not met.
- `L31 |                     matching_count = len(candidate_skills.intersection(required_skills))`
  Why: Implementation line supporting this file's behavior or structure.
- `L32 |                     skill_match_pct = (matching_count / len(required_skills)) * 100`
  Why: Implementation line supporting this file's behavior or structure.
- `L33 | `
  Why: Blank line for readability and logical separation.
- `L34 |                 required_experience = max(job.experience_required, 0.1)`
  Why: Implementation line supporting this file's behavior or structure.
- `L35 |                 experience_match_pct = min((candidate.experience_years / required_experience) * 100, 100.0)`
  Why: Implementation line supporting this file's behavior or structure.
- `L36 |                 overall_score = round((0.7 * skill_match_pct) + (0.3 * experience_match_pct), 2)`
  Why: Implementation line supporting this file's behavior or structure.
- `L37 | `
  Why: Blank line for readability and logical separation.
- `L38 |                 explanation = self.ai_service.generate_match_explanation(`
  Why: Implementation line supporting this file's behavior or structure.
- `L39 |                     candidate_name=candidate.name,`
  Why: Implementation line supporting this file's behavior or structure.
- `L40 |                     job_title=job.title,`
  Why: Implementation line supporting this file's behavior or structure.
- `L41 |                     matching_skills=sorted(candidate_skills.intersection(required_skills)),`
  Why: Implementation line supporting this file's behavior or structure.
- `L42 |                     missing_skills=sorted(required_skills - candidate_skills),`
  Why: Implementation line supporting this file's behavior or structure.
- `L43 |                     experience_match_pct=experience_match_pct,`
  Why: Implementation line supporting this file's behavior or structure.
- `L44 |                 )`
  Why: Closes a previously opened block/object/array/function scope.
- `L45 |                 match = Match(`
  Why: Implementation line supporting this file's behavior or structure.
- `L46 |                     candidate_id=candidate.id,`
  Why: Implementation line supporting this file's behavior or structure.
- `L47 |                     job_id=job.id,`
  Why: Implementation line supporting this file's behavior or structure.
- `L48 |                     skill_match_pct=round(skill_match_pct, 2),`
  Why: Implementation line supporting this file's behavior or structure.
- `L49 |                     experience_match_pct=round(experience_match_pct, 2),`
  Why: Implementation line supporting this file's behavior or structure.
- `L50 |                     overall_score=overall_score,`
  Why: Implementation line supporting this file's behavior or structure.
- `L51 |                     explanation=explanation,`
  Why: Implementation line supporting this file's behavior or structure.
- `L52 |                 )`
  Why: Closes a previously opened block/object/array/function scope.
- `L53 |                 results.append(self.match_repository.upsert(match))`
  Why: Implementation line supporting this file's behavior or structure.
- `L54 |         return results`
  Why: Returns a value/result from this function.
- `L55 | `
  Why: Blank line for readability and logical separation.
- `L56 |     def candidate_view(self, candidate_id: int):`
  Why: Defines a function/method with reusable behavior.
- `L57 |         return self.match_repository.list_by_candidate(candidate_id)`
  Why: Returns a value/result from this function.
- `L58 | `
  Why: Blank line for readability and logical separation.
- `L59 |     def job_view(self, job_id: int):`
  Why: Defines a function/method with reusable behavior.
- `L60 |         return self.match_repository.list_by_job(job_id)`
  Why: Returns a value/result from this function.
- `L61 | `
  Why: Blank line for readability and logical separation.
- `L62 |     def _skills_to_set(self, skills_text: str | None) -> set[str]:`
  Why: Defines a function/method with reusable behavior.
- `L63 |         return {s.strip().lower() for s in (skills_text or "").split(",") if s.strip()}`
  Why: Returns a value/result from this function.
- `L64 | `
  Why: Blank line for readability and logical separation.

### File: `backend/main.py`

- `L1 | from app.main import app`
  Why: Imports selected symbols from another module.

### File: `backend/requirements.txt`

- `L1 | fastapi==0.115.0`
  Why: Configuration variable assignment consumed by the application.
- `L2 | uvicorn==0.30.6`
  Why: Configuration variable assignment consumed by the application.
- `L3 | sqlalchemy==2.0.35`
  Why: Configuration variable assignment consumed by the application.
- `L4 | psycopg[binary]==3.2.10`
  Why: Configuration variable assignment consumed by the application.
- `L5 | python-jose==3.3.0`
  Why: Configuration variable assignment consumed by the application.
- `L6 | python-multipart==0.0.9`
  Why: Configuration variable assignment consumed by the application.
- `L7 | pydantic==2.9.2`
  Why: Configuration variable assignment consumed by the application.
- `L8 | pydantic-settings==2.5.2`
  Why: Configuration variable assignment consumed by the application.
- `L9 | email-validator==2.2.0`
  Why: Configuration variable assignment consumed by the application.

### File: `backend/schema.sql`

- `L1 | CREATE TABLE IF NOT EXISTS users (`
  Why: Creates a database table required by application features.
- `L2 |     id SERIAL PRIMARY KEY,`
  Why: Marks a unique row identifier column for this table.
- `L3 |     username VARCHAR(100) UNIQUE NOT NULL,`
  Why: Enforces uniqueness constraint to prevent duplicates.
- `L4 |     password_hash VARCHAR(255) NOT NULL,`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L5 |     role VARCHAR(20) NOT NULL,`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L6 |     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L7 | );`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L8 | `
  Why: Blank line for readability and logical separation.
- `L9 | CREATE TABLE IF NOT EXISTS candidates (`
  Why: Creates a database table required by application features.
- `L10 |     id SERIAL PRIMARY KEY,`
  Why: Marks a unique row identifier column for this table.
- `L11 |     name VARCHAR(200) NOT NULL,`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L12 |     email VARCHAR(200) UNIQUE NOT NULL,`
  Why: Enforces uniqueness constraint to prevent duplicates.
- `L13 |     phone VARCHAR(50),`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L14 |     skills_text TEXT,`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L15 |     experience_years FLOAT NOT NULL DEFAULT 0,`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L16 |     education TEXT,`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L17 |     summary TEXT,`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L18 |     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L19 | );`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L20 | `
  Why: Blank line for readability and logical separation.
- `L21 | CREATE TABLE IF NOT EXISTS resumes (`
  Why: Creates a database table required by application features.
- `L22 |     id SERIAL PRIMARY KEY,`
  Why: Marks a unique row identifier column for this table.
- `L23 |     candidate_id INT NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,`
  Why: Declares relational integrity link to another table.
- `L24 |     file_path VARCHAR(500) NOT NULL,`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L25 |     raw_text TEXT,`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L26 |     uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L27 | );`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L28 | `
  Why: Blank line for readability and logical separation.
- `L29 | CREATE TABLE IF NOT EXISTS jobs (`
  Why: Creates a database table required by application features.
- `L30 |     id SERIAL PRIMARY KEY,`
  Why: Marks a unique row identifier column for this table.
- `L31 |     title VARCHAR(200) NOT NULL,`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L32 |     department VARCHAR(120) NOT NULL,`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L33 |     skills_text TEXT NOT NULL,`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L34 |     experience_required FLOAT NOT NULL DEFAULT 0,`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L35 |     description TEXT NOT NULL,`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L36 |     improved_description TEXT,`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L37 |     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L38 |     updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L39 | );`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L40 | `
  Why: Blank line for readability and logical separation.
- `L41 | CREATE TABLE IF NOT EXISTS matches (`
  Why: Creates a database table required by application features.
- `L42 |     id SERIAL PRIMARY KEY,`
  Why: Marks a unique row identifier column for this table.
- `L43 |     candidate_id INT NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,`
  Why: Declares relational integrity link to another table.
- `L44 |     job_id INT NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,`
  Why: Declares relational integrity link to another table.
- `L45 |     skill_match_pct FLOAT NOT NULL,`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L46 |     experience_match_pct FLOAT NOT NULL,`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L47 |     overall_score FLOAT NOT NULL,`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L48 |     explanation TEXT,`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L49 |     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L50 |     CONSTRAINT uq_candidate_job UNIQUE (candidate_id, job_id)`
  Why: Enforces uniqueness constraint to prevent duplicates.
- `L51 | );`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L52 | `
  Why: Blank line for readability and logical separation.
- `L53 | CREATE TABLE IF NOT EXISTS ai_data (`
  Why: Creates a database table required by application features.
- `L54 |     id SERIAL PRIMARY KEY,`
  Why: Marks a unique row identifier column for this table.
- `L55 |     entity_type VARCHAR(50) NOT NULL,`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L56 |     entity_id INT NOT NULL,`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L57 |     data_type VARCHAR(100) NOT NULL,`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L58 |     content TEXT NOT NULL,`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L59 |     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L60 | );`
  Why: SQL schema statement contributing to DB structure/constraints.
- `L61 | `
  Why: Blank line for readability and logical separation.

### File: `frontend/angular.json`

- `L1 | {`
  Why: JSON structural syntax for object/array declaration.
- `L2 |   "$schema": "./node_modules/@angular/cli/lib/config/schema.json",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L3 |   "version": 1,`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L4 |   "newProjectRoot": "projects",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L5 |   "projects": {`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L6 |     "frontend": {`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L7 |       "projectType": "application",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L8 |       "schematics": {},`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L9 |       "root": "",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L10 |       "sourceRoot": "src",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L11 |       "prefix": "app",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L12 |       "architect": {`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L13 |         "build": {`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L14 |           "builder": "@angular-devkit/build-angular:application",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L15 |           "options": {`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L16 |             "outputPath": "dist/frontend",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L17 |             "index": "src/index.html",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L18 |             "browser": "src/main.ts",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L19 |             "polyfills": [`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L20 |               "zone.js"`
  Why: JSON structural syntax for object/array declaration.
- `L21 |             ],`
  Why: JSON structural syntax for object/array declaration.
- `L22 |             "tsConfig": "tsconfig.app.json",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L23 |             "assets": [`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L24 |               {`
  Why: JSON structural syntax for object/array declaration.
- `L25 |                 "glob": "**/*",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L26 |                 "input": "public"`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L27 |               }`
  Why: JSON structural syntax for object/array declaration.
- `L28 |             ],`
  Why: JSON structural syntax for object/array declaration.
- `L29 |             "styles": [`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L30 |               "src/styles.css"`
  Why: JSON structural syntax for object/array declaration.
- `L31 |             ],`
  Why: JSON structural syntax for object/array declaration.
- `L32 |             "scripts": []`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L33 |           },`
  Why: JSON structural syntax for object/array declaration.
- `L34 |           "configurations": {`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L35 |             "production": {`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L36 |               "budgets": [`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L37 |                 {`
  Why: JSON structural syntax for object/array declaration.
- `L38 |                   "type": "initial",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L39 |                   "maximumWarning": "500kB",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L40 |                   "maximumError": "1MB"`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L41 |                 },`
  Why: JSON structural syntax for object/array declaration.
- `L42 |                 {`
  Why: JSON structural syntax for object/array declaration.
- `L43 |                   "type": "anyComponentStyle",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L44 |                   "maximumWarning": "2kB",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L45 |                   "maximumError": "4kB"`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L46 |                 }`
  Why: JSON structural syntax for object/array declaration.
- `L47 |               ],`
  Why: JSON structural syntax for object/array declaration.
- `L48 |               "outputHashing": "all"`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L49 |             },`
  Why: JSON structural syntax for object/array declaration.
- `L50 |             "development": {`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L51 |               "optimization": false,`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L52 |               "extractLicenses": false,`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L53 |               "sourceMap": true`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L54 |             }`
  Why: JSON structural syntax for object/array declaration.
- `L55 |           },`
  Why: JSON structural syntax for object/array declaration.
- `L56 |           "defaultConfiguration": "production"`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L57 |         },`
  Why: JSON structural syntax for object/array declaration.
- `L58 |         "serve": {`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L59 |           "builder": "@angular-devkit/build-angular:dev-server",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L60 |           "configurations": {`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L61 |             "production": {`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L62 |               "buildTarget": "frontend:build:production"`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L63 |             },`
  Why: JSON structural syntax for object/array declaration.
- `L64 |             "development": {`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L65 |               "buildTarget": "frontend:build:development"`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L66 |             }`
  Why: JSON structural syntax for object/array declaration.
- `L67 |           },`
  Why: JSON structural syntax for object/array declaration.
- `L68 |           "defaultConfiguration": "development"`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L69 |         },`
  Why: JSON structural syntax for object/array declaration.
- `L70 |         "extract-i18n": {`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L71 |           "builder": "@angular-devkit/build-angular:extract-i18n"`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L72 |         },`
  Why: JSON structural syntax for object/array declaration.
- `L73 |         "test": {`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L74 |           "builder": "@angular-devkit/build-angular:karma",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L75 |           "options": {`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L76 |             "polyfills": [`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L77 |               "zone.js",`
  Why: JSON structural syntax for object/array declaration.
- `L78 |               "zone.js/testing"`
  Why: JSON structural syntax for object/array declaration.
- `L79 |             ],`
  Why: JSON structural syntax for object/array declaration.
- `L80 |             "tsConfig": "tsconfig.spec.json",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L81 |             "assets": [`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L82 |               {`
  Why: JSON structural syntax for object/array declaration.
- `L83 |                 "glob": "**/*",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L84 |                 "input": "public"`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L85 |               }`
  Why: JSON structural syntax for object/array declaration.
- `L86 |             ],`
  Why: JSON structural syntax for object/array declaration.
- `L87 |             "styles": [`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L88 |               "src/styles.css"`
  Why: JSON structural syntax for object/array declaration.
- `L89 |             ],`
  Why: JSON structural syntax for object/array declaration.
- `L90 |             "scripts": []`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L91 |           }`
  Why: JSON structural syntax for object/array declaration.
- `L92 |         }`
  Why: JSON structural syntax for object/array declaration.
- `L93 |       }`
  Why: JSON structural syntax for object/array declaration.
- `L94 |     }`
  Why: JSON structural syntax for object/array declaration.
- `L95 |   }`
  Why: JSON structural syntax for object/array declaration.
- `L96 | }`
  Why: JSON structural syntax for object/array declaration.

### File: `frontend/package.json`

- `L1 | {`
  Why: JSON structural syntax for object/array declaration.
- `L2 |   "name": "frontend",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L3 |   "version": "0.0.0",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L4 |   "scripts": {`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L5 |     "ng": "ng",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L6 |     "start": "ng serve",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L7 |     "build": "ng build",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L8 |     "watch": "ng build --watch --configuration development",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L9 |     "test": "ng test"`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L10 |   },`
  Why: JSON structural syntax for object/array declaration.
- `L11 |   "private": true,`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L12 |   "dependencies": {`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L13 |     "@angular/animations": "^18.2.0",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L14 |     "@angular/common": "^18.2.0",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L15 |     "@angular/compiler": "^18.2.0",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L16 |     "@angular/core": "^18.2.0",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L17 |     "@angular/forms": "^18.2.0",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L18 |     "@angular/platform-browser": "^18.2.0",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L19 |     "@angular/platform-browser-dynamic": "^18.2.0",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L20 |     "@angular/router": "^18.2.0",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L21 |     "rxjs": "~7.8.0",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L22 |     "tslib": "^2.3.0",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L23 |     "zone.js": "~0.14.10"`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L24 |   },`
  Why: JSON structural syntax for object/array declaration.
- `L25 |   "devDependencies": {`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L26 |     "@angular-devkit/build-angular": "^18.2.21",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L27 |     "@angular/cli": "^18.2.21",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L28 |     "@angular/compiler-cli": "^18.2.0",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L29 |     "@types/jasmine": "~5.1.0",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L30 |     "jasmine-core": "~5.2.0",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L31 |     "karma": "~6.4.0",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L32 |     "karma-chrome-launcher": "~3.2.0",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L33 |     "karma-coverage": "~2.2.0",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L34 |     "karma-jasmine": "~5.1.0",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L35 |     "karma-jasmine-html-reporter": "~2.1.0",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L36 |     "typescript": "~5.5.2"`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L37 |   }`
  Why: JSON structural syntax for object/array declaration.
- `L38 | }`
  Why: JSON structural syntax for object/array declaration.

### File: `frontend/src/app/app.component.css`

This file is empty. It exists to mark package/module boundaries or reserve structure.

### File: `frontend/src/app/app.component.spec.ts`

- `L1 | import { TestBed } from '@angular/core/testing';`
  Why: Imports a module dependency used later in this file.
- `L2 | import { AppComponent } from './app.component';`
  Why: Imports a module dependency used later in this file.
- `L3 | `
  Why: Blank line for readability and logical separation.
- `L4 | describe('AppComponent', () => {`
  Why: Implementation line supporting this file's behavior or structure.
- `L5 |   beforeEach(async () => {`
  Why: Implementation line supporting this file's behavior or structure.
- `L6 |     await TestBed.configureTestingModule({`
  Why: Implementation line supporting this file's behavior or structure.
- `L7 |       imports: [AppComponent],`
  Why: Implementation line supporting this file's behavior or structure.
- `L8 |     }).compileComponents();`
  Why: Implementation line supporting this file's behavior or structure.
- `L9 |   });`
  Why: Closes a previously opened block/object/array/function scope.
- `L10 | `
  Why: Blank line for readability and logical separation.
- `L11 |   it('should create the app', () => {`
  Why: Implementation line supporting this file's behavior or structure.
- `L12 |     const fixture = TestBed.createComponent(AppComponent);`
  Why: Implementation line supporting this file's behavior or structure.
- `L13 |     const app = fixture.componentInstance;`
  Why: Implementation line supporting this file's behavior or structure.
- `L14 |     expect(app).toBeTruthy();`
  Why: Implementation line supporting this file's behavior or structure.
- `L15 |   });`
  Why: Closes a previously opened block/object/array/function scope.
- `L16 | `
  Why: Blank line for readability and logical separation.
- `L17 |   it(\`should have the 'frontend' title\`, () => {`
  Why: Implementation line supporting this file's behavior or structure.
- `L18 |     const fixture = TestBed.createComponent(AppComponent);`
  Why: Implementation line supporting this file's behavior or structure.
- `L19 |     const app = fixture.componentInstance;`
  Why: Implementation line supporting this file's behavior or structure.
- `L20 |     expect(app.title).toEqual('frontend');`
  Why: Implementation line supporting this file's behavior or structure.
- `L21 |   });`
  Why: Closes a previously opened block/object/array/function scope.
- `L22 | `
  Why: Blank line for readability and logical separation.
- `L23 |   it('should render title', () => {`
  Why: Implementation line supporting this file's behavior or structure.
- `L24 |     const fixture = TestBed.createComponent(AppComponent);`
  Why: Implementation line supporting this file's behavior or structure.
- `L25 |     fixture.detectChanges();`
  Why: Implementation line supporting this file's behavior or structure.
- `L26 |     const compiled = fixture.nativeElement as HTMLElement;`
  Why: Implementation line supporting this file's behavior or structure.
- `L27 |     expect(compiled.querySelector('h1')?.textContent).toContain('Hello, frontend');`
  Why: Implementation line supporting this file's behavior or structure.
- `L28 |   });`
  Why: Closes a previously opened block/object/array/function scope.
- `L29 | });`
  Why: Closes a previously opened block/object/array/function scope.

### File: `frontend/src/app/app.component.ts`

- `L1 | import { Component } from '@angular/core';`
  Why: Imports a module dependency used later in this file.
- `L2 | import { RouterOutlet } from '@angular/router';`
  Why: Imports a module dependency used later in this file.
- `L3 | `
  Why: Blank line for readability and logical separation.
- `L4 | @Component({`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L5 |   selector: 'app-root',`
  Why: Implementation line supporting this file's behavior or structure.
- `L6 |   standalone: true,`
  Why: Implementation line supporting this file's behavior or structure.
- `L7 |   imports: [RouterOutlet],`
  Why: Uses Angular router for navigation or route configuration.
- `L8 |   template: \`<router-outlet></router-outlet>\`,`
  Why: Inline HTML template for rendering component UI.
- `L9 |   styleUrl: './app.component.css',`
  Why: Implementation line supporting this file's behavior or structure.
- `L10 | })`
  Why: Closes a previously opened block/object/array/function scope.
- `L11 | export class AppComponent {`
  Why: Exports a class so Angular/TypeScript modules can consume it.
- `L12 |   title = 'AI Resume Tool';`
  Why: Implementation line supporting this file's behavior or structure.
- `L13 | }`
  Why: Closes a previously opened block/object/array/function scope.

### File: `frontend/src/app/app.config.ts`

- `L1 | import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';`
  Why: Imports a module dependency used later in this file.
- `L2 | import { provideHttpClient, withInterceptors } from '@angular/common/http';`
  Why: Imports a module dependency used later in this file.
- `L3 | import { provideRouter } from '@angular/router';`
  Why: Imports a module dependency used later in this file.
- `L4 | `
  Why: Blank line for readability and logical separation.
- `L5 | import { authInterceptor } from './core/auth.interceptor';`
  Why: Imports a module dependency used later in this file.
- `L6 | import { routes } from './app.routes';`
  Why: Imports a module dependency used later in this file.
- `L7 | `
  Why: Blank line for readability and logical separation.
- `L8 | export const appConfig: ApplicationConfig = {`
  Why: Implementation line supporting this file's behavior or structure.
- `L9 |   providers: [`
  Why: Implementation line supporting this file's behavior or structure.
- `L10 |     provideZoneChangeDetection({ eventCoalescing: true }),`
  Why: Implementation line supporting this file's behavior or structure.
- `L11 |     provideRouter(routes),`
  Why: Uses Angular router for navigation or route configuration.
- `L12 |     provideHttpClient(withInterceptors([authInterceptor])),`
  Why: Implementation line supporting this file's behavior or structure.
- `L13 |   ],`
  Why: Closes a previously opened block/object/array/function scope.
- `L14 | };`
  Why: Closes a previously opened block/object/array/function scope.

### File: `frontend/src/app/app.routes.ts`

- `L1 | import { Routes } from '@angular/router';`
  Why: Imports a module dependency used later in this file.
- `L2 | `
  Why: Blank line for readability and logical separation.
- `L3 | import { authGuard } from './core/auth.guard';`
  Why: Imports a module dependency used later in this file.
- `L4 | import { roleGuard } from './core/role.guard';`
  Why: Imports a module dependency used later in this file.
- `L5 | import { CandidatesComponent } from './pages/candidates/candidates.component';`
  Why: Imports a module dependency used later in this file.
- `L6 | import { DashboardComponent } from './pages/dashboard/dashboard.component';`
  Why: Imports a module dependency used later in this file.
- `L7 | import { JobsComponent } from './pages/jobs/jobs.component';`
  Why: Imports a module dependency used later in this file.
- `L8 | import { LayoutComponent } from './pages/layout/layout.component';`
  Why: Imports a module dependency used later in this file.
- `L9 | import { LoginComponent } from './pages/login/login.component';`
  Why: Imports a module dependency used later in this file.
- `L10 | import { MatchesComponent } from './pages/matches/matches.component';`
  Why: Imports a module dependency used later in this file.
- `L11 | `
  Why: Blank line for readability and logical separation.
- `L12 | export const routes: Routes = [`
  Why: Implementation line supporting this file's behavior or structure.
- `L13 |   { path: 'login', component: LoginComponent },`
  Why: Implementation line supporting this file's behavior or structure.
- `L14 |   {`
  Why: Implementation line supporting this file's behavior or structure.
- `L15 |     path: '',`
  Why: Implementation line supporting this file's behavior or structure.
- `L16 |     component: LayoutComponent,`
  Why: Implementation line supporting this file's behavior or structure.
- `L17 |     canActivate: [authGuard],`
  Why: Implementation line supporting this file's behavior or structure.
- `L18 |     children: [`
  Why: Implementation line supporting this file's behavior or structure.
- `L19 |       { path: 'dashboard', component: DashboardComponent, canActivate: [roleGuard], data: { roles: ['Admin', 'HR'] } },`
  Why: Implementation line supporting this file's behavior or structure.
- `L20 |       { path: 'candidates', component: CandidatesComponent, canActivate: [roleGuard], data: { roles: ['Admin', 'HR'] } },`
  Why: Implementation line supporting this file's behavior or structure.
- `L21 |       { path: 'jobs', component: JobsComponent, canActivate: [roleGuard], data: { roles: ['Admin', 'HR'] } },`
  Why: Implementation line supporting this file's behavior or structure.
- `L22 |       { path: 'matches', component: MatchesComponent, canActivate: [roleGuard], data: { roles: ['Admin', 'HR'] } },`
  Why: Implementation line supporting this file's behavior or structure.
- `L23 |       { path: '', pathMatch: 'full', redirectTo: 'dashboard' },`
  Why: Implementation line supporting this file's behavior or structure.
- `L24 |     ],`
  Why: Closes a previously opened block/object/array/function scope.
- `L25 |   },`
  Why: Closes a previously opened block/object/array/function scope.
- `L26 |   { path: '**', redirectTo: '/dashboard' },`
  Why: Implementation line supporting this file's behavior or structure.
- `L27 | ];`
  Why: Closes a previously opened block/object/array/function scope.

### File: `frontend/src/app/core/api.config.ts`

- `L1 | export const API_BASE_URL = 'http://127.0.0.1:8001/api';`
  Why: Implementation line supporting this file's behavior or structure.
- `L2 | `
  Why: Blank line for readability and logical separation.

### File: `frontend/src/app/core/auth.guard.ts`

- `L1 | import { inject } from '@angular/core';`
  Why: Imports a module dependency used later in this file.
- `L2 | import { CanActivateFn, Router } from '@angular/router';`
  Why: Imports a module dependency used later in this file.
- `L3 | `
  Why: Blank line for readability and logical separation.
- `L4 | import { AuthService } from './auth.service';`
  Why: Imports a module dependency used later in this file.
- `L5 | `
  Why: Blank line for readability and logical separation.
- `L6 | export const authGuard: CanActivateFn = () => {`
  Why: Implementation line supporting this file's behavior or structure.
- `L7 |   const auth = inject(AuthService);`
  Why: Implementation line supporting this file's behavior or structure.
- `L8 |   const router = inject(Router);`
  Why: Uses Angular router for navigation or route configuration.
- `L9 |   if (auth.isLoggedIn()) {`
  Why: Conditional branch; runs only when the condition is true.
- `L10 |     return true;`
  Why: Returns a value/result from this function.
- `L11 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L12 |   return router.createUrlTree(['/login']);`
  Why: Returns a value/result from this function.
- `L13 | };`
  Why: Closes a previously opened block/object/array/function scope.
- `L14 | `
  Why: Blank line for readability and logical separation.

### File: `frontend/src/app/core/auth.interceptor.ts`

- `L1 | import { HttpInterceptorFn } from '@angular/common/http';`
  Why: Imports a module dependency used later in this file.
- `L2 | import { inject } from '@angular/core';`
  Why: Imports a module dependency used later in this file.
- `L3 | `
  Why: Blank line for readability and logical separation.
- `L4 | import { AuthService } from './auth.service';`
  Why: Imports a module dependency used later in this file.
- `L5 | `
  Why: Blank line for readability and logical separation.
- `L6 | export const authInterceptor: HttpInterceptorFn = (req, next) => {`
  Why: Implementation line supporting this file's behavior or structure.
- `L7 |   const authService = inject(AuthService);`
  Why: Implementation line supporting this file's behavior or structure.
- `L8 |   const token = authService.getToken();`
  Why: Implementation line supporting this file's behavior or structure.
- `L9 |   if (!token) {`
  Why: Conditional branch; runs only when the condition is true.
- `L10 |     return next(req);`
  Why: Returns a value/result from this function.
- `L11 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L12 |   return next(`
  Why: Returns a value/result from this function.
- `L13 |     req.clone({`
  Why: Implementation line supporting this file's behavior or structure.
- `L14 |       setHeaders: {`
  Why: Implementation line supporting this file's behavior or structure.
- `L15 |         Authorization: \`Bearer ${token}\`,`
  Why: Implementation line supporting this file's behavior or structure.
- `L16 |       },`
  Why: Closes a previously opened block/object/array/function scope.
- `L17 |     }),`
  Why: Closes a previously opened block/object/array/function scope.
- `L18 |   );`
  Why: Closes a previously opened block/object/array/function scope.
- `L19 | };`
  Why: Closes a previously opened block/object/array/function scope.
- `L20 | `
  Why: Blank line for readability and logical separation.

### File: `frontend/src/app/core/auth.service.ts`

- `L1 | import { Injectable, computed, signal } from '@angular/core';`
  Why: Imports a module dependency used later in this file.
- `L2 | import { HttpClient } from '@angular/common/http';`
  Why: Imports a module dependency used later in this file.
- `L3 | import { Router } from '@angular/router';`
  Why: Imports a module dependency used later in this file.
- `L4 | import { Observable, tap } from 'rxjs';`
  Why: Imports a module dependency used later in this file.
- `L5 | `
  Why: Blank line for readability and logical separation.
- `L6 | import { API_BASE_URL } from './api.config';`
  Why: Imports a module dependency used later in this file.
- `L7 | `
  Why: Blank line for readability and logical separation.
- `L8 | interface LoginRequest {`
  Why: Implementation line supporting this file's behavior or structure.
- `L9 |   username: string;`
  Why: Implementation line supporting this file's behavior or structure.
- `L10 |   password: string;`
  Why: Implementation line supporting this file's behavior or structure.
- `L11 | }`
  Why: Closes a previously opened block/object/array/function scope.
- `L12 | `
  Why: Blank line for readability and logical separation.
- `L13 | interface LoginResponse {`
  Why: Implementation line supporting this file's behavior or structure.
- `L14 |   access_token: string;`
  Why: Implementation line supporting this file's behavior or structure.
- `L15 |   token_type: string;`
  Why: Implementation line supporting this file's behavior or structure.
- `L16 |   role: 'Admin' | 'HR';`
  Why: Implementation line supporting this file's behavior or structure.
- `L17 |   username: string;`
  Why: Implementation line supporting this file's behavior or structure.
- `L18 | }`
  Why: Closes a previously opened block/object/array/function scope.
- `L19 | `
  Why: Blank line for readability and logical separation.
- `L20 | @Injectable({ providedIn: 'root' })`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L21 | export class AuthService {`
  Why: Exports a class so Angular/TypeScript modules can consume it.
- `L22 |   private readonly apiBase = API_BASE_URL;`
  Why: Implementation line supporting this file's behavior or structure.
- `L23 |   private readonly tokenKey = 'ai_resume_token';`
  Why: Implementation line supporting this file's behavior or structure.
- `L24 |   private readonly roleKey = 'ai_resume_role';`
  Why: Implementation line supporting this file's behavior or structure.
- `L25 |   private readonly userKey = 'ai_resume_user';`
  Why: Implementation line supporting this file's behavior or structure.
- `L26 | `
  Why: Blank line for readability and logical separation.
- `L27 |   private tokenSignal = signal<string | null>(localStorage.getItem(this.tokenKey));`
  Why: Implementation line supporting this file's behavior or structure.
- `L28 |   private roleSignal = signal<string | null>(localStorage.getItem(this.roleKey));`
  Why: Implementation line supporting this file's behavior or structure.
- `L29 |   private userSignal = signal<string | null>(localStorage.getItem(this.userKey));`
  Why: Implementation line supporting this file's behavior or structure.
- `L30 | `
  Why: Blank line for readability and logical separation.
- `L31 |   readonly isLoggedIn = computed(() => !!this.tokenSignal());`
  Why: Implementation line supporting this file's behavior or structure.
- `L32 |   readonly role = computed(() => this.roleSignal());`
  Why: Implementation line supporting this file's behavior or structure.
- `L33 |   readonly username = computed(() => this.userSignal());`
  Why: Implementation line supporting this file's behavior or structure.
- `L34 | `
  Why: Blank line for readability and logical separation.
- `L35 |   constructor(private http: HttpClient, private router: Router) {}`
  Why: Class constructor; dependencies are injected here.
- `L36 | `
  Why: Blank line for readability and logical separation.
- `L37 |   login(payload: LoginRequest): Observable<LoginResponse> {`
  Why: Implementation line supporting this file's behavior or structure.
- `L38 |     return this.http.post<LoginResponse>(\`${this.apiBase}/auth/login\`, payload).pipe(`
  Why: Returns a value/result from this function.
- `L39 |       tap((res) => {`
  Why: Implementation line supporting this file's behavior or structure.
- `L40 |         localStorage.setItem(this.tokenKey, res.access_token);`
  Why: Implementation line supporting this file's behavior or structure.
- `L41 |         localStorage.setItem(this.roleKey, res.role);`
  Why: Implementation line supporting this file's behavior or structure.
- `L42 |         localStorage.setItem(this.userKey, res.username);`
  Why: Implementation line supporting this file's behavior or structure.
- `L43 |         this.tokenSignal.set(res.access_token);`
  Why: Implementation line supporting this file's behavior or structure.
- `L44 |         this.roleSignal.set(res.role);`
  Why: Implementation line supporting this file's behavior or structure.
- `L45 |         this.userSignal.set(res.username);`
  Why: Implementation line supporting this file's behavior or structure.
- `L46 |       }),`
  Why: Closes a previously opened block/object/array/function scope.
- `L47 |     );`
  Why: Closes a previously opened block/object/array/function scope.
- `L48 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L49 | `
  Why: Blank line for readability and logical separation.
- `L50 |   logout(): void {`
  Why: Implementation line supporting this file's behavior or structure.
- `L51 |     localStorage.removeItem(this.tokenKey);`
  Why: Implementation line supporting this file's behavior or structure.
- `L52 |     localStorage.removeItem(this.roleKey);`
  Why: Implementation line supporting this file's behavior or structure.
- `L53 |     localStorage.removeItem(this.userKey);`
  Why: Implementation line supporting this file's behavior or structure.
- `L54 |     this.tokenSignal.set(null);`
  Why: Implementation line supporting this file's behavior or structure.
- `L55 |     this.roleSignal.set(null);`
  Why: Implementation line supporting this file's behavior or structure.
- `L56 |     this.userSignal.set(null);`
  Why: Implementation line supporting this file's behavior or structure.
- `L57 |     this.router.navigate(['/login']);`
  Why: Implementation line supporting this file's behavior or structure.
- `L58 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L59 | `
  Why: Blank line for readability and logical separation.
- `L60 |   getToken(): string | null {`
  Why: Implementation line supporting this file's behavior or structure.
- `L61 |     return this.tokenSignal();`
  Why: Returns a value/result from this function.
- `L62 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L63 | }`
  Why: Closes a previously opened block/object/array/function scope.

### File: `frontend/src/app/core/candidate.service.ts`

- `L1 | import { Injectable } from '@angular/core';`
  Why: Imports a module dependency used later in this file.
- `L2 | import { HttpClient, HttpParams } from '@angular/common/http';`
  Why: Imports a module dependency used later in this file.
- `L3 | import { Observable } from 'rxjs';`
  Why: Imports a module dependency used later in this file.
- `L4 | `
  Why: Blank line for readability and logical separation.
- `L5 | import { API_BASE_URL } from './api.config';`
  Why: Imports a module dependency used later in this file.
- `L6 | import { Candidate, CandidateDetail } from './models';`
  Why: Imports a module dependency used later in this file.
- `L7 | `
  Why: Blank line for readability and logical separation.
- `L8 | @Injectable({ providedIn: 'root' })`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L9 | export class CandidateService {`
  Why: Exports a class so Angular/TypeScript modules can consume it.
- `L10 |   private readonly apiBase = \`${API_BASE_URL}/candidates\`;`
  Why: Implementation line supporting this file's behavior or structure.
- `L11 | `
  Why: Blank line for readability and logical separation.
- `L12 |   constructor(private http: HttpClient) {}`
  Why: Class constructor; dependencies are injected here.
- `L13 | `
  Why: Blank line for readability and logical separation.
- `L14 |   create(payload: { name: string; email: string; phone?: string | null }): Observable<Candidate> {`
  Why: Implementation line supporting this file's behavior or structure.
- `L15 |     return this.http.post<Candidate>(this.apiBase, payload);`
  Why: Returns a value/result from this function.
- `L16 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L17 | `
  Why: Blank line for readability and logical separation.
- `L18 |   list(filters: { skills?: string; min_experience?: number | null }): Observable<Candidate[]> {`
  Why: Implementation line supporting this file's behavior or structure.
- `L19 |     let params = new HttpParams();`
  Why: Implementation line supporting this file's behavior or structure.
- `L20 |     if (filters.skills) {`
  Why: Conditional branch; runs only when the condition is true.
- `L21 |       params = params.set('skills', filters.skills);`
  Why: Implementation line supporting this file's behavior or structure.
- `L22 |     }`
  Why: Closes a previously opened block/object/array/function scope.
- `L23 |     if (filters.min_experience !== null && filters.min_experience !== undefined) {`
  Why: Conditional branch; runs only when the condition is true.
- `L24 |       params = params.set('min_experience', String(filters.min_experience));`
  Why: Implementation line supporting this file's behavior or structure.
- `L25 |     }`
  Why: Closes a previously opened block/object/array/function scope.
- `L26 |     return this.http.get<Candidate[]>(this.apiBase, { params });`
  Why: Returns a value/result from this function.
- `L27 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L28 | `
  Why: Blank line for readability and logical separation.
- `L29 |   detail(id: number): Observable<CandidateDetail> {`
  Why: Implementation line supporting this file's behavior or structure.
- `L30 |     return this.http.get<CandidateDetail>(\`${this.apiBase}/${id}\`);`
  Why: Returns a value/result from this function.
- `L31 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L32 | `
  Why: Blank line for readability and logical separation.
- `L33 |   uploadResume(candidateId: number, file: File): Observable<{ message: string }> {`
  Why: Implementation line supporting this file's behavior or structure.
- `L34 |     const formData = new FormData();`
  Why: Implementation line supporting this file's behavior or structure.
- `L35 |     formData.append('resume_file', file);`
  Why: Implementation line supporting this file's behavior or structure.
- `L36 |     return this.http.post<{ message: string }>(\`${this.apiBase}/${candidateId}/resume\`, formData);`
  Why: Returns a value/result from this function.
- `L37 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L38 | }`
  Why: Closes a previously opened block/object/array/function scope.

### File: `frontend/src/app/core/dashboard.service.ts`

- `L1 | import { Injectable } from '@angular/core';`
  Why: Imports a module dependency used later in this file.
- `L2 | import { HttpClient } from '@angular/common/http';`
  Why: Imports a module dependency used later in this file.
- `L3 | import { Observable } from 'rxjs';`
  Why: Imports a module dependency used later in this file.
- `L4 | `
  Why: Blank line for readability and logical separation.
- `L5 | import { API_BASE_URL } from './api.config';`
  Why: Imports a module dependency used later in this file.
- `L6 | import { DashboardData } from './models';`
  Why: Imports a module dependency used later in this file.
- `L7 | `
  Why: Blank line for readability and logical separation.
- `L8 | @Injectable({ providedIn: 'root' })`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L9 | export class DashboardService {`
  Why: Exports a class so Angular/TypeScript modules can consume it.
- `L10 |   private readonly apiBase = \`${API_BASE_URL}/dashboard\`;`
  Why: Implementation line supporting this file's behavior or structure.
- `L11 | `
  Why: Blank line for readability and logical separation.
- `L12 |   constructor(private http: HttpClient) {}`
  Why: Class constructor; dependencies are injected here.
- `L13 | `
  Why: Blank line for readability and logical separation.
- `L14 |   getData(): Observable<DashboardData> {`
  Why: Implementation line supporting this file's behavior or structure.
- `L15 |     return this.http.get<DashboardData>(this.apiBase);`
  Why: Returns a value/result from this function.
- `L16 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L17 | }`
  Why: Closes a previously opened block/object/array/function scope.

### File: `frontend/src/app/core/job.service.ts`

- `L1 | import { Injectable } from '@angular/core';`
  Why: Imports a module dependency used later in this file.
- `L2 | import { HttpClient } from '@angular/common/http';`
  Why: Imports a module dependency used later in this file.
- `L3 | import { Observable } from 'rxjs';`
  Why: Imports a module dependency used later in this file.
- `L4 | `
  Why: Blank line for readability and logical separation.
- `L5 | import { API_BASE_URL } from './api.config';`
  Why: Imports a module dependency used later in this file.
- `L6 | import { Job } from './models';`
  Why: Imports a module dependency used later in this file.
- `L7 | `
  Why: Blank line for readability and logical separation.
- `L8 | @Injectable({ providedIn: 'root' })`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L9 | export class JobService {`
  Why: Exports a class so Angular/TypeScript modules can consume it.
- `L10 |   private readonly apiBase = \`${API_BASE_URL}/jobs\`;`
  Why: Implementation line supporting this file's behavior or structure.
- `L11 | `
  Why: Blank line for readability and logical separation.
- `L12 |   constructor(private http: HttpClient) {}`
  Why: Class constructor; dependencies are injected here.
- `L13 | `
  Why: Blank line for readability and logical separation.
- `L14 |   create(payload: Omit<Job, 'id' | 'created_at' | 'updated_at' | 'improved_description'>): Observable<Job> {`
  Why: Implementation line supporting this file's behavior or structure.
- `L15 |     return this.http.post<Job>(this.apiBase, payload);`
  Why: Returns a value/result from this function.
- `L16 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L17 | `
  Why: Blank line for readability and logical separation.
- `L18 |   list(): Observable<Job[]> {`
  Why: Implementation line supporting this file's behavior or structure.
- `L19 |     return this.http.get<Job[]>(this.apiBase);`
  Why: Returns a value/result from this function.
- `L20 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L21 | `
  Why: Blank line for readability and logical separation.
- `L22 |   update(id: number, payload: Omit<Job, 'id' | 'created_at' | 'updated_at' | 'improved_description'>): Observable<Job> {`
  Why: Implementation line supporting this file's behavior or structure.
- `L23 |     return this.http.put<Job>(\`${this.apiBase}/${id}\`, payload);`
  Why: Returns a value/result from this function.
- `L24 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L25 | `
  Why: Blank line for readability and logical separation.
- `L26 |   delete(id: number): Observable<{ message: string }> {`
  Why: Implementation line supporting this file's behavior or structure.
- `L27 |     return this.http.delete<{ message: string }>(\`${this.apiBase}/${id}\`);`
  Why: Returns a value/result from this function.
- `L28 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L29 | }`
  Why: Closes a previously opened block/object/array/function scope.

### File: `frontend/src/app/core/matching.service.ts`

- `L1 | import { Injectable } from '@angular/core';`
  Why: Imports a module dependency used later in this file.
- `L2 | import { HttpClient, HttpParams } from '@angular/common/http';`
  Why: Imports a module dependency used later in this file.
- `L3 | import { Observable } from 'rxjs';`
  Why: Imports a module dependency used later in this file.
- `L4 | `
  Why: Blank line for readability and logical separation.
- `L5 | import { API_BASE_URL } from './api.config';`
  Why: Imports a module dependency used later in this file.
- `L6 | import { CandidateMatchView, JobMatchView, MatchResult } from './models';`
  Why: Imports a module dependency used later in this file.
- `L7 | `
  Why: Blank line for readability and logical separation.
- `L8 | @Injectable({ providedIn: 'root' })`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L9 | export class MatchingService {`
  Why: Exports a class so Angular/TypeScript modules can consume it.
- `L10 |   private readonly apiBase = \`${API_BASE_URL}/matches\`;`
  Why: Implementation line supporting this file's behavior or structure.
- `L11 | `
  Why: Blank line for readability and logical separation.
- `L12 |   constructor(private http: HttpClient) {}`
  Why: Class constructor; dependencies are injected here.
- `L13 | `
  Why: Blank line for readability and logical separation.
- `L14 |   run(candidateId?: number | null, jobId?: number | null): Observable<MatchResult[]> {`
  Why: Implementation line supporting this file's behavior or structure.
- `L15 |     let params = new HttpParams();`
  Why: Implementation line supporting this file's behavior or structure.
- `L16 |     if (candidateId) {`
  Why: Conditional branch; runs only when the condition is true.
- `L17 |       params = params.set('candidate_id', candidateId);`
  Why: Implementation line supporting this file's behavior or structure.
- `L18 |     }`
  Why: Closes a previously opened block/object/array/function scope.
- `L19 |     if (jobId) {`
  Why: Conditional branch; runs only when the condition is true.
- `L20 |       params = params.set('job_id', jobId);`
  Why: Implementation line supporting this file's behavior or structure.
- `L21 |     }`
  Why: Closes a previously opened block/object/array/function scope.
- `L22 |     return this.http.post<MatchResult[]>(\`${this.apiBase}/run\`, {}, { params });`
  Why: Returns a value/result from this function.
- `L23 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L24 | `
  Why: Blank line for readability and logical separation.
- `L25 |   byCandidate(candidateId: number): Observable<CandidateMatchView[]> {`
  Why: Implementation line supporting this file's behavior or structure.
- `L26 |     return this.http.get<CandidateMatchView[]>(\`${this.apiBase}/candidate/${candidateId}\`);`
  Why: Returns a value/result from this function.
- `L27 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L28 | `
  Why: Blank line for readability and logical separation.
- `L29 |   byJob(jobId: number): Observable<JobMatchView[]> {`
  Why: Implementation line supporting this file's behavior or structure.
- `L30 |     return this.http.get<JobMatchView[]>(\`${this.apiBase}/job/${jobId}\`);`
  Why: Returns a value/result from this function.
- `L31 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L32 | }`
  Why: Closes a previously opened block/object/array/function scope.

### File: `frontend/src/app/core/models.ts`

- `L1 | export interface Candidate {`
  Why: Defines a TypeScript data contract/interface for strong typing.
- `L2 |   id: number;`
  Why: Implementation line supporting this file's behavior or structure.
- `L3 |   name: string;`
  Why: Implementation line supporting this file's behavior or structure.
- `L4 |   email: string;`
  Why: Implementation line supporting this file's behavior or structure.
- `L5 |   phone?: string | null;`
  Why: Implementation line supporting this file's behavior or structure.
- `L6 |   skills: string[];`
  Why: Implementation line supporting this file's behavior or structure.
- `L7 |   experience_years: number;`
  Why: Implementation line supporting this file's behavior or structure.
- `L8 |   education?: string | null;`
  Why: Implementation line supporting this file's behavior or structure.
- `L9 |   summary?: string | null;`
  Why: Implementation line supporting this file's behavior or structure.
- `L10 |   created_at: string;`
  Why: Implementation line supporting this file's behavior or structure.
- `L11 | }`
  Why: Closes a previously opened block/object/array/function scope.
- `L12 | `
  Why: Blank line for readability and logical separation.
- `L13 | export interface CandidateDetail extends Candidate {`
  Why: Defines a TypeScript data contract/interface for strong typing.
- `L14 |   resumes: { id: number; file_path: string; uploaded_at: string }[];`
  Why: Implementation line supporting this file's behavior or structure.
- `L15 | }`
  Why: Closes a previously opened block/object/array/function scope.
- `L16 | `
  Why: Blank line for readability and logical separation.
- `L17 | export interface Job {`
  Why: Defines a TypeScript data contract/interface for strong typing.
- `L18 |   id: number;`
  Why: Implementation line supporting this file's behavior or structure.
- `L19 |   title: string;`
  Why: Implementation line supporting this file's behavior or structure.
- `L20 |   department: string;`
  Why: Implementation line supporting this file's behavior or structure.
- `L21 |   skills: string[];`
  Why: Implementation line supporting this file's behavior or structure.
- `L22 |   experience_required: number;`
  Why: Implementation line supporting this file's behavior or structure.
- `L23 |   description: string;`
  Why: Implementation line supporting this file's behavior or structure.
- `L24 |   improved_description?: string | null;`
  Why: Implementation line supporting this file's behavior or structure.
- `L25 |   created_at: string;`
  Why: Implementation line supporting this file's behavior or structure.
- `L26 |   updated_at: string;`
  Why: Implementation line supporting this file's behavior or structure.
- `L27 | }`
  Why: Closes a previously opened block/object/array/function scope.
- `L28 | `
  Why: Blank line for readability and logical separation.
- `L29 | export interface MatchResult {`
  Why: Defines a TypeScript data contract/interface for strong typing.
- `L30 |   id: number;`
  Why: Implementation line supporting this file's behavior or structure.
- `L31 |   candidate_id: number;`
  Why: Implementation line supporting this file's behavior or structure.
- `L32 |   job_id: number;`
  Why: Implementation line supporting this file's behavior or structure.
- `L33 |   skill_match_pct: number;`
  Why: Implementation line supporting this file's behavior or structure.
- `L34 |   experience_match_pct: number;`
  Why: Implementation line supporting this file's behavior or structure.
- `L35 |   overall_score: number;`
  Why: Implementation line supporting this file's behavior or structure.
- `L36 |   explanation?: string | null;`
  Why: Implementation line supporting this file's behavior or structure.
- `L37 |   created_at: string;`
  Why: Implementation line supporting this file's behavior or structure.
- `L38 | }`
  Why: Closes a previously opened block/object/array/function scope.
- `L39 | `
  Why: Blank line for readability and logical separation.
- `L40 | export interface CandidateMatchView {`
  Why: Defines a TypeScript data contract/interface for strong typing.
- `L41 |   candidate_id: number;`
  Why: Implementation line supporting this file's behavior or structure.
- `L42 |   candidate_name: string;`
  Why: Implementation line supporting this file's behavior or structure.
- `L43 |   job_id: number;`
  Why: Implementation line supporting this file's behavior or structure.
- `L44 |   job_title: string;`
  Why: Implementation line supporting this file's behavior or structure.
- `L45 |   skill_match_pct: number;`
  Why: Implementation line supporting this file's behavior or structure.
- `L46 |   experience_match_pct: number;`
  Why: Implementation line supporting this file's behavior or structure.
- `L47 |   overall_score: number;`
  Why: Implementation line supporting this file's behavior or structure.
- `L48 |   explanation?: string | null;`
  Why: Implementation line supporting this file's behavior or structure.
- `L49 | }`
  Why: Closes a previously opened block/object/array/function scope.
- `L50 | `
  Why: Blank line for readability and logical separation.
- `L51 | export interface JobMatchView {`
  Why: Defines a TypeScript data contract/interface for strong typing.
- `L52 |   job_id: number;`
  Why: Implementation line supporting this file's behavior or structure.
- `L53 |   job_title: string;`
  Why: Implementation line supporting this file's behavior or structure.
- `L54 |   candidate_id: number;`
  Why: Implementation line supporting this file's behavior or structure.
- `L55 |   candidate_name: string;`
  Why: Implementation line supporting this file's behavior or structure.
- `L56 |   overall_score: number;`
  Why: Implementation line supporting this file's behavior or structure.
- `L57 |   skill_match_pct: number;`
  Why: Implementation line supporting this file's behavior or structure.
- `L58 |   experience_match_pct: number;`
  Why: Implementation line supporting this file's behavior or structure.
- `L59 |   explanation?: string | null;`
  Why: Implementation line supporting this file's behavior or structure.
- `L60 | }`
  Why: Closes a previously opened block/object/array/function scope.
- `L61 | `
  Why: Blank line for readability and logical separation.
- `L62 | export interface DashboardData {`
  Why: Defines a TypeScript data contract/interface for strong typing.
- `L63 |   total_candidates: number;`
  Why: Implementation line supporting this file's behavior or structure.
- `L64 |   total_jobs: number;`
  Why: Implementation line supporting this file's behavior or structure.
- `L65 |   recent_candidates: { id: number; name: string; created_at: string }[];`
  Why: Implementation line supporting this file's behavior or structure.
- `L66 |   recent_jobs: { id: number; title: string; created_at: string }[];`
  Why: Implementation line supporting this file's behavior or structure.
- `L67 | }`
  Why: Closes a previously opened block/object/array/function scope.
- `L68 | `
  Why: Blank line for readability and logical separation.

### File: `frontend/src/app/core/role.guard.ts`

- `L1 | import { inject } from '@angular/core';`
  Why: Imports a module dependency used later in this file.
- `L2 | import { CanActivateFn, Router } from '@angular/router';`
  Why: Imports a module dependency used later in this file.
- `L3 | `
  Why: Blank line for readability and logical separation.
- `L4 | import { AuthService } from './auth.service';`
  Why: Imports a module dependency used later in this file.
- `L5 | `
  Why: Blank line for readability and logical separation.
- `L6 | export const roleGuard: CanActivateFn = (route) => {`
  Why: Implementation line supporting this file's behavior or structure.
- `L7 |   const auth = inject(AuthService);`
  Why: Implementation line supporting this file's behavior or structure.
- `L8 |   const router = inject(Router);`
  Why: Uses Angular router for navigation or route configuration.
- `L9 |   const allowedRoles = route.data['roles'] as string[] | undefined;`
  Why: Implementation line supporting this file's behavior or structure.
- `L10 |   if (!allowedRoles || allowedRoles.length === 0) {`
  Why: Conditional branch; runs only when the condition is true.
- `L11 |     return true;`
  Why: Returns a value/result from this function.
- `L12 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L13 |   const role = auth.role();`
  Why: Implementation line supporting this file's behavior or structure.
- `L14 |   if (role && allowedRoles.includes(role)) {`
  Why: Conditional branch; runs only when the condition is true.
- `L15 |     return true;`
  Why: Returns a value/result from this function.
- `L16 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L17 |   return router.createUrlTree(['/dashboard']);`
  Why: Returns a value/result from this function.
- `L18 | };`
  Why: Closes a previously opened block/object/array/function scope.
- `L19 | `
  Why: Blank line for readability and logical separation.

### File: `frontend/src/app/pages/candidates/candidates.component.ts`

- `L1 | import { CommonModule } from '@angular/common';`
  Why: Imports a module dependency used later in this file.
- `L2 | import { Component, OnInit, inject } from '@angular/core';`
  Why: Imports a module dependency used later in this file.
- `L3 | import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';`
  Why: Imports a module dependency used later in this file.
- `L4 | `
  Why: Blank line for readability and logical separation.
- `L5 | import { CandidateService } from '../../core/candidate.service';`
  Why: Imports a module dependency used later in this file.
- `L6 | import { Candidate, CandidateDetail } from '../../core/models';`
  Why: Imports a module dependency used later in this file.
- `L7 | `
  Why: Blank line for readability and logical separation.
- `L8 | @Component({`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L9 |   selector: 'app-candidates',`
  Why: Implementation line supporting this file's behavior or structure.
- `L10 |   standalone: true,`
  Why: Implementation line supporting this file's behavior or structure.
- `L11 |   imports: [CommonModule, ReactiveFormsModule, FormsModule],`
  Why: Implementation line supporting this file's behavior or structure.
- `L12 |   template: \``
  Why: Inline HTML template for rendering component UI.
- `L13 |     <h2>Candidates</h2>`
  Why: Implementation line supporting this file's behavior or structure.
- `L14 | `
  Why: Blank line for readability and logical separation.
- `L15 |     <form [formGroup]="createForm" (ngSubmit)="createCandidate()" class="box">`
  Why: Implementation line supporting this file's behavior or structure.
- `L16 |       <h3>Create Candidate</h3>`
  Why: Implementation line supporting this file's behavior or structure.
- `L17 |       <div class="row">`
  Why: Implementation line supporting this file's behavior or structure.
- `L18 |         <input placeholder="Name" formControlName="name" />`
  Why: Binds input element to Angular reactive form control.
- `L19 |         <input placeholder="Email" formControlName="email" />`
  Why: Binds input element to Angular reactive form control.
- `L20 |         <input placeholder="Phone" formControlName="phone" />`
  Why: Binds input element to Angular reactive form control.
- `L21 |         <button type="submit" [disabled]="createForm.invalid">Create</button>`
  Why: Implementation line supporting this file's behavior or structure.
- `L22 |       </div>`
  Why: Implementation line supporting this file's behavior or structure.
- `L23 |     </form>`
  Why: Implementation line supporting this file's behavior or structure.
- `L24 | `
  Why: Blank line for readability and logical separation.
- `L25 |     <div class="box">`
  Why: Implementation line supporting this file's behavior or structure.
- `L26 |       <h3>Filters</h3>`
  Why: Implementation line supporting this file's behavior or structure.
- `L27 |       <div class="row">`
  Why: Implementation line supporting this file's behavior or structure.
- `L28 |         <input [(ngModel)]="skillsFilter" placeholder="Skills (comma separated)" />`
  Why: Implementation line supporting this file's behavior or structure.
- `L29 |         <input type="number" [(ngModel)]="minExperience" placeholder="Min experience" />`
  Why: Implementation line supporting this file's behavior or structure.
- `L30 |         <button (click)="loadCandidates()">Apply Filters</button>`
  Why: Implementation line supporting this file's behavior or structure.
- `L31 |       </div>`
  Why: Implementation line supporting this file's behavior or structure.
- `L32 |     </div>`
  Why: Implementation line supporting this file's behavior or structure.
- `L33 | `
  Why: Blank line for readability and logical separation.
- `L34 |     <table>`
  Why: Implementation line supporting this file's behavior or structure.
- `L35 |       <tr>`
  Why: Implementation line supporting this file's behavior or structure.
- `L36 |         <th>ID</th><th>Name</th><th>Email</th><th>Skills</th><th>Experience</th><th>Action</th>`
  Why: Implementation line supporting this file's behavior or structure.
- `L37 |       </tr>`
  Why: Implementation line supporting this file's behavior or structure.
- `L38 |       <tr *ngFor="let c of candidates">`
  Why: Angular structural directive to render list/table rows dynamically.
- `L39 |         <td>{{ c.id }}</td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L40 |         <td>{{ c.name }}</td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L41 |         <td>{{ c.email }}</td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L42 |         <td>{{ c.skills.join(', ') }}</td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L43 |         <td>{{ c.experience_years }}</td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L44 |         <td><button (click)="selectCandidate(c.id)">View</button></td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L45 |       </tr>`
  Why: Implementation line supporting this file's behavior or structure.
- `L46 |     </table>`
  Why: Implementation line supporting this file's behavior or structure.
- `L47 | `
  Why: Blank line for readability and logical separation.
- `L48 |     <div *ngIf="selected" class="box">`
  Why: Angular structural directive to conditionally show/hide UI blocks.
- `L49 |       <h3>Candidate Detail - {{ selected.name }}</h3>`
  Why: Implementation line supporting this file's behavior or structure.
- `L50 |       <p><b>Summary:</b> {{ selected.summary || '-' }}</p>`
  Why: Implementation line supporting this file's behavior or structure.
- `L51 |       <p><b>Education:</b> {{ selected.education || '-' }}</p>`
  Why: Implementation line supporting this file's behavior or structure.
- `L52 |       <p><b>Skills:</b> {{ selected.skills.join(', ') || '-' }}</p>`
  Why: Implementation line supporting this file's behavior or structure.
- `L53 |       <p><b>Experience:</b> {{ selected.experience_years }} years</p>`
  Why: Implementation line supporting this file's behavior or structure.
- `L54 | `
  Why: Blank line for readability and logical separation.
- `L55 |       <div class="row">`
  Why: Implementation line supporting this file's behavior or structure.
- `L56 |         <input type="file" (change)="onFileChange($event)" />`
  Why: Implementation line supporting this file's behavior or structure.
- `L57 |         <button (click)="uploadResume()" [disabled]="!selectedFile">Upload Resume</button>`
  Why: Implementation line supporting this file's behavior or structure.
- `L58 |       </div>`
  Why: Implementation line supporting this file's behavior or structure.
- `L59 |       <p>{{ message }}</p>`
  Why: Implementation line supporting this file's behavior or structure.
- `L60 |     </div>`
  Why: Implementation line supporting this file's behavior or structure.
- `L61 |   \`,`
  Why: Implementation line supporting this file's behavior or structure.
- `L62 |   styles: [`
  Why: Inline CSS styles scoped to this Angular component.
- `L63 |     \``
  Why: Implementation line supporting this file's behavior or structure.
- `L64 |       .box { border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L65 |       .row { display: flex; gap: 8px; flex-wrap: wrap; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L66 |       input, button { padding: 6px; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L67 |       table { width: 100%; border-collapse: collapse; margin-top: 8px; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L68 |       th, td { border: 1px solid #ddd; padding: 6px; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L69 |     \`,`
  Why: Implementation line supporting this file's behavior or structure.
- `L70 |   ],`
  Why: Closes a previously opened block/object/array/function scope.
- `L71 | })`
  Why: Closes a previously opened block/object/array/function scope.
- `L72 | export class CandidatesComponent implements OnInit {`
  Why: Exports a class so Angular/TypeScript modules can consume it.
- `L73 |   private fb = inject(FormBuilder);`
  Why: Implementation line supporting this file's behavior or structure.
- `L74 | `
  Why: Blank line for readability and logical separation.
- `L75 |   candidates: Candidate[] = [];`
  Why: Implementation line supporting this file's behavior or structure.
- `L76 |   selected: CandidateDetail | null = null;`
  Why: Implementation line supporting this file's behavior or structure.
- `L77 |   selectedFile: File | null = null;`
  Why: Implementation line supporting this file's behavior or structure.
- `L78 |   message = '';`
  Why: Implementation line supporting this file's behavior or structure.
- `L79 | `
  Why: Blank line for readability and logical separation.
- `L80 |   skillsFilter = '';`
  Why: Implementation line supporting this file's behavior or structure.
- `L81 |   minExperience: number | null = null;`
  Why: Implementation line supporting this file's behavior or structure.
- `L82 | `
  Why: Blank line for readability and logical separation.
- `L83 |   createForm = this.fb.group({`
  Why: Implementation line supporting this file's behavior or structure.
- `L84 |     name: ['', Validators.required],`
  Why: Implementation line supporting this file's behavior or structure.
- `L85 |     email: ['', [Validators.required, Validators.email]],`
  Why: Implementation line supporting this file's behavior or structure.
- `L86 |     phone: [''],`
  Why: Implementation line supporting this file's behavior or structure.
- `L87 |   });`
  Why: Closes a previously opened block/object/array/function scope.
- `L88 | `
  Why: Blank line for readability and logical separation.
- `L89 |   constructor(private candidateService: CandidateService) {}`
  Why: Class constructor; dependencies are injected here.
- `L90 | `
  Why: Blank line for readability and logical separation.
- `L91 |   ngOnInit(): void {`
  Why: Implementation line supporting this file's behavior or structure.
- `L92 |     this.loadCandidates();`
  Why: Implementation line supporting this file's behavior or structure.
- `L93 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L94 | `
  Why: Blank line for readability and logical separation.
- `L95 |   loadCandidates(): void {`
  Why: Implementation line supporting this file's behavior or structure.
- `L96 |     this.candidateService`
  Why: Implementation line supporting this file's behavior or structure.
- `L97 |       .list({ skills: this.skillsFilter || undefined, min_experience: this.minExperience })`
  Why: Implementation line supporting this file's behavior or structure.
- `L98 |       .subscribe((res) => (this.candidates = res));`
  Why: Implementation line supporting this file's behavior or structure.
- `L99 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L100 | `
  Why: Blank line for readability and logical separation.
- `L101 |   createCandidate(): void {`
  Why: Implementation line supporting this file's behavior or structure.
- `L102 |     if (this.createForm.invalid) {`
  Why: Conditional branch; runs only when the condition is true.
- `L103 |       return;`
  Why: Returns a value/result from this function.
- `L104 |     }`
  Why: Closes a previously opened block/object/array/function scope.
- `L105 |     const raw = this.createForm.getRawValue();`
  Why: Implementation line supporting this file's behavior or structure.
- `L106 |     this.candidateService`
  Why: Implementation line supporting this file's behavior or structure.
- `L107 |       .create({`
  Why: Implementation line supporting this file's behavior or structure.
- `L108 |         name: raw.name ?? '',`
  Why: Implementation line supporting this file's behavior or structure.
- `L109 |         email: raw.email ?? '',`
  Why: Implementation line supporting this file's behavior or structure.
- `L110 |         phone: raw.phone ?? '',`
  Why: Implementation line supporting this file's behavior or structure.
- `L111 |       })`
  Why: Closes a previously opened block/object/array/function scope.
- `L112 |       .subscribe(() => {`
  Why: Implementation line supporting this file's behavior or structure.
- `L113 |         this.createForm.reset();`
  Why: Implementation line supporting this file's behavior or structure.
- `L114 |         this.loadCandidates();`
  Why: Implementation line supporting this file's behavior or structure.
- `L115 |       });`
  Why: Closes a previously opened block/object/array/function scope.
- `L116 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L117 | `
  Why: Blank line for readability and logical separation.
- `L118 |   selectCandidate(id: number): void {`
  Why: Implementation line supporting this file's behavior or structure.
- `L119 |     this.message = '';`
  Why: Implementation line supporting this file's behavior or structure.
- `L120 |     this.selectedFile = null;`
  Why: Implementation line supporting this file's behavior or structure.
- `L121 |     this.candidateService.detail(id).subscribe((res) => (this.selected = res));`
  Why: Implementation line supporting this file's behavior or structure.
- `L122 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L123 | `
  Why: Blank line for readability and logical separation.
- `L124 |   onFileChange(event: Event): void {`
  Why: Implementation line supporting this file's behavior or structure.
- `L125 |     const target = event.target as HTMLInputElement;`
  Why: Implementation line supporting this file's behavior or structure.
- `L126 |     this.selectedFile = target.files?.[0] ?? null;`
  Why: Implementation line supporting this file's behavior or structure.
- `L127 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L128 | `
  Why: Blank line for readability and logical separation.
- `L129 |   uploadResume(): void {`
  Why: Implementation line supporting this file's behavior or structure.
- `L130 |     if (!this.selected || !this.selectedFile) {`
  Why: Conditional branch; runs only when the condition is true.
- `L131 |       return;`
  Why: Returns a value/result from this function.
- `L132 |     }`
  Why: Closes a previously opened block/object/array/function scope.
- `L133 |     this.candidateService.uploadResume(this.selected.id, this.selectedFile).subscribe((res) => {`
  Why: Implementation line supporting this file's behavior or structure.
- `L134 |       this.message = res.message;`
  Why: Implementation line supporting this file's behavior or structure.
- `L135 |       this.selectCandidate(this.selected!.id);`
  Why: Implementation line supporting this file's behavior or structure.
- `L136 |       this.loadCandidates();`
  Why: Implementation line supporting this file's behavior or structure.
- `L137 |     });`
  Why: Closes a previously opened block/object/array/function scope.
- `L138 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L139 | }`
  Why: Closes a previously opened block/object/array/function scope.

### File: `frontend/src/app/pages/dashboard/dashboard.component.ts`

- `L1 | import { CommonModule } from '@angular/common';`
  Why: Imports a module dependency used later in this file.
- `L2 | import { Component, OnInit } from '@angular/core';`
  Why: Imports a module dependency used later in this file.
- `L3 | `
  Why: Blank line for readability and logical separation.
- `L4 | import { DashboardService } from '../../core/dashboard.service';`
  Why: Imports a module dependency used later in this file.
- `L5 | import { DashboardData } from '../../core/models';`
  Why: Imports a module dependency used later in this file.
- `L6 | `
  Why: Blank line for readability and logical separation.
- `L7 | @Component({`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L8 |   selector: 'app-dashboard',`
  Why: Implementation line supporting this file's behavior or structure.
- `L9 |   standalone: true,`
  Why: Implementation line supporting this file's behavior or structure.
- `L10 |   imports: [CommonModule],`
  Why: Implementation line supporting this file's behavior or structure.
- `L11 |   template: \``
  Why: Inline HTML template for rendering component UI.
- `L12 |     <h2>Dashboard</h2>`
  Why: Implementation line supporting this file's behavior or structure.
- `L13 |     <div class="stats" *ngIf="data">`
  Why: Angular structural directive to conditionally show/hide UI blocks.
- `L14 |       <div class="card">Total Candidates: <b>{{ data.total_candidates }}</b></div>`
  Why: Implementation line supporting this file's behavior or structure.
- `L15 |       <div class="card">Total Jobs: <b>{{ data.total_jobs }}</b></div>`
  Why: Implementation line supporting this file's behavior or structure.
- `L16 |     </div>`
  Why: Implementation line supporting this file's behavior or structure.
- `L17 | `
  Why: Blank line for readability and logical separation.
- `L18 |     <div class="grid" *ngIf="data">`
  Why: Angular structural directive to conditionally show/hide UI blocks.
- `L19 |       <div>`
  Why: Implementation line supporting this file's behavior or structure.
- `L20 |         <h3>Recent Candidates</h3>`
  Why: Implementation line supporting this file's behavior or structure.
- `L21 |         <table>`
  Why: Implementation line supporting this file's behavior or structure.
- `L22 |           <tr><th>ID</th><th>Name</th><th>Created</th></tr>`
  Why: Implementation line supporting this file's behavior or structure.
- `L23 |           <tr *ngFor="let c of data.recent_candidates">`
  Why: Angular structural directive to render list/table rows dynamically.
- `L24 |             <td>{{ c.id }}</td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L25 |             <td>{{ c.name }}</td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L26 |             <td>{{ c.created_at | date:'short' }}</td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L27 |           </tr>`
  Why: Implementation line supporting this file's behavior or structure.
- `L28 |         </table>`
  Why: Implementation line supporting this file's behavior or structure.
- `L29 |       </div>`
  Why: Implementation line supporting this file's behavior or structure.
- `L30 |       <div>`
  Why: Implementation line supporting this file's behavior or structure.
- `L31 |         <h3>Recent Jobs</h3>`
  Why: Implementation line supporting this file's behavior or structure.
- `L32 |         <table>`
  Why: Implementation line supporting this file's behavior or structure.
- `L33 |           <tr><th>ID</th><th>Title</th><th>Created</th></tr>`
  Why: Implementation line supporting this file's behavior or structure.
- `L34 |           <tr *ngFor="let j of data.recent_jobs">`
  Why: Angular structural directive to render list/table rows dynamically.
- `L35 |             <td>{{ j.id }}</td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L36 |             <td>{{ j.title }}</td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L37 |             <td>{{ j.created_at | date:'short' }}</td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L38 |           </tr>`
  Why: Implementation line supporting this file's behavior or structure.
- `L39 |         </table>`
  Why: Implementation line supporting this file's behavior or structure.
- `L40 |       </div>`
  Why: Implementation line supporting this file's behavior or structure.
- `L41 |     </div>`
  Why: Implementation line supporting this file's behavior or structure.
- `L42 |   \`,`
  Why: Implementation line supporting this file's behavior or structure.
- `L43 |   styles: [`
  Why: Inline CSS styles scoped to this Angular component.
- `L44 |     \``
  Why: Implementation line supporting this file's behavior or structure.
- `L45 |       .stats { display: flex; gap: 12px; margin-bottom: 12px; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L46 |       .card { border: 1px solid #ddd; padding: 8px 12px; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L47 |       .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L48 |       table { width: 100%; border-collapse: collapse; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L49 |       th, td { border: 1px solid #ddd; padding: 6px; text-align: left; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L50 |     \`,`
  Why: Implementation line supporting this file's behavior or structure.
- `L51 |   ],`
  Why: Closes a previously opened block/object/array/function scope.
- `L52 | })`
  Why: Closes a previously opened block/object/array/function scope.
- `L53 | export class DashboardComponent implements OnInit {`
  Why: Exports a class so Angular/TypeScript modules can consume it.
- `L54 |   data: DashboardData | null = null;`
  Why: Implementation line supporting this file's behavior or structure.
- `L55 | `
  Why: Blank line for readability and logical separation.
- `L56 |   constructor(private dashboardService: DashboardService) {}`
  Why: Class constructor; dependencies are injected here.
- `L57 | `
  Why: Blank line for readability and logical separation.
- `L58 |   ngOnInit(): void {`
  Why: Implementation line supporting this file's behavior or structure.
- `L59 |     this.dashboardService.getData().subscribe((res) => (this.data = res));`
  Why: Implementation line supporting this file's behavior or structure.
- `L60 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L61 | }`
  Why: Closes a previously opened block/object/array/function scope.
- `L62 | `
  Why: Blank line for readability and logical separation.

### File: `frontend/src/app/pages/jobs/jobs.component.ts`

- `L1 | import { CommonModule } from '@angular/common';`
  Why: Imports a module dependency used later in this file.
- `L2 | import { Component, OnInit, inject } from '@angular/core';`
  Why: Imports a module dependency used later in this file.
- `L3 | import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';`
  Why: Imports a module dependency used later in this file.
- `L4 | `
  Why: Blank line for readability and logical separation.
- `L5 | import { AuthService } from '../../core/auth.service';`
  Why: Imports a module dependency used later in this file.
- `L6 | import { JobService } from '../../core/job.service';`
  Why: Imports a module dependency used later in this file.
- `L7 | import { Job } from '../../core/models';`
  Why: Imports a module dependency used later in this file.
- `L8 | `
  Why: Blank line for readability and logical separation.
- `L9 | @Component({`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L10 |   selector: 'app-jobs',`
  Why: Implementation line supporting this file's behavior or structure.
- `L11 |   standalone: true,`
  Why: Implementation line supporting this file's behavior or structure.
- `L12 |   imports: [CommonModule, ReactiveFormsModule],`
  Why: Implementation line supporting this file's behavior or structure.
- `L13 |   template: \``
  Why: Inline HTML template for rendering component UI.
- `L14 |     <h2>Jobs</h2>`
  Why: Implementation line supporting this file's behavior or structure.
- `L15 |     <form [formGroup]="form" (ngSubmit)="save()" class="box">`
  Why: Implementation line supporting this file's behavior or structure.
- `L16 |       <h3>{{ editingId ? 'Edit Job' : 'Create Job' }}</h3>`
  Why: Implementation line supporting this file's behavior or structure.
- `L17 |       <div class="grid">`
  Why: Implementation line supporting this file's behavior or structure.
- `L18 |         <input placeholder="Title" formControlName="title" />`
  Why: Binds input element to Angular reactive form control.
- `L19 |         <input placeholder="Department" formControlName="department" />`
  Why: Binds input element to Angular reactive form control.
- `L20 |         <input placeholder="Skills (comma separated)" formControlName="skills" />`
  Why: Binds input element to Angular reactive form control.
- `L21 |         <input type="number" placeholder="Experience required" formControlName="experience_required" />`
  Why: Binds input element to Angular reactive form control.
- `L22 |       </div>`
  Why: Implementation line supporting this file's behavior or structure.
- `L23 |       <textarea rows="4" placeholder="Description" formControlName="description"></textarea>`
  Why: Binds input element to Angular reactive form control.
- `L24 |       <button type="submit" [disabled]="form.invalid">{{ editingId ? 'Update' : 'Create' }}</button>`
  Why: Implementation line supporting this file's behavior or structure.
- `L25 |       <button type="button" *ngIf="editingId" (click)="reset()">Cancel</button>`
  Why: Angular structural directive to conditionally show/hide UI blocks.
- `L26 |     </form>`
  Why: Implementation line supporting this file's behavior or structure.
- `L27 | `
  Why: Blank line for readability and logical separation.
- `L28 |     <table>`
  Why: Implementation line supporting this file's behavior or structure.
- `L29 |       <tr>`
  Why: Implementation line supporting this file's behavior or structure.
- `L30 |         <th>ID</th><th>Title</th><th>Department</th><th>Skills</th><th>Exp</th><th>Actions</th>`
  Why: Implementation line supporting this file's behavior or structure.
- `L31 |       </tr>`
  Why: Implementation line supporting this file's behavior or structure.
- `L32 |       <tr *ngFor="let j of jobs">`
  Why: Angular structural directive to render list/table rows dynamically.
- `L33 |         <td>{{ j.id }}</td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L34 |         <td>{{ j.title }}</td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L35 |         <td>{{ j.department }}</td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L36 |         <td>{{ j.skills.join(', ') }}</td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L37 |         <td>{{ j.experience_required }}</td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L38 |         <td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L39 |           <button (click)="edit(j)">Edit</button>`
  Why: Implementation line supporting this file's behavior or structure.
- `L40 |           <button *ngIf="auth.role() === 'Admin'" (click)="remove(j.id)">Delete</button>`
  Why: Angular structural directive to conditionally show/hide UI blocks.
- `L41 |         </td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L42 |       </tr>`
  Why: Implementation line supporting this file's behavior or structure.
- `L43 |     </table>`
  Why: Implementation line supporting this file's behavior or structure.
- `L44 |     <div *ngIf="selectedJob" class="box">`
  Why: Angular structural directive to conditionally show/hide UI blocks.
- `L45 |       <h3>Improved Description (AI)</h3>`
  Why: Implementation line supporting this file's behavior or structure.
- `L46 |       <p>{{ selectedJob.improved_description }}</p>`
  Why: Implementation line supporting this file's behavior or structure.
- `L47 |     </div>`
  Why: Implementation line supporting this file's behavior or structure.
- `L48 |   \`,`
  Why: Implementation line supporting this file's behavior or structure.
- `L49 |   styles: [`
  Why: Inline CSS styles scoped to this Angular component.
- `L50 |     \``
  Why: Implementation line supporting this file's behavior or structure.
- `L51 |       .box { border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L52 |       .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L53 |       input, textarea, button { padding: 6px; margin-bottom: 6px; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L54 |       table { width: 100%; border-collapse: collapse; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L55 |       th, td { border: 1px solid #ddd; padding: 6px; text-align: left; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L56 |     \`,`
  Why: Implementation line supporting this file's behavior or structure.
- `L57 |   ],`
  Why: Closes a previously opened block/object/array/function scope.
- `L58 | })`
  Why: Closes a previously opened block/object/array/function scope.
- `L59 | export class JobsComponent implements OnInit {`
  Why: Exports a class so Angular/TypeScript modules can consume it.
- `L60 |   private fb = inject(FormBuilder);`
  Why: Implementation line supporting this file's behavior or structure.
- `L61 | `
  Why: Blank line for readability and logical separation.
- `L62 |   jobs: Job[] = [];`
  Why: Implementation line supporting this file's behavior or structure.
- `L63 |   selectedJob: Job | null = null;`
  Why: Implementation line supporting this file's behavior or structure.
- `L64 |   editingId: number | null = null;`
  Why: Implementation line supporting this file's behavior or structure.
- `L65 | `
  Why: Blank line for readability and logical separation.
- `L66 |   form = this.fb.group({`
  Why: Implementation line supporting this file's behavior or structure.
- `L67 |     title: ['', Validators.required],`
  Why: Implementation line supporting this file's behavior or structure.
- `L68 |     department: ['', Validators.required],`
  Why: Implementation line supporting this file's behavior or structure.
- `L69 |     skills: ['', Validators.required],`
  Why: Implementation line supporting this file's behavior or structure.
- `L70 |     experience_required: [0, [Validators.required, Validators.min(0)]],`
  Why: Implementation line supporting this file's behavior or structure.
- `L71 |     description: ['', Validators.required],`
  Why: Implementation line supporting this file's behavior or structure.
- `L72 |   });`
  Why: Closes a previously opened block/object/array/function scope.
- `L73 | `
  Why: Blank line for readability and logical separation.
- `L74 |   constructor(private jobService: JobService, public auth: AuthService) {}`
  Why: Class constructor; dependencies are injected here.
- `L75 | `
  Why: Blank line for readability and logical separation.
- `L76 |   ngOnInit(): void {`
  Why: Implementation line supporting this file's behavior or structure.
- `L77 |     this.load();`
  Why: Implementation line supporting this file's behavior or structure.
- `L78 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L79 | `
  Why: Blank line for readability and logical separation.
- `L80 |   load(): void {`
  Why: Implementation line supporting this file's behavior or structure.
- `L81 |     this.jobService.list().subscribe((res) => (this.jobs = res));`
  Why: Implementation line supporting this file's behavior or structure.
- `L82 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L83 | `
  Why: Blank line for readability and logical separation.
- `L84 |   save(): void {`
  Why: Implementation line supporting this file's behavior or structure.
- `L85 |     if (this.form.invalid) {`
  Why: Conditional branch; runs only when the condition is true.
- `L86 |       return;`
  Why: Returns a value/result from this function.
- `L87 |     }`
  Why: Closes a previously opened block/object/array/function scope.
- `L88 |     const raw = this.form.getRawValue();`
  Why: Implementation line supporting this file's behavior or structure.
- `L89 |     const payload = {`
  Why: Implementation line supporting this file's behavior or structure.
- `L90 |       title: raw.title ?? '',`
  Why: Implementation line supporting this file's behavior or structure.
- `L91 |       department: raw.department ?? '',`
  Why: Implementation line supporting this file's behavior or structure.
- `L92 |       skills: (raw.skills ?? '')`
  Why: Implementation line supporting this file's behavior or structure.
- `L93 |         .split(',')`
  Why: Implementation line supporting this file's behavior or structure.
- `L94 |         .map((v) => v.trim())`
  Why: Implementation line supporting this file's behavior or structure.
- `L95 |         .filter((v) => !!v),`
  Why: Implementation line supporting this file's behavior or structure.
- `L96 |       experience_required: Number(raw.experience_required ?? 0),`
  Why: Implementation line supporting this file's behavior or structure.
- `L97 |       description: raw.description ?? '',`
  Why: Implementation line supporting this file's behavior or structure.
- `L98 |     };`
  Why: Closes a previously opened block/object/array/function scope.
- `L99 | `
  Why: Blank line for readability and logical separation.
- `L100 |     if (this.editingId) {`
  Why: Conditional branch; runs only when the condition is true.
- `L101 |       this.jobService.update(this.editingId, payload).subscribe((job) => {`
  Why: Implementation line supporting this file's behavior or structure.
- `L102 |         this.selectedJob = job;`
  Why: Implementation line supporting this file's behavior or structure.
- `L103 |         this.reset();`
  Why: Implementation line supporting this file's behavior or structure.
- `L104 |         this.load();`
  Why: Implementation line supporting this file's behavior or structure.
- `L105 |       });`
  Why: Closes a previously opened block/object/array/function scope.
- `L106 |       return;`
  Why: Returns a value/result from this function.
- `L107 |     }`
  Why: Closes a previously opened block/object/array/function scope.
- `L108 |     this.jobService.create(payload).subscribe((job) => {`
  Why: Implementation line supporting this file's behavior or structure.
- `L109 |       this.selectedJob = job;`
  Why: Implementation line supporting this file's behavior or structure.
- `L110 |       this.reset();`
  Why: Implementation line supporting this file's behavior or structure.
- `L111 |       this.load();`
  Why: Implementation line supporting this file's behavior or structure.
- `L112 |     });`
  Why: Closes a previously opened block/object/array/function scope.
- `L113 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L114 | `
  Why: Blank line for readability and logical separation.
- `L115 |   edit(job: Job): void {`
  Why: Implementation line supporting this file's behavior or structure.
- `L116 |     this.editingId = job.id;`
  Why: Implementation line supporting this file's behavior or structure.
- `L117 |     this.form.patchValue({`
  Why: Implementation line supporting this file's behavior or structure.
- `L118 |       title: job.title,`
  Why: Implementation line supporting this file's behavior or structure.
- `L119 |       department: job.department,`
  Why: Implementation line supporting this file's behavior or structure.
- `L120 |       skills: job.skills.join(', '),`
  Why: Implementation line supporting this file's behavior or structure.
- `L121 |       experience_required: job.experience_required,`
  Why: Implementation line supporting this file's behavior or structure.
- `L122 |       description: job.description,`
  Why: Implementation line supporting this file's behavior or structure.
- `L123 |     });`
  Why: Closes a previously opened block/object/array/function scope.
- `L124 |     this.selectedJob = job;`
  Why: Implementation line supporting this file's behavior or structure.
- `L125 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L126 | `
  Why: Blank line for readability and logical separation.
- `L127 |   remove(id: number): void {`
  Why: Implementation line supporting this file's behavior or structure.
- `L128 |     this.jobService.delete(id).subscribe(() => this.load());`
  Why: Implementation line supporting this file's behavior or structure.
- `L129 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L130 | `
  Why: Blank line for readability and logical separation.
- `L131 |   reset(): void {`
  Why: Implementation line supporting this file's behavior or structure.
- `L132 |     this.editingId = null;`
  Why: Implementation line supporting this file's behavior or structure.
- `L133 |     this.form.reset({`
  Why: Implementation line supporting this file's behavior or structure.
- `L134 |       title: '',`
  Why: Implementation line supporting this file's behavior or structure.
- `L135 |       department: '',`
  Why: Implementation line supporting this file's behavior or structure.
- `L136 |       skills: '',`
  Why: Implementation line supporting this file's behavior or structure.
- `L137 |       experience_required: 0,`
  Why: Implementation line supporting this file's behavior or structure.
- `L138 |       description: '',`
  Why: Implementation line supporting this file's behavior or structure.
- `L139 |     });`
  Why: Closes a previously opened block/object/array/function scope.
- `L140 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L141 | }`
  Why: Closes a previously opened block/object/array/function scope.

### File: `frontend/src/app/pages/layout/layout.component.ts`

- `L1 | import { CommonModule } from '@angular/common';`
  Why: Imports a module dependency used later in this file.
- `L2 | import { Component } from '@angular/core';`
  Why: Imports a module dependency used later in this file.
- `L3 | import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';`
  Why: Imports a module dependency used later in this file.
- `L4 | `
  Why: Blank line for readability and logical separation.
- `L5 | import { AuthService } from '../../core/auth.service';`
  Why: Imports a module dependency used later in this file.
- `L6 | `
  Why: Blank line for readability and logical separation.
- `L7 | @Component({`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L8 |   selector: 'app-layout',`
  Why: Implementation line supporting this file's behavior or structure.
- `L9 |   standalone: true,`
  Why: Implementation line supporting this file's behavior or structure.
- `L10 |   imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],`
  Why: Uses Angular router for navigation or route configuration.
- `L11 |   template: \``
  Why: Inline HTML template for rendering component UI.
- `L12 |     <div class="container">`
  Why: Implementation line supporting this file's behavior or structure.
- `L13 |       <nav class="nav">`
  Why: Implementation line supporting this file's behavior or structure.
- `L14 |         <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>`
  Why: Implementation line supporting this file's behavior or structure.
- `L15 |         <a routerLink="/candidates" routerLinkActive="active">Candidates</a>`
  Why: Implementation line supporting this file's behavior or structure.
- `L16 |         <a routerLink="/jobs" routerLinkActive="active">Jobs</a>`
  Why: Implementation line supporting this file's behavior or structure.
- `L17 |         <a routerLink="/matches" routerLinkActive="active">Matching</a>`
  Why: Implementation line supporting this file's behavior or structure.
- `L18 |         <span class="spacer"></span>`
  Why: Implementation line supporting this file's behavior or structure.
- `L19 |         <span>{{ auth.username() }} ({{ auth.role() }})</span>`
  Why: Implementation line supporting this file's behavior or structure.
- `L20 |         <button (click)="auth.logout()">Logout</button>`
  Why: Implementation line supporting this file's behavior or structure.
- `L21 |       </nav>`
  Why: Implementation line supporting this file's behavior or structure.
- `L22 |       <main class="main">`
  Why: Implementation line supporting this file's behavior or structure.
- `L23 |         <router-outlet></router-outlet>`
  Why: Implementation line supporting this file's behavior or structure.
- `L24 |       </main>`
  Why: Implementation line supporting this file's behavior or structure.
- `L25 |     </div>`
  Why: Implementation line supporting this file's behavior or structure.
- `L26 |   \`,`
  Why: Implementation line supporting this file's behavior or structure.
- `L27 |   styles: [`
  Why: Inline CSS styles scoped to this Angular component.
- `L28 |     \``
  Why: Implementation line supporting this file's behavior or structure.
- `L29 |       .container { font-family: Arial, sans-serif; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L30 |       .nav { display: flex; gap: 10px; align-items: center; padding: 10px; border-bottom: 1px solid #ddd; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L31 |       .active { font-weight: 700; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L32 |       .spacer { flex: 1; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L33 |       .main { padding: 12px; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L34 |       button { padding: 6px 10px; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L35 |     \`,`
  Why: Implementation line supporting this file's behavior or structure.
- `L36 |   ],`
  Why: Closes a previously opened block/object/array/function scope.
- `L37 | })`
  Why: Closes a previously opened block/object/array/function scope.
- `L38 | export class LayoutComponent {`
  Why: Exports a class so Angular/TypeScript modules can consume it.
- `L39 |   constructor(public auth: AuthService) {}`
  Why: Class constructor; dependencies are injected here.
- `L40 | }`
  Why: Closes a previously opened block/object/array/function scope.
- `L41 | `
  Why: Blank line for readability and logical separation.

### File: `frontend/src/app/pages/login/login.component.ts`

- `L1 | import { CommonModule } from '@angular/common';`
  Why: Imports a module dependency used later in this file.
- `L2 | import { Component, inject } from '@angular/core';`
  Why: Imports a module dependency used later in this file.
- `L3 | import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';`
  Why: Imports a module dependency used later in this file.
- `L4 | import { Router } from '@angular/router';`
  Why: Imports a module dependency used later in this file.
- `L5 | `
  Why: Blank line for readability and logical separation.
- `L6 | import { AuthService } from '../../core/auth.service';`
  Why: Imports a module dependency used later in this file.
- `L7 | `
  Why: Blank line for readability and logical separation.
- `L8 | @Component({`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L9 |   selector: 'app-login',`
  Why: Implementation line supporting this file's behavior or structure.
- `L10 |   standalone: true,`
  Why: Implementation line supporting this file's behavior or structure.
- `L11 |   imports: [CommonModule, ReactiveFormsModule],`
  Why: Implementation line supporting this file's behavior or structure.
- `L12 |   template: \``
  Why: Inline HTML template for rendering component UI.
- `L13 |     <div class="page">`
  Why: Implementation line supporting this file's behavior or structure.
- `L14 |       <h2>AI Resume Tool - Login</h2>`
  Why: Implementation line supporting this file's behavior or structure.
- `L15 |       <form [formGroup]="form" (ngSubmit)="submit()" class="card">`
  Why: Implementation line supporting this file's behavior or structure.
- `L16 |         <label>Username</label>`
  Why: Implementation line supporting this file's behavior or structure.
- `L17 |         <input type="text" formControlName="username" />`
  Why: Binds input element to Angular reactive form control.
- `L18 |         <label>Password</label>`
  Why: Implementation line supporting this file's behavior or structure.
- `L19 |         <input type="password" formControlName="password" />`
  Why: Binds input element to Angular reactive form control.
- `L20 |         <button type="submit" [disabled]="form.invalid || loading">{{ loading ? 'Loading...' : 'Login' }}</button>`
  Why: Implementation line supporting this file's behavior or structure.
- `L21 |       </form>`
  Why: Implementation line supporting this file's behavior or structure.
- `L22 |       <p class="help">Demo users: admin/admin123 (Admin), hr/hr123 (HR)</p>`
  Why: Implementation line supporting this file's behavior or structure.
- `L23 |       <p class="error" *ngIf="error">{{ error }}</p>`
  Why: Angular structural directive to conditionally show/hide UI blocks.
- `L24 |     </div>`
  Why: Implementation line supporting this file's behavior or structure.
- `L25 |   \`,`
  Why: Implementation line supporting this file's behavior or structure.
- `L26 |   styles: [`
  Why: Inline CSS styles scoped to this Angular component.
- `L27 |     \``
  Why: Implementation line supporting this file's behavior or structure.
- `L28 |       .page { max-width: 420px; margin: 40px auto; font-family: Arial, sans-serif; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L29 |       .card { border: 1px solid #d7d7d7; padding: 16px; display: grid; gap: 8px; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L30 |       input, button { padding: 8px; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L31 |       .error { color: #b00020; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L32 |       .help { color: #555; font-size: 13px; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L33 |     \`,`
  Why: Implementation line supporting this file's behavior or structure.
- `L34 |   ],`
  Why: Closes a previously opened block/object/array/function scope.
- `L35 | })`
  Why: Closes a previously opened block/object/array/function scope.
- `L36 | export class LoginComponent {`
  Why: Exports a class so Angular/TypeScript modules can consume it.
- `L37 |   private fb = inject(FormBuilder);`
  Why: Implementation line supporting this file's behavior or structure.
- `L38 | `
  Why: Blank line for readability and logical separation.
- `L39 |   loading = false;`
  Why: Implementation line supporting this file's behavior or structure.
- `L40 |   error = '';`
  Why: Implementation line supporting this file's behavior or structure.
- `L41 |   form = this.fb.group({`
  Why: Implementation line supporting this file's behavior or structure.
- `L42 |     username: ['', Validators.required],`
  Why: Implementation line supporting this file's behavior or structure.
- `L43 |     password: ['', Validators.required],`
  Why: Implementation line supporting this file's behavior or structure.
- `L44 |   });`
  Why: Closes a previously opened block/object/array/function scope.
- `L45 | `
  Why: Blank line for readability and logical separation.
- `L46 |   constructor(private auth: AuthService, private router: Router) {}`
  Why: Class constructor; dependencies are injected here.
- `L47 | `
  Why: Blank line for readability and logical separation.
- `L48 |   submit(): void {`
  Why: Implementation line supporting this file's behavior or structure.
- `L49 |     if (this.form.invalid) {`
  Why: Conditional branch; runs only when the condition is true.
- `L50 |       return;`
  Why: Returns a value/result from this function.
- `L51 |     }`
  Why: Closes a previously opened block/object/array/function scope.
- `L52 |     this.error = '';`
  Why: Implementation line supporting this file's behavior or structure.
- `L53 |     this.loading = true;`
  Why: Implementation line supporting this file's behavior or structure.
- `L54 |     this.auth.login(this.form.getRawValue() as { username: string; password: string }).subscribe({`
  Why: Implementation line supporting this file's behavior or structure.
- `L55 |       next: () => {`
  Why: Implementation line supporting this file's behavior or structure.
- `L56 |         this.loading = false;`
  Why: Implementation line supporting this file's behavior or structure.
- `L57 |         this.router.navigate(['/dashboard']);`
  Why: Implementation line supporting this file's behavior or structure.
- `L58 |       },`
  Why: Closes a previously opened block/object/array/function scope.
- `L59 |       error: (err) => {`
  Why: Implementation line supporting this file's behavior or structure.
- `L60 |         this.loading = false;`
  Why: Implementation line supporting this file's behavior or structure.
- `L61 |         this.error = err?.error?.detail ?? 'Login failed';`
  Why: Implementation line supporting this file's behavior or structure.
- `L62 |       },`
  Why: Closes a previously opened block/object/array/function scope.
- `L63 |     });`
  Why: Closes a previously opened block/object/array/function scope.
- `L64 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L65 | }`
  Why: Closes a previously opened block/object/array/function scope.

### File: `frontend/src/app/pages/matches/matches.component.ts`

- `L1 | import { CommonModule } from '@angular/common';`
  Why: Imports a module dependency used later in this file.
- `L2 | import { Component, OnInit } from '@angular/core';`
  Why: Imports a module dependency used later in this file.
- `L3 | import { FormsModule } from '@angular/forms';`
  Why: Imports a module dependency used later in this file.
- `L4 | `
  Why: Blank line for readability and logical separation.
- `L5 | import { CandidateService } from '../../core/candidate.service';`
  Why: Imports a module dependency used later in this file.
- `L6 | import { JobService } from '../../core/job.service';`
  Why: Imports a module dependency used later in this file.
- `L7 | import { MatchingService } from '../../core/matching.service';`
  Why: Imports a module dependency used later in this file.
- `L8 | import { Candidate, CandidateMatchView, Job, JobMatchView } from '../../core/models';`
  Why: Imports a module dependency used later in this file.
- `L9 | `
  Why: Blank line for readability and logical separation.
- `L10 | @Component({`
  Why: Decorator adding metadata/behavior to the next declaration.
- `L11 |   selector: 'app-matches',`
  Why: Implementation line supporting this file's behavior or structure.
- `L12 |   standalone: true,`
  Why: Implementation line supporting this file's behavior or structure.
- `L13 |   imports: [CommonModule, FormsModule],`
  Why: Implementation line supporting this file's behavior or structure.
- `L14 |   template: \``
  Why: Inline HTML template for rendering component UI.
- `L15 |     <h2>Matching</h2>`
  Why: Implementation line supporting this file's behavior or structure.
- `L16 |     <div class="box">`
  Why: Implementation line supporting this file's behavior or structure.
- `L17 |       <button (click)="runMatch()">Run Full Matching</button>`
  Why: Implementation line supporting this file's behavior or structure.
- `L18 |     </div>`
  Why: Implementation line supporting this file's behavior or structure.
- `L19 | `
  Why: Blank line for readability and logical separation.
- `L20 |     <div class="grid">`
  Why: Implementation line supporting this file's behavior or structure.
- `L21 |       <div class="box">`
  Why: Implementation line supporting this file's behavior or structure.
- `L22 |         <h3>Candidate-Centric View</h3>`
  Why: Implementation line supporting this file's behavior or structure.
- `L23 |         <select [(ngModel)]="selectedCandidateId">`
  Why: Implementation line supporting this file's behavior or structure.
- `L24 |           <option [ngValue]="null">Select Candidate</option>`
  Why: Implementation line supporting this file's behavior or structure.
- `L25 |           <option *ngFor="let c of candidates" [ngValue]="c.id">{{ c.name }}</option>`
  Why: Angular structural directive to render list/table rows dynamically.
- `L26 |         </select>`
  Why: Implementation line supporting this file's behavior or structure.
- `L27 |         <button (click)="loadCandidateView()">Load</button>`
  Why: Implementation line supporting this file's behavior or structure.
- `L28 |         <table>`
  Why: Implementation line supporting this file's behavior or structure.
- `L29 |           <tr><th>Job</th><th>Skill %</th><th>Exp %</th><th>Overall</th></tr>`
  Why: Implementation line supporting this file's behavior or structure.
- `L30 |           <tr *ngFor="let row of candidateView">`
  Why: Angular structural directive to render list/table rows dynamically.
- `L31 |             <td>{{ row.job_title }}</td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L32 |             <td>{{ row.skill_match_pct }}</td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L33 |             <td>{{ row.experience_match_pct }}</td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L34 |             <td>{{ row.overall_score }}</td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L35 |           </tr>`
  Why: Implementation line supporting this file's behavior or structure.
- `L36 |         </table>`
  Why: Implementation line supporting this file's behavior or structure.
- `L37 |       </div>`
  Why: Implementation line supporting this file's behavior or structure.
- `L38 | `
  Why: Blank line for readability and logical separation.
- `L39 |       <div class="box">`
  Why: Implementation line supporting this file's behavior or structure.
- `L40 |         <h3>Job-Centric Ranked List</h3>`
  Why: Implementation line supporting this file's behavior or structure.
- `L41 |         <select [(ngModel)]="selectedJobId">`
  Why: Implementation line supporting this file's behavior or structure.
- `L42 |           <option [ngValue]="null">Select Job</option>`
  Why: Implementation line supporting this file's behavior or structure.
- `L43 |           <option *ngFor="let j of jobs" [ngValue]="j.id">{{ j.title }}</option>`
  Why: Angular structural directive to render list/table rows dynamically.
- `L44 |         </select>`
  Why: Implementation line supporting this file's behavior or structure.
- `L45 |         <button (click)="loadJobView()">Load</button>`
  Why: Implementation line supporting this file's behavior or structure.
- `L46 |         <table>`
  Why: Implementation line supporting this file's behavior or structure.
- `L47 |           <tr><th>Candidate</th><th>Overall</th><th>Skill %</th><th>Exp %</th></tr>`
  Why: Implementation line supporting this file's behavior or structure.
- `L48 |           <tr *ngFor="let row of jobView">`
  Why: Angular structural directive to render list/table rows dynamically.
- `L49 |             <td>{{ row.candidate_name }}</td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L50 |             <td>{{ row.overall_score }}</td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L51 |             <td>{{ row.skill_match_pct }}</td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L52 |             <td>{{ row.experience_match_pct }}</td>`
  Why: Implementation line supporting this file's behavior or structure.
- `L53 |           </tr>`
  Why: Implementation line supporting this file's behavior or structure.
- `L54 |         </table>`
  Why: Implementation line supporting this file's behavior or structure.
- `L55 |       </div>`
  Why: Implementation line supporting this file's behavior or structure.
- `L56 |     </div>`
  Why: Implementation line supporting this file's behavior or structure.
- `L57 |   \`,`
  Why: Implementation line supporting this file's behavior or structure.
- `L58 |   styles: [`
  Why: Inline CSS styles scoped to this Angular component.
- `L59 |     \``
  Why: Implementation line supporting this file's behavior or structure.
- `L60 |       .box { border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L61 |       .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L62 |       table { width: 100%; border-collapse: collapse; margin-top: 8px; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L63 |       th, td { border: 1px solid #ddd; padding: 6px; text-align: left; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L64 |       select, button { padding: 6px; margin-right: 6px; }`
  Why: Implementation line supporting this file's behavior or structure.
- `L65 |     \`,`
  Why: Implementation line supporting this file's behavior or structure.
- `L66 |   ],`
  Why: Closes a previously opened block/object/array/function scope.
- `L67 | })`
  Why: Closes a previously opened block/object/array/function scope.
- `L68 | export class MatchesComponent implements OnInit {`
  Why: Exports a class so Angular/TypeScript modules can consume it.
- `L69 |   candidates: Candidate[] = [];`
  Why: Implementation line supporting this file's behavior or structure.
- `L70 |   jobs: Job[] = [];`
  Why: Implementation line supporting this file's behavior or structure.
- `L71 |   selectedCandidateId: number | null = null;`
  Why: Implementation line supporting this file's behavior or structure.
- `L72 |   selectedJobId: number | null = null;`
  Why: Implementation line supporting this file's behavior or structure.
- `L73 |   candidateView: CandidateMatchView[] = [];`
  Why: Implementation line supporting this file's behavior or structure.
- `L74 |   jobView: JobMatchView[] = [];`
  Why: Implementation line supporting this file's behavior or structure.
- `L75 | `
  Why: Blank line for readability and logical separation.
- `L76 |   constructor(`
  Why: Class constructor; dependencies are injected here.
- `L77 |     private matchingService: MatchingService,`
  Why: Implementation line supporting this file's behavior or structure.
- `L78 |     private candidateService: CandidateService,`
  Why: Implementation line supporting this file's behavior or structure.
- `L79 |     private jobService: JobService,`
  Why: Implementation line supporting this file's behavior or structure.
- `L80 |   ) {}`
  Why: Implementation line supporting this file's behavior or structure.
- `L81 | `
  Why: Blank line for readability and logical separation.
- `L82 |   ngOnInit(): void {`
  Why: Implementation line supporting this file's behavior or structure.
- `L83 |     this.candidateService.list({}).subscribe((res) => (this.candidates = res));`
  Why: Implementation line supporting this file's behavior or structure.
- `L84 |     this.jobService.list().subscribe((res) => (this.jobs = res));`
  Why: Implementation line supporting this file's behavior or structure.
- `L85 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L86 | `
  Why: Blank line for readability and logical separation.
- `L87 |   runMatch(): void {`
  Why: Implementation line supporting this file's behavior or structure.
- `L88 |     this.matchingService.run().subscribe(() => {`
  Why: Implementation line supporting this file's behavior or structure.
- `L89 |       this.loadCandidateView();`
  Why: Implementation line supporting this file's behavior or structure.
- `L90 |       this.loadJobView();`
  Why: Implementation line supporting this file's behavior or structure.
- `L91 |     });`
  Why: Closes a previously opened block/object/array/function scope.
- `L92 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L93 | `
  Why: Blank line for readability and logical separation.
- `L94 |   loadCandidateView(): void {`
  Why: Implementation line supporting this file's behavior or structure.
- `L95 |     if (!this.selectedCandidateId) {`
  Why: Conditional branch; runs only when the condition is true.
- `L96 |       this.candidateView = [];`
  Why: Implementation line supporting this file's behavior or structure.
- `L97 |       return;`
  Why: Returns a value/result from this function.
- `L98 |     }`
  Why: Closes a previously opened block/object/array/function scope.
- `L99 |     this.matchingService.byCandidate(this.selectedCandidateId).subscribe((res) => (this.candidateView = res));`
  Why: Implementation line supporting this file's behavior or structure.
- `L100 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L101 | `
  Why: Blank line for readability and logical separation.
- `L102 |   loadJobView(): void {`
  Why: Implementation line supporting this file's behavior or structure.
- `L103 |     if (!this.selectedJobId) {`
  Why: Conditional branch; runs only when the condition is true.
- `L104 |       this.jobView = [];`
  Why: Implementation line supporting this file's behavior or structure.
- `L105 |       return;`
  Why: Returns a value/result from this function.
- `L106 |     }`
  Why: Closes a previously opened block/object/array/function scope.
- `L107 |     this.matchingService.byJob(this.selectedJobId).subscribe((res) => (this.jobView = res));`
  Why: Implementation line supporting this file's behavior or structure.
- `L108 |   }`
  Why: Closes a previously opened block/object/array/function scope.
- `L109 | }`
  Why: Closes a previously opened block/object/array/function scope.
- `L110 | `
  Why: Blank line for readability and logical separation.

### File: `frontend/src/index.html`

- `L1 | <!doctype html>`
  Why: HTML markup defining UI structure/content for this view.
- `L2 | <html lang="en">`
  Why: HTML markup defining UI structure/content for this view.
- `L3 | <head>`
  Why: HTML markup defining UI structure/content for this view.
- `L4 |   <meta charset="utf-8">`
  Why: HTML markup defining UI structure/content for this view.
- `L5 |   <title>Frontend</title>`
  Why: HTML markup defining UI structure/content for this view.
- `L6 |   <base href="/">`
  Why: HTML markup defining UI structure/content for this view.
- `L7 |   <meta name="viewport" content="width=device-width, initial-scale=1">`
  Why: HTML markup defining UI structure/content for this view.
- `L8 |   <link rel="icon" type="image/x-icon" href="favicon.ico">`
  Why: HTML markup defining UI structure/content for this view.
- `L9 | </head>`
  Why: HTML markup defining UI structure/content for this view.
- `L10 | <body>`
  Why: HTML markup defining UI structure/content for this view.
- `L11 |   <app-root></app-root>`
  Why: HTML markup defining UI structure/content for this view.
- `L12 | </body>`
  Why: HTML markup defining UI structure/content for this view.
- `L13 | </html>`
  Why: HTML markup defining UI structure/content for this view.

### File: `frontend/src/main.ts`

- `L1 | import { bootstrapApplication } from '@angular/platform-browser';`
  Why: Imports a module dependency used later in this file.
- `L2 | import { appConfig } from './app/app.config';`
  Why: Imports a module dependency used later in this file.
- `L3 | import { AppComponent } from './app/app.component';`
  Why: Imports a module dependency used later in this file.
- `L4 | `
  Why: Blank line for readability and logical separation.
- `L5 | bootstrapApplication(AppComponent, appConfig)`
  Why: Implementation line supporting this file's behavior or structure.
- `L6 |   .catch((err) => console.error(err));`
  Why: Implementation line supporting this file's behavior or structure.

### File: `frontend/src/styles.css`

- `L1 | /* You can add global styles to this file, and also import other style files */`
  Why: CSS rule/property controlling presentation and layout.

### File: `frontend/tsconfig.app.json`

- `L1 | /* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L2 | /* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L3 | {`
  Why: JSON structural syntax for object/array declaration.
- `L4 |   "extends": "./tsconfig.json",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L5 |   "compilerOptions": {`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L6 |     "outDir": "./out-tsc/app",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L7 |     "types": []`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L8 |   },`
  Why: JSON structural syntax for object/array declaration.
- `L9 |   "files": [`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L10 |     "src/main.ts"`
  Why: JSON structural syntax for object/array declaration.
- `L11 |   ],`
  Why: JSON structural syntax for object/array declaration.
- `L12 |   "include": [`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L13 |     "src/**/*.d.ts"`
  Why: JSON structural syntax for object/array declaration.
- `L14 |   ]`
  Why: JSON structural syntax for object/array declaration.
- `L15 | }`
  Why: JSON structural syntax for object/array declaration.

### File: `frontend/tsconfig.json`

- `L1 | /* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L2 | /* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L3 | {`
  Why: JSON structural syntax for object/array declaration.
- `L4 |   "compileOnSave": false,`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L5 |   "compilerOptions": {`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L6 |     "outDir": "./dist/out-tsc",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L7 |     "strict": true,`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L8 |     "noImplicitOverride": true,`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L9 |     "noPropertyAccessFromIndexSignature": true,`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L10 |     "noImplicitReturns": true,`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L11 |     "noFallthroughCasesInSwitch": true,`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L12 |     "skipLibCheck": true,`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L13 |     "isolatedModules": true,`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L14 |     "esModuleInterop": true,`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L15 |     "sourceMap": true,`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L16 |     "declaration": false,`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L17 |     "experimentalDecorators": true,`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L18 |     "moduleResolution": "bundler",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L19 |     "importHelpers": true,`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L20 |     "target": "ES2022",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L21 |     "module": "ES2022",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L22 |     "lib": [`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L23 |       "ES2022",`
  Why: JSON structural syntax for object/array declaration.
- `L24 |       "dom"`
  Why: JSON structural syntax for object/array declaration.
- `L25 |     ]`
  Why: JSON structural syntax for object/array declaration.
- `L26 |   },`
  Why: JSON structural syntax for object/array declaration.
- `L27 |   "angularCompilerOptions": {`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L28 |     "enableI18nLegacyMessageIdFormat": false,`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L29 |     "strictInjectionParameters": true,`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L30 |     "strictInputAccessModifiers": true,`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L31 |     "strictTemplates": true`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L32 |   }`
  Why: JSON structural syntax for object/array declaration.
- `L33 | }`
  Why: JSON structural syntax for object/array declaration.

### File: `frontend/tsconfig.spec.json`

- `L1 | /* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L2 | /* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L3 | {`
  Why: JSON structural syntax for object/array declaration.
- `L4 |   "extends": "./tsconfig.json",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L5 |   "compilerOptions": {`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L6 |     "outDir": "./out-tsc/spec",`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L7 |     "types": [`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L8 |       "jasmine"`
  Why: JSON structural syntax for object/array declaration.
- `L9 |     ]`
  Why: JSON structural syntax for object/array declaration.
- `L10 |   },`
  Why: JSON structural syntax for object/array declaration.
- `L11 |   "include": [`
  Why: Configuration key/value used by toolchain/runtime behavior.
- `L12 |     "src/**/*.spec.ts",`
  Why: JSON structural syntax for object/array declaration.
- `L13 |     "src/**/*.d.ts"`
  Why: JSON structural syntax for object/array declaration.
- `L14 |   ]`
  Why: JSON structural syntax for object/array declaration.
- `L15 | }`
  Why: JSON structural syntax for object/array declaration.
