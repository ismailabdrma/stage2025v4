import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../services/api_client.dart';
import '../services/auth_service.dart';

class AuthProvider extends ChangeNotifier {
  final ApiClient apiClient;
  late final AuthService _auth;
  String? token;
  String? pendingEmail;
  String? error;
  bool loading = false;

  AuthProvider(this.apiClient) {
    _auth = AuthService(apiClient);
    _restoreToken();
  }

  Future<bool> login(String identifier, String password) async {
    loading = true; error = null; notifyListeners();
    final res = await _auth.login(identifier, password);
    loading = false;
    if (res.ok) { token = res.token; apiClient.setToken(token); _persistToken(); notifyListeners(); return true; }
    if (res.otpRequired) { pendingEmail = res.email; notifyListeners(); return false; }
    error = res.message; notifyListeners(); return false;
  }

  Future<bool> verifyOtp(String otp) async {
    if (pendingEmail == null) return false;
    loading = true; error = null; notifyListeners();
    final res = await _auth.verifyLoginOtp(pendingEmail!, otp);
    loading = false;
    if (res.ok) { token = res.token; apiClient.setToken(token); pendingEmail = null; _persistToken(); notifyListeners(); return true; }
    error = res.message; notifyListeners(); return false;
  }

  Future<void> _persistToken() async {
    final prefs = await SharedPreferences.getInstance();
    if (token != null) {
      await prefs.setString('jwt', token!);
    } else {
      await prefs.remove('jwt');
    }
  }

  Future<void> _restoreToken() async {
    final prefs = await SharedPreferences.getInstance();
    final t = prefs.getString('jwt');
    if (t != null && t.isNotEmpty) {
      token = t;
      apiClient.setToken(token);
      notifyListeners();
    }
  }
}



import '../services/api_client.dart';
import '../services/auth_service.dart';

class AuthProvider extends ChangeNotifier {
  final ApiClient apiClient;
  late final AuthService _auth;
  String? token;
  String? pendingEmail;
  String? error;
  bool loading = false;

  AuthProvider(this.apiClient) {
    _auth = AuthService(apiClient);
  }

  Future<bool> login(String identifier, String password) async {
    loading = true; error = null; notifyListeners();
    final res = await _auth.login(identifier, password);
    loading = false;
    if (res.ok) { token = res.token; notifyListeners(); return true; }
    if (res.otpRequired) { pendingEmail = res.email; notifyListeners(); return false; }
    error = res.message; notifyListeners(); return false;
  }

  Future<bool> verifyOtp(String otp) async {
    if (pendingEmail == null) return false;
    loading = true; error = null; notifyListeners();
    final res = await _auth.verifyLoginOtp(pendingEmail!, otp);
    loading = false;
    if (res.ok) { token = res.token; pendingEmail = null; notifyListeners(); return true; }
    error = res.message; notifyListeners(); return false;
  }
}











