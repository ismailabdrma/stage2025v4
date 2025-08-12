// Quick test to debug product import
import java.sql.*;

public class debug_product_import {
    public static void main(String[] args) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/stage-db", "root", "123456");
            
            // Check suppliers
            System.out.println("=== CHECKING SUPPLIERS ===");
            PreparedStatement stmt = conn.prepareStatement(
                "SELECT id, name, supplier_type, active FROM supplier");
            ResultSet rs = stmt.executeQuery();
            
            while (rs.next()) {
                System.out.printf("ID: %d, Name: %s, Type: %s, Active: %s%n",
                    rs.getLong("id"), rs.getString("name"), 
                    rs.getString("supplier_type"), rs.getBoolean("active"));
            }
            
            // Check products count
            System.out.println("\n=== CHECKING PRODUCTS ===");
            stmt = conn.prepareStatement(
                "SELECT s.name as supplier_name, COUNT(p.id) as product_count " +
                "FROM supplier s LEFT JOIN products p ON s.id = p.supplier_id " +
                "GROUP BY s.id, s.name");
            rs = stmt.executeQuery();
            
            while (rs.next()) {
                System.out.printf("Supplier: %s, Products: %d%n",
                    rs.getString("supplier_name"), rs.getInt("product_count"));
            }
            
            // Check recent import logs
            System.out.println("\n=== CHECKING IMPORT LOGS ===");
            stmt = conn.prepareStatement(
                "SELECT s.name, il.status, il.imported_count, il.error_count, " +
                "il.error_message, il.import_date " +
                "FROM import_log il JOIN supplier s ON il.supplier_id = s.id " +
                "ORDER BY il.import_date DESC LIMIT 10");
            rs = stmt.executeQuery();
            
            while (rs.next()) {
                System.out.printf("Supplier: %s, Status: %s, Count: %d, Errors: %d, Message: %s, Date: %s%n",
                    rs.getString("name"), rs.getString("status"), 
                    rs.getInt("imported_count"), rs.getInt("error_count"),
                    rs.getString("error_message"), rs.getTimestamp("import_date"));
            }
            
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

import java.sql.*;

public class debug_product_import {
    public static void main(String[] args) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/stage-db", "root", "123456");
            
            // Check suppliers
            System.out.println("=== CHECKING SUPPLIERS ===");
            PreparedStatement stmt = conn.prepareStatement(
                "SELECT id, name, supplier_type, active FROM supplier");
            ResultSet rs = stmt.executeQuery();
            
            while (rs.next()) {
                System.out.printf("ID: %d, Name: %s, Type: %s, Active: %s%n",
                    rs.getLong("id"), rs.getString("name"), 
                    rs.getString("supplier_type"), rs.getBoolean("active"));
            }
            
            // Check products count
            System.out.println("\n=== CHECKING PRODUCTS ===");
            stmt = conn.prepareStatement(
                "SELECT s.name as supplier_name, COUNT(p.id) as product_count " +
                "FROM supplier s LEFT JOIN products p ON s.id = p.supplier_id " +
                "GROUP BY s.id, s.name");
            rs = stmt.executeQuery();
            
            while (rs.next()) {
                System.out.printf("Supplier: %s, Products: %d%n",
                    rs.getString("supplier_name"), rs.getInt("product_count"));
            }
            
            // Check recent import logs
            System.out.println("\n=== CHECKING IMPORT LOGS ===");
            stmt = conn.prepareStatement(
                "SELECT s.name, il.status, il.imported_count, il.error_count, " +
                "il.error_message, il.import_date " +
                "FROM import_log il JOIN supplier s ON il.supplier_id = s.id " +
                "ORDER BY il.import_date DESC LIMIT 10");
            rs = stmt.executeQuery();
            
            while (rs.next()) {
                System.out.printf("Supplier: %s, Status: %s, Count: %d, Errors: %d, Message: %s, Date: %s%n",
                    rs.getString("name"), rs.getString("status"), 
                    rs.getInt("imported_count"), rs.getInt("error_count"),
                    rs.getString("error_message"), rs.getTimestamp("import_date"));
            }
            
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}









