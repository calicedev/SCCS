package com.scss.api.socket.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

// Data 어노테이션은 getter, setter를 자동 생성합니다.
@Data

// AllArgsConstructor 어노테이션은 생성자를 자동 생성합니다.
@AllArgsConstructor
public class SocketDto {
    // 유저의 이름을 저장하기 위한 변수
    private String userName;
    private String content;
}