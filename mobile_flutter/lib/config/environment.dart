class EnvironmentConfig {
  // Default for Android emulator; change as needed for device/web
  static const String apiUrl = String.fromEnvironment(
    'API_URL',
    defaultValue: 'http://10.0.2.2:8082',
  );
}

