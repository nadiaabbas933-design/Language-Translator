from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from pydantic import BaseModel
from googletrans import Translator

app = FastAPI()


# Allow Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve Frontend Folder
app.mount("/frontend", StaticFiles(directory="../frontend"), name="frontend")


translator = Translator()


class TranslationRequest(BaseModel):
    text: str
    source: str
    target: str


# Home Page
@app.get("/")
async def home():
    return FileResponse("../frontend/index.html")


# Translation API
@app.post("/translate")
async def translate_text(request: TranslationRequest):

    try:
        translated = translator.translate(
            request.text,
            src=request.source,
            dest=request.target
        )

        return {
            "translated": translated.text
        }

    except Exception as e:
        print("ERROR:", e)
        return {
            "translated": f"Error: {str(e)}"
        }