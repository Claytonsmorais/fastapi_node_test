from fastapi import FastAPI
import uvicorn
import os
import subprocess

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/teste")
async def testenversao():
    process = subprocess.run(['node', 'index-puppeter.js', "teste.html", "teste.pdf"],
                             stdout=subprocess.PIPE,
                             universal_newlines=True)

    return {"returncode": process.returncode, "message": process.stdout}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
