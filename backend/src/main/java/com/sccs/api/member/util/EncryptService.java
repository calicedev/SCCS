package com.sccs.api.member.util;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EncryptService {

  /**
   * 비밀번호 암호화
   **/
  public String encryptPassword(String password, String salt)
      throws NoSuchAlgorithmException { // 암호화 전 비밀번호, salt 값
    String rawAndSalt = password + salt; // 암호화 전 비밀번호 + 암호용 난수
    MessageDigest md = MessageDigest.getInstance("SHA-256"); // 암호화 알고리즘 선택
    md.update(rawAndSalt.getBytes()); // 암호화 전 비밀번호 + 암호용 난수 ===> 해쉬
    return String.format("%064x", new BigInteger(1, md.digest())); // 16진수 64바이트로 암호화 후 비밀번호 생성
  }

  /**
   * salt 생성
   **/
  public String newSalt() throws NoSuchAlgorithmException {
    SecureRandom random = SecureRandom.getInstance("SHA1PRNG"); // 암호용을 강화된 난수 생성 객체
    byte[] bytes = new byte[16];
    random.nextBytes(bytes); // 암호용 난수 바이트 생성
    return new String(Base64.getEncoder().encode(bytes)); // salt : 암호용 난수
  }
}
