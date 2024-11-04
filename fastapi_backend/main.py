from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from fastapi.responses import HTMLResponse, JSONResponse
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import uvicorn
import io

app = FastAPI()

model_path = "C:/Users/KIIT/Documents/icdcit/model_deploy/models/EfficientNet_model.keras"
model = load_model(model_path)

def load_and_preprocess_image(file, target_size):
    try:
        img = Image.open(io.BytesIO(file))
        if img.mode != 'RGB':
            img = img.convert('RGB')
        img = img.resize(target_size)
        img_array = np.array(img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0
        return img_array
    except Exception as e:
        raise ValueError(f"Error loading or processing the image: {str(e)}")

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        img_array = load_and_preprocess_image(contents, target_size=(224, 224))
        prediction = model.predict(img_array)[0][0]  
        print(f"Prediction confidence: {prediction}")
        label = 'Normal' if prediction < 0.5 else 'Pneumonia'
        return JSONResponse(content={"label": label, "confidence": float(prediction)})
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@app.get("/", response_class=HTMLResponse)
async def main():
    content = """
    <html>
        <head>
            <title>Upload an Image</title>
        </head>
        <body>
            <h2>Upload an Image to Predict</h2>
            <form action="/predict/" method="post" enctype="multipart/form-data">
                <input type="file" name="file" accept="image/*">
                <input type="submit" value="Upload">
            </form>
        </body>
    </html>
    """
    return HTMLResponse(content=content)

if __name__ == "__main__":

    uvicorn.run(app, host="127.0.0.1", port=8001)   # Run the server on local machine port




