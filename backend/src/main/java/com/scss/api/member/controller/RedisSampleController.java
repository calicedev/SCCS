package com.scss.api.member.controller;

import com.scss.api.member.util.RedisService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// Redis에 값을 저장, 조회하기 위한 테스트용 컨트롤러
@RestController
public class RedisSampleController {
    @Autowired
    private RedisService redisService;

    // 토큰 저장하기
    @PostMapping("/redis/token")
    public ResponseEntity<?> getToken(@RequestBody Map<String, String> paramMap) {
        String id = paramMap.get("id");
        String refreshToken = paramMap.get("refreshToken");

        redisService.setRefreshTokenWithRedis(id, refreshToken);
        return new ResponseEntity<String>("토큰 저장 통신 성공", HttpStatus.OK);
    }

    // 토큰 가져오기
    @GetMapping("/redis/token")
    public ResponseEntity<?> testRedis(@RequestParam String memberId){
        String refreshTokenKey = "refreshToken:" + memberId;
        redisService.getRefreshTokenWithRedis(refreshTokenKey);
        return new ResponseEntity<String>("토큰 가져오기 통신 성공", HttpStatus.OK);
    }
}
