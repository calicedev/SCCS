package com.sccs.api.member.service;

import io.jsonwebtoken.Claims;

public interface JWTService {

  public String createToken(String id, String subject, long expTime);

  public Claims getToken(String token);

  public boolean checkToken(String jwt);
}
