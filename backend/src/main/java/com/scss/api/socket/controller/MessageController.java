package com.scss.api.socket.controller;


import com.scss.api.socket.dto.SocketDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@Log4j2
public class MessageController {

    private final SimpMessagingTemplate template;


    @MessageMapping(value = "/studyroom")
    public void socketConnect(SocketDto socketDto){
        if(socketDto.getStatus().equals("enter")){
            socketDto.setMessage(socketDto.getNickname() + "님이 채팅방에 참여하였습니다.");
            template.convertAndSend("/sub/studyroom/" + socketDto.getStudyroomId(), socketDto);
        }else if(socketDto.getStatus().equals("ready")){
            socketDto.setMessage(socketDto.getNickname() + "님이 코딩 테스트 할 준비가 되었습니다.");
            template.convertAndSend("/sub/studyroom/" + socketDto.getStudyroomId(), socketDto);
        }else{
            socketDto.setMessage(socketDto.getNickname() + "님이 채팅방을 나갔습니다");
            template.convertAndSend("/sub/studyroom/" + socketDto.getStudyroomId(), socketDto);
        }
    }

}



