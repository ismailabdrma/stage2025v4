import 'package:dio/dio.dart';
import '../config/environment.dart';

class ApiClient {
  final Dio _dio = Dio(
    BaseOptions(
      baseUrl: EnvironmentConfig.apiUrl,
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 20),
      headers: {'Content-Type': 'application/json'},
    ),
  );

  String? _token;

  void setToken(String? token) {
    _token = token;
  }

  Options _authOptions() {
    return Options(headers: {
      if (_token != null) 'Authorization': 'Bearer $_token',
    });
  }

  Future<Response<T>> get<T>(String path, {Map<String, dynamic>? query}) {
    return _dio.get<T>(path, queryParameters: query, options: _authOptions());
  }

  Future<Response<T>> post<T>(String path, {dynamic data}) {
    return _dio.post<T>(path, data: data, options: _authOptions());
  }
}











