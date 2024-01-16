from ext import app
import os

def save_uploaded_file(file):
    if file and file.filename:
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        file.save(filename)
        return filename
    return None

