package com.sccs.exception;

import javax.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class InterceptorExceptionHandler {

  @ExceptionHandler({RuntimeException.class})
  public ResponseEntity<InterceptorExceptionEntity> exceptionHandler(HttpServletRequest request,
      final RuntimeException e) {
    e.printStackTrace();
    return ResponseEntity
        .status(InterceptorExceptionEnum.EXPIREDTOKEN.getStatus())
        .body(InterceptorExceptionEntity.builder()
//                        .errorCode(InterceptorExceptionEnum.EXPIREDTOKEN.getCode())
            .errorCode("에러")
            .errorMessage(e.getMessage())
            .build());
  }

//    @ExceptionHandler({AccessDeniedException.class})
//    public ResponseEntity<InterceptorExceptionEntity> exceptionHandler(HttpServletRequest request, final AccessDeniedException e) {
//        e.printStackTrace();
//        return ResponseEntity
//                .status(InterceptorExceptionEnum.UNAUTHORIZED.getStatus())
//                .body(InterceptorExceptionEntity.builder()
//                        .errorCode(InterceptorExceptionEnum.UNAUTHORIZED.getCode())
//                        .errorMessage("토큰 위조됨")
//                        .build());
//    }

//    @ExceptionHandler({Exception.class})
//    public ResponseEntity<InterceptorExceptionEntity> exceptionHandler(HttpServletRequest request, final Exception e) {
//        e.printStackTrace();
//        return ResponseEntity
//                .status(InterceptorExceptionEnum.COUNTERFEIT.getStatus())
//                .body(InterceptorExceptionEntity.builder()
//                        .errorCode("401")
//                        .errorMessage("토큰 위조됨")
//                        .build());
//    }
}
