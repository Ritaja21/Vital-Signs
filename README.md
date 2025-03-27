
# VITAL SIGNS - AI-Powered Disease Diagnosis

🚀 Developed during a hackathon (Sept 2024), VITAL SIGNS is a MERN stack-based web application that leverages AI models to generate diagnostic reports on patient diseases. It incorporates Progressive Web App (PWA) features for offline accessibility and seamless app installation.




## 📌 Features

✅ AI-powered disease detection with 97% accuracy
✅ Two AI models integrated to enhance diagnostic precision
✅ MERN Stack-based scalable web application
✅ Progressive Web App (PWA) for offline access and installability
✅ FastAPI-based ML model deployment
✅ Handles 500+ medical images for AI training
## 🛠 Tech Stack

Frontend: React.js

Backend: Node.js, Express.js, FastAPI

Database: MongoDB Atlas

Machine Learning: TensorFlow.js, OpenCV, Python

Other: Progressive Web App (PWA), JavaScript
## 🚀 Installation & Setup



### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/yourusername/vital-signs.git
cd vital-signs
```

### **2️⃣ Install Dependencies**  
#### **Frontend**  
```bash
cd frontend
npm install
npm start
```

#### **Backend**  
```bash
cd backend
npm install
npm start
```

### **3️⃣ Run the FastAPI ML Model**  
```bash
cd fastapi_backend
pip install -r requirements.txt
uvicorn main:app --reload
```




## 📄 Usage Guide
1️⃣ Upload a medical image (X-ray, CT scan).

2️⃣ The AI model processes the image and detects potential diseases.

3️⃣ Generates a detailed PDF report on the findings.

4️⃣ Doctors can review the report and provide additional insights.
