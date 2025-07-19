from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class GuestbookEntryBase(BaseModel):
    name: str
    message: str

class GuestbookEntryCreate(GuestbookEntryBase):
    drawing: Optional[str] = None  # base64-encoded image

class GuestbookEntryResponse(GuestbookEntryBase):
    id: int
    drawing_filename: Optional[str] = None
    created_at: datetime

    class Config:
        orm_mode = True 