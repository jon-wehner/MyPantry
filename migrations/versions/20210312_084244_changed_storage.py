"""changed storage

Revision ID: 6341fe623cd3
Revises: ffdde997d22b
Create Date: 2021-03-12 08:42:44.975296

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6341fe623cd3'
down_revision = 'ffdde997d22b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('items', sa.Column('fridge', sa.Boolean(), nullable=False))
    op.drop_column('items', 'storage')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('items', sa.Column('storage', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.drop_column('items', 'fridge')
    # ### end Alembic commands ###
