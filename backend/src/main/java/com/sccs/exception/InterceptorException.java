package com.sccs.exception;

import lombok.Getter;

@Getter
public class InterceptorException extends RuntimeException {

  private final InterceptorExceptionEnum error;

  public InterceptorException(InterceptorExceptionEnum e) {
    super(e.getMessage());
    this.error = e;
  }
}
