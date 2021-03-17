from .db import db


class Aisle(db.Model):
    __tablename__ = "aisles"

    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(), nullable=False, unique=True)

    items = db.relationship("Item", back_populates="aisle")
