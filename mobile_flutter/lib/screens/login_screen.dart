import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _idCtrl = TextEditingController();
  final _pwCtrl = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();

    return Scaffold(
      appBar: AppBar(title: const Text('Login')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(controller: _idCtrl, decoration: const InputDecoration(labelText: 'Email or Username')),
            const SizedBox(height: 8),
            TextField(controller: _pwCtrl, decoration: const InputDecoration(labelText: 'Password'), obscureText: true),
            const SizedBox(height: 16),
            if (auth.error != null) Text(auth.error!, style: const TextStyle(color: Colors.red)),
            const SizedBox(height: 8),
            ElevatedButton(
              onPressed: auth.loading ? null : () async {
                final ok = await auth.login(_idCtrl.text.trim(), _pwCtrl.text.trim());
                if (ok) {
                  if (!mounted) return; Navigator.pushReplacementNamed(context, '/products');
                } else if (auth.pendingEmail != null) {
                  if (!mounted) return; Navigator.pushReplacementNamed(context, '/otp');
                }
              },
              child: auth.loading ? const CircularProgressIndicator() : const Text('Login'),
            ),
          ],
        ),
      ),
    );
  }
}

