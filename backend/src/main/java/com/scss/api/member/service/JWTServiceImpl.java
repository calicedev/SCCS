package com.scss.api.member.service;

import com.scss.api.member.mapper.MemberMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.security.Key;
import java.util.Date;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JWTServiceImpl implements JWTService{

    private static final Logger logger = LoggerFactory.getLogger(MemberServiceImpl.class);
    // 생성자 주입
    private final MemberMapper memberRepository;

    private static final String SECRET_KEY = "Vecx3vjPvfdOdvvnQWfd30vrfo0zEVSD39vZed0k4jfdosvdf33dVRFidczjjfdijvodivjsognsjvbdabEFSDvidjvVDseoivjosfj";
    private static final SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

    // 토큰 생성
    @Override
    public String createToken(String id, String subject, long expTime) {
        byte[] secretKeyBytes = DatatypeConverter.parseBase64Binary(SECRET_KEY);
        Key signinKey = new SecretKeySpec(secretKeyBytes, signatureAlgorithm.getJcaName());

        return Jwts.builder()
                .setSubject(subject) // access or refresh
                .claim("member_id", id)
                .signWith(signinKey, signatureAlgorithm)
                .setExpiration(new Date(System.currentTimeMillis() * expTime)) // 토큰 만료시간 설정
                .compact();
    }

    // 토큰 검증
    @Override
    public String getToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject();
        } catch (ExpiredJwtException e) { // 토큰이 만료되었을 경우
            return "토큰 만료";
        } catch (Exception e) {
            return "토큰 검증 에러";
        }

    }

}
