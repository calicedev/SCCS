package com.scss.api.member.util;

import com.scss.api.member.controller.MemberController;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

@Service
public class RedisService {
    private static final Logger logger = LoggerFactory.getLogger(RedisService.class);

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    /** Redis에서 키 값으로 토큰 가져오기 **/
    public String getRefreshTokenWithRedis(String key) {
        ValueOperations<String, String> stringValueOperations = stringRedisTemplate.opsForValue();
        logger.debug("[토큰 가져오기] - key : {}, value : {}", key, stringValueOperations.get(key));
        return stringValueOperations.get(key); // refreshToken return
    }

    /** Redis에 토큰 저장 **/
    public void setRefreshTokenWithRedis(String key, String token) {
        ValueOperations<String, String> stringValueOperations = stringRedisTemplate.opsForValue();
        stringValueOperations.set(key, token);
        stringRedisTemplate.expire(key, 60L, TimeUnit.SECONDS);
        logger.debug("[토큰 저장] - key : {}, value : {}", key, token);
    }
}
