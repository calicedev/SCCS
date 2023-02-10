package com.sccs.interceptor;

import com.sccs.api.member.service.JWTService;
import com.sccs.exception.ExpiredException;
import com.sccs.exception.InterceptorException;
import com.sccs.exception.InterceptorExceptionEnum;
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
  private static final String HEADER_AUTH = "authorization";
  public final JWTService jwtService;

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception {
    logger.debug("인터셉터 들어옴 !!!!");
    String method = request.getMethod();
    logger.debug("WHAT IS METHOD : {}", method);
    String uri = request.getRequestURI();
    logger.debug("요청 URI : {}", uri);

    if (uri.equals("/api/member") && method.equals("POST")) { // 회원가입인 경우
      logger.debug("회원가입임 ! 인터셉터 동작 안함");
      return true;
    }

    if (uri.equals("/api/member/password") && method.equals("POST")) { // 비밀번호 초기화인 경우
      logger.debug("비밀번호 초기화 ! 인터셉터 동작 안함");
      return true;
    }

    final String token = request.getHeader(HEADER_AUTH).substring("Bearer ".length());
    logger.debug("헤더 토큰 파싱 : {}", token);

    if (jwtService.checkToken(token)) {
      logger.info("토큰 사용 가능 : {}", token);
      return true;
    }
    logger.debug("토큰 사용 불가능");
    throw new InterceptorException(InterceptorExceptionEnum.UNAUTHORIZED);
    //throw new UnAuthorizedException();
  }
}
