package com.sccs.exception;

import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

@Getter
@ToString
public enum InterceptorExceptionEnum {
  UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "E0001", "accessToken expired"),
  EXPIREDTOKEN(HttpStatus.BAD_REQUEST, "E0002", "만료된 토큰입니다."),
  COUNTERFEIT(HttpStatus.INTERNAL_SERVER_ERROR, "E0003", "위조시도");

  private final HttpStatus status;
  private final String code;
  private final String message;

  InterceptorExceptionEnum(HttpStatus status, String code, String message) {
    this.status = status;
    this.code = code;
    this.message = message;
  }
}
