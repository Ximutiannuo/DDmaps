# HTTPS Server for DDmaps - wddmap.top
import os
import ssl

# SSL Certificate paths
SSL_DIR = r"F:\map2\DDmaps-railway\ssl"
CERT_FILE = os.path.join(SSL_DIR, "server.crt")
KEY_FILE = os.path.join(SSL_DIR, "server.key")

if __name__ == "__main__":
    from app import app
    
    print("=" * 50)
    print("  DDmaps HTTPS Server")
    print("  URL: https://wddmap.top")
    print("  Press Ctrl+C to stop")
    print("=" * 50)
    
    # Check if SSL files exist
    if os.path.exists(CERT_FILE) and os.path.exists(KEY_FILE):
        print(f"Using SSL certificate: {CERT_FILE}")
        
        # Create SSL context
        ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        ssl_context.load_cert_chain(CERT_FILE, KEY_FILE)
        
        # Run with HTTPS
        app.run(
            host="0.0.0.0",
            port=443,
            ssl_context=ssl_context,
            threaded=True,
            debug=False
        )
    else:
        print("ERROR: SSL certificates not found!")
        print(f"Expected: {CERT_FILE}")
        print(f"Expected: {KEY_FILE}")
        print("\nPlease run setup_https.ps1 first to generate certificates.")
