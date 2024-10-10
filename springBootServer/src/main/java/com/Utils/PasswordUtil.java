package com.Utils;

import org.springframework.security.crypto.bcrypt.BCrypt;

public class PasswordUtil {

    /** Hashes a password
     * 
     * @param password  The password to be hashed
     * @return          The hashed version of the password.
     */
    public static String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    /** Verifies if a password is the same as the given hashed password.
     * 
     * @param password          The password to check.
     * @param hashedPassword    The hashed password to compare the password to.
     * @return                  True if the passwords are the same and false otherwise.
     */
    public static boolean verifyPassword(String password, String hashedPassword) {
        return BCrypt.checkpw(password, hashedPassword);
    }
}
