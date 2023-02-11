package com.sccs.api.member.util;

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

  /**
   * Redis에서 키 값으로 값 가져오기
   **/
  public String getRefreshTokenWithRedis(String key) {
    ValueOperations<String, String> stringValueOperations = stringRedisTemplate.opsForValue();
    return stringValueOperations.get(key); // value return
  }

  /**
   * Redis에 토큰 저장
   **/
  public void setRefreshTokenWithRedis(String key, String value) {
    ValueOperations<String, String> stringValueOperations = stringRedisTemplate.opsForValue();
    stringValueOperations.set(key, value);
    long EXP_TIME_MINUTE = 1 * 60; // 1분
    long EXP_TIME_HOUR   = EXP_TIME_MINUTE * 60; // 1시간

    stringRedisTemplate.expire(key, EXP_TIME_HOUR * 10, TimeUnit.SECONDS); // 유효기간 10시간
    logger.debug("[setRefreshTokenWithRedis] key : {}, value : {}, 유효시간 : {}분", key, value,
        EXP_TIME_MINUTE);
  }

  /**
   * 모든 키 조회
   **/
  public int showAllKeys() {
    Set<String> redisKeys = stringRedisTemplate.keys("*");
    int result = redisKeys.size();
    logger.debug("레디스 값 개수 : {}", result);

    for (String key : redisKeys) {
      logger.debug("redis key : {}", key);
    }
    return result;
  }

  /**
   * 모든 키 삭제
   **/
  public void deleteAllKeys() {
    stringRedisTemplate.keys("*").stream().forEach(k -> {
      stringRedisTemplate.delete(k);
    });
    showAllKeys();
  }

  /**
   * 특정 키 삭제
   */
  public String deleteKey(String key) {
    try {
      logger.debug("값 삭제 시도 !!!!!!");
      stringRedisTemplate.delete(key);
      return "success";
    } catch (Exception e) {
      e.printStackTrace();
      return "fail";
    }
  }

}
