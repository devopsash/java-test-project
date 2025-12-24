# Nexus Datacenter Operations Web App

A modern, glassmorphic web application for monitoring datacenter status, network topology, and SSL certificates.

## 🐳 Docker Deployment Instructions

### Option A: Local Desktop (Windows/Mac)

1.  **Build the Image**:
    ```bash
    docker build -t nexus-ops .
    ```

2.  **Run the Container**:
    ```bash
    docker run -d -p 8080:80 --name nexus-app nexus-ops
    ```

3.  **Access the App**: Open browser to `http://localhost:8080`

---

### Option B: Linux Server (Ubuntu/CentOS/Debian)

1.  **Install Docker (if missing)**:
    ```bash
    # Ubuntu/Debian
    sudo apt-get update
    sudo apt-get install -y docker.io
    
    # CentOS/RHEL
    sudo yum install -y docker
    sudo systemctl start docker
    sudo systemctl enable docker
    ```

2.  **Clone/Upload Code**:
    Transfer your project files to the server (e.g., using `git clone` or `scp`).

3.  **Build the Image**:
    ```bash
    sudo docker build -t nexus-ops .
    ```

4.  **Run the Container**:
    ```bash
    # Runs on port 80 of the host machine so it's accessible directly via IP
    sudo docker run -d -p 80:80 --name nexus-app --restart always nexus-ops
    ```

    > **Note**: If port 80 is busy (e.g. by Nginx/Apache), use a different port like 8080:
    > `sudo docker run -d -p 8080:80 --name nexus-app --restart always nexus-ops`

5.  **Access the App**:
    Open your browser and enter the server's public IP address:
    `http://<your-server-ip>`
    *(Ensure your firewall/Security Group allows inbound traffic on the port you chose).*

---

### Managing the Container

**Stop the container:**
```bash
docker stop nexus-app
```

**Remove the container:**
```bash
docker rm nexus-app
```
