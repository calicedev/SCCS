package com.scss.api.member.service;

import com.scss.api.member.mapper.MemberMapper;
import io.jsonwebtoken.*;

import java.security.Key;
import java.text.SimpleDateFormat;
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
public class JWTServiceImpl implements JWTService{

    private static final Logger logger = LoggerFactory.getLogger(JWTServiceImpl.class);

    //private static final String SECRET_KEY = "Vecx3vjPvfdOdvvnQWfd30vrfo0zEVSD39vZed0k4jfdosvdf33dVRFidczjjfdijvodivjsognsjvbdabEFSDvidjvVDseoivjosfj";
    @Value("${jwt.secret}")
    private String SECRET_KEY;
    private static final SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

    /** 토큰 생성 **/
    @Override
    public String createToken(String id, String subject, long expTime) {
        logger.debug("{} 토큰 생성 시작", subject);
        byte[] secretKeyBytes = DatatypeConverter.parseBase64Binary(SECRET_KEY);
        Key signinKey = new SecretKeySpec(secretKeyBytes, signatureAlgorithm.getJcaName());

        logger.debug("{} 토큰 만료 시간 !!!!!!!! : {}", subject, new SimpleDateFormat(
                "yyyy-MM-dd HH:mm:ss").format(System.currentTimeMillis() + expTime));

        return Jwts.builder()
                .setSubject(subject) // access or refresh
                .claim("id", id)
                .signWith(signinKey, signatureAlgorithm)
                .setExpiration(new Date(System.currentTimeMillis() + expTime))
                .compact();
    }

    /** 토큰 검증 **/
    @Override
    public Claims getToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims;
        } catch (ExpiredJwtException e) { // 토큰이 만료되었을 경우
            logger.debug("토큰 만료");
            return null;
        } catch (Exception e) {
            logger.debug("토큰 검증 에러");
            return null;
        }
    }

    @Override
    public boolean checkToken(String jwt) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
                    .build()
                    .parseClaimsJws(jwt);
            logger.debug("claims : {}", claims);
            return true;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

}
