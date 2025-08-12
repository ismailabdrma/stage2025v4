import 'package:flutter/foundation.dart';
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











