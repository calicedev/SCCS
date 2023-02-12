package com.sccs.api.member.util;

import javax.servlet.http.Cookie;
import org.springframework.stereotype.Service;

@Service
public class CookieService {

  final int MINUTE = 60;
  final int HOUR   = MINUTE * 60;
  final int DAY    = HOUR * 24;
  /**
   * 쿠키 생성
   **/
  public Cookie createCookie(String name, String value) {
    Cookie cookie = new Cookie(name, value);
    cookie.setMaxAge(10 * HOUR);
    cookie.setSecure(true);
    cookie.setHttpOnly(true);
    cookie.setPath("/");
    return cookie;
  }
}
