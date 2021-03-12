from .db import db


class Item(db.Model):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False, unique=True)
    aisle = db.Column(db.String(), nullable=False)
    fridge = db.Column(db.Boolean(), nullable=False)

    recipe_items = db.relationship("RecipeItem", back_populates="item")
    shopping_list_items = db.relationship("ShoppingListItem",
                                          back_populates="item")
    user_items = db.relationship("UserItem", back_populates="item")
