package com.scss.api.member.service;

public interface JWTService {
    public String createToken(String id);
    public String getToken(String token);

}
