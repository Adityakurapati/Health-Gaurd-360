import os
import firebase_admin
from firebase_admin import credentials, db
from flask import Flask, send_from_directory, jsonify, request, make_response
from flask_cors import CORS
import requests

# Initialize Firebase
cred = credentials.Certificate('credentials/firebase-credentials.json')

firebase_admin.initialize_app(cred, {
    "databaseURL": "https://healthgaurd360-426f4-default-rtdb.asia-southeast1.firebasedatabase.app/"
})

# Flask app setup
app = Flask(__name__, static_folder="../client/build")
CORS(app)  # This enables CORS for all routes

# Reference the root of the database
ref = db.reference('/')

# Helper function to add no-cache headers
def add_no_cache_headers(response):
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response

# Route to serve React app
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# Route for nearby hospitals
@app.route('/api/nearby_hospitals', methods=['GET'])
def get_nearby_hospitals():
    try:
        lat = request.args.get('lat')
        lng = request.args.get('lng')
        
        hospitals_ref = ref.child('hospitals')
        hospitals = hospitals_ref.order_by_child('lat').start_at(lat - 0.05).end_at(lat + 0.05).get()
        
        if hospitals:
            return add_no_cache_headers(jsonify(list(hospitals.values())))
        else:
            return add_no_cache_headers(jsonify([]))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to add hospitals data
@app.route('/api/add-hospitals', methods=['POST'])
def add_hospitals():
    try:
        hospitals_data = request.json.get('hospitals')
        hospitals_ref = ref.child('hospitals')
        for hospital in hospitals_data:
            hospitals_ref.push(hospital)
        return jsonify({"success": True}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/diseases/<letter>', methods=['GET'])
def get_diseases_by_letter(letter):
    try:
        # Assuming you have a collection of diseases stored in Firebase
        diseases_ref = ref.child('diseases')
        # Fetch diseases where the name starts with the given letter
        diseases = diseases_ref.order_by_child('name').start_at(letter).end_at(letter + "\uf8ff").get()
        # Convert the result to a list of dictionaries
        diseases_list = [disease for disease in diseases.values()] if diseases else []
        return add_no_cache_headers(jsonify(diseases_list))
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Route for news
@app.route('/api/news', methods=['GET'])
def get_news():
    try:
        news_ref = ref.child('news')
        news = news_ref.get()
        return add_no_cache_headers(jsonify(list(news.values()) if news else []))
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route('/api/doctors', methods=['GET'])
def get_doctors():
    try:
        doctors_ref = ref.child('doctors')
        doctors = doctors_ref.get()
        return jsonify(list(doctors.values()) if doctors else [])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to add doctor data
@app.route('/api/add-doctor', methods=['POST'])
def add_doctor():
    try:
        doctor_data = request.json
        doctors_ref = ref.child('doctors')
        new_doctor_ref = doctors_ref.push(doctor_data)
        return jsonify({"success": True, "id": new_doctor_ref.key}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Route to add appointment data
@app.route('/api/add-appointment', methods=['POST'])
def add_appointment():
    try:
        appointment_data = request.json
        appointments_ref = ref.child('appointments')
        new_appointment_ref = appointments_ref.push(appointment_data)
        return jsonify({"success": True, "id": new_appointment_ref.key}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)