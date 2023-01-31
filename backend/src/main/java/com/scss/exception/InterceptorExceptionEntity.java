package com.scss.exception;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

@Getter
@ToString
public class InterceptorExceptionEntity {
    private String errorCode;
    private String errorMessage;

    @Builder
    public InterceptorExceptionEntity(HttpStatus status, String errorCode, String errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
