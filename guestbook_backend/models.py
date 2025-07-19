from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from .database import Base

class GuestbookEntry(Base):
    __tablename__ = "guestbook_entries"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    message = Column(String, nullable=False)
    drawing_filename = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow) 