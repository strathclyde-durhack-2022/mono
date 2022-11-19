from pydantic import BaseModel

class Something(BaseModel):
    some_var: str

    class Config:
        orm_mode = True