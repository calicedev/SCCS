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

    /** Redis에서 키 값으로 값 가져오기 **/
    public String getRefreshTokenWithRedis(String key) {
        ValueOperations<String, String> stringValueOperations = stringRedisTemplate.opsForValue();
        logger.debug("[getRefreshTokenWithRedis] - key : {}, value : {}", key, stringValueOperations.get(key));
        return stringValueOperations.get(key); // value return
    }

    /** Redis에 토큰 저장 **/
    public void setRefreshTokenWithRedis(String key, String value) {
        ValueOperations<String, String> stringValueOperations = stringRedisTemplate.opsForValue();
        stringValueOperations.set(key, value);
        int EXP_TIME = 30; // 분 단위
        stringRedisTemplate.expire(key, EXP_TIME * 60, TimeUnit.SECONDS); // 유효기간 30분 (1주일로 변경 예정)
        logger.debug("[setRefreshTokenWithRedis] key : {}, value : {}, 유효시간 : {}분", key, value, EXP_TIME);
    }

    /** 모든 키 조회 **/
    public int showAllKeys() {
        Set<String> redisKeys = stringRedisTemplate.keys("*");
        int result = redisKeys.size();
        logger.debug("레디스 값 개수 : {}", result);

        for (String key : redisKeys) {
            logger.debug("redis key : {}", key);
        }
        return result;
    }

    /** 모든 키 삭제 **/
    public void deleteAllKeys() {
        stringRedisTemplate.keys("*").stream().forEach(k -> {
            stringRedisTemplate.delete(k);
        });
        showAllKeys();
    }

}
