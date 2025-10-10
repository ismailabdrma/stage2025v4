$jdkUrl = "https://download.oracle.com/java/17/archive/jdk-17.0.7_windows-x64_bin.zip"
$jdkFolder = "jdk-windows"

# Create folder
New-Item -ItemType Directory -Force -Path $jdkFolder

# Download JDK zip
Invoke-WebRequest -Uri $jdkUrl -OutFile "$jdkFolder\jdk.zip"

# Extract zip
Expand-Archive -LiteralPath "$jdkFolder\jdk.zip" -DestinationPath $jdkFolder

# Remove zip file
Remove-Item "$jdkFolder\jdk.zip"

Write-Output "JDK installed in $jdkFolder"

# Step 2: Change directory to frontend
if (-Not (Test-Path -Path ".\frontend")) {
    Write-Error "Frontend directory not found!"
    exit 1
}
Set-Location -Path ".\frontend"

# Step 3: Run npm install
Write-Output "Running npm install in frontend..."
npm install

Write-Output "Setup complete."
