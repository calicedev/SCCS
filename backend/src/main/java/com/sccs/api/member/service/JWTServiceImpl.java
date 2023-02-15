package com.sccs.api.member.service;


import com.sccs.exception.UnAuthorizedException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.security.Key;
import java.util.Date;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JWTServiceImpl implements JWTService {

  private static final Logger logger = LoggerFactory.getLogger(JWTServiceImpl.class);

  @Value("${jwt.secret}")
  private String SECRET_KEY;
  private static final SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

  /**
   * 토큰 생성
   **/
  @Override
  public String createToken(String id, String subject, long expTime) {
    logger.debug("{} 토큰 생성 시작", subject);
    byte[] secretKeyBytes = DatatypeConverter.parseBase64Binary(SECRET_KEY);
    Key signinKey = new SecretKeySpec(secretKeyBytes, signatureAlgorithm.getJcaName());

    logger.debug("토큰 만료 시간 (초) : {}", System.currentTimeMillis() + expTime);
    return Jwts.builder()
        .setSubject(subject) // access or refresh
        .claim("id", id)
            .claim("expiration", System.currentTimeMillis() + expTime)
        .signWith(signinKey, signatureAlgorithm)
        .setExpiration(new Date(System.currentTimeMillis() + expTime))
        .compact();
  }

  /**
   * 토큰 검증
   **/
  @Override
  public Claims getToken(String token) {
    try {
      return Jwts.parserBuilder()
          .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
          .build()
          .parseClaimsJws(token)
          .getBody();
    } catch (ExpiredJwtException e) { // 토큰이 만료되었을 경우
      logger.debug("토큰 만료");
      throw new UnAuthorizedException("accessToken expired");
    } catch (Exception e) {
      logger.debug("토큰 검증 에러");
      throw new UnAuthorizedException("accessToken expired");
    }
  }

  @Override
  public boolean checkToken(String jwt) {
    logger.debug("토큰 체크 시작 !!!!");
    try {
      Jws<Claims> claims = Jwts.parserBuilder()
          .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
          .build()
          .parseClaimsJws(jwt);
      logger.debug("claims : {}", claims);
      return true;
    } catch(ExpiredJwtException e) {
      logger.debug("토큰 만료");
      throw new UnAuthorizedException("accessToken expired");
    } catch (Exception e) {
      logger.debug("토큰 검증 에러");
      throw new UnAuthorizedException("accessToken expired");
    }
  }

}
