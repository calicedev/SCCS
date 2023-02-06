package com.scss.api.socket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SocketDto {
    private int studyroomId;
    private String nickname;
    private String message;
    private String status;
    private int personnel;
    private boolean ready;

}
