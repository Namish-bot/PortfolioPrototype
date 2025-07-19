from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from typing import List
import os
import base64
from uuid import uuid4
from . import models, schemas, database

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    # Add more ports if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=database.engine)

drawings_dir = os.path.join(os.path.dirname(__file__), "drawings")
app.mount("/guestbook_backend/drawings", StaticFiles(directory=drawings_dir), name="drawings")

@app.get("/guestbook", response_model=List[schemas.GuestbookEntryResponse])
def get_entries(db: Session = Depends(database.get_db)):
    return db.query(models.GuestbookEntry).order_by(models.GuestbookEntry.created_at.desc()).all()

@app.post("/guestbook", response_model=schemas.GuestbookEntryResponse)
def create_entry(entry: schemas.GuestbookEntryCreate, db: Session = Depends(database.get_db)):
    drawing_filename = None
    if entry.drawing:
        # Save drawing as PNG
        img_data = base64.b64decode(entry.drawing.split(",")[-1])
        drawing_filename = f"{uuid4().hex}.png"
        drawings_dir = os.path.join(os.path.dirname(__file__), "drawings")
        with open(os.path.join(drawings_dir, drawing_filename), "wb") as f:
            f.write(img_data)
    db_entry = models.GuestbookEntry(
        name=entry.name,
        message=entry.message,
        drawing_filename=drawing_filename,
    )
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry 