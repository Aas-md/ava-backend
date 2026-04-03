# 🚀 Invoice Extraction AI - Backend

## 📌 Overview
This backend system processes invoice documents using OCR and LLMs to extract structured data, store it in a database, and provide analytics.

---

## 🛠️ Tech Stack
- FastAPI
- Supabase (Database + Storage)
- Tesseract OCR / External OCR API
- OpenAI / Gemini (LLM parsing)
- Python

---

## ✨ Features

### 📤 File Upload
- Accepts JPG, PNG, PDF files
- Stores files in Supabase Storage

### 🔍 OCR Processing
- Extracts raw text from invoices

### 🤖 LLM Parsing
- Converts OCR text → structured JSON
- Handles:
  - Missing fields
  - Noisy data
  - Different invoice formats

### ✅ Output Validation
- Ensures valid JSON format
- Type checking and error handling

### 🧠 Format Detection
- Detects similar invoice formats
- Reuses parsing logic for better accuracy

### 📊 Analytics
- Total spend by vendor
- Monthly trends
- Invoice count
- Currency-wise totals

---

## 📂 Project Structure
```
backend/
 ├── routes/
 ├── services/
 ├── models/
 ├── utils/
 ├── main.py
 └── config.py
```

---

## ⚙️ Setup Instructions

1. Clone the repository
```bash
git clone <repo-url>
cd backend
```

2. Create virtual environment
```bash
python -m venv venv
source venv/bin/activate
```

3. Install dependencies
```bash
pip install -r requirements.txt
```

4. Run server
```bash
uvicorn main:app --reload
```

---

## 🔌 API Endpoints

### Upload Invoice
```http
POST /upload
```

### Get All Invoices
```http
GET /invoices
```

### Get Analytics
```http
GET /analytics
```

---

## 🗄️ Database (Supabase)

### Tables:
- Users
- Files Metadata
- Extracted Invoice Data

### Storage:
- Invoice files stored in Supabase Storage
- File URLs saved in DB

---

## 🧠 Key Design Decisions
- Modular architecture for scalability
- Separation of OCR and LLM layers
- Supabase for quick backend setup

---

## ⚠️ Assumptions & Limitations
- OCR accuracy depends on image quality
- LLM may occasionally misinterpret fields
- Format detection is heuristic-based

---

## 🚀 Future Improvements
- Better format detection using embeddings
- Retry logic for failed parsing
- Confidence scoring system
- Duplicate invoice detection
- Vendor normalization

---

## 📊 Scalability Considerations
- Async processing using FastAPI
- Queue system can be added (Celery/RQ)
- Caching repeated invoice formats

---

## 📸 Demo
Include deployed API link here.

---

## 👨‍💻 Author
Developed as part of assignment submission.
