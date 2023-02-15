package com.sccs.interceptor;

import com.sccs.api.member.service.JWTService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sccs.exception.UnAuthorizedException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
public class JwtInterceptor implements HandlerInterceptor {
  public static final Logger logger = LoggerFactory.getLogger(JwtInterceptor.class);
  public final JWTService jwtService;

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception {
    logger.debug("[preHandle]Interceptor start");
    String method = request.getMethod();
    //logger.debug("WHAT IS METHOD : {}", method);
    String uri = request.getRequestURI();
    //logger.debug("요청 URI : {}", uri);

    if (uri.equals("/api/member") && method.equals("POST")) { // 회원가입인 경우
      logger.debug("회원가입임 ! 인터셉터 동작 안함");
      return true;
    }

    if (uri.equals("/api/member/password") && method.equals("POST")) { // 비밀번호 초기화인 경우
      logger.debug("비밀번호 초기화 ! 인터셉터 동작 안함");
      return true;
    }

    // 쿠키 방식
    Cookie[] cookies = request.getCookies();
    String accessToken = "";

    if (cookies != null) {
      for (int i=0; i<cookies.length; i++) {
        if (cookies[i].getName().equals("accessToken")) {
          accessToken = cookies[i].getValue();
        }
      }
    } else {
      response.sendError(HttpServletResponse.SC_BAD_REQUEST); // 쿠키가 없는 경우 (400)
    }

    if (jwtService.checkToken(accessToken)) {
      logger.debug("토큰 사용 가능");
      return true;
    }

    logger.debug("토큰 사용 불가능");
    response.sendError(HttpServletResponse.SC_FORBIDDEN); // 토큰이 유효하지 않은 경우 (403)
    return false;

    // 헤더 방식
//    String token = "";
//    try {
//      token = request.getHeader(HEADER_AUTH).substring("Bearer ".length());
//      logger.debug("헤더 토큰 파싱 : {}", token);
//    } catch (Exception e) {
//      e.printStackTrace();
//    }


//    if (jwtService.checkToken(token)) {
//      logger.info("토큰 사용 가능 : {}", token);
//      return true;
//    }

  }
}
