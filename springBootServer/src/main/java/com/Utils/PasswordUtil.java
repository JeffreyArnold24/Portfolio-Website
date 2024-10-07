package com.Utils;

import org.springframework.security.crypto.bcrypt.BCrypt;

public class PasswordUtil {

    // Hash the password
    public static String hashPassword(String password) {
        // Generate salt and hash the password
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    // Verify if the hashed password matches the provided password
    public static boolean verifyPassword(String password, String hashedPassword) {
        return BCrypt.checkpw(password, hashedPassword);
    }
}
