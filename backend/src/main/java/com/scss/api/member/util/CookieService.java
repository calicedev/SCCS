package com.scss.api.member.util;

import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;

@Service
public class CookieService {

    /** 쿠키 생성 **/
    public Cookie createCookie(String name, String value) {
        Cookie cookie = new Cookie(name, value);
        cookie.setMaxAge(60 * 5); // 5분
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        return cookie;
    }
}
