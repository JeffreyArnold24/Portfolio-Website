package com.Utils;

import java.security.SecureRandom;
import java.util.Base64;

public class AuthTokenUtil {

    private static final SecureRandom secureRandom = new SecureRandom();
    private static final Base64.Encoder base64Encoder = Base64.getUrlEncoder().withoutPadding();

    public static String generateAuthToken(){
        byte[] bytes = new byte[24];
        secureRandom.nextBytes(bytes);
        return base64Encoder.encodeToString(bytes);
    }
    
}
