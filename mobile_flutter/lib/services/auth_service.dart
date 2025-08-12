import 'dart:convert';
import 'package:dio/dio.dart';
import 'api_client.dart';

class AuthService {
  final ApiClient _client;
  AuthService(this._client);

  Future<AuthResult> login(String identifier, String password) async {
    final res = await _client.post('/api/auth/login', data: {
      'identifier': identifier,
      'password': password,
    });
    final data = res.data is String ? jsonDecode(res.data as String) : res.data as Map<String, dynamic>;

    if (data['status'] == 'OTP_REQUIRED') {
      return AuthResult.requiresOtp(email: identifier);
    }
    if (data['token'] != null) {
      _client.setToken(data['token'] as String);
      return AuthResult.success(token: data['token'] as String);
    }
    return AuthResult.error(message: 'Unexpected response');
  }

  Future<AuthResult> verifyLoginOtp(String email, String otp) async {
    final res = await _client.post('/api/auth/login/verify-otp', data: {
      'email': email,
      'otp': otp,
    });
    final data = res.data as Map<String, dynamic>;
    if (data['token'] != null) {
      _client.setToken(data['token'] as String);
      return AuthResult.success(token: data['token'] as String);
    }
    return AuthResult.error(message: 'Invalid OTP');
  }
}

class AuthResult {
  final bool ok;
  final bool otpRequired;
  final String? token;
  final String? email;
  final String? message;

  AuthResult._(this.ok, this.otpRequired, this.token, this.email, this.message);
  factory AuthResult.success({required String token}) => AuthResult._(true, false, token, null, null);
  factory AuthResult.requiresOtp({required String email}) => AuthResult._(false, true, null, email, null);
  factory AuthResult.error({required String message}) => AuthResult._(false, false, null, null, message);
}



import 'package:dio/dio.dart';
import 'api_client.dart';

class AuthService {
  final ApiClient _client;
  AuthService(this._client);

  Future<AuthResult> login(String identifier, String password) async {
    final res = await _client.post('/api/auth/login', data: {
      'identifier': identifier,
      'password': password,
    });
    final data = res.data is String ? jsonDecode(res.data as String) : res.data as Map<String, dynamic>;

    if (data['status'] == 'OTP_REQUIRED') {
      return AuthResult.requiresOtp(email: identifier);
    }
    if (data['token'] != null) {
      _client.setToken(data['token'] as String);
      return AuthResult.success(token: data['token'] as String);
    }
    return AuthResult.error(message: 'Unexpected response');
  }

  Future<AuthResult> verifyLoginOtp(String email, String otp) async {
    final res = await _client.post('/api/auth/login/verify-otp', data: {
      'email': email,
      'otp': otp,
    });
    final data = res.data as Map<String, dynamic>;
    if (data['token'] != null) {
      _client.setToken(data['token'] as String);
      return AuthResult.success(token: data['token'] as String);
    }
    return AuthResult.error(message: 'Invalid OTP');
  }
}

class AuthResult {
  final bool ok;
  final bool otpRequired;
  final String? token;
  final String? email;
  final String? message;

  AuthResult._(this.ok, this.otpRequired, this.token, this.email, this.message);
  factory AuthResult.success({required String token}) => AuthResult._(true, false, token, null, null);
  factory AuthResult.requiresOtp({required String email}) => AuthResult._(false, true, null, email, null);
  factory AuthResult.error({required String message}) => AuthResult._(false, false, null, null, message);
}











