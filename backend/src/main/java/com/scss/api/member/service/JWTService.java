package com.scss.api.member.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public interface JWTService {
    public String createToken(String id, String subject, long expTime);
    public Claims getToken(String token);
    public boolean checkToken(String jwt);
}
