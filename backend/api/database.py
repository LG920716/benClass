import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("./.env")
firebase_admin.initialize_app(cred)

db = firestore.client()