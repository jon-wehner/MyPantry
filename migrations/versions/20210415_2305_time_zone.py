from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'D34jqOAQ0ha8Hw=='
down_revision = '25a56a861f95'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(
        'user_items', sa.Column('expiration_date', sa.DateTime(timezone=True)))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user_items', sa.Column('expiration_date', sa.DateTime()))
    # ### end Alembic commands ###
