package com.sccs.exception;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Header;

public class ExpiredException extends ExpiredJwtException {

    public ExpiredException(Header header, Claims claims,
            String message, Throwable cause) {
        super(header, claims, message, cause);
    }
}
