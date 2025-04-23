from flask import Flask, request, jsonify
import subprocess
import os

app = Flask(__name__)
SCANOSS_KEY = os.environ.get('SCANOSS_API_KEY', 'txnUfW0xwF0KI1U1RW5sDSBL')

@app.route('/api/scanoss', methods=['POST'])
def scanoss():
    data = request.get_json()
    purl = data.get('purl')
    scan_type = data.get('type')  # vs, vulns, crypto, prv
    if not purl or not scan_type:
        return jsonify({'error': 'Missing purl or type'}), 400

    cmd = f"scanoss-py component {scan_type} --purl {purl} --key {SCANOSS_KEY}"
    try:
        result = subprocess.run(cmd.split(), capture_output=True, text=True, timeout=30)
        if result.returncode != 0:
            return jsonify({'error': result.stderr.strip()}), 500
        return jsonify({'output': result.stdout})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)
