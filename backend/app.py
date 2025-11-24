from flask import Flask
from flask_cors import CORS
from routes.analyze import analyze_bp
from routes.ask import ask_bp

def create_app():
    app = Flask(__name__)
    
    # Enable CORS for all routes
    CORS(app)
    
    # Register blueprints
    app.register_blueprint(analyze_bp, url_prefix='/api')
    app.register_blueprint(ask_bp, url_prefix='/api')
    
    @app.route('/')
    def home():
        return {'message': 'YouTube AI Video Analyzer Backend'}
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)