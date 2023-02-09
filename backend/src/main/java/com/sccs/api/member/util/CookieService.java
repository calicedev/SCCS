package com.sccs.api.member.util;

import javax.servlet.http.Cookie;
import org.springframework.stereotype.Service;

@Service
public class CookieService {

  /**
   * 쿠키 생성
   **/
  public Cookie createCookie(String name, String value) {
    Cookie cookie = new Cookie(name, value);
    cookie.setMaxAge(60 * 60); // 5분
    cookie.setSecure(true);
    cookie.setHttpOnly(true);
    cookie.setPath("/");
    return cookie;
  }
}
