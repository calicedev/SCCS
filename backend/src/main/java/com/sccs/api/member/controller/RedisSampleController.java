package com.sccs.api.member.controller;

import com.sccs.api.member.util.RedisService;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Redis에 값을 저장, 조회하기 위한 테스트용 컨트롤러
@RestController
public class RedisSampleController {

  @Autowired
  private RedisService redisService;

  // 토큰 저장하기 테스트 컨트롤러 (실제 서비스랑 관련 없음)
  @PostMapping("/redis/token")
  public ResponseEntity<?> testSetTokenWithRedis(@RequestBody Map<String, String> paramMap) {
    String id = paramMap.get("id");
    String refreshToken = paramMap.get("refreshToken");

    redisService.setRefreshTokenWithRedis(id, refreshToken);
    return new ResponseEntity<String>("토큰 저장 통신 성공", HttpStatus.OK);
  }

  // 토큰 가져오기 테스트 컨트롤러 (실제 서비스랑 관련 없음)
  @GetMapping("api/redis/token")
  public ResponseEntity<?> testGetTokenWithRedis(@CookieValue String refreshToken) {

    String value = redisService.getRefreshTokenWithRedis(refreshToken);
    HashMap<String, String> resultMap = new HashMap<>();
    resultMap.put("message", "성공");
    resultMap.put("key", refreshToken);
    resultMap.put("value", value);
    return new ResponseEntity<>(resultMap, HttpStatus.OK);
  }

}
