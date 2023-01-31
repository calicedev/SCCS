package com.scss.interceptor;

import com.scss.api.member.service.JWTService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.scss.exception.InterceptorException;
import com.scss.exception.InterceptorExceptionEnum;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
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
            logger.debug("회원가입임 ! 인터셉터 동작하지 말아야함");
            return true;
        }

        final String token = request.getHeader(HEADER_AUTH).substring("Bearer ".length());
        logger.debug("인터셉터 토큰 : {}", token);


        if (token != null) {
            try {
                if(jwtService.checkToken(token)){
                    logger.info("토큰 사용 가능 : {}", token);
                    return true;
                }
                throw new InterceptorException(InterceptorExceptionEnum.EXPIREDTOKEN);
                //throw new InterceptorException(InterceptorExceptionEnum.UNAUTHORIZED);
            } catch (MalformedJwtException e) {
                throw new InterceptorException(InterceptorExceptionEnum.COUNTERFEIT);
            } catch (ExpiredJwtException e) {
                throw new InterceptorException(InterceptorExceptionEnum.EXPIREDTOKEN);
            }
        } else { // 토큰이 없음
            throw new InterceptorException(InterceptorExceptionEnum.UNAUTHORIZED);
        }

//        if(jwtService.checkToken(token)){
//            logger.info("토큰 사용 가능 : {}", token);
//            return true;
//        }else{
//            logger.error("토큰 사용 불가능 : {}", token);
//            throw new InterceptorException(InterceptorExceptionEnum.UNAUTHORIZED);
//
//            //            return false;
//        }

    }


}
