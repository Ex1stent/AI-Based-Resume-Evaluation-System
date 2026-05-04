import json

import httpx

from app.core.config import settings


class AIService:
    def parse_resume(self, text: str) -> dict:
        ai_payload = self._parse_resume_with_ai(text)
        if ai_payload:
            return ai_payload
        raise RuntimeError("AI resume parsing failed. Check AI service configuration and API key.")

    def generate_candidate_summary(self, candidate_name: str, skills: list[str], experience_years: float, education: str | None) -> str:
        ai_text = self._generate_text(
            (
                "Generate a professional candidate summary in 5 to 7 lines. "
                "Keep it concise and factual.\n"
                f"Candidate: {candidate_name}\n"
                f"Skills: {', '.join(skills) if skills else 'Not specified'}\n"
                f"Experience: {experience_years:.1f} years\n"
                f"Education: {education or 'Not specified'}"
            )
        )
        if ai_text:
            return ai_text
        raise RuntimeError("AI candidate summary generation failed. Check AI service configuration and API key.")

    def improve_job_description(self, title: str, department: str, description: str, skills: list[str], experience_required: float) -> str:
        ai_text = self._generate_text(
            (
                "Improve this job description for professional clarity and hiring impact. "
                "Preserve meaning and keep it practical.\n"
                f"Title: {title}\n"
                f"Department: {department}\n"
                f"Required skills: {', '.join(skills)}\n"
                f"Experience required: {experience_required:.1f} years\n"
                f"Current description: {description}"
            )
        )
        if ai_text:
            return ai_text
        raise RuntimeError("AI job description improvement failed. Check AI service configuration and API key.")

    def generate_match_explanation(
        self,
        candidate_name: str,
        job_title: str,
        matching_skills: list[str],
        missing_skills: list[str],
        experience_match_pct: float,
    ) -> str:
        ai_text = self._generate_text(
            (
                "Generate a short hiring explanation for this match result.\n"
                f"Candidate: {candidate_name}\n"
                f"Job: {job_title}\n"
                f"Matched skills: {', '.join(matching_skills) if matching_skills else 'None'}\n"
                f"Missing skills: {', '.join(missing_skills) if missing_skills else 'None'}\n"
                f"Experience match percentage: {experience_match_pct:.2f}"
            )
        )
        if ai_text:
            return ai_text
        return "Match explanation unavailable."

    def _parse_resume_with_ai(self, resume_text: str) -> dict | None:
        prompt = (
            "Extract structured resume data and return strict JSON only with this shape:\n"
            '{"skills": ["skill1", "skill2"], "experience_years": 0, "education": "text"}\n'
            f"Resume text:\n{resume_text}"
        )
        ai_text = self._generate_text(prompt, response_format={"type": "json_object"})
        if not ai_text:
            return None

        clean = self._strip_code_fences(ai_text)
        try:
            payload = json.loads(clean)
            skills = payload.get("skills", [])
            if not isinstance(skills, list):
                skills = []
            skills = sorted({str(s).strip().lower() for s in skills if str(s).strip()})

            experience_years = float(payload.get("experience_years", 0) or 0)
            education = str(payload.get("education", "Not specified")).strip() or "Not specified"
            return {"skills": skills, "experience_years": experience_years, "education": education}
        except (json.JSONDecodeError, ValueError, TypeError):
            return None

    def _generate_text(self, prompt: str, response_format: dict | None = None) -> str | None:
        if not settings.ai_service_enabled or not settings.ai_api_key:
            return None

        url = f"{settings.ai_api_base_url.rstrip('/')}/chat/completions"
        payload = {
            "model": settings.ai_model,
            "messages": [
                {"role": "system", "content": "You are a precise recruiting assistant."},
                {"role": "user", "content": prompt},
            ],
            "temperature": 0.2,
        }
        if response_format:
            payload["response_format"] = response_format
        headers = {
            "Authorization": f"Bearer {settings.ai_api_key}",
            "Content-Type": "application/json",
        }
        if "models.github.ai" in settings.ai_api_base_url:
            headers["Accept"] = "application/vnd.github+json"
            headers["X-GitHub-Api-Version"] = "2026-03-10"
        try:
            with httpx.Client(timeout=20) as client:
                response = client.post(url, headers=headers, json=payload)
                response.raise_for_status()
                data = response.json()
                return data["choices"][0]["message"]["content"].strip()
        except Exception:
            return None

    def _strip_code_fences(self, text: str) -> str:
        cleaned = text.strip()
        if cleaned.startswith("```"):
            cleaned = cleaned.split("\n", 1)[-1] if "\n" in cleaned else cleaned.replace("```", "")
            if cleaned.endswith("```"):
                cleaned = cleaned[: -3]
        return cleaned.strip()
